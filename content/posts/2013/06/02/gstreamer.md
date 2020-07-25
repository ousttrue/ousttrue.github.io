---
Title: "Gstreamerを始めてみた"
date: 2013-06-11
Tags: []
---

動画プログラムでもしてみようということでGstreamerをはじめた。

#Hello world
まず注意しないといけないのがgstreamerのバージョンに0.10系と1.0系があって、ほとんどの情報が0.10系のものらしいということだ。python2とpython3、ruby18とruby19のような違いがありそうなのでひとまず0.10系を使うことにする。
Basic
tutorials <http://docs.gstreamer.com/display/GstSDK/Basic+tutorials>__\ をやってみる

最初のコードをc++に改造しやすいようにちょっと変更。

::
#include <gst/gst.h>

int main(int argc, char *argv[]) 
{
    gst_init (&argc, &argv);

    {
        GstElement *pipeline = gst_parse_launch (
                "playbin2 uri=http://docs.gstreamer.com/media/sintel_trailer-480p.webm", 
                NULL);

        gst_element_set_state (pipeline, GST_STATE_PLAYING);
        {
            GstBus *bus = gst_element_get_bus (pipeline);
            {
                GstMessage *msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE, 
                        static_cast<GstMessageType>(GST_MESSAGE_ERROR | GST_MESSAGE_EOS));
                if (msg != NULL){
                    gst_message_unref (msg);
                }
            }
            gst_object_unref (bus);
        }

        gst_element_set_state (pipeline, GST_STATE_NULL);
        gst_object_unref (pipeline);
    }

    return 0;
}

build $ gcc 'pkg-config gstreamer-0.10 --cflags --libs' main.c
動いた。
gstreamermmでやってみる

https://developer.gnome.org/gstreamermm/0.10/

::
#include <gstreamermm.h>


int main(int argc, char *argv[]) 
{
    Gst::init();

    {
        auto pipeline = Gst::Parse::launch (
                "playbin2 uri=http://docs.gstreamer.com/media/sintel_trailer-480p.webm");

        pipeline->set_state(Gst::STATE_PLAYING);
        {
            auto bus = pipeline->get_bus();
            auto msg = bus->pop(Gst::CLOCK_TIME_NONE, 
                    static_cast<Gst::MessageType>(
                        Gst::MESSAGE_ERROR 
                        | Gst::MESSAGE_EOS));
        }
        pipeline->set_state(Gst::STATE_NULL);
    }

    return 0;
}

build
$ g++ -std=c++0x 'pkg-config gstreamermm-0.10 --cflags --libs' main.cpp
unrefが省略できるのと、method呼び出しの記述方法がかわるのでコードがシンプルになる。
C版から翻訳するのに少し手間がかかるが、ほぼ機械的に変更するだけなのでこちらでいってみる。
2
::
#include <gstreamermm.h>


int main(int argc, char *argv[]) 
{
    Gst::init();

    auto source = Gst::ElementFactory::create_element("videotestsrc", "source");
    auto sink = Gst::ElementFactory::create_element("autovideosink", "sink");
    auto pipeline = Gst::Pipeline::create("test-pipeline");
    if (!pipeline || !source || !sink) {
        g_printerr ("Not all elements could be created.\n");
        return -1;
    }
    auto filter=Gst::ElementFactory::create_element("vertigotv", "vertigotv_filter");
    if(!filter){
        return -1;
    }
    auto filter2=Gst::ElementFactory::create_element("ffmpegcolorspace", "color_filter");
    if(!filter2){
        return -1;
    }

    /* Build the pipeline */
    pipeline->add(source);
    pipeline->add(sink);
    pipeline->add(filter);
    pipeline->add(filter2);
    if(!source->link(filter)){
        g_printerr ("Elements could not be linked.\n");
        return -1;
    }
    if(!filter->link(filter2)){
        g_printerr ("Elements could not be linked.\n");
        return -1;
    }
    if(!filter2->link(sink)){
        g_printerr ("Elements could not be linked.\n");
        return -1;
    }

    /* Modify the source's properties */
    source->set_property("pattern", 0);

    /* Start playing */
    if (!pipeline->set_state(Gst::STATE_PLAYING)) {
        g_printerr ("Unable to set the pipeline to the playing state.\n");
        return -1;
    }

    /* Wait until error or EOS */
    auto bus = pipeline->get_bus ();
    auto msg = bus->pop(Gst::CLOCK_TIME_NONE, 
            Gst::MESSAGE_ERROR | Gst::MESSAGE_EOS);

    /* Parse message */
    if (msg) {

        switch (msg->get_message_type()) {
            case Gst::MESSAGE_ERROR:
                {
                    Glib::Error err;
                    std::string debug_info;
                    Gst::MessageError(msg->gobj_copy()).parse(err, debug_info);
                    g_printerr ("Error received from element %s: %s\n", 
                            msg->get_source()->get_name().c_str(), 
                            err.what().c_str());
                    g_printerr ("Debugging information: %s\n", debug_info.c_str());
                }
                break;

            case Gst::MESSAGE_EOS:
                g_print ("End-Of-Stream reached.\n");
                break;

            default:
                /* We should not reach here because we only asked for ERRORs and EOS */
                g_printerr ("Unexpected message received.\n");
                break;
        }
    }

    pipeline->set_state(Gst::STATE_NULL);

    return 0;
}

