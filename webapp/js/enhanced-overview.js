/* ============================================
   ENHANCED OVERVIEW DASHBOARD
   Countdown timer, skill radar, category
   breakdown, recent activity, quick actions,
   streak chart, weekly comparison, greeting
   ============================================ */

function renderEnhancedOverview() {
    const user = getCurrentUser();
    const data = getChallengeData();
    if (!user || !data) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const totalDays = user.challengeDays || 90;
    const currentDay = Math.min(totalDays, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));
    const pct = Math.round((currentDay / totalDays) * 100);

    // Time greeting
    const hour = today.getHours();
    const greetings = hour < 6 ? ['🌙', 'Burning the midnight oil?'] :
        hour < 12 ? ['☀️', 'Good morning! Fresh start.'] :
        hour < 17 ? ['🌤️', 'Good afternoon! Keep coding.'] :
        hour < 21 ? ['🌆', 'Good evening! Finish strong.'] :
        ['🌙', 'Late night grind? Stay focused!'];
    const greetEl = document.getElementById('ov-greeting-emoji');
    const timeEl = document.getElementById('ov-time-greeting');
    if (greetEl) greetEl.textContent = greetings[0];
    if (timeEl) timeEl.textContent = greetings[1];

    // Countdown
    const daysLeft = Math.max(0, totalDays - currentDay);
    const weeksLeft = Math.ceil(daysLeft / 7);
    const setEl = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    setEl('ov-days-left', daysLeft);
    setEl('ov-weeks-left', weeksLeft);
    setEl('ov-pct-done', pct + '%');
    const fill = document.getElementById('ov-countdown-fill');
    if (fill) fill.style.width = pct + '%';

    // XP and Focus stats
    setEl('stat-xp', (data.gamification?.totalXP || 0).toLocaleString());
    setEl('stat-focus', (data.pomodoro?.totalMinutes || 0) > 60 ?
        Math.floor((data.pomodoro?.totalMinutes || 0) / 60) + 'h' :
        (data.pomodoro?.totalMinutes || 0) + 'm');

    // Skill Radar
    renderSkillRadar(data, currentDay, totalDays);

    // Category Breakdown
    renderCategoryBreakdown(data);

    // Recent Activity
    renderRecentActivity(data);

    // What's Next
    renderWhatsNext(currentDay, data, totalDays);

    // Weekly Chart
    renderOVWeeklyChart(data, currentDay);

    // Streak Chart
    renderStreakChart(data, user);

    // Quick Actions
    renderQuickActions();
}

function renderSkillRadar(data, currentDay, totalDays) {
    const container = document.getElementById('ov-skill-radar');
    if (!container) return;

    const cppDone = Object.values(data.roadmapProgress?.cpp || {}).filter(v => v).length;
    const cppTotal = Object.keys(data.roadmapProgress?.cpp || {}).length || 1;
    const pyDone = Object.values(data.roadmapProgress?.python || {}).filter(v => v).length;
    const pyTotal = Object.keys(data.roadmapProgress?.python || {}).length || 1;
    const dsaSolved = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v).length;
    const dsaTarget = 100;
    const fitPct = Math.min(100, Math.round(((data.workoutsDone || 0) / Math.max(currentDay, 1)) * 100));
    const focusPct = Math.min(100, Math.round(((data.pomodoro?.totalMinutes || 0) / (currentDay * 60)) * 100));
    const consistencyPct = Math.min(100, Math.round(((data.bestStreak || 0) / totalDays) * 100));

    const skills = [
        { name: 'C++', pct: Math.round((cppDone / Math.max(cppTotal, 1)) * 100), color: '#6366f1', icon: 'fa-code' },
        { name: 'Python', pct: Math.round((pyDone / Math.max(pyTotal, 1)) * 100), color: '#f59e0b', icon: 'fa-python fab' },
        { name: 'DSA', pct: Math.min(100, Math.round((dsaSolved / dsaTarget) * 100)), color: '#06b6d4', icon: 'fa-sitemap' },
        { name: 'Fitness', pct: fitPct, color: '#10b981', icon: 'fa-dumbbell' },
        { name: 'Focus', pct: focusPct, color: '#a855f7', icon: 'fa-brain' },
        { name: 'Consistency', pct: consistencyPct, color: '#ec4899', icon: 'fa-fire' },
    ];

    container.innerHTML = skills.map(s => `
        <div class="ov-skill-item">
            <div class="ov-skill-header">
                <span><i class="${s.icon.includes('fab') ? s.icon : 'fas ' + s.icon}" style="color:${s.color};margin-right:6px;"></i>${s.name}</span>
                <span style="font-weight:700;color:${s.color};">${s.pct}%</span>
            </div>
            <div class="ov-skill-bar"><div class="ov-skill-fill" style="width:${s.pct}%;background:${s.color};"></div></div>
        </div>
    `).join('');
}

