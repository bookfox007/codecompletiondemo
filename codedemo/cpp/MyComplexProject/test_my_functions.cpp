#include <iostream>
#include "my_functions.h"

void test_add() {
    std::cout << "Testing add function..." << std::endl;
    std::cout << "5 + 7 = " << add(5, 7) << std::endl;
}

void test_is_prime() {
    std::cout << "Testing is_prime function..." << std::endl;
    int num = 29;
    if (is_prime(num)) {
        std::cout << num << " is a prime number." << std::endl;
    } else {
        std::cout << num << " is not a prime number." << std::endl;
    }
}

int main() {
    test_add();
    test_is_prime();
    return 0;
}
