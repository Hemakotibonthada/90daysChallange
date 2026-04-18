/* ============================================
   CHEATSHEETS REFERENCE MODULE
   Quick reference cards for C++, Python,
   Git, Linux, Big-O, Regex, SQL basics
   ============================================ */

const CHEATSHEETS = {
    cpp_syntax: {
        title: "C++ Quick Reference",
        icon: "fas fa-code",
        color: "#6366f1",
        sections: [
            {
                title: "Data Types",
                items: [
                    { left: "int", right: "32-bit integer (-2B to 2B)" },
                    { left: "long long", right: "64-bit integer" },
                    { left: "double", right: "64-bit floating point" },
                    { left: "char", right: "Single character (1 byte)" },
                    { left: "bool", right: "true or false" },
                    { left: "string", right: "std::string (dynamic)" },
                    { left: "auto", right: "Automatic type deduction" },
                    { left: "size_t", right: "Unsigned integer for sizes" },
                ]
            },
            {
                title: "String Methods",
                items: [
                    { left: "s.length() / s.size()", right: "String length" },
                    { left: "s.substr(pos, len)", right: "Substring" },
                    { left: "s.find(str)", right: "Find position (npos if not found)" },
                    { left: "s.append(str)", right: "Append to end" },
                    { left: "s.insert(pos, str)", right: "Insert at position" },
                    { left: "s.erase(pos, len)", right: "Erase characters" },
                    { left: "s.replace(pos, len, str)", right: "Replace characters" },
                    { left: "s.c_str()", right: "Convert to C-string" },
                    { left: "stoi(s) / stod(s)", right: "String to int/double" },
                    { left: "to_string(n)", right: "Number to string" },
                ]
            },
            {
                title: "Vector Operations",
                items: [
                    { left: "v.push_back(x)", right: "Add to end O(1)*" },
                    { left: "v.pop_back()", right: "Remove from end O(1)" },
                    { left: "v.size()", right: "Number of elements" },
                    { left: "v.empty()", right: "Check if empty" },
                    { left: "v.front() / v.back()", right: "First / last element" },
                    { left: "v[i] / v.at(i)", right: "Access element" },
                    { left: "v.insert(it, x)", right: "Insert at iterator O(n)" },
                    { left: "v.erase(it)", right: "Erase at iterator O(n)" },
                    { left: "v.clear()", right: "Remove all elements" },
                    { left: "v.resize(n)", right: "Resize to n elements" },
                    { left: "v.reserve(n)", right: "Reserve capacity" },
                ]
            },
            {
                title: "Map/Set",
                items: [
                    { left: "map<K,V> m", right: "Ordered map (red-black tree)" },
                    { left: "unordered_map<K,V> m", right: "Hash map O(1) avg" },
                    { left: "m[key] = val", right: "Insert/update" },
                    { left: "m.count(key)", right: "Check existence (0 or 1)" },
                    { left: "m.find(key)", right: "Iterator to element" },
                    { left: "m.erase(key)", right: "Remove by key" },
                    { left: "set<T> s", right: "Ordered unique elements" },
                    { left: "s.insert(x)", right: "Add element O(log n)" },
                    { left: "s.count(x)", right: "Check membership" },
                ]
            },
            {
                title: "Algorithms",
                items: [
                    { left: "sort(v.begin(), v.end())", right: "Sort ascending O(n log n)" },
                    { left: "sort(v.begin(), v.end(), cmp)", right: "Sort with custom comparator" },
                    { left: "reverse(v.begin(), v.end())", right: "Reverse container" },
                    { left: "find(v.begin(), v.end(), x)", right: "Linear search O(n)" },
                    { left: "binary_search(b, e, x)", right: "Binary search (sorted) O(log n)" },
                    { left: "lower_bound(b, e, x)", right: "First element >= x" },
                    { left: "upper_bound(b, e, x)", right: "First element > x" },
                    { left: "min_element(b, e)", right: "Iterator to minimum" },
                    { left: "max_element(b, e)", right: "Iterator to maximum" },
                    { left: "accumulate(b, e, init)", right: "Sum of elements" },
                    { left: "next_permutation(b, e)", right: "Next lexicographic permutation" },
                    { left: "unique(b, e)", right: "Remove consecutive duplicates" },
                ]
            },
            {
                title: "I/O & Common Patterns",
                items: [
                    { left: "cin >> x", right: "Read input" },
                    { left: "cout << x << endl", right: "Print output" },
                    { left: "getline(cin, s)", right: "Read full line" },
                    { left: "ios_base::sync_with_stdio(0)", right: "Fast I/O" },
                    { left: "cin.tie(0)", right: "Untie cin from cout" },
                    { left: "#include <bits/stdc++.h>", right: "Include everything (competitive)" },
                    { left: "pair<int,int> p = {a,b}", right: "Pair of values" },
                    { left: "auto [x,y] = p", right: "Structured binding (C++17)" },
                    { left: "INT_MAX / INT_MIN", right: "Integer limits" },
                    { left: "1e9 + 7", right: "Common modulo value" },
                ]
            },
        ]
    },
    python_syntax: {
        title: "Python Quick Reference",
        icon: "fab fa-python",
        color: "#f59e0b",
        sections: [
            {
                title: "Data Types & Basics",
                items: [
                    { left: "int, float, str, bool", right: "Basic types" },
                    { left: "list, tuple, dict, set", right: "Collection types" },
                    { left: "None", right: "Null value" },
                    { left: "type(x)", right: "Check type" },
                    { left: "isinstance(x, int)", right: "Type check" },
                    { left: "int(x), str(x), float(x)", right: "Type conversion" },
                    { left: "f'{name} is {age}'", right: "F-string formatting" },
                    { left: "len(x)", right: "Length of collection" },
                    { left: "range(start, stop, step)", right: "Number sequence" },
                    { left: "input().strip()", right: "Read user input" },
                ]
            },
            {
                title: "List Operations",
                items: [
                    { left: "lst.append(x)", right: "Add to end O(1)" },
                    { left: "lst.insert(i, x)", right: "Insert at index O(n)" },
                    { left: "lst.pop() / lst.pop(i)", right: "Remove last / at index" },
                    { left: "lst.remove(x)", right: "Remove first occurrence" },
                    { left: "lst.index(x)", right: "Find index of x" },
                    { left: "lst.sort() / sorted(lst)", right: "Sort in-place / new list" },
                    { left: "lst.reverse() / lst[::-1]", right: "Reverse" },
                    { left: "lst[start:stop:step]", right: "Slicing" },
                    { left: "[x**2 for x in lst if x>0]", right: "List comprehension" },
                    { left: "list(zip(a, b))", right: "Pair elements" },
                    { left: "list(map(fn, lst))", right: "Apply function to all" },
                    { left: "list(filter(fn, lst))", right: "Filter elements" },
                ]
            },
            {
                title: "Dictionary Operations",
                items: [
                    { left: "d[key] = val", right: "Set value" },
                    { left: "d.get(key, default)", right: "Get with default" },
                    { left: "d.keys() / d.values()", right: "Keys / values" },
                    { left: "d.items()", right: "Key-value pairs" },
                    { left: "d.pop(key)", right: "Remove and return" },
                    { left: "d.update(other_dict)", right: "Merge dictionaries" },
                    { left: "key in d", right: "Check key exists" },
                    { left: "{k:v for k,v in items}", right: "Dict comprehension" },
                    { left: "defaultdict(int)", right: "Dict with default values" },
                    { left: "Counter(iterable)", right: "Frequency counter" },
                ]
            },
            {
                title: "String Methods",
                items: [
                    { left: "s.split(sep)", right: "Split into list" },
                    { left: "sep.join(lst)", right: "Join list to string" },
                    { left: "s.strip()", right: "Remove whitespace" },
                    { left: "s.lower() / s.upper()", right: "Case conversion" },
                    { left: "s.replace(old, new)", right: "Replace substring" },
                    { left: "s.find(sub) / s.index(sub)", right: "Find position" },
                    { left: "s.startswith(p) / s.endswith(p)", right: "Check prefix/suffix" },
                    { left: "s.isdigit() / s.isalpha()", right: "Check content" },
                    { left: "s.count(sub)", right: "Count occurrences" },
                    { left: "s.zfill(width)", right: "Zero-pad left" },
                ]
            },
            {
                title: "Common Patterns",
                items: [
                    { left: "for i, v in enumerate(lst):", right: "Index + value loop" },
                    { left: "for a, b in zip(l1, l2):", right: "Parallel loop" },
                    { left: "any(cond for x in lst)", right: "Any element matches" },
                    { left: "all(cond for x in lst)", right: "All elements match" },
                    { left: "min(lst, key=fn)", right: "Min by function" },
                    { left: "sorted(lst, key=fn, reverse=True)", right: "Custom sort" },
                    { left: "from collections import *", right: "Counter, deque, defaultdict" },
                    { left: "from itertools import *", right: "permutations, combinations" },
                    { left: "import heapq", right: "Min-heap operations" },
                    { left: "from functools import lru_cache", right: "Memoization decorator" },
                    { left: "sys.setrecursionlimit(10**6)", right: "Increase recursion limit" },
                    { left: "float('inf') / float('-inf')", right: "Infinity values" },
                ]
            },
        ]
    },
    bigO: {
        title: "Big-O Cheatsheet",
        icon: "fas fa-tachometer-alt",
        color: "#ef4444",
        sections: [
            {
                title: "Complexity Ranking (Best → Worst)",
                items: [
                    { left: "O(1)", right: "Constant — Array access, hash lookup" },
                    { left: "O(log n)", right: "Logarithmic — Binary search" },
                    { left: "O(√n)", right: "Square root — Prime check" },
                    { left: "O(n)", right: "Linear — Single loop, linear search" },
                    { left: "O(n log n)", right: "Linearithmic — Merge sort, efficient sort" },
                    { left: "O(n²)", right: "Quadratic — Nested loops, bubble sort" },
                    { left: "O(n³)", right: "Cubic — Triple nested loops" },
                    { left: "O(2^n)", right: "Exponential — Subsets, recursive fib" },
                    { left: "O(n!)", right: "Factorial — Permutations" },
                ]
            },
            {
                title: "Data Structure Operations",
                items: [
                    { left: "Array access", right: "O(1)" },
                    { left: "Array search", right: "O(n)" },
                    { left: "Array insert/delete", right: "O(n)" },
                    { left: "Hash map get/set", right: "O(1) average" },
                    { left: "BST operations", right: "O(log n) balanced" },
                    { left: "Heap insert/extract", right: "O(log n)" },
                    { left: "Stack/Queue push/pop", right: "O(1)" },
                    { left: "Trie operations", right: "O(m) where m = key length" },
                ]
            },
            {
                title: "Sorting Algorithms",
                items: [
                    { left: "Bubble Sort", right: "O(n²) worst, O(n) best" },
                    { left: "Selection Sort", right: "O(n²) always" },
                    { left: "Insertion Sort", right: "O(n²) worst, O(n) best" },
                    { left: "Merge Sort", right: "O(n log n) always, O(n) space" },
                    { left: "Quick Sort", right: "O(n log n) avg, O(n²) worst" },
                    { left: "Heap Sort", right: "O(n log n) always, O(1) space" },
                    { left: "Counting Sort", right: "O(n + k)" },
                    { left: "Radix Sort", right: "O(d × (n + k))" },
                ]
            },
            {
                title: "Graph Algorithms",
                items: [
                    { left: "BFS / DFS", right: "O(V + E)" },
                    { left: "Dijkstra (min-heap)", right: "O((V + E) log V)" },
                    { left: "Bellman-Ford", right: "O(V × E)" },
                    { left: "Floyd-Warshall", right: "O(V³)" },
                    { left: "Topological Sort", right: "O(V + E)" },
                    { left: "Kruskal's MST", right: "O(E log E)" },
                    { left: "Prim's MST", right: "O(E log V)" },
                    { left: "Union-Find", right: "O(α(n)) ≈ O(1)" },
                ]
            },
            {
                title: "Quick Rules",
                items: [
                    { left: "n ≤ 10", right: "O(n!) ok" },
                    { left: "n ≤ 20", right: "O(2^n) ok" },
                    { left: "n ≤ 500", right: "O(n³) ok" },
                    { left: "n ≤ 5,000", right: "O(n²) ok" },
                    { left: "n ≤ 10^6", right: "O(n log n) needed" },
                    { left: "n ≤ 10^8", right: "O(n) needed" },
                    { left: "n > 10^8", right: "O(log n) or O(1) needed" },
                ]
            },
        ]
    },
    regex: {
        title: "Regex Cheatsheet",
        icon: "fas fa-asterisk",
        color: "#a855f7",
        sections: [
            {
                title: "Basic Patterns",
                items: [
                    { left: ".", right: "Any character except newline" },
                    { left: "\\d / \\D", right: "Digit / Non-digit" },
                    { left: "\\w / \\W", right: "Word char [a-zA-Z0-9_] / Non-word" },
                    { left: "\\s / \\S", right: "Whitespace / Non-whitespace" },
                    { left: "\\b", right: "Word boundary" },
                    { left: "^", right: "Start of string/line" },
                    { left: "$", right: "End of string/line" },
                ]
            },
            {
                title: "Quantifiers",
                items: [
                    { left: "*", right: "0 or more" },
                    { left: "+", right: "1 or more" },
                    { left: "?", right: "0 or 1 (optional)" },
                    { left: "{n}", right: "Exactly n times" },
                    { left: "{n,m}", right: "Between n and m times" },
                    { left: "{n,}", right: "n or more times" },
                    { left: "*? / +?", right: "Non-greedy (lazy)" },
                ]
            },
            {
                title: "Groups & Alternation",
                items: [
                    { left: "(abc)", right: "Capture group" },
                    { left: "(?:abc)", right: "Non-capturing group" },
                    { left: "a|b", right: "Alternation (a or b)" },
                    { left: "[abc]", right: "Character class (a, b, or c)" },
                    { left: "[^abc]", right: "Negated class (not a, b, c)" },
                    { left: "[a-z]", right: "Range" },
                    { left: "\\1", right: "Backreference to group 1" },
                ]
            },
            {
                title: "Common Patterns",
                items: [
                    { left: "^\\d+$", right: "All digits" },
                    { left: "^[a-zA-Z]+$", right: "All letters" },
                    { left: "\\b\\w+@\\w+\\.\\w+\\b", right: "Simple email" },
                    { left: "^https?://", right: "URL start" },
                    { left: "\\d{3}-\\d{3}-\\d{4}", right: "Phone number (US)" },
                    { left: "\\d{4}-\\d{2}-\\d{2}", right: "Date (YYYY-MM-DD)" },
                    { left: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])", right: "Password validation" },
                ]
            },
        ]
    },
};

