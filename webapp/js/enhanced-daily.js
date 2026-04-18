/* ============================================
   ENHANCED DAILY TASKS MODULE
   Improved daily task page with:
   - Task time tracking
   - Task notes/comments
   - Mini progress dashboard
   - Streak calendar
   - Focus mode
   - Task priority labels
   - Day navigation with swipe
   - Completion celebrations
   - Daily summary card
   - Task difficulty rating
   - Estimated vs actual time
   - Related resources per task
   ============================================ */

// ===== TASK TIME TRACKING =====
let taskTimers = {};

function startTaskTimer(day, key) {
    const timerId = `${day}_${key}`;
    if (taskTimers[timerId]) {
        stopTaskTimer(day, key);
        return;
    }

    taskTimers[timerId] = {
        start: Date.now(),
        interval: setInterval(() => {
            updateTaskTimerDisplay(day, key);
        }, 1000),
    };

    const btn = document.getElementById(`timer-btn-${day}-${key.replace(/[^a-zA-Z0-9]/g, '_')}`);
    if (btn) {
        btn.classList.add('timing');
        btn.innerHTML = '<i class="fas fa-stop"></i>';
    }
}

function stopTaskTimer(day, key) {
    const timerId = `${day}_${key}`;
    const timer = taskTimers[timerId];
    if (!timer) return;

    clearInterval(timer.interval);
    const elapsed = Math.floor((Date.now() - timer.start) / 1000);
    delete taskTimers[timerId];

    // Save time to data
    const data = getChallengeData();
    if (data) {
        if (!data.taskTimes) data.taskTimes = {};
        if (!data.taskTimes[day]) data.taskTimes[day] = {};
        data.taskTimes[day][key] = (data.taskTimes[day][key] || 0) + elapsed;
        saveChallengeData(data);
    }

    const btn = document.getElementById(`timer-btn-${day}-${key.replace(/[^a-zA-Z0-9]/g, '_')}`);
    if (btn) {
        btn.classList.remove('timing');
        btn.innerHTML = '<i class="fas fa-play"></i>';
    }

    updateTaskTimerDisplay(day, key);

    if (elapsed > 60) {
        showToast(`Timer stopped: ${formatSeconds(elapsed)}`, 'info');
        if (typeof awardXP === 'function') {
            awardXP(Math.min(Math.floor(elapsed / 60), 30), 'Focused study');
        }
    }
}

function updateTaskTimerDisplay(day, key) {
    const timerId = `${day}_${key}`;
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
    const el = document.getElementById(`timer-display-${day}-${safeKey}`);
    if (!el) return;

    const data = getChallengeData();
    const savedTime = data?.taskTimes?.[day]?.[key] || 0;

    if (taskTimers[timerId]) {
        const liveElapsed = Math.floor((Date.now() - taskTimers[timerId].start) / 1000);
        el.textContent = formatSeconds(savedTime + liveElapsed);
        el.classList.add('timer-active');
    } else {
        el.textContent = savedTime > 0 ? formatSeconds(savedTime) : '';
        el.classList.remove('timer-active');
    }
}

function formatSeconds(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
}

// ===== TASK NOTES =====
function toggleTaskNote(day, key) {
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
    const noteEl = document.getElementById(`task-note-${day}-${safeKey}`);
    if (noteEl) {
        noteEl.classList.toggle('open');
        if (noteEl.classList.contains('open')) {
            const textarea = noteEl.querySelector('textarea');
            if (textarea) textarea.focus();
        }
    }
}

function saveTaskNote(day, key) {
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
    const textarea = document.querySelector(`#task-note-${day}-${safeKey} textarea`);
    if (!textarea) return;

    const data = getChallengeData();
    if (!data) return;
    if (!data.taskNotes) data.taskNotes = {};
    if (!data.taskNotes[day]) data.taskNotes[day] = {};
    data.taskNotes[day][key] = textarea.value;
    saveChallengeData(data);

    showToast('Note saved!', 'success');
}

