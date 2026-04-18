/* ============================================
   PROGRESS REPORTS MODULE
   Weekly/Monthly reports, PDF-style summaries,
   Detailed analytics, comparison charts,
   Goal tracking, time distribution
   ============================================ */

// ===== REPORT GENERATOR =====
function generateWeeklyReport(weekNum) {
    const user = getCurrentUser();
    const data = getChallengeData();
    if (!user || !data) return null;

    const startDate = new Date(user.startDate);
    const weekStart = (weekNum - 1) * 7 + 1;
    const weekEnd = Math.min(weekNum * 7, 90);

    let cppTasks = 0, pyTasks = 0, dsaTasks = 0, fitTasks = 0, totalTasks = 0;
    let daysActive = 0;

    for (let d = weekStart; d <= weekEnd; d++) {
        const dayData = data.dailyTasks?.[d] || {};
        const entries = Object.entries(dayData);
        if (entries.some(([, v]) => v)) daysActive++;

        entries.forEach(([key, val]) => {
            if (!val) return;
            totalTasks++;
            if (key.startsWith('cpp')) cppTasks++;
            else if (key.startsWith('python')) pyTasks++;
            else if (key.startsWith('dsa')) dsaTasks++;
            else if (key.startsWith('fitness')) fitTasks++;
        });
    }

    const dsaSolvedTotal = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v).length;
    const reflections = [];
    for (let d = weekStart; d <= weekEnd; d++) {
        if (data.reflections?.[d]) reflections.push({ day: d, text: data.reflections[d] });
    }

    const studySessions = (data.studySessions || []).filter(s => {
        const sDate = new Date(s.date);
        const wsDate = new Date(startDate);
        wsDate.setDate(wsDate.getDate() + weekStart - 1);
        const weDate = new Date(startDate);
        weDate.setDate(weDate.getDate() + weekEnd);
        return sDate >= wsDate && sDate < weDate;
    });

    const studyMinutes = studySessions.reduce((s, sess) => s + sess.duration, 0);
    const pomodoroSessions = data.pomodoro?.dailySessions || {};

    let pomoCount = 0;
    for (let d = weekStart; d <= weekEnd; d++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(dayDate.getDate() + d - 1);
        const key = dayDate.toISOString().split('T')[0];
        pomoCount += pomodoroSessions[key] || 0;
    }

    return {
        weekNum,
        weekStart,
        weekEnd,
        daysActive,
        totalTasks,
        cppTasks,
        pyTasks,
        dsaTasks,
        fitTasks,
        dsaSolvedTotal,
        studyMinutes,
        pomoCount,
        reflections,
        streak: data.bestStreak || data.streak || 0,
        xp: data.gamification?.totalXP || 0,
    };
}

function generateMonthlyReport(month) {
    const reports = [];
    const startWeek = (month - 1) * 4 + 1;
    const endWeek = Math.min(month * 4 + (month === 3 ? 1 : 0), 13);

    for (let w = startWeek; w <= endWeek; w++) {
        reports.push(generateWeeklyReport(w));
    }

    return {
        month,
        phase: month === 1 ? 'Foundations' : month === 2 ? 'Intermediate' : 'Advanced',
        weeks: reports,
        totalTasks: reports.reduce((s, r) => s + (r?.totalTasks || 0), 0),
        totalDaysActive: reports.reduce((s, r) => s + (r?.daysActive || 0), 0),
        totalStudyMinutes: reports.reduce((s, r) => s + (r?.studyMinutes || 0), 0),
        totalPomodoros: reports.reduce((s, r) => s + (r?.pomoCount || 0), 0),
    };
}

