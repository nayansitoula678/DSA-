#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;

    // Push
    s.push(1);
    s.push(2);

    // Pop
    cout << "Popped: " << s.top() << endl;
    s.pop();

    // Top
    if (!s.empty()) {
        cout << "Top element: " << s.top() << endl;
    }

    return 0;
}