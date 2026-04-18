/* ============================================
   COMPETITIVE CODING TIMER MODULE
   Contest simulation, problem timer,
   speed tracking, difficulty progression,
   virtual contests
   ============================================ */

// ===== CONTEST SIMULATOR =====
const CONTEST_TYPES = {
    easy_sprint: {
        name: "Easy Sprint",
        icon: "🏃",
        description: "5 easy problems in 30 minutes",
        problems: 5,
        difficulty: "easy",
        timeMinutes: 30,
        xpReward: 100,
    },
    medium_challenge: {
        name: "Medium Challenge",
        icon: "🏋️",
        description: "3 medium problems in 45 minutes",
        problems: 3,
        difficulty: "medium",
        timeMinutes: 45,
        xpReward: 200,
    },
    hard_battle: {
        name: "Hard Battle",
        icon: "⚔️",
        description: "2 hard problems in 60 minutes",
        problems: 2,
        difficulty: "hard",
        timeMinutes: 60,
        xpReward: 400,
    },
    mixed_contest: {
        name: "Mixed Contest",
        icon: "🎯",
        description: "2 easy + 2 medium + 1 hard in 90 min",
        problems: 5,
        difficulty: "mixed",
        timeMinutes: 90,
        xpReward: 350,
    },
    speed_round: {
        name: "Speed Round",
        icon: "⚡",
        description: "10 easy problems in 20 minutes",
        problems: 10,
        difficulty: "easy",
        timeMinutes: 20,
        xpReward: 150,
    },
    mock_interview_coding: {
        name: "Mock Interview",
        icon: "💼",
        description: "2 medium problems in 45 min (interview style)",
        problems: 2,
        difficulty: "medium",
        timeMinutes: 45,
        xpReward: 250,
    },
};

