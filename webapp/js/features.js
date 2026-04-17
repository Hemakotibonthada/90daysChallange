/* ============================================
   FEATURES MODULE — Extended Features
   Pomodoro, Notes, Analytics, Water/Sleep,
   Theme, Quotes, Confetti, Keyboard Shortcuts,
   Export/Import, DSA Search/Filter
   ============================================ */

// ===== THEME TOGGLE =====
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('90days_theme', isLight ? 'light' : 'dark');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function loadTheme() {
    const theme = localStorage.getItem('90days_theme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = 'fas fa-sun';
    }
}

// ===== MOTIVATIONAL QUOTES =====
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Hard choices, easy life. Easy choices, hard life.", author: "Jerzy Gregorek" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Every expert was once a beginner.", author: "Helen Hayes" },
    { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
    { text: "Strive for progress, not perfection.", author: "Unknown" },
    { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
    { text: "One day or day one. You decide.", author: "Unknown" },
];

function showRandomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    if (textEl) textEl.textContent = q.text;
    if (authorEl) authorEl.textContent = `— ${q.author}`;
}

// ===== POMODORO TIMER =====
let pomoInterval = null;
let pomoTimeLeft = 25 * 60;
let pomoTotalTime = 25 * 60;
let pomoRunning = false;

function startPomodoro() {
    const btn = document.getElementById('pomo-start');
    if (pomoRunning) {
        clearInterval(pomoInterval);
        pomoRunning = false;
        btn.innerHTML = '<i class="fas fa-play"></i> Resume';
        return;
    }

    pomoRunning = true;
    btn.innerHTML = '<i class="fas fa-pause"></i> Pause';

    pomoInterval = setInterval(() => {
        pomoTimeLeft--;
        updatePomoDisplay();

        if (pomoTimeLeft <= 0) {
            clearInterval(pomoInterval);
            pomoRunning = false;
            btn.innerHTML = '<i class="fas fa-play"></i> Start';
            pomoCompleted();
        }
    }, 1000);
}

function resetPomodoro() {
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoTimeLeft = pomoTotalTime;
    updatePomoDisplay();
    const btn = document.getElementById('pomo-start');
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start';
}

function setPomoTime(minutes, el) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    pomoTotalTime = minutes * 60;
    pomoTimeLeft = pomoTotalTime;
    updatePomoDisplay();

    const btn = document.getElementById('pomo-start');
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start';

    const label = document.getElementById('pomo-session-label');
    if (label) label.textContent = minutes <= 15 ? 'Break Time' : 'Focus Session';

    document.querySelectorAll('.pomo-preset').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');
}

function updatePomoDisplay() {
    const mins = Math.floor(pomoTimeLeft / 60);
    const secs = pomoTimeLeft % 60;
    const display = document.getElementById('pomo-time');
    if (display) display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Update ring
    const ring = document.getElementById('pomo-ring-fill');
    if (ring) {
        const circumference = 553;
        const progress = pomoTotalTime > 0 ? (pomoTotalTime - pomoTimeLeft) / pomoTotalTime : 0;
        ring.style.strokeDashoffset = circumference * (1 - progress);
    }
}

function pomoCompleted() {
    const data = getChallengeData();
    if (!data) return;

    if (!data.pomodoro) data.pomodoro = { sessions: 0, totalMinutes: 0, dailySessions: {} };
    data.pomodoro.sessions++;
    data.pomodoro.totalMinutes += Math.round(pomoTotalTime / 60);

    const today = new Date().toISOString().split('T')[0];
    data.pomodoro.dailySessions[today] = (data.pomodoro.dailySessions[today] || 0) + 1;

    saveChallengeData(data);
    updatePomoStats();

    showToast('Pomodoro complete! Great focus session!', 'success');
    launchConfetti();

    // Play notification sound
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.3;
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
        setTimeout(() => {
            const osc2 = ctx.createOscillator();
            osc2.connect(gain);
            osc2.frequency.value = 1000;
            osc2.start();
            osc2.stop(ctx.currentTime + 0.3);
        }, 350);
    } catch (e) { /* audio not available */ }

    pomoTimeLeft = pomoTotalTime;
    updatePomoDisplay();
}