function renderCategoryBreakdown(data) {
    const container = document.getElementById('ov-category-breakdown');
    if (!container) return;

    let cpp = 0, py = 0, dsa = 0, fit = 0;
    Object.values(data.dailyTasks || {}).forEach(day => {
        Object.entries(day || {}).forEach(([k, v]) => {
            if (!v) return;
            if (k.startsWith('cpp')) cpp++;
            else if (k.startsWith('python')) py++;
            else if (k.startsWith('dsa')) dsa++;
            else if (k.startsWith('fitness')) fit++;
        });
    });
    const total = cpp + py + dsa + fit || 1;

    const cats = [
        { name: 'C++', count: cpp, color: '#6366f1', icon: '💻' },
        { name: 'Python', count: py, color: '#f59e0b', icon: '🐍' },
        { name: 'DSA', count: dsa, color: '#06b6d4', icon: '🧩' },
        { name: 'Fitness', count: fit, color: '#10b981', icon: '💪' },
    ];

    container.innerHTML = cats.map(c => {
        const pct = Math.round((c.count / total) * 100);
        return `
            <div class="ov-cat-item" onclick="switchTab('${c.name === 'C++' ? 'cpp' : c.name === 'Python' ? 'python' : c.name.toLowerCase()}')">
                <span class="ov-cat-emoji">${c.icon}</span>
                <div class="ov-cat-info">
                    <span class="ov-cat-name">${c.name}</span>
                    <span class="ov-cat-count">${c.count} tasks</span>
                </div>
                <div class="ov-cat-bar-wrap"><div class="ov-cat-bar" style="width:${pct}%;background:${c.color};"></div></div>
                <span class="ov-cat-pct" style="color:${c.color};">${pct}%</span>
            </div>
        `;
    }).join('');
}

function renderRecentActivity(data) {
    const container = document.getElementById('ov-recent-activity');
    if (!container) return;

    const activities = [];

    // Recent XP
    (data.gamification?.xpHistory || []).slice(-5).reverse().forEach(xp => {
        activities.push({ icon: '⚡', text: `+${xp.amount} XP — ${xp.reason}`, time: xp.date, type: 'xp' });
    });

    // Recent quiz
    (data.quizHistory || []).slice(-2).reverse().forEach(q => {
        activities.push({ icon: '📝', text: `Quiz: ${q.title} — ${q.pct}%`, time: q.date, type: 'quiz' });
    });

    // Recent study session
    (data.studySessions || []).slice(-2).reverse().forEach(s => {
        activities.push({ icon: '📖', text: `${s.topic} — ${s.duration}m`, time: s.date, type: 'study' });
    });

    // Sort by time
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (activities.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No activity yet. Start completing tasks!</p>';
        return;
    }

    container.innerHTML = activities.slice(0, 6).map(a => {
        const d = new Date(a.time);
        const timeStr = d.toLocaleString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `
            <div class="ov-activity-item">
                <span class="ov-activity-icon">${a.icon}</span>
                <span class="ov-activity-text">${escapeHtml(a.text)}</span>
                <span class="ov-activity-time">${timeStr}</span>
            </div>
        `;
    }).join('');
}

