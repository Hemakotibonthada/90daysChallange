/* ============================================
   GAMIFICATION MODULE
   XP System, Levels, Achievements, Daily Rewards,
   Badges, Leaderboard, Challenges, Rewards Shop,
   Streaks, Milestones, Progress Animations
   ============================================ */

// ===== XP SYSTEM =====
const XP_CONFIG = {
    taskComplete: 10,
    dsaProblemSolved: 25,
    quizPassed: 50,
    quizPerfect: 100,
    dailyAllTasks: 30,
    streakDay: 15,
    streakWeek: 100,
    streakMonth: 500,
    reflectionWritten: 5,
    noteCreated: 5,
    pomodoroComplete: 20,
    workoutDone: 15,
    waterGoalMet: 10,
    flashcardMastered: 5,
    codeSnippetSaved: 5,
    storyShared: 15,
    habitCompleted: 10,
    resourceAdded: 5,
    phaseComplete: 500,
    challengeComplete: 2000,
    firstLogin: 50,
    profileSetup: 25,
    weeklyGoalMet: 75,
};

const LEVEL_CONFIG = {
    baseXP: 100,
    multiplier: 1.5,
    maxLevel: 100,
};

function calculateLevelFromXP(totalXP) {
    let level = 1;
    let xpForLevel = LEVEL_CONFIG.baseXP;
    let xpAccumulated = 0;

    while (xpAccumulated + xpForLevel <= totalXP && level < LEVEL_CONFIG.maxLevel) {
        xpAccumulated += xpForLevel;
        level++;
        xpForLevel = Math.floor(LEVEL_CONFIG.baseXP * Math.pow(LEVEL_CONFIG.multiplier, level - 1));
    }

    return {
        level,
        currentXP: totalXP - xpAccumulated,
        xpForNextLevel: xpForLevel,
        totalXP,
        progress: (totalXP - xpAccumulated) / xpForLevel,
    };
}

function getLevelTitle(level) {
    const titles = {
        1: 'Beginner',
        5: 'Apprentice',
        10: 'Student',
        15: 'Learner',
        20: 'Practitioner',
        25: 'Developer',
        30: 'Coder',
        35: 'Programmer',
        40: 'Engineer',
        45: 'Expert',
        50: 'Master',
        55: 'Grandmaster',
        60: 'Legend',
        65: 'Mythic',
        70: 'Transcendent',
        75: 'Immortal',
        80: 'Divine',
        85: 'Cosmic',
        90: 'Galactic',
        95: 'Universal',
        100: 'Infinity',
    };

    let title = 'Beginner';
    for (const [lvl, t] of Object.entries(titles)) {
        if (level >= parseInt(lvl)) title = t;
    }
    return title;
}

function getLevelColor(level) {
    if (level >= 90) return '#ffd700';
    if (level >= 70) return '#a855f7';
    if (level >= 50) return '#ef4444';
    if (level >= 30) return '#f59e0b';
    if (level >= 15) return '#06b6d4';
    return '#10b981';
}

function getLevelIcon(level) {
    if (level >= 90) return '👑';
    if (level >= 70) return '💎';
    if (level >= 50) return '🏆';
    if (level >= 30) return '⭐';
    if (level >= 15) return '🌟';
    if (level >= 5) return '🔥';
    return '🌱';
}

function awardXP(amount, reason) {
    const data = getChallengeData();
    if (!data) return;

    if (!data.gamification) {
        data.gamification = {
            totalXP: 0,
            xpHistory: [],
            dailyRewards: {},
            unlockedBadges: [],
            shopPurchases: [],
            challenges: [],
            milestones: [],
        };
    }

    const oldLevel = calculateLevelFromXP(data.gamification.totalXP);
    data.gamification.totalXP += amount;
    const newLevel = calculateLevelFromXP(data.gamification.totalXP);

    data.gamification.xpHistory.push({
        amount,
        reason,
        date: new Date().toISOString(),
        totalAfter: data.gamification.totalXP,
    });

    if (data.gamification.xpHistory.length > 500) {
        data.gamification.xpHistory = data.gamification.xpHistory.slice(-500);
    }

    saveChallengeData(data);

    showXPToast(amount, reason);

    if (newLevel.level > oldLevel.level) {
        showLevelUpAnimation(newLevel.level);
    }

    checkMilestones(data);
    updateGamificationUI();
}