// ===== PROBLEM SETS FOR CONTESTS =====
const CONTEST_PROBLEMS = {
    easy: [
        { id: "e1", title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", hints: ["Use a hash map", "O(n) solution exists"] },
        { id: "e2", title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", hints: ["Use a stack", "Match opening with closing"] },
        { id: "e3", title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", hints: ["Use dummy node", "Compare heads"] },
        { id: "e4", title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", hints: ["Track min price", "Calculate max profit"] },
        { id: "e5", title: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/", hints: ["Count characters", "Compare frequency maps"] },
        { id: "e6", title: "Contains Duplicate", link: "https://leetcode.com/problems/contains-duplicate/", hints: ["Use a set", "O(n) with hash set"] },
        { id: "e7", title: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/", hints: ["Kadane's algorithm", "Track current and global max"] },
        { id: "e8", title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", hints: ["Like Fibonacci", "dp[i] = dp[i-1] + dp[i-2]"] },
        { id: "e9", title: "Binary Search", link: "https://leetcode.com/problems/binary-search/", hints: ["lo, hi, mid", "Compare and narrow range"] },
        { id: "e10", title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", hints: ["Use prev, curr, next pointers", "Or recursive approach"] },
        { id: "e11", title: "Invert Binary Tree", link: "https://leetcode.com/problems/invert-binary-tree/", hints: ["Swap left and right", "Recursive or BFS"] },
        { id: "e12", title: "Palindrome Number", link: "https://leetcode.com/problems/palindrome-number/", hints: ["Reverse the number", "Or compare digits from both ends"] },
        { id: "e13", title: "Roman to Integer", link: "https://leetcode.com/problems/roman-to-integer/", hints: ["Map symbols to values", "Subtract when smaller precedes larger"] },
        { id: "e14", title: "Linked List Cycle", link: "https://leetcode.com/problems/linked-list-cycle/", hints: ["Floyd's algorithm", "Slow and fast pointer"] },
        { id: "e15", title: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", hints: ["Recursive: 1 + max(left, right)", "Or BFS level count"] },
    ],
    medium: [
        { id: "m1", title: "3Sum", link: "https://leetcode.com/problems/3sum/", hints: ["Sort + Two Pointers", "Skip duplicates"] },
        { id: "m2", title: "Longest Substring Without Repeating", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", hints: ["Sliding window", "Hash set for characters"] },
        { id: "m3", title: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/", hints: ["Process digit by digit", "Handle carry"] },
        { id: "m4", title: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/", hints: ["Two pointers from ends", "Move the shorter line"] },
        { id: "m5", title: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/", hints: ["DFS/BFS from each '1'", "Mark visited"] },
        { id: "m6", title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/", hints: ["Sort each string as key", "Group by sorted string"] },
        { id: "m7", title: "Coin Change", link: "https://leetcode.com/problems/coin-change/", hints: ["DP bottom-up", "dp[i] = min coins for amount i"] },
        { id: "m8", title: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/", hints: ["Left pass and right pass", "No division allowed"] },
        { id: "m9", title: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", hints: ["Modified binary search", "Determine which half is sorted"] },
        { id: "m10", title: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/", hints: ["Topological sort", "Detect cycle in directed graph"] },
    ],
    hard: [
        { id: "h1", title: "Merge K Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", hints: ["Min-heap", "Or divide and conquer merge"] },
        { id: "h2", title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", hints: ["Two pointers", "Or monotonic stack"] },
        { id: "h3", title: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", hints: ["Binary search on smaller array", "Find partition point"] },
        { id: "h4", title: "Largest Rectangle in Histogram", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", hints: ["Monotonic stack", "Find left and right bounds"] },
        { id: "h5", title: "Word Ladder", link: "https://leetcode.com/problems/word-ladder/", hints: ["BFS", "Try changing one letter at a time"] },
    ],
};

let contestState = {
    active: false,
    type: null,
    problems: [],
    solved: [],
    startTime: null,
    timeLimit: 0,
    timerInterval: null,
    currentProblem: 0,
};

function startContest(typeKey) {
    const type = CONTEST_TYPES[typeKey];
    if (!type) return;

    // Select problems
    let problems = [];
    if (type.difficulty === 'mixed') {
        problems = [
            ...shuffleContestArr(CONTEST_PROBLEMS.easy).slice(0, 2),
            ...shuffleContestArr(CONTEST_PROBLEMS.medium).slice(0, 2),
            ...shuffleContestArr(CONTEST_PROBLEMS.hard).slice(0, 1),
        ];
    } else {
        const pool = CONTEST_PROBLEMS[type.difficulty] || CONTEST_PROBLEMS.easy;
        problems = shuffleContestArr(pool).slice(0, type.problems);
    }

    contestState = {
        active: true,
        type,
        typeKey,
        problems,
        solved: new Array(problems.length).fill(false),
        startTime: Date.now(),
        timeLimit: type.timeMinutes * 60,
        timerInterval: null,
        currentProblem: 0,
    };

    document.getElementById('contest-menu').style.display = 'none';
    document.getElementById('contest-active').style.display = 'block';
    document.getElementById('contest-results').style.display = 'none';

    renderContestView();
    startContestTimer();
}

function renderContestView() {
    const container = document.getElementById('contest-problems');
    if (!container || !contestState.active) return;

    const { problems, solved, type } = contestState;

    container.innerHTML = `
        <div class="contest-header-info">
            <span>${type.icon} ${type.name}</span>
            <span>${solved.filter(Boolean).length} / ${problems.length} solved</span>
        </div>
        ${problems.map((p, i) => {
            const isSolved = solved[i];
            const diffColor = type.difficulty === 'mixed' ?
                (i < 2 ? '#10b981' : i < 4 ? '#f59e0b' : '#ef4444') :
                ({ easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' }[type.difficulty] || '#6366f1');
            return `
                <div class="contest-problem ${isSolved ? 'solved' : ''}" onclick="toggleContestProblem(${i})">
                    <div class="contest-problem-num" style="background:${diffColor}">${i + 1}</div>
                    <div class="contest-problem-info">
                        <h4>${p.title}</h4>
                        <a href="${p.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Open on LeetCode →</a>
                    </div>
                    <div class="contest-problem-status">
                        ${isSolved ?
                            '<i class="fas fa-check-circle" style="color:var(--success);font-size:1.5rem;"></i>' :
                            '<i class="fas fa-circle" style="color:var(--glass-border);font-size:1.5rem;"></i>'
                        }
                    </div>
                </div>
                ${!isSolved ? `
                    <div class="contest-hints" id="hints-${i}" style="display:none;">
                        ${p.hints.map((h, hi) => `
                            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();this.textContent='💡 ${escapeHtml(h)}';this.disabled=true;">
                                Hint ${hi + 1}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            `;
        }).join('')}
    `;
}

function toggleContestProblem(index) {
    contestState.solved[index] = !contestState.solved[index];
    renderContestView();

    if (contestState.solved.every(Boolean)) {
        finishContest();
    }
}

function startContestTimer() {
    clearInterval(contestState.timerInterval);
    contestState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - contestState.startTime) / 1000);
        const remaining = Math.max(0, contestState.timeLimit - elapsed);
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        const display = document.getElementById('contest-timer');
        if (display) {
            display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            display.style.color = remaining <= 60 ? '#ef4444' : remaining <= 300 ? '#f59e0b' : '#22d3ee';
        }
        if (remaining <= 0) finishContest();
    }, 1000);
}

function finishContest() {
    clearInterval(contestState.timerInterval);
    contestState.active = false;

    const elapsed = Math.floor((Date.now() - contestState.startTime) / 1000);
    const solved = contestState.solved.filter(Boolean).length;
    const total = contestState.problems.length;
    const pct = Math.round((solved / total) * 100);

    // Save to history
    const data = getChallengeData();
    if (data) {
        if (!data.contestHistory) data.contestHistory = [];
        data.contestHistory.push({
            type: contestState.typeKey,
            name: contestState.type.name,
            solved, total, pct,
            duration: elapsed,
            date: new Date().toISOString(),
        });
        if (data.contestHistory.length > 50) data.contestHistory = data.contestHistory.slice(-50);
        saveChallengeData(data);

        if (typeof awardXP === 'function' && solved > 0) {
            const xp = Math.round(contestState.type.xpReward * (solved / total));
            awardXP(xp, `Contest: ${contestState.type.name} (${solved}/${total})`);
        }
    }

    // Show results
    document.getElementById('contest-active').style.display = 'none';
    document.getElementById('contest-results').style.display = 'block';

    const resultIcon = pct >= 80 ? '🏆' : pct >= 50 ? '🎯' : pct > 0 ? '💪' : '📚';
    document.getElementById('contest-result-content').innerHTML = `
        <div class="contest-result-icon">${resultIcon}</div>
        <h2>Contest ${pct === 100 ? 'Aced!' : 'Complete!'}</h2>
        <div class="contest-result-stats">
            <div class="contest-result-stat"><span class="val">${solved}/${total}</span><span class="lbl">Solved</span></div>
            <div class="contest-result-stat"><span class="val">${Math.floor(elapsed / 60)}m ${elapsed % 60}s</span><span class="lbl">Time</span></div>
            <div class="contest-result-stat"><span class="val">${pct}%</span><span class="lbl">Score</span></div>
        </div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
            <button class="btn btn-primary" onclick="startContest('${contestState.typeKey}')"><i class="fas fa-redo"></i> Retry</button>
            <button class="btn btn-outline" onclick="showContestMenu()"><i class="fas fa-list"></i> All Contests</button>
        </div>
    `;

    if (pct === 100 && typeof launchConfetti === 'function') launchConfetti();
}

function endContest() {
    if (confirm('End contest early? Your progress will be scored.')) finishContest();
}

function showContestMenu() {
    document.getElementById('contest-active').style.display = 'none';
    document.getElementById('contest-results').style.display = 'none';
    document.getElementById('contest-menu').style.display = 'block';
    renderContestHistory();
}

function renderContestTypes() {
    const container = document.getElementById('contest-types');
    if (!container) return;

    container.innerHTML = Object.entries(CONTEST_TYPES).map(([key, type]) => `
        <div class="contest-type-card" onclick="startContest('${key}')">
            <span class="contest-type-icon">${type.icon}</span>
            <h4>${type.name}</h4>
            <p>${type.description}</p>
            <span class="contest-type-reward">+${type.xpReward} XP</span>
        </div>
    `).join('');
}

function renderContestHistory() {
    const container = document.getElementById('contest-history');
    if (!container) return;

    const data = getChallengeData();
    const history = (data?.contestHistory || []).slice().reverse().slice(0, 15);

    if (history.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No contests yet. Try one!</p>';
        return;
    }

    container.innerHTML = history.map(h => {
        const date = new Date(h.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
        const cls = h.pct >= 80 ? 'good' : h.pct >= 50 ? 'ok' : 'bad';
        return `
            <div class="quiz-history-item">
                <span>${h.name}</span>
                <span style="color:var(--text-muted);font-size:0.8rem;">${date} • ${Math.floor(h.duration / 60)}m</span>
                <span class="quiz-history-score ${cls}">${h.solved}/${h.total}</span>
            </div>
        `;
    }).join('');
}

// ===== PROBLEM SPEED TRACKER =====
let speedTimerState = { active: false, start: null, problem: '', timer: null };

function startProblemTimer() {
    const problem = document.getElementById('speed-problem-name')?.value.trim();
    if (!problem) { showToast('Enter problem name first', 'error'); return; }

    speedTimerState = { active: true, start: Date.now(), problem, timer: null };

    document.getElementById('speed-timer-active').style.display = 'block';
    document.getElementById('speed-start-btn').style.display = 'none';
    document.getElementById('speed-problem-title').textContent = problem;

    speedTimerState.timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - speedTimerState.start) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        document.getElementById('speed-timer-display').textContent =
            `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

function stopProblemTimer(solved) {
    clearInterval(speedTimerState.timer);
    speedTimerState.active = false;

    const elapsed = Math.floor((Date.now() - speedTimerState.start) / 1000);

    document.getElementById('speed-timer-active').style.display = 'none';
    document.getElementById('speed-start-btn').style.display = '';

    const data = getChallengeData();
    if (data) {
        if (!data.speedHistory) data.speedHistory = [];
        data.speedHistory.push({
            problem: speedTimerState.problem,
            duration: elapsed,
            solved,
            date: new Date().toISOString(),
        });
        if (data.speedHistory.length > 100) data.speedHistory = data.speedHistory.slice(-100);
        saveChallengeData(data);
    }

    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    showToast(`${solved ? '✅' : '❌'} ${speedTimerState.problem}: ${mins}m ${secs}s`, solved ? 'success' : 'info');

    if (solved && typeof awardXP === 'function') {
        awardXP(Math.max(5, 30 - Math.floor(elapsed / 60)), `Solved: ${speedTimerState.problem}`);
    }

    document.getElementById('speed-problem-name').value = '';
    renderSpeedHistory();
}

function renderSpeedHistory() {
    const container = document.getElementById('speed-history');
    if (!container) return;

    const data = getChallengeData();
    const history = (data?.speedHistory || []).slice().reverse().slice(0, 20);

    if (history.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No problems timed yet.</p>';
        return;
    }

    // Stats
    const solved = history.filter(h => h.solved);
    const avgTime = solved.length > 0 ? Math.round(solved.reduce((s, h) => s + h.duration, 0) / solved.length) : 0;

    container.innerHTML = `
        <div style="display:flex;gap:16px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Solved: <strong style="color:var(--success);">${solved.length}</strong></span>
            <span style="font-size:0.85rem;color:var(--text-muted);">Avg Time: <strong style="color:var(--accent-1);">${Math.floor(avgTime/60)}m ${avgTime%60}s</strong></span>
        </div>
        ${history.map(h => {
            const mins = Math.floor(h.duration / 60);
            const secs = h.duration % 60;
            return `
                <div class="speed-history-item">
                    <span>${h.solved ? '✅' : '❌'} ${escapeHtml(h.problem)}</span>
                    <span class="speed-time">${mins}m ${secs}s</span>
                </div>
            `;
        }).join('')}
    `;
}

function shuffleContestArr(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ===== INIT =====
const _origSwitchContest = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchContest) {
    const origSwCon = switchTab;
    switchTab = function(tabName) {
        origSwCon(tabName);
        if (tabName === 'contests') {
            document.getElementById('topbar-title').textContent = 'Competitive Coding';
            renderContestTypes();
            renderContestHistory();
            renderSpeedHistory();
        }
    };
}
