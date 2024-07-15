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


    

    return 0;
}