function showXPToast(amount, reason) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast xp-toast';
    toast.innerHTML = `
        <span class="xp-amount">+${amount} XP</span>
        <span class="xp-reason">${reason}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showLevelUpAnimation(newLevel) {
    const title = getLevelTitle(newLevel);
    const icon = getLevelIcon(newLevel);

    const overlay = document.createElement('div');
    overlay.className = 'level-up-overlay';
    overlay.innerHTML = `
        <div class="level-up-card">
            <div class="level-up-icon">${icon}</div>
            <h2 class="level-up-title">Level Up!</h2>
            <div class="level-up-number">Level ${newLevel}</div>
            <div class="level-up-subtitle">${title}</div>
            <button class="btn btn-primary" onclick="this.closest('.level-up-overlay').remove()">
                <i class="fas fa-check"></i> Awesome!
            </button>
        </div>
    `;
    document.body.appendChild(overlay);

    if (typeof launchConfetti === 'function') launchConfetti();

    setTimeout(() => {
        if (overlay.parentNode) overlay.remove();
    }, 10000);
}

// ===== ACHIEVEMENTS / BADGES =====
const BADGES = [
    { id: 'first_step', name: 'First Step', icon: '🚀', description: 'Complete your first task', condition: (d) => getTotalTasks(d) >= 1 },
    { id: 'getting_started', name: 'Getting Started', icon: '🌱', description: 'Complete 10 tasks', condition: (d) => getTotalTasks(d) >= 10 },
    { id: 'on_fire', name: 'On Fire', icon: '🔥', description: '7 day streak', condition: (d) => (d.gamification?.streak || d.bestStreak || 0) >= 7 },
    { id: 'two_weeks', name: 'Two Weeks Strong', icon: '💪', description: '14 day streak', condition: (d) => (d.gamification?.streak || d.bestStreak || 0) >= 14 },
    { id: 'monthly_warrior', name: 'Monthly Warrior', icon: '⚔️', description: '30 day streak', condition: (d) => (d.gamification?.streak || d.bestStreak || 0) >= 30 },
    { id: 'dsa_beginner', name: 'DSA Beginner', icon: '🧩', description: 'Solve 5 DSA problems', condition: (d) => getDSASolved(d) >= 5 },
    { id: 'dsa_intermediate', name: 'Problem Solver', icon: '🧠', description: 'Solve 25 DSA problems', condition: (d) => getDSASolved(d) >= 25 },
    { id: 'dsa_advanced', name: 'Algorithm Master', icon: '⚡', description: 'Solve 50 DSA problems', condition: (d) => getDSASolved(d) >= 50 },
    { id: 'dsa_expert', name: 'DSA Expert', icon: '🌟', description: 'Solve 100 DSA problems', condition: (d) => getDSASolved(d) >= 100 },
    { id: 'centurion', name: 'Centurion', icon: '💯', description: 'Complete 100 tasks', condition: (d) => getTotalTasks(d) >= 100 },
    { id: 'task_machine', name: 'Task Machine', icon: '⚙️', description: 'Complete 250 tasks', condition: (d) => getTotalTasks(d) >= 250 },
    { id: 'unstoppable', name: 'Unstoppable', icon: '🏆', description: 'Complete 500 tasks', condition: (d) => getTotalTasks(d) >= 500 },
    { id: 'phase1_done', name: 'Phase 1 Complete', icon: '🎯', description: 'Finish Phase 1 (Day 30)', condition: (d) => getActiveDays(d) >= 30 },
    { id: 'phase2_done', name: 'Phase 2 Complete', icon: '🏅', description: 'Finish Phase 2 (Day 60)', condition: (d) => getActiveDays(d) >= 60 },
    { id: 'challenge_done', name: '90 Day Legend', icon: '👑', description: 'Complete the 90 Day Challenge', condition: (d) => getActiveDays(d) >= 90 },
    { id: 'quiz_master', name: 'Quiz Master', icon: '📝', description: 'Score 100% on any quiz', condition: (d) => (d.quizHistory || []).some(q => q.pct === 100) },
    { id: 'quiz_addict', name: 'Quiz Addict', icon: '📚', description: 'Take 10 quizzes', condition: (d) => (d.quizHistory || []).length >= 10 },
    { id: 'focus_master', name: 'Focus Master', icon: '🍅', description: 'Complete 25 Pomodoro sessions', condition: (d) => (d.pomodoro?.sessions || 0) >= 25 },
    { id: 'deep_work', name: 'Deep Worker', icon: '🧘', description: 'Accumulate 10 hours of focus time', condition: (d) => (d.pomodoro?.totalMinutes || 0) >= 600 },
    { id: 'hydrated', name: 'Hydration Hero', icon: '💧', description: 'Hit water goal 7 days in a row', condition: (d) => checkConsecutiveWater(d, 7) },
    { id: 'well_rested', name: 'Well Rested', icon: '😴', description: 'Log 7+ hours of sleep for 7 days', condition: (d) => checkConsecutiveSleep(d, 7) },
    { id: 'note_taker', name: 'Note Taker', icon: '📝', description: 'Create 10 notes', condition: (d) => (d.notes || []).length >= 10 },
    { id: 'code_warrior', name: 'Code Warrior', icon: '⌨️', description: 'Save 20 code snippets', condition: (d) => (d.snippets || []).length >= 20 },
    { id: 'social_butterfly', name: 'Social Butterfly', icon: '🦋', description: 'Share 5 story cards', condition: (d) => (d.sharedStories || []).length >= 5 },
    { id: 'habit_former', name: 'Habit Former', icon: '🔄', description: 'Create 5 habits', condition: (d) => (d.habits || []).length >= 5 },
    { id: 'xp_hunter', name: 'XP Hunter', icon: '💰', description: 'Earn 1,000 XP', condition: (d) => (d.gamification?.totalXP || 0) >= 1000 },
    { id: 'xp_collector', name: 'XP Collector', icon: '💎', description: 'Earn 5,000 XP', condition: (d) => (d.gamification?.totalXP || 0) >= 5000 },
    { id: 'xp_millionaire', name: 'XP Millionaire', icon: '🤑', description: 'Earn 10,000 XP', condition: (d) => (d.gamification?.totalXP || 0) >= 10000 },
    { id: 'level_10', name: 'Double Digits', icon: '🔟', description: 'Reach Level 10', condition: (d) => calculateLevelFromXP(d.gamification?.totalXP || 0).level >= 10 },
    { id: 'level_25', name: 'Quarter Century', icon: '🏛️', description: 'Reach Level 25', condition: (d) => calculateLevelFromXP(d.gamification?.totalXP || 0).level >= 25 },
    { id: 'level_50', name: 'Half Way Hero', icon: '🦸', description: 'Reach Level 50', condition: (d) => calculateLevelFromXP(d.gamification?.totalXP || 0).level >= 50 },
    { id: 'early_bird', name: 'Early Bird', icon: '🐦', description: 'Complete a task before 7 AM', condition: (d) => d.gamification?.earlyBird || false },
    { id: 'night_owl', name: 'Night Owl', icon: '🦉', description: 'Complete a task after 11 PM', condition: (d) => d.gamification?.nightOwl || false },
    { id: 'perfectionist', name: 'Perfectionist', icon: '✨', description: 'Complete all tasks in a single day', condition: (d) => d.gamification?.perfectDay || false },
    { id: 'collector', name: 'Collector', icon: '🎒', description: 'Unlock 15 badges', condition: (d) => (d.gamification?.unlockedBadges || []).length >= 15 },
    { id: 'completionist', name: 'Completionist', icon: '🎪', description: 'Unlock 25 badges', condition: (d) => (d.gamification?.unlockedBadges || []).length >= 25 },
];

function getTotalTasks(data) {
    return Object.values(data.dailyTasks || {}).reduce((sum, day) =>
        sum + Object.values(day || {}).filter(v => v === true).length, 0);
}

function getDSASolved(data) {
    return Object.values(data.roadmapProgress?.dsa || {}).filter(v => v === true).length;
}

function getActiveDays(data) {
    return Object.keys(data.dailyTasks || {}).length;
}

function checkConsecutiveWater(data, days) {
    if (!data.water) return false;
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        if ((data.water[key] || 0) < 8) return false;
    }
    return true;
}

function checkConsecutiveSleep(data, days) {
    if (!data.sleep) return false;
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        if ((data.sleep[key] || 0) < 7) return false;
    }
    return true;
}

function checkBadges() {
    const data = getChallengeData();
    if (!data) return;

    if (!data.gamification) {
        data.gamification = { totalXP: 0, xpHistory: [], unlockedBadges: [], dailyRewards: {}, shopPurchases: [], challenges: [], milestones: [] };
    }

    const unlocked = data.gamification.unlockedBadges || [];
    let newBadges = [];

    BADGES.forEach(badge => {
        if (!unlocked.includes(badge.id) && badge.condition(data)) {
            unlocked.push(badge.id);
            newBadges.push(badge);
        }
    });

    data.gamification.unlockedBadges = unlocked;
    saveChallengeData(data);

    newBadges.forEach(badge => {
        showBadgeUnlocked(badge);
        awardXP(50, `Badge: ${badge.name}`);
    });
}

function showBadgeUnlocked(badge) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast badge-toast';
    toast.innerHTML = `
        <span class="badge-icon-large">${badge.icon}</span>
        <div>
            <strong>Badge Unlocked!</strong>
            <div style="font-size:0.8rem;opacity:0.8;">${badge.name} — ${badge.description}</div>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// ===== DAILY REWARDS =====
