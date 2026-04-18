/* ============================================
   CODE TEMPLATES LIBRARY
   Boilerplate code for C++, Python, DSA
   Common patterns, data structures,
   algorithm implementations
   ============================================ */

const codeTemplates = {
    cpp: {
        "Hello World": {
            code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
            description: "Basic C++ program structure"
        },
        "Read Input": {
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Read integer
    int n;
    cout << "Enter a number: ";
    cin >> n;

    // Read string
    string name;
    cout << "Enter name: ";
    cin.ignore();
    getline(cin, name);

    cout << "Hello " << name << ", you entered " << n << endl;
    return 0;
}`,
            description: "Reading different types of input"
        },
        "Vector Operations": {
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Create and initialize
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // Add elements
    v.push_back(7);
    v.push_back(4);

    // Size
    cout << "Size: " << v.size() << endl;

    // Sort
    sort(v.begin(), v.end());

    // Print
    cout << "Sorted: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    // Find
    auto it = find(v.begin(), v.end(), 5);
    if (it != v.end()) {
        cout << "Found 5 at index " << (it - v.begin()) << endl;
    }

    // Min and Max
    cout << "Min: " << *min_element(v.begin(), v.end()) << endl;
    cout << "Max: " << *max_element(v.begin(), v.end()) << endl;

    // Sum
    int sum = 0;
    for (int x : v) sum += x;
    cout << "Sum: " << sum << endl;

    // Remove element
    v.erase(remove(v.begin(), v.end(), 3), v.end());

    // Reverse
    reverse(v.begin(), v.end());

    return 0;
}`,
            description: "Common vector operations with STL"
        },
        "Map Operations": {
            code: `#include <iostream>
#include <map>
#include <unordered_map>
using namespace std;

int main() {
    // Ordered map (sorted by key, O(log n))
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;

    // Iterate (sorted order)
    for (auto& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }

    // Check existence
    if (scores.count("Alice")) {
        cout << "Alice's score: " << scores["Alice"] << endl;
    }

    // Unordered map (hash map, O(1) average)
    unordered_map<string, int> freq;
    string text = "hello world hello";
    // Word frequency
    string word;
    for (char c : text) {
        if (c == ' ') {
            if (!word.empty()) freq[word]++;
            word = "";
        } else {
            word += c;
        }
    }
    if (!word.empty()) freq[word]++;

    for (auto& [w, f] : freq) {
        cout << w << ": " << f << endl;
    }

    return 0;
}`,
            description: "Map and unordered_map usage"
        },
        "Class with OOP": {
            code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;
    int accountId;
    static int nextId;

public:
    // Constructor
    BankAccount(const string& name, double initialBalance = 0.0)
        : owner(name), balance(initialBalance), accountId(nextId++) {}

    // Getters
    string getOwner() const { return owner; }
    double getBalance() const { return balance; }
    int getId() const { return accountId; }

    // Methods
    bool deposit(double amount) {
        if (amount <= 0) return false;
        balance += amount;
        return true;
    }

    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        return true;
    }

    // Operator overloading
    friend ostream& operator<<(ostream& os, const BankAccount& acc) {
        os << "Account #" << acc.accountId
           << " | Owner: " << acc.owner
           << " | Balance: $" << acc.balance;
        return os;
    }
};

int BankAccount::nextId = 1001;

// Inheritance
class SavingsAccount : public BankAccount {
    double interestRate;
public:
    SavingsAccount(const string& name, double balance, double rate)
        : BankAccount(name, balance), interestRate(rate) {}

    void applyInterest() {
        deposit(getBalance() * interestRate);
    }
};