// ===== TASK DIFFICULTY RATING =====
function setTaskDifficulty(day, key, difficulty) {
    const data = getChallengeData();
    if (!data) return;
    if (!data.taskDifficulty) data.taskDifficulty = {};
    if (!data.taskDifficulty[day]) data.taskDifficulty[day] = {};
    data.taskDifficulty[day][key] = difficulty;
    saveChallengeData(data);

    // Update UI
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
    document.querySelectorAll(`#diff-${day}-${safeKey} .diff-btn`).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.diff === difficulty);
    });
}

// ===== ENHANCED DAILY TASK RENDERER =====
function renderEnhancedDailyTasks(day) {
    const data = getChallengeData();
    if (!data) return;

    const dayTasks = typeof getDailyTasks === 'function' ? getDailyTasks(day) : null;
    if (!dayTasks) return;

    const dayData = data.dailyTasks?.[day] || {};
    const user = getCurrentUser();
    if (!user) return;

    // Calculate day date
    const startDate = new Date(user.startDate);
    const dayDate = new Date(startDate.getTime() + (day - 1) * 86400000);
    const today = new Date();
    const isToday = dayDate.toDateString() === today.toDateString();
    const isPast = dayDate < today && !isToday;
    const isFuture = dayDate > today;

    // Mini progress for this day
    const categories = [
        { key: 'cpp', name: 'C++', icon: 'fa-code', color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #818cf8)', tasks: dayTasks.cpp || [] },
        { key: 'python', name: 'Python', icon: 'fa-python fab', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', tasks: dayTasks.python || [] },
        { key: 'dsa', name: 'DSA', icon: 'fa-sitemap', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)', tasks: dayTasks.dsa || [] },
        { key: 'fitness', name: 'Fitness', icon: 'fa-dumbbell', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)', tasks: dayTasks.fitness || [] },
    ];

    const allTasks = categories.flatMap(cat => cat.tasks.map((t, i) => ({ text: t, key: `${cat.key}_${i}`, cat })));
    const completedCount = allTasks.filter(t => dayData[t.key]).length;
    const totalCount = allTasks.length;
    const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Time spent today
    const dayTimes = data.taskTimes?.[day] || {};
    const totalSeconds = Object.values(dayTimes).reduce((s, t) => s + t, 0);

    // Get daily tip
    const tip = typeof getDailyTip === 'function' ? getDailyTip(day) : null;

    // Get phase info
    const phase = day <= 30 ? { name: 'Phase 1: Foundations', num: 1, color: '#6366f1' } :
        day <= 60 ? { name: 'Phase 2: Intermediate', num: 2, color: '#06b6d4' } :
        { name: 'Phase 3: Advanced', num: 3, color: '#10b981' };

    const container = document.getElementById('daily-tasks-container');
    if (!container) return;

    // Build enhanced HTML
    let html = '';

    // === Day status banner ===
    if (isToday) {
        html += `
            <div class="ed-today-banner">
                <div class="ed-today-pulse"></div>
                <span>Today's Challenge</span>
            </div>
        `;
    } else if (isPast) {
        html += `<div class="ed-past-banner"><i class="fas fa-history"></i> Past Day${completionPct === 100 ? ' — Completed!' : ''}</div>`;
    } else {
        html += `<div class="ed-future-banner"><i class="fas fa-lock"></i> Upcoming Day</div>`;
    }

    // === Mini Dashboard ===
    html += `
        <div class="ed-mini-dashboard">
            <div class="ed-progress-ring-wrap">
                <svg class="ed-ring" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" stroke-width="6"/>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="${phase.color}" stroke-width="6" stroke-linecap="round"
                        stroke-dasharray="263.9" stroke-dashoffset="${263.9 - (completionPct / 100) * 263.9}"
                        style="transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset 1s ease;"/>
                </svg>
                <div class="ed-ring-text">
                    <span class="ed-ring-pct">${completionPct}%</span>
                    <span class="ed-ring-label">Done</span>
                </div>
            </div>
            <div class="ed-mini-stats">
                <div class="ed-mini-stat">
                    <i class="fas fa-check-circle" style="color:var(--success);"></i>
                    <div>
                        <span class="ed-mini-val">${completedCount}/${totalCount}</span>
                        <span class="ed-mini-lbl">Tasks</span>
                    </div>
                </div>
                <div class="ed-mini-stat">
                    <i class="fas fa-clock" style="color:var(--accent-3);"></i>
                    <div>
                        <span class="ed-mini-val">${totalSeconds > 0 ? formatSeconds(totalSeconds) : '0m'}</span>
                        <span class="ed-mini-lbl">Time</span>
                    </div>
                </div>
                <div class="ed-mini-stat">
                    <i class="fas fa-layer-group" style="color:${phase.color};"></i>
                    <div>
                        <span class="ed-mini-val">${phase.name.split(':')[0]}</span>
                        <span class="ed-mini-lbl">${phase.name.split(':')[1]?.trim() || ''}</span>
                    </div>
                </div>
            </div>
            <div class="ed-category-bars">
                ${categories.map(cat => {
                    const catCompleted = cat.tasks.filter((_, i) => dayData[`${cat.key}_${i}`]).length;
                    const catPct = cat.tasks.length > 0 ? Math.round((catCompleted / cat.tasks.length) * 100) : 0;
                    return `
                        <div class="ed-cat-bar">
                            <div class="ed-cat-bar-header">
                                <span style="color:${cat.color};">${cat.name}</span>
                                <span>${catCompleted}/${cat.tasks.length}</span>
                            </div>
                            <div class="ed-cat-bar-track">
                                <div class="ed-cat-bar-fill" style="width:${catPct}%;background:${cat.gradient};"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // === Tip of the Day ===
    if (tip) {
        html += `
            <div class="ed-tip-card">
                <div class="ed-tip-icon">💡</div>
                <div class="ed-tip-content">
                    <strong>Tip of the Day</strong>
                    <p>${escapeHtml(tip)}</p>
                </div>
            </div>
        `;
    }

    // === Task Categories ===
    categories.forEach(cat => {
        const catCompleted = cat.tasks.filter((_, i) => dayData[`${cat.key}_${i}`]).length;
        const catPct = cat.tasks.length > 0 ? Math.round((catCompleted / cat.tasks.length) * 100) : 0;

        html += `
            <div class="ed-category ${catPct === 100 ? 'all-done' : ''}">
                <div class="ed-category-header" onclick="this.parentElement.querySelector('.ed-category-tasks').classList.toggle('collapsed')">
                    <div class="ed-category-left">
                        <div class="ed-category-icon" style="background:${cat.gradient};">
                            <i class="${cat.icon.includes('fab') ? cat.icon : 'fas ' + cat.icon}"></i>
                        </div>
                        <div>
                            <span class="ed-category-name">${cat.name}</span>
                            ${catPct === 100 ? '<span class="ed-complete-badge">Complete ✓</span>' : ''}
                        </div>
                    </div>
                    <div class="ed-category-right">
                        <div class="ed-category-progress">
                            <div class="ed-category-progress-fill" style="width:${catPct}%;background:${cat.gradient};"></div>
                        </div>
                        <span class="ed-category-count">${catCompleted}/${cat.tasks.length}</span>
                        <i class="fas fa-chevron-down ed-chevron"></i>
                    </div>
                </div>
                <div class="ed-category-tasks">
                    ${cat.tasks.map((task, i) => {
                        const key = `${cat.key}_${i}`;
                        const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
                        const checked = dayData[key] ? 'checked' : '';
                        const completed = dayData[key] ? 'completed' : '';
                        const savedTime = data.taskTimes?.[day]?.[key] || 0;
                        const savedNote = data.taskNotes?.[day]?.[key] || '';
                        const difficulty = data.taskDifficulty?.[day]?.[key] || '';
                        const isActive = !!taskTimers[`${day}_${key}`];

                        return `
                            <div class="ed-task ${completed}" id="task-row-${day}-${safeKey}">
                                <div class="ed-task-main">
                                    <label class="ed-checkbox-wrap">
                                        <input type="checkbox" class="ed-checkbox" ${checked}
                                            onchange="handleEnhancedTaskToggle(${day}, '${key}', this.checked)">
                                        <span class="ed-checkbox-custom"></span>
                                    </label>
                                    <div class="ed-task-content">
                                        <span class="ed-task-text">${escapeHtml(task)}</span>
                                        <div class="ed-task-meta">
                                            ${savedTime > 0 ? `<span class="ed-task-time"><i class="fas fa-clock"></i> ${formatSeconds(savedTime)}</span>` : ''}
                                            ${difficulty ? `<span class="ed-task-difficulty ${difficulty}">${difficulty}</span>` : ''}
                                            ${savedNote ? '<span class="ed-task-has-note"><i class="fas fa-sticky-note"></i></span>' : ''}
                                        </div>
                                    </div>
                                    <div class="ed-task-actions">
                                        <button class="ed-action-btn ${isActive ? 'timing' : ''}" id="timer-btn-${day}-${safeKey}"
                                            onclick="event.stopPropagation();startTaskTimer(${day},'${key}')" title="Timer">
                                            <i class="fas ${isActive ? 'fa-stop' : 'fa-play'}"></i>
                                        </button>
                                        <span class="ed-timer-display" id="timer-display-${day}-${safeKey}">${savedTime > 0 ? formatSeconds(savedTime) : ''}</span>
                                        <button class="ed-action-btn" onclick="event.stopPropagation();toggleTaskNote(${day},'${key}')" title="Notes">
                                            <i class="fas fa-comment${savedNote ? '' : '-dots'}"></i>
                                        </button>
                                    </div>
                                </div>
                                <!-- Task Note -->
                                <div class="ed-task-note ${savedNote ? 'has-content' : ''}" id="task-note-${day}-${safeKey}">
                                    <textarea placeholder="Add notes about this task..." oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px';">${escapeHtml(savedNote)}</textarea>
                                    <div class="ed-note-actions">
                                        <button class="btn btn-primary btn-sm" onclick="saveTaskNote(${day},'${key}')"><i class="fas fa-save"></i> Save</button>
                                        <div class="ed-difficulty-btns" id="diff-${day}-${safeKey}">
                                            <span style="font-size:0.75rem;color:var(--text-muted);">Difficulty:</span>
                                            <button class="diff-btn ${difficulty === 'easy' ? 'active' : ''}" data-diff="easy" onclick="setTaskDifficulty(${day},'${key}','easy')">Easy</button>
                                            <button class="diff-btn ${difficulty === 'medium' ? 'active' : ''}" data-diff="medium" onclick="setTaskDifficulty(${day},'${key}','medium')">Medium</button>
                                            <button class="diff-btn ${difficulty === 'hard' ? 'active' : ''}" data-diff="hard" onclick="setTaskDifficulty(${day},'${key}','hard')">Hard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    });

    // === Daily Summary (if day is complete or past) ===
    if (completionPct === 100 || isPast) {
        html += renderDailySummaryCard(day, data, categories, dayData, totalSeconds);
    }

    container.innerHTML = html;

    // Trigger completion celebration
    if (completionPct === 100 && isToday) {
        showDayCompleteAnimation(day);
    }
}

function renderDailySummaryCard(day, data, categories, dayData, totalSeconds) {
    const catBreakdown = categories.map(cat => {
        const done = cat.tasks.filter((_, i) => dayData[`${cat.key}_${i}`]).length;
        return { name: cat.name, done, total: cat.tasks.length, color: cat.color };
    });

    const difficulties = data.taskDifficulty?.[day] || {};
    const diffCounts = { easy: 0, medium: 0, hard: 0 };
    Object.values(difficulties).forEach(d => { if (diffCounts[d] !== undefined) diffCounts[d]++; });

    return `
        <div class="ed-summary-card">
            <div class="ed-summary-header">
                <i class="fas fa-chart-bar"></i>
                <span>Day ${day} Summary</span>
            </div>
            <div class="ed-summary-stats">
                <div class="ed-summary-stat">
                    <span class="val">${Object.values(dayData).filter(v => v).length}</span>
                    <span class="lbl">Tasks Done</span>
                </div>
                <div class="ed-summary-stat">
                    <span class="val">${totalSeconds > 0 ? formatSeconds(totalSeconds) : '—'}</span>
                    <span class="lbl">Time Spent</span>
                </div>
                <div class="ed-summary-stat">
                    <span class="val">${diffCounts.easy + diffCounts.medium + diffCounts.hard > 0 ?
                        `${diffCounts.easy}E ${diffCounts.medium}M ${diffCounts.hard}H` : '—'}</span>
                    <span class="lbl">Difficulty</span>
                </div>
            </div>
            <div class="ed-summary-breakdown">
                ${catBreakdown.map(c => `
                    <div class="ed-summary-cat">
                        <span class="ed-summary-cat-dot" style="background:${c.color};"></span>
                        <span>${c.name}</span>
                        <span class="ed-summary-cat-val">${c.done}/${c.total}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ===== TASK TOGGLE WITH ANIMATION =====
function handleEnhancedTaskToggle(day, key, checked) {
    const data = getChallengeData();
    if (!data.dailyTasks[day]) data.dailyTasks[day] = {};
    data.dailyTasks[day][key] = checked;
    data.lastActiveDate = new Date().toISOString().split('T')[0];

    if (key.startsWith('fitness') && checked) {
        data.workoutsDone = (data.workoutsDone || 0) + 1;
    } else if (key.startsWith('fitness') && !checked) {
        data.workoutsDone = Math.max(0, (data.workoutsDone || 0) - 1);
    }

    saveChallengeData(data);

    // Animate the task row
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
    const row = document.getElementById(`task-row-${day}-${safeKey}`);
    if (row) {
        if (checked) {
            row.classList.add('completing');
            setTimeout(() => {
                row.classList.remove('completing');
                row.classList.add('completed');
            }, 500);
        } else {
            row.classList.remove('completed');
        }
    }

    // Award XP
    if (checked && typeof awardXP === 'function') {
        awardXP(10, 'Task completed');
    }

    // Check badges
    if (typeof checkBadges === 'function') {
        setTimeout(checkBadges, 100);
    }

    // Re-render mini dashboard
    setTimeout(() => renderEnhancedDailyTasks(day), 600);

    // Check if all tasks done
    const dayTasks = typeof getDailyTasks === 'function' ? getDailyTasks(day) : null;
    if (dayTasks && checked) {
        const allTasks = [...(dayTasks.cpp || []), ...(dayTasks.python || []), ...(dayTasks.dsa || []), ...(dayTasks.fitness || [])];
        const totalKeys = [];
        ['cpp', 'python', 'dsa', 'fitness'].forEach(cat => {
            (dayTasks[cat] || []).forEach((_, i) => totalKeys.push(`${cat}_${i}`));
        });
        const allDone = totalKeys.every(k => data.dailyTasks[day]?.[k]);
        if (allDone) {
            showDayCompleteAnimation(day);
        }
    }

    // Update overview stats
    const user = getCurrentUser();
    if (user) {
        const startDate = new Date(user.startDate);
        const today = new Date();
        const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));
        if (typeof renderOverview === 'function') renderOverview(user, data, currentDay);
        if (typeof renderHeatmap === 'function') renderHeatmap(data);
    }
}

// ===== DAY COMPLETE ANIMATION =====
function showDayCompleteAnimation(day) {
    if (typeof launchConfetti === 'function') launchConfetti();

    const banner = document.createElement('div');
    banner.className = 'ed-complete-overlay';
    banner.innerHTML = `
        <div class="ed-complete-card">
            <div class="ed-complete-icon">🎉</div>
            <h2>Day ${day} Complete!</h2>
            <p>All tasks finished. Amazing work!</p>
            <div class="ed-complete-stars">⭐⭐⭐⭐⭐</div>
            <button class="btn btn-primary" onclick="this.closest('.ed-complete-overlay').remove()">
                <i class="fas fa-arrow-right"></i> Continue
            </button>
        </div>
    `;
    document.body.appendChild(banner);

    if (typeof awardXP === 'function') {
        awardXP(30, `Day ${day} complete!`);
    }

    setTimeout(() => {
        if (banner.parentNode) banner.remove();
    }, 8000);
}

// ===== FOCUS MODE =====
let focusModeActive = false;

function toggleFocusMode() {
    focusModeActive = !focusModeActive;
    document.body.classList.toggle('focus-mode', focusModeActive);

    const btn = document.getElementById('focus-mode-btn');
    if (btn) {
        btn.innerHTML = focusModeActive ?
            '<i class="fas fa-compress"></i> Exit Focus' :
            '<i class="fas fa-expand"></i> Focus Mode';
        btn.classList.toggle('active', focusModeActive);
    }

    if (focusModeActive) {
        showToast('Focus mode ON — distractions hidden', 'info');
    } else {
        showToast('Focus mode OFF', 'info');
    }
}

// ===== STREAK MINI CALENDAR =====
function renderStreakCalendar() {
    const container = document.getElementById('streak-mini-calendar');
    if (!container) return;

    const data = getChallengeData();
    const user = getCurrentUser();
    if (!data || !user) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));

    // Show last 14 days
    const days = [];
    for (let i = 13; i >= 0; i--) {
        const d = currentDay - i;
        if (d < 1) continue;
        const dayData = data.dailyTasks?.[d] || {};
        const tasksDone = Object.values(dayData).filter(v => v === true).length;
        const dayDate = new Date(startDate.getTime() + (d - 1) * 86400000);
        const isToday = d === currentDay;
        days.push({ day: d, tasksDone, isToday, dayOfWeek: dayDate.toLocaleDateString('en', { weekday: 'short' }).charAt(0) });
    }

    container.innerHTML = `
        <div class="ed-streak-row">
            ${days.map(d => {
                let cls = 'ed-streak-cell';
                if (d.isToday) cls += ' today';
                if (d.tasksDone >= 7) cls += ' level-4';
                else if (d.tasksDone >= 5) cls += ' level-3';
                else if (d.tasksDone >= 3) cls += ' level-2';
                else if (d.tasksDone > 0) cls += ' level-1';
                return `
                    <div class="${cls}" title="Day ${d.day}: ${d.tasksDone} tasks" onclick="currentViewDay=${d.day};renderEnhancedDailyTasks(${d.day});document.getElementById('daily-day-title').textContent='Day ${d.day}: '+(typeof getDailyTasks==='function'?getDailyTasks(${d.day}).title:'');">
                        <span class="ed-streak-day">${d.dayOfWeek}</span>
                        <span class="ed-streak-num">${d.day}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ===== DAILY CHALLENGE CARD =====