const DAILY_REWARDS = [
    { day: 1, reward: '🎁', xp: 25, name: 'Welcome Gift' },
    { day: 2, reward: '⭐', xp: 30, name: 'Day 2 Star' },
    { day: 3, reward: '🔥', xp: 35, name: 'Hat Trick' },
    { day: 4, reward: '💎', xp: 40, name: 'Gem Drop' },
    { day: 5, reward: '🎯', xp: 50, name: 'Bullseye' },
    { day: 6, reward: '🌟', xp: 60, name: 'Shining Star' },
    { day: 7, reward: '🏆', xp: 100, name: 'Weekly Champion' },
];

function claimDailyReward() {
    const data = getChallengeData();
    if (!data || !data.gamification) return;

    const today = new Date().toISOString().split('T')[0];
    if (data.gamification.dailyRewards[today]) {
        showToast('Already claimed today\'s reward!', 'info');
        return;
    }

    const consecutive = calculateConsecutiveLogins(data);
    const rewardIndex = (consecutive - 1) % DAILY_REWARDS.length;
    const reward = DAILY_REWARDS[rewardIndex];

    data.gamification.dailyRewards[today] = {
        claimed: true,
        reward: reward.name,
        xp: reward.xp,
    };
    saveChallengeData(data);

    awardXP(reward.xp, `Daily Reward: ${reward.name}`);
    showToast(`${reward.reward} Daily reward claimed! +${reward.xp} XP`, 'success');

    if (typeof launchConfetti === 'function' && consecutive % 7 === 0) {
        launchConfetti();
    }

    renderDailyRewardCalendar();
}

