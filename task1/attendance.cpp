#include <iostream>
#include <queue>
#include <stack>
#include <unordered_set>
#include <vector>
#include <algorithm>

using namespace std;

class AttendanceSystem {
private:
    queue<int> entryQueue;            
    unordered_set<int> presentSet;    
    stack<int> undoStack;             
    vector<int> attendanceList;    

public:

    void markAttendance(int studentID) {
        if (presentSet.find(studentID) != presentSet.end()) {
            cout << "Student " << studentID << " is already marked present.\n";
            return;
        }

        entryQueue.push(studentID);
        presentSet.insert(studentID);
        undoStack.push(studentID);
        attendanceList.push_back(studentID);

        cout << "Attendance marked for student " << studentID << ".\n";
    }


    void checkPresence(int studentID) {
        if (presentSet.find(studentID) != presentSet.end())
            cout << "Student " << studentID << " is PRESENT.\n";
        else
            cout << "Student " << studentID << " is ABSENT.\n";
    }

    
    void undoAttendance() {
        if (undoStack.empty()) {
            cout << "No attendance to undo.\n";
            return;
        }

        int lastStudent = undoStack.top();
        undoStack.pop();

        presentSet.erase(lastStudent);

       
        attendanceList.erase(
            remove(attendanceList.begin(), attendanceList.end(), lastStudent),
            attendanceList.end()
        );

        cout << "Attendance undone for student " << lastStudent << ".\n";
    }

  
    void displayAttendance() {
        if (attendanceList.empty()) {
            cout << "No students present.\n";
            return;
        }

        cout << "Present Students (Entry Order): ";
        for (int id : attendanceList)
            cout << id << " ";
        cout << endl;
    }
};

int main() {
    AttendanceSystem system;
    int choice, studentID;

    while (true) {
        cout << "\n--- Student Attendance Management System ---\n";
        cout << "1. Mark Attendance\n";
        cout << "2. Check Student Presence\n";
        cout << "3. Undo Last Attendance\n";
        cout << "4. Display Attendance\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                cout << "Enter Student ID: ";
                cin >> studentID;
                system.markAttendance(studentID);
                break;

            case 2:
                cout << "Enter Student ID: ";
                cin >> studentID;
                system.checkPresence(studentID);
                break;

            case 3:
                system.undoAttendance();
                break;

            case 4:
                system.displayAttendance();
                break;

            case 5:
                cout << "Exiting system.\n";
                return 0;

            default:
                cout << "Invalid choice. Try again.\n";
        }
    }
}
