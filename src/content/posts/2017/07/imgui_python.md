---
title: "PythonでImGuiする"
date: 2017-07-31
tags: ["python", "imgui"]
---

Python で ImGui するのがよさげな気がしたのでやってみた。

ImGui は c ではなく c++のライブラリなので Python の ctypes は使えぬ。
本家の Bindings の項に２つの python binding が紹介されている。

https://github.com/chromy/cyimgui
https://github.com/swistakm/pyimgui

なんかうまくいかなった。
ならば swig で自前でラップすればええやんということで、やってみる。

https://github.com/ousttrue/SwigImGui

```
Swig
%module swig_imgui

%{
/* Includes the header in the wrapper code */
#include "imgui/imgui.h"
%}

/* Parse the header file to generate wrappers */
%include "imgui/imgui.h"
```

```
> swig -python -c++ imgui.i
```

imgui_wrap.cxx と”swig_imgui.py”を生成した。
imgui_wrap.cxx から\_swig_imgui.pyd をビルドする。
ビルドしてみる
python の NativeModule をビルドするので setup.py を書いてみる。

```python
from distutils.core import setup, Extension


imgui_module = Extension('_swig_imgui',
        sources=[
            'imgui_wrap.cxx',
            'imgui/imgui.cpp',
            'imgui/imgui_draw.cpp',
            'imgui/imgui_demo.cpp',
            ],
        )

setup (name = 'swig_imgeui',
        version = '0.1',
        author      = "ousttrue",
        description = """imgui wrapper using swig""",
        ext_modules = [imgui_module],
        py_modules = ["imgui"],
        )
```

ビルド。

```
> C:\python36\python.exe setup.py build
```

ビルドしてみるとエラー。

```
swigimgui\imgui_wrap.cxx(26285): error C2668: 'ImGui::TreePush': オーバーロード関数の呼び出しを解決することができません。(新機能 ; ヘルプを参照)
swigimgui\imgui\imgui.h(338): note: 'void ImGui::TreePush(const void *)' の可能性があります
swigimgui\imgui\imgui.h(337): note: または 'void ImGui::TreePush(const char *)'
swigimgui\imgui_wrap.cxx(26285): note: 引数リスト '()' を一致させようとしているとき
```

ImGui::TreePush();が TreePush(const char* str_id = NULL)と TreePush(const void* ptr_id = NULL)でどちらなのか解決できない。
修正。

```
%module swig_imgui

%{
/* Includes the header in the wrapper code */
#include "imgui/imgui.h"
%}

%ignore ImGui::TreePush();

/* Parse the header file to generate wrappers */
%include "imgui/imgui.h"

%include "imgui/imgui.h"の前に%ignoreを記述することで、
```

引数無しの TreePush を作らないようにした。
これでコンパイルは通った。
python36_d.lib にリンクしない
python36_d.lib ではなあく python36.lib にリンクする。
imgui.i の上の方に以下の記述を追加する。

```
%begin %{
#ifdef \_MSC_VER
#define SWIG_PYTHON_INTERPRETER_NO_DEBUG
#endif
%}
```

実行してみよう

https://github.com/ocornut/imgui/tree/master/examples/sdl_opengl3_example

をまるっと python に移植してみる。
ここからが長くなるで。

# ImGui - standalone example application for SDL2 + OpenGL

# If you are new to ImGui, see examples/README.txt and documentation at the top of imgui.cpp.