function calculateConsecutiveLogins(data) {
    const rewards = data.gamification?.dailyRewards || {};
    let count = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        if (rewards[key]) {
            count++;
        } else if (i > 0) {
            break;
        }
    }

    return Math.max(1, count);
}

function renderDailyRewardCalendar() {
    const container = document.getElementById('daily-reward-calendar');
    if (!container) return;

    const data = getChallengeData();
    const today = new Date().toISOString().split('T')[0];
    const claimed = data?.gamification?.dailyRewards?.[today]?.claimed;
    const consecutive = calculateConsecutiveLogins(data);

    container.innerHTML = DAILY_REWARDS.map((r, i) => {
        const isActive = (consecutive - 1) % DAILY_REWARDS.length === i && !claimed;
        const isDone = i < (consecutive % DAILY_REWARDS.length) || (claimed && i <= (consecutive - 1) % DAILY_REWARDS.length);
        return `
            <div class="daily-reward-item ${isDone ? 'claimed' : ''} ${isActive ? 'active' : ''}">
                <div class="daily-reward-icon">${r.reward}</div>
                <div class="daily-reward-day">Day ${r.day}</div>
                <div class="daily-reward-xp">+${r.xp} XP</div>
                ${isDone ? '<i class="fas fa-check daily-reward-check"></i>' : ''}
            </div>
        `;
    }).join('');
}

