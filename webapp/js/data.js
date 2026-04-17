/* ============================================
   DATA MODULE — All Challenge Content
   Daily tasks, roadmaps, DSA problems,
   fitness plans, diet plans
   ============================================ */

// ===== Daily Tasks (90 days) =====
function getDailyTasks(day) {
    const tasks = {
        1: {
            title: "Setup & Hello World",
            cpp: ["Install C++ compiler (MinGW/MSVC) & set up VS Code", "Write 'Hello World' in C++", "Learn #include, using namespace std, main()"],
            python: ["Install Python 3.x & set up VS Code", "Write 'Hello World' in Python", "Learn print(), comments, basic syntax"],
            dsa: ["Read about Big-O notation", "Understand O(1), O(n), O(n²), O(log n)"],
            fitness: ["30 min walk + 5 min stretching"],
        },
        2: {
            title: "Variables & Data Types",
            cpp: ["Variables: int, float, double, char, bool, string", "Constants: const, #define", "Write 3 programs using different data types"],
            python: ["Variables: int, float, str, bool", "Type conversion: int(), float(), str()", "Write 3 programs using different data types"],
            dsa: ["Time complexity: analyze simple loops", "Space complexity basics"],
            fitness: ["30 min walk + 5 min stretching"],
        },
        3: {
            title: "Input/Output",
            cpp: ["cin/cout, getline, formatted output", "Build a simple calculator (add, sub, mul, div)"],
            python: ["input(), print(), f-strings, .format()", "Build a simple calculator"],
            dsa: ["Practice analyzing time complexity of nested loops"],
            fitness: ["30 min walk + 10 min stretching"],
        },
        4: {
            title: "Operators",
            cpp: ["Arithmetic, relational, logical, bitwise operators", "Type casting: implicit & explicit", "Write programs using all operator types"],
            python: ["Arithmetic, comparison, logical, bitwise operators", "Membership operators: in, not in", "Write programs using all operator types"],
            dsa: ["Best/Worst/Average case analysis"],
            fitness: ["30 min walk + bodyweight squats (3x10)"],
        },
        5: {
            title: "Conditionals",
            cpp: ["if, else if, else, switch-case, ternary operator", "Grade calculator program"],
            python: ["if, elif, else, ternary expression", "Grade calculator program"],
            dsa: ["Solve 2 easy problems on time complexity"],
            fitness: ["30 min walk + push-ups (3x5-10)"],
        },
        6: {
            title: "Loops (Part 1)",
            cpp: ["for loop, while loop", "Print patterns (triangle, pyramid)"],
            python: ["for loop, while loop, range()", "Print patterns (triangle, pyramid)"],
            dsa: ["Analyze loop complexities"],
            fitness: ["30 min brisk walk + squats + push-ups"],
        },
        7: {
            title: "Loops (Part 2) & Week Review",
            cpp: ["do-while, break, continue, nested loops", "Multiplication table generator"],
            python: ["break, continue, nested loops, enumerate", "Number guessing game"],
            dsa: ["Review Big-O, solve 1 problem"],
            fitness: ["30 min walk + full body stretch"],
        },
        8: {
            title: "Functions (Part 1)",
            cpp: ["Function declaration, definition, calling, return types", "Write 5 small utility functions"],
            python: ["def, return, default parameters", "Write 5 small utility functions"],
            dsa: ["Introduction to Arrays"],
            fitness: ["30 min walk + bodyweight circuit"],
        },
        9: {
            title: "Functions (Part 2)",
            cpp: ["Pass by value vs reference, function overloading", "Swap function (by value vs reference)"],
            python: ["*args, **kwargs, lambda functions", "Map, filter with lambda"],
            dsa: ["Array operations (insert, delete, search)"],
            fitness: ["30 min brisk walk + push-ups (3x10)"],
        },
        10: {
            title: "Arrays / Lists",
            cpp: ["Arrays: declaration, initialization, traversal", "Find max/min in array"],
            python: ["Lists: creation, slicing, methods", "Find max/min in list"],
            dsa: ["Solve LeetCode #1: Two Sum"],
            fitness: ["Light jog 15 min + squats (3x15)"],
        },
        11: {
            title: "Array/List Problems",
            cpp: ["Reverse an array, remove duplicates"],
            python: ["Reverse a list, remove duplicates"],
            dsa: ["Solve 2 LeetCode Easy (arrays)"],
            fitness: ["Light jog 15 min + push-ups + planks"],
        },
        12: {
            title: "Strings",
            cpp: ["C-strings vs std::string, string methods", "Palindrome checker, vowel counter"],
            python: ["String methods, slicing, immutability", "Palindrome checker, word frequency counter"],
            dsa: ["Solve 1 LeetCode Easy (strings)"],
            fitness: ["Jog 20 min + core exercises"],
        },
        13: {
            title: "2D Arrays & String Problems",
            cpp: ["2D arrays, matrix operations"],
            python: ["Nested lists, list comprehensions intro"],
            dsa: ["Solve 2 LeetCode Easy (strings/arrays)"],
            fitness: ["Jog 20 min + full body workout"],
        },
        14: {
            title: "Week 2 Review & Practice",
            cpp: ["Build a student grade management program"],
            python: ["Build a contact book program"],
            dsa: ["Solve 2 LeetCode Easy problems"],
            fitness: ["Rest day — light walk + stretching"],
        },
        15: {
            title: "C++ Pointers / Python Tuples",
            cpp: ["Pointers: declaration, dereferencing, pointer arithmetic", "Write programs demonstrating pointer operations"],
            python: ["Tuples: creation, unpacking, immutability", "Tuple packing/unpacking exercises"],
            dsa: ["Introduction to Linked Lists"],
            fitness: ["Jog 20 min + push-ups (3x12)"],
        },
        16: {
            title: "C++ References / Python Dictionaries",
            cpp: ["References, const references, reference vs pointer", "Swap using references"],
            python: ["Dictionaries: creation, methods, iteration", "Word frequency counter using dict"],
            dsa: ["Implement Singly Linked List (insert at head/tail)"],
            fitness: ["Jog 20 min + squats (3x15) + planks"],
        },
        17: {
            title: "Dynamic Memory / Python Sets",
            cpp: ["new, delete, dynamic arrays", "Dynamic array creation and manipulation"],
            python: ["Sets: creation, operations, methods", "Set operations exercise"],
            dsa: ["Linked List: delete node, search, reverse"],
            fitness: ["Jog 25 min + bodyweight circuit"],
        },
        18: {
            title: "Linked List Implementation",
            cpp: ["Implement Singly Linked List in C++"],
            python: ["Implement Singly Linked List in Python"],
            dsa: ["Solve 2 LeetCode Easy (Linked List)"],
            fitness: ["Jog 25 min + upper body exercises"],
        },
        19: {
            title: "Doubly Linked List",
            cpp: ["Implement Doubly Linked List in C++"],
            python: ["Implement Doubly Linked List in Python"],
            dsa: ["Solve 1 LeetCode Easy/Medium (Linked List)"],
            fitness: ["Jog 25 min + lower body exercises"],
        },
        20: {
            title: "Linked List Advanced",
            cpp: ["Detect cycle in linked list (Floyd's algorithm)"],
            python: ["Merge two sorted linked lists"],
            dsa: ["Solve 2 LeetCode problems (Linked List)"],
            fitness: ["Jog 20 min + full body workout"],
        },
        21: {
            title: "Week 3 Review",
            cpp: ["Review pointers, references, linked lists"],
            python: ["Review data structures: list, tuple, dict, set"],
            dsa: ["Solve 2 problems (mix of arrays, strings, LL)"],
            fitness: ["Rest day — light walk + deep stretching"],
        },
        22: {
            title: "STL Vectors / List Comprehensions",
            cpp: ["vector: methods, iteration, 2D vectors"],
            python: ["List comprehensions (basic & nested)"],
            dsa: ["Introduction to Stacks"],
            fitness: ["Jog 20 min + push-ups (3x15) + squats"],
        },
        23: {
            title: "STL Map/Set / Python Collections",
            cpp: ["map, unordered_map, set, unordered_set"],
            python: ["collections: Counter, defaultdict, deque"],
            dsa: ["Implement Stack using array & linked list"],
            fitness: ["Jog 25 min + core exercises"],
        },
        24: {
            title: "Stack Problems",
            cpp: ["Balanced parentheses checker"],
            python: ["Next greater element"],
            dsa: ["Solve 2 LeetCode problems (Stacks)"],
            fitness: ["Jog 25 min + full body workout"],
        },
        25: {
            title: "Queues",
            cpp: ["queue, deque from STL"],
            python: ["deque from collections, Queue module"],
            dsa: ["Implement Queue using array & linked list"],
            fitness: ["Jog 25 min + HIIT intervals (5 min)"],
        },
        26: {
            title: "Queue Problems",
            cpp: ["Circular queue implementation"],
            python: ["Queue using two stacks"],
            dsa: ["Solve 2 LeetCode problems (Queues)"],
            fitness: ["Run 25 min + bodyweight circuit"],
        },
        27: {
            title: "Recursion",
            cpp: ["Recursion basics, base case, recursive case"],
            python: ["Recursion, sys.setrecursionlimit"],
            dsa: ["Factorial, Fibonacci, power (recursive). Solve 2 problems"],
            fitness: ["Run 25 min + strength exercises"],
        },
        28: {
            title: "Sorting Algorithms (Basic)",
            cpp: ["Implement Bubble Sort, Selection Sort"],
            python: ["Implement Insertion Sort"],
            dsa: ["Understand time complexities of sorting algorithms"],
            fitness: ["Run 20 min + flexibility training"],
        },
        29: {
            title: "Advanced Sorting",
            cpp: ["Implement Merge Sort"],
            python: ["Implement Quick Sort"],
            dsa: ["Solve 2 sorting-related LeetCode problems"],
            fitness: ["Run 25 min + core + push-ups"],
        },
        30: {
            title: "Phase 1 Review!",
            cpp: ["Review all Phase 1 C++ concepts"],
            python: ["Review all Phase 1 Python concepts"],
            dsa: ["Solve 3-5 mixed LeetCode Easy problems"],
            fitness: ["Active rest — walk + yoga/stretching"],
        },
    };

    // Generate Phase 2 (Days 31-60) and Phase 3 (Days 61-90)
    for (let d = 31; d <= 90; d++) {
        if (!tasks[d]) {
            tasks[d] = generateDayTasks(d);
        }
    }

    return tasks[day] || { title: `Day ${day}`, cpp: ["Continue learning"], python: ["Continue learning"], dsa: ["Solve 2 problems"], fitness: ["Workout 30 min"] };
}