```python
import os
import sys

if not 'PYSDL2_DLL_PATH' in os.environ:
os.environ['PYSDL2_DLL_PATH']=os.environ['VCPKG_DIR'] + '/installed/x64-windows/bin'
from sdl2 import \*

python_dir=os.path.dirname(sys.executable)
os.environ['PATH']+=(';'+python_dir)
import swig_imgui as imgui

import ImplSdlGL3

def main():

    # Setup SDL
    if (SDL_Init(SDL_INIT_VIDEO|SDL_INIT_TIMER) != 0):
        print("Error: %s\n", SDL_GetError());
        return -1;

    # Setup window
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_FLAGS, SDL_GL_CONTEXT_FORWARD_COMPATIBLE_FLAG);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_PROFILE_MASK, SDL_GL_CONTEXT_PROFILE_CORE);
    SDL_GL_SetAttribute(SDL_GL_DOUBLEBUFFER, 1);
    SDL_GL_SetAttribute(SDL_GL_DEPTH_SIZE, 24);
    SDL_GL_SetAttribute(SDL_GL_STENCIL_SIZE, 8);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 3);
    SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 2);
    current=SDL_DisplayMode();
    SDL_GetCurrentDisplayMode(0, current);
    window = SDL_CreateWindow(b"ImGui SDL2+OpenGL3 example", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 1280, 720, SDL_WINDOW_OPENGL|SDL_WINDOW_RESIZABLE);
    glcontext = SDL_GL_CreateContext(window);
    #gl3wInit();

    # Setup ImGui binding
    ImplSdlGL3.Init(window);

    # Load Fonts
    # (there is a default font, this is only if you want to change it. see extra_fonts/README.txt for more details)
    #ImGuiIO& io = imgui.GetIO();
    #io.Fonts->AddFontDefault();
    #io.Fonts->AddFontFromFileTTF("../../extra_fonts/Cousine-Regular.ttf", 15.0f);
    #io.Fonts->AddFontFromFileTTF("../../extra_fonts/DroidSans.ttf", 16.0f);
    #io.Fonts->AddFontFromFileTTF("../../extra_fonts/ProggyClean.ttf", 13.0f);
    #io.Fonts->AddFontFromFileTTF("../../extra_fonts/ProggyTiny.ttf", 10.0f);
    #io.Fonts->AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0f, NULL, io.Fonts->GetGlyphRangesJapanese());

    show_test_window = True;
    show_another_window = False;
    clear_color = [114/255.0, 144/255.0, 154/255.0];

    # Main loop
    done = False;
    while not done:

        event=SDL_Event();
        while SDL_PollEvent(event)!=0:

            ImplSdlGL3.ProcessEvent(event);
            if event.type == SDL_QUIT:
                done = true;

        ImplSdlGL3.NewFrame(window);

        # 1. Show a simple window
        # Tip: if we don't call imgui.Begin()/imgui.End() the widgets appears in a window automatically called "Debug"

        f = 0.0;
        imgui.Text("Hello, world!");
        imgui.SliderFloat("float", f, 0.0, 1.0);
        imgui.ColorEdit3("clear color", clear_color);
        if imgui.Button("Test Window"): show_test_window ^= 1;
        if imgui.Button("Another Window"): show_another_window ^= 1;
        imgui.Text("Application average %.3f ms/frame (%.1f FPS)", 1000.0 / imgui.GetIO().Framerate, imgui.GetIO().Framerate);

        # 2. Show another simple window, this time using an explicit Begin/End pair
        if show_another_window:
            imgui.SetNextWindowSize(ImVec2(200,100), ImGuiSetCond_FirstUseEver);
            imgui.Begin("Another Window", show_another_window);
            imgui.Text("Hello");
            imgui.End();

        # 3. Show the ImGui test window. Most of the sample code is in imgui.ShowTestWindow()
        if show_test_window:
            imgui.SetNextWindowPos(ImVec2(650, 20), ImGuiSetCond_FirstUseEver);
            imgui.ShowTestWindow(show_test_window);

        # Rendering
        glViewport(0, 0, int(imgui.GetIO().DisplaySize.x), int(imgui.GetIO().DisplaySize.y));
        glClearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
        glClear(GL_COLOR_BUFFER_BIT);
        imgui.Render();
        SDL_GL_SwapWindow(window);

    # Cleanup
    ImplSdlGL3.Shutdown();
    SDL_GL_DeleteContext(glcontext);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;

if **name**=='**main**':
main()

ImplSdlGL3.py
def Init(window):
pass

def ProcessEvent(event):
pass

def NewFrame(window):
pass
```

pyd のサーチ
環境変数 PATH
環境変数 PYSDL2_DLL_PATH
実行
諸々、正しく初期化していないのでクラッシュする。
Init を移植

```python
import swig_imgui as imgui
from sdl2 import \*

def Init(window):
io = imgui.GetIO();
#io.KeyMap[imgui.ImGuiKey_Tab] = SDLK_TAB;
io.KeyMap[imgui.ImGuiKey_LeftArrow] = SDL_SCANCODE_LEFT;
io.KeyMap[imgui.ImGuiKey_RightArrow] = SDL_SCANCODE_RIGHT;
io.KeyMap[imgui.ImGuiKey_UpArrow] = SDL_SCANCODE_UP;
io.KeyMap[imgui.ImGuiKey_DownArrow] = SDL_SCANCODE_DOWN;
io.KeyMap[imgui.ImGuiKey_PageUp] = SDL_SCANCODE_PAGEUP;
io.KeyMap[imgui.ImGuiKey_PageDown] = SDL_SCANCODE_PAGEDOWN;
io.KeyMap[imgui.ImGuiKey_Home] = SDL_SCANCODE_HOME;
io.KeyMap[imgui.ImGuiKey_End] = SDL_SCANCODE_END;
io.KeyMap[imgui.ImGuiKey_Delete] = SDLK_DELETE;
io.KeyMap[imgui.ImGuiKey_Backspace] = SDLK_BACKSPACE;
io.KeyMap[imgui.ImGuiKey_Enter] = SDLK_RETURN;
io.KeyMap[imgui.ImGuiKey_Escape] = SDLK_ESCAPE;
io.KeyMap[imgui.ImGuiKey_A] = SDLK_a;
io.KeyMap[imgui.ImGuiKey_C] = SDLK_c;
io.KeyMap[imgui.ImGuiKey_V] = SDLK_v;
io.KeyMap[imgui.ImGuiKey_X] = SDLK_x;
io.KeyMap[imgui.ImGuiKey_Y] = SDLK_y;
io.KeyMap[imgui.ImGuiKey_Z] = SDLK_z;

    # Alternatively you can set this to NULL and call imgui.GetDrawData() after imgui.Render() to get the same ImDrawData pointer.
    io.RenderDrawListsFn = ImGui_ImplSdlGL3_RenderDrawLists;
    io.SetClipboardTextFn = ImGui_ImplSdlGL3_SetClipboardText;
    io.GetClipboardTextFn = ImGui_ImplSdlGL3_GetClipboardText;
    #io.ClipboardUserData = NULL;

#ifdef \_WIN32
wmInfo=SDL_SysWMinfo();
SDL_VERSION(wmInfo.version);
SDL_GetWindowWMInfo(window, wmInfo);
io.ImeWindowHandle = wmInfo.info.win.window;
#else
#(void)window;
#endif

    return True;
```

