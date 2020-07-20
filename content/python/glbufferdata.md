---
Title: "PyOpenGLのglBufferDataにはどんなデータが渡せるのか"
Published: 2017-8-1
Tags: ["python", "opengl"]
---

glBufferDataに数字のlistを渡す場合以下のように渡せるがどうゆう実装なのか。

```py
vertices=[0, 1, 2] # x, y, z

glBufferData(GL_ARRAY_BUFFER, 
        len(vertices)*4,  # byte size
        (ctypes.c_float*len(vertices))(*vertices), # 謎のctypes
        GL_STATIC_DRAW)
```

非常に読み辛かったがVisualStudioでステップ実行して動きを追ってみた。

```py
# site-packages/OpenGL/GL/VERSION/GL_1_5.py
@_lazy( glBufferData )
def glBufferData( baseOperation, target, size, data=None, usage=None ):
    """Copy given data into the currently bound vertex-buffer-data object

    target -- the symbolic constant indicating which buffer type is intended
    size -- if provided, the count-in-bytes of the array
    data -- data-pointer to be used, may be None to initialize without
        copying over a data-set
    usage -- hint to the driver as to how to set up access to the buffer

    Note: parameter "size" can be omitted, which makes the signature
        glBufferData( target, data, usage )
    instead of:
        glBufferData( target, size, data, usage )
    """
    if usage is None:
        usage = data
        data = size
        size = None
    data = ArrayDatatype.asArray( data ) # <- ここでPythonの型をOpenGLに渡せるように変換
    if size is None:
        size = ArrayDatatype.arrayByteCount( data )
    return baseOperation( target, size, data, usage )
```

難関。デバッガ無しでは追えませんでした。

```py
# site-packages/OpenGL/arrays/arraydatatype.py
class HandlerRegistry( dict ):
    def __init__( self, plugin_match ):
        self.match = plugin_match

    def __call__( self, value ): # 4
        """Lookup of handler for given value"""
        try:
            typ = value.__class__
        except AttributeError as err:
            typ = type(value)
        handler = self.get( typ )
        if not handler:
            if hasattr( typ, '__mro__' ):
                for base in typ.__mro__:
                    handler = self.get( base )
                    if not handler:
                        handler = self.match( base ) # 5
                        if handler:
                            handler = handler.load()
                            if handler:
                                handler = handler()
                    if handler:
                        self[ typ ] = handler
                        if hasattr( handler, 'registerEquivalent' ):
                            handler.registerEquivalent( typ, base )
                        return handler
            raise TypeError(
                    """No array-type handler for type %s.%s (value: %s) registered"""%(
                        typ.__module__, type.__name__, repr(value)[:50]
                        )
                    )
            return handler

GLOBAL_REGISTRY = HandlerRegistry(
    plugins.FormatHandler.match # 6 -> plugins.pyに進む
    ) # 3
class ArrayDatatype( object ):
    getHandler = GLOBAL_REGISTRY.__call__ # 2
    def asArray( cls, value, typeCode=None ): # 0 <- glBufferDataから呼ばれる
        """Given a value, convert to preferred array representation"""
        return cls.getHandler(value).asArray( value, typeCode or cls.typeConstant ) # 1
    asArray = classmethod( logs.logOnFail( asArray, _log ) )
```

```py
# site-packages/OpenGL/plugins.py
class Plugin( object ):
    """Base class for plugins to be loaded"""
    loaded = False
    def __init__( self, name, import_path, check = None, **named ):
        """Register the plug-in"""
        self.registry.append( self ) # <-  FormatHandlerのインスタンスが登録される

class FormatHandler( Plugin ):
    """Data-type storage-format handler"""
    registry = [] # <- OpenGL/__init__.pyで初期化される
    @classmethod
    def match( cls, value ): # 7
        """Lookup appropriate handler based on value (a type)"""
        key = '%s.%s'%( value.__module__, value.__name__ )
        for plugin in cls.registry: # <- ここにハンドラのリストがある
            set = getattr( plugin, 'check', ())
            if set and key in set:
                return plugin
        return None
```