function renderWhatsNext(currentDay, data, totalDays) {
    const container = document.getElementById('ov-whats-next');
    if (!container) return;

    const nextDay = Math.min(currentDay + 1, totalDays);
    const dayTasks = typeof getDailyTasks === 'function' ? getDailyTasks(currentDay) : null;
    const nextDayTasks = typeof getDailyTasks === 'function' ? getDailyTasks(nextDay) : null;

    // Count remaining today
    const dayData = data.dailyTasks?.[currentDay] || {};
    const allToday = [...(dayTasks?.cpp || []), ...(dayTasks?.python || []), ...(dayTasks?.dsa || []), ...(dayTasks?.fitness || [])];
    let idx = 0;
    const remaining = [];
    ['cpp', 'python', 'dsa', 'fitness'].forEach(cat => {
        (dayTasks?.[cat] || []).forEach((task, i) => {
            const key = `${cat}_${i}`;
            if (!dayData[key]) remaining.push({ text: task, cat });
        });
    });

    let html = '';

    if (remaining.length > 0) {
        html += `<div class="ov-next-section"><span class="ov-next-label">Today — ${remaining.length} remaining</span>`;
        remaining.slice(0, 4).forEach(t => {
            const colors = { cpp: '#6366f1', python: '#f59e0b', dsa: '#06b6d4', fitness: '#10b981' };
            html += `<div class="ov-next-item"><span class="ov-next-dot" style="background:${colors[t.cat] || '#6366f1'};"></span><span>${escapeHtml(t.text)}</span></div>`;
        });
        if (remaining.length > 4) html += `<div class="ov-next-more">+${remaining.length - 4} more</div>`;
        html += `<button class="btn btn-primary btn-sm" onclick="switchTab('daily')" style="margin-top:8px;"><i class="fas fa-arrow-right"></i> Go to Tasks</button></div>`;
    } else {
        html += `<div class="ov-next-section ov-all-done"><span class="ov-next-emoji">🎉</span><span>All done for today!</span></div>`;
    }

    if (nextDayTasks && nextDay !== currentDay) {
        html += `<div class="ov-next-section" style="margin-top:12px;"><span class="ov-next-label">Tomorrow — Day ${nextDay}: ${nextDayTasks.title}</span>`;
        const preview = [...(nextDayTasks.cpp || []).slice(0, 1), ...(nextDayTasks.dsa || []).slice(0, 1)];
        preview.forEach(t => {
            html += `<div class="ov-next-item"><span class="ov-next-dot" style="background:var(--text-muted);"></span><span style="color:var(--text-muted);">${escapeHtml(t)}</span></div>`;
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

function renderOVWeeklyChart(data, currentDay) {
    const container = document.getElementById('ov-weekly-chart');
    if (!container) return;

    const totalDays = (getCurrentUser()?.challengeDays) || 90;
    const totalWeeks = Math.ceil(totalDays / 7);
    const currentWeek = Math.ceil(currentDay / 7);
    const showWeeks = Math.min(currentWeek, 13);

    const weeks = [];
    for (let w = Math.max(1, currentWeek - showWeeks + 1); w <= currentWeek; w++) {
        let count = 0;
        for (let d = (w - 1) * 7 + 1; d <= Math.min(w * 7, totalDays); d++) {
            const dayData = data.dailyTasks?.[d] || {};
            count += Object.values(dayData).filter(v => v === true).length;
        }
        weeks.push({ week: w, count });
    }

    const maxVal = Math.max(...weeks.map(w => w.count), 1);
    container.innerHTML = weeks.map(w => `
        <div class="chart-bar-wrapper">
            <span class="chart-value">${w.count}</span>
            <div class="chart-bar total-bar" style="height:${Math.max(4, (w.count / maxVal) * 150)}px"></div>
            <span class="chart-label">W${w.week}</span>
        </div>
    `).join('');
}

function renderStreakChart(data, user) {
    const container = document.getElementById('ov-streak-chart');
    if (!container) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const totalDays = user.challengeDays || 90;
    const currentDay = Math.min(totalDays, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));

    // Last 21 days
    const days = [];
    for (let i = 20; i >= 0; i--) {
        const d = currentDay - i;
        if (d < 1) continue;
        const dayData = data.dailyTasks?.[d] || {};
        const count = Object.values(dayData).filter(v => v === true).length;
        days.push({ day: d, count, active: count > 0 });
    }

    const maxCount = Math.max(...days.map(d => d.count), 1);

    container.innerHTML = `
        <div class="ov-streak-bars">
            ${days.map(d => {
                const h = Math.max(4, (d.count / maxCount) * 80);
                const color = d.count >= 7 ? '#10b981' : d.count >= 4 ? '#06b6d4' : d.count > 0 ? '#6366f1' : 'var(--glass-border)';
                return `
                    <div class="ov-streak-col" title="Day ${d.day}: ${d.count} tasks">
                        <div class="ov-streak-bar" style="height:${h}px;background:${color};"></div>
                        <span class="ov-streak-day-label">${d.day}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.7rem;color:var(--text-muted);margin-top:6px;">
            <span>Current: ${data.streak || 0}d</span>
            <span>Best: ${data.bestStreak || 0}d</span>
        </div>
    `;
}

function renderQuickActions() {
    const container = document.getElementById('ov-quick-actions');
    if (!container) return;

    const actions = [
        { icon: 'fa-calendar-day', label: 'Daily Tasks', tab: 'daily', color: '#6366f1' },
        { icon: 'fa-code', label: 'Code Editor', tab: 'editor', color: '#06b6d4' },
        { icon: 'fa-question-circle', label: 'Take Quiz', tab: 'quiz', color: '#f59e0b' },
        { icon: 'fa-clock', label: 'Pomodoro', tab: 'pomodoro', color: '#10b981' },
        { icon: 'fa-sitemap', label: 'DSA Problems', tab: 'dsa', color: '#8b5cf6' },
        { icon: 'fa-layer-group', label: 'Flashcards', tab: 'flashcards', color: '#ec4899' },
        { icon: 'fa-project-diagram', label: 'Visualizer', tab: 'visualizer', color: '#14b8a6' },
        { icon: 'fa-keyboard', label: 'Typing Test', tab: 'typing', color: '#f97316' },
    ];

    container.innerHTML = actions.map(a => `
        <button class="ov-action-btn" onclick="switchTab('${a.tab}')">
            <i class="fas ${a.icon}" style="color:${a.color};"></i>
            <span>${a.label}</span>
        </button>
    `).join('');
}

// ===== INIT =====
const _origInitOV = typeof initDashboard === 'function' ? initDashboard : null;
if (_origInitOV) {
    const origOV = initDashboard;
    initDashboard = function() {
        origOV();
        setTimeout(renderEnhancedOverview, 100);
    };
}
