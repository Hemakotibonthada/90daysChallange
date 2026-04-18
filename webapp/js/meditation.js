/* ============================================
   MEDITATION & FOCUS MODULE
   Breathing exercises, ambient sounds,
   focus timer, mindfulness journal,
   body scan, guided sessions
   ============================================ */

// ===== BREATHING EXERCISES =====
const BREATHING_PATTERNS = {
    box: { name: 'Box Breathing', description: 'Navy SEAL technique for calm focus', inhale: 4, hold1: 4, exhale: 4, hold2: 4, icon: '🟦' },
    relaxing: { name: '4-7-8 Relaxing', description: 'Dr. Weil technique for deep relaxation', inhale: 4, hold1: 7, exhale: 8, hold2: 0, icon: '🌊' },
    energizing: { name: 'Energizing Breath', description: 'Quick energy boost between coding sessions', inhale: 2, hold1: 0, exhale: 2, hold2: 0, icon: '⚡' },
    calm: { name: 'Calm Down', description: 'Extended exhale for anxiety relief', inhale: 4, hold1: 2, exhale: 6, hold2: 2, icon: '🧘' },
    focus: { name: 'Focus Breath', description: 'Before a coding session or interview', inhale: 5, hold1: 5, exhale: 5, hold2: 0, icon: '🎯' },
    sleep: { name: 'Sleep Prep', description: 'Before bed for better rest', inhale: 4, hold1: 7, exhale: 8, hold2: 4, icon: '🌙' },
};

let breathingState = {
    active: false,
    pattern: null,
    phase: 'inhale',
    timer: null,
    cycles: 0,
    targetCycles: 5,
    phaseTime: 0,
};

function startBreathing(patternKey) {
    const pattern = BREATHING_PATTERNS[patternKey];
    if (!pattern) return;

    breathingState = {
        active: true,
        pattern,
        phase: 'inhale',
        timer: null,
        cycles: 0,
        targetCycles: 5,
        phaseTime: 0,
    };

    document.getElementById('breathing-menu').style.display = 'none';
    document.getElementById('breathing-active').style.display = 'flex';
    document.getElementById('breathing-pattern-name').textContent = pattern.name;

    runBreathingCycle();
}

function runBreathingCycle() {
    if (!breathingState.active) return;
    const p = breathingState.pattern;

    const phases = [
        { name: 'Inhale', duration: p.inhale, class: 'inhale' },
        { name: 'Hold', duration: p.hold1, class: 'hold' },
        { name: 'Exhale', duration: p.exhale, class: 'exhale' },
        { name: 'Hold', duration: p.hold2, class: 'hold' },
    ].filter(ph => ph.duration > 0);

    let phaseIndex = 0;

    function nextPhase() {
        if (!breathingState.active) return;
        if (phaseIndex >= phases.length) {
            breathingState.cycles++;
            document.getElementById('breathing-cycles').textContent = `${breathingState.cycles} / ${breathingState.targetCycles}`;

            if (breathingState.cycles >= breathingState.targetCycles) {
                finishBreathing();
                return;
            }
            phaseIndex = 0;
        }

        const phase = phases[phaseIndex];
        const circle = document.getElementById('breathing-circle');
        const text = document.getElementById('breathing-phase-text');
        const counter = document.getElementById('breathing-counter');

        if (text) text.textContent = phase.name;
        if (circle) {
            circle.className = 'breathing-circle ' + phase.class;
        }

        let seconds = phase.duration;
        if (counter) counter.textContent = seconds;

        breathingState.timer = setInterval(() => {
            seconds--;
            if (counter) counter.textContent = seconds;

            if (seconds <= 0) {
                clearInterval(breathingState.timer);
                phaseIndex++;
                nextPhase();
            }
        }, 1000);
    }

    nextPhase();
}

function stopBreathing() {
    breathingState.active = false;
    clearInterval(breathingState.timer);
    document.getElementById('breathing-active').style.display = 'none';
    document.getElementById('breathing-menu').style.display = 'block';
}

function finishBreathing() {
    breathingState.active = false;
    clearInterval(breathingState.timer);

    showToast('Breathing exercise complete! Feel the calm.', 'success');

    const data = getChallengeData();
    if (data) {
        if (!data.meditation) data.meditation = { sessions: 0, totalMinutes: 0, breathingSessions: 0 };
        data.meditation.breathingSessions = (data.meditation.breathingSessions || 0) + 1;
        const totalTime = breathingState.pattern ?
            ((breathingState.pattern.inhale + breathingState.pattern.hold1 + breathingState.pattern.exhale + breathingState.pattern.hold2) * breathingState.targetCycles) / 60 : 0;
        data.meditation.totalMinutes = (data.meditation.totalMinutes || 0) + Math.ceil(totalTime);
        data.meditation.sessions++;
        saveChallengeData(data);

        if (typeof awardXP === 'function') awardXP(15, 'Breathing exercise');
    }

    document.getElementById('breathing-active').style.display = 'none';
    document.getElementById('breathing-menu').style.display = 'block';
    updateMeditationStats();
}