function generateDayTasks(day) {
    const phase2 = {
        31: { title: "Classes & Objects", cpp: ["Classes, objects, access specifiers, constructors"], python: ["Classes, __init__, self, instance variables"], dsa: ["Introduction to Trees (terminology, types)"], fitness: ["Run 25 min + full body workout"] },
        32: { title: "Constructors & Destructors", cpp: ["Default, parameterized, copy constructors, destructors"], python: ["__init__, __del__, __str__, __repr__"], dsa: ["Binary Tree implementation"], fitness: ["Run 25 min + strength training"] },
        33: { title: "Encapsulation", cpp: ["Getters/setters, static members, friend functions"], python: ["Properties, @property decorator"], dsa: ["Tree traversals (inorder, preorder, postorder)"], fitness: ["Run 30 min + core exercises"] },
        34: { title: "Inheritance", cpp: ["Single, multiple, multilevel inheritance"], python: ["Single, multiple inheritance, MRO, super()"], dsa: ["Tree traversals — iterative (using stack)"], fitness: ["HIIT 20 min + bodyweight circuit"] },
        35: { title: "Polymorphism", cpp: ["Function/operator overloading, virtual functions"], python: ["Method overriding, duck typing"], dsa: ["Level order traversal (BFS on tree)"], fitness: ["HIIT 20 min + compound exercises"] },
        36: { title: "Abstraction", cpp: ["Abstract classes, pure virtual functions"], python: ["ABC module, abstract methods"], dsa: ["BST: insert, search, delete"], fitness: ["Run 30 min + flexibility"] },
        37: { title: "OOP Practice", cpp: ["Build Library Management System"], python: ["Build Library Management System"], dsa: ["Solve 2 LeetCode problems (Trees)"], fitness: ["Active rest — light jog + stretching"] },
        38: { title: "File I/O", cpp: ["ifstream, ofstream, fstream"], python: ["open(), read(), write(), with statement, csv"], dsa: ["Validate BST, find LCA in BST"], fitness: ["Run 30 min + upper body"] },
        39: { title: "Exception Handling", cpp: ["try, catch, throw, custom exceptions"], python: ["try, except, finally, raise, custom exceptions"], dsa: ["Height & diameter of binary tree"], fitness: ["Run 30 min + lower body"] },
        40: { title: "Heap / Priority Queue", cpp: ["priority_queue from STL"], python: ["heapq module"], dsa: ["Implement Min Heap, Max Heap"], fitness: ["HIIT 25 min + core"] },
        41: { title: "Heap Problems", cpp: ["Kth largest element (C++)"], python: ["Merge K sorted lists (Python)"], dsa: ["Solve 2 LeetCode problems (Heap)"], fitness: ["Run 30 min + full body"] },
        42: { title: "Hashing", cpp: ["unordered_map, hash functions"], python: ["dict internals, hash()"], dsa: ["Two Sum (hash), group anagrams"], fitness: ["HIIT 25 min + compound exercises"] },
        43: { title: "Hashing Problems", cpp: ["Longest substring without repeating chars"], python: ["Subarray sum equals K"], dsa: ["Solve 2 LeetCode Medium (Hashing)"], fitness: ["Run 30 min + strength"] },
        44: { title: "Week 6 Review", cpp: ["Review File I/O, exceptions, trees, heaps"], python: ["Review all intermediate topics"], dsa: ["Solve 3 mixed problems"], fitness: ["Active rest + stretching"] },
        45: { title: "Templates / Decorators", cpp: ["Function templates, class templates"], python: ["Decorators (basic, with args, functools.wraps)"], dsa: ["Introduction to Graphs"], fitness: ["Run 30 min + full body"] },
        46: { title: "Operator Overloading / Generators", cpp: ["Overload +, ==, <<, >> operators"], python: ["Generators: yield, generator expressions"], dsa: ["Graph representation (adjacency list & matrix)"], fitness: ["HIIT 25 min + bodyweight circuit"] },
        47: { title: "BFS", cpp: ["Implement BFS in C++"], python: ["Implement BFS in Python"], dsa: ["Solve 2 BFS problems"], fitness: ["Run 30 min + upper body"] },
        48: { title: "DFS", cpp: ["Implement DFS in C++ (recursive & iterative)"], python: ["Implement DFS in Python (recursive & iterative)"], dsa: ["Solve 2 DFS problems"], fitness: ["Run 30 min + lower body"] },
        49: { title: "Graph Problems", cpp: ["Number of islands (C++)"], python: ["Detect cycle in graph (Python)"], dsa: ["Solve 2 LeetCode Medium (Graphs)"], fitness: ["HIIT 25 min + core"] },
        50: { title: "STL Algorithms / Itertools", cpp: ["sort, find, binary_search, accumulate"], python: ["itertools: permutations, combinations, product"], dsa: ["Solve 2 mixed problems"], fitness: ["Run 30 min + full body"] },
        51: { title: "Week 7 Review", cpp: ["Review templates, graphs"], python: ["Review decorators, generators, graphs"], dsa: ["Solve 3 mixed medium problems"], fitness: ["Active rest + deep stretching"] },
        52: { title: "STL Deep Dive / Python Modules", cpp: ["Iterators, custom comparators, pair, tuple"], python: ["Creating modules, packages, __init__.py"], dsa: ["Topological Sort"], fitness: ["Run 30 min + strength training"] },
        53: { title: "Shortest Path", cpp: ["Dijkstra's Algorithm (C++)"], python: ["Dijkstra's Algorithm (Python)"], dsa: ["Solve shortest path problems"], fitness: ["HIIT 30 min + compound exercises"] },
        54: { title: "More Graph Algorithms", cpp: ["Bellman-Ford Algorithm"], python: ["Union-Find (Disjoint Set Union)"], dsa: ["Solve 2 graph problems"], fitness: ["Run 35 min + core"] },
        55: { title: "Binary Search", cpp: ["Binary search (iterative & recursive)"], python: ["Binary search on answer"], dsa: ["Solve 3 binary search problems"], fitness: ["HIIT 30 min + full body"] },
        56: { title: "Two Pointers & Sliding Window", cpp: ["Two pointer technique"], python: ["Sliding window technique"], dsa: ["Solve 3 problems (two pointer/sliding window)"], fitness: ["Run 35 min + upper body"] },
        57: { title: "Bit Manipulation", cpp: ["Bitwise operators deep dive"], python: ["Common bit tricks"], dsa: ["Solve 2 bit manipulation problems"], fitness: ["Run 35 min + lower body"] },
        58: { title: "Practice Day", cpp: ["Mixed problem solving"], python: ["Mixed problem solving"], dsa: ["Solve 5 LeetCode problems (all topics)"], fitness: ["HIIT 25 min + flexibility"] },
        59: { title: "Practice Day 2", cpp: ["Focus on weak areas"], python: ["Focus on weak areas"], dsa: ["Solve 5 LeetCode problems (weak areas)"], fitness: ["Run 30 min + full body"] },
        60: { title: "Phase 2 Review!", cpp: ["Review all Phase 2 C++ concepts"], python: ["Review all Phase 2 Python concepts"], dsa: ["Solve 3-5 LeetCode Medium problems"], fitness: ["Active rest + yoga/stretching"] },
    };

    const phase3 = {
        61: { title: "Smart Pointers / Advanced OOP", cpp: ["unique_ptr, shared_ptr, weak_ptr"], python: ["Multiple inheritance, mixins, metaclasses"], dsa: ["Intro to Dynamic Programming (memoization vs tabulation)"], fitness: ["Full workout 45 min"] },
        62: { title: "Move Semantics / Design Patterns", cpp: ["Rvalue references, move constructor"], python: ["Singleton, Factory, Observer patterns"], dsa: ["Fibonacci: recursive → memoized → tabulated"], fitness: ["Full workout 45 min"] },
        63: { title: "DP: 1D Problems", cpp: ["Climbing stairs, house robber"], python: ["Coin change"], dsa: ["Solve 2 DP Easy/Medium"], fitness: ["Full workout 45 min"] },
        64: { title: "DP: More 1D", cpp: ["Longest increasing subsequence"], python: ["Maximum subarray (Kadane's)"], dsa: ["Solve 2 DP problems"], fitness: ["Full workout 45 min"] },
        65: { title: "DP: 2D Problems", cpp: ["Longest Common Subsequence"], python: ["Edit Distance"], dsa: ["Solve 2 DP Medium"], fitness: ["Full workout 45 min"] },
        66: { title: "DP: More 2D", cpp: ["0/1 Knapsack"], python: ["Unique Paths"], dsa: ["Solve 2 DP problems"], fitness: ["Full workout 45 min"] },
        67: { title: "Week 9 Review", cpp: ["Review DP concepts"], python: ["Review DP patterns"], dsa: ["Solve 3 DP problems"], fitness: ["Active rest + flexibility"] },
        68: { title: "Advanced I/O / Regex", cpp: ["Advanced file handling, exception hierarchy"], python: ["re module: match, search, findall, sub"], dsa: ["Introduction to Backtracking"], fitness: ["Full workout 45 min"] },
        69: { title: "Backtracking", cpp: ["N-Queens problem"], python: ["Sudoku solver"], dsa: ["Solve 2 backtracking problems"], fitness: ["Full workout 45 min"] },
        70: { title: "More Backtracking", cpp: ["Permutations, combinations, subsets"], python: ["Word search in grid"], dsa: ["Solve 2 backtracking problems"], fitness: ["Full workout 45 min"] },
        71: { title: "Greedy Algorithms", cpp: ["Activity selection, fractional knapsack"], python: ["Jump game, meeting rooms"], dsa: ["Solve 2 greedy problems"], fitness: ["Full workout 45 min"] },
        72: { title: "Trie", cpp: ["Implement Trie (insert, search, startsWith)"], python: ["Implement Trie in Python"], dsa: ["Solve 2 Trie problems"], fitness: ["Full workout 45 min"] },
        73: { title: "Advanced Trees", cpp: ["Segment Tree basics"], python: ["LCA in Binary Tree"], dsa: ["Solve 2 tree problems"], fitness: ["Full workout 45 min"] },
        74: { title: "Week 10 Review", cpp: ["Review backtracking, greedy, tries"], python: ["Review advanced topics"], dsa: ["Solve 3 mixed medium/hard problems"], fitness: ["Active rest + stretching"] },
        75: { title: "Multithreading / Concurrency", cpp: ["std::thread, mutex, lock_guard"], python: ["threading, multiprocessing basics"], dsa: ["Solve 3 medium problems"], fitness: ["Full workout 45 min"] },
        76: { title: "String Algorithms", cpp: ["KMP algorithm / Rabin-Karp"], python: ["Advanced string processing"], dsa: ["Solve 2 string problems"], fitness: ["Full workout 45 min"] },
        77: { title: "Math & Number Theory", cpp: ["GCD, LCM, prime sieve"], python: ["Modular arithmetic, power functions"], dsa: ["Solve 2 math-related problems"], fitness: ["Full workout 45 min"] },
        78: { title: "Mixed Practice", cpp: ["Mixed problem solving"], python: ["Mixed problem solving"], dsa: ["Solve 5 LeetCode problems (all topics)"], fitness: ["Full workout 45 min"] },
        79: { title: "Mixed Practice 2", cpp: ["Practice explaining approach"], python: ["Practice explaining approach"], dsa: ["Solve 5 LeetCode problems"], fitness: ["Full workout 45 min"] },
        80: { title: "Mock Interview #1", cpp: ["Timed: solve 2 medium in 45 min"], python: ["Write clean, documented solutions"], dsa: ["Mock interview simulation"], fitness: ["Full workout 45 min"] },
        81: { title: "Week 11 Review", cpp: ["Review weak areas"], python: ["Review weak areas"], dsa: ["Solve 3 problems from weak topics"], fitness: ["Active rest + stretching"] },
        82: { title: "C++ Project Start", cpp: ["Plan & set up C++ project structure"], python: ["Plan Python project"], dsa: ["Solve 2 problems"], fitness: ["Full workout 45 min"] },
        83: { title: "Project Build", cpp: ["Implement core C++ functionality"], python: ["Research project approach"], dsa: ["Solve 2 problems"], fitness: ["Full workout 45 min"] },
        84: { title: "C++ Project Complete", cpp: ["Complete project, add error handling, test"], python: ["Start Python project"], dsa: ["Solve 2 problems"], fitness: ["Full workout 45 min"] },
        85: { title: "Python Project Start", cpp: ["Code review & refactor C++ project"], python: ["Implement core Python functionality"], dsa: ["Solve 2 problems"], fitness: ["Full workout 45 min"] },
        86: { title: "Python Project Build", cpp: ["Document C++ project"], python: ["Build Python project features"], dsa: ["Solve 2 problems"], fitness: ["Full workout 45 min"] },
        87: { title: "Python Project Complete", cpp: ["Final C++ project polish"], python: ["Complete, test, document Python project"], dsa: ["Solve 2 problems"], fitness: ["Full workout 45 min"] },
        88: { title: "Mock Interview #2", cpp: ["Solve 3 medium in 60 min (timed)"], python: ["Review and optimize solutions"], dsa: ["Mock interview simulation"], fitness: ["Full workout 45 min"] },
        89: { title: "Mock Interview #3", cpp: ["Solve 2 medium + 1 hard in 60 min"], python: ["Practice clear communication"], dsa: ["Final mock interview"], fitness: ["Full workout 45 min"] },
        90: { title: "FINAL DAY! 🎉", cpp: ["Review entire 90-day C++ journey"], python: ["Review entire 90-day Python journey"], dsa: ["Solve 3 confidence problems. Write final summary!"], fitness: ["Celebrate! Take progress photo. You made it!"] },
    };

    return phase2[day] || phase3[day] || {
        title: `Day ${day}`,
        cpp: ["Continue C++ learning"],
        python: ["Continue Python learning"],
        dsa: ["Solve 2 DSA problems"],
        fitness: ["Workout 30 min"]
    };
}

