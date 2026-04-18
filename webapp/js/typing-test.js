/* ============================================
   TYPING SPEED TEST MODULE
   Coding-focused typing practice with
   C++, Python, and DSA code snippets.
   WPM tracking, accuracy, history, leaderboard
   ============================================ */

const TYPING_SNIPPETS = {
    cpp: [
        { title: "Binary Search", code: "int binarySearch(vector<int>& arr, int target) {\n    int lo = 0, hi = arr.size() - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}" },
        { title: "Two Sum", code: "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (seen.count(complement)) {\n            return {seen[complement], i};\n        }\n        seen[nums[i]] = i;\n    }\n    return {};\n}" },
        { title: "Reverse Linked List", code: "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}" },
        { title: "Max Depth of Tree", code: "int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    int left = maxDepth(root->left);\n    int right = maxDepth(root->right);\n    return 1 + max(left, right);\n}" },
        { title: "Merge Sort", code: "void merge(vector<int>& arr, int l, int m, int r) {\n    vector<int> temp;\n    int i = l, j = m + 1;\n    while (i <= m && j <= r) {\n        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);\n        else temp.push_back(arr[j++]);\n    }\n    while (i <= m) temp.push_back(arr[i++]);\n    while (j <= r) temp.push_back(arr[j++]);\n    for (int k = 0; k < temp.size(); k++)\n        arr[l + k] = temp[k];\n}" },
        { title: "Valid Parentheses", code: "bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[')\n            st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top(); st.pop();\n            if (c == ')' && top != '(') return false;\n            if (c == '}' && top != '{') return false;\n            if (c == ']' && top != '[') return false;\n        }\n    }\n    return st.empty();\n}" },
        { title: "BFS Graph", code: "vector<int> bfs(int start, vector<vector<int>>& adj) {\n    vector<int> result;\n    vector<bool> visited(adj.size(), false);\n    queue<int> q;\n    visited[start] = true;\n    q.push(start);\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        result.push_back(node);\n        for (int neighbor : adj[node]) {\n            if (!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n    return result;\n}" },
        { title: "Fibonacci DP", code: "int fibonacci(int n) {\n    if (n <= 1) return n;\n    int a = 0, b = 1;\n    for (int i = 2; i <= n; i++) {\n        int c = a + b;\n        a = b;\n        b = c;\n    }\n    return b;\n}" },
    ],
    python: [
        { title: "Binary Search", code: "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1" },
        { title: "Two Sum", code: "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []" },
        { title: "Reverse Linked List", code: "def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n    return prev" },
        { title: "BFS Graph", code: "from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    result = []\n    while queue:\n        node = queue.popleft()\n        result.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return result" },
        { title: "Merge Sort", code: "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result" },
        { title: "Number of Islands", code: "def num_islands(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    count = 0\n\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols:\n            return\n        if grid[r][c] != '1':\n            return\n        grid[r][c] = '0'\n        dfs(r+1, c)\n        dfs(r-1, c)\n        dfs(r, c+1)\n        dfs(r, c-1)\n\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                dfs(r, c)\n                count += 1\n    return count" },
        { title: "Coin Change DP", code: "def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1" },
        { title: "LRU Cache", code: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n\n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)" },
    ],
};

let typingState = {
    active: false,
    snippet: null,
    targetText: '',
    typedText: '',
    startTime: null,
    endTime: null,
    errors: 0,
    totalKeystrokes: 0,
    currentIndex: 0,
    timer: null,
    elapsed: 0,
    wpm: 0,
    accuracy: 100,
    lang: 'python',
};

function startTypingTest(lang) {
    const snippets = TYPING_SNIPPETS[lang || 'python'];
    if (!snippets || snippets.length === 0) return;

    const snippet = snippets[Math.floor(Math.random() * snippets.length)];
    typingState = {
        active: true,
        snippet,
        targetText: snippet.code,
        typedText: '',
        startTime: null,
        endTime: null,
        errors: 0,
        totalKeystrokes: 0,
        currentIndex: 0,
        timer: null,
        elapsed: 0,
        wpm: 0,
        accuracy: 100,
        lang: lang || 'python',
    };

    document.getElementById('typing-menu').style.display = 'none';
    document.getElementById('typing-active').style.display = 'block';
    document.getElementById('typing-results').style.display = 'none';
    document.getElementById('typing-title').textContent = snippet.title;
    document.getElementById('typing-lang').textContent = lang.toUpperCase();

    renderTypingTarget();
    document.getElementById('typing-input').value = '';
    document.getElementById('typing-input').focus();

    document.getElementById('typing-wpm').textContent = '0';
    document.getElementById('typing-accuracy').textContent = '100%';
    document.getElementById('typing-time').textContent = '0:00';
    document.getElementById('typing-errors').textContent = '0';
}

