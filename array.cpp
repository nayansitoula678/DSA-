#include <iostream>
using namespace std;

int main() {
    int arr[10] = {1, 2, 3, 4, 5};
    int size = 5;

    // Insertion at end
    arr[size++] = 6;

    // Deletion of element 3
    for (int i = 0; i < size; i++) {
        if (arr[i] == 3) {
            for (int j = i; j < size - 1; j++) {
                arr[j] = arr[j + 1];
            }
            size--;
            break;
        }
    }

    // Traversal
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    // Searching
    for (int i = 0; i < size; i++) {
        if (arr[i] == 4) {
            cout << "Found 4 at index " << i << endl;
            break;
        }
    }

    return 0;
}