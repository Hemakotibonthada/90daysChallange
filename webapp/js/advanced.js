/* ============================================
   ADVANCED FEATURES MODULE
   Code Editor, Flashcards, Quizzes, Calendar,
   Resources, Habits, Whiteboard
   ============================================ */

// ===== CODE EDITOR =====
let savedSnippets = [];

function updateLineNumbers() {
    const editor = document.getElementById('code-editor');
    const lineNums = document.getElementById('line-numbers');
    if (!editor || !lineNums) return;
    const lines = editor.value.split('\n').length;
    lineNums.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}

function syncScroll() {
    const editor = document.getElementById('code-editor');
    const lineNums = document.getElementById('line-numbers');
    if (editor && lineNums) lineNums.scrollTop = editor.scrollTop;
}

function changeEditorLang() {
    const lang = document.getElementById('editor-lang')?.value || 'cpp';
    const editor = document.getElementById('code-editor');
    if (!editor) return;

    const templates = {
        cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!" << endl;\n    return 0;\n}',
        python: '# Python 3\n\ndef main():\n    print("Hello World!")\n\nif __name__ == "__main__":\n    main()',
        javascript: '// JavaScript\n\nfunction main() {\n    console.log("Hello World!");\n}\n\nmain();'
    };

    if (!editor.value.trim()) {
        editor.value = templates[lang] || '';
        updateLineNumbers();
    }
}

function changeEditorTheme() {
    const theme = document.getElementById('editor-theme-select')?.value || 'dark';
    const container = document.querySelector('.editor-container');
    if (!container) return;
    container.className = 'editor-container';
    if (theme !== 'dark') container.classList.add(theme);
}

function runCode() {
    const code = document.getElementById('code-editor')?.value || '';
    const lang = document.getElementById('editor-lang')?.value || 'cpp';
    const output = document.getElementById('code-output');
    if (!output) return;

    if (!code.trim()) {
        output.textContent = '// No code to run';
        return;
    }

    // Simulate output (real execution would need a backend)
    if (lang === 'javascript') {
        try {
            const logs = [];
            const origLog = console.log;
            console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
            const fn = new Function(code);
            fn();
            console.log = origLog;
            output.textContent = logs.join('\n') || '// No output';
            output.style.color = '#a5b4fc';
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
            output.style.color = '#f87171';
        }
    } else {
        output.textContent = `// ${lang.toUpperCase()} execution requires a backend compiler.\n// Use an online compiler like:\n//   C++: https://www.onlinegdb.com/\n//   Python: https://replit.com/\n\n// Your code has been saved locally.`;
        output.style.color = '#fbbf24';
    }

    // Auto-save as snippet
    saveSnippetAuto(code, lang);
}

function saveSnippetAuto(code, lang) {
    const data = getChallengeData();
    if (!data) return;
    if (!data.snippets) data.snippets = [];

    const firstLine = code.split('\n').find(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('#')) || 'Untitled';
    const name = firstLine.trim().substring(0, 40);
    const now = new Date().toISOString();

    // Don't save duplicates
    if (data.snippets.length > 0 && data.snippets[data.snippets.length - 1].code === code) return;

    data.snippets.push({
        id: Date.now().toString(36),
        name,
        lang,
        code,
        createdAt: now
    });

    // Keep only last 50
    if (data.snippets.length > 50) data.snippets = data.snippets.slice(-50);

    saveChallengeData(data);
    renderSnippets();
}

function copyCode() {
    const code = document.getElementById('code-editor')?.value || '';
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
    });
}

function downloadCode() {
    const code = document.getElementById('code-editor')?.value || '';
    const lang = document.getElementById('editor-lang')?.value || 'cpp';
    const extensions = { cpp: 'cpp', python: 'py', javascript: 'js' };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code_${Date.now()}.${extensions[lang] || 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Code downloaded!', 'success');
}

function clearEditor() {
    const editor = document.getElementById('code-editor');
    if (editor) {
        editor.value = '';
        updateLineNumbers();
    }
    clearOutput();
}

function clearOutput() {
    const output = document.getElementById('code-output');
    if (output) {
        output.textContent = '// Output will appear here';
        output.style.color = '#a5b4fc';
    }
}

function loadSnippet(id) {
    const data = getChallengeData();
    if (!data || !data.snippets) return;
    const snippet = data.snippets.find(s => s.id === id);
    if (!snippet) return;

    const editor = document.getElementById('code-editor');
    const langSelect = document.getElementById('editor-lang');
    if (editor) editor.value = snippet.code;
    if (langSelect) langSelect.value = snippet.lang;
    updateLineNumbers();
    showToast('Snippet loaded!', 'info');
}

function deleteSnippet(id) {
    const data = getChallengeData();
    if (!data || !data.snippets) return;
    data.snippets = data.snippets.filter(s => s.id !== id);
    saveChallengeData(data);
    renderSnippets();
}

function renderSnippets() {
    const data = getChallengeData();
    const container = document.getElementById('saved-snippets');
    if (!container) return;
    const snippets = (data?.snippets || []).slice().reverse().slice(0, 20);

    if (snippets.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No saved snippets yet. Run code to auto-save.</p>';
        return;
    }

    container.innerHTML = snippets.map(s => {
        const date = new Date(s.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `
            <div class="snippet-card">
                <span class="snippet-lang ${s.lang}">${s.lang}</span>
                <div class="snippet-info">
                    <h4>${escapeHtml(s.name)}</h4>
                    <span>${date}</span>
                </div>
                <div style="display:flex;gap:4px;">
                    <button class="btn btn-ghost btn-sm" onclick="loadSnippet('${s.id}')" title="Load"><i class="fas fa-upload"></i></button>
                    <button class="btn btn-ghost btn-sm" onclick="deleteSnippet('${s.id}')" title="Delete"><i class="fas fa-trash" style="color:var(--danger)"></i></button>
                </div>
            </div>
        `;
    }).join('');
}

// Handle Tab key in editor
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('code-editor');
    if (editor) {
        editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 4;
                updateLineNumbers();
            }
        });
    }
});