これらがimport時にFormatHandlerとして登録される。

```py
# site-packages/OpenGL/__init__.py
FormatHandler( 'none', 'OpenGL.arrays.nones.NoneHandler', [ _bi+'.NoneType'],isOutput=False )

if sys.version_info[0] < 3:
    FormatHandler( 'str', 'OpenGL.arrays.strings.StringHandler',[_bi+'.str'], isOutput=False )
    FormatHandler( 'unicode', 'OpenGL.arrays.strings.UnicodeHandler',[_bi+'.unicode'], isOutput=False )
else:
    FormatHandler( 'bytes', 'OpenGL.arrays.strings.StringHandler',[_bi+'.bytes'], isOutput=False )
    FormatHandler( 'str', 'OpenGL.arrays.strings.UnicodeHandler',[_bi+'.str'], isOutput=False )
    
FormatHandler( 'list', 'OpenGL.arrays.lists.ListHandler', [
    _bi+'.list',
    _bi+'.tuple',
], isOutput=False )
FormatHandler( 'numbers', 'OpenGL.arrays.numbers.NumberHandler', [
    _bi+'.int',
    _bi+'.float',
    _bi+'.long',
], isOutput=False )
FormatHandler(
    'ctypesarrays', 'OpenGL.arrays.ctypesarrays.CtypesArrayHandler',
    [
        '_ctypes.ArrayType',
        '_ctypes.PyCArrayType',
        '_ctypes.Array',
        '_ctypes.array.Array',
    ],
    isOutput=True,
)
FormatHandler(
    'ctypesparameter',
    'OpenGL.arrays.ctypesparameters.CtypesParameterHandler',
    [
        _bi+'.CArgObject',
        'ctypes.c_uint',
        'ctypes.c_int',
        'ctypes.c_float',
        'ctypes.c_double',
        'ctypes.c_ulong',
        'ctypes.c_long',
        'ctypes.c_longlong',
    ],
    isOutput=True,
)
FormatHandler( 'ctypespointer', 'OpenGL.arrays.ctypespointers.CtypesPointerHandler',[
    'ctypes.c_void_p',
    '_ctypes._Pointer',
    'ctypes.c_char_p',
    '_ctypes.pointer._Pointer',
],isOutput=False )
FormatHandler( 'numpy', 'OpenGL.arrays.numpymodule.NumpyHandler', [
    'numpy.ndarray',
    'numpy.core.memmap.memmap',
],isOutput=True )
FormatHandler( 'buffer', 'OpenGL.arrays.buffers.BufferHandler', [
    'OpenGL.arrays._buffers.Py_buffer',
    _bi+'.memoryview',
    _bi+'.bytearray',
],isOutput=True )
FormatHandler( 'vbo', 'OpenGL.arrays.vbo.VBOHandler', ['OpenGL.arrays.vbo.VBO','OpenGL_accelerate.vbo.VBO'],isOutput=False )
FormatHandler( 'vbooffset', 'OpenGL.arrays.vbo.VBOOffsetHandler', ['OpenGL.arrays.vbo.VBOOffset','OpenGL_accelerate.vbo.VBOOffset'],isOutput=False )
```

numpyとか定義されているね。なるほど。

`(ctypes.c_float*len(vertices))(*vertices)` は `ctypes.c_float` にマッチして、`CtypesArrayHandler` によって処理される。
一方、単なるPythonのlistであるverticesは、`OpenGL.arrays.lists.ListHandler` によって処理されて `NotImplementedError` に落ちるのであった。

```py
class ListHandler( formathandler.FormatHandler ):
    @classmethod
    def asArray( cls, value, typeCode=None ):
        """Convert given value to a ctypes array value of given typeCode
        
        This does a *lot* of work just to get the data into the correct
        format.  It's not going to be anywhere near as fast as a numpy
        or similar approach!
        """
        if typeCode is None:
            raise NotImplementedError( """Haven't implemented type-inference for lists yet""" )
```

確かにlistだと中身の型が決められんね。なるほど。
