#include "my_functions.h"

int add(int a, int b) {
    return a + b;
}

bool is_prime(int number) {
    if (number <= 1) return false;
    for (int i = 2; i * i <= number; i++) {
        if (number % i == 0) return false;
    }
    return true;
}

// 实现斐波那契数列函数，起始数字由用户自定义，返回第n个数
int fibonacci(int n, int first, int second) {
    if (n == 1) return first;
    if (n == 2) return second;
    return fibonacci(n - 1, second, first + second);
}