// ===== FLASHCARDS =====
let fcDeck = [];
let fcIndex = 0;
let fcFlipped = false;

function loadFlashcardDeck() {
    const deckName = document.getElementById('fc-deck')?.value || 'cpp';
    const data = getChallengeData();

    if (deckName === 'custom') {
        fcDeck = data?.customFlashcards || [];
    } else {
        fcDeck = flashcardDecks[deckName] || [];
    }

    fcIndex = 0;
    fcFlipped = false;
    updateFlashcardDisplay();
    updateFCStats();
}

function flipCard() {
    fcFlipped = !fcFlipped;
    const card = document.getElementById('flashcard');
    if (card) card.classList.toggle('flipped', fcFlipped);
}

function updateFlashcardDisplay() {
    if (fcDeck.length === 0) {
        document.getElementById('fc-front-content').textContent = 'No cards in this deck';
        document.getElementById('fc-back-content').textContent = '—';
        document.getElementById('fc-current').textContent = '0';
        document.getElementById('fc-deck-total').textContent = '0';
        return;
    }

    const card = fcDeck[fcIndex];
    document.getElementById('fc-front-content').textContent = card.front;
    document.getElementById('fc-back-content').textContent = card.back;
    document.getElementById('fc-current').textContent = fcIndex + 1;
    document.getElementById('fc-deck-total').textContent = fcDeck.length;

    // Reset flip
    fcFlipped = false;
    const cardEl = document.getElementById('flashcard');
    if (cardEl) cardEl.classList.remove('flipped');
}

function fcRate(rating) {
    if (fcDeck.length === 0) return;

    const data = getChallengeData();
    if (!data) return;
    if (!data.fcProgress) data.fcProgress = {};

    const key = `${document.getElementById('fc-deck')?.value || 'cpp'}_${fcIndex}`;
    data.fcProgress[key] = rating;
    saveChallengeData(data);

    // Next card
    fcIndex = (fcIndex + 1) % fcDeck.length;
    updateFlashcardDisplay();
    updateFCStats();

    if (rating === 'easy') showToast('Nice! Card mastered!', 'success');
}

function updateFCStats() {
    const data = getChallengeData();
    const progress = data?.fcProgress || {};
    const deckName = document.getElementById('fc-deck')?.value || 'cpp';

    let known = 0, learning = 0, newCount = 0;
    for (let i = 0; i < fcDeck.length; i++) {
        const key = `${deckName}_${i}`;
        const rating = progress[key];
        if (rating === 'easy' || rating === 'good') known++;
        else if (rating === 'hard' || rating === 'again') learning++;
        else newCount++;
    }

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setVal('fc-total', fcDeck.length);
    setVal('fc-known', known);
    setVal('fc-learning-count', learning);
    setVal('fc-new-count', newCount);
}

function createFlashcard() {
    document.getElementById('fc-modal').classList.add('active');
}