// ===== C++ Roadmap =====
const cppRoadmap = {
    "Phase 1: Basics (Week 1)": [
        "Setting up compiler (g++/MSVC) and VS Code",
        "#include, using namespace std, main()",
        "cout, cin, endl, \\n",
        "Variables: int, float, double, char, bool, string",
        "Constants: const, #define",
        "Operators: arithmetic, relational, logical, bitwise",
        "Type casting: implicit & explicit",
        "Conditionals: if, else if, else, switch, ternary",
        "Loops: for, while, do-while, break, continue"
    ],
    "Functions & Arrays (Week 2)": [
        "Function declaration, definition, calling",
        "Return types, parameters (pass by value)",
        "Pass by reference, default arguments",
        "Function overloading",
        "Arrays: 1D declaration, initialization, traversal",
        "Arrays: 2D arrays, matrix operations",
        "C-strings vs std::string",
        "String methods: length(), substr(), find(), append()"
    ],
    "Pointers & Memory (Week 3)": [
        "Pointers: declaration, initialization, dereferencing",
        "Pointer arithmetic",
        "Pointers and arrays",
        "References vs pointers",
        "const with pointers and references",
        "Dynamic memory: new, delete, new[], delete[]",
        "Memory leaks and dangling pointers"
    ],
    "STL Basics (Week 4)": [
        "vector: creation, push_back, pop_back, size, iteration",
        "string methods in depth",
        "pair and tuple",
        "map and unordered_map",
        "set and unordered_set",
        "stack, queue, deque",
        "sort(), reverse(), min/max_element()"
    ],
    "OOP (Week 5-6)": [
        "Classes and objects",
        "Access specifiers: public, private, protected",
        "Constructors: default, parameterized, copy",
        "Destructor",
        "this pointer",
        "Static members and methods",
        "Friend functions and classes",
        "Operator overloading (+, ==, <<, >>)",
        "Inheritance: single, multiple, multilevel",
        "Virtual functions, pure virtual functions",
        "Abstract classes",
        "Polymorphism (compile-time & runtime)"
    ],
    "Advanced Features (Week 7-8)": [
        "Function templates",
        "Class templates",
        "Exception handling: try, catch, throw",
        "Custom exceptions",
        "File I/O: ifstream, ofstream, fstream",
        "STL algorithms: sort, find, binary_search",
        "Iterators, custom comparators",
        "Lambda expressions"
    ],
    "Modern C++ (Week 9-10)": [
        "Smart pointers: unique_ptr, shared_ptr, weak_ptr",
        "Move semantics, rvalue references, std::move",
        "auto keyword and type inference",
        "Range-based for loops",
        "nullptr vs NULL",
        "enum class",
        "constexpr"
    ],
    "Advanced & Project (Week 11-13)": [
        "Multithreading: std::thread, std::mutex",
        "std::async and std::future",
        "Namespaces",
        "Header files and separate compilation",
        "Build a complete C++ project"
    ]
};