function updatePomoStats() {
    const data = getChallengeData();
    if (!data || !data.pomodoro) return;

    const today = new Date().toISOString().split('T')[0];
    const sessionsToday = data.pomodoro.dailySessions?.[today] || 0;
    const totalHours = Math.floor(data.pomodoro.totalMinutes / 60);
    const totalMins = data.pomodoro.totalMinutes % 60;

    const el1 = document.getElementById('pomo-sessions-today');
    const el2 = document.getElementById('pomo-total-time');
    const el3 = document.getElementById('pomo-total-sessions');
    if (el1) el1.textContent = sessionsToday;
    if (el2) el2.textContent = `${totalHours}h ${totalMins}m`;
    if (el3) el3.textContent = data.pomodoro.sessions || 0;
}

// ===== WATER TRACKER =====
function renderWaterTracker() {
    const data = getChallengeData();
    if (!data) return;
    const today = new Date().toISOString().split('T')[0];
    if (!data.water) data.water = {};
    const glasses = data.water[today] || 0;

    const container = document.getElementById('water-glasses');
    if (!container) return;

    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const glass = document.createElement('div');
        glass.className = `water-glass ${i <= glasses ? 'filled' : ''}`;
        glass.addEventListener('click', () => toggleWater(i));
        container.appendChild(glass);
    }

    const bar = document.getElementById('water-bar');
    const text = document.getElementById('water-count-text');
    const stat = document.getElementById('stat-water');
    if (bar) bar.style.width = `${Math.min(100, (glasses / 8) * 100)}%`;
    if (text) text.textContent = `${glasses} / 8 glasses`;
    if (stat) stat.textContent = glasses;
}

function toggleWater(count) {
    const data = getChallengeData();
    if (!data) return;
    const today = new Date().toISOString().split('T')[0];
    if (!data.water) data.water = {};
    data.water[today] = count;
    data.lastActiveDate = today;
    saveChallengeData(data);
    renderWaterTracker();

    if (count >= 8) showToast('Hydration goal reached! 💧', 'success');
}

