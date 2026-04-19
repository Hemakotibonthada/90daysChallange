/* ============================================
   APP MODULE — Dashboard Logic & Rendering
   ============================================ */

let currentViewDay = 1;

// ===== Page Navigation =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');

    // Show/hide bottom nav
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = pageId === 'dashboard-page' ? '' : 'none';
    }
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('active');
}

// ===== Sidebar Toggle =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');

    // Handle overlay
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.addEventListener('click', toggleSidebar);
        document.getElementById('dashboard-page').appendChild(overlay);
    }
    overlay.classList.toggle('active');
}

// ===== Tab Switching =====
function switchTab(tabName) {
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById(`tab-${tabName}`);
    if (tab) tab.classList.add('active');

    // Update sidebar links
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll(`.sidebar-link[data-tab="${tabName}"]`).forEach(l => l.classList.add('active'));

    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`.bottom-nav-item[data-tab="${tabName}"]`).forEach(b => b.classList.add('active'));

    // Update topbar title
    const titles = {
        overview: 'Overview', daily: 'Daily Tasks', cpp: 'C++ Roadmap',
        python: 'Python Roadmap', dsa: 'DSA Problems', fitness: 'Fitness',
        diet: 'Diet Plan', profile: 'Profile'
    };
    document.getElementById('topbar-title').textContent = titles[tabName] || 'Dashboard';

    // Close mobile sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) toggleSidebar();
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// ===== Initialize Dashboard =====
function initDashboard() {
    const user = getCurrentUser();
    if (!user) return;

    const data = getChallengeData();
    if (!data) return;

    // Calculate current day
    const startDate = new Date(user.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    const totalDays = user.challengeDays || 90;
    const currentDay = Math.min(totalDays, Math.max(1, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1));
    currentViewDay = currentDay;

    // Update streak
    updateStreak(data, currentDay);

    // Render everything
    renderOverview(user, data, currentDay);
    renderDailyTasks(currentViewDay);
    renderRoadmap('cpp', cppRoadmap, data);
    renderRoadmap('python', pythonRoadmap, data);
    renderDSA(data);
    renderFitness(user, data, currentDay);
    renderDiet(user);
    renderProfile(user, data, currentDay);
    renderHeatmap(data);

    // Animate stats
    animateCounters();
}

// ===== Update Streak =====
function updateStreak(data, currentDay) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (data.lastActiveDate === today) {
        // Already active today
    } else if (data.lastActiveDate === yesterday) {
        data.streak = (data.streak || 0) + 1;
    } else if (data.lastActiveDate && data.lastActiveDate !== today) {
        data.streak = 0;
    }

    data.bestStreak = Math.max(data.bestStreak || 0, data.streak || 0);
}

// ===== Render Overview =====
function renderOverview(user, data, currentDay) {
    // User name
    const firstName = user.name.split(' ')[0];
    document.getElementById('user-name-display').textContent = firstName;
    document.getElementById('user-avatar').textContent = firstName.charAt(0).toUpperCase();

    // Day display
    const totalDays = user.challengeDays || 90;
    const phaseDivide = Math.floor(totalDays / 3);
    const phase = currentDay <= phaseDivide ? 'Phase 1: Foundations' : currentDay <= phaseDivide * 2 ? 'Phase 2: Intermediate' : 'Phase 3: Advanced';
    document.getElementById('day-display').textContent = `Day ${currentDay} of ${totalDays} — ${phase}`;

    // Progress ring
    const percent = Math.round((currentDay / totalDays) * 100);
    document.getElementById('progress-percent').textContent = `${percent}%`;
    const ring = document.getElementById('main-progress-ring');
    if (ring) {
        const circumference = 326.7;
        const offset = circumference - (percent / 100) * circumference;
        setTimeout(() => {
            ring.style.strokeDashoffset = offset;
            ring.style.stroke = '#6366f1';
        }, 300);
    }

    // Stats
    const completedTasks = Object.values(data.dailyTasks || {}).reduce((sum, day) => {
        return sum + Object.values(day || {}).filter(v => v === true).length;
    }, 0);

    const solvedProblems = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v === true).length;
    const workoutsDone = data.workoutsDone || 0;

    document.getElementById('stat-days').textContent = Math.max(0, currentDay - 1);
    document.getElementById('stat-problems').textContent = solvedProblems;
    document.getElementById('stat-streak').textContent = data.streak || 0;
    document.getElementById('stat-workouts').textContent = workoutsDone;
    document.getElementById('streak-count').textContent = data.streak || 0;

    // Phase progress (dynamic based on challenge duration)
    const td = totalDays;
    const p1End = Math.floor(td / 3);
    const p2End = Math.floor(td * 2 / 3);
    const phase1Tasks = countPhaseTasks(data, 1, p1End);
    const phase2Tasks = countPhaseTasks(data, p1End + 1, p2End);
    const phase3Tasks = countPhaseTasks(data, p2End + 1, td);

    updatePhaseBar('phase1', phase1Tasks);
    updatePhaseBar('phase2', phase2Tasks);
    updatePhaseBar('phase3', phase3Tasks);

    // Quick tasks
    renderQuickTasks(currentDay, data);
}