// ===== Python Roadmap =====
const pythonRoadmap = {
    "Phase 1: Basics (Week 1)": [
        "Installing Python 3.x, VS Code setup",
        "print(), input(), comments",
        "Variables: int, float, str, bool",
        "Type conversion: int(), float(), str()",
        "f-strings, .format(), concatenation",
        "Operators: arithmetic, comparison, logical",
        "Conditionals: if, elif, else, ternary",
        "Loops: for, while, break, continue, pass",
        "range(), enumerate(), zip()"
    ],
    "Functions & Data Structures (Week 2)": [
        "Functions: def, return, parameters",
        "*args and **kwargs",
        "Lambda functions",
        "map(), filter(), reduce()",
        "Lists: creation, indexing, slicing, methods",
        "List comprehensions",
        "Tuples: creation, unpacking, immutability",
        "Strings: methods, slicing, immutability"
    ],
    "Collections (Week 3)": [
        "Dictionaries: creation, methods, iteration",
        "Dictionary comprehensions",
        "Sets: creation, operations (union, intersection)",
        "collections: Counter, defaultdict, deque",
        "Nested data structures"
    ],
    "More Fundamentals (Week 4)": [
        "Recursion in Python",
        "Sorting: sorted(), .sort(), key parameter",
        "Custom sorting with lambda",
        "String manipulation deep dive",
        "Advanced list comprehensions"
    ],
    "OOP (Week 5-6)": [
        "Classes, __init__, self",
        "Instance vs class variables",
        "Methods: instance, @classmethod, @staticmethod",
        "@property, getter/setter",
        "__str__, __repr__",
        "Inheritance: single, multiple, MRO, super()",
        "Polymorphism, method overriding",
        "Abstract Base Classes (abc module)",
        "Dunder methods: __len__, __getitem__, __eq__",
        "Encapsulation: name mangling (_, __)"
    ],
    "Advanced Features (Week 7-8)": [
        "File I/O: open(), read(), write(), with",
        "CSV and JSON file handling",
        "Exception handling: try, except, finally",
        "Custom exceptions",
        "Decorators: basic, with arguments",
        "Generators: yield, generator expressions",
        "Iterators: __iter__, __next__",
        "itertools: permutations, combinations",
        "Modules, packages, virtual environments"
    ],
    "Advanced Python (Week 9-10)": [
        "Regular expressions: re module",
        "Advanced OOP: mixins, design patterns",
        "Context managers: __enter__, __exit__",
        "Type hints and typing module",
        "dataclasses"
    ],
    "Concurrency & Project (Week 11-13)": [
        "Threading: threading module",
        "Multiprocessing basics",
        "concurrent.futures",
        "functools: partial, lru_cache",
        "Unit testing: unittest, pytest basics",
        "Build a complete Python project"
    ]
};