// ===== RENDER =====
function renderCheatsheets() {
    const container = document.getElementById('cheatsheets-content');
    if (!container) return;

    container.innerHTML = Object.entries(CHEATSHEETS).map(([key, sheet]) => `
        <div class="cheatsheet-section" id="cs-${key}">
            <div class="cheatsheet-header" onclick="this.parentElement.classList.toggle('open')">
                <h3><i class="${sheet.icon}" style="color:${sheet.color}"></i> ${sheet.title}</h3>
                <i class="fas fa-chevron-down chevron"></i>
            </div>
            <div class="cheatsheet-body">
                ${sheet.sections.map(section => `
                    <h4 style="margin:12px 0 8px;font-size:0.9rem;color:var(--accent-3);">${section.title}</h4>
                    ${section.items.map(item => `
                        <div class="cheatsheet-item">
                            <span class="cheatsheet-cmd">${escapeHtml(item.left)}</span>
                            <span class="cheatsheet-desc">${escapeHtml(item.right)}</span>
                        </div>
                    `).join('')}
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ===== INIT =====
const _origSwitchCS = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchCS) {
    const origSwCS = switchTab;
    switchTab = function(tabName) {
        origSwCS(tabName);
        if (tabName === 'cheatsheets') {
            document.getElementById('topbar-title').textContent = 'Cheatsheets';
            renderCheatsheets();
        }
    };
}