function renderDailyChallenge(day) {
    const container = document.getElementById('daily-challenge-card');
    if (!container) return;

    const challenges = typeof dailyCodingChallenges !== 'undefined' ? dailyCodingChallenges : null;
    if (!challenges || !challenges[day]) {
        container.innerHTML = '';
        return;
    }

    const challenge = challenges[day];
    const data = getChallengeData();
    const isDone = data?.dailyChallengesDone?.[day];
    const diffColors = { easy: 'var(--success)', medium: 'var(--warning)', hard: 'var(--danger)' };

    container.innerHTML = `
        <div class="ed-challenge ${isDone ? 'done' : ''}">
            <div class="ed-challenge-header">
                <div class="ed-challenge-left">
                    <span class="ed-challenge-icon">🏆</span>
                    <div>
                        <span class="ed-challenge-title">Daily Challenge</span>
                        <span class="ed-challenge-diff" style="color:${diffColors[challenge.difficulty]}">${challenge.difficulty}</span>
                    </div>
                </div>
                ${isDone ? '<span class="ed-challenge-done-badge">Completed ✓</span>' : ''}
            </div>
            <h4 class="ed-challenge-name">${escapeHtml(challenge.title)}</h4>
            <p class="ed-challenge-desc">${escapeHtml(challenge.description)}</p>
            <details class="ed-challenge-details">
                <summary>Show Hint</summary>
                <p>${escapeHtml(challenge.hint)}</p>
            </details>
            <div class="ed-challenge-tests">
                ${challenge.testCases.map(tc => `<code>${escapeHtml(tc)}</code>`).join('')}
            </div>
            <div class="ed-challenge-actions">
                <button class="btn btn-outline btn-sm" onclick="switchTab('editor')"><i class="fas fa-code"></i> Open Editor</button>
                ${!isDone ? `<button class="btn btn-primary btn-sm" onclick="markDailyChallengeComplete(${day})"><i class="fas fa-check"></i> Mark Done</button>` : ''}
            </div>
        </div>
    `;
}