// ===== DSA Problems =====
const dsaProblems = {
    "Arrays & Strings": [
        { name: "Two Sum", difficulty: "easy", leetcode: 1 },
        { name: "Best Time to Buy and Sell Stock", difficulty: "easy", leetcode: 121 },
        { name: "Contains Duplicate", difficulty: "easy", leetcode: 217 },
        { name: "Maximum Subarray", difficulty: "medium", leetcode: 53 },
        { name: "Product of Array Except Self", difficulty: "medium", leetcode: 238 },
        { name: "3Sum", difficulty: "medium", leetcode: 15 },
        { name: "Container With Most Water", difficulty: "medium", leetcode: 11 },
        { name: "Valid Anagram", difficulty: "easy", leetcode: 242 },
        { name: "Longest Substring Without Repeating Characters", difficulty: "medium", leetcode: 3 },
        { name: "Group Anagrams", difficulty: "medium", leetcode: 49 },
    ],
    "Linked Lists": [
        { name: "Reverse Linked List", difficulty: "easy", leetcode: 206 },
        { name: "Merge Two Sorted Lists", difficulty: "easy", leetcode: 21 },
        { name: "Linked List Cycle", difficulty: "easy", leetcode: 141 },
        { name: "Remove Nth Node From End", difficulty: "medium", leetcode: 19 },
        { name: "Reorder List", difficulty: "medium", leetcode: 143 },
        { name: "Add Two Numbers", difficulty: "medium", leetcode: 2 },
    ],
    "Stacks & Queues": [
        { name: "Valid Parentheses", difficulty: "easy", leetcode: 20 },
        { name: "Min Stack", difficulty: "medium", leetcode: 155 },
        { name: "Daily Temperatures", difficulty: "medium", leetcode: 739 },
        { name: "Implement Queue using Stacks", difficulty: "easy", leetcode: 232 },
        { name: "Largest Rectangle in Histogram", difficulty: "hard", leetcode: 84 },
    ],
    "Trees": [
        { name: "Maximum Depth of Binary Tree", difficulty: "easy", leetcode: 104 },
        { name: "Invert Binary Tree", difficulty: "easy", leetcode: 226 },
        { name: "Same Tree", difficulty: "easy", leetcode: 100 },
        { name: "Validate BST", difficulty: "medium", leetcode: 98 },
        { name: "Kth Smallest in BST", difficulty: "medium", leetcode: 230 },
        { name: "Binary Tree Level Order Traversal", difficulty: "medium", leetcode: 102 },
        { name: "LCA of BST", difficulty: "medium", leetcode: 235 },
        { name: "Diameter of Binary Tree", difficulty: "easy", leetcode: 543 },
        { name: "Binary Tree Right Side View", difficulty: "medium", leetcode: 199 },
        { name: "Serialize and Deserialize Binary Tree", difficulty: "hard", leetcode: 297 },
    ],
    "Heaps": [
        { name: "Kth Largest Element", difficulty: "medium", leetcode: 215 },
        { name: "Top K Frequent Elements", difficulty: "medium", leetcode: 347 },
        { name: "Merge K Sorted Lists", difficulty: "hard", leetcode: 23 },
        { name: "Find Median from Data Stream", difficulty: "hard", leetcode: 295 },
        { name: "Task Scheduler", difficulty: "medium", leetcode: 621 },
    ],
    "Hashing": [
        { name: "Longest Consecutive Sequence", difficulty: "medium", leetcode: 128 },
        { name: "Subarray Sum Equals K", difficulty: "medium", leetcode: 560 },
        { name: "Valid Sudoku", difficulty: "medium", leetcode: 36 },
    ],
    "Graphs": [
        { name: "Number of Islands", difficulty: "medium", leetcode: 200 },
        { name: "Clone Graph", difficulty: "medium", leetcode: 133 },
        { name: "Pacific Atlantic Water Flow", difficulty: "medium", leetcode: 417 },
        { name: "Course Schedule", difficulty: "medium", leetcode: 207 },
        { name: "Course Schedule II", difficulty: "medium", leetcode: 210 },
        { name: "Word Ladder", difficulty: "hard", leetcode: 127 },
        { name: "Network Delay Time", difficulty: "medium", leetcode: 743 },
    ],
    "Binary Search": [
        { name: "Binary Search", difficulty: "easy", leetcode: 704 },
        { name: "Search in Rotated Sorted Array", difficulty: "medium", leetcode: 33 },
        { name: "Find Minimum in Rotated Sorted Array", difficulty: "medium", leetcode: 153 },
        { name: "Search a 2D Matrix", difficulty: "medium", leetcode: 74 },
        { name: "Koko Eating Bananas", difficulty: "medium", leetcode: 875 },
        { name: "Median of Two Sorted Arrays", difficulty: "hard", leetcode: 4 },
    ],
    "Dynamic Programming": [
        { name: "Climbing Stairs", difficulty: "easy", leetcode: 70 },
        { name: "House Robber", difficulty: "medium", leetcode: 198 },
        { name: "House Robber II", difficulty: "medium", leetcode: 213 },
        { name: "Coin Change", difficulty: "medium", leetcode: 322 },
        { name: "Longest Increasing Subsequence", difficulty: "medium", leetcode: 300 },
        { name: "Longest Common Subsequence", difficulty: "medium", leetcode: 1143 },
        { name: "Word Break", difficulty: "medium", leetcode: 139 },
        { name: "Edit Distance", difficulty: "medium", leetcode: 72 },
        { name: "Unique Paths", difficulty: "medium", leetcode: 62 },
        { name: "Decode Ways", difficulty: "medium", leetcode: 91 },
        { name: "Partition Equal Subset Sum", difficulty: "medium", leetcode: 416 },
        { name: "Target Sum", difficulty: "medium", leetcode: 494 },
    ],
    "Backtracking": [
        { name: "Subsets", difficulty: "medium", leetcode: 78 },
        { name: "Permutations", difficulty: "medium", leetcode: 46 },
        { name: "Combination Sum", difficulty: "medium", leetcode: 39 },
        { name: "N-Queens", difficulty: "hard", leetcode: 51 },
        { name: "Word Search", difficulty: "medium", leetcode: 79 },
        { name: "Palindrome Partitioning", difficulty: "medium", leetcode: 131 },
    ],
    "Greedy": [
        { name: "Jump Game", difficulty: "medium", leetcode: 55 },
        { name: "Jump Game II", difficulty: "medium", leetcode: 45 },
        { name: "Gas Station", difficulty: "medium", leetcode: 134 },
        { name: "Merge Intervals", difficulty: "medium", leetcode: 56 },
        { name: "Non-overlapping Intervals", difficulty: "medium", leetcode: 435 },
    ],
    "Tries": [
        { name: "Implement Trie", difficulty: "medium", leetcode: 208 },
        { name: "Word Search II", difficulty: "hard", leetcode: 212 },
        { name: "Design Add and Search Words", difficulty: "medium", leetcode: 211 },
    ],
};