// ===== SLEEP TRACKER =====
function logSleep() {
    const input = document.getElementById('sleep-hours');
    const hours = parseFloat(input.value);
    if (!hours || hours < 0 || hours > 24) {
        showToast('Please enter valid hours (0-24)', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    const today = new Date().toISOString().split('T')[0];
    if (!data.sleep) data.sleep = {};
    data.sleep[today] = hours;
    saveChallengeData(data);

    input.value = '';
    renderSleepHistory();
    const stat = document.getElementById('stat-sleep');
    if (stat) stat.textContent = hours;
    showToast(`Logged ${hours} hours of sleep`, 'success');
}

function renderSleepHistory() {
    const data = getChallengeData();
    if (!data) return;
    const container = document.getElementById('sleep-history');
    if (!container) return;

    const sleep = data.sleep || {};
    const days = Object.keys(sleep).sort().slice(-14);

    if (days.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No sleep data yet. Log your first night!</p>';
        return;
    }

    const maxHours = Math.max(...days.map(d => sleep[d]), 10);

    container.innerHTML = days.map(day => {
        const h = sleep[day];
        const height = Math.max(4, (h / maxHours) * 100);
        const date = new Date(day);
        const label = date.toLocaleDateString('en', { weekday: 'short' }).charAt(0) + date.getDate();
        const color = h >= 7 ? '#10b981' : h >= 5 ? '#f59e0b' : '#ef4444';
        return `
            <div class="sleep-bar-container">
                <span class="sleep-value-label">${h}h</span>
                <div class="sleep-bar" style="height:${height}px;background:${color};"></div>
                <span class="sleep-day-label">${label}</span>
            </div>
        `;
    }).join('');

    const stat = document.getElementById('stat-sleep');
    const today = new Date().toISOString().split('T')[0];
    if (stat && sleep[today]) stat.textContent = sleep[today];
}

// ===== DSA SEARCH & FILTER =====
let currentDSAFilter = 'all';

function filterDSA() {
    const query = (document.getElementById('dsa-search')?.value || '').toLowerCase();
    document.querySelectorAll('.dsa-problem').forEach(el => {
        const name = el.querySelector('.task-text')?.textContent.toLowerCase() || '';
        const matchesSearch = !query || name.includes(query);
        const matchesFilter = filterMatchesDSA(el);
        el.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
    });
}

function filterDSADifficulty(level) {
    currentDSAFilter = level;
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
    document.querySelector(`.filter-btn[data-filter="${level}"]`)?.classList.add('active');
    filterDSA();
}

function filterMatchesDSA(el) {
    if (currentDSAFilter === 'all') return true;
    if (currentDSAFilter === 'unsolved') {
        const checkbox = el.querySelector('.task-checkbox');
        return checkbox && !checkbox.checked;
    }
    const badge = el.querySelector('.dsa-difficulty');
    return badge && badge.classList.contains(currentDSAFilter);
}

// ===== NOTES SYSTEM =====
let editingNoteId = null;
let currentNotesFilter = 'all';

function createNote() {
    editingNoteId = null;
    document.getElementById('note-modal-title').textContent = 'New Note';
    document.getElementById('note-title').value = '';
    document.getElementById('note-category').value = 'general';
    document.getElementById('note-content').value = '';
    document.getElementById('note-modal').classList.add('active');
}

function editNote(id) {
    const data = getChallengeData();
    if (!data || !data.notes) return;
    const note = data.notes.find(n => n.id === id);
    if (!note) return;

    editingNoteId = id;
    document.getElementById('note-modal-title').textContent = 'Edit Note';
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-category').value = note.category;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-modal').classList.add('active');
}

function closeNoteModal() {
    document.getElementById('note-modal').classList.remove('active');
    editingNoteId = null;
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    const category = document.getElementById('note-category').value;
    const content = document.getElementById('note-content').value.trim();

    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    if (!data.notes) data.notes = [];

    if (editingNoteId) {
        const note = data.notes.find(n => n.id === editingNoteId);
        if (note) {
            note.title = title;
            note.category = category;
            note.content = content;
            note.updatedAt = new Date().toISOString();
        }
    } else {
        data.notes.push({
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            title,
            category,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }

    saveChallengeData(data);
    closeNoteModal();
    renderNotes();
    showToast('Note saved!', 'success');
}

function deleteNote(id) {
    if (!confirm('Delete this note?')) return;
    const data = getChallengeData();
    if (!data || !data.notes) return;
    data.notes = data.notes.filter(n => n.id !== id);
    saveChallengeData(data);
    renderNotes();
    showToast('Note deleted', 'info');
}

function renderNotes() {
    const data = getChallengeData();
    const container = document.getElementById('notes-list');
    if (!container) return;
    const notes = (data?.notes || []).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    if (notes.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-sticky-note"></i><p>No notes yet. Create your first note!</p></div>';
        return;
    }

    const query = (document.getElementById('notes-search')?.value || '').toLowerCase();

    const filtered = notes.filter(n => {
        const matchesCat = currentNotesFilter === 'all' || n.category === currentNotesFilter;
        const matchesSearch = !query || n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query);
        return matchesCat && matchesSearch;
    });

    container.innerHTML = filtered.map(note => {
        const preview = note.content.substring(0, 150).replace(/</g, '&lt;');
        const date = new Date(note.updatedAt).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `
            <div class="note-card" ondblclick="editNote('${note.id}')">
                <div class="note-card-header">
                    <span class="note-card-title">${escapeHtml(note.title)}</span>
                    <span class="note-card-cat ${note.category}">${note.category}</span>
                </div>
                <div class="note-card-preview">${preview}${note.content.length > 150 ? '...' : ''}</div>
                <div class="note-card-footer">
                    <span>${date}</span>
                    <div class="note-card-actions">
                        <button onclick="editNote('${note.id}')" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" onclick="event.stopPropagation();deleteNote('${note.id}')" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterNotes() { renderNotes(); }

function filterNotesCat(cat) {
    currentNotesFilter = cat;
    document.querySelectorAll('.notes-toolbar .filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.notes-toolbar .filter-btn[data-cat="${cat}"]`)?.classList.add('active');
    renderNotes();
}

// ===== ANALYTICS =====
function renderAnalytics() {
    const data = getChallengeData();
    const user = getCurrentUser();
    if (!data || !user) return;

    renderWeeklyChart(data, user);
    renderCategoryChart(data);
    renderDailyChart(data, user);
    renderAchievements(data);
    renderWeeklySummary(data, user);
}

function renderWeeklyChart(data, user) {
    const container = document.getElementById('weekly-chart');
    if (!container) return;

    const weeks = [];
    for (let w = 0; w < 13; w++) {
        let count = 0;
        for (let d = w * 7 + 1; d <= Math.min((w + 1) * 7, 90); d++) {
            const dayData = data.dailyTasks?.[d] || {};
            count += Object.values(dayData).filter(v => v === true).length;
        }
        weeks.push(count);
    }

    const maxVal = Math.max(...weeks, 1);
    container.innerHTML = weeks.map((val, i) => `
        <div class="chart-bar-wrapper">
            <span class="chart-value">${val}</span>
            <div class="chart-bar total-bar" style="height:${Math.max(2, (val / maxVal) * 160)}px"></div>
            <span class="chart-label">W${i + 1}</span>
        </div>
    `).join('');
}

function renderCategoryChart(data) {
    const chart = document.getElementById('category-chart');
    const legend = document.getElementById('category-legend');
    if (!chart || !legend) return;

    let cppCount = 0, pyCount = 0, dsaCount = 0, fitCount = 0;

    for (let d = 1; d <= 90; d++) {
        const dayData = data.dailyTasks?.[d] || {};
        Object.entries(dayData).forEach(([key, val]) => {
            if (!val) return;
            if (key.startsWith('cpp')) cppCount++;
            else if (key.startsWith('python')) pyCount++;
            else if (key.startsWith('dsa')) dsaCount++;
            else if (key.startsWith('fitness')) fitCount++;
        });
    }

    const total = cppCount + pyCount + dsaCount + fitCount || 1;
    const categories = [
        { name: 'C++', count: cppCount, color: '#6366f1' },
        { name: 'Python', count: pyCount, color: '#f59e0b' },
        { name: 'DSA', count: dsaCount, color: '#06b6d4' },
        { name: 'Fitness', count: fitCount, color: '#10b981' },
    ];

    // Build conic gradient
    let gradientParts = [];
    let cumPercent = 0;
    categories.forEach(cat => {
        const pct = (cat.count / total) * 100;
        gradientParts.push(`${cat.color} ${cumPercent}% ${cumPercent + pct}%`);
        cumPercent += pct;
    });

    chart.style.background = total > 0 ? `conic-gradient(${gradientParts.join(', ')})` : 'var(--glass)';
    chart.innerHTML = `<div class="donut-center"><span class="value">${total}</span><span class="label">Tasks</span></div>`;

    legend.innerHTML = categories.map(cat => `
        <div class="legend-item">
            <div class="legend-color" style="background:${cat.color}"></div>
            <span>${cat.name}: ${cat.count}</span>
        </div>
    `).join('');
}

function renderDailyChart(data, user) {
    const container = document.getElementById('daily-chart');
    if (!container) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));

    const days = [];
    for (let d = Math.max(1, currentDay - 13); d <= currentDay; d++) {
        const dayData = data.dailyTasks?.[d] || {};
        const count = Object.values(dayData).filter(v => v === true).length;
        days.push({ day: d, count });
    }

    const maxVal = Math.max(...days.map(d => d.count), 1);
    container.innerHTML = days.map(d => `
        <div class="chart-bar-wrapper">
            <span class="chart-value">${d.count}</span>
            <div class="chart-bar total-bar" style="height:${Math.max(2, (d.count / maxVal) * 160)}px"></div>
            <span class="chart-label">D${d.day}</span>
        </div>
    `).join('');
}

function renderAchievements(data) {
    const container = document.getElementById('achievements');
    if (!container) return;

    const totalTasks = Object.values(data.dailyTasks || {}).reduce((sum, day) =>
        sum + Object.values(day || {}).filter(v => v === true).length, 0);
    const dsaSolved = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v).length;
    const streak = data.bestStreak || 0;
    const sessions = data.pomodoro?.sessions || 0;

    const achievements = [
        { icon: '🚀', name: 'Day 1 Done', unlocked: totalTasks > 0 },
        { icon: '🔥', name: '7 Day Streak', unlocked: streak >= 7 },
        { icon: '💪', name: '30 Day Warrior', unlocked: Object.keys(data.dailyTasks || {}).length >= 30 },
        { icon: '🏆', name: '60 Days Strong', unlocked: Object.keys(data.dailyTasks || {}).length >= 60 },
        { icon: '👑', name: '90 Day Legend', unlocked: Object.keys(data.dailyTasks || {}).length >= 90 },
        { icon: '🧩', name: '10 DSA Solved', unlocked: dsaSolved >= 10 },
        { icon: '⚡', name: '50 DSA Solved', unlocked: dsaSolved >= 50 },
        { icon: '🌟', name: '100 DSA Solved', unlocked: dsaSolved >= 100 },
        { icon: '🍅', name: '10 Pomodoros', unlocked: sessions >= 10 },
        { icon: '📝', name: '50 Tasks Done', unlocked: totalTasks >= 50 },
        { icon: '💯', name: '200 Tasks Done', unlocked: totalTasks >= 200 },
        { icon: '🎯', name: 'All Phase 1', unlocked: totalTasks >= 100 },
    ];

    container.innerHTML = achievements.map(a => `
        <div class="achievement ${a.unlocked ? 'unlocked' : ''}">
            <span class="achievement-icon">${a.icon}</span>
            <span class="achievement-name">${a.name}</span>
        </div>
    `).join('');
}