function countPhaseTasks(data, startDay, endDay) {
    let total = 0, completed = 0;
    for (let d = startDay; d <= endDay; d++) {
        const dayTasks = getDailyTasks(d);
        const allTasks = [...(dayTasks.cpp || []), ...(dayTasks.python || []), ...(dayTasks.dsa || []), ...(dayTasks.fitness || [])];
        total += allTasks.length;
        const dayData = data.dailyTasks?.[d] || {};
        completed += Object.values(dayData).filter(v => v === true).length;
    }
    return { total, completed };
}

function updatePhaseBar(phase, { total, completed }) {
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById(`${phase}-percent`).textContent = `${pct}%`;
    setTimeout(() => {
        document.getElementById(`${phase}-bar`).style.width = `${pct}%`;
    }, 500);
}

function renderQuickTasks(day, data) {
    const container = document.getElementById('quick-tasks');
    const dayTasks = getDailyTasks(day);
    const dayData = data.dailyTasks?.[day] || {};

    const allTasks = [
        ...(dayTasks.cpp || []).map(t => ({ text: t, cat: 'cpp' })),
        ...(dayTasks.python || []).map(t => ({ text: t, cat: 'python' })),
        ...(dayTasks.dsa || []).map(t => ({ text: t, cat: 'dsa' })),
        ...(dayTasks.fitness || []).map(t => ({ text: t, cat: 'fitness' })),
    ].slice(0, 6);

    container.innerHTML = allTasks.map((task, i) => {
        const key = `${task.cat}_${i}`;
        const checked = dayData[key] ? 'checked' : '';
        const completedClass = dayData[key] ? 'completed' : '';
        return `
            <div class="quick-task ${completedClass}">
                <input type="checkbox" class="task-checkbox" ${checked}
                    onchange="toggleQuickTask(${day}, '${key}', this.checked)">
                <span class="task-text">${escapeHtml(task.text)}</span>
            </div>
        `;
    }).join('');
}

function toggleQuickTask(day, key, checked) {
    const data = getChallengeData();
    if (!data.dailyTasks[day]) data.dailyTasks[day] = {};
    data.dailyTasks[day][key] = checked;
    data.lastActiveDate = new Date().toISOString().split('T')[0];
    saveChallengeData(data);
    // Refresh overview
    const user = getCurrentUser();
    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(user.challengeDays || 90, Math.max(1, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1));
    renderOverview(user, data, currentDay);
    renderHeatmap(data);
}