// ===== Fitness Plans =====
function getFitnessForDay(day) {
    if (day <= 7) {
        return {
            phase: "Phase 1: Foundation",
            workout: [
                { exercise: "Brisk Walk", duration: "30 min", icon: "fa-walking" },
                { exercise: "Full Body Stretch", duration: "5-10 min", icon: "fa-child" },
            ],
            tip: "Focus on building the habit. Just show up every day!"
        };
    } else if (day <= 14) {
        return {
            phase: "Phase 1: Foundation",
            workout: [
                { exercise: "Brisk Walk", duration: "30 min", icon: "fa-walking" },
                { exercise: "Push-ups", duration: "3x5-10", icon: "fa-dumbbell" },
                { exercise: "Squats", duration: "3x10-15", icon: "fa-dumbbell" },
                { exercise: "Planks", duration: "3x15 sec", icon: "fa-stopwatch" },
            ],
            tip: "Knee push-ups are perfectly fine when starting!"
        };
    } else if (day <= 30) {
        return {
            phase: "Phase 1: Foundation",
            workout: [
                { exercise: "Jog/Walk Intervals", duration: "20-25 min", icon: "fa-running" },
                { exercise: "Push-ups", duration: "3x10-12", icon: "fa-dumbbell" },
                { exercise: "Squats", duration: "3x15", icon: "fa-dumbbell" },
                { exercise: "Planks", duration: "3x20 sec", icon: "fa-stopwatch" },
                { exercise: "Lunges", duration: "3x10 each", icon: "fa-dumbbell" },
            ],
            tip: "If you can talk while jogging, you're at the right pace."
        };
    } else if (day <= 60) {
        return {
            phase: "Phase 2: Building Strength",
            workout: [
                { exercise: "Run", duration: "25-35 min", icon: "fa-running" },
                { exercise: "Push-ups", duration: "3-4x15", icon: "fa-dumbbell" },
                { exercise: "Squats", duration: "3-4x20", icon: "fa-dumbbell" },
                { exercise: "Planks", duration: "3x30-45 sec", icon: "fa-stopwatch" },
                { exercise: "Burpees", duration: "3x8-10", icon: "fa-fire" },
                { exercise: "Mountain Climbers", duration: "3x15-20", icon: "fa-mountain" },
            ],
            tip: "Progressive overload: add reps or sets each week."
        };
    } else {
        return {
            phase: "Phase 3: Peak Performance",
            workout: [
                { exercise: "Run / HIIT", duration: "30-40 min", icon: "fa-running" },
                { exercise: "Push-ups", duration: "4x20", icon: "fa-dumbbell" },
                { exercise: "Squats", duration: "4x25", icon: "fa-dumbbell" },
                { exercise: "Planks", duration: "3x60 sec", icon: "fa-stopwatch" },
                { exercise: "Burpees", duration: "3x12-15", icon: "fa-fire" },
                { exercise: "Diamond Push-ups", duration: "3x10", icon: "fa-dumbbell" },
                { exercise: "Jump Squats", duration: "3x10", icon: "fa-bolt" },
            ],
            tip: "You're in the final stretch. Push for personal records!"
        };
    }
}