// ===== CHALLENGES =====
const WEEKLY_CHALLENGES = [
    { id: 'wc1', name: 'Speed Demon', description: 'Solve 5 DSA problems in one day', icon: '⚡', xp: 200, condition: (d) => false },
    { id: 'wc2', name: 'Code Marathon', description: 'Complete 3 Pomodoro sessions in one day', icon: '🏃', xp: 150, condition: (d) => false },
    { id: 'wc3', name: 'Full Stack', description: 'Write code in both C++ and Python today', icon: '🥞', xp: 100, condition: (d) => false },
    { id: 'wc4', name: 'Knowledge Seeker', description: 'Score 80%+ on any quiz', icon: '📖', xp: 150, condition: (d) => (d.quizHistory || []).some(q => q.pct >= 80) },
    { id: 'wc5', name: 'Iron Will', description: 'Complete all tasks for 3 consecutive days', icon: '🦾', xp: 250, condition: (d) => false },
    { id: 'wc6', name: 'Memory Master', description: 'Master 10 flashcards in one session', icon: '🧠', xp: 100, condition: (d) => false },
    { id: 'wc7', name: 'Wellness Warrior', description: 'Hit water + sleep + workout goals today', icon: '🌿', xp: 150, condition: (d) => false },
    { id: 'wc8', name: 'Note Ninja', description: 'Create 3 notes in one day', icon: '🥷', xp: 100, condition: (d) => false },
];

function renderWeeklyChallenges() {
    const container = document.getElementById('weekly-challenges');
    if (!container) return;

    const data = getChallengeData();
    const completed = data?.gamification?.completedChallenges || [];

    container.innerHTML = WEEKLY_CHALLENGES.map(c => {
        const isDone = completed.includes(c.id);
        return `
            <div class="challenge-card ${isDone ? 'completed' : ''}">
                <div class="challenge-icon">${c.icon}</div>
                <div class="challenge-info">
                    <h4>${c.name}</h4>
                    <p>${c.description}</p>
                </div>
                <div class="challenge-reward">
                    ${isDone ? '<i class="fas fa-check-circle" style="color:var(--success);font-size:1.5rem;"></i>' : `<span class="challenge-xp">+${c.xp} XP</span>`}
                </div>
            </div>
        `;
    }).join('');
}

// ===== MILESTONES =====
function checkMilestones(data) {
    if (!data.gamification) return;
    const xp = data.gamification.totalXP;
    const milestones = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

    milestones.forEach(m => {
        if (xp >= m && !(data.gamification.milestones || []).includes(m)) {
            if (!data.gamification.milestones) data.gamification.milestones = [];
            data.gamification.milestones.push(m);
            showToast(`🎉 Milestone: ${m.toLocaleString()} XP reached!`, 'success');
        }
    });

    saveChallengeData(data);
}

// ===== REWARDS SHOP =====
const SHOP_ITEMS = [
    { id: 'theme_gold', name: 'Gold Theme', description: 'Unlock golden card theme', cost: 500, icon: '🌟', type: 'theme' },
    { id: 'theme_rainbow', name: 'Rainbow Theme', description: 'Unlock rainbow card theme', cost: 750, icon: '🌈', type: 'theme' },
    { id: 'badge_custom', name: 'Custom Badge', description: 'Create a custom profile badge', cost: 1000, icon: '🎨', type: 'badge' },
    { id: 'title_ninja', name: 'Ninja Title', description: 'Unlock "Code Ninja" title', cost: 300, icon: '🥷', type: 'title' },
    { id: 'title_wizard', name: 'Wizard Title', description: 'Unlock "Code Wizard" title', cost: 300, icon: '🧙', type: 'title' },
    { id: 'title_samurai', name: 'Samurai Title', description: 'Unlock "Digital Samurai" title', cost: 500, icon: '⚔️', type: 'title' },
    { id: 'xp_boost_2x', name: '2x XP Boost', description: 'Double XP for 24 hours', cost: 400, icon: '⚡', type: 'boost' },
    { id: 'streak_shield', name: 'Streak Shield', description: 'Protect your streak for 1 missed day', cost: 600, icon: '🛡️', type: 'utility' },
    { id: 'confetti_pack', name: 'Extra Confetti', description: 'Celebratory confetti on every task', cost: 200, icon: '🎊', type: 'cosmetic' },
    { id: 'sound_pack', name: 'Sound Effects', description: 'Enable completion sound effects', cost: 250, icon: '🔊', type: 'cosmetic' },
];