// ===== Render Daily Tasks =====
function renderDailyTasks(day) {
    const data = getChallengeData();
    const dayTasks = getDailyTasks(day);
    const dayData = data?.dailyTasks?.[day] || {};

    document.getElementById('daily-day-title').textContent = `Day ${day}: ${dayTasks.title}`;

    const user = getCurrentUser();
    const startDate = new Date(user.startDate);
    const dayDate = new Date(startDate.getTime() + (day - 1) * 86400000);
    document.getElementById('daily-date').textContent = dayDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const container = document.getElementById('daily-tasks-container');
    const categories = [
        { key: 'cpp', name: 'C++', icon: 'fa-code', color: '#6366f1', tasks: dayTasks.cpp || [] },
        { key: 'python', name: 'Python', icon: 'fa-python fab', color: '#f59e0b', tasks: dayTasks.python || [] },
        { key: 'dsa', name: 'DSA', icon: 'fa-sitemap', color: '#06b6d4', tasks: dayTasks.dsa || [] },
        { key: 'fitness', name: 'Fitness', icon: 'fa-dumbbell', color: '#10b981', tasks: dayTasks.fitness || [] },
    ];

    container.innerHTML = categories.map(cat => {
        const completedCount = cat.tasks.filter((_, i) => dayData[`${cat.key}_${i}`]).length;
        return `
            <div class="task-category">
                <div class="task-category-header" onclick="this.parentElement.classList.toggle('open'); this.parentElement.querySelector('.task-list').style.display = this.parentElement.classList.contains('open') ? 'block' : 'none'">
                    <div class="task-category-title">
                        <div class="task-category-icon" style="background: ${cat.color}">
                            <i class="${cat.icon.includes('fab') ? cat.icon : 'fas ' + cat.icon}"></i>
                        </div>
                        <span>${cat.name}</span>
                    </div>
                    <span class="task-category-count">${completedCount}/${cat.tasks.length}</span>
                </div>
                <div class="task-list" style="display: block;">
                    ${cat.tasks.map((task, i) => {
                        const key = `${cat.key}_${i}`;
                        const checked = dayData[key] ? 'checked' : '';
                        const completed = dayData[key] ? 'completed' : '';
                        return `
                            <div class="task-item ${completed}">
                                <input type="checkbox" class="task-checkbox" ${checked}
                                    onchange="toggleDailyTask(${day}, '${key}', this.checked)">
                                <span class="task-text">${escapeHtml(task)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    // Load reflection
    const reflection = data?.reflections?.[day] || '';
    document.getElementById('daily-reflection').value = reflection;
}

function toggleDailyTask(day, key, checked) {
    const data = getChallengeData();
    if (!data.dailyTasks[day]) data.dailyTasks[day] = {};
    data.dailyTasks[day][key] = checked;
    data.lastActiveDate = new Date().toISOString().split('T')[0];

    // Count fitness tasks for workout tracking
    if (key.startsWith('fitness') && checked) {
        data.workoutsDone = (data.workoutsDone || 0) + 1;
    } else if (key.startsWith('fitness') && !checked) {
        data.workoutsDone = Math.max(0, (data.workoutsDone || 0) - 1);
    }

    saveChallengeData(data);
    renderDailyTasks(day);

    // Update overview stats
    const user = getCurrentUser();
    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(user.challengeDays || 90, Math.max(1, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1));
    renderOverview(user, data, currentDay);
    renderHeatmap(data);
}

function changeDay(delta) {
    currentViewDay = Math.max(1, Math.min(getChallengeTotalDays(), currentViewDay + delta));
    renderDailyTasks(currentViewDay);
}

function saveReflection() {
    const data = getChallengeData();
    const text = document.getElementById('daily-reflection').value.trim();
    if (!data.reflections) data.reflections = {};
    data.reflections[currentViewDay] = text;
    saveChallengeData(data);
    showToast('Reflection saved!', 'success');
}

// ===== Render Roadmap =====
function renderRoadmap(type, roadmapData, data) {
    const container = document.getElementById(`${type}-roadmap-content`);
    const progress = data.roadmapProgress?.[type] || {};
    let totalItems = 0, completedItems = 0;

    container.innerHTML = Object.entries(roadmapData).map(([section, items]) => {
        totalItems += items.length;
        const sectionCompleted = items.filter((_, i) => progress[`${section}_${i}`]).length;
        completedItems += sectionCompleted;

        return `
            <div class="roadmap-section">
                <div class="roadmap-section-header" onclick="this.parentElement.classList.toggle('open')">
                    <h3><i class="fas fa-folder" style="color: var(--accent-1)"></i> ${section}</h3>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span class="task-category-count">${sectionCompleted}/${items.length}</span>
                        <i class="fas fa-chevron-down chevron"></i>
                    </div>
                </div>
                <div class="roadmap-section-body">
                    <div class="roadmap-items">
                        ${items.map((item, i) => {
                            const key = `${section}_${i}`;
                            const checked = progress[key] ? 'checked' : '';
                            const completed = progress[key] ? 'completed' : '';
                            return `
                                <div class="task-item ${completed}">
                                    <input type="checkbox" class="task-checkbox" ${checked}
                                        onchange="toggleRoadmapItem('${type}', '${escapeAttr(key)}', this.checked)">
                                    <span class="task-text">${escapeHtml(item)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    document.getElementById(`${type}-progress-text`).textContent = `${completedItems} / ${totalItems} completed`;
    setTimeout(() => {
        document.getElementById(`${type}-progress-bar`).style.width = `${pct}%`;
    }, 300);
}

function toggleRoadmapItem(type, key, checked) {
    const data = getChallengeData();
    if (!data.roadmapProgress[type]) data.roadmapProgress[type] = {};
    data.roadmapProgress[type][key] = checked;
    data.lastActiveDate = new Date().toISOString().split('T')[0];
    saveChallengeData(data);

    // Re-render
    const roadmapData = type === 'cpp' ? cppRoadmap : pythonRoadmap;
    renderRoadmap(type, roadmapData, data);
}

// ===== Render DSA =====
function renderDSA(data) {
    const container = document.getElementById('dsa-content');
    const dsaProgress = data.roadmapProgress?.dsa || {};
    let easyCount = 0, mediumCount = 0, hardCount = 0, totalSolved = 0;

    container.innerHTML = Object.entries(dsaProblems).map(([topic, problems]) => {
        const topicSolved = problems.filter((_, i) => dsaProgress[`${topic}_${i}`]).length;

        return `
            <div class="roadmap-section">
                <div class="roadmap-section-header" onclick="this.parentElement.classList.toggle('open')">
                    <h3><i class="fas fa-puzzle-piece" style="color: var(--accent-3)"></i> ${topic}</h3>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span class="task-category-count">${topicSolved}/${problems.length}</span>
                        <i class="fas fa-chevron-down chevron"></i>
                    </div>
                </div>
                <div class="roadmap-section-body">
                    <div class="roadmap-items">
                        ${problems.map((prob, i) => {
                            const key = `${topic}_${i}`;
                            const checked = dsaProgress[key] ? 'checked' : '';
                            const completed = dsaProgress[key] ? 'completed' : '';
                            if (dsaProgress[key]) {
                                totalSolved++;
                                if (prob.difficulty === 'easy') easyCount++;
                                else if (prob.difficulty === 'medium') mediumCount++;
                                else hardCount++;
                            }
                            return `
                                <div class="dsa-problem ${completed}">
                                    <input type="checkbox" class="task-checkbox" ${checked}
                                        onchange="toggleDSAProblem('${escapeAttr(topic)}', ${i}, this.checked)">
                                    <span class="dsa-difficulty ${prob.difficulty}">${prob.difficulty}</span>
                                    <span class="task-text">${escapeHtml(prob.name)}</span>
                                    <a href="https://leetcode.com/problems/" target="_blank" rel="noopener" style="margin-left:auto;font-size:0.75rem;color:var(--text-muted);">
                                        #${prob.leetcode}
                                    </a>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('dsa-easy').textContent = easyCount;
    document.getElementById('dsa-medium').textContent = mediumCount;
    document.getElementById('dsa-hard').textContent = hardCount;
    document.getElementById('dsa-total').textContent = totalSolved;
}

function toggleDSAProblem(topic, index, checked) {
    const data = getChallengeData();
    if (!data.roadmapProgress.dsa) data.roadmapProgress.dsa = {};
    data.roadmapProgress.dsa[`${topic}_${index}`] = checked;
    data.lastActiveDate = new Date().toISOString().split('T')[0];
    saveChallengeData(data);
    renderDSA(data);

    // Update overview
    const user = getCurrentUser();
    const startDate = new Date(user.startDate);
    const today = new Date();
    const currentDay = Math.min(user.challengeDays || 90, Math.max(1, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1));
    renderOverview(user, data, currentDay);
}

// ===== Render Fitness =====
function renderFitness(user, data, currentDay) {
    const fitness = getFitnessForDay(currentDay);

    // Today's workout
    const todayContainer = document.getElementById('fitness-today-content');
    todayContainer.innerHTML = `
        <p style="color:var(--text-muted);margin-bottom:12px;font-size:0.85rem;">${fitness.phase} — ${fitness.tip}</p>
        ${fitness.workout.map(w => `
            <div class="workout-item">
                <div class="workout-icon"><i class="fas ${w.icon}"></i></div>
                <div>
                    <div style="font-weight:600;">${w.exercise}</div>
                    <div style="color:var(--text-muted);font-size:0.85rem;">${w.duration}</div>
                </div>
            </div>
        `).join('')}
    `;

    // Body stats
    const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);
    const bodyStats = document.getElementById('body-stats');
    bodyStats.innerHTML = `
        <div class="body-stat-card">
            <span class="value">${user.weight} kg</span>
            <span class="label">Weight</span>
        </div>
        <div class="body-stat-card">
            <span class="value">${user.height} cm</span>
            <span class="label">Height</span>
        </div>
        <div class="body-stat-card">
            <span class="value">${bmi}</span>
            <span class="label">BMI</span>
        </div>
        <div class="body-stat-card">
            <span class="value">${data.workoutsDone || 0}</span>
            <span class="label">Workouts</span>
        </div>
    `;

    // Fitness plan
    const fitnessContainer = document.getElementById('fitness-plan-content');
    const milestones = [
        { day: 30, pushups: '3x12', squats: '3x15', plank: '20 sec', run: '2-3 km' },
        { day: 60, pushups: '4x15', squats: '4x20', plank: '45 sec', run: '4 km' },
        { day: 90, pushups: '4x20+', squats: '4x25+', plank: '90 sec', run: '5 km' },
    ];

    fitnessContainer.innerHTML = `
        <div class="card">
            <h3 class="card-title"><i class="fas fa-bullseye"></i> Target Milestones</h3>
            <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                    <thead>
                        <tr style="border-bottom:1px solid var(--glass-border);">
                            <th style="padding:10px;text-align:left;color:var(--text-muted);">Milestone</th>
                            <th style="padding:10px;text-align:center;color:var(--text-muted);">Push-ups</th>
                            <th style="padding:10px;text-align:center;color:var(--text-muted);">Squats</th>
                            <th style="padding:10px;text-align:center;color:var(--text-muted);">Plank</th>
                            <th style="padding:10px;text-align:center;color:var(--text-muted);">Run</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${milestones.map(m => `
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
                                <td style="padding:10px;font-weight:600;">Day ${m.day}</td>
                                <td style="padding:10px;text-align:center;">${m.pushups}</td>
                                <td style="padding:10px;text-align:center;">${m.squats}</td>
                                <td style="padding:10px;text-align:center;">${m.plank}</td>
                                <td style="padding:10px;text-align:center;">${m.run}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===== Render Diet =====
function renderDiet(user) {
    const container = document.getElementById('diet-content');
    const dietType = user.diet || 'vegetarian';
    const meals = getDietPlan(dietType);

    const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);
    const bmr = Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age + 5);
    const tdee = Math.round(bmr * 1.55);
    const protein = Math.round(user.weight * 1.8);
    const calories = tdee;

    container.innerHTML = `
        <div class="card">
            <h3 class="card-title"><i class="fas fa-calculator"></i> Your Macros</h3>
            <div class="macro-grid">
                <div class="macro-card">
                    <span class="value" style="color:var(--accent-1);">${calories}</span>
                    <span class="label">Calories</span>
                </div>
                <div class="macro-card">
                    <span class="value" style="color:var(--success);">${protein}g</span>
                    <span class="label">Protein</span>
                </div>
                <div class="macro-card">
                    <span class="value" style="color:var(--warning);">${Math.round(calories * 0.5 / 4)}g</span>
                    <span class="label">Carbs</span>
                </div>
                <div class="macro-card">
                    <span class="value" style="color:var(--accent-3);">${Math.round(calories * 0.25 / 9)}g</span>
                    <span class="label">Fats</span>
                </div>
                <div class="macro-card">
                    <span class="value">${bmi}</span>
                    <span class="label">BMI</span>
                </div>
                <div class="macro-card">
                    <span class="value">3L+</span>
                    <span class="label">Water</span>
                </div>
            </div>
        </div>

        ${renderMealCard('Breakfast (7:00 AM)', 'fa-sun', meals.breakfast)}
        ${renderMealCard('Mid-Morning Snack (10:00 AM)', 'fa-apple-whole', meals.snacks)}
        ${renderMealCard('Lunch (1:00 PM)', 'fa-bowl-food', meals.lunch)}
        ${renderMealCard('Dinner (8:00 PM)', 'fa-moon', meals.dinner)}

        <div class="card">
            <h3 class="card-title"><i class="fas fa-lightbulb"></i> Tips</h3>
            <div style="color:var(--text-secondary);font-size:0.9rem;line-height:1.8;">
                <p>• Never skip breakfast — it fuels your coding session</p>
                <p>• Eat protein in every meal</p>
                <p>• Drink water before meals</p>
                <p>• 1 cheat meal per week is OK!</p>
                <p>• Sleep 7-8 hours for recovery</p>
                ${dietType === 'vegetarian' ? '<p>• <strong>Important:</strong> Get Vitamin B12 levels checked</p>' : ''}
            </div>
        </div>
    `;
}

function renderMealCard(title, icon, meals) {
    return `
        <div class="meal-card">
            <h3><i class="fas ${icon}" style="color:var(--accent-1)"></i> ${title}</h3>
            ${meals.map((m, i) => `
                <div class="meal-option">
                    <span style="color:var(--text-muted);flex-shrink:0;">${i + 1}.</span>
                    <span>${escapeHtml(m.meal)}</span>
                    <span class="protein-tag">${m.protein}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== Render Profile =====
function renderProfile(user, data, currentDay) {
    const firstName = user.name.split(' ')[0];
    document.getElementById('profile-avatar').textContent = firstName.charAt(0).toUpperCase();
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-day').textContent = currentDay;
    document.getElementById('profile-streak').textContent = data.bestStreak || 0;

    const totalTasks = Object.values(data.dailyTasks || {}).reduce((sum, day) => {
        return sum + Object.values(day || {}).filter(v => v === true).length;
    }, 0);
    document.getElementById('profile-total').textContent = totalTasks;

    document.getElementById('profile-start').textContent = new Date(user.startDate).toLocaleDateString();
    document.getElementById('profile-end').textContent = new Date(user.endDate).toLocaleDateString();
    document.getElementById('profile-weight').textContent = `${user.weight} kg`;
    document.getElementById('profile-height').textContent = `${user.height} cm`;
    document.getElementById('profile-diet').textContent = user.diet.charAt(0).toUpperCase() + user.diet.slice(1);

    // Challenge duration
    const durationEl = document.getElementById('profile-duration');
    if (durationEl) durationEl.textContent = `${user.challengeDays || 90} Days`;
}

// ===== Render Heatmap =====
function renderHeatmap(data) {
    const container = document.getElementById('heatmap');
    const user = getCurrentUser();
    if (!user) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    container.innerHTML = '';
    const totalDaysHM = user.challengeDays || 90;
    for (let d = 0; d < totalDaysHM; d++) {
        const cellDate = new Date(startDate.getTime() + d * 86400000);
        const day = d + 1;
        const dayData = data.dailyTasks?.[day] || {};
        const completedCount = Object.values(dayData).filter(v => v === true).length;

        let level = '';
        if (completedCount > 0) level = 'level-1';
        if (completedCount >= 3) level = 'level-2';
        if (completedCount >= 5) level = 'level-3';
        if (completedCount >= 7) level = 'level-4';

        const isToday = cellDate.toDateString() === today.toDateString() ? 'today' : '';

        const cell = document.createElement('div');
        cell.className = `heatmap-cell ${level} ${isToday}`;
        cell.title = `Day ${day}: ${completedCount} tasks done`;
        cell.addEventListener('click', () => {
            currentViewDay = day;
            switchTab('daily');
            renderDailyTasks(day);
        });
        container.appendChild(cell);
    }
}

// ===== Animate Counters =====
function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const step = Math.max(1, Math.floor(target / 30));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 40);
    });
}

// ===== Utility =====
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeAttr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ===== Landing page counter animation on scroll =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (entry.target.querySelectorAll('[data-count]').length) {
                animateCounters();
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step, .hero-stats').forEach(el => {
    observer.observe(el);
});
