#include <iostream>
#include "my_functions.h"

int main() {
    int a = 5;
    int b = 7;
    std::cout << "Sum of " << a << " and " << b << " is " << add(a, b) << std::endl;

    int num = 29;
    if (is_prime(num)) {
        std::cout << num << " is a prime number." << std::endl;
    } else {
        std::cout << num << " is not a prime number." << std::endl;
    }

    int first=23;
    int second = 25;
    int n = 5;
    std::cout << "The " << n << "th number in Fibonacci sequence with start numbers " << first << " and " << second << " is " << fibonacci(n, first, second) << std::endl;


    //打印方法中的所有int类型变量
    

    return 0;
}