// ===== Diet Data =====
function getDietPlan(dietType) {
    const vegMeals = {
        breakfast: [
            { meal: "Paneer paratha (2) + curd (200g)", protein: "22g" },
            { meal: "Moong dal chilla (2) + mint chutney + curd", protein: "20g" },
            { meal: "Besan chilla (2) + paneer stuffing + buttermilk", protein: "22g" },
            { meal: "Oats (50g) with milk + banana + almonds", protein: "18g" },
            { meal: "Idli (4) + sambar + coconut chutney + milk", protein: "16g" },
            { meal: "Poha (1.5 cup) + peanuts + sprouts + milk", protein: "18g" },
            { meal: "Sattu paratha (2) + curd + pickle", protein: "20g" },
        ],
        lunch: [
            { meal: "Rice + dal (1 bowl) + paneer curry (100g) + salad", protein: "28g" },
            { meal: "3 roti + rajma (1 bowl) + curd + salad", protein: "24g" },
            { meal: "Rice + chole (1 bowl) + raita + salad", protein: "22g" },
            { meal: "Rice + sambar + palak paneer (100g) + buttermilk", protein: "24g" },
            { meal: "3 roti + dal + soy chunks curry (50g dry) + salad", protein: "30g" },
            { meal: "Rice + mixed dal + tofu stir-fry (100g) + salad", protein: "26g" },
        ],
        dinner: [
            { meal: "2 roti + paneer bhurji (100g) + dal + salad", protein: "28g" },
            { meal: "Rice (1 cup) + dal + vegetable curry + curd", protein: "20g" },
            { meal: "2 roti + soy chunks curry (50g dry) + sabzi", protein: "28g" },
            { meal: "Khichdi (rice + moong dal) + papad + curd + salad", protein: "20g" },
            { meal: "Multigrain roti (2) + palak dal + tofu (100g)", protein: "24g" },
        ],
        snacks: [
            { meal: "Sprouts salad (1 cup) + lemon", protein: "12g" },
            { meal: "Roasted chana (50g) + orange", protein: "10g" },
            { meal: "Curd (200g) + chia seeds + honey", protein: "12g" },
            { meal: "Peanut butter + apple slices", protein: "8g" },
            { meal: "Mixed nuts (30g) + banana", protein: "7g" },
            { meal: "Protein smoothie (milk + banana + PB)", protein: "16g" },
        ]
    };

    const nonVegMeals = {
        breakfast: [
            { meal: "3 eggs (boiled/omelette) + 2 multigrain bread + milk", protein: "25g" },
            { meal: "2 egg whites + 1 whole egg omelette + oats + banana", protein: "22g" },
            { meal: "Poha (1.5 cup) + 2 boiled eggs + buttermilk", protein: "20g" },
            { meal: "Idli (3) + sambar + 2 boiled eggs", protein: "22g" },
            { meal: "Besan chilla (2) + curd + 1 boiled egg", protein: "24g" },
        ],
        lunch: [
            { meal: "Rice + chicken curry (150g) + dal + salad", protein: "35g" },
            { meal: "3 roti + egg curry (3 eggs) + sabzi + curd", protein: "28g" },
            { meal: "Rice + fish curry (150g) + rasam + salad", protein: "32g" },
            { meal: "Chicken biryani + raita + salad", protein: "30g" },
            { meal: "3 roti + dal + chicken (100g) + salad", protein: "35g" },
        ],
        dinner: [
            { meal: "2 roti + chicken (100g) + dal + salad", protein: "30g" },
            { meal: "Rice (1 cup) + fish (150g) + vegetable curry", protein: "30g" },
            { meal: "2 roti + egg bhurji (3 eggs) + salad", protein: "25g" },
            { meal: "Rice + grilled chicken (100g) + raita", protein: "28g" },
        ],
        snacks: vegMeals.snacks
    };

    return dietType === 'vegetarian' ? vegMeals : nonVegMeals;
}