int main() {
    BankAccount acc("Hema", 1000);
    acc.deposit(500);
    acc.withdraw(200);
    cout << acc << endl;

    SavingsAccount savings("Hema Savings", 5000, 0.05);
    savings.applyInterest();
    cout << savings << endl;

    return 0;
}`,
            description: "Full OOP example with inheritance"
        },
        "Linked List": {
            code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
    Node* head;
    int size;

public:
    LinkedList() : head(nullptr), size(0) {}

    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }

    void pushFront(int val) {
        Node* node = new Node(val);
        node->next = head;
        head = node;
        size++;
    }

    void pushBack(int val) {
        Node* node = new Node(val);
        if (!head) { head = node; }
        else {
            Node* curr = head;
            while (curr->next) curr = curr->next;
            curr->next = node;
        }
        size++;
    }

    bool remove(int val) {
        if (!head) return false;
        if (head->data == val) {
            Node* temp = head;
            head = head->next;
            delete temp;
            size--;
            return true;
        }
        Node* curr = head;
        while (curr->next && curr->next->data != val)
            curr = curr->next;
        if (curr->next) {
            Node* temp = curr->next;
            curr->next = temp->next;
            delete temp;
            size--;
            return true;
        }
        return false;
    }

    void reverse() {
        Node* prev = nullptr;
        Node* curr = head;
        while (curr) {
            Node* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }

    bool hasCycle() {
        Node* slow = head;
        Node* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }

    void print() {
        Node* curr = head;
        while (curr) {
            cout << curr->data;
            if (curr->next) cout << " -> ";
            curr = curr->next;
        }
        cout << " -> NULL" << endl;
    }

    int getSize() { return size; }
};

int main() {
    LinkedList list;
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    list.pushFront(0);
    list.print();  // 0 -> 1 -> 2 -> 3 -> NULL

    list.reverse();
    list.print();  // 3 -> 2 -> 1 -> 0 -> NULL

    list.remove(2);
    list.print();  // 3 -> 1 -> 0 -> NULL

    return 0;
}`,
            description: "Complete singly linked list implementation"
        },
        "Binary Search Tree": {
            code: `#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

class BST {
    TreeNode* root;

    TreeNode* insert(TreeNode* node, int val) {
        if (!node) return new TreeNode(val);
        if (val < node->val) node->left = insert(node->left, val);
        else if (val > node->val) node->right = insert(node->right, val);
        return node;
    }

    TreeNode* findMin(TreeNode* node) {
        while (node->left) node = node->left;
        return node;
    }

    TreeNode* remove(TreeNode* node, int val) {
        if (!node) return nullptr;
        if (val < node->val) node->left = remove(node->left, val);
        else if (val > node->val) node->right = remove(node->right, val);
        else {
            if (!node->left) { TreeNode* r = node->right; delete node; return r; }
            if (!node->right) { TreeNode* l = node->left; delete node; return l; }
            TreeNode* minNode = findMin(node->right);
            node->val = minNode->val;
            node->right = remove(node->right, minNode->val);
        }
        return node;
    }

    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        cout << node->val << " ";
        inorder(node->right);
    }

    void preorder(TreeNode* node) {
        if (!node) return;
        cout << node->val << " ";
        preorder(node->left);
        preorder(node->right);
    }

    int height(TreeNode* node) {
        if (!node) return 0;
        return 1 + max(height(node->left), height(node->right));
    }

    bool isValid(TreeNode* node, long minVal, long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return isValid(node->left, minVal, node->val) &&
               isValid(node->right, node->val, maxVal);
    }

public:
    BST() : root(nullptr) {}

    void insert(int val) { root = insert(root, val); }
    void remove(int val) { root = remove(root, val); }

    bool search(int val) {
        TreeNode* curr = root;
        while (curr) {
            if (val == curr->val) return true;
            curr = val < curr->val ? curr->left : curr->right;
        }
        return false;
    }

    void printInorder() { inorder(root); cout << endl; }
    void printPreorder() { preorder(root); cout << endl; }
    int getHeight() { return height(root); }
    bool isValidBST() { return isValid(root, LONG_MIN, LONG_MAX); }

    void levelOrder() {
        if (!root) return;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                cout << node->val << " ";
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            cout << "| ";
        }
        cout << endl;
    }
};

int main() {
    BST tree;
    tree.insert(50);
    tree.insert(30);
    tree.insert(70);
    tree.insert(20);
    tree.insert(40);
    tree.insert(60);
    tree.insert(80);

    cout << "Inorder: "; tree.printInorder();
    cout << "Level order: "; tree.levelOrder();
    cout << "Height: " << tree.getHeight() << endl;
    cout << "Valid BST: " << (tree.isValidBST() ? "Yes" : "No") << endl;
    cout << "Search 40: " << (tree.search(40) ? "Found" : "Not found") << endl;

    tree.remove(30);
    cout << "After removing 30: "; tree.printInorder();

    return 0;
}`,
            description: "Complete BST with all operations"
        },
        "Graph BFS/DFS": {
            code: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
    bool directed;

public:
    Graph(int v, bool dir = false) : V(v), adj(v), directed(dir) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);
    }

    // BFS
    vector<int> bfs(int start) {
        vector<int> result;
        vector<bool> visited(V, false);
        queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int node = q.front(); q.pop();
            result.push_back(node);

            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        return result;
    }

    // DFS Iterative
    vector<int> dfs(int start) {
        vector<int> result;
        vector<bool> visited(V, false);
        stack<int> s;

        s.push(start);
        while (!s.empty()) {
            int node = s.top(); s.pop();
            if (visited[node]) continue;
            visited[node] = true;
            result.push_back(node);

            for (int i = adj[node].size() - 1; i >= 0; i--) {
                if (!visited[adj[node][i]]) {
                    s.push(adj[node][i]);
                }
            }
        }
        return result;
    }

    // DFS Recursive
    void dfsRecHelper(int node, vector<bool>& visited, vector<int>& result) {
        visited[node] = true;
        result.push_back(node);
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfsRecHelper(neighbor, visited, result);
            }
        }
    }

    vector<int> dfsRecursive(int start) {
        vector<int> result;
        vector<bool> visited(V, false);
        dfsRecHelper(start, visited, result);
        return result;
    }

    // Detect cycle (undirected)
    bool hasCycleUtil(int node, int parent, vector<bool>& visited) {
        visited[node] = true;
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                if (hasCycleUtil(neighbor, node, visited)) return true;
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }

    bool hasCycle() {
        vector<bool> visited(V, false);
        for (int i = 0; i < V; i++) {
            if (!visited[i] && hasCycleUtil(i, -1, visited))
                return true;
        }
        return false;
    }

    // Connected components
    int countComponents() {
        vector<bool> visited(V, false);
        int count = 0;
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                bfsComponent(i, visited);
                count++;
            }
        }
        return count;
    }

    void bfsComponent(int start, vector<bool>& visited) {
        queue<int> q;
        visited[start] = true;
        q.push(start);
        while (!q.empty()) {
            int node = q.front(); q.pop();
            for (int n : adj[node]) {
                if (!visited[n]) {
                    visited[n] = true;
                    q.push(n);
                }
            }
        }
    }

    // Shortest path (unweighted)
    vector<int> shortestPath(int start, int end) {
        vector<int> parent(V, -1);
        vector<bool> visited(V, false);
        queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int node = q.front(); q.pop();
            if (node == end) break;
            for (int n : adj[node]) {
                if (!visited[n]) {
                    visited[n] = true;
                    parent[n] = node;
                    q.push(n);
                }
            }
        }

        vector<int> path;
        for (int at = end; at != -1; at = parent[at])
            path.push_back(at);
        reverse(path.begin(), path.end());
        return path[0] == start ? path : vector<int>();
    }
};

