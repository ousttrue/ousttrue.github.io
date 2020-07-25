---
Title: "cmakeで実行ファイルを作成する例"
date: 2017-05-28
Tags: []
---


main.cpp
CMakeLists.txt

main.cpp
int main()
{
   return 0;
}

CMakeLists.txt
cmake_minimum_required(VERSION 2.8)
project(hello) # .sln
add_executable(hello main.cpp) # .vcxproj

実行
> mkdir build
> cd build
build> cmake.exe .. -G "Visual Studio 15 2017"
build> dir 
CMakeFiles
ALL_BUILD.vcxproj
ALL_BUILD.vcxproj.filters
CMakeCache.txt
cmake_install.cmake
hello.sln
hello.vcxproj
hello.vcxproj.filters
ZERO_CHECK.vcxproj
ZERO_CHECK.vcxproj.filters

