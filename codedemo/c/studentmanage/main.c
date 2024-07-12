#include <stdio.h>
#include <stdlib.h>
#include "student.h"
#include "utils.h"

int main() {
    int choice;
    StudentList studentList;
    initStudentList(&studentList);

    while (1) {
        printf("\nStudent Management System\n");
        printf("1. Add Student\n");
        printf("2. Delete Student\n");
        printf("3. Find Student\n");
        printf("4. List Students\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        choice = getIntInput();

        switch (choice) {
            case 1:
                addStudent(&studentList);
                break;
            case 2:
                deleteStudent(&studentList);
                break;
            case 3:
                findStudent(&studentList);
                break;
            case 4:
                listStudents(&studentList);
                break;
            case 5:
                freeStudentList(&studentList);
                exit(0);
            default:
                printf("Invalid choice! Please try again.\n");
        }
    }

    return 0;
}