function renderBreathingMenu() {
    const container = document.getElementById('breathing-menu');
    if (!container) return;

    container.innerHTML = Object.entries(BREATHING_PATTERNS).map(([key, p]) => `
        <div class="breathing-card" onclick="startBreathing('${key}')">
            <div class="breathing-card-icon">${p.icon}</div>
            <div class="breathing-card-info">
                <h4>${p.name}</h4>
                <p>${p.description}</p>
                <span class="breathing-card-timing">${p.inhale}s in - ${p.hold1 ? p.hold1 + 's hold - ' : ''}${p.exhale}s out${p.hold2 ? ' - ' + p.hold2 + 's hold' : ''}</span>
            </div>
        </div>
    `).join('');
}

// ===== AMBIENT SOUNDS =====
const AMBIENT_SOUNDS = [
    { id: 'rain', name: 'Rain', icon: '🌧️', color: '#3b82f6' },
    { id: 'forest', name: 'Forest', icon: '🌲', color: '#10b981' },
    { id: 'ocean', name: 'Ocean Waves', icon: '🌊', color: '#06b6d4' },
    { id: 'fire', name: 'Fireplace', icon: '🔥', color: '#f59e0b' },
    { id: 'wind', name: 'Wind', icon: '💨', color: '#94a3b8' },
    { id: 'coffee', name: 'Coffee Shop', icon: '☕', color: '#92400e' },
    { id: 'thunder', name: 'Thunder', icon: '⛈️', color: '#6366f1' },
    { id: 'birds', name: 'Bird Song', icon: '🐦', color: '#84cc16' },
    { id: 'white', name: 'White Noise', icon: '📻', color: '#e2e8f0' },
    { id: 'night', name: 'Night Crickets', icon: '🌙', color: '#1e293b' },
];

let activeSounds = {};
let audioContextCreated = false;
let masterAudioCtx = null;

function toggleAmbientSound(soundId) {
    if (activeSounds[soundId]) {
        stopAmbientSound(soundId);
    } else {
        startAmbientSound(soundId);
    }
    renderAmbientSounds();
}

function startAmbientSound(soundId) {
    if (!audioContextCreated) {
        masterAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioContextCreated = true;
    }

    // Generate ambient noise using Web Audio API
    const ctx = masterAudioCtx;
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Different noise types for different sounds
    const generators = {
        rain: () => { for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.15; },
        ocean: () => {
            for (let i = 0; i < bufferSize; i++) {
                const t = i / ctx.sampleRate;
                data[i] = Math.sin(t * 0.5) * (Math.random() * 0.1) + (Math.random() * 2 - 1) * 0.05;
            }
        },
        wind: () => {
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5;
            }
        },
        white: () => { for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.1; },
        default: () => {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
                b6 = white * 0.115926;
            }
        },
    };

    (generators[soundId] || generators.default)();

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = 0.3;

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    activeSounds[soundId] = { source, gain };
}

function stopAmbientSound(soundId) {
    if (activeSounds[soundId]) {
        activeSounds[soundId].source.stop();
        delete activeSounds[soundId];
    }
}

function stopAllSounds() {
    Object.keys(activeSounds).forEach(id => stopAmbientSound(id));
    renderAmbientSounds();
}

function setVolume(soundId, volume) {
    if (activeSounds[soundId]) {
        activeSounds[soundId].gain.gain.value = volume;
    }
}

function renderAmbientSounds() {
    const container = document.getElementById('ambient-sounds');
    if (!container) return;

    container.innerHTML = AMBIENT_SOUNDS.map(s => {
        const isActive = !!activeSounds[s.id];
        return `
            <div class="ambient-sound-card ${isActive ? 'active' : ''}" onclick="toggleAmbientSound('${s.id}')">
                <div class="ambient-sound-icon" style="${isActive ? 'background:' + s.color : ''}">${s.icon}</div>
                <span class="ambient-sound-name">${s.name}</span>
                ${isActive ? `
                    <input type="range" class="ambient-volume" min="0" max="100" value="30"
                        onclick="event.stopPropagation()"
                        oninput="setVolume('${s.id}', this.value / 100)">
                ` : ''}
            </div>
        `;
    }).join('') + `
        <button class="btn btn-ghost btn-sm" onclick="stopAllSounds()" style="margin-top:8px;">
            <i class="fas fa-stop"></i> Stop All
        </button>
    `;
}

// ===== MINDFULNESS JOURNAL =====
function saveMindfulnessEntry() {
    const gratitude = document.getElementById('mindful-gratitude')?.value.trim();
    const mood = document.getElementById('mindful-mood')?.value;
    const intention = document.getElementById('mindful-intention')?.value.trim();
    const freewrite = document.getElementById('mindful-freewrite')?.value.trim();

    if (!gratitude && !intention && !freewrite) {
        showToast('Please write something!', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    if (!data.mindfulJournal) data.mindfulJournal = [];

    data.mindfulJournal.push({
        gratitude, mood, intention, freewrite,
        date: new Date().toISOString(),
    });

    if (data.mindfulJournal.length > 100) data.mindfulJournal = data.mindfulJournal.slice(-100);
    saveChallengeData(data);

    ['mindful-gratitude', 'mindful-intention', 'mindful-freewrite'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    showToast('Journal entry saved!', 'success');
    if (typeof awardXP === 'function') awardXP(10, 'Mindfulness journal');
    renderJournalHistory();
}

function renderJournalHistory() {
    const container = document.getElementById('journal-history');
    if (!container) return;

    const data = getChallengeData();
    const entries = (data?.mindfulJournal || []).slice().reverse().slice(0, 10);

    if (entries.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No journal entries yet.</p>';
        return;
    }

    const moodEmojis = { great: '😄', good: '🙂', okay: '😐', low: '😔', stressed: '😰' };

    container.innerHTML = entries.map(e => {
        const date = new Date(e.date).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `
            <div class="journal-entry">
                <div class="journal-entry-header">
                    <span>${moodEmojis[e.mood] || '🙂'} ${date}</span>
                </div>
                ${e.gratitude ? `<p><strong>Grateful for:</strong> ${escapeHtml(e.gratitude)}</p>` : ''}
                ${e.intention ? `<p><strong>Intention:</strong> ${escapeHtml(e.intention)}</p>` : ''}
                ${e.freewrite ? `<p>${escapeHtml(e.freewrite)}</p>` : ''}
            </div>
        `;
    }).join('');
}

// ===== MEDITATION STATS =====
function updateMeditationStats() {
    const data = getChallengeData();
    const med = data?.meditation || {};

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('med-total-sessions', med.sessions || 0);
    setEl('med-total-minutes', med.totalMinutes || 0);
    setEl('med-breathing', med.breathingSessions || 0);
}

// ===== INIT =====
function initMeditation() {
    renderBreathingMenu();
    renderAmbientSounds();
    renderJournalHistory();
    updateMeditationStats();
}

const _origSwitchMed = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchMed) {
    const origSwMed = switchTab;
    switchTab = function(tabName) {
        origSwMed(tabName);
        if (tabName === 'meditation') {
            document.getElementById('topbar-title').textContent = 'Focus & Mindfulness';
            initMeditation();
        }
    };
}


/* ============================================
   STUDY PLANNER MODULE
   Time blocks, drag scheduling,
   study sessions logger, goals tracker,
   weekly planner view
   ============================================ */

// ===== STUDY SESSION LOGGER =====
function logStudySession() {
    const topic = document.getElementById('study-topic')?.value.trim();
    const duration = parseInt(document.getElementById('study-duration')?.value);
    const category = document.getElementById('study-category')?.value;
    const notes = document.getElementById('study-notes')?.value.trim();

    if (!topic || !duration) {
        showToast('Please fill topic and duration', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    if (!data.studySessions) data.studySessions = [];

    data.studySessions.push({
        topic, duration, category, notes,
        date: new Date().toISOString(),
    });

    if (data.studySessions.length > 200) data.studySessions = data.studySessions.slice(-200);
    saveChallengeData(data);

    ['study-topic', 'study-notes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    showToast(`Logged ${duration} min study session!`, 'success');
    if (typeof awardXP === 'function') awardXP(Math.min(duration, 60), `Study: ${topic}`);
    renderStudySessions();
    renderStudyStats();
}

function renderStudySessions() {
    const container = document.getElementById('study-sessions-list');
    if (!container) return;

    const data = getChallengeData();
    const sessions = (data?.studySessions || []).slice().reverse().slice(0, 20);

    if (sessions.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-clock"></i><p>No study sessions logged yet.</p></div>';
        return;
    }

    const catColors = { cpp: '#6366f1', python: '#f59e0b', dsa: '#06b6d4', general: '#10b981' };

    container.innerHTML = sessions.map(s => {
        const date = new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `
            <div class="study-session-item">
                <div class="study-session-color" style="background:${catColors[s.category] || '#6366f1'}"></div>
                <div class="study-session-info">
                    <h4>${escapeHtml(s.topic)}</h4>
                    <span>${s.category} • ${date}</span>
                </div>
                <div class="study-session-duration">${s.duration}m</div>
            </div>
        `;
    }).join('');
}

function renderStudyStats() {
    const container = document.getElementById('study-stats');
    if (!container) return;

    const data = getChallengeData();
    const sessions = data?.studySessions || [];

    const today = new Date().toISOString().split('T')[0];
    const todayMinutes = sessions.filter(s => s.date.startsWith(today)).reduce((sum, s) => sum + s.duration, 0);
    const weekMinutes = sessions.filter(s => {
        const d = new Date(s.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return d >= weekAgo;
    }).reduce((sum, s) => sum + s.duration, 0);
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

    const catBreakdown = {};
    sessions.forEach(s => {
        catBreakdown[s.category] = (catBreakdown[s.category] || 0) + s.duration;
    });

    container.innerHTML = `
        <div class="study-stat-grid">
            <div class="study-stat-card">
                <span class="study-stat-value">${todayMinutes}m</span>
                <span class="study-stat-label">Today</span>
            </div>
            <div class="study-stat-card">
                <span class="study-stat-value">${Math.round(weekMinutes / 60)}h</span>
                <span class="study-stat-label">This Week</span>
            </div>
            <div class="study-stat-card">
                <span class="study-stat-value">${Math.round(totalMinutes / 60)}h</span>
                <span class="study-stat-label">All Time</span>
            </div>
            <div class="study-stat-card">
                <span class="study-stat-value">${sessions.length}</span>
                <span class="study-stat-label">Sessions</span>
            </div>
        </div>
        <div style="margin-top:12px;">
            ${Object.entries(catBreakdown).map(([cat, mins]) => {
                const pct = totalMinutes > 0 ? (mins / totalMinutes * 100) : 0;
                const colors = { cpp: '#6366f1', python: '#f59e0b', dsa: '#06b6d4', general: '#10b981' };
                return `
                    <div style="margin-bottom:8px;">
                        <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:3px;">
                            <span>${cat}</span><span>${Math.round(mins)}m (${Math.round(pct)}%)</span>
                        </div>
                        <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%;background:${colors[cat] || '#6366f1'}"></div></div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ===== WEEKLY GOALS =====
function saveWeeklyStudyGoal() {
    const goal = parseInt(document.getElementById('weekly-goal-hours')?.value);
    if (!goal || goal < 1) {
        showToast('Please set a valid weekly goal (hours)', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    if (!data.studyGoals) data.studyGoals = {};
    const weekKey = getWeekKey();
    data.studyGoals[weekKey] = goal * 60; // Store in minutes
    saveChallengeData(data);

    showToast(`Weekly goal set: ${goal} hours!`, 'success');
    renderWeeklyGoalProgress();
}

function getWeekKey() {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay());
    return start.toISOString().split('T')[0];
}

function renderWeeklyGoalProgress() {
    const container = document.getElementById('weekly-goal-progress');
    if (!container) return;

    const data = getChallengeData();
    const weekKey = getWeekKey();
    const goalMinutes = data?.studyGoals?.[weekKey] || 0;

    if (!goalMinutes) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">Set a weekly study goal above!</p>';
        return;
    }

    const sessions = data?.studySessions || [];
    const weekStart = new Date(weekKey);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const weekMinutes = sessions.filter(s => {
        const d = new Date(s.date);
        return d >= weekStart && d < weekEnd;
    }).reduce((sum, s) => sum + s.duration, 0);

    const pct = Math.min(100, Math.round((weekMinutes / goalMinutes) * 100));

    container.innerHTML = `
        <div style="text-align:center;margin-bottom:8px;">
            <span style="font-size:2rem;font-weight:800;color:${pct >= 100 ? 'var(--success)' : 'var(--accent-1)'};">${pct}%</span>
            <div style="font-size:0.8rem;color:var(--text-muted);">${Math.round(weekMinutes)}m / ${goalMinutes}m</div>
        </div>
        <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${pct}%;${pct >= 100 ? 'background:var(--success);' : ''}"></div>
        </div>
        ${pct >= 100 ? '<p style="text-align:center;color:var(--success);font-size:0.85rem;margin-top:8px;">🎉 Weekly goal achieved!</p>' : ''}
    `;
}

// ===== INIT =====
function initStudyPlanner() {
    renderStudySessions();
    renderStudyStats();
    renderWeeklyGoalProgress();
}

const _origSwitchStudy = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchStudy) {
    const origSwStudy = switchTab;
    switchTab = function(tabName) {
        origSwStudy(tabName);
        if (tabName === 'planner') {
            document.getElementById('topbar-title').textContent = 'Study Planner';
            initStudyPlanner();
        }
    };
}