実行してエラーをつぶしていく。
int 型配列への index を使った代入
冒頭の io.KeyMap[imgui.ImGuiKey_LeftArrow] = SDL_SCANCODE_LEFT;がエラーになる。

```
io.KeyMap[imgui.ImGuiKey_LeftArrow] = SDL_SCANCODE_LEFT;
TypeError: 'SwigPyObject' object does not support item assignment
```

io.KeyMap の C での型。

```c
int KeyMap[ImGuiKey_COUNT];
```

単なる配列へのアクセス。KeyMap を list 的なオブジェクトとして python 側に公開するよりも、io にセッターを実装することにした。
imgui.i に追加。

```
%extend ImGuiIO {
void SetKeyMap(int k, int v)
{
ImGui::GetIO().KeyMap[k]=v;
}
}
```

python では次のように使う。

```python
io.SetKeyMap(imgui.ImGuiKey_LeftArrow, SDL_SCANCODE_LEFT);
```

関数ポインタ型に python の関数を代入。
swig 的にはこれがいちばんの難問である。
関数ポインタを変数に代入するのがエラーになる。

```python
def RenderDrawLists():
pass

io.RenderDrawListsFn = RenderDrawLists;

TypeError: in method 'ImGuiIO_RenderDrawListsFn_set', argument 2 of type 'void (_)(ImDrawData _)'
Press any key to continue . . .
```

そりゃ、python の関数をこれに代入するのは無理だ。
解決方法は、以下のようにする。
imgui.i に追記。場所に注意が必要。

```
%{
static void PythonRenderDrawListsFn(ImDrawData* data)
{
auto func=(PyObject*)ImGui::GetIO().UserData; // Get Python function
auto obj = SWIG_NewPointerObj(SWIG_as_voidptr(data)
, SWIGTYPE_p_ImDrawData, 0 | 0 );
auto arglist = Py_BuildValue("(O)",obj); // Build argument list
PyEval_CallObject(func, arglist); // Call Python
Py_DECREF(arglist); // Trash arglist
Py_DECREF(obj);
}
%}

// before
%include "imgui/imgui.h"
// after

%extend ImGuiIO {
void SetRenderDrawListsFn(PyObject \*pyfunc) {
ImGui::GetIO().UserData=pyfunc;
self->RenderDrawListsFn=PythonRenderDrawListsFn;
Py_INCREF(pyfunc);
}
}
```

残り２つの関数ポインタも同様の対応で行けると思うがコメントアウトして飛ばした。

