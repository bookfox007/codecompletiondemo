#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "student.h"
#include "utils.h"

void initStudentList(StudentList *list) {
    list->head = NULL;
    list->size = 0;
}

void addStudent(StudentList *list) {
    Student *newStudent = (Student *)malloc(sizeof(Student));
    if (!newStudent) {
        printf("Memory allocation failed!\n");
        return;
    }

    printf("Enter student ID: ");
    newStudent->id = getIntInput();
    printf("Enter student name: ");
    getStringInput(newStudent->name, 50);
    printf("Enter student age: ");
    newStudent->age = getIntInput();
    printf("Enter student GPA: ");
    newStudent->gpa = getFloatInput();

    newStudent->next = list->head;
    list->head = newStudent;
    list->size++;

    printf("Student added successfully!\n");
}

void deleteStudent(StudentList *list) {
    if (list->size == 0) {
        printf("No students to delete!\n");
        return;
    }

    int id;
    printf("Enter student ID to delete: ");
    id = getIntInput();

    Student *current = list->head;
    Student *previous = NULL;

    while (current != NULL) {
        if (current->id == id) {
            if (previous == NULL) {
                list->head = current->next;
            } else {
                previous->next = current->next;
            }
            free(current);
            list->size--;
            printf("Student deleted successfully!\n");
            return;
        }
        previous = current;
        current = current->next;
    }

    printf("Student with ID %d not found!\n", id);
}

void findStudent(StudentList *list) {
    if (list->size == 0) {
        printf("No students to find!\n");
        return;
    }

    int id;
    printf("Enter student ID to find: ");
    id = getIntInput();

    Student *current = list->head;
    while (current != NULL) {
        if (current->id == id) {
            printf("Student found:\n");
            printf("ID: %d\n", current->id);
            printf("Name: %s\n", current->name);
            printf("Age: %d\n", current->age);
            printf("GPA: %.2f\n", current->gpa);
            return;
        }
        current = current->next;
    }

    printf("Student with ID %d not found!\n", id);
}

void listStudents(StudentList *list) {
    if (list->size == 0) {
        printf("No students to list!\n");
        return;
    }

    Student *current = list->head;
    printf("Student List:\n");
    while (current != NULL) {
        printf("ID: %d, Name: %s, Age: %d, GPA: %.2f\n",
               current->id, current->name, current->age, current->gpa);
        current = current->next;
    }
}

void freeStudentList(StudentList *list) {
    Student *current = list->head;
    while (current != NULL) {
        Student *temp = current;
        current = current->next;
        free(temp);
    }
    list->head = NULL;
    list->size = 0;
}

//将学生信息持久化到文件中存储
void saveStudentList(StudentList *list) {
    FILE *fp;
    fp = fopen("studentInfo.txt", "w");
    if (fp == NULL) {
        printf("File open failed!\n");
        return;
    } else {
        Student *current = list->head;
        while (current != NULL) {
            fprintf(fp, "%d %s %d %.2f\n", current->id, current->name, current->age, current->gpa);
            current = current->next;
        }
        printf("Student list saved successfully!\n");
        fclose(fp);
    }
}

void loadStudentList(StudentList *list) {
    FILE *fp;
    fp = fopen("studentInfo.txt", "r");
    if (fp == NULL) {
        printf("File open failed!\n");
        return;
    } else {
        Student *current = list->head;
        while (current != NULL) {
            Student *temp = current;
            current = current->next;
            free(temp);
        }
        list->head = NULL;
        list->size = 0; //清空链表
        while (!feof(fp)) {
            Student *newStudent = (Student *)malloc(sizeof(Student));
            if (!newStudent) {
                printf("Memory allocation failed!\n");
                return;
            }
            fscanf(fp, "%d %s %d %f", &newStudent->id, newStudent->name, &newStudent->age, &newStudent->gpa);
            newStudent->next = list->head;
            list->head = newStudent;
            list->size++;
        }
        printf("Student list loaded successfully!\n");
        fclose(fp);
    }
}