function renderShop() {
    const container = document.getElementById('rewards-shop');
    if (!container) return;

    const data = getChallengeData();
    const xp = data?.gamification?.totalXP || 0;
    const purchased = data?.gamification?.shopPurchases || [];

    container.innerHTML = SHOP_ITEMS.map(item => {
        const owned = purchased.includes(item.id);
        const canAfford = xp >= item.cost;
        return `
            <div class="shop-item ${owned ? 'owned' : ''} ${!canAfford && !owned ? 'locked' : ''}">
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="shop-item-action">
                    ${owned ? '<span class="shop-owned">Owned ✓</span>' :
                        `<button class="btn btn-primary btn-sm" ${!canAfford ? 'disabled' : ''} onclick="purchaseItem('${item.id}')">
                            ${item.cost} XP
                        </button>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

function purchaseItem(itemId) {
    const data = getChallengeData();
    if (!data || !data.gamification) return;

    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (data.gamification.totalXP < item.cost) {
        showToast('Not enough XP!', 'error');
        return;
    }

    if ((data.gamification.shopPurchases || []).includes(itemId)) {
        showToast('Already owned!', 'info');
        return;
    }

    data.gamification.totalXP -= item.cost;
    if (!data.gamification.shopPurchases) data.gamification.shopPurchases = [];
    data.gamification.shopPurchases.push(itemId);
    saveChallengeData(data);

    showToast(`${item.icon} ${item.name} purchased!`, 'success');
    renderShop();
    updateGamificationUI();
}

// ===== LEADERBOARD (Simulated) =====
const SIMULATED_PLAYERS = [
    { name: 'CodeMaster_42', level: 35, xp: 8750, streak: 42, problems: 87, avatar: '🦊' },
    { name: 'PythonPro', level: 28, xp: 5200, streak: 28, problems: 65, avatar: '🐍' },
    { name: 'AlgoNinja', level: 42, xp: 12000, streak: 60, problems: 120, avatar: '🥷' },
    { name: 'DSA_Queen', level: 38, xp: 9500, streak: 38, problems: 95, avatar: '👸' },
    { name: 'ByteWarrior', level: 22, xp: 3800, streak: 22, problems: 45, avatar: '⚔️' },
    { name: 'StackOverflow', level: 45, xp: 14000, streak: 65, problems: 140, avatar: '📚' },
    { name: 'BugHunter', level: 18, xp: 2500, streak: 15, problems: 30, avatar: '🐛' },
    { name: 'CppWizard', level: 30, xp: 6500, streak: 30, problems: 70, avatar: '🧙' },
    { name: 'RecursionKing', level: 25, xp: 4500, streak: 20, problems: 55, avatar: '🔄' },
    { name: 'FullStackDev', level: 33, xp: 7800, streak: 35, problems: 80, avatar: '🏗️' },
];

function renderLeaderboard() {
    const container = document.getElementById('leaderboard');
    if (!container) return;

    const user = getCurrentUser();
    const data = getChallengeData();

    const myEntry = {
        name: user?.name || 'You',
        level: calculateLevelFromXP(data?.gamification?.totalXP || 0).level,
        xp: data?.gamification?.totalXP || 0,
        streak: data?.bestStreak || data?.streak || 0,
        problems: getDSASolved(data || {}),
        avatar: '🔥',
        isMe: true,
    };

    const allPlayers = [...SIMULATED_PLAYERS, myEntry].sort((a, b) => b.xp - a.xp);

    container.innerHTML = allPlayers.map((p, i) => {
        const rank = i + 1;
        const rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
        return `
            <div class="leaderboard-row ${p.isMe ? 'is-me' : ''}">
                <div class="lb-rank">${rankIcon}</div>
                <div class="lb-avatar">${p.avatar}</div>
                <div class="lb-info">
                    <div class="lb-name">${escapeHtml(p.name)} ${p.isMe ? '<span class="lb-you-badge">You</span>' : ''}</div>
                    <div class="lb-meta">Lv.${p.level} • ${p.problems} problems • ${p.streak}d streak</div>
                </div>
                <div class="lb-xp">${p.xp.toLocaleString()} XP</div>
            </div>
        `;
    }).join('');
}

// ===== GAMIFICATION UI UPDATE =====
function updateGamificationUI() {
    const data = getChallengeData();
    if (!data) return;

    const xp = data.gamification?.totalXP || 0;
    const levelInfo = calculateLevelFromXP(xp);

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

    setEl('gam-level', levelInfo.level);
    setEl('gam-title', getLevelTitle(levelInfo.level));
    setEl('gam-xp', xp.toLocaleString());
    setEl('gam-xp-next', `${levelInfo.currentXP} / ${levelInfo.xpForNextLevel}`);
    setEl('gam-level-icon', getLevelIcon(levelInfo.level));

    const bar = document.getElementById('gam-xp-bar');
    if (bar) bar.style.width = `${Math.round(levelInfo.progress * 100)}%`;

    const badges = data.gamification?.unlockedBadges || [];
    setEl('gam-badges-count', `${badges.length} / ${BADGES.length}`);

    renderBadgesGrid();
    renderDailyRewardCalendar();
    renderWeeklyChallenges();
    renderShop();
    renderLeaderboard();
    renderXPHistory();
}

function renderBadgesGrid() {
    const container = document.getElementById('badges-grid');
    if (!container) return;

    const data = getChallengeData();
    const unlocked = data?.gamification?.unlockedBadges || [];

    container.innerHTML = BADGES.map(badge => {
        const isUnlocked = unlocked.includes(badge.id);
        return `
            <div class="badge-item ${isUnlocked ? 'unlocked' : 'locked'}" title="${badge.description}">
                <span class="badge-icon">${badge.icon}</span>
                <span class="badge-name">${badge.name}</span>
            </div>
        `;
    }).join('');
}

function renderXPHistory() {
    const container = document.getElementById('xp-history');
    if (!container) return;

    const data = getChallengeData();
    const history = (data?.gamification?.xpHistory || []).slice(-20).reverse();

    if (history.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No XP earned yet. Start completing tasks!</p>';
        return;
    }

    container.innerHTML = history.map(h => {
        const date = new Date(h.date).toLocaleString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return `
            <div class="xp-history-item">
                <span class="xp-history-amount">+${h.amount}</span>
                <span class="xp-history-reason">${h.reason}</span>
                <span class="xp-history-date">${date}</span>
            </div>
        `;
    }).join('');
}

// ===== INIT =====
function initGamification() {
    const data = getChallengeData();
    if (!data) return;

    if (!data.gamification) {
        data.gamification = {
            totalXP: 0,
            xpHistory: [],
            dailyRewards: {},
            unlockedBadges: [],
            shopPurchases: [],
            challenges: [],
            milestones: [],
            completedChallenges: [],
        };
        saveChallengeData(data);
    }

    checkBadges();
    updateGamificationUI();
}

// Hook into dashboard
const _origInitGam = typeof initDashboard === 'function' ? initDashboard : null;
if (_origInitGam) {
    const origGam = initDashboard;
    initDashboard = function() {
        origGam();
        setTimeout(initGamification, 200);
    };
}

// Hook into tab switching
const _origSwitchGam = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchGam) {
    const origSwGam = switchTab;
    switchTab = function(tabName) {
        origSwGam(tabName);
        if (tabName === 'gamification') {
            const el = document.getElementById('topbar-title');
            if (el) el.textContent = 'Gamification';
            updateGamificationUI();
        }
    };
}