function renderWeeklySummary(data, user) {
    const container = document.getElementById('weekly-summary');
    if (!container) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));
    const currentWeek = Math.ceil(currentDay / 7);

    const weekStart = (currentWeek - 1) * 7 + 1;
    const weekEnd = Math.min(currentWeek * 7, 90);

    let weekTasks = 0, weekCpp = 0, weekPython = 0, weekDsa = 0, weekFit = 0;
    for (let d = weekStart; d <= weekEnd; d++) {
        const dayData = data.dailyTasks?.[d] || {};
        Object.entries(dayData).forEach(([key, val]) => {
            if (!val) return;
            weekTasks++;
            if (key.startsWith('cpp')) weekCpp++;
            else if (key.startsWith('python')) weekPython++;
            else if (key.startsWith('dsa')) weekDsa++;
            else if (key.startsWith('fitness')) weekFit++;
        });
    }

    container.innerHTML = `
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fas fa-calendar" style="color:var(--accent-1)"></i> Week ${currentWeek} (Day ${weekStart}-${weekEnd})</span><span class="weekly-summary-value">${weekTasks} tasks</span></div>
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fas fa-code" style="color:#6366f1"></i> C++</span><span class="weekly-summary-value">${weekCpp}</span></div>
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fab fa-python" style="color:#f59e0b"></i> Python</span><span class="weekly-summary-value">${weekPython}</span></div>
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fas fa-sitemap" style="color:#06b6d4"></i> DSA</span><span class="weekly-summary-value">${weekDsa}</span></div>
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fas fa-dumbbell" style="color:#10b981"></i> Fitness</span><span class="weekly-summary-value">${weekFit}</span></div>
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fas fa-fire" style="color:var(--warning)"></i> Current Streak</span><span class="weekly-summary-value">${data.streak || 0} days</span></div>
        <div class="weekly-summary-row"><span class="weekly-summary-label"><i class="fas fa-clock" style="color:var(--accent-2)"></i> Focus Time</span><span class="weekly-summary-value">${data.pomodoro?.totalMinutes || 0} min</span></div>
    `;
}