function markDailyChallengeComplete(day) {
    const data = getChallengeData();
    if (!data) return;
    if (!data.dailyChallengesDone) data.dailyChallengesDone = {};
    data.dailyChallengesDone[day] = true;
    saveChallengeData(data);

    if (typeof awardXP === 'function') awardXP(25, 'Daily challenge solved!');
    showToast('Daily challenge completed! +25 XP', 'success');
    renderDailyChallenge(day);
}

// ===== ENHANCED DAY NAVIGATION =====
function enhancedChangeDay(delta) {
    if (typeof currentViewDay !== 'undefined') {
        currentViewDay = Math.max(1, Math.min(90, currentViewDay + delta));
    }

    const dayTasks = typeof getDailyTasks === 'function' ? getDailyTasks(currentViewDay) : null;
    const title = document.getElementById('daily-day-title');
    if (title && dayTasks) {
        title.textContent = `Day ${currentViewDay}: ${dayTasks.title}`;
    }

    const user = getCurrentUser();
    if (user) {
        const startDate = new Date(user.startDate);
        const dayDate = new Date(startDate.getTime() + (currentViewDay - 1) * 86400000);
        const dateEl = document.getElementById('daily-date');
        if (dateEl) {
            dateEl.textContent = dayDate.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }
    }

    renderEnhancedDailyTasks(currentViewDay);
    renderStreakCalendar();
    renderDailyChallenge(currentViewDay);

    // Load reflection
    const data = getChallengeData();
    const reflectionEl = document.getElementById('daily-reflection');
    if (reflectionEl && data) {
        reflectionEl.value = data.reflections?.[currentViewDay] || '';
    }
}

