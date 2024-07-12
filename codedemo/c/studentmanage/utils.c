#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "utils.h"

int getIntInput() {
    int value;
    scanf("%d", &value);
    return value;
}

float getFloatInput() {
    float value;
    scanf("%f", &value);
    return value;
}

void getStringInput(char *buffer, int length) {
    getchar(); // Clear the newline character from the buffer
    fgets(buffer, length, stdin);
    buffer[strcspn(buffer, "\n")] = '\0'; // Remove the newline character
}