3
::
#include <gstreamermm.h>

struct CustomData 
{
    Glib::RefPtr< Gst::Pipeline > pipeline;
    Glib::RefPtr< Gst::Element > source;
    Glib::RefPtr< Gst::Element > convert;
    Glib::RefPtr< Gst::Element > sink;
};


// Handler for the pad-added signal
static void pad_added_handler (
        const Glib::RefPtr<Gst::Pad> &new_pad, 
        CustomData *data)
{
    auto sink_pad = data->convert->get_static_pad("sink");

    g_print ("Received new pad '%s'\n", 
            new_pad->get_name().c_str());

    /* If our converter is already linked, we have nothing to do here */
    if (sink_pad->is_linked ()) {
        g_print ("  We are already linked. Ignoring.\n");
        return;
    }

    /* Check the new pad's type */
    auto new_pad_caps = new_pad->get_caps ();
    auto new_pad_struct = new_pad_caps->get_structure (0);
    std::string new_pad_type = new_pad_struct.get_name();
    if (new_pad_type.find("audio/x-raw")==std::string::npos) {
        g_print ("  It has type '%s' which is not raw audio. Ignoring.\n", 
                new_pad_type.c_str());
        return;
    }

    /* Attempt the link */
    if (!new_pad->link(sink_pad)) {
        g_print ("  Type is '%s' but link failed.\n", new_pad_type.c_str());
    } 
    else {
        g_print ("  Link succeeded (type '%s').\n", new_pad_type.c_str());
    }
}


int main(int argc, char *argv[]) 
{
    Gst::init();

    CustomData data;
    data.source = Gst::ElementFactory::create_element ("uridecodebin", "source");
    data.convert = Gst::ElementFactory::create_element ("audioconvert", "convert");
    data.sink = Gst::ElementFactory::create_element ("autoaudiosink", "sink");
    data.pipeline = Gst::Pipeline::create ("test-pipeline");

    if (!data.pipeline || !data.source || !data.convert || !data.sink) {
        g_printerr ("Not all elements could be created.\n");
        return -1;
    }

    /* Build the pipeline. Note that we are NOT linking the source at this
     *    * point. We will do it later. */
    data.pipeline->add(data.source);
    data.pipeline->add(data.convert);
    data.pipeline->add(data.sink);
    if (!data.convert->link(data.sink)) {
        g_printerr ("Elements could not be linked.\n");
        return -1;
    }

    /* Set the URI to play */
    data.source->set_property(
            "uri", 
            Glib::ustring("http://docs.gstreamer.com/media/sintel_trailer-480p.webm")
            );

    /* Connect to the pad-added signal */
    data.source->signal_pad_added().connect([&data](
                const Glib::RefPtr<Gst::Pad> &pad)
            {
            pad_added_handler(pad, &data);
            });

    /* Start playing */
    if (!data.pipeline->set_state(Gst::STATE_PLAYING)) {
        g_printerr ("Unable to set the pipeline to the playing state.\n");
        return -1;
    }

    /* Listen to the bus */
    auto bus = data.pipeline->get_bus();
    gboolean terminate = FALSE;
    do {
        auto msg = bus->pop(Gst::CLOCK_TIME_NONE,
                Gst::MESSAGE_STATE_CHANGED | Gst::MESSAGE_ERROR | Gst::MESSAGE_EOS);

        /* Parse message */
        if (msg) {

            switch (msg->get_message_type()) {
                case Gst::MESSAGE_ERROR:
                    {
                        Glib::Error err;
                        std::string debug_info;
                        Gst::MessageError(msg->gobj_copy()).parse(err, debug_info);
                        g_printerr ("Error received from element %s: %s\n", 
                                msg->get_source()->get_name().c_str(),
                                err.what().c_str());
                        g_printerr ("Debugging information: %s\n", debug_info.c_str());
                        terminate = TRUE;
                    }
                    break;

                case Gst::MESSAGE_EOS:
                    g_print ("End-Of-Stream reached.\n");
                    terminate = TRUE;
                    break;

                case Gst::MESSAGE_STATE_CHANGED:
                    /* We are only interested in state-changed messages from the pipeline */
                    if (msg->get_source() == data.pipeline) {
                        Gst::State old_state;
                        Gst::State new_state;
                        Gst::State pending_state;
                        Gst::MessageStateChanged(msg->gobj_copy()).parse(
                                old_state, new_state, pending_state);
                        g_print ("Pipeline state changed from %s to %s:\n",
                                typeid(old_state).name(),
                                typeid(new_state).name());
                    }
                    break;
                default:
                    /* We should not reach here */
                    g_printerr ("Unexpected message received.\n");
                    break;
            }
        }
    } while (!terminate);

    /* Free resources */
    data.pipeline->set_state(Gst::STATE_NULL);
    return 0;
}

.. categories:: programming
.. tags:: cpp, gstreamer