function renderProgressReport() {
    const container = document.getElementById('progress-report-content');
    if (!container) return;

    const user = getCurrentUser();
    const data = getChallengeData();
    if (!user || !data) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));
    const currentWeek = Math.ceil(currentDay / 7);

    // Current week report
    const weekReport = generateWeeklyReport(currentWeek);
    if (!weekReport) return;

    // All weeks comparison
    const allWeeks = [];
    for (let w = 1; w <= currentWeek; w++) {
        allWeeks.push(generateWeeklyReport(w));
    }

    // Monthly reports
    const currentMonth = Math.ceil(currentDay / 30);
    const monthReport = generateMonthlyReport(currentMonth);

    // Overall stats
    const totalTasks = Object.values(data.dailyTasks || {}).reduce((sum, day) =>
        sum + Object.values(day || {}).filter(v => v === true).length, 0);
    const dsaSolved = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v).length;
    const cppDone = Object.values(data.roadmapProgress?.cpp || {}).filter(v => v).length;
    const cppTotal = Object.keys(data.roadmapProgress?.cpp || {}).length || 1;
    const pyDone = Object.values(data.roadmapProgress?.python || {}).filter(v => v).length;
    const pyTotal = Object.keys(data.roadmapProgress?.python || {}).length || 1;

    container.innerHTML = `
        <!-- Overall Summary -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-chart-pie"></i> Overall Progress — Day ${currentDay}/90</h3>
            <div class="report-stats-grid">
                <div class="report-stat">
                    <span class="report-stat-value">${currentDay}</span>
                    <span class="report-stat-label">Days In</span>
                </div>
                <div class="report-stat">
                    <span class="report-stat-value">${totalTasks}</span>
                    <span class="report-stat-label">Tasks Done</span>
                </div>
                <div class="report-stat">
                    <span class="report-stat-value">${dsaSolved}</span>
                    <span class="report-stat-label">DSA Solved</span>
                </div>
                <div class="report-stat">
                    <span class="report-stat-value">${data.bestStreak || 0}</span>
                    <span class="report-stat-label">Best Streak</span>
                </div>
                <div class="report-stat">
                    <span class="report-stat-value">${data.workoutsDone || 0}</span>
                    <span class="report-stat-label">Workouts</span>
                </div>
                <div class="report-stat">
                    <span class="report-stat-value">${data.gamification?.totalXP || 0}</span>
                    <span class="report-stat-label">Total XP</span>
                </div>
            </div>
        </div>

        <!-- Roadmap Progress Bars -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-road"></i> Roadmap Completion</h3>
            <div class="report-roadmap-bars">
                ${renderReportBar('C++', cppDone, Math.max(cppTotal, cppDone), '#6366f1')}
                ${renderReportBar('Python', pyDone, Math.max(pyTotal, pyDone), '#f59e0b')}
                ${renderReportBar('DSA', dsaSolved, 100, '#06b6d4')}
                ${renderReportBar('Challenge', currentDay, 90, '#10b981')}
            </div>
        </div>

        <!-- Weekly Trend Chart -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-chart-line"></i> Weekly Tasks Trend</h3>
            <div class="report-chart">
                ${allWeeks.map((w, i) => {
                    const maxTasks = Math.max(...allWeeks.map(wk => wk?.totalTasks || 0), 1);
                    const height = w ? Math.max(4, (w.totalTasks / maxTasks) * 150) : 4;
                    return `
                        <div class="report-chart-bar-wrap">
                            <span class="report-chart-val">${w?.totalTasks || 0}</span>
                            <div class="report-chart-bar" style="height:${height}px;background:var(--gradient);"></div>
                            <span class="report-chart-label">W${i + 1}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Category Distribution -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-th"></i> Category Distribution (All Time)</h3>
            <div class="report-distribution">
                ${renderDistributionItem('C++', allWeeks.reduce((s, w) => s + (w?.cppTasks || 0), 0), totalTasks, '#6366f1')}
                ${renderDistributionItem('Python', allWeeks.reduce((s, w) => s + (w?.pyTasks || 0), 0), totalTasks, '#f59e0b')}
                ${renderDistributionItem('DSA', allWeeks.reduce((s, w) => s + (w?.dsaTasks || 0), 0), totalTasks, '#06b6d4')}
                ${renderDistributionItem('Fitness', allWeeks.reduce((s, w) => s + (w?.fitTasks || 0), 0), totalTasks, '#10b981')}
            </div>
        </div>

        <!-- Current Week Detail -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-calendar-week"></i> Week ${currentWeek} Report (Day ${weekReport.weekStart}-${weekReport.weekEnd})</h3>
            <div class="report-week-detail">
                <div class="report-week-stat"><span class="val">${weekReport.daysActive}</span><span class="lbl">Days Active</span></div>
                <div class="report-week-stat"><span class="val">${weekReport.totalTasks}</span><span class="lbl">Tasks</span></div>
                <div class="report-week-stat"><span class="val">${weekReport.cppTasks}</span><span class="lbl">C++</span></div>
                <div class="report-week-stat"><span class="val">${weekReport.pyTasks}</span><span class="lbl">Python</span></div>
                <div class="report-week-stat"><span class="val">${weekReport.dsaTasks}</span><span class="lbl">DSA</span></div>
                <div class="report-week-stat"><span class="val">${weekReport.fitTasks}</span><span class="lbl">Fitness</span></div>
                <div class="report-week-stat"><span class="val">${weekReport.pomoCount}</span><span class="lbl">Pomodoros</span></div>
                <div class="report-week-stat"><span class="val">${Math.round(weekReport.studyMinutes / 60)}h</span><span class="lbl">Study Time</span></div>
            </div>
        </div>

        <!-- Week-over-Week Comparison -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-exchange-alt"></i> Week-over-Week Comparison</h3>
            <div class="report-comparison">
                ${allWeeks.length >= 2 ? renderWeekComparison(allWeeks[allWeeks.length - 2], allWeeks[allWeeks.length - 1]) :
                    '<p style="color:var(--text-muted);font-size:0.85rem;">Need 2+ weeks of data for comparison.</p>'}
            </div>
        </div>

        <!-- Reflections -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-pen-fancy"></i> Week ${currentWeek} Reflections</h3>
            ${weekReport.reflections.length > 0 ?
                weekReport.reflections.map(r => `
                    <div class="report-reflection">
                        <strong>Day ${r.day}:</strong>
                        <p>${escapeHtml(r.text)}</p>
                    </div>
                `).join('') :
                '<p style="color:var(--text-muted);font-size:0.85rem;">No reflections this week. Write one on the Daily Tasks page!</p>'
            }
        </div>

        <!-- Recommendations -->
        <div class="report-section">
            <h3 class="report-section-title"><i class="fas fa-lightbulb"></i> Recommendations</h3>
            <div class="report-recommendations">
                ${generateRecommendations(weekReport, data, currentDay)}
            </div>
        </div>
    `;
}

function renderReportBar(label, value, total, color) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
    return `
        <div class="report-bar-item">
            <div class="report-bar-header">
                <span>${label}</span>
                <span>${value} / ${total} (${pct}%)</span>
            </div>
            <div class="report-bar-track">
                <div class="report-bar-fill" style="width:${pct}%;background:${color};"></div>
            </div>
        </div>
    `;
}

function renderDistributionItem(label, count, total, color) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return `
        <div class="report-dist-item">
            <div class="report-dist-color" style="background:${color};"></div>
            <span class="report-dist-label">${label}</span>
            <span class="report-dist-count">${count} tasks</span>
            <span class="report-dist-pct">${pct}%</span>
            <div class="report-dist-bar-wrap">
                <div class="report-dist-bar" style="width:${pct}%;background:${color};"></div>
            </div>
        </div>
    `;
}

function renderWeekComparison(prevWeek, currWeek) {
    if (!prevWeek || !currWeek) return '';

    function delta(curr, prev) {
        const diff = curr - prev;
        const icon = diff > 0 ? '↑' : diff < 0 ? '↓' : '→';
        const cls = diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral';
        return `<span class="report-delta ${cls}">${icon} ${Math.abs(diff)}</span>`;
    }

    return `
        <div class="report-compare-table">
            <div class="report-compare-row header">
                <span>Metric</span><span>Week ${prevWeek.weekNum}</span><span>Week ${currWeek.weekNum}</span><span>Change</span>
            </div>
            <div class="report-compare-row"><span>Total Tasks</span><span>${prevWeek.totalTasks}</span><span>${currWeek.totalTasks}</span>${delta(currWeek.totalTasks, prevWeek.totalTasks)}</div>
            <div class="report-compare-row"><span>Days Active</span><span>${prevWeek.daysActive}</span><span>${currWeek.daysActive}</span>${delta(currWeek.daysActive, prevWeek.daysActive)}</div>
            <div class="report-compare-row"><span>C++ Tasks</span><span>${prevWeek.cppTasks}</span><span>${currWeek.cppTasks}</span>${delta(currWeek.cppTasks, prevWeek.cppTasks)}</div>
            <div class="report-compare-row"><span>Python Tasks</span><span>${prevWeek.pyTasks}</span><span>${currWeek.pyTasks}</span>${delta(currWeek.pyTasks, prevWeek.pyTasks)}</div>
            <div class="report-compare-row"><span>DSA Tasks</span><span>${prevWeek.dsaTasks}</span><span>${currWeek.dsaTasks}</span>${delta(currWeek.dsaTasks, prevWeek.dsaTasks)}</div>
            <div class="report-compare-row"><span>Fitness</span><span>${prevWeek.fitTasks}</span><span>${currWeek.fitTasks}</span>${delta(currWeek.fitTasks, prevWeek.fitTasks)}</div>
            <div class="report-compare-row"><span>Pomodoros</span><span>${prevWeek.pomoCount}</span><span>${currWeek.pomoCount}</span>${delta(currWeek.pomoCount, prevWeek.pomoCount)}</div>
        </div>
    `;
}

function generateRecommendations(weekReport, data, currentDay) {
    const recs = [];

    if (weekReport.daysActive < 5) {
        recs.push({ icon: '📅', text: `You were active ${weekReport.daysActive}/7 days. Try to show up every day — consistency beats intensity!` });
    }
    if (weekReport.dsaTasks < 7) {
        recs.push({ icon: '🧩', text: `Only ${weekReport.dsaTasks} DSA tasks this week. Aim for at least 1 problem per day.` });
    }
    if (weekReport.fitTasks < 3) {
        recs.push({ icon: '💪', text: `Only ${weekReport.fitTasks} fitness tasks. Physical activity improves cognitive performance by 20%!` });
    }
    if (weekReport.pomoCount < 5) {
        recs.push({ icon: '🍅', text: `Try more Pomodoro sessions. Deep focus blocks (25-45 min) boost productivity.` });
    }
    if (!weekReport.reflections.length) {
        recs.push({ icon: '📝', text: 'Write daily reflections! They help consolidate learning and track progress.' });
    }
    if (weekReport.cppTasks === 0 && currentDay <= 60) {
        recs.push({ icon: '💻', text: 'No C++ tasks this week. Balance both languages for stronger fundamentals.' });
    }
    if (weekReport.pyTasks === 0 && currentDay <= 60) {
        recs.push({ icon: '🐍', text: 'No Python tasks this week. Keep practicing both languages!' });
    }
    if ((data.water?.[new Date().toISOString().split('T')[0]] || 0) < 8) {
        recs.push({ icon: '💧', text: 'Hit your daily water goal (8 glasses). Dehydration reduces focus.' });
    }
    if (recs.length === 0) {
        recs.push({ icon: '🌟', text: 'Excellent week! Keep this momentum going. You are doing great!' });
    }

    return recs.map(r => `
        <div class="report-rec-item">
            <span class="report-rec-icon">${r.icon}</span>
            <span class="report-rec-text">${r.text}</span>
        </div>
    `).join('');
}

// ===== EXPORT REPORT AS TEXT =====
function exportReport() {
    const user = getCurrentUser();
    const data = getChallengeData();
    if (!user || !data) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(90, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));
    const currentWeek = Math.ceil(currentDay / 7);
    const report = generateWeeklyReport(currentWeek);

    const totalTasks = Object.values(data.dailyTasks || {}).reduce((sum, day) =>
        sum + Object.values(day || {}).filter(v => v === true).length, 0);
    const dsaSolved = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v).length;

    const text = `