function saveFlashcard() {
    const front = document.getElementById('fc-new-front')?.value.trim();
    const back = document.getElementById('fc-new-back')?.value.trim();

    if (!front || !back) {
        showToast('Please fill both sides', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    if (!data.customFlashcards) data.customFlashcards = [];
    data.customFlashcards.push({ front, back });
    saveChallengeData(data);

    document.getElementById('fc-new-front').value = '';
    document.getElementById('fc-new-back').value = '';
    document.getElementById('fc-modal').classList.remove('active');

    // Reload if on custom deck
    if (document.getElementById('fc-deck')?.value === 'custom') {
        loadFlashcardDeck();
    }

    showToast('Flashcard created!', 'success');
}


// ===== QUIZ SYSTEM =====
let currentQuiz = null;
let quizAnswers = [];
let quizCurrentQ = 0;
let quizTimerInterval = null;
let quizTimeLeft = 0;
let currentQuizId = '';

function startQuiz(quizId) {
    const quiz = quizData[quizId];
    if (!quiz) return;

    currentQuizId = quizId;
    currentQuiz = { ...quiz, questions: shuffleArray([...quiz.questions]) };
    quizAnswers = new Array(currentQuiz.questions.length).fill(-1);
    quizCurrentQ = 0;
    quizTimeLeft = quiz.timeMinutes * 60;

    document.getElementById('quiz-menu').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';

    document.getElementById('quiz-q-total').textContent = currentQuiz.questions.length;

    renderQuizQuestion();
    startQuizTimer();
}

function renderQuizQuestion() {
    if (!currentQuiz) return;

    const q = currentQuiz.questions[quizCurrentQ];
    document.getElementById('quiz-question').textContent = q.q;
    document.getElementById('quiz-q-num').textContent = quizCurrentQ + 1;

    const pct = ((quizCurrentQ + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${pct}%`;

    const optionsContainer = document.getElementById('quiz-options');
    const letters = ['A', 'B', 'C', 'D'];
    optionsContainer.innerHTML = q.options.map((opt, i) => {
        const selected = quizAnswers[quizCurrentQ] === i ? 'selected' : '';
        return `
            <div class="quiz-option ${selected}" onclick="selectQuizOption(${i})">
                <span class="quiz-option-letter">${letters[i]}</span>
                <span>${escapeHtml(opt)}</span>
            </div>
        `;
    }).join('');

    // Update nav buttons
    document.getElementById('quiz-prev-btn').disabled = quizCurrentQ === 0;
    const nextBtn = document.getElementById('quiz-next-btn');
    if (quizCurrentQ === currentQuiz.questions.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Finish';
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
    }
}

function selectQuizOption(index) {
    quizAnswers[quizCurrentQ] = index;
    renderQuizQuestion();
}

function quizNext() {
    if (quizCurrentQ < currentQuiz.questions.length - 1) {
        quizCurrentQ++;
        renderQuizQuestion();
    } else {
        finishQuiz();
    }
}

function quizPrev() {
    if (quizCurrentQ > 0) {
        quizCurrentQ--;
        renderQuizQuestion();
    }
}

function startQuizTimer() {
    clearInterval(quizTimerInterval);
    updateQuizTimerDisplay();

    quizTimerInterval = setInterval(() => {
        quizTimeLeft--;
        updateQuizTimerDisplay();

        if (quizTimeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
}

function updateQuizTimerDisplay() {
    const mins = Math.floor(quizTimeLeft / 60);
    const secs = quizTimeLeft % 60;
    const display = document.getElementById('quiz-timer-display');
    if (display) {
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        if (quizTimeLeft <= 30) display.style.color = '#ef4444';
        else if (quizTimeLeft <= 60) display.style.color = '#f59e0b';
        else display.style.color = '#22d3ee';
    }
}

function finishQuiz() {
    clearInterval(quizTimerInterval);

    let correct = 0;
    currentQuiz.questions.forEach((q, i) => {
        if (quizAnswers[i] === q.answer) correct++;
    });

    const total = currentQuiz.questions.length;
    const pct = Math.round((correct / total) * 100);

    // Save to history
    const data = getChallengeData();
    if (data) {
        if (!data.quizHistory) data.quizHistory = [];
        data.quizHistory.push({
            quizId: currentQuizId,
            title: currentQuiz.title,
            score: correct,
            total,
            pct,
            date: new Date().toISOString()
        });
        if (data.quizHistory.length > 50) data.quizHistory = data.quizHistory.slice(-50);
        saveChallengeData(data);
    }

    // Show results
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    document.getElementById('quiz-result-icon').textContent = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';
    document.getElementById('quiz-result-title').textContent = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Studying!' : 'Don\'t Give Up!';
    document.getElementById('quiz-score-percent').textContent = `${pct}%`;
    document.getElementById('quiz-result-detail').textContent = `You scored ${correct} out of ${total}`;

    // Animate score ring
    const ring = document.getElementById('quiz-score-ring');
    if (ring) {
        const offset = 326.7 - (pct / 100) * 326.7;
        setTimeout(() => {
            ring.style.strokeDashoffset = offset;
            ring.style.stroke = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444';
        }, 300);
    }

    if (pct >= 80) launchConfetti();
}

function retakeQuiz() {
    if (currentQuizId) startQuiz(currentQuizId);
}

function showQuizMenu() {
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-menu').style.display = 'block';
    renderQuizHistory();
}

function endQuiz() {
    if (confirm('End quiz early? Your progress will be scored.')) {
        finishQuiz();
    }
}

function renderQuizHistory() {
    const data = getChallengeData();
    const container = document.getElementById('quiz-history');
    if (!container) return;

    const history = (data?.quizHistory || []).slice().reverse().slice(0, 15);

    if (history.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No quizzes taken yet.</p>';
        return;
    }

    container.innerHTML = history.map(h => {
        const date = new Date(h.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
        const cls = h.pct >= 80 ? 'good' : h.pct >= 50 ? 'ok' : 'bad';
        return `
            <div class="quiz-history-item">
                <span>${h.title}</span>
                <span style="color:var(--text-muted);font-size:0.8rem;">${date}</span>
                <span class="quiz-history-score ${cls}">${h.pct}%</span>
            </div>
        `;
    }).join('');
}


// ===== CALENDAR =====
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();

function renderCalendar() {
    const container = document.getElementById('calendar-body');
    const titleEl = document.getElementById('calendar-month-title');
    if (!container || !titleEl) return;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    titleEl.textContent = `${monthNames[calendarMonth]} ${calendarYear}`;

    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const daysInPrev = new Date(calendarYear, calendarMonth, 0).getDate();

    const user = getCurrentUser();
    const data = getChallengeData();
    const startDate = user ? new Date(user.startDate) : new Date();
    const today = new Date();

    let html = '';

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="cal-day other-month"><span class="cal-day-number">${daysInPrev - i}</span></div>`;
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
        const cellDate = new Date(calendarYear, calendarMonth, d);
        const isToday = cellDate.toDateString() === today.toDateString();

        // Calculate challenge day
        const diffMs = cellDate - startDate;
        const challengeDay = Math.floor(diffMs / 86400000) + 1;
        const isChallenge = challengeDay >= 1 && challengeDay <= 90;

        // Get task completion data
        const dayData = isChallenge ? (data?.dailyTasks?.[challengeDay] || {}) : {};
        const cppDone = Object.entries(dayData).some(([k, v]) => k.startsWith('cpp') && v);
        const pyDone = Object.entries(dayData).some(([k, v]) => k.startsWith('python') && v);
        const dsaDone = Object.entries(dayData).some(([k, v]) => k.startsWith('dsa') && v);
        const fitDone = Object.entries(dayData).some(([k, v]) => k.startsWith('fitness') && v);

        let dots = '';
        if (cppDone) dots += '<div class="cal-dot cpp"></div>';
        if (pyDone) dots += '<div class="cal-dot python"></div>';
        if (dsaDone) dots += '<div class="cal-dot dsa"></div>';
        if (fitDone) dots += '<div class="cal-dot fitness"></div>';

        const todayClass = isToday ? 'today' : '';
        const challengeLabel = isChallenge ? `<span class="cal-challenge-day">D${challengeDay}</span>` : '';

        html += `
            <div class="cal-day ${todayClass}" onclick="showCalendarDayDetail(${challengeDay}, ${isChallenge})">
                <span class="cal-day-number">${d}</span>
                <div class="cal-day-dots">${dots}</div>
                ${challengeLabel}
            </div>
        `;
    }

    // Next month padding
    const totalCells = firstDay + daysInMonth;
    const remaining = 7 - (totalCells % 7);
    if (remaining < 7) {
        for (let i = 1; i <= remaining; i++) {
            html += `<div class="cal-day other-month"><span class="cal-day-number">${i}</span></div>`;
        }
    }

    container.innerHTML = html;
}

function calendarPrevMonth() {
    calendarMonth--;
    if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
    renderCalendar();
}

function calendarNextMonth() {
    calendarMonth++;
    if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
    renderCalendar();
}

function showCalendarDayDetail(day, isChallenge) {
    const container = document.getElementById('calendar-day-detail');
    if (!container) return;

    if (!isChallenge || day < 1 || day > 90) {
        container.innerHTML = '<p style="color:var(--text-muted);">Not a challenge day.</p>';
        return;
    }

    const data = getChallengeData();
    const dayTasks = getDailyTasks(day);
    const dayData = data?.dailyTasks?.[day] || {};
    const allTasks = [
        ...(dayTasks.cpp || []).map((t, i) => ({ text: t, key: `cpp_${i}`, cat: 'C++' })),
        ...(dayTasks.python || []).map((t, i) => ({ text: t, key: `python_${i}`, cat: 'Python' })),
        ...(dayTasks.dsa || []).map((t, i) => ({ text: t, key: `dsa_${i}`, cat: 'DSA' })),
        ...(dayTasks.fitness || []).map((t, i) => ({ text: t, key: `fitness_${i}`, cat: 'Fitness' })),
    ];

    const completed = allTasks.filter(t => dayData[t.key]).length;

    container.innerHTML = `
        <h4 style="margin-bottom:8px;">Day ${day}: ${dayTasks.title}</h4>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:12px;">${completed} / ${allTasks.length} tasks completed</p>
        <div class="progress-bar" style="margin-bottom:12px;">
            <div class="progress-bar-fill" style="width:${allTasks.length > 0 ? (completed / allTasks.length * 100) : 0}%"></div>
        </div>
        ${allTasks.map(t => `
            <div style="display:flex;align-items:center;gap:8px;padding:4px 0;font-size:0.85rem;">
                <i class="fas ${dayData[t.key] ? 'fa-check-circle' : 'fa-circle'}" style="color:${dayData[t.key] ? 'var(--success)' : 'var(--text-muted)'};font-size:0.75rem;"></i>
                <span style="color:var(--text-muted);font-size:0.75rem;min-width:50px;">${t.cat}</span>
                <span style="${dayData[t.key] ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">${escapeHtml(t.text)}</span>
            </div>
        `).join('')}
        <button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="currentViewDay=${day};switchTab('daily');renderDailyTasks(${day});">
            <i class="fas fa-arrow-right"></i> Go to Day ${day}
        </button>
    `;
}


// ===== RESOURCE LIBRARY =====
let currentResCat = 'all';

// Default resources
const defaultResources = [
    { id: 'r1', title: 'LearnCpp.com', url: 'https://www.learncpp.com/', category: 'cpp', notes: 'Best free C++ tutorial', isDefault: true },
    { id: 'r2', title: 'C++ Reference', url: 'https://en.cppreference.com/', category: 'cpp', notes: 'Official reference', isDefault: true },
    { id: 'r3', title: 'The Cherno C++ (YouTube)', url: 'https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb', category: 'cpp', notes: 'Excellent video series', isDefault: true },
    { id: 'r4', title: 'Python Official Docs', url: 'https://docs.python.org/3/', category: 'python', notes: 'Official documentation', isDefault: true },
    { id: 'r5', title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', category: 'python', notes: 'Free Python book', isDefault: true },
    { id: 'r6', title: 'Corey Schafer (YouTube)', url: 'https://www.youtube.com/c/Coreyms', category: 'python', notes: 'Great Python tutorials', isDefault: true },
    { id: 'r7', title: 'NeetCode.io', url: 'https://neetcode.io/', category: 'dsa', notes: 'Curated DSA problem list with video explanations', isDefault: true },
    { id: 'r8', title: 'LeetCode', url: 'https://leetcode.com/', category: 'dsa', notes: 'Practice platform', isDefault: true },
    { id: 'r9', title: "Striver's A2Z DSA Sheet", url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', category: 'dsa', notes: 'Comprehensive DSA roadmap', isDefault: true },
    { id: 'r10', title: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/', category: 'dsa', notes: 'Theory + problems', isDefault: true },
    { id: 'r11', title: 'Darebee.com', url: 'https://darebee.com/', category: 'fitness', notes: 'Free workout programs', isDefault: true },
    { id: 'r12', title: 'VisuAlgo', url: 'https://visualgo.net/', category: 'dsa', notes: 'Visualize data structures and algorithms', isDefault: true },
];

function addResource() {
    document.getElementById('res-title').value = '';
    document.getElementById('res-url').value = '';
    document.getElementById('res-notes').value = '';
    document.getElementById('resource-modal').classList.add('active');
}

function saveResource() {
    const title = document.getElementById('res-title')?.value.trim();
    const url = document.getElementById('res-url')?.value.trim();
    const category = document.getElementById('res-category')?.value || 'other';
    const notes = document.getElementById('res-notes')?.value.trim();

    if (!title) { showToast('Please enter a title', 'error'); return; }

    const data = getChallengeData();
    if (!data) return;
    if (!data.resources) data.resources = [];

    data.resources.push({
        id: Date.now().toString(36),
        title, url, category, notes,
        createdAt: new Date().toISOString()
    });

    saveChallengeData(data);
    document.getElementById('resource-modal').classList.remove('active');
    renderResources();
    showToast('Resource saved!', 'success');
}

function deleteResource(id) {
    const data = getChallengeData();
    if (!data) return;
    data.resources = (data.resources || []).filter(r => r.id !== id);
    saveChallengeData(data);
    renderResources();
}

function renderResources() {
    const data = getChallengeData();
    const container = document.getElementById('resources-list');
    if (!container) return;

    const userResources = data?.resources || [];
    const allResources = [...defaultResources, ...userResources];
    const query = (document.getElementById('resource-search')?.value || '').toLowerCase();

    const filtered = allResources.filter(r => {
        const matchesCat = currentResCat === 'all' || r.category === currentResCat;
        const matchesSearch = !query || r.title.toLowerCase().includes(query) || (r.notes || '').toLowerCase().includes(query);
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-book-open"></i><p>No resources found.</p></div>';
        return;
    }

    const iconMap = { cpp: 'fas fa-code', python: 'fab fa-python', dsa: 'fas fa-sitemap', fitness: 'fas fa-dumbbell', other: 'fas fa-bookmark' };

    container.innerHTML = filtered.map(r => `
        <div class="resource-card">
            <div class="resource-icon ${r.category}"><i class="${iconMap[r.category] || 'fas fa-bookmark'}"></i></div>
            <div class="resource-info">
                <h4>${escapeHtml(r.title)}</h4>
                ${r.url ? `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.url.substring(0, 60))}${r.url.length > 60 ? '...' : ''}</a>` : ''}
                ${r.notes ? `<p>${escapeHtml(r.notes)}</p>` : ''}
            </div>
            ${!r.isDefault ? `<div class="resource-actions"><button class="delete-btn" onclick="deleteResource('${r.id}')" title="Delete"><i class="fas fa-trash"></i></button></div>` : ''}
        </div>
    `).join('');
}

function filterResources() { renderResources(); }

function filterResourceCat(cat) {
    currentResCat = cat;
    document.querySelectorAll('.resource-filters .filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.resource-filters .filter-btn[data-rcat="${cat}"]`)?.classList.add('active');
    renderResources();
}


// ===== HABIT TRACKER =====
function addHabit() {
    document.getElementById('habit-name').value = '';
    document.getElementById('habit-icon').value = '📚';
    document.getElementById('habit-color').value = '#6366f1';
    document.getElementById('habit-modal').classList.add('active');
}

function saveHabit() {
    const name = document.getElementById('habit-name')?.value.trim();
    const icon = document.getElementById('habit-icon')?.value.trim() || '⭐';
    const color = document.getElementById('habit-color')?.value || '#6366f1';

    if (!name) { showToast('Please enter a habit name', 'error'); return; }

    const data = getChallengeData();
    if (!data) return;
    if (!data.habits) data.habits = [];

    data.habits.push({
        id: Date.now().toString(36),
        name, icon, color,
        completedDays: {},
        createdAt: new Date().toISOString()
    });

    saveChallengeData(data);
    document.getElementById('habit-modal').classList.remove('active');
    renderHabits();
    showToast('Habit created!', 'success');
}

function toggleHabitDay(habitId, dateStr) {
    const data = getChallengeData();
    if (!data || !data.habits) return;

    const habit = data.habits.find(h => h.id === habitId);
    if (!habit) return;

    habit.completedDays[dateStr] = !habit.completedDays[dateStr];
    saveChallengeData(data);
    renderHabits();
}

function deleteHabit(id) {
    if (!confirm('Delete this habit?')) return;
    const data = getChallengeData();
    if (!data) return;
    data.habits = (data.habits || []).filter(h => h.id !== id);
    saveChallengeData(data);
    renderHabits();
}

function renderHabits() {
    const data = getChallengeData();
    const container = document.getElementById('habits-list');
    const streaksContainer = document.getElementById('habit-streaks');
    if (!container) return;

    const habits = data?.habits || [];

    if (habits.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-check-double"></i><p>No habits yet. Create one to start tracking!</p></div>';
        if (streaksContainer) streaksContainer.innerHTML = '';
        return;
    }

    const today = new Date();
    const last30 = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        last30.push(d.toISOString().split('T')[0]);
    }

    container.innerHTML = habits.map(habit => {
        // Calculate streak
        let streak = 0;
        const todayStr = today.toISOString().split('T')[0];
        let checkDate = new Date(today);
        while (true) {
            const ds = checkDate.toISOString().split('T')[0];
            if (habit.completedDays[ds]) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        return `
            <div class="habit-card">
                <div class="habit-header">
                    <div class="habit-name">
                        <span class="habit-emoji">${habit.icon}</span>
                        <span>${escapeHtml(habit.name)}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        ${streak > 0 ? `<span class="habit-streak-badge"><i class="fas fa-fire"></i> ${streak}d</span>` : ''}
                        <button class="habit-delete" onclick="deleteHabit('${habit.id}')"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="habit-days">
                    ${last30.map(dateStr => {
                        const isCompleted = habit.completedDays[dateStr];
                        const isToday = dateStr === todayStr;
                        const dayNum = new Date(dateStr).getDate();
                        return `
                            <div class="habit-day ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}"
                                style="${isCompleted ? `background:${habit.color};border-color:${habit.color};` : ''}"
                                onclick="toggleHabitDay('${habit.id}', '${dateStr}')"
                                title="${dateStr}">
                                ${dayNum}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Streaks summary
    if (streaksContainer) {
        const maxStreak = Math.max(...habits.map(h => {
            let s = 0, checkDate = new Date(today);
            while (h.completedDays[checkDate.toISOString().split('T')[0]]) { s++; checkDate.setDate(checkDate.getDate() - 1); }
            return s;
        }), 0);

        streaksContainer.innerHTML = habits.map(habit => {
            let streak = 0, checkDate = new Date(today);
            while (habit.completedDays[checkDate.toISOString().split('T')[0]]) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
            const pct = maxStreak > 0 ? (streak / maxStreak * 100) : 0;

            return `
                <div class="streak-card">
                    <div class="streak-info">
                        <span>${habit.icon}</span>
                        <span style="font-size:0.9rem;">${escapeHtml(habit.name)}</span>
                    </div>
                    <div style="flex:1;margin:0 12px;">
                        <div class="progress-bar"><div class="streak-bar" style="width:${pct}%;background:${habit.color};"></div></div>
                    </div>
                    <span style="font-weight:700;font-size:0.9rem;">${streak}d</span>
                </div>
            `;
        }).join('');
    }
}


// ===== WHITEBOARD =====
let wbTool = 'pen';
let wbDrawing = false;
let wbHistory = [];
let wbStartX = 0, wbStartY = 0;
let wbLastX = 0, wbLastY = 0;

function initWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set actual canvas size based on container
    function resizeCanvas() {
        const container = canvas.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = Math.max(500, window.innerHeight * 0.65);
        // Redraw history
        redrawWB();
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Event listeners
    canvas.addEventListener('mousedown', wbMouseDown);
    canvas.addEventListener('mousemove', wbMouseMove);
    canvas.addEventListener('mouseup', wbMouseUp);
    canvas.addEventListener('mouseleave', wbMouseUp);

    // Touch support
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); wbMouseDown(getTouchEvent(e)); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); wbMouseMove(getTouchEvent(e)); });
    canvas.addEventListener('touchend', (e) => { e.preventDefault(); wbMouseUp(); });
}

function getTouchEvent(e) {
    const touch = e.touches[0];
    const canvas = document.getElementById('whiteboard-canvas');
    const rect = canvas.getBoundingClientRect();
    return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top
    };
}

function getWBSettings() {
    return {
        color: document.getElementById('wb-color')?.value || '#6366f1',
        size: parseInt(document.getElementById('wb-size')?.value || '4'),
    };
}

function wbMouseDown(e) {
    wbDrawing = true;
    const { offsetX, offsetY } = e;
    wbStartX = offsetX;
    wbStartY = offsetY;
    wbLastX = offsetX;
    wbLastY = offsetY;

    if (wbTool === 'pen' || wbTool === 'eraser') {
        // Save canvas state for undo
        const canvas = document.getElementById('whiteboard-canvas');
        if (canvas) {
            wbHistory.push(canvas.toDataURL());
            if (wbHistory.length > 30) wbHistory.shift();
        }
    }

    if (wbTool === 'text') {
        wbDrawing = false;
        const text = prompt('Enter text:');
        if (text) {
            const canvas = document.getElementById('whiteboard-canvas');
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                wbHistory.push(canvas.toDataURL());
                const settings = getWBSettings();
                ctx.fillStyle = settings.color;
                ctx.font = `${settings.size * 4}px Inter, sans-serif`;
                ctx.fillText(text, offsetX, offsetY);
            }
        }
    }
}

function wbMouseMove(e) {
    if (!wbDrawing) return;
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = e;
    const settings = getWBSettings();

    if (wbTool === 'pen') {
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(wbLastX, wbLastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        wbLastX = offsetX;
        wbLastY = offsetY;
    } else if (wbTool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = settings.size * 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(wbLastX, wbLastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        wbLastX = offsetX;
        wbLastY = offsetY;
    }
}

function wbMouseUp(e) {
    if (!wbDrawing) return;
    wbDrawing = false;

    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const settings = getWBSettings();
    const { offsetX, offsetY } = e || { offsetX: wbLastX, offsetY: wbLastY };

    if (wbTool === 'line') {
        wbHistory.push(canvas.toDataURL());
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(wbStartX, wbStartY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    } else if (wbTool === 'rect') {
        wbHistory.push(canvas.toDataURL());
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.size;
        ctx.strokeRect(wbStartX, wbStartY, offsetX - wbStartX, offsetY - wbStartY);
    } else if (wbTool === 'circle') {
        wbHistory.push(canvas.toDataURL());
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.size;
        const rx = Math.abs(offsetX - wbStartX) / 2;
        const ry = Math.abs(offsetY - wbStartY) / 2;
        const cx = wbStartX + (offsetX - wbStartX) / 2;
        const cy = wbStartY + (offsetY - wbStartY) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function setWBTool(tool, el) {
    wbTool = tool;
    document.querySelectorAll('.wb-tool').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
}

function undoWB() {
    if (wbHistory.length === 0) return;
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const imgData = wbHistory.pop();
    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
    img.src = imgData;
}

function clearWB() {
    if (!confirm('Clear the whiteboard?')) return;
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas?.getContext('2d');
    if (ctx) {
        wbHistory.push(canvas.toDataURL());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function saveWB() {
    const canvas = document.getElementById('whiteboard-canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `whiteboard_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast('Whiteboard saved as PNG!', 'success');
}

function redrawWB() {
    if (wbHistory.length === 0) return;
    const canvas = document.getElementById('whiteboard-canvas');
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const imgData = wbHistory[wbHistory.length - 1];
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = imgData;
}


// ===== UTILITY =====
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// ===== INIT ALL ADVANCED FEATURES =====
function initAdvancedFeatures() {
    updateLineNumbers();
    renderSnippets();
    loadFlashcardDeck();
    renderQuizHistory();
    renderCalendar();
    renderResources();
    renderHabits();
    initWhiteboard();
}

// Hook into dashboard initialization
const _origInit2 = typeof initDashboard === 'function' ? initDashboard : null;
if (_origInit2) {
    const origFn = initDashboard;
    initDashboard = function() {
        origFn();
        initAdvancedFeatures();
    };
}

// Hook into tab switching for rendering on demand
const _origSwitch2 = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitch2) {
    const origSwitchFn = switchTab;
    switchTab = function(tabName) {
        origSwitchFn(tabName);
        const extraTitles = {
            editor: 'Code Editor', flashcards: 'Flashcards', quiz: 'Quizzes',
            calendar: 'Calendar', resources: 'Resources', habits: 'Habits', whiteboard: 'Whiteboard'
        };
        if (extraTitles[tabName]) {
            document.getElementById('topbar-title').textContent = extraTitles[tabName];
        }
        if (tabName === 'calendar') renderCalendar();
        if (tabName === 'resources') renderResources();
        if (tabName === 'habits') renderHabits();
        if (tabName === 'flashcards') { loadFlashcardDeck(); }
        if (tabName === 'quiz') { showQuizMenu(); }
        if (tabName === 'editor') { updateLineNumbers(); renderSnippets(); }
        if (tabName === 'whiteboard') { setTimeout(initWhiteboard, 100); }
    };
}


// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const main = document.querySelector('.dashboard-content');
    if (!main) return;

    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.addEventListener('click', () => {
        main.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('dashboard-page')?.appendChild(btn);

    main.addEventListener('scroll', () => {
        btn.classList.toggle('visible', main.scrollTop > 300);
    });
}

// ===== DAILY CODING CHALLENGE ON OVERVIEW =====
function renderDailyCodingChallenge(currentDay) {
    const challenge = typeof dailyCodingChallenges !== 'undefined' ? dailyCodingChallenges[currentDay] : null;
    if (!challenge) return;

    const container = document.getElementById('quick-tasks');
    if (!container) return;

    const challengeHTML = `
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.03);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <i class="fas fa-laptop-code" style="color:var(--accent-3);"></i>
                <strong style="font-size:0.9rem;">Daily Challenge: ${escapeHtml(challenge.title)}</strong>
                <span class="dsa-difficulty ${challenge.difficulty}" style="margin-left:auto;">${challenge.difficulty}</span>
            </div>
            <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px;">${escapeHtml(challenge.description)}</p>
            <details style="font-size:0.8rem;color:var(--text-muted);">
                <summary style="cursor:pointer;color:var(--accent-3);">Show Hint</summary>
                <p style="margin-top:4px;">${escapeHtml(challenge.hint)}</p>
            </details>
            <div style="margin-top:8px;font-size:0.8rem;">
                ${challenge.testCases.map(tc => `<code style="display:block;background:var(--glass);padding:4px 8px;margin:2px 0;border-radius:4px;font-family:'JetBrains Mono',monospace;">${escapeHtml(tc)}</code>`).join('')}
            </div>
            <button class="btn btn-outline btn-sm" style="margin-top:10px;" onclick="switchTab('editor')">
                <i class="fas fa-code"></i> Open Editor
            </button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', challengeHTML);
}

// ===== DAILY TIP ON DAILY TASKS =====
function renderDailyTip(day) {
    const tip = typeof getDailyTip === 'function' ? getDailyTip(day) : null;
    if (!tip) return;

    const container = document.getElementById('daily-tasks-container');
    if (!container) return;

    const tipHTML = `
        <div class="tip-card" style="margin-bottom:16px;">
            <div class="tip-card-header">
                <i class="fas fa-lightbulb" style="color:var(--warning);"></i>
                <strong>Tip of the Day</strong>
            </div>
            <p>${escapeHtml(tip)}</p>
        </div>
    `;

    container.insertAdjacentHTML('afterbegin', tipHTML);
}

// ===== WEEKLY GOALS ON OVERVIEW =====
function renderWeeklyGoals(currentDay) {
    const week = Math.ceil(currentDay / 7);
    const goals = typeof getWeeklyGoals === 'function' ? getWeeklyGoals(week) : null;
    if (!goals) return;

    const container = document.querySelector('#tab-overview .overview-grid');
    if (!container) return;

    const goalsHTML = `
        <div class="card" style="grid-column: 1 / -1;">
            <h3 class="card-title"><i class="fas fa-bullseye"></i> Week ${week} Goals</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
                <div style="padding:12px;background:var(--glass);border-radius:var(--radius);border-left:3px solid #6366f1;">
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">CODING</div>
                    <div style="font-size:0.85rem;">${escapeHtml(goals.coding)}</div>
                </div>
                <div style="padding:12px;background:var(--glass);border-radius:var(--radius);border-left:3px solid #06b6d4;">
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">DSA</div>
                    <div style="font-size:0.85rem;">${escapeHtml(goals.dsa)}</div>
                </div>
                <div style="padding:12px;background:var(--glass);border-radius:var(--radius);border-left:3px solid #10b981;">
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">FITNESS</div>
                    <div style="font-size:0.85rem;">${escapeHtml(goals.fitness)}</div>
                </div>
                <div style="padding:12px;background:var(--glass);border-radius:var(--radius);border-left:3px solid #f59e0b;">
                    <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">FOCUS</div>
                    <div style="font-size:0.85rem;">${escapeHtml(goals.focus)}</div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', goalsHTML);
}

// ===== DSA PATTERN REFERENCE =====
function renderDSAPatterns() {
    if (typeof dsaPatterns === 'undefined') return;

    const dsaContent = document.getElementById('dsa-content');
    if (!dsaContent) return;

    let patternsHTML = '<div style="margin-top:20px;"><h3 class="card-title"><i class="fas fa-puzzle-piece"></i> Algorithm Patterns</h3>';

    Object.entries(dsaPatterns).forEach(([name, pattern]) => {
        patternsHTML += `
            <div class="pattern-card" onclick="this.classList.toggle('open')">
                <div class="pattern-header">
                    <h3><i class="fas fa-code-branch" style="color:var(--accent-3)"></i> ${escapeHtml(name)}</h3>
                    <i class="fas fa-chevron-down chevron" style="color:var(--text-muted);transition:var(--transition);"></i>
                </div>
                <div class="pattern-body">
                    <p class="pattern-description">${escapeHtml(pattern.description)}</p>
                    <div class="pattern-problems">
                        ${pattern.problems.map(p => `<span class="pattern-problem">${escapeHtml(p)}</span>`).join('')}
                    </div>
                    <pre class="pattern-template">${escapeHtml(pattern.template)}</pre>
                </div>
            </div>
        `;
    });

    patternsHTML += '</div>';

    // Append after existing DSA content
    dsaContent.insertAdjacentHTML('afterend', patternsHTML);
}

// ===== COMPLEXITY CHEATSHEET ON DSA TAB =====
function renderComplexityCheatsheet() {
    if (typeof complexityCheatsheet === 'undefined') return;

    const dsaTab = document.getElementById('tab-dsa');
    if (!dsaTab) return;

    let html = '';

    // Data Structures table
    const ds = complexityCheatsheet["Data Structures"];
    if (ds) {
        html += `
        <div class="card" style="margin-top:20px;">
            <h3 class="card-title"><i class="fas fa-table"></i> Data Structure Complexity</h3>
            <div style="overflow-x:auto;">
                <table class="complexity-table">
                    <thead><tr><th>Structure</th><th>Access</th><th>Search</th><th>Insert</th><th>Delete</th><th>Space</th></tr></thead>
                    <tbody>
                        ${ds.map(d => `<tr><td>${d.name}</td><td>${d.access}</td><td>${d.search}</td><td>${d.insert}</td><td>${d.del}</td><td>${d.space}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    }

    // Sorting table
    const sort = complexityCheatsheet["Sorting Algorithms"];
    if (sort) {
        html += `
        <div class="card" style="margin-top:12px;">
            <h3 class="card-title"><i class="fas fa-sort-amount-down"></i> Sorting Algorithm Complexity</h3>
            <div style="overflow-x:auto;">
                <table class="complexity-table">
                    <thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr></thead>
                    <tbody>
                        ${sort.map(s => `<tr><td>${s.name}</td><td>${s.best}</td><td>${s.avg}</td><td>${s.worst}</td><td>${s.space}</td><td>${s.stable}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    }

    dsaTab.insertAdjacentHTML('beforeend', html);
}

// ===== ENHANCED INIT =====
const _origInit3 = typeof initDashboard === 'function' ? initDashboard : null;
if (_origInit3) {
    const origFn3 = initDashboard;
    initDashboard = function() {
        origFn3();

        // Get current day for context
        const user = getCurrentUser();
        if (user) {
            const startDate = new Date(user.startDate);
            const today = new Date();
            const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));

            // Add daily challenge to overview
            setTimeout(() => renderDailyCodingChallenge(currentDay), 100);
            // Add weekly goals
            setTimeout(() => renderWeeklyGoals(currentDay), 150);
        }

        // Init scroll to top
        setTimeout(initScrollToTop, 200);
    };
}

// Hook into DSA rendering to add patterns and cheatsheet
const _origRenderDSA = typeof renderDSA === 'function' ? renderDSA : null;
if (_origRenderDSA) {
    const origDSA = renderDSA;
    renderDSA = function(data) {
        origDSA(data);
        setTimeout(() => {
            renderDSAPatterns();
            renderComplexityCheatsheet();
        }, 50);
    };
}

// Hook into daily task rendering to add tip
const _origRenderDaily = typeof renderDailyTasks === 'function' ? renderDailyTasks : null;
if (_origRenderDaily) {
    const origDaily = renderDailyTasks;
    renderDailyTasks = function(day) {
        origDaily(day);
        setTimeout(() => renderDailyTip(day), 50);
    };
}
