---
title: "Boost.PythonのPython3でのstd::string、std::wstringのふるまい"
date: 2017-08-10
tags: ["cpp", "python"]
---

ちょっと気になったので確認。

Windows10(64bit) VisualStudio2017 + Python3.6

```c++
#define BOOST_PYTHON_STATIC_LIB  
#include <boost/python.hpp>

std::string g_bytes;
std::string get_bytes()
{
    return g_bytes;
}
void set_bytes(const std::string &bytes)
{
    g_bytes = bytes;
}

std::wstring g_unicode;
std::wstring get_unicode()
{
    return g_unicode;
}
void set_unicode(const std::wstring &unicode)
{
    g_unicode = unicode;
}


BOOST_PYTHON_MODULE(StringSample)
{
    using namespace boost::python;

    def("add", &add);
    def("get_bytes", &get_bytes);
    def("set_bytes", &set_bytes);
    def("get_unicode", &get_unicode);
    def("set_unicode", &set_unicode);
}
```

# coding: utf-8

```python
import StringSample

StringSample.set_bytes("ascii")
print(StringSample.get_bytes())

StringSample.set_bytes(b"ascii")
print(StringSample.get_bytes())

StringSample.set_unicode("ascii")
print(StringSample.get_unicode())

StringSample.set_unicode(b"ascii")
print(StringSample.get_unicode())

#
StringSample.set_bytes("日本語")
print(StringSample.get_bytes())

StringSample.set_bytes("日本語".encode('utf-8'))
print(StringSample.get_bytes())

StringSample.set_unicode("日本語")
print(StringSample.get_unicode())

StringSample.set_unicode("日本語".encode('utf-8'))
print(StringSample.get_unicode())
```

```
ascii
ascii
ascii
ascii
日本語
日本語
日本語
日本語
続行するには何かキーを押してください . . .
```

bytesはutf-8のバイト列と見なされるようだ。
