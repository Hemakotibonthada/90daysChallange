/* ============================================
   QUIZ DATA MODULE — All Quiz Questions
   C++ Basics, C++ OOP, Python Basics,
   DSA Fundamentals, DSA Advanced, Complexity
   ============================================ */

const quizData = {
    cpp_basics: {
        title: "C++ Basics",
        timeMinutes: 10,
        questions: [
            { q: "Which header file is required for cout and cin in C++?", options: ["<stdio.h>", "<iostream>", "<conio.h>", "<string.h>"], answer: 1 },
            { q: "What is the correct way to declare a constant in C++?", options: ["constant int x = 5;", "const int x = 5;", "int const x = 5;", "Both B and C"], answer: 3 },
            { q: "Which of the following is NOT a valid C++ data type?", options: ["int", "float", "string", "decimal"], answer: 3 },
            { q: "What does the '&' operator do when used before a variable name in a function parameter?", options: ["Gets the address", "Pass by reference", "Bitwise AND", "Logical AND"], answer: 1 },
            { q: "What is the output of: cout << 5/2;", options: ["2.5", "2", "3", "Error"], answer: 1 },
            { q: "Which loop is guaranteed to execute at least once?", options: ["for loop", "while loop", "do-while loop", "None of them"], answer: 2 },
            { q: "What is the default return type of main() in C++?", options: ["void", "int", "float", "No return type"], answer: 1 },
            { q: "Which operator is used for dynamic memory allocation in C++?", options: ["malloc", "alloc", "new", "create"], answer: 2 },
            { q: "What is a pointer in C++?", options: ["A variable that stores a value", "A variable that stores a memory address", "A type of array", "A function"], answer: 1 },
            { q: "What is the size of 'int' on most 64-bit systems?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"], answer: 1 },
            { q: "What does 'endl' do in C++?", options: ["Ends the program", "Inserts a newline and flushes", "Creates a new variable", "None"], answer: 1 },
            { q: "Which of these is the correct way to create an array of 5 integers?", options: ["int arr(5);", "int arr[5];", "array<int> arr(5);", "Both B and C"], answer: 3 },
            { q: "What is function overloading?", options: ["Calling a function too many times", "Multiple functions with the same name but different parameters", "A function that calls itself", "None"], answer: 1 },
            { q: "What is the scope resolution operator in C++?", options: ["::", "->", ".", "::*"], answer: 0 },
            { q: "What keyword is used to prevent a variable from being modified?", options: ["static", "const", "final", "immutable"], answer: 1 },
        ]
    },
    cpp_oop: {
        title: "C++ OOP",
        timeMinutes: 10,
        questions: [
            { q: "What is encapsulation in OOP?", options: ["Inheriting properties", "Binding data and functions together", "Having multiple forms", "Creating objects"], answer: 1 },
            { q: "Which access specifier makes members accessible only within the class?", options: ["public", "protected", "private", "internal"], answer: 2 },
            { q: "What is the purpose of a constructor?", options: ["To destroy objects", "To initialize objects", "To copy objects", "To compare objects"], answer: 1 },
            { q: "Which keyword is used to derive a class from a base class?", options: ["extends", "derives", ": public", "implements"], answer: 2 },
            { q: "What is polymorphism?", options: ["One name, multiple forms", "Multiple inheritance", "Data hiding", "Object creation"], answer: 0 },
            { q: "What is a virtual function?", options: ["A function that doesn't exist", "A function that can be overridden in derived class", "A static function", "A template function"], answer: 1 },
            { q: "What is a pure virtual function?", options: ["A virtual function with no body (= 0)", "A virtual function with a body", "A private function", "A static function"], answer: 0 },
            { q: "What is the 'this' pointer?", options: ["Pointer to the current class", "Pointer to the current object", "Pointer to the parent class", "Null pointer"], answer: 1 },
            { q: "What is a destructor?", options: ["A function called when object is created", "A function called when object is destroyed", "A function that allocates memory", "A virtual function"], answer: 1 },
            { q: "Which type of inheritance is NOT supported in C++?", options: ["Single", "Multiple", "Multilevel", "All are supported"], answer: 3 },
            { q: "What is the diamond problem?", options: ["A design pattern", "Ambiguity in multiple inheritance", "A memory leak issue", "A compilation error"], answer: 1 },
            { q: "What does the 'friend' keyword do?", options: ["Creates a friendship between objects", "Allows a function to access private members", "Makes a class public", "None"], answer: 1 },
            { q: "What is operator overloading?", options: ["Creating new operators", "Giving special meaning to existing operators for user-defined types", "Removing operators", "None"], answer: 1 },
            { q: "What is an abstract class?", options: ["A class with no members", "A class with at least one pure virtual function", "A class with only static members", "A final class"], answer: 1 },
            { q: "What is the Rule of Three?", options: ["A class should have 3 methods", "If you define destructor, copy constructor, or copy assignment, define all three", "A class should have 3 members", "None"], answer: 1 },
        ]
    },
    python_basics: {
        title: "Python Basics",
        timeMinutes: 10,
        questions: [
            { q: "Which of the following is NOT a valid Python data type?", options: ["list", "tuple", "array", "dict"], answer: 2 },
            { q: "What is the output of: print(type([]))?", options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "Error"], answer: 0 },
            { q: "How do you create a dictionary in Python?", options: ["dict = []", "dict = {}", "dict = ()", "dict = <>"], answer: 1 },
            { q: "What does 'len()' function do?", options: ["Returns the last element", "Returns the length", "Returns the type", "Sorts the sequence"], answer: 1 },
            { q: "Which keyword is used to define a function in Python?", options: ["function", "func", "def", "define"], answer: 2 },
            { q: "What is a list comprehension?", options: ["A way to understand lists", "A concise way to create lists", "A sorting method", "A list method"], answer: 1 },
            { q: "What is the difference between '==' and 'is'?", options: ["No difference", "'==' checks value, 'is' checks identity", "'==' checks identity, 'is' checks value", "Both check identity"], answer: 1 },
            { q: "Which of these is immutable?", options: ["list", "dict", "set", "tuple"], answer: 3 },
            { q: "What does 'self' refer to in Python class methods?", options: ["The class itself", "The current instance", "The parent class", "Nothing"], answer: 1 },
            { q: "How do you handle exceptions in Python?", options: ["try/catch", "try/except", "try/handle", "try/error"], answer: 1 },
            { q: "What is a decorator in Python?", options: ["A design pattern", "A function that modifies another function", "A class method", "A variable type"], answer: 1 },
            { q: "What is the output of: print('Hello'[1])?", options: ["H", "e", "l", "Error"], answer: 1 },
            { q: "What does *args do in a function definition?", options: ["Creates a pointer", "Allows variable positional arguments", "Creates a list", "Nothing"], answer: 1 },
            { q: "Which method adds an element to the end of a list?", options: ["add()", "insert()", "append()", "push()"], answer: 2 },
            { q: "What is a generator in Python?", options: ["A function that returns an iterator using yield", "A class that generates objects", "A loop type", "A data structure"], answer: 0 },
        ]
    },
    dsa_fundamentals: {
        title: "DSA Fundamentals",
        timeMinutes: 15,
        questions: [
            { q: "What is the time complexity of accessing an element in an array by index?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 0 },
            { q: "Which data structure follows LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], answer: 1 },
            { q: "Which data structure follows FIFO (First In First Out)?", options: ["Stack", "Queue", "Tree", "Graph"], answer: 1 },
            { q: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answer: 2 },
            { q: "In a singly linked list, each node contains:", options: ["Only data", "Data and pointer to next node", "Data and pointers to next and previous", "Only pointer"], answer: 1 },
            { q: "What is the worst-case time complexity of Quick Sort?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], answer: 1 },
            { q: "What is the time complexity of Merge Sort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], answer: 1 },
            { q: "What type of tree has at most two children per node?", options: ["B-tree", "Binary tree", "AVL tree", "Red-black tree"], answer: 1 },
            { q: "In a BST, the left child is always:", options: ["Greater than parent", "Less than parent", "Equal to parent", "Random"], answer: 1 },
            { q: "What traversal visits nodes in order: Left, Root, Right?", options: ["Preorder", "Postorder", "Inorder", "Level order"], answer: 2 },
            { q: "What data structure is used in BFS?", options: ["Stack", "Queue", "Array", "Linked List"], answer: 1 },
            { q: "What data structure is used in DFS?", options: ["Queue", "Stack/Recursion", "Array", "Hash Map"], answer: 1 },
            { q: "What is a hash collision?", options: ["When hash table is full", "When two keys map to the same index", "When a key is not found", "When hash function fails"], answer: 1 },
            { q: "What is the average time complexity of hash table lookup?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2 },
            { q: "Which sorting algorithm is stable?", options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"], answer: 2 },
            { q: "What is a balanced binary tree?", options: ["All leaves at same level", "Height difference of subtrees ≤ 1", "All nodes have 2 children", "No duplicate values"], answer: 1 },
            { q: "What is the space complexity of an adjacency matrix for a graph with V vertices?", options: ["O(V)", "O(V²)", "O(V+E)", "O(E)"], answer: 1 },
            { q: "Detect cycle in a linked list uses:", options: ["BFS", "Floyd's cycle detection", "DFS", "Topological sort"], answer: 1 },
            { q: "What is a heap?", options: ["A sorted array", "A complete binary tree with heap property", "A hash table", "A graph"], answer: 1 },
            { q: "What is the time complexity of inserting into a max-heap?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
        ]
    },
    dsa_advanced: {
        title: "DSA Advanced",
        timeMinutes: 12,
        questions: [
            { q: "What is Dynamic Programming?", options: ["A programming paradigm", "Solving problems by breaking into overlapping subproblems", "A type of recursion", "A data structure"], answer: 1 },
            { q: "What is the difference between memoization and tabulation?", options: ["No difference", "Memoization is top-down, tabulation is bottom-up", "Tabulation is top-down, memoization is bottom-up", "One uses arrays, other uses trees"], answer: 1 },
            { q: "What is the time complexity of Dijkstra's algorithm with a min-heap?", options: ["O(V²)", "O(V + E log V)", "O(V × E)", "O(E²)"], answer: 1 },
            { q: "Topological sort is used for:", options: ["Sorting arrays", "Ordering tasks with dependencies (DAG)", "Finding shortest path", "Detecting cycles"], answer: 1 },
            { q: "What is backtracking?", options: ["Going back to the previous state", "Trying all possibilities and undoing bad choices", "A type of BFS", "A sorting technique"], answer: 1 },
            { q: "The N-Queens problem is solved using:", options: ["Dynamic Programming", "Greedy Algorithm", "Backtracking", "Divide and Conquer"], answer: 2 },
            { q: "What is the Greedy approach?", options: ["Making globally optimal choice", "Making locally optimal choice at each step", "Trying all possibilities", "Using recursion"], answer: 1 },
            { q: "What is a Trie used for?", options: ["Sorting numbers", "Prefix-based string searching", "Graph traversal", "Heap operations"], answer: 1 },
            { q: "Union-Find is used for:", options: ["Sorting", "Finding connected components / cycle detection", "Shortest paths", "Traversal"], answer: 1 },
            { q: "What is Kadane's algorithm used for?", options: ["Sorting", "Maximum subarray sum", "Shortest path", "String matching"], answer: 1 },
            { q: "What is the time complexity of the 0/1 Knapsack DP solution?", options: ["O(n)", "O(n × W)", "O(2^n)", "O(n²)"], answer: 1 },
            { q: "What is a Minimum Spanning Tree?", options: ["Tree with minimum nodes", "Subset of edges connecting all vertices with minimum total weight", "Shortest path tree", "Binary tree"], answer: 1 },
            { q: "KMP algorithm is used for:", options: ["Sorting", "Graph traversal", "Pattern matching in strings", "Dynamic programming"], answer: 2 },
            { q: "What is the time complexity of building a heap from an array?", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], answer: 1 },
            { q: "In the Bellman-Ford algorithm, how many iterations are needed?", options: ["V", "V-1", "E", "V+E"], answer: 1 },
        ]
    },
    complexity: {
        title: "Time Complexity",
        timeMinutes: 8,
        questions: [
            { q: "What is the time complexity of: for(i=0; i<n; i++) for(j=0; j<n; j++) sum++;", options: ["O(n)", "O(n²)", "O(n log n)", "O(2n)"], answer: 1 },
            { q: "What is O(1)?", options: ["Linear time", "Constant time", "Logarithmic time", "Quadratic time"], answer: 1 },
            { q: "What is the time complexity of: for(i=1; i<n; i*=2) sum++;", options: ["O(n)", "O(n²)", "O(log n)", "O(√n)"], answer: 2 },
            { q: "Which is faster for large n: O(n log n) or O(n²)?", options: ["O(n²)", "O(n log n)", "Same", "Depends"], answer: 1 },
            { q: "What is the space complexity of a recursive Fibonacci without memoization?", options: ["O(1)", "O(n)", "O(2^n)", "O(n²)"], answer: 1 },
            { q: "What is amortized time complexity?", options: ["Worst case time", "Average time per operation over a sequence", "Best case time", "Space complexity"], answer: 1 },
            { q: "What is the time complexity of ArrayList.add() in Java/vector.push_back() in C++ (amortized)?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: 1 },
            { q: "Order from fastest to slowest: O(n²), O(1), O(n log n), O(n)", options: ["O(1) < O(n) < O(n log n) < O(n²)", "O(1) < O(n log n) < O(n) < O(n²)", "O(n) < O(1) < O(n²) < O(n log n)", "None"], answer: 0 },
            { q: "What is the time complexity of: for(i=0; i<n; i++) for(j=i; j<n; j++) sum++;", options: ["O(n)", "O(n²)", "O(n log n)", "O(n/2)"], answer: 1 },
            { q: "What is the recurrence relation for Merge Sort?", options: ["T(n) = T(n-1) + n", "T(n) = 2T(n/2) + n", "T(n) = T(n/2) + 1", "T(n) = 2T(n-1) + 1"], answer: 1 },
        ]
    },
    cpp_stl: {
        title: "C++ STL",
        timeMinutes: 10,
        questions: [
            { q: "What is the underlying data structure of std::vector?", options: ["Linked list", "Dynamic array", "Binary tree", "Hash table"], answer: 1 },
            { q: "What is the time complexity of std::map lookup?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "What is the difference between std::map and std::unordered_map?", options: ["No difference", "map is sorted (red-black tree), unordered_map uses hash table", "unordered_map is sorted", "map uses hash table"], answer: 1 },
            { q: "Which STL container implements a LIFO data structure?", options: ["queue", "deque", "stack", "priority_queue"], answer: 2 },
            { q: "What does std::sort use internally?", options: ["Merge Sort", "Quick Sort", "Introsort (hybrid)", "Heap Sort"], answer: 2 },
            { q: "What is the time complexity of std::set::insert?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], answer: 2 },
            { q: "What does std::vector::reserve() do?", options: ["Allocates memory without creating elements", "Creates elements", "Sorts the vector", "Removes elements"], answer: 0 },
            { q: "What is std::pair used for?", options: ["Creating arrays", "Storing two values of different types", "Function pointers", "Memory management"], answer: 1 },
            { q: "Which container provides O(1) insertion at both ends?", options: ["vector", "list", "deque", "set"], answer: 2 },
            { q: "What does std::find return if element is not found?", options: ["nullptr", "end iterator", "-1", "throws exception"], answer: 1 },
            { q: "What is the difference between vector::size() and vector::capacity()?", options: ["No difference", "size = elements count, capacity = allocated space", "size = allocated space, capacity = elements count", "Both return the same"], answer: 1 },
            { q: "Which algorithm returns true if all elements satisfy a condition?", options: ["std::find_if", "std::all_of", "std::for_each", "std::count_if"], answer: 1 },
            { q: "What is std::priority_queue by default?", options: ["Min-heap", "Max-heap", "BST", "Hash table"], answer: 1 },
            { q: "What does std::accumulate do?", options: ["Sorts elements", "Computes sum/fold of elements", "Finds maximum", "Counts elements"], answer: 1 },
            { q: "What is an iterator invalidated by?", options: ["Reading elements", "Modifying the container (insert/erase)", "Using const iterators", "Comparing iterators"], answer: 1 },
        ]
    },
    python_oop: {
        title: "Python OOP",
        timeMinutes: 10,
        questions: [
            { q: "What is __init__ in Python?", options: ["Destructor", "Constructor/initializer", "Static method", "Class method"], answer: 1 },
            { q: "What is the purpose of 'super()' in Python?", options: ["Create a superclass", "Call parent class methods", "Create static methods", "Handle exceptions"], answer: 1 },
            { q: "What is the difference between @classmethod and @staticmethod?", options: ["No difference", "@classmethod receives cls, @staticmethod receives nothing", "@staticmethod receives cls", "Both receive self"], answer: 1 },
            { q: "What is __str__ used for?", options: ["String comparison", "Human-readable string representation", "String conversion", "String encryption"], answer: 1 },
            { q: "What is name mangling in Python?", options: ["Renaming variables", "Making __var into _ClassName__var for privacy", "Obfuscating code", "Compiling code"], answer: 1 },
            { q: "What is MRO?", options: ["Method Return Object", "Method Resolution Order", "Multiple Return Operation", "Module Registration Order"], answer: 1 },
            { q: "Which module provides abstract base classes?", options: ["os", "sys", "abc", "collections"], answer: 2 },
            { q: "What is __repr__ vs __str__?", options: ["Same thing", "__repr__ for developers, __str__ for end users", "__str__ for developers", "Neither is correct"], answer: 1 },
            { q: "What is a property in Python?", options: ["A class variable", "Managed attribute using @property", "A constant", "A module"], answer: 1 },
            { q: "What is duck typing?", options: ["A design pattern", "Type checking based on behavior, not class", "A Python module", "Strong typing"], answer: 1 },
            { q: "Can Python have multiple inheritance?", options: ["No", "Yes", "Only with mixins", "Only 2 parents"], answer: 1 },
            { q: "What is __slots__?", options: ["Defines allowed attributes, saves memory", "Creates time slots", "Defines methods", "Creates threads"], answer: 0 },
            { q: "What is a metaclass?", options: ["A large class", "A class whose instances are classes", "An abstract class", "A static class"], answer: 1 },
            { q: "What does __call__ do?", options: ["Calls a function", "Makes an instance callable like a function", "Creates callbacks", "Nothing"], answer: 1 },
            { q: "What is the difference between composition and inheritance?", options: ["Same thing", "Composition: 'has-a', Inheritance: 'is-a'", "Inheritance: 'has-a', Composition: 'is-a'", "Neither is OOP"], answer: 1 },
        ]
    },
    python_advanced: {
        title: "Python Advanced",
        timeMinutes: 12,
        questions: [
            { q: "What is a closure in Python?", options: ["A way to close files", "A function that remembers values from enclosing scope", "A loop construct", "An exception handler"], answer: 1 },
            { q: "What is the difference between 'is' and '=='?", options: ["No difference", "'is' checks identity (same object), '==' checks equality (same value)", "'==' checks identity", "Both check identity"], answer: 1 },
            { q: "What is a context manager?", options: ["File manager", "Object with __enter__ and __exit__ for with statement", "Memory manager", "Thread manager"], answer: 1 },
            { q: "What does yield do in Python?", options: ["Returns and ends function", "Pauses function and returns value (generator)", "Creates a thread", "Raises exception"], answer: 1 },
            { q: "What is the GIL?", options: ["General Import Lock", "Global Interpreter Lock — limits threads to one at a time", "Graphics Interface Library", "None"], answer: 1 },
            { q: "What is functools.lru_cache?", options: ["A database cache", "Memoization decorator for function results", "A file cache", "A network cache"], answer: 1 },
            { q: "What does collections.defaultdict do?", options: ["Creates immutable dict", "Dict with default values for missing keys", "Ordered dict", "Counter dict"], answer: 1 },
            { q: "What is the walrus operator (:=)?", options: ["Comparison operator", "Assignment expression (assign and return value)", "Bitwise operator", "Logical operator"], answer: 1 },
            { q: "What is __all__ in a module?", options: ["Lists all classes", "Defines public API for 'from module import *'", "All methods", "All variables"], answer: 1 },
            { q: "What is asyncio used for?", options: ["Multithreading", "Asynchronous I/O with async/await", "Multiprocessing", "Data processing"], answer: 1 },
            { q: "What is a dataclass?", options: ["A database class", "Auto-generates __init__, __repr__, __eq__ for data-holding classes", "A class for lists", "An abstract class"], answer: 1 },
            { q: "What is the difference between deepcopy and copy?", options: ["No difference", "copy: shallow (shares nested), deepcopy: independent copies", "deepcopy is faster", "copy creates independent copies"], answer: 1 },
            { q: "What is monkey patching?", options: ["A testing technique", "Dynamically modifying code at runtime", "A design pattern", "Error handling"], answer: 1 },
            { q: "What does 'nonlocal' keyword do?", options: ["Creates global variable", "Refers to variable in enclosing (non-global) scope", "Creates local variable", "Deletes variable"], answer: 1 },
            { q: "What is a descriptor in Python?", options: ["Object with __get__, __set__, __delete__ methods", "A string description", "A documentation tool", "A type hint"], answer: 0 },
        ]
    },
    sorting: {
        title: "Sorting Algorithms",
        timeMinutes: 10,
        questions: [
            { q: "Which sorting algorithm has best average-case performance?", options: ["Bubble Sort O(n²)", "Merge Sort O(n log n)", "Selection Sort O(n²)", "Insertion Sort O(n²)"], answer: 1 },
            { q: "Which sorting algorithm is in-place and unstable?", options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"], answer: 2 },
            { q: "What is the best-case time complexity of Insertion Sort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], answer: 2 },
            { q: "Which sorting algorithm uses divide and conquer?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], answer: 2 },
            { q: "What is the space complexity of Merge Sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 1 },
            { q: "Quick Sort's pivot selection affects:", options: ["Space complexity only", "Time complexity (worst case)", "Nothing", "Stability only"], answer: 1 },
            { q: "Which sort is best for nearly sorted data?", options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"], answer: 2 },
            { q: "What is the time complexity of Heap Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1 },
            { q: "Counting Sort has time complexity:", options: ["O(n log n)", "O(n + k) where k is range", "O(n²)", "O(n)"], answer: 1 },
            { q: "Which is NOT a comparison-based sort?", options: ["Merge Sort", "Quick Sort", "Radix Sort", "Heap Sort"], answer: 2 },
            { q: "What makes a sorting algorithm 'stable'?", options: ["Never crashes", "Preserves relative order of equal elements", "Uses O(1) space", "Always O(n log n)"], answer: 1 },
            { q: "Bubble Sort's worst case is:", options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"], answer: 2 },
            { q: "Which sort repeatedly finds the minimum?", options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"], answer: 1 },
            { q: "Tim Sort (Python's built-in sort) is based on:", options: ["Quick Sort + Heap Sort", "Merge Sort + Insertion Sort", "Bubble Sort + Selection Sort", "Radix Sort + Counting Sort"], answer: 1 },
            { q: "What is the lower bound for comparison-based sorting?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1 },
        ]
    },
    graphs_trees: {
        title: "Graphs & Trees",
        timeMinutes: 12,
        questions: [
            { q: "What is the difference between a tree and a graph?", options: ["No difference", "Tree is acyclic connected graph", "Graph is a type of tree", "Tree can have cycles"], answer: 1 },
            { q: "How many edges does a tree with n nodes have?", options: ["n", "n-1", "n+1", "2n"], answer: 1 },
            { q: "What is the height of a balanced BST with n nodes?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1 },
            { q: "BFS on a graph uses which data structure?", options: ["Stack", "Queue", "Priority Queue", "Array"], answer: 1 },
            { q: "What is a complete binary tree?", options: ["All nodes have 2 children", "All levels full except possibly last, filled left to right", "Perfect binary tree", "BST"], answer: 1 },
            { q: "What is the time complexity of BFS?", options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"], answer: 2 },
            { q: "Kruskal's algorithm finds:", options: ["Shortest path", "Minimum spanning tree", "Maximum flow", "Topological order"], answer: 1 },
            { q: "What is an adjacency list?", options: ["A matrix", "Array of lists storing neighbors", "A linked list", "A hash table"], answer: 1 },
            { q: "AVL tree is:", options: ["A binary tree", "Self-balancing BST", "A graph", "A heap"], answer: 1 },
            { q: "What is the degree of a node in a graph?", options: ["Its value", "Number of edges connected to it", "Its depth", "Its height"], answer: 1 },
            { q: "In-order traversal of a BST gives:", options: ["Random order", "Sorted order", "Reverse order", "Level order"], answer: 1 },
            { q: "What is a DAG?", options: ["Directed Acyclic Graph", "Dynamic Array Graph", "Double Adjacent Graph", "None"], answer: 0 },
            { q: "Prim's vs Kruskal's: both find:", options: ["Shortest path", "MST", "Maximum flow", "Topological sort"], answer: 1 },
            { q: "What traversal is used for level-order?", options: ["DFS", "BFS", "Inorder", "Preorder"], answer: 1 },
            { q: "A graph with no cycles is called:", options: ["Connected", "Acyclic", "Complete", "Bipartite"], answer: 1 },
        ]
    }
};

// ===== Flashcard Decks =====
const flashcardDecks = {
    cpp: [
        { front: "What is the difference between 'struct' and 'class' in C++?", back: "The only difference is the default access specifier: struct members are public by default, class members are private by default." },
        { front: "What is RAII?", back: "Resource Acquisition Is Initialization — a C++ idiom where resource allocation is tied to object lifetime. Resources are acquired in constructors and released in destructors." },
        { front: "What are smart pointers?", back: "Objects that manage dynamically allocated memory automatically. Types: unique_ptr (sole ownership), shared_ptr (shared ownership with reference counting), weak_ptr (non-owning reference)." },
        { front: "What is the Rule of Three?", back: "If a class defines a destructor, copy constructor, or copy assignment operator, it should define all three." },
        { front: "What is a virtual destructor?", back: "A destructor declared with 'virtual' keyword. Needed when deleting derived objects through base class pointers to ensure proper cleanup." },
        { front: "What is move semantics?", back: "C++11 feature that allows resources to be 'moved' from one object to another instead of copied, using rvalue references (&&) and std::move." },
        { front: "What is the difference between 'new' and 'malloc'?", back: "'new' calls constructors and returns typed pointer. 'malloc' only allocates raw memory and returns void*. 'new' throws on failure, 'malloc' returns NULL." },
        { front: "What is a lambda expression?", back: "An anonymous function object. Syntax: [capture](parameters) -> return_type { body }. Example: auto add = [](int a, int b) { return a + b; };" },
        { front: "What is std::vector?", back: "A dynamic array container in the STL. Provides random access, automatic resizing, and contiguous memory storage. push_back() is O(1) amortized." },
        { front: "What is the difference between stack and heap memory?", back: "Stack: automatic, fast, limited size, LIFO. Heap: manual (new/delete), slower, larger, fragmentation possible." },
        { front: "What is a template in C++?", back: "A blueprint for creating generic functions/classes. template<typename T> allows writing code that works with any data type." },
        { front: "What is const correctness?", back: "Using 'const' to indicate values that shouldn't be modified. Applies to variables, pointers, references, and member functions." },
        { front: "What is polymorphism in C++?", back: "Compile-time (function/operator overloading) and runtime (virtual functions). Runtime polymorphism uses vtable for dynamic dispatch." },
        { front: "What is the STL?", back: "Standard Template Library — collection of template classes and functions: containers (vector, map), algorithms (sort, find), iterators." },
        { front: "What does 'auto' keyword do?", back: "C++11: Automatic type deduction. The compiler infers the type from the initializer. Example: auto x = 42; // int" },
    ],
    python: [
        { front: "What is the GIL?", back: "Global Interpreter Lock — a mutex that allows only one thread to execute Python bytecode at a time. Limits true parallelism in CPython." },
        { front: "What is the difference between list and tuple?", back: "Lists are mutable (can be changed), tuples are immutable (cannot be changed). Tuples are hashable and can be dict keys." },
        { front: "What is a decorator?", back: "A function that takes another function and extends its behavior without modifying it. Uses @decorator syntax. Example: @property, @staticmethod." },
        { front: "What is a generator?", back: "A function that uses 'yield' instead of 'return'. Produces values lazily one at a time, saving memory. Creates an iterator." },
        { front: "What is list comprehension?", back: "A concise way to create lists: [expression for item in iterable if condition]. Example: [x**2 for x in range(10) if x % 2 == 0]" },
        { front: "What is *args and **kwargs?", back: "*args: variable positional arguments (tuple). **kwargs: variable keyword arguments (dict). Used for flexible function signatures." },
        { front: "What is the difference between deep copy and shallow copy?", back: "Shallow copy: copies references (nested objects are shared). Deep copy (copy.deepcopy): creates independent copies of all nested objects." },
        { front: "What is __init__ vs __new__?", back: "__new__: creates the instance (class method). __init__: initializes the instance (instance method). __new__ is called first." },
        { front: "What are Python's mutable and immutable types?", back: "Mutable: list, dict, set. Immutable: int, float, str, tuple, frozenset. Immutable objects cannot be changed after creation." },
        { front: "What is a context manager?", back: "An object that implements __enter__ and __exit__ methods. Used with 'with' statement for resource management (file handling, locks)." },
        { front: "What is 'self' in Python?", back: "A reference to the current instance of the class. It's the first parameter of instance methods. Not a keyword but a convention." },
        { front: "What is duck typing?", back: "'If it walks like a duck and quacks like a duck, it's a duck.' Python checks behavior (methods/properties) rather than type." },
        { front: "What is the MRO?", back: "Method Resolution Order — the order Python looks for methods in class hierarchy. Uses C3 linearization. Check with ClassName.__mro__." },
        { front: "What is a classmethod vs staticmethod?", back: "@classmethod: receives class as first arg (cls), can access/modify class state. @staticmethod: no implicit first arg, utility function in class namespace." },
        { front: "What is PEP 8?", back: "Python Enhancement Proposal 8 — the style guide for Python code. Covers naming conventions, indentation (4 spaces), line length (79 chars), etc." },
    ],
    dsa: [
        { front: "What is Big-O notation?", back: "Describes the upper bound of an algorithm's time/space complexity as input grows. Common: O(1), O(log n), O(n), O(n log n), O(n²), O(2^n)." },
        { front: "What is a hash map?", back: "Key-value data structure using a hash function to compute indices. Average O(1) lookup, insert, delete. Worst case O(n) with collisions." },
        { front: "What is BFS vs DFS?", back: "BFS: Level-by-level traversal using queue. Good for shortest path. DFS: Go deep first using stack/recursion. Good for path finding, cycle detection." },
        { front: "What is Dynamic Programming?", back: "Optimization technique for problems with overlapping subproblems and optimal substructure. Two approaches: memoization (top-down) and tabulation (bottom-up)." },
        { front: "What is a Binary Search Tree?", back: "Binary tree where left child < parent < right child. Average O(log n) operations. Can degrade to O(n) if unbalanced." },
        { front: "What is a heap?", back: "Complete binary tree satisfying heap property. Max-heap: parent ≥ children. Min-heap: parent ≤ children. Used for priority queues." },
        { front: "What is the two-pointer technique?", back: "Use two pointers to traverse a sorted array/list. Often start from both ends or use slow/fast pointers. O(n) time typically." },
        { front: "What is sliding window?", back: "Maintain a 'window' that slides over data. Used for contiguous subarray/substring problems. Convert O(n²) brute force to O(n)." },
        { front: "What is topological sort?", back: "Linear ordering of vertices in a DAG such that for every edge (u,v), u comes before v. Used for task scheduling, build systems." },
        { front: "What is backtracking?", back: "Systematic way to try all possibilities. Build solution incrementally, abandon ('backtrack') when constraints are violated. Used in N-Queens, Sudoku." },
        { front: "What is a Trie?", back: "Tree-like data structure for storing strings. Each node represents a character. Efficient for prefix operations. O(m) lookup where m = key length." },
        { front: "What is Dijkstra's algorithm?", back: "Finds shortest paths from source to all vertices in a weighted graph with non-negative weights. Uses min-heap. O((V+E) log V)." },
        { front: "What is Kadane's algorithm?", back: "Finds maximum subarray sum in O(n). Track current_max and global_max. At each step: current_max = max(arr[i], current_max + arr[i])." },
        { front: "What is Union-Find?", back: "Disjoint Set Union data structure. Operations: find (which set), union (merge sets). With path compression + union by rank: near O(1) amortized." },
        { front: "What is a monotonic stack?", back: "A stack that maintains elements in sorted order (increasing or decreasing). Used for Next Greater Element, Largest Rectangle problems." },
        { front: "What is a segment tree?", back: "Binary tree for range queries (sum, min, max) and point updates on arrays. Build O(n), query O(log n), update O(log n). Each node stores info about a range." },
        { front: "What is Floyd's cycle detection?", back: "Use slow pointer (1 step) and fast pointer (2 steps). If they meet, there's a cycle. To find cycle start: reset one to head, move both 1 step until they meet." },
        { front: "What is the 0/1 Knapsack problem?", back: "Given items with weight and value, maximize value within weight capacity. Each item used 0 or 1 times. DP solution: O(n × W). dp[i][w] = max value using first i items with capacity w." },
        { front: "What is Bellman-Ford algorithm?", back: "Single-source shortest path algorithm that handles negative weights. Relaxes all edges V-1 times. O(V × E). Can detect negative cycles." },
        { front: "What is the difference between Prim's and Kruskal's?", back: "Both find MST. Prim's: grows tree from a vertex (greedy, uses min-heap). Kruskal's: sorts all edges, adds smallest that doesn't create cycle (uses Union-Find)." },
    ]
};

// ===== Coding Tips =====
const codingTips = [
    { category: "cpp", tip: "Always use 'const' for variables that shouldn't change. It makes code safer and communicates intent.", example: "const int MAX_SIZE = 100;" },
    { category: "cpp", tip: "Prefer references over pointers when you don't need null or reassignment.", example: "void print(const string& s) { cout << s; }" },
    { category: "cpp", tip: "Use range-based for loops for cleaner iteration.", example: "for (const auto& item : vec) { ... }" },
    { category: "cpp", tip: "Always initialize variables. Uninitialized variables cause undefined behavior.", example: "int x = 0; // not just 'int x;'" },
    { category: "cpp", tip: "Use emplace_back instead of push_back to avoid unnecessary copies.", example: "vec.emplace_back(arg1, arg2);" },
    { category: "cpp", tip: "Prefer unique_ptr over raw pointers for ownership.", example: "auto ptr = make_unique<MyClass>();" },
    { category: "cpp", tip: "Use auto for complex types but be explicit for simple ones.", example: "auto it = map.begin(); // OK\nint x = 5; // prefer explicit" },
    { category: "cpp", tip: "Pass large objects by const reference, not by value.", example: "void process(const vector<int>& data) { ... }" },
    { category: "cpp", tip: "Use structured bindings (C++17) for cleaner pair/tuple access.", example: "auto [key, value] = *map.begin();" },
    { category: "cpp", tip: "Remember: vector::size() returns size_t (unsigned). Be careful with subtraction.", example: "// vec.size() - 1 when empty = huge number!" },
    { category: "python", tip: "Use enumerate() instead of range(len()) for index + value.", example: "for i, val in enumerate(lst):" },
    { category: "python", tip: "Use f-strings for readable string formatting.", example: "print(f'Hello, {name}! You are {age} years old.')" },
    { category: "python", tip: "Use defaultdict to avoid KeyError when counting.", example: "from collections import defaultdict\ncount = defaultdict(int)" },
    { category: "python", tip: "Use collections.Counter for frequency counting.", example: "from collections import Counter\nfreq = Counter(lst)" },
    { category: "python", tip: "Use 'with' statement for file operations to ensure cleanup.", example: "with open('file.txt') as f:\n    data = f.read()" },
    { category: "python", tip: "Use set for O(1) membership testing instead of list.", example: "seen = set()\nif x in seen:  # O(1) vs O(n) for list" },
    { category: "python", tip: "Use zip() to iterate over multiple lists simultaneously.", example: "for a, b in zip(list1, list2):" },
    { category: "python", tip: "Use list slicing for reversing: lst[::-1]", example: "reversed_list = original[::-1]" },
    { category: "python", tip: "Use any() and all() for cleaner conditional checks.", example: "if any(x > 10 for x in lst):" },
    { category: "python", tip: "Use dictionary.get(key, default) to avoid KeyError.", example: "value = d.get('key', 0)  # returns 0 if key missing" },
    { category: "dsa", tip: "When stuck, think: Can I sort first? Sorting often simplifies problems.", example: "Sort + Two Pointers = O(n log n) for many problems" },
    { category: "dsa", tip: "For 'find pair/triplet' problems, consider hash maps or sorting + two pointers.", example: "Two Sum: use hash map for O(n)" },
    { category: "dsa", tip: "When you see 'subarray' or 'substring', think Sliding Window.", example: "Longest substring without repeating chars = sliding window" },
    { category: "dsa", tip: "When you see 'sorted array', think Binary Search.", example: "Search in sorted array = O(log n)" },
    { category: "dsa", tip: "For tree problems, think recursively. Most tree problems have elegant recursive solutions.", example: "maxDepth(node) = 1 + max(left, right)" },
    { category: "dsa", tip: "For graph problems, start by deciding: BFS or DFS? BFS for shortest path, DFS for exploration.", example: "Shortest path in unweighted graph = BFS" },
    { category: "dsa", tip: "For DP, identify: What are the states? What are the transitions? What's the base case?", example: "Climbing stairs: dp[i] = dp[i-1] + dp[i-2]" },
    { category: "dsa", tip: "Draw it out! Visualizing the problem often reveals the solution.", example: "Draw the tree, draw the array, draw the graph" },
    { category: "dsa", tip: "Test with edge cases: empty input, single element, all same, sorted, reverse sorted.", example: "Always test with n=0, n=1" },
    { category: "dsa", tip: "Time yourself while solving. Target: Easy < 15min, Medium < 30min, Hard < 45min.", example: "Use a timer for every LeetCode problem" },
];

// ===== Problem Patterns =====
const dsaPatterns = {
    "Two Pointers": {
        description: "Use two pointers to traverse from both ends or at different speeds",
        problems: ["Two Sum (sorted)", "3Sum", "Container With Most Water", "Remove Duplicates", "Trapping Rain Water"],
        template: "left = 0, right = n-1\nwhile left < right:\n    if condition: left++\n    else: right--"
    },
    "Sliding Window": {
        description: "Maintain a window that expands/contracts as you traverse",
        problems: ["Longest Substring Without Repeating", "Minimum Window Substring", "Maximum Sum Subarray of Size K", "Longest Repeating Character Replacement"],
        template: "left = 0\nfor right in range(n):\n    # expand window\n    while invalid:\n        # shrink from left\n        left += 1\n    # update answer"
    },
    "Binary Search": {
        description: "Divide search space in half each step. Works on sorted data or monotonic functions.",
        problems: ["Search in Rotated Array", "Find Peak Element", "Koko Eating Bananas", "Median of Two Sorted Arrays"],
        template: "lo, hi = 0, n-1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if target: return mid\n    elif too_small: lo = mid + 1\n    else: hi = mid - 1"
    },
    "BFS/DFS": {
        description: "Traverse graphs/trees level-by-level (BFS) or depth-first (DFS)",
        problems: ["Number of Islands", "Clone Graph", "Word Ladder", "Course Schedule", "Pacific Atlantic Water Flow"],
        template: "# BFS\nqueue = deque([start])\nvisited = {start}\nwhile queue:\n    node = queue.popleft()\n    for neighbor in adj[node]:\n        if neighbor not in visited:\n            visited.add(neighbor)\n            queue.append(neighbor)"
    },
    "Dynamic Programming": {
        description: "Break into subproblems, store results to avoid recomputation",
        problems: ["Climbing Stairs", "Coin Change", "Longest Common Subsequence", "0/1 Knapsack", "Edit Distance"],
        template: "# Tabulation\ndp = [0] * (n + 1)\ndp[0] = base_case\nfor i in range(1, n + 1):\n    dp[i] = f(dp[i-1], dp[i-2], ...)\nreturn dp[n]"
    },
    "Backtracking": {
        description: "Build solution incrementally, undo choices that lead to dead ends",
        problems: ["N-Queens", "Sudoku Solver", "Permutations", "Combination Sum", "Word Search"],
        template: "def backtrack(path, choices):\n    if goal_reached:\n        result.append(path[:])\n        return\n    for choice in choices:\n        if valid(choice):\n            path.append(choice)\n            backtrack(path, updated_choices)\n            path.pop()  # undo"
    },
    "Monotonic Stack": {
        description: "Stack maintaining increasing/decreasing order for next greater/smaller element",
        problems: ["Next Greater Element", "Daily Temperatures", "Largest Rectangle in Histogram", "Trapping Rain Water"],
        template: "stack = []\nfor i in range(n):\n    while stack and arr[stack[-1]] < arr[i]:\n        idx = stack.pop()\n        result[idx] = arr[i]\n    stack.append(i)"
    },
    "Union Find": {
        description: "Track disjoint sets with efficient find and union operations",
        problems: ["Number of Connected Components", "Redundant Connection", "Accounts Merge", "Number of Provinces"],
        template: "parent = list(range(n))\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\ndef union(a, b):\n    parent[find(a)] = find(b)"
    },
    "Heap / Priority Queue": {
        description: "Efficiently get min/max element. Used for top-K, merge-K, scheduling",
        problems: ["Kth Largest Element", "Merge K Sorted Lists", "Top K Frequent", "Task Scheduler", "Find Median from Data Stream"],
        template: "import heapq\nheap = []\nheapq.heappush(heap, val)\ntop = heapq.heappop(heap)\n# For max-heap, negate values"
    },
    "Trie": {
        description: "Tree for string prefix operations. Each node = character.",
        problems: ["Implement Trie", "Word Search II", "Design Search Autocomplete", "Add and Search Words"],
        template: "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\ndef insert(word):\n    node = root\n    for ch in word:\n        if ch not in node.children:\n            node.children[ch] = TrieNode()\n        node = node.children[ch]\n    node.is_end = True"
    }
};

// ===== Complexity Cheatsheet =====
const complexityCheatsheet = {
    "Data Structures": [
        { name: "Array", access: "O(1)", search: "O(n)", insert: "O(n)", del: "O(n)", space: "O(n)" },
        { name: "Linked List", access: "O(n)", search: "O(n)", insert: "O(1)*", del: "O(1)*", space: "O(n)" },
        { name: "Stack", access: "O(n)", search: "O(n)", insert: "O(1)", del: "O(1)", space: "O(n)" },
        { name: "Queue", access: "O(n)", search: "O(n)", insert: "O(1)", del: "O(1)", space: "O(n)" },
        { name: "Hash Table", access: "—", search: "O(1)*", insert: "O(1)*", del: "O(1)*", space: "O(n)" },
        { name: "BST (balanced)", access: "O(log n)", search: "O(log n)", insert: "O(log n)", del: "O(log n)", space: "O(n)" },
        { name: "Heap", access: "O(1) top", search: "O(n)", insert: "O(log n)", del: "O(log n)", space: "O(n)" },
        { name: "Trie", access: "—", search: "O(m)", insert: "O(m)", del: "O(m)", space: "O(n×m)" },
    ],
    "Sorting Algorithms": [
        { name: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "Yes" },
        { name: "Selection Sort", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "No" },
        { name: "Insertion Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "Yes" },
        { name: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "Yes" },
        { name: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "No" },
        { name: "Heap Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)", stable: "No" },
        { name: "Counting Sort", best: "O(n+k)", avg: "O(n+k)", worst: "O(n+k)", space: "O(k)", stable: "Yes" },
        { name: "Radix Sort", best: "O(nk)", avg: "O(nk)", worst: "O(nk)", space: "O(n+k)", stable: "Yes" },
    ]
};

// ===== Interview Questions Bank =====
const interviewQuestions = {
    cpp: [
        { q: "What is the difference between struct and class in C++?", a: "The only difference is the default access specifier. struct members are public by default, while class members are private by default." },
        { q: "Explain virtual destructor and why it's needed.", a: "A virtual destructor ensures the derived class destructor is called when deleting through a base class pointer, preventing resource leaks." },
        { q: "What is the Rule of Five in C++11?", a: "If you define any of: destructor, copy constructor, copy assignment, move constructor, or move assignment, you should define all five." },
        { q: "Explain RAII.", a: "Resource Acquisition Is Initialization — resources (memory, files, locks) are acquired in constructors and released in destructors, ensuring cleanup." },
        { q: "What is the difference between shallow copy and deep copy?", a: "Shallow copy copies member values (pointers are copied, not what they point to). Deep copy creates independent copies of all dynamically allocated members." },
        { q: "Explain std::move and move semantics.", a: "std::move casts an lvalue to an rvalue reference, enabling move semantics which transfer resources instead of copying them, improving performance." },
        { q: "What is a vtable?", a: "Virtual table — a lookup table of virtual function pointers. Each class with virtual functions has a vtable. Objects have a vptr pointing to their class's vtable." },
        { q: "What is template specialization?", a: "Providing a specific implementation of a template for a particular type. Can be full specialization (one type) or partial specialization." },
        { q: "Explain std::unique_ptr vs std::shared_ptr.", a: "unique_ptr: sole ownership, cannot be copied, only moved. shared_ptr: shared ownership with reference counting, multiple pointers to same object." },
        { q: "What is a dangling pointer?", a: "A pointer that references memory that has been freed/deallocated. Dereferencing it causes undefined behavior." },
        { q: "What is the diamond problem?", a: "Ambiguity when a class inherits from two classes that both inherit from the same base. Solved in C++ with virtual inheritance." },
        { q: "Explain the difference between compile-time and runtime polymorphism.", a: "Compile-time: function/operator overloading, templates. Runtime: virtual functions with dynamic dispatch through vtable." },
        { q: "What are lambda captures in C++?", a: "[=] captures all by value, [&] captures all by reference, [x, &y] captures x by value and y by reference. Captures allow lambdas to access outer scope." },
        { q: "What is std::async?", a: "Runs a function asynchronously, potentially in a new thread. Returns std::future for the result. Policies: launch::async (new thread), launch::deferred (lazy)." },
        { q: "Explain const correctness.", a: "Using const to express and enforce immutability. const variables, const member functions (don't modify state), const parameters, const pointers." },
    ],
    python: [
        { q: "Explain the GIL and its implications.", a: "Global Interpreter Lock prevents multiple threads from executing Python bytecode simultaneously. Limits CPU-bound parallelism. Use multiprocessing for CPU-bound tasks." },
        { q: "What is the difference between @staticmethod and @classmethod?", a: "@staticmethod: no implicit first arg, can't access class/instance state. @classmethod: receives cls as first arg, can access/modify class state, useful for factory methods." },
        { q: "Explain Python's garbage collection.", a: "Reference counting (primary) — objects are freed when refcount reaches 0. Generational garbage collector handles circular references." },
        { q: "What are metaclasses?", a: "Classes whose instances are classes. type is the default metaclass. Used to customize class creation, enforce patterns, register classes, modify attributes." },
        { q: "Explain Python decorators with arguments.", a: "Triple nested function: outer takes decorator args, middle takes the function, inner is the wrapper. @decorator(args) → decorator(args)(func)." },
        { q: "What is __slots__ and when to use it?", a: "Class attribute that restricts allowed attributes. Saves memory by avoiding __dict__ per instance. Use with many instances of simple data classes." },
        { q: "Explain async/await in Python.", a: "async def creates a coroutine. await suspends execution until the awaited coroutine completes. Enables concurrent I/O without threads." },
        { q: "What is monkey patching?", a: "Dynamically modifying a class or module at runtime. Used in testing (mocking) but generally discouraged in production code." },
        { q: "Explain Python's method resolution order (MRO).", a: "C3 linearization algorithm determines method lookup order in multiple inheritance. Ensures each class appears once and maintains local precedence order." },
        { q: "What are context managers and how do they work?", a: "Objects with __enter__ and __exit__ methods, used with 'with' statement. Ensure cleanup (file closing, lock releasing) even if exceptions occur." },
        { q: "Explain closures in Python.", a: "A function that remembers values from its enclosing scope even after the scope has finished executing. Created when inner function references outer function's variables." },
        { q: "What is the difference between is and ==?", a: "'is' checks identity (same object in memory, compares id()). '==' checks equality (same value, calls __eq__). Always use == for value comparison." },
        { q: "Explain Python's descriptor protocol.", a: "Objects defining __get__, __set__, __delete__. Used to customize attribute access. Properties, classmethods, staticmethods are all descriptors." },
        { q: "What are generators and why use them?", a: "Functions using yield to produce values lazily. Memory efficient for large datasets. Maintain state between yields. Create iterators elegantly." },
        { q: "Explain Python's dataclasses.", a: "Decorator that auto-generates __init__, __repr__, __eq__, and optionally __hash__, __lt__, __le__, __gt__, __ge__. Reduces boilerplate for data-holding classes." },
    ],
    dsa: [
        { q: "When would you use BFS vs DFS?", a: "BFS: shortest path in unweighted graphs, level-order traversal. DFS: path finding, topological sort, cycle detection, connected components, maze solving." },
        { q: "Explain time complexity of hash map operations.", a: "Average: O(1) for insert, delete, lookup. Worst case: O(n) when many collisions. Amortized O(1) with good hash function and load factor." },
        { q: "How does a priority queue work?", a: "Usually implemented as a binary heap. Insert O(log n), extract-min/max O(log n), peek O(1). Used in Dijkstra's, K-th element problems." },
        { q: "Explain the two-pointer technique.", a: "Use two pointers to traverse sorted data. Start from both ends or use slow/fast. Reduces O(n²) to O(n) for pair-finding problems." },
        { q: "When to use DP vs Greedy?", a: "DP: optimal substructure + overlapping subproblems (coin change, knapsack). Greedy: optimal substructure + greedy choice property (activity selection)." },
        { q: "Explain Dijkstra vs Bellman-Ford.", a: "Dijkstra: non-negative weights, O((V+E)log V) with min-heap. Bellman-Ford: handles negative weights, O(V×E), detects negative cycles." },
        { q: "What is amortized analysis?", a: "Average time per operation over worst-case sequence. Example: vector push_back is O(1) amortized despite occasional O(n) resizing." },
        { q: "Explain Union-Find with optimizations.", a: "Path compression: make nodes point directly to root. Union by rank: attach smaller tree under bigger. Together: near O(1) per operation." },
        { q: "How to detect a cycle in a directed graph?", a: "DFS with 3 colors: white (unvisited), gray (in current path), black (fully processed). Cycle exists if we visit a gray node." },
        { q: "Explain the sliding window technique.", a: "Maintain a window [left, right] that slides right. Expand right to include elements, shrink left when window is invalid. O(n) for subarray/substring problems." },
        { q: "What is topological sorting?", a: "Linear ordering of DAG vertices where for every edge (u,v), u comes before v. Uses: build systems, course prerequisites. Algorithms: Kahn's (BFS) or DFS-based." },
        { q: "Explain segment tree.", a: "Binary tree for range queries (sum, min, max) and point updates. Build O(n), query O(log n), update O(log n). Each node stores aggregate of a range." },
        { q: "What is the difference between Prim's and Kruskal's?", a: "Both find MST. Prim's: grow tree from vertex, use min-heap, better for dense graphs O(E log V). Kruskal's: sort edges, use union-find, better for sparse O(E log E)." },
        { q: "How to solve problems efficiently with memoization?", a: "Identify recursive subproblems. Add cache (dict/array) to store results. Check cache before computing. Top-down approach. Same result as tabulation." },
        { q: "Explain trie vs hash map for string problems.", a: "Trie: prefix operations, autocomplete, wildcard search, ordered. Hash map: exact lookup, faster for single lookups. Use trie when prefix matters." },
    ]
};

// ===== System Design Basics =====
const systemDesignBasics = [
    { concept: "Load Balancing", description: "Distributes incoming requests across multiple servers. Types: Round Robin, Least Connections, IP Hash. Tools: Nginx, HAProxy, AWS ELB." },
    { concept: "Caching", description: "Store frequently accessed data in fast storage (RAM). Patterns: Cache-Aside, Write-Through, Write-Behind. Tools: Redis, Memcached." },
    { concept: "Database Sharding", description: "Splitting a database across multiple servers. Types: Horizontal (row-based), Vertical (column-based). Challenges: joins, rebalancing." },
    { concept: "CAP Theorem", description: "Distributed systems can guarantee at most 2 of: Consistency (all nodes see same data), Availability (every request gets response), Partition Tolerance." },
    { concept: "Microservices", description: "Architecture where application is composed of small, independent services. Each has its own database. Communication via REST/gRPC/message queues." },
    { concept: "Message Queues", description: "Async communication between services. Producers send messages, consumers process them. Tools: RabbitMQ, Kafka, AWS SQS. Enables decoupling." },
    { concept: "CDN", description: "Content Delivery Network — geographically distributed servers that cache static content. Reduces latency. Examples: Cloudflare, AWS CloudFront." },
    { concept: "Rate Limiting", description: "Controls the number of requests a client can make. Algorithms: Token Bucket, Leaky Bucket, Fixed Window. Prevents abuse and DoS." },
    { concept: "API Design", description: "REST: HTTP verbs (GET, POST, PUT, DELETE) on resources. GraphQL: query language for APIs. gRPC: binary protocol, fast, schema-based." },
    { concept: "Replication", description: "Copying data across multiple servers for reliability. Types: Master-Slave (read replicas), Master-Master. Handles failover." },
    { concept: "Consistent Hashing", description: "Distributed hashing that minimizes key remapping when nodes are added/removed. Used in: distributed caches, load balancers." },
    { concept: "WebSockets", description: "Full-duplex communication between client and server. Unlike HTTP (request-response), WebSocket maintains persistent connection for real-time data." },
];

// ===== Git Commands Cheatsheet =====
const gitCheatsheet = [
    { cmd: "git init", desc: "Initialize a new Git repository", category: "setup" },
    { cmd: "git clone <url>", desc: "Clone a repository from remote", category: "setup" },
    { cmd: "git add <file>", desc: "Stage changes for commit", category: "basic" },
    { cmd: "git add -A", desc: "Stage all changes (new, modified, deleted)", category: "basic" },
    { cmd: "git commit -m 'message'", desc: "Commit staged changes with message", category: "basic" },
    { cmd: "git status", desc: "Show working tree status", category: "basic" },
    { cmd: "git log --oneline", desc: "Show commit history (compact)", category: "basic" },
    { cmd: "git diff", desc: "Show unstaged changes", category: "basic" },
    { cmd: "git branch", desc: "List branches", category: "branch" },
    { cmd: "git branch <name>", desc: "Create new branch", category: "branch" },
    { cmd: "git checkout <branch>", desc: "Switch to branch", category: "branch" },
    { cmd: "git checkout -b <name>", desc: "Create and switch to new branch", category: "branch" },
    { cmd: "git merge <branch>", desc: "Merge branch into current", category: "branch" },
    { cmd: "git push origin main", desc: "Push commits to remote", category: "remote" },
    { cmd: "git pull", desc: "Fetch and merge from remote", category: "remote" },
    { cmd: "git fetch", desc: "Download objects from remote (no merge)", category: "remote" },
    { cmd: "git stash", desc: "Stash working directory changes", category: "advanced" },
    { cmd: "git stash pop", desc: "Apply stashed changes", category: "advanced" },
    { cmd: "git reset --hard HEAD~1", desc: "Undo last commit (destructive)", category: "advanced" },
    { cmd: "git rebase <branch>", desc: "Rebase current branch onto another", category: "advanced" },
    { cmd: "git cherry-pick <hash>", desc: "Apply specific commit to current branch", category: "advanced" },
    { cmd: "git remote -v", desc: "Show remote repositories", category: "remote" },
    { cmd: "git tag v1.0", desc: "Create a lightweight tag", category: "advanced" },
    { cmd: "git log --graph --all", desc: "Show branch graph", category: "basic" },
];

// ===== VS Code Shortcuts =====
const vscodeShortcuts = [
    { shortcut: "Ctrl + Shift + P", action: "Command Palette", category: "general" },
    { shortcut: "Ctrl + P", action: "Quick Open (file search)", category: "general" },
    { shortcut: "Ctrl + /", action: "Toggle line comment", category: "editing" },
    { shortcut: "Ctrl + D", action: "Select next occurrence of word", category: "editing" },
    { shortcut: "Ctrl + Shift + K", action: "Delete entire line", category: "editing" },
    { shortcut: "Alt + Up/Down", action: "Move line up/down", category: "editing" },
    { shortcut: "Shift + Alt + Up/Down", action: "Copy line up/down", category: "editing" },
    { shortcut: "Ctrl + Shift + F", action: "Search across all files", category: "general" },
    { shortcut: "Ctrl + `", action: "Toggle terminal", category: "general" },
    { shortcut: "Ctrl + B", action: "Toggle sidebar", category: "general" },
    { shortcut: "Ctrl + Shift + E", action: "Explorer panel", category: "general" },
    { shortcut: "F2", action: "Rename symbol", category: "editing" },
    { shortcut: "Ctrl + Space", action: "Trigger IntelliSense", category: "editing" },
    { shortcut: "F12", action: "Go to definition", category: "navigation" },
    { shortcut: "Alt + F12", action: "Peek definition", category: "navigation" },
    { shortcut: "Ctrl + Shift + \\", action: "Jump to matching bracket", category: "navigation" },
    { shortcut: "Ctrl + G", action: "Go to line", category: "navigation" },
    { shortcut: "Ctrl + Tab", action: "Switch between open files", category: "navigation" },
    { shortcut: "Ctrl + K, Ctrl + S", action: "Keyboard shortcuts panel", category: "general" },
    { shortcut: "Ctrl + ,", action: "Open settings", category: "general" },
];

// ===== Linux/Terminal Commands =====
const terminalCheatsheet = [
    { cmd: "ls -la", desc: "List all files with details", category: "files" },
    { cmd: "cd <dir>", desc: "Change directory", category: "navigation" },
    { cmd: "pwd", desc: "Print working directory", category: "navigation" },
    { cmd: "mkdir <name>", desc: "Create directory", category: "files" },
    { cmd: "rm -rf <dir>", desc: "Remove directory recursively (careful!)", category: "files" },
    { cmd: "cp -r src dst", desc: "Copy files/directories", category: "files" },
    { cmd: "mv src dst", desc: "Move/rename files", category: "files" },
    { cmd: "cat <file>", desc: "Display file contents", category: "files" },
    { cmd: "grep 'text' file", desc: "Search for text in file", category: "search" },
    { cmd: "grep -r 'text' dir", desc: "Recursive search in directory", category: "search" },
    { cmd: "find . -name '*.py'", desc: "Find files by name", category: "search" },
    { cmd: "chmod +x file", desc: "Make file executable", category: "permissions" },
    { cmd: "sudo <cmd>", desc: "Run command as superuser", category: "system" },
    { cmd: "ps aux", desc: "Show all running processes", category: "system" },
    { cmd: "kill <pid>", desc: "Kill process by ID", category: "system" },
    { cmd: "top", desc: "Show system processes (live)", category: "system" },
    { cmd: "df -h", desc: "Show disk usage", category: "system" },
    { cmd: "wget <url>", desc: "Download file from URL", category: "network" },
    { cmd: "curl <url>", desc: "Transfer data from URL", category: "network" },
    { cmd: "ssh user@host", desc: "Connect to remote server", category: "network" },
    { cmd: "tar -xzf file.tar.gz", desc: "Extract tar.gz archive", category: "files" },
    { cmd: "echo $PATH", desc: "Print environment variable", category: "system" },
    { cmd: "which <cmd>", desc: "Show path to command", category: "system" },
    { cmd: "man <cmd>", desc: "Show manual for command", category: "system" },
    { cmd: "history", desc: "Show command history", category: "system" },
    { cmd: "alias ll='ls -la'", desc: "Create command alias", category: "system" },
    { cmd: "wc -l file", desc: "Count lines in file", category: "files" },
    { cmd: "head -n 20 file", desc: "Show first 20 lines", category: "files" },
    { cmd: "tail -f file", desc: "Follow file changes (live)", category: "files" },
    { cmd: "pipe: cmd1 | cmd2", desc: "Send output of cmd1 to cmd2", category: "system" },
];

// ===== Common Mistakes & Debugging Tips =====
const commonMistakes = {
    cpp: [
        { mistake: "Forgetting to initialize variables", fix: "Always initialize: int x = 0; bool found = false;", severity: "high" },
        { mistake: "Array index out of bounds", fix: "Check array size before access. Use vector with .at() for bounds checking.", severity: "high" },
        { mistake: "Memory leak — not deleting new'd memory", fix: "Use smart pointers (unique_ptr, shared_ptr) instead of raw new/delete.", severity: "high" },
        { mistake: "Using = instead of == in conditions", fix: "if (x = 5) assigns! Use if (x == 5). Enable -Wall compiler warnings.", severity: "medium" },
        { mistake: "Returning reference to local variable", fix: "Local variables are destroyed after function returns. Return by value or use static.", severity: "high" },
        { mistake: "Integer overflow", fix: "Use long long for large numbers. Check bounds before operations.", severity: "medium" },
        { mistake: "Mixing signed and unsigned comparison", fix: "vector.size() returns size_t (unsigned). Cast or use int for loop counters.", severity: "medium" },
        { mistake: "Forgetting break in switch-case", fix: "Each case needs break; or use [[fallthrough]] attribute intentionally.", severity: "low" },
        { mistake: "Dangling pointer after delete", fix: "Set pointer to nullptr after delete. Use smart pointers.", severity: "high" },
        { mistake: "Not using const where possible", fix: "Mark parameters, member functions, and variables as const when they shouldn't change.", severity: "low" },
    ],
    python: [
        { mistake: "Mutable default arguments", fix: "Don't use def func(lst=[]). Use def func(lst=None): lst = lst or []", severity: "high" },
        { mistake: "Modifying list while iterating", fix: "Create a copy: for item in list[:]. Or use list comprehension to filter.", severity: "high" },
        { mistake: "Using 'is' for value comparison", fix: "Use == for value comparison. 'is' checks object identity (same memory).", severity: "medium" },
        { mistake: "Not handling exceptions properly", fix: "Don't use bare except:. Catch specific exceptions: except ValueError:.", severity: "medium" },
        { mistake: "Global variable confusion", fix: "Use 'global' keyword to modify global variables inside functions, or avoid them.", severity: "medium" },
        { mistake: "Forgetting self in class methods", fix: "Instance methods need self as first parameter: def method(self, arg):", severity: "low" },
        { mistake: "Circular imports", fix: "Restructure code. Move imports inside functions. Use dependency injection.", severity: "medium" },
        { mistake: "Not closing files", fix: "Always use 'with open(...) as f:' for automatic cleanup.", severity: "medium" },
        { mistake: "Integer division surprise (Python 2 vs 3)", fix: "In Python 3: / is float division, // is integer division. 5/2 = 2.5", severity: "low" },
        { mistake: "Late binding closures in loops", fix: "for i in range(5): funcs.append(lambda i=i: i) — use default argument.", severity: "high" },
    ],
    dsa: [
        { mistake: "Not considering edge cases", fix: "Always test: empty input, single element, all same, sorted, reverse sorted, negative numbers.", severity: "high" },
        { mistake: "Off-by-one errors", fix: "Carefully define loop bounds. Is it i < n or i <= n? Include or exclude endpoints?", severity: "high" },
        { mistake: "Infinite loop in binary search", fix: "Ensure lo/hi converge: lo = mid + 1 or hi = mid - 1. Check termination condition.", severity: "high" },
        { mistake: "Not handling null/None in trees", fix: "Always check if node is null/None before accessing .left or .right.", severity: "medium" },
        { mistake: "Forgetting to mark visited in graph", fix: "Track visited nodes to avoid infinite loops. visited set or boolean array.", severity: "high" },
        { mistake: "Stack overflow in recursion", fix: "Add base case. Consider iterative approach or increase stack size.", severity: "high" },
        { mistake: "Wrong DP state transition", fix: "Draw the state transition diagram. Verify with small examples. Check base cases.", severity: "medium" },
        { mistake: "TLE (Time Limit Exceeded)", fix: "Analyze time complexity. Look for unnecessary nested loops. Use better data structures.", severity: "medium" },
        { mistake: "Not sorting when two-pointers needed", fix: "Two-pointer technique usually requires sorted array. Sort first: O(n log n).", severity: "medium" },
        { mistake: "Modifying graph/tree during traversal", fix: "Collect modifications, apply after traversal. Or use copy for traversal.", severity: "medium" },
    ]
};

// ===== Study Schedule Templates =====
const studyScheduleTemplates = {
    weekday: {
        name: "Weekday Schedule (3 hours)",
        blocks: [
            { time: "6:00 AM", duration: "30 min", activity: "Review yesterday's topics", icon: "fa-book" },
            { time: "6:30 AM", duration: "45 min", activity: "Learn new C++/Python concept", icon: "fa-code" },
            { time: "7:15 AM", duration: "45 min", activity: "Solve 1-2 DSA problems", icon: "fa-puzzle-piece" },
            { time: "8:00 AM", duration: "30 min", activity: "Breakfast + Quick review notes", icon: "fa-utensils" },
            { time: "Evening", duration: "30 min", activity: "Practice/revise + Daily reflection", icon: "fa-pen" },
        ]
    },
    weekend: {
        name: "Weekend Schedule (5 hours)",
        blocks: [
            { time: "8:00 AM", duration: "60 min", activity: "Deep dive: New topic study", icon: "fa-book-open" },
            { time: "9:00 AM", duration: "90 min", activity: "Solve 3-5 DSA problems", icon: "fa-code" },
            { time: "10:30 AM", duration: "30 min", activity: "Break + Workout", icon: "fa-dumbbell" },
            { time: "11:00 AM", duration: "60 min", activity: "Build mini-project / practice", icon: "fa-laptop-code" },
            { time: "12:00 PM", duration: "30 min", activity: "Review week + Plan next week", icon: "fa-calendar-check" },
        ]
    },
    intensive: {
        name: "Intensive Day (6+ hours)",
        blocks: [
            { time: "6:00 AM", duration: "60 min", activity: "Theory: Watch tutorial / Read docs", icon: "fa-play" },
            { time: "7:00 AM", duration: "90 min", activity: "Implement: Code along, build", icon: "fa-code" },
            { time: "8:30 AM", duration: "30 min", activity: "Break + Breakfast", icon: "fa-coffee" },
            { time: "9:00 AM", duration: "120 min", activity: "DSA: Solve 5+ problems", icon: "fa-puzzle-piece" },
            { time: "11:00 AM", duration: "60 min", activity: "Review + Notes + Flashcards", icon: "fa-sticky-note" },
            { time: "12:00 PM", duration: "30 min", activity: "Lunch break", icon: "fa-utensils" },
            { time: "Evening", duration: "45 min", activity: "Workout + Reflection", icon: "fa-dumbbell" },
        ]
    }
};

// ===== LeetCode Problem Solutions Guide =====
const solutionApproaches = {
    "Two Sum": {
        problem: "Given array and target, find indices of two numbers that add up to target.",
        approaches: [
            { name: "Brute Force", complexity: "O(n²)", code: "for i in range(n):\n  for j in range(i+1, n):\n    if nums[i]+nums[j] == target:\n      return [i,j]" },
            { name: "Hash Map (Optimal)", complexity: "O(n)", code: "seen = {}\nfor i, num in enumerate(nums):\n  complement = target - num\n  if complement in seen:\n    return [seen[complement], i]\n  seen[num] = i" }
        ]
    },
    "Maximum Subarray": {
        problem: "Find contiguous subarray with the largest sum.",
        approaches: [
            { name: "Brute Force", complexity: "O(n²)", code: "max_sum = nums[0]\nfor i in range(n):\n  curr = 0\n  for j in range(i, n):\n    curr += nums[j]\n    max_sum = max(max_sum, curr)" },
            { name: "Kadane's Algorithm", complexity: "O(n)", code: "max_sum = curr = nums[0]\nfor i in range(1, n):\n  curr = max(nums[i], curr + nums[i])\n  max_sum = max(max_sum, curr)\nreturn max_sum" }
        ]
    },
    "Valid Parentheses": {
        problem: "Determine if string of brackets is valid.",
        approaches: [
            { name: "Stack", complexity: "O(n)", code: "stack = []\nmapping = {')':'(', ']':'[', '}':'{'}\nfor char in s:\n  if char in mapping:\n    top = stack.pop() if stack else '#'\n    if mapping[char] != top:\n      return False\n  else:\n    stack.append(char)\nreturn not stack" }
        ]
    },
    "Climbing Stairs": {
        problem: "You can climb 1 or 2 steps. How many ways to reach n?",
        approaches: [
            { name: "Recursion (slow)", complexity: "O(2^n)", code: "def climb(n):\n  if n <= 2: return n\n  return climb(n-1) + climb(n-2)" },
            { name: "DP (optimal)", complexity: "O(n)", code: "def climb(n):\n  if n <= 2: return n\n  a, b = 1, 2\n  for i in range(3, n+1):\n    a, b = b, a + b\n  return b" }
        ]
    },
    "Reverse Linked List": {
        problem: "Reverse a singly linked list.",
        approaches: [
            { name: "Iterative", complexity: "O(n)", code: "prev = None\ncurr = head\nwhile curr:\n  next_node = curr.next\n  curr.next = prev\n  prev = curr\n  curr = next_node\nreturn prev" },
            { name: "Recursive", complexity: "O(n)", code: "def reverse(head):\n  if not head or not head.next:\n    return head\n  new_head = reverse(head.next)\n  head.next.next = head\n  head.next = None\n  return new_head" }
        ]
    },
    "Binary Search": {
        problem: "Find target in sorted array, return index or -1.",
        approaches: [
            { name: "Iterative", complexity: "O(log n)", code: "lo, hi = 0, len(nums) - 1\nwhile lo <= hi:\n  mid = (lo + hi) // 2\n  if nums[mid] == target:\n    return mid\n  elif nums[mid] < target:\n    lo = mid + 1\n  else:\n    hi = mid - 1\nreturn -1" }
        ]
    },
    "Number of Islands": {
        problem: "Count the number of '1' islands in a 2D grid.",
        approaches: [
            { name: "DFS", complexity: "O(m×n)", code: "def numIslands(grid):\n  count = 0\n  for i in range(len(grid)):\n    for j in range(len(grid[0])):\n      if grid[i][j] == '1':\n        dfs(grid, i, j)\n        count += 1\n  return count\n\ndef dfs(grid, i, j):\n  if i<0 or j<0 or i>=len(grid) or j>=len(grid[0]) or grid[i][j]!='1':\n    return\n  grid[i][j] = '0'\n  dfs(grid,i+1,j); dfs(grid,i-1,j)\n  dfs(grid,i,j+1); dfs(grid,i,j-1)" }
        ]
    },
    "Coin Change": {
        problem: "Find minimum coins needed to make target amount.",
        approaches: [
            { name: "DP Bottom-Up", complexity: "O(n × amount)", code: "def coinChange(coins, amount):\n  dp = [float('inf')] * (amount + 1)\n  dp[0] = 0\n  for i in range(1, amount + 1):\n    for coin in coins:\n      if coin <= i:\n        dp[i] = min(dp[i], dp[i-coin] + 1)\n  return dp[amount] if dp[amount] != float('inf') else -1" }
        ]
    },
    "Merge Two Sorted Lists": {
        problem: "Merge two sorted linked lists into one sorted list.",
        approaches: [
            { name: "Iterative", complexity: "O(n+m)", code: "def merge(l1, l2):\n  dummy = ListNode(0)\n  curr = dummy\n  while l1 and l2:\n    if l1.val <= l2.val:\n      curr.next = l1; l1 = l1.next\n    else:\n      curr.next = l2; l2 = l2.next\n    curr = curr.next\n  curr.next = l1 or l2\n  return dummy.next" }
        ]
    },
    "Invert Binary Tree": {
        problem: "Mirror/invert a binary tree.",
        approaches: [
            { name: "Recursive", complexity: "O(n)", code: "def invertTree(root):\n  if not root:\n    return None\n  root.left, root.right = root.right, root.left\n  invertTree(root.left)\n  invertTree(root.right)\n  return root" }
        ]
    }
};
