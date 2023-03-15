"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2528],{3734:function(n,e,t){t.r(e),t.d(e,{default:function(){return p}});var r=t(1151),a=t(7294);function s(n){const e=Object.assign({pre:"pre",code:"code"},(0,r.ah)(),n.components);return a.createElement(e.pre,null,a.createElement(e.code,null,'動画プログラムでもしてみようということでGstreamerをはじめた。\n\n#Hello world\nまず注意しないといけないのがgstreamerのバージョンに0.10系と1.0系があって、ほとんどの情報が0.10系のものらしいということだ。python2とpython3、ruby18とruby19のような違いがありそうなのでひとまず0.10系を使うことにする。\n\nBasic\ntutorials http://docs.gstreamer.com/display/GstSDK/Basic+tutorials をやってみる\n\n最初のコードをc++に改造しやすいようにちょっと変更。\n\n::\n#include <gst/gst.h>\n\nint main(int argc, char *argv[])\n{\n    gst_init (&argc, &argv);\n\n    {\n        GstElement *pipeline = gst_parse_launch (\n                "playbin2 uri=http://docs.gstreamer.com/media/sintel_trailer-480p.webm",\n                NULL);\n\n        gst_element_set_state (pipeline, GST_STATE_PLAYING);\n        {\n            GstBus *bus = gst_element_get_bus (pipeline);\n            {\n                GstMessage *msg = gst_bus_timed_pop_filtered (bus, GST_CLOCK_TIME_NONE,\n                        static_cast<GstMessageType>(GST_MESSAGE_ERROR | GST_MESSAGE_EOS));\n                if (msg != NULL){\n                    gst_message_unref (msg);\n                }\n            }\n            gst_object_unref (bus);\n        }\n\n        gst_element_set_state (pipeline, GST_STATE_NULL);\n        gst_object_unref (pipeline);\n    }\n\n    return 0;\n}\n\nbuild $ gcc \'pkg-config gstreamer-0.10 --cflags --libs\' main.c\n動いた。\ngstreamermmでやってみる\n\nhttps://developer.gnome.org/gstreamermm/0.10/\n\n::\n#include <gstreamermm.h>\n\n\nint main(int argc, char *argv[])\n{\n    Gst::init();\n\n    {\n        auto pipeline = Gst::Parse::launch (\n                "playbin2 uri=http://docs.gstreamer.com/media/sintel_trailer-480p.webm");\n\n        pipeline->set_state(Gst::STATE_PLAYING);\n        {\n            auto bus = pipeline->get_bus();\n            auto msg = bus->pop(Gst::CLOCK_TIME_NONE,\n                    static_cast<Gst::MessageType>(\n                        Gst::MESSAGE_ERROR\n                        | Gst::MESSAGE_EOS));\n        }\n        pipeline->set_state(Gst::STATE_NULL);\n    }\n\n    return 0;\n}\n\nbuild\n$ g++ -std=c++0x \'pkg-config gstreamermm-0.10 --cflags --libs\' main.cpp\nunrefが省略できるのと、method呼び出しの記述方法がかわるのでコードがシンプルになる。\nC版から翻訳するのに少し手間がかかるが、ほぼ機械的に変更するだけなのでこちらでいってみる。\n2\n::\n#include <gstreamermm.h>\n\n\nint main(int argc, char *argv[])\n{\n    Gst::init();\n\n    auto source = Gst::ElementFactory::create_element("videotestsrc", "source");\n    auto sink = Gst::ElementFactory::create_element("autovideosink", "sink");\n    auto pipeline = Gst::Pipeline::create("test-pipeline");\n    if (!pipeline || !source || !sink) {\n        g_printerr ("Not all elements could be created.\\n");\n        return -1;\n    }\n    auto filter=Gst::ElementFactory::create_element("vertigotv", "vertigotv_filter");\n    if(!filter){\n        return -1;\n    }\n    auto filter2=Gst::ElementFactory::create_element("ffmpegcolorspace", "color_filter");\n    if(!filter2){\n        return -1;\n    }\n\n    /* Build the pipeline */\n    pipeline->add(source);\n    pipeline->add(sink);\n    pipeline->add(filter);\n    pipeline->add(filter2);\n    if(!source->link(filter)){\n        g_printerr ("Elements could not be linked.\\n");\n        return -1;\n    }\n    if(!filter->link(filter2)){\n        g_printerr ("Elements could not be linked.\\n");\n        return -1;\n    }\n    if(!filter2->link(sink)){\n        g_printerr ("Elements could not be linked.\\n");\n        return -1;\n    }\n\n    /* Modify the source\'s properties */\n    source->set_property("pattern", 0);\n\n    /* Start playing */\n    if (!pipeline->set_state(Gst::STATE_PLAYING)) {\n        g_printerr ("Unable to set the pipeline to the playing state.\\n");\n        return -1;\n    }\n\n    /* Wait until error or EOS */\n    auto bus = pipeline->get_bus ();\n    auto msg = bus->pop(Gst::CLOCK_TIME_NONE,\n            Gst::MESSAGE_ERROR | Gst::MESSAGE_EOS);\n\n    /* Parse message */\n    if (msg) {\n\n        switch (msg->get_message_type()) {\n            case Gst::MESSAGE_ERROR:\n                {\n                    Glib::Error err;\n                    std::string debug_info;\n                    Gst::MessageError(msg->gobj_copy()).parse(err, debug_info);\n                    g_printerr ("Error received from element %s: %s\\n",\n                            msg->get_source()->get_name().c_str(),\n                            err.what().c_str());\n                    g_printerr ("Debugging information: %s\\n", debug_info.c_str());\n                }\n                break;\n\n            case Gst::MESSAGE_EOS:\n                g_print ("End-Of-Stream reached.\\n");\n                break;\n\n            default:\n                /* We should not reach here because we only asked for ERRORs and EOS */\n                g_printerr ("Unexpected message received.\\n");\n                break;\n        }\n    }\n\n    pipeline->set_state(Gst::STATE_NULL);\n\n    return 0;\n}\n\n3\n::\n#include <gstreamermm.h>\n\nstruct CustomData\n{\n    Glib::RefPtr< Gst::Pipeline > pipeline;\n    Glib::RefPtr< Gst::Element > source;\n    Glib::RefPtr< Gst::Element > convert;\n    Glib::RefPtr< Gst::Element > sink;\n};\n\n\n// Handler for the pad-added signal\nstatic void pad_added_handler (\n        const Glib::RefPtr<Gst::Pad> &new_pad,\n        CustomData *data)\n{\n    auto sink_pad = data->convert->get_static_pad("sink");\n\n    g_print ("Received new pad \'%s\'\\n",\n            new_pad->get_name().c_str());\n\n    /* If our converter is already linked, we have nothing to do here */\n    if (sink_pad->is_linked ()) {\n        g_print ("  We are already linked. Ignoring.\\n");\n        return;\n    }\n\n    /* Check the new pad\'s type */\n    auto new_pad_caps = new_pad->get_caps ();\n    auto new_pad_struct = new_pad_caps->get_structure (0);\n    std::string new_pad_type = new_pad_struct.get_name();\n    if (new_pad_type.find("audio/x-raw")==std::string::npos) {\n        g_print ("  It has type \'%s\' which is not raw audio. Ignoring.\\n",\n                new_pad_type.c_str());\n        return;\n    }\n\n    /* Attempt the link */\n    if (!new_pad->link(sink_pad)) {\n        g_print ("  Type is \'%s\' but link failed.\\n", new_pad_type.c_str());\n    }\n    else {\n        g_print ("  Link succeeded (type \'%s\').\\n", new_pad_type.c_str());\n    }\n}\n\n\nint main(int argc, char *argv[])\n{\n    Gst::init();\n\n    CustomData data;\n    data.source = Gst::ElementFactory::create_element ("uridecodebin", "source");\n    data.convert = Gst::ElementFactory::create_element ("audioconvert", "convert");\n    data.sink = Gst::ElementFactory::create_element ("autoaudiosink", "sink");\n    data.pipeline = Gst::Pipeline::create ("test-pipeline");\n\n    if (!data.pipeline || !data.source || !data.convert || !data.sink) {\n        g_printerr ("Not all elements could be created.\\n");\n        return -1;\n    }\n\n    /* Build the pipeline. Note that we are NOT linking the source at this\n     *    * point. We will do it later. */\n    data.pipeline->add(data.source);\n    data.pipeline->add(data.convert);\n    data.pipeline->add(data.sink);\n    if (!data.convert->link(data.sink)) {\n        g_printerr ("Elements could not be linked.\\n");\n        return -1;\n    }\n\n    /* Set the URI to play */\n    data.source->set_property(\n            "uri",\n            Glib::ustring("http://docs.gstreamer.com/media/sintel_trailer-480p.webm")\n            );\n\n    /* Connect to the pad-added signal */\n    data.source->signal_pad_added().connect([&data](\n                const Glib::RefPtr<Gst::Pad> &pad)\n            {\n            pad_added_handler(pad, &data);\n            });\n\n    /* Start playing */\n    if (!data.pipeline->set_state(Gst::STATE_PLAYING)) {\n        g_printerr ("Unable to set the pipeline to the playing state.\\n");\n        return -1;\n    }\n\n    /* Listen to the bus */\n    auto bus = data.pipeline->get_bus();\n    gboolean terminate = FALSE;\n    do {\n        auto msg = bus->pop(Gst::CLOCK_TIME_NONE,\n                Gst::MESSAGE_STATE_CHANGED | Gst::MESSAGE_ERROR | Gst::MESSAGE_EOS);\n\n        /* Parse message */\n        if (msg) {\n\n            switch (msg->get_message_type()) {\n                case Gst::MESSAGE_ERROR:\n                    {\n                        Glib::Error err;\n                        std::string debug_info;\n                        Gst::MessageError(msg->gobj_copy()).parse(err, debug_info);\n                        g_printerr ("Error received from element %s: %s\\n",\n                                msg->get_source()->get_name().c_str(),\n                                err.what().c_str());\n                        g_printerr ("Debugging information: %s\\n", debug_info.c_str());\n                        terminate = TRUE;\n                    }\n                    break;\n\n                case Gst::MESSAGE_EOS:\n                    g_print ("End-Of-Stream reached.\\n");\n                    terminate = TRUE;\n                    break;\n\n                case Gst::MESSAGE_STATE_CHANGED:\n                    /* We are only interested in state-changed messages from the pipeline */\n                    if (msg->get_source() == data.pipeline) {\n                        Gst::State old_state;\n                        Gst::State new_state;\n                        Gst::State pending_state;\n                        Gst::MessageStateChanged(msg->gobj_copy()).parse(\n                                old_state, new_state, pending_state);\n                        g_print ("Pipeline state changed from %s to %s:\\n",\n                                typeid(old_state).name(),\n                                typeid(new_state).name());\n                    }\n                    break;\n                default:\n                    /* We should not reach here */\n                    g_printerr ("Unexpected message received.\\n");\n                    break;\n            }\n        }\n    } while (!terminate);\n\n    /* Free resources */\n    data.pipeline->set_state(Gst::STATE_NULL);\n    return 0;\n}\n\n.. categories:: programming\n.. taxonomies: {tags: : cpp, gstreamer}\n'))}var i=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?a.createElement(e,n,a.createElement(s,n)):s(n)};t(8678);function o(n){let{data:e,children:t}=n;return a.createElement(a.Fragment,null,a.createElement("h1",null,e.mdx.frontmatter.title),a.createElement(r.Zo,null,t))}function p(n){return a.createElement(o,n,a.createElement(i,n))}},8678:function(n,e,t){t(7294)},1151:function(n,e,t){t.d(e,{Zo:function(){return o},ah:function(){return s}});var r=t(7294);const a=r.createContext({});function s(n){const e=r.useContext(a);return r.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}const i={};function o({components:n,children:e,disableParentContext:t}){let o;return o=t?"function"==typeof n?n({}):n||i:s(n),r.createElement(a.Provider,{value:o},e)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-06-02-gstreamer-md-a5161bfa214344eff316.js.map