```
io.SetClipboardTextFn = ImGui_ImplSdlGL3_SetClipboardText;
io.GetClipboardTextFn = ImGui_ImplSdlGL3_GetClipboardText;

void\*の代入
io.ImeWindowHandle = wmInfo.info.win.window;

TypeError: in method 'ImGuiIO_ImeWindowHandle_set', argument 2 of type 'void \*'

セッターを作った。
%extend ImGuiIO {
void SetImeWindowHandle(long long v)
{
ImGui::GetIO().ImeWindowHandle = (void\*)v;
}
}

NewFrame の移植
def CreateDeviceObjects():
pass

g_MousePressed=[False, False, False]
g_MouseWheel=None
def NewFrame(window):
if not g_FontTexture:
CreateDeviceObjects();

    io = imgui.GetIO();

    # Setup display size (every frame to accommodate for window resizing)
    w, h=SDL_GetWindowSize(window);
    display_w, display_h=SDL_GL_GetDrawableSize(window);
    io.DisplaySize = imgui.ImVec2(w, h);
    io.DisplayFramebufferScale = ImVec2(
        (display_w / float(w)) if w > 0 else 0,
        (display_h / float(h)) if h > 0 else 0);

    # Setup time step
    time = SDL_GetTicks();
    current_time = time / 1000.0;
    io.DeltaTime = (current_time - g_Time) if g_Time > 0.0 else (1.0 / 60.0);
    g_Time = current_time;

    # Setup inputs
    # (we already got mouse wheel, keyboard keys & characters from SDL_PollEvent())
    mouseMask, mx, my = SDL_GetMouseState();
    if (SDL_GetWindowFlags(window) & SDL_WINDOW_MOUSE_FOCUS):
        # Mouse position, in pixels (set to -1,-1 if no mouse / on another screen, etc.)
        io.MousePos = ImVec2(mx, my);
    else:
        io.MousePos = ImVec2(-1, -1);

    # If a mouse press event came, always pass it as "mouse held this frame", so we don't miss click-release events that are shorter than 1 frame.
    io.MouseDown[0] = g_MousePressed[0] or (mouseMask & SDL_BUTTON(SDL_BUTTON_LEFT)) != 0;
    io.MouseDown[1] = g_MousePressed[1] or (mouseMask & SDL_BUTTON(SDL_BUTTON_RIGHT)) != 0;
    io.MouseDown[2] = g_MousePressed[2] or (mouseMask & SDL_BUTTON(SDL_BUTTON_MIDDLE)) != 0;
    g_MousePressed[0] = g_MousePressed[1] = g_MousePressed[2] = False;

    io.MouseWheel = g_MouseWheel;
    g_MouseWheel = 0.0;

    # Hide OS mouse cursor if ImGui is drawing it
    SDL_ShowCursor(0 if io.MouseDrawCursor else 1);

    # Start the frame
    imgui.NewFrame();

io.MouseDown
セッター。
%extend ImGuiIO {
void SetMouseDown(int k, int v)
{
ImGui::GetIO().MouseDown[k]=v;
}
}

CreateDeviceObjects の移植 # Backup GL state
last_texture=glGetIntegerv(GL_TEXTURE_BINDING_2D);
last_array_buffer=glGetIntegerv(GL_ARRAY_BUFFER_BINDING);
last_vertex_array=glGetIntegerv(GL_VERTEX_ARRAY_BINDING);

    vertex_shader =b'''#version 330

uniform mat4 ProjMtx;
in vec2 Position;
in vec2 UV;
in vec4 Color;
out vec2 Frag_UV;
out vec4 Frag_Color;
void main()
{
Frag_UV = UV;
Frag_Color = Color;
gl_Position = ProjMtx \* vec4(Position.xy,0,1);
};
'''

    fragment_shader =b'''#version 330

uniform sampler2D Texture;
in vec2 Frag_UV;
in vec4 Frag_Color;
out vec4 Out_Color;
void main()
{
Out_Color = Frag_Color \* texture( Texture, Frag_UV.st);
};
'''

    g_ShaderHandle = glCreateProgram();
    g_VertHandle = glCreateShader(GL_VERTEX_SHADER);
    g_FragHandle = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(g_VertHandle, vertex_shader);
    glShaderSource(g_FragHandle, fragment_shader);
    glCompileShader(g_VertHandle);
    glCompileShader(g_FragHandle);
    glAttachShader(g_ShaderHandle, g_VertHandle);
    glAttachShader(g_ShaderHandle, g_FragHandle);
    glLinkProgram(g_ShaderHandle);

    g_AttribLocationTex = glGetUniformLocation(g_ShaderHandle, "Texture");
    g_AttribLocationProjMtx = glGetUniformLocation(g_ShaderHandle, "ProjMtx");
    g_AttribLocationPosition = glGetAttribLocation(g_ShaderHandle, "Position");
    g_AttribLocationUV = glGetAttribLocation(g_ShaderHandle, "UV");
    g_AttribLocationColor = glGetAttribLocation(g_ShaderHandle, "Color");

    g_VboHandle=glGenBuffers(1);
    g_ElementsHandle=glGenBuffers(1);

    g_VaoHandle=glGenVertexArrays(1);
    glBindVertexArray(g_VaoHandle);
    glBindBuffer(GL_ARRAY_BUFFER, g_VboHandle);
    glEnableVertexAttribArray(g_AttribLocationPosition);
    glEnableVertexAttribArray(g_AttribLocationUV);
    glEnableVertexAttribArray(g_AttribLocationColor);

#define OFFSETOF(TYPE, ELEMENT) ((size_t)&(((TYPE \*)0)->ELEMENT))
SIZEOF_ImDrawVert=20
glVertexAttribPointer(g_AttribLocationPosition, 2, GL_FLOAT, GL_FALSE, SIZEOF_ImDrawVert, ctypes.c_void_p(0));
glVertexAttribPointer(g_AttribLocationUV, 2, GL_FLOAT, GL_FALSE, SIZEOF_ImDrawVert, ctypes.c_void_p(8));
glVertexAttribPointer(g_AttribLocationColor, 4, GL_UNSIGNED_BYTE, GL_TRUE, SIZEOF_ImDrawVert, ctypes.c_void_p(16));
#undef OFFSETOF

    CreateFontsTexture();

    # Restore modified GL state
    glBindTexture(GL_TEXTURE_2D, last_texture);
    glBindBuffer(GL_ARRAY_BUFFER, last_array_buffer);
    glBindVertexArray(last_vertex_array);

    return True;

sizeof
%constant int SIZEOF_ImDrawVert = sizeof(ImDrawVert);
%constant int SIZEOF_ImDrawIdx = sizeof(ImDrawIdx);

offset
%{
#define OFFSETOF(TYPE, ELEMENT) ((size_t)&(((TYPE \*)0)->ELEMENT))
const int OFFSETOF_ImDrawVert_pos = OFFSETOF(ImDrawVert, pos);
const int OFFSETOF_ImDrawVert_uv = OFFSETOF(ImDrawVert, uv);
const int OFFSETOF_ImDrawVert_col = OFFSETOF(ImDrawVert, col);
#undef OFFSETOF
%}
const int OFFSETOF_ImDrawVert_pos = OFFSETOF_ImDrawVert_pos;
const int OFFSETOF_ImDrawVert_uv = OFFSETOF_ImDrawVert_uv;
const int OFFSETOF_ImDrawVert_col = OFFSETOF_ImDrawVert_col;

CreateFontsTexture の移植
def CreateFontsTexture(): # Build texture atlas
io = imgui.GetIO(); # Load as RGBA 32-bits for OpenGL3 demo because it is more likely to be compatible with user's existing shader.
pixels, width, height=io.Fonts.GetTexDataAsRGBA32();

    # Upload texture to graphics system
    last_texture=glGetIntegerv(GL_TEXTURE_BINDING_2D);
    g_FontTexture=glGenTextures(1);
    glBindTexture(GL_TEXTURE_2D, g_FontTexture);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glPixelStorei(GL_UNPACK_ROW_LENGTH, 0);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, pixels);

    # Store our identifier
    io.Fonts.TexID = g_FontTexture;

    # Restore state
    glBindTexture(GL_TEXTURE_2D, last_texture);

値を返すためにポインタ引数を出力に使い(in + argout)、長さの分かっているバイト列へのポインタを bytes として返す
対象はこれ。
IMGUI_API void GetTexDataAsRGBA32(unsigned char\*_ out_pixels, int_ out_width, int* out_height, int* out_bytes_per_pixel = NULL);

typemap でやってみる。
imgui.i の%include "imgui/imgui.h"より前に記述。
%typemap(in, numinputs=0) (unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel) (unsigned char *tempP, int tempW, int tempH, int tempB) {
$1 = &tempP;
$2 = &tempW;
$3 = &tempH;
$4 = &tempB;
}
%typemap(argout)(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel){
auto b = PyBytes_FromStringAndSize((const char *)_$1, (_$2) _ (_$3) _ (_$4));
auto w = PyLong_FromLong(_$2);
auto h = PyLong_FromLong(_$3);

    if ((!$result) || ($result == Py_None)) {
        // new tuple3
        $result = PyTuple_New(3);
        PyTuple_SetItem($result, 0, b);
        PyTuple_SetItem($result, 1, w);
        PyTuple_SetItem($result, 2, h);
    }
    else{
        if (!PyTuple_Check($result)) {
            // new tuple4
            auto t= PyTuple_New(4);
            PyTuple_SetItem(t, 0, $result);
            PyTuple_SetItem(t, 1, b);
            PyTuple_SetItem(t, 2, w);
            PyTuple_SetItem(t, 3, h);
            $result=t;
        }
        else {
            // concat
            auto head = $result;
            auto tail = PyTuple_New(3);
            PyTuple_SetItem($result, 0, b);
            PyTuple_SetItem($result, 1, w);
            PyTuple_SetItem($result, 2, h);
            $result = PySequence_Concat(head, tail);
            Py_DECREF(head);
            Py_DECREF(tail);
        }
    }

}

typemap(in)で呼び出し時に出力変数を与える必要を無くして、typemap(argout)で呼び出し後の返り値を tuple 化して値を詰める。その際に、バイト列のサイズが計算できるので PyBytes_FromStringAndSize で bytes を作る。
TexID のセッター
int から void*への変換。
%extend ImFontAtlas {
void SetTexID(long long id) {
self->TexID=reinterpret_cast<void*>(id);
}
}

ここまで実装すると Texture の nullptr でプログラムがクラッシュしなくなる。
imgui の widget に対する inout な引数
float*
IMGUI_API bool SliderFloat(const char* label, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);

argout にすると返り値が(bool, float)になっていまいちな気がする。
swig で float\*型のヘルパークラスを作る。
%include "cpointer.i"
%pointer_functions(float, floatp);

f=imgui.new_floatp()
imgui.floatp_assign(f, 0.0)
imgui.SliderFloat("float", f, 0.0, 1.0);

bool*
float と同様に。
IMGUI_API void ShowTestWindow(bool* p_open = NULL);

%include "cpointer.i"
%pointer_functions(bool, boolp);

    show_test_window = imgui.new_boolp();
    imgui.boolp_assign(show_test_window, True)

    if imgui.Button("Test Window"): imgui.boolp_assign(show_test_window, not boolp_assign.value))

    if imgui.boolp_value(show_test_window):
        imgui.SetNextWindowPos(imgui.ImVec2(650, 20), imgui.ImGuiSetCond_FirstUseEver);
        imgui.ShowTestWindow(show_test_window);

動くとはいえこれはいかんな。ポインタクラスをもう少し便利にするか、別の方法を調べよう。
float[3]
IMGUI_API bool ColorEdit3(const char\* label, float col[3]);

typemap で list リストを受け取って、list に結果を格納するように記述する。
%typemap(in) float col[3] (float temp[3]) {
if (!PySequence_Check($input)) {
        PyErr_SetString(PyExc_ValueError,"Expected a sequence");
        return NULL;
    }
    if (PySequence_Length($input) < $1_dim0) {
        PyErr_SetString(PyExc_ValueError,"Size mismatch. Expected more than $1_dim0 elements");
        return NULL;
    }
    for (int i = 0; i < $1_dim0; i++) {
        PyObject *o = PySequence_GetItem($input,i);
if (PyNumber_Check(o)) {
temp[i] = (float) PyFloat_AsDouble(o);
}
else {
PyErr_SetString(PyExc_ValueError,"Sequence elements must be numbers");
return NULL;
}
}
$1 = temp;
}
%typemap(argout) float col[3] {
    for (int i = 0; i < $1_dim0; i++) {
        PyObject *o = PyFloat_FromDouble((double) $1[i]);
        PyList_SetItem($input, i, o);
}
}

clear_color = [114/255.0, 144/255.0, 154/255.0, 0];
imgui.ColorEdit3("clear color", clear_color);

RenderDrawLists の移植
def RenderDrawLists(draw_data):
global g_ShaderHandle

    # Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
    io = imgui.GetIO();
    fb_width = int(io.DisplaySize.x * io.DisplayFramebufferScale.x);
    fb_height = int(io.DisplaySize.y * io.DisplayFramebufferScale.y);
    if fb_width == 0 or fb_height == 0:
        return;
    draw_data.ScaleClipRects(io.DisplayFramebufferScale);

    # Backup GL state
    last_active_texture=glGetIntegerv(GL_ACTIVE_TEXTURE);
    glActiveTexture(GL_TEXTURE0);
    last_program=glGetIntegerv(GL_CURRENT_PROGRAM);
    last_texture=glGetIntegerv(GL_TEXTURE_BINDING_2D);
    last_array_buffer=glGetIntegerv(GL_ARRAY_BUFFER_BINDING);
    last_element_array_buffer=glGetIntegerv(GL_ELEMENT_ARRAY_BUFFER_BINDING);
    last_vertex_array=glGetIntegerv(GL_VERTEX_ARRAY_BINDING);
    last_blend_src_rgb=glGetIntegerv(GL_BLEND_SRC_RGB);
    last_blend_dst_rgb=glGetIntegerv(GL_BLEND_DST_RGB);
    last_blend_src_alpha=glGetIntegerv(GL_BLEND_SRC_ALPHA);
    last_blend_dst_alpha=glGetIntegerv(GL_BLEND_DST_ALPHA);
    last_blend_equation_rgb=glGetIntegerv(GL_BLEND_EQUATION_RGB);
    last_blend_equation_alpha=glGetIntegerv(GL_BLEND_EQUATION_ALPHA);
    last_viewport=glGetIntegerv(GL_VIEWPORT);
    last_scissor_box=glGetIntegerv(GL_SCISSOR_BOX);
    last_enable_blend = glIsEnabled(GL_BLEND);
    last_enable_cull_face = glIsEnabled(GL_CULL_FACE);
    last_enable_depth_test = glIsEnabled(GL_DEPTH_TEST);
    last_enable_scissor_test = glIsEnabled(GL_SCISSOR_TEST);

    # Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled
    glEnable(GL_BLEND);
    glBlendEquation(GL_FUNC_ADD);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glDisable(GL_CULL_FACE);
    glDisable(GL_DEPTH_TEST);
    glEnable(GL_SCISSOR_TEST);

    # Setup viewport, orthographic projection matrix
    glViewport(0, 0, fb_width, fb_height);
    ortho_projection = (ctypes.c_float * 16)(
         2.0/io.DisplaySize.x, 0.0,                   0.0, 0.0,
         0.0,                  2.0/-io.DisplaySize.y, 0.0, 0.0,
         0.0,                  0.0,                  -1.0, 0.0,
        -1.0,                  1.0,                   0.0, 1.0,
    );
    glUseProgram(g_ShaderHandle);
    glUniform1i(g_AttribLocationTex, 0);
    glUniformMatrix4fv(g_AttribLocationProjMtx, 1, GL_FALSE, ortho_projection);
    glBindVertexArray(g_VaoHandle);

    for n in range(draw_data.CmdListsCount):

        cmd_list = draw_data.CmdLists[n];
        idx_buffer_offset = 0;

        glBindBuffer(GL_ARRAY_BUFFER, g_VboHandle);
        glBufferData(GL_ARRAY_BUFFER, cmd_list.VtxBuffer.Size * SIZEOF_ImDrawVert, cmd_list.VtxBuffer.Data, GL_STREAM_DRAW);

        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, cmd_list.IdxBuffer.Size * SIZEOF_ImDrawVert, cmd_list.IdxBuffer.Data, GL_STREAM_DRAW);

        for cmd_i in range(cmd_list.CmdBuffer.Size):

            pcmd = cmd_list.CmdBuffer[cmd_i];
            if pcmd.UserCallback:
                pcmd.UserCallback(cmd_list, pcmd);
            else:
                glBindTexture(GL_TEXTURE_2D, pcmd.TextureId);
                glScissor(pcmd.ClipRect.x, (fb_height - pcmd.ClipRect.w), (pcmd.ClipRect.z - pcmd.ClipRect.x), (pcmd.ClipRect.w - pcmd.ClipRect.y));
                glDrawElements(GL_TRIANGLES, pcmd.ElemCount, GL_UNSIGNED_SHORT, idx_buffer_offset);

            idx_buffer_offset += pcmd.ElemCount;

    # Restore modified GL state
    glUseProgram(last_program);
    glBindTexture(GL_TEXTURE_2D, last_texture);
    glActiveTexture(last_active_texture);
    glBindVertexArray(last_vertex_array);
    glBindBuffer(GL_ARRAY_BUFFER, last_array_buffer);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, last_element_array_buffer);
    glBlendEquationSeparate(last_blend_equation_rgb, last_blend_equation_alpha);
    glBlendFuncSeparate(last_blend_src_rgb, last_blend_dst_rgb, last_blend_src_alpha, last_blend_dst_alpha);
    if (last_enable_blend):
        glEnable(GL_BLEND);
    else:
        glDisable(GL_BLEND);
    if (last_enable_cull_face):
        glEnable(GL_CULL_FACE);
    else:
        glDisable(GL_CULL_FACE);
    if (last_enable_depth_test):
        glEnable(GL_DEPTH_TEST);
    else:
        glDisable(GL_DEPTH_TEST);
    if (last_enable_scissor_test):
        glEnable(GL_SCISSOR_TEST);
    else:
        glDisable(GL_SCISSOR_TEST);
    glViewport(last_viewport[0], last_viewport[1], last_viewport[2], last_viewport[3]);
    glScissor(last_scissor_box[0], last_scissor_box[1], last_scissor_box[2], last_scissor_box[3]);

getter
配列アクセスできない。
cmd_list = draw_data.CmdLists[n]

ゲッターを実装する
%extend ImDrawData {
ImDrawList\* GetCmdList(int n){
return self->CmdLists[n];
}
}

template の型定義が無い
実装する型を明示する。
%template(ImVectorDrawVert) ImVector<ImDrawVert>;
%template(ImVectorDrawIdx) ImVector<ImDrawIdx>;
%template(ImVectorDrawCmd) ImVector<ImDrawCmd>;

Byte 列を得る
cmd_list.VtxBuffer.Data

%typemap(in, numinputs=0) (unsigned char** out_bytes, int* out_size) (unsigned char *tempP, int tempSize) {
$1 = &tempP;
$2 = &tempSize;
}
%typemap(argout)(unsigned char** out_bytes, int* out_size){
auto b = PyBytes_FromStringAndSize((const char *)_$1, _$2);

    if ((!$result) || ($result == Py_None)) {
        $result = b;
    }
    else{
        if (!PyTuple_Check($result)) {
            // new tuple4
            auto t= PyTuple_New(2);
            PyTuple_SetItem(t, 0, $result);
            PyTuple_SetItem(t, 1, b);
            $result=t;
        }
        else {
            // concat
            auto head = $result;
            auto tail = PyTuple_New(1);
            PyTuple_SetItem($result, 0, b);
            $result = PySequence_Concat(head, tail);
            Py_DECREF(head);
            Py_DECREF(tail);
        }
    }

}

// before
%include "imgui/imgui.h"
// after

%extend ImDrawList {
void GetVtxBufferData(unsigned char **out_bytes, int *out_size){
*out_bytes=(unsigned char *)self->VtxBuffer.Data;
*out_size=self->VtxBuffer.Size \* sizeof(self->VtxBuffer.Data[0]);
}
void GetIdxBufferData(unsigned char **out_bytes, int *out_size){
*out_bytes=(unsigned char *)self->IdxBuffer.Data;
*out_size=self->IdxBuffer.Size \* sizeof(self->IdxBuffer.Data[0]);
}
}

glBindBuffer(GL_ARRAY_BUFFER, g_VboHandle);
glBufferData(GL_ARRAY_BUFFER, cmd_list.VtxBuffer.Size \* SIZEOF_ImDrawVert, cmd_list.GetVtxBufferData(), GL_STREAM_DRAW);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, cmd_list.IdxBuffer.Size \* SIZEOF_Idx, cmd_list.GetIdxBufferData(), GL_STREAM_DRAW);

Shutdown の移植
def Shutdown():
InvalidateDeviceObjects();
imgui.Shutdown();

def InvalidateDeviceObjects():
global g_VaoHandle
global g_VboHandle
global g_ElementsHandle
global g_ShaderHandle
global g_VertHandle
global g_FragHandle
global g_FontTexture

    if (g_VaoHandle): glDeleteVertexArrays(1, g_VaoHandle);
    if (g_VboHandle): glDeleteBuffers(1, g_VboHandle);
    if (g_ElementsHandle): glDeleteBuffers(1, g_ElementsHandle);
    g_VaoHandle = g_VboHandle = g_ElementsHandle = 0;

    if (g_ShaderHandle and g_VertHandle): glDetachShader(g_ShaderHandle, g_VertHandle);
    if (g_VertHandle): glDeleteShader(g_VertHandle);
    g_VertHandle = 0;

    if (g_ShaderHandle and g_FragHandle): glDetachShader(g_ShaderHandle, g_FragHandle);
    if (g_FragHandle): glDeleteShader(g_FragHandle);
    g_FragHandle = 0;

    if (g_ShaderHandle): glDeleteProgram(g_ShaderHandle);
    g_ShaderHandle = 0;

    if (g_FontTexture):
        glDeleteTextures(1, g_FontTexture);
        imgui.GetIO().Fonts.SetTexID(0);
        g_FontTexture = 0;

ProcessEvent の移植
def ProcessEvent(event):
global g_MouseWheel
global g_MousePressed

    io = imgui.GetIO();
    if event.type==SDL_MOUSEWHEEL:
        if (event.wheel.y > 0):
            g_MouseWheel = 1;
        if (event.wheel.y < 0):
            g_MouseWheel = -1;
        return True;
    elif event.type==SDL_MOUSEBUTTONDOWN:
        if (event.button.button == SDL_BUTTON_LEFT): g_MousePressed[0] = True;
        if (event.button.button == SDL_BUTTON_RIGHT): g_MousePressed[1] = True;
        if (event.button.button == SDL_BUTTON_MIDDLE): g_MousePressed[2] = True;
        return True;
    elif event.type==SDL_TEXTINPUT:
        io.AddInputCharactersUTF8(event.text.text);
        return True;
    elif event.type==SDL_KEYDOWN or event.type==SDL_KEYUP:
        key = event.key.keysym.sym & ~SDLK_SCANCODE_MASK;
        io.SetKeysDown(key, event.type == SDL_KEYDOWN);
        io.KeyShift = ((SDL_GetModState() & KMOD_SHIFT) != 0);
        io.KeyCtrl = ((SDL_GetModState() & KMOD_CTRL) != 0);
        io.KeyAlt = ((SDL_GetModState() & KMOD_ALT) != 0);
        io.KeySuper = ((SDL_GetModState() & KMOD_GUI) != 0);
        return True;

    return False;

io.KeysDown
セッター
%extend ImGuiIO {
void SetKeysDown(int k, int v)
{
ImGui::GetIO().KeysDown[k]=v;
}
}

かくしてほぼ動くようになった。

実際には新しい Widget を Python から使用するたびに値をやりとりする部分を追加しなければならないが、そこはおいおいやっていく。
VisualStudio のセットアップ
こういうネイティブモジュールの開発ではないとクラッシュの原因を探すのが困難になるが、VisualStudio で普通にアタッチできるので便利。
ひとつの solution に python プロジェクトと、c++の dll プロジェクトを同居させてデバッグできる。

あとで書く
```
