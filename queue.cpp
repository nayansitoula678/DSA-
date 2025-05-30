#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;

    // Enqueue
    q.push(1);
    q.push(2);

    // Dequeue
    cout << "Dequeued: " << q.front() << endl;
    q.pop();

    // Front
    if (!q.empty()) {
        cout << "Front element: " << q.front() << endl;
    }

    return 0;
}