// ===== TOUCH SWIPE NAVIGATION =====
let touchStartX = 0;
let touchEndX = 0;

function initSwipeNavigation() {
    const content = document.getElementById('tab-daily');
    if (!content) return;

    content.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    content.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < threshold) return;

    if (diff > 0) {
        // Swipe left → next day
        enhancedChangeDay(1);
    } else {
        // Swipe right → previous day
        enhancedChangeDay(-1);
    }
}

// ===== INIT ENHANCED DAILY =====
function initEnhancedDaily() {
    initSwipeNavigation();

    // Override day navigation
    const prevBtn = document.getElementById('prev-day');
    const nextBtn = document.getElementById('next-day');
    if (prevBtn) prevBtn.onclick = () => enhancedChangeDay(-1);
    if (nextBtn) nextBtn.onclick = () => enhancedChangeDay(1);
}

// Hook into renderDailyTasks
const _origRenderDailyEnhanced = typeof renderDailyTasks === 'function' ? renderDailyTasks : null;
if (_origRenderDailyEnhanced) {
    const origDailyEnhanced = renderDailyTasks;
    renderDailyTasks = function(day) {
        // Don't call original — replace entirely with enhanced version
        renderEnhancedDailyTasks(day);
        renderStreakCalendar();
        renderDailyChallenge(day);

        // Still handle reflection
        const data = getChallengeData();
        if (data) {
            const reflectionEl = document.getElementById('daily-reflection');
            if (reflectionEl) reflectionEl.value = data.reflections?.[day] || '';
        }

        // Update title
        const dayTasks = typeof getDailyTasks === 'function' ? getDailyTasks(day) : null;
        if (dayTasks) {
            const titleEl = document.getElementById('daily-day-title');
            if (titleEl) titleEl.textContent = `Day ${day}: ${dayTasks.title}`;
        }

        const user = getCurrentUser();
        if (user) {
            const startDate = new Date(user.startDate);
            const dayDate = new Date(startDate.getTime() + (day - 1) * 86400000);
            const dateEl = document.getElementById('daily-date');
            if (dateEl) {
                dateEl.textContent = dayDate.toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                });
            }
        }
    };
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initEnhancedDaily, 500);
});