function renderTypingTarget() {
    const container = document.getElementById('typing-target');
    if (!container) return;

    const target = typingState.targetText;
    const typed = typingState.typedText;

    let html = '';
    for (let i = 0; i < target.length; i++) {
        const char = target[i] === '\n' ? '↵\n' : target[i];
        let cls = 'typing-char';
        if (i < typed.length) {
            cls += typed[i] === target[i] ? ' correct' : ' incorrect';
        } else if (i === typed.length) {
            cls += ' current';
        }
        html += `<span class="${cls}">${escapeHtml(char)}</span>`;
    }

    container.innerHTML = html;

    // Auto-scroll
    const currentEl = container.querySelector('.current');
    if (currentEl) {
        currentEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
}

function handleTypingInput(e) {
    if (!typingState.active) return;

    const inputEl = document.getElementById('typing-input');
    const typed = inputEl.value;

    // Start timer on first keystroke
    if (!typingState.startTime && typed.length > 0) {
        typingState.startTime = Date.now();
        typingState.timer = setInterval(updateTypingTimer, 100);
    }

    typingState.typedText = typed;
    typingState.totalKeystrokes++;

    // Count errors
    let errors = 0;
    for (let i = 0; i < typed.length; i++) {
        if (i >= typingState.targetText.length || typed[i] !== typingState.targetText[i]) {
            errors++;
        }
    }
    typingState.errors = errors;

    // Calculate WPM and accuracy
    const elapsed = typingState.startTime ? (Date.now() - typingState.startTime) / 1000 / 60 : 0;
    const words = typed.length / 5;
    typingState.wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
    typingState.accuracy = typed.length > 0 ? Math.round(((typed.length - errors) / typed.length) * 100) : 100;

    document.getElementById('typing-wpm').textContent = typingState.wpm;
    document.getElementById('typing-accuracy').textContent = typingState.accuracy + '%';
    document.getElementById('typing-errors').textContent = errors;

    renderTypingTarget();

    // Check if complete
    if (typed.length >= typingState.targetText.length) {
        finishTypingTest();
    }
}

function updateTypingTimer() {
    if (!typingState.startTime) return;
    const elapsed = Math.floor((Date.now() - typingState.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    document.getElementById('typing-time').textContent = `${mins}:${String(secs).padStart(2, '0')}`;
    typingState.elapsed = elapsed;
}

function finishTypingTest() {
    typingState.active = false;
    typingState.endTime = Date.now();
    clearInterval(typingState.timer);

    const elapsed = (typingState.endTime - typingState.startTime) / 1000;
    const words = typingState.targetText.length / 5;
    const wpm = Math.round(words / (elapsed / 60));
    const netWpm = Math.max(0, Math.round((words - typingState.errors) / (elapsed / 60)));

    document.getElementById('typing-active').style.display = 'none';
    document.getElementById('typing-results').style.display = 'block';

    const resultIcon = netWpm >= 60 ? '🚀' : netWpm >= 40 ? '⚡' : netWpm >= 20 ? '💪' : '🌱';

    document.getElementById('typing-result-content').innerHTML = `
        <div class="typing-result-icon">${resultIcon}</div>
        <h2>${netWpm >= 60 ? 'Speed Demon!' : netWpm >= 40 ? 'Great Speed!' : netWpm >= 20 ? 'Keep Practicing!' : 'Getting Started!'}</h2>
        <div class="typing-result-stats">
            <div class="typing-result-stat">
                <span class="val">${wpm}</span><span class="lbl">Gross WPM</span>
            </div>
            <div class="typing-result-stat">
                <span class="val" style="color:var(--success);">${netWpm}</span><span class="lbl">Net WPM</span>
            </div>
            <div class="typing-result-stat">
                <span class="val">${typingState.accuracy}%</span><span class="lbl">Accuracy</span>
            </div>
            <div class="typing-result-stat">
                <span class="val">${Math.floor(elapsed)}s</span><span class="lbl">Time</span>
            </div>
            <div class="typing-result-stat">
                <span class="val">${typingState.errors}</span><span class="lbl">Errors</span>
            </div>
            <div class="typing-result-stat">
                <span class="val">${typingState.targetText.length}</span><span class="lbl">Characters</span>
            </div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
            <button class="btn btn-primary" onclick="startTypingTest('${typingState.lang}')"><i class="fas fa-redo"></i> Try Again</button>
            <button class="btn btn-outline" onclick="showTypingMenu()"><i class="fas fa-list"></i> All Tests</button>
        </div>
    `;

    // Save history
    const data = getChallengeData();
    if (data) {
        if (!data.typingHistory) data.typingHistory = [];
        data.typingHistory.push({
            lang: typingState.lang,
            snippet: typingState.snippet.title,
            wpm,
            netWpm,
            accuracy: typingState.accuracy,
            time: Math.floor(elapsed),
            errors: typingState.errors,
            date: new Date().toISOString(),
        });
        if (data.typingHistory.length > 50) data.typingHistory = data.typingHistory.slice(-50);
        saveChallengeData(data);

        if (typeof awardXP === 'function') awardXP(Math.min(netWpm, 50), `Typing: ${netWpm} WPM`);
    }

    renderTypingHistory();
    if (netWpm >= 60 && typeof launchConfetti === 'function') launchConfetti();
}

function skipTypingTest() {
    typingState.active = false;
    clearInterval(typingState.timer);
    showTypingMenu();
}

function showTypingMenu() {
    document.getElementById('typing-active').style.display = 'none';
    document.getElementById('typing-results').style.display = 'none';
    document.getElementById('typing-menu').style.display = 'block';
    renderTypingHistory();
    renderTypingStats();
}

function renderTypingHistory() {
    const container = document.getElementById('typing-history');
    if (!container) return;

    const data = getChallengeData();
    const history = (data?.typingHistory || []).slice().reverse().slice(0, 15);

    if (history.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No typing tests yet.</p>';
        return;
    }

    container.innerHTML = history.map(h => {
        const date = new Date(h.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
        const cls = h.netWpm >= 60 ? 'good' : h.netWpm >= 30 ? 'ok' : 'bad';
        return `
            <div class="quiz-history-item">
                <span>${h.snippet} (${h.lang})</span>
                <span style="color:var(--text-muted);font-size:0.8rem;">${date} • ${h.accuracy}%</span>
                <span class="quiz-history-score ${cls}">${h.netWpm} WPM</span>
            </div>
        `;
    }).join('');
}

function renderTypingStats() {
    const container = document.getElementById('typing-stats');
    if (!container) return;

    const data = getChallengeData();
    const history = data?.typingHistory || [];

    if (history.length === 0) {
        container.innerHTML = '';
        return;
    }

    const avgWpm = Math.round(history.reduce((s, h) => s + h.netWpm, 0) / history.length);
    const bestWpm = Math.max(...history.map(h => h.netWpm));
    const avgAccuracy = Math.round(history.reduce((s, h) => s + h.accuracy, 0) / history.length);
    const totalTests = history.length;

    container.innerHTML = `
        <div class="typing-stats-grid">
            <div class="typing-stat-card"><span class="val">${avgWpm}</span><span class="lbl">Avg WPM</span></div>
            <div class="typing-stat-card"><span class="val" style="color:var(--success);">${bestWpm}</span><span class="lbl">Best WPM</span></div>
            <div class="typing-stat-card"><span class="val">${avgAccuracy}%</span><span class="lbl">Avg Accuracy</span></div>
            <div class="typing-stat-card"><span class="val">${totalTests}</span><span class="lbl">Tests Taken</span></div>
        </div>
    `;
}

// ===== INIT =====
const _origSwitchTyping = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchTyping) {
    const origSwTyp = switchTab;
    switchTab = function(tabName) {
        origSwTyp(tabName);
        if (tabName === 'typing') {
            document.getElementById('topbar-title').textContent = 'Typing Speed Test';
            showTypingMenu();
        }
    };
}
