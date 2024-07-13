# 支持的最小CMake版本
cmake_minimum_required(VERSION 3.4.1)

# 项目名称和版本
project("MYCOMPLEXPROJECT" VERSION 1.0.0)

set(STNDARDCXX "c++11") 

# 设置编译器
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=${STNDARDCXX} -Wall -Wextra -Werror")





