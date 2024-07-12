#ifndef STUDENT_H
#define STUDENT_H

typedef struct Student {
    int id;
    char name[50];
    int age;
    float gpa;
    struct Student *next;
} Student;

typedef struct {
    Student *head;
    int size;
} StudentList;

void initStudentList(StudentList *list);
void addStudent(StudentList *list);
void deleteStudent(StudentList *list);
void findStudent(StudentList *list);
void listStudents(StudentList *list);
void freeStudentList(StudentList *list);
void saveStudentList(StudentList *list);
void loadStudentList(StudentList *list);

#endif