═══════════════════════════════════════════════
  90 DAYS CHALLENGE — PROGRESS REPORT
  ${user.name} | Week ${currentWeek} | Day ${currentDay}/90
  Generated: ${today.toLocaleDateString()}
═══════════════════════════════════════════════

OVERALL PROGRESS
─────────────────
  Days Completed:    ${currentDay} / 90 (${Math.round(currentDay/90*100)}%)
  Total Tasks Done:  ${totalTasks}
  DSA Problems:      ${dsaSolved}
  Best Streak:       ${data.bestStreak || 0} days
  Workouts:          ${data.workoutsDone || 0}
  Total XP:          ${data.gamification?.totalXP || 0}
  Level:             ${typeof calculateLevelFromXP === 'function' ? calculateLevelFromXP(data.gamification?.totalXP || 0).level : '?'}

WEEK ${currentWeek} BREAKDOWN
─────────────────
  Days Active:       ${report?.daysActive || 0} / 7
  C++ Tasks:         ${report?.cppTasks || 0}
  Python Tasks:      ${report?.pyTasks || 0}
  DSA Tasks:         ${report?.dsaTasks || 0}
  Fitness Tasks:     ${report?.fitTasks || 0}
  Pomodoro Sessions: ${report?.pomoCount || 0}
  Study Time:        ${Math.round((report?.studyMinutes || 0) / 60)} hours

REFLECTIONS
─────────────────
${(report?.reflections || []).map(r => `  Day ${r.day}: ${r.text}`).join('\n') || '  No reflections this week.'}

═══════════════════════════════════════════════
  #90DaysChallenge | Keep going!
═══════════════════════════════════════════════
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `90days_report_week${currentWeek}_${today.toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Report downloaded!', 'success');
}

// ===== PRINT REPORT =====
function printReport() {
    window.print();
}

// ===== INIT =====
const _origSwitchReport = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchReport) {
    const origSwReport = switchTab;
    switchTab = function(tabName) {
        origSwReport(tabName);
        if (tabName === 'reports') {
            document.getElementById('topbar-title').textContent = 'Progress Reports';
            renderProgressReport();
        }
    };
}