int main() {
    Graph g(7);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(2, 5);
    g.addEdge(2, 6);

    cout << "BFS: ";
    for (int x : g.bfs(0)) cout << x << " ";
    cout << endl;

    cout << "DFS: ";
    for (int x : g.dfs(0)) cout << x << " ";
    cout << endl;

    cout << "Components: " << g.countComponents() << endl;
    cout << "Has cycle: " << (g.hasCycle() ? "Yes" : "No") << endl;

    cout << "Shortest 0->6: ";
    for (int x : g.shortestPath(0, 6)) cout << x << " ";
    cout << endl;

    return 0;
}`,
            description: "Complete graph implementation with BFS, DFS, cycle detection"
        },
        "Sorting Algorithms": {
            code: `#include <iostream>
#include <vector>
using namespace std;

// Bubble Sort - O(n²)
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

// Selection Sort - O(n²)
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}

// Insertion Sort - O(n²) worst, O(n) best
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Merge Sort - O(n log n)
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (int p = 0; p < k; p++)
        arr[left + p] = temp[p];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// Quick Sort - O(n log n) avg, O(n²) worst
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            swap(arr[++i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
}

void printArr(const vector<int>& arr, const string& label) {
    cout << label << ": ";
    for (int x : arr) cout << x << " ";
    cout << endl;
}

int main() {
    vector<int> original = {64, 34, 25, 12, 22, 11, 90};

    vector<int> arr1 = original;
    bubbleSort(arr1);
    printArr(arr1, "Bubble");

    vector<int> arr2 = original;
    selectionSort(arr2);
    printArr(arr2, "Selection");

    vector<int> arr3 = original;
    insertionSort(arr3);
    printArr(arr3, "Insertion");

    vector<int> arr4 = original;
    mergeSort(arr4, 0, arr4.size() - 1);
    printArr(arr4, "Merge");

    vector<int> arr5 = original;
    quickSort(arr5, 0, arr5.size() - 1);
    printArr(arr5, "Quick");

    return 0;
}`,
            description: "All major sorting algorithms implemented"
        },
        "Dynamic Programming": {
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// 1. Fibonacci - O(n)
int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}

// 2. Climbing Stairs - O(n)
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}

// 3. Coin Change - O(n * amount)
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}

// 4. Longest Increasing Subsequence - O(n²)
int lis(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    vector<int> dp(n, 1);
    int maxLen = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    return maxLen;
}

// 5. 0/1 Knapsack - O(n * W)
int knapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w];
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][W];
}

// 6. Longest Common Subsequence - O(m * n)
int lcs(string& a, string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i - 1] == b[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

// 7. House Robber - O(n)
int houseRobber(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    int prev2 = nums[0], prev1 = max(nums[0], nums[1]);
    for (int i = 2; i < n; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 8. Maximum Subarray (Kadane's) - O(n)
int maxSubarray(vector<int>& nums) {
    int maxSum = nums[0], currSum = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        currSum = max(nums[i], currSum + nums[i]);
        maxSum = max(maxSum, currSum);
    }
    return maxSum;
}

int main() {
    cout << "Fibonacci(10): " << fibonacci(10) << endl;
    cout << "Climb Stairs(5): " << climbStairs(5) << endl;

    vector<int> coins = {1, 5, 11};
    cout << "Coin Change(15): " << coinChange(coins, 15) << endl;

    vector<int> seq = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS: " << lis(seq) << endl;

    vector<int> wt = {2, 3, 4, 5}, val = {3, 4, 5, 6};
    cout << "Knapsack(5): " << knapsack(wt, val, 5) << endl;

    string s1 = "abcde", s2 = "ace";
    cout << "LCS: " << lcs(s1, s2) << endl;

    vector<int> houses = {2, 7, 9, 3, 1};
    cout << "House Robber: " << houseRobber(houses) << endl;

    vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Max Subarray: " << maxSubarray(arr) << endl;

    return 0;
}`,
            description: "8 classic DP problems with solutions"
        },
    },
    python: {
        "Hello World": {
            code: `# Python 3
print("Hello, World!")`,
            description: "Basic Python program"
        },
        "List Operations": {
            code: `# List creation and operations
numbers = [1, 2, 3, 4, 5]

# Append, insert, remove
numbers.append(6)
numbers.insert(0, 0)
numbers.remove(3)

# Slicing
first_three = numbers[:3]
last_two = numbers[-2:]
reversed_list = numbers[::-1]

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# Nested list comprehension
matrix = [[i*3+j+1 for j in range(3)] for i in range(3)]

# Common operations
print(f"Length: {len(numbers)}")
print(f"Sum: {sum(numbers)}")
print(f"Min: {min(numbers)}, Max: {max(numbers)}")
print(f"Sorted: {sorted(numbers)}")
print(f"Index of 4: {numbers.index(4)}")
print(f"Count of 2: {numbers.count(2)}")

# Enumerate
for i, val in enumerate(numbers):
    print(f"Index {i}: {val}")

# Zip
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Map, filter, reduce
from functools import reduce
doubled = list(map(lambda x: x * 2, numbers))
filtered = list(filter(lambda x: x > 3, numbers))
total = reduce(lambda a, b: a + b, numbers)
print(f"Doubled: {doubled}")
print(f"Filtered: {filtered}")
print(f"Total: {total}")`,
            description: "Comprehensive list operations"
        },
        "Dictionary Operations": {
            code: `# Dictionary creation
student = {
    "name": "Hema",
    "age": 27,
    "courses": ["C++", "Python", "DSA"],
    "scores": {"C++": 90, "Python": 95, "DSA": 88}
}

# Access
print(student["name"])
print(student.get("gpa", "N/A"))  # Safe access with default

# Iterate
for key, value in student.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Merge dictionaries
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}
print(merged)

# Collections
from collections import Counter, defaultdict, OrderedDict

# Counter
text = "hello world hello python hello"
word_count = Counter(text.split())
print(word_count)  # Counter({'hello': 3, 'world': 1, 'python': 1})
print(word_count.most_common(2))

# defaultdict
graph = defaultdict(list)
graph["A"].append("B")
graph["A"].append("C")
graph["B"].append("D")
print(dict(graph))

# Frequency count pattern
def top_k_frequent(nums, k):
    count = Counter(nums)
    return [x for x, _ in count.most_common(k)]

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]`,
            description: "Dictionary operations and collections"
        },
        "OOP in Python": {
            code: `from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @abstractmethod
    def speak(self):
        pass

    def __str__(self):
        return f"{self.__class__.__name__}(name={self._name}, age={self._age})"

    def __repr__(self):
        return f"{self.__class__.__name__}({self._name!r}, {self._age!r})"

    def __eq__(self, other):
        return isinstance(other, Animal) and self._name == other._name

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self._breed = breed

    def speak(self):
        return f"{self._name} says Woof!"

    @property
    def breed(self):
        return self._breed

class Cat(Animal):
    def speak(self):
        return f"{self._name} says Meow!"

# Decorator example
class Timer:
    import time

    @staticmethod
    def measure(func):
        import time
        def wrapper(*args, **kwargs):
            start = time.time()
            result = func(*args, **kwargs)
            end = time.time()
            print(f"{func.__name__} took {end-start:.4f}s")
            return result
        return wrapper

# Context manager
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        return False

# Usage
dog = Dog("Buddy", 3, "Golden Retriever")
cat = Cat("Whiskers", 5)

print(dog)
print(dog.speak())
print(cat.speak())

# Polymorphism
animals = [dog, cat]
for animal in animals:
    print(f"{animal.name}: {animal.speak()}")`,
            description: "Complete OOP with abstract classes, properties, decorators"
        },
        "Graph Algorithms": {
            code: `from collections import deque, defaultdict
import heapq

class Graph:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed

    def add_edge(self, u, v, weight=1):
        self.graph[u].append((v, weight))
        if not self.directed:
            self.graph[v].append((u, weight))

    def bfs(self, start):
        visited = set([start])
        queue = deque([start])
        result = []
        while queue:
            node = queue.popleft()
            result.append(node)
            for neighbor, _ in self.graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result

    def dfs(self, start, visited=None):
        if visited is None:
            visited = set()
        visited.add(start)
        result = [start]
        for neighbor, _ in self.graph[start]:
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        return result

    def dijkstra(self, start):
        distances = {node: float('inf') for node in self.graph}
        distances[start] = 0
        heap = [(0, start)]
        while heap:
            dist, node = heapq.heappop(heap)
            if dist > distances[node]:
                continue
            for neighbor, weight in self.graph[node]:
                new_dist = dist + weight
                if new_dist < distances.get(neighbor, float('inf')):
                    distances[neighbor] = new_dist
                    heapq.heappush(heap, (new_dist, neighbor))
        return distances

    def topological_sort(self):
        in_degree = defaultdict(int)
        for u in self.graph:
            for v, _ in self.graph[u]:
                in_degree[v] += 1
        queue = deque([u for u in self.graph if in_degree[u] == 0])
        result = []
        while queue:
            node = queue.popleft()
            result.append(node)
            for neighbor, _ in self.graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        return result if len(result) == len(self.graph) else []

    def has_cycle(self):
        WHITE, GRAY, BLACK = 0, 1, 2
        color = defaultdict(int)
        def dfs(node):
            color[node] = GRAY
            for neighbor, _ in self.graph[node]:
                if color[neighbor] == GRAY:
                    return True
                if color[neighbor] == WHITE and dfs(neighbor):
                    return True
            color[node] = BLACK
            return False
        return any(dfs(node) for node in self.graph if color[node] == WHITE)

# Number of Islands
def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    return count

# Demo
g = Graph(directed=True)
g.add_edge('A', 'B', 4)
g.add_edge('A', 'C', 2)
g.add_edge('B', 'D', 3)
g.add_edge('C', 'B', 1)
g.add_edge('C', 'D', 5)

print("BFS:", g.bfs('A'))
print("DFS:", g.dfs('A'))
print("Dijkstra:", g.dijkstra('A'))
print("Topological:", g.topological_sort())
print("Has cycle:", g.has_cycle())

grid = [
    ['1','1','0','0'],
    ['1','1','0','0'],
    ['0','0','1','0'],
    ['0','0','0','1']
]
print("Islands:", num_islands(grid))`,
            description: "Complete graph algorithms in Python"
        },
        "Dynamic Programming": {
            code: `# 1. Fibonacci - O(n)
def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# 2. Climbing Stairs
def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

# 3. Coin Change
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# 4. Longest Increasing Subsequence
def lis(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# 5. 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][capacity]

# 6. Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# 7. House Robber
def house_robber(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    return prev1

# 8. Edit Distance
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

# 9. Maximum Subarray (Kadane's)
def max_subarray(nums):
    max_sum = curr_sum = nums[0]
    for num in nums[1:]:
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
    return max_sum

# 10. Word Break
def word_break(s, word_dict):
    dp = [False] * (len(s) + 1)
    dp[0] = True
    word_set = set(word_dict)
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[len(s)]

# Demo
print("Fibonacci(10):", fibonacci(10))
print("Climb(5):", climb_stairs(5))
print("Coin Change:", coin_change([1, 5, 11], 15))
print("LIS:", lis([10, 9, 2, 5, 3, 7, 101, 18]))
print("Knapsack:", knapsack([2,3,4,5], [3,4,5,6], 5))
print("LCS:", lcs("abcde", "ace"))
print("House Robber:", house_robber([2,7,9,3,1]))
print("Edit Distance:", edit_distance("horse", "ros"))
print("Max Subarray:", max_subarray([-2,1,-3,4,-1,2,1,-5,4]))
print("Word Break:", word_break("leetcode", ["leet", "code"]))`,
            description: "10 classic DP problems in Python"
        },
    }
};

// ===== RENDER TEMPLATES =====
function renderCodeTemplates(lang) {
    const container = document.getElementById('code-templates-list');
    if (!container) return;

    const templates = codeTemplates[lang || 'cpp'] || {};

    container.innerHTML = Object.entries(templates).map(([name, tmpl]) => `
        <div class="template-card" onclick="loadTemplate('${lang}', '${escapeHtml(name)}')">
            <div class="template-card-header">
                <h4>${escapeHtml(name)}</h4>
                <span class="snippet-lang ${lang}">${lang}</span>
            </div>
            <p class="template-desc">${escapeHtml(tmpl.description)}</p>
            <pre class="template-preview">${escapeHtml(tmpl.code.substring(0, 100))}...</pre>
        </div>
    `).join('');
}

function loadTemplate(lang, name) {
    const tmpl = codeTemplates[lang]?.[name];
    if (!tmpl) return;

    const editor = document.getElementById('code-editor');
    const langSelect = document.getElementById('editor-lang');
    if (editor) editor.value = tmpl.code;
    if (langSelect) langSelect.value = lang;
    if (typeof updateLineNumbers === 'function') updateLineNumbers();

    switchTab('editor');
    showToast(`Template "${name}" loaded!`, 'success');
}