// ===== CONFETTI =====
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#ec4899', '#fbbf24'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.vy += 0.05;

            if (frame > 60) p.opacity -= 0.01;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (frame < 180 && particles.some(p => p.opacity > 0)) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}

// ===== EXPORT / IMPORT =====
function exportData() {
    const user = getCurrentUser();
    const data = getChallengeData();
    if (!user || !data) {
        showToast('No data to export', 'error');
        return;
    }

    const exportPayload = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        user: { ...user, password: undefined },
        challengeData: data
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `90days_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!imported.challengeData || !imported.user) {
                showToast('Invalid data file', 'error');
                return;
            }

            if (!confirm('This will replace your current progress. Continue?')) return;

            const userId = localStorage.getItem('90days_current_user');
            if (userId) {
                localStorage.setItem(`90days_data_${userId}`, JSON.stringify(imported.challengeData));
                showToast('Data imported successfully!', 'success');
                initDashboard();
                initFeatures();
            }
        } catch (err) {
            showToast('Failed to parse file', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Don't trigger when typing in inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    const dashboardPage = document.getElementById('dashboard-page');
    if (!dashboardPage || !dashboardPage.classList.contains('active')) return;

    const tabMap = {
        '1': 'overview', '2': 'daily', '3': 'cpp', '4': 'python',
        '5': 'dsa', '6': 'fitness', '7': 'diet'
    };

    if (tabMap[e.key]) {
        e.preventDefault();
        switchTab(tabMap[e.key]);
    } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        switchTab('pomodoro');
    } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        switchTab('notes');
    } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        switchTab('analytics');
    } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
    } else if (e.key === '?') {
        e.preventDefault();
        document.getElementById('kbd-help').classList.toggle('active');
    } else if (e.key === 'ArrowLeft') {
        const dailyTab = document.getElementById('tab-daily');
        if (dailyTab && dailyTab.classList.contains('active')) {
            e.preventDefault();
            changeDay(-1);
        }
    } else if (e.key === 'ArrowRight') {
        const dailyTab = document.getElementById('tab-daily');
        if (dailyTab && dailyTab.classList.contains('active')) {
            e.preventDefault();
            changeDay(1);
        }
    } else if (e.key === 'Escape') {
        document.getElementById('kbd-help')?.classList.remove('active');
        closeNoteModal();
    }
});

// ===== INITIALIZE ALL FEATURES =====
function initFeatures() {
    loadTheme();
    showRandomQuote();
    updatePomoDisplay();
    updatePomoStats();
    renderWaterTracker();
    renderSleepHistory();
    renderNotes();
    renderAnalytics();
}

// Hook into dashboard init
const _origInitDashboard = typeof initDashboard === 'function' ? initDashboard : null;
if (_origInitDashboard) {
    const originalInit = initDashboard;
    initDashboard = function() {
        originalInit();
        initFeatures();
    };
}

// Update switchTab to render analytics on switch
const _origSwitchTab = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchTab) {
    const origSwitch = switchTab;
    switchTab = function(tabName) {
        origSwitch(tabName);
        if (tabName === 'analytics') renderAnalytics();
        if (tabName === 'notes') renderNotes();
        if (tabName === 'pomodoro') {
            updatePomoStats();
            renderWaterTracker();
            renderSleepHistory();
        }

        // Update topbar title for new tabs
        const extraTitles = { pomodoro: 'Pomodoro Timer', notes: 'Notes', analytics: 'Analytics' };
        if (extraTitles[tabName]) {
            document.getElementById('topbar-title').textContent = extraTitles[tabName];
        }
    };
}

// Load theme immediately
loadTheme();
