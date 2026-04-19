/* ============================================
   AUTH MODULE — Registration & Login
   Uses localStorage (upgrade to backend later)
   ============================================ */

// Simple hash for demo purposes (NOT production-grade)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_90days_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Sanitize user input to prevent XSS
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Handle Registration
async function handleRegister(e) {
    e.preventDefault();

    const name = sanitize(document.getElementById('reg-name').value.trim());
    const email = sanitize(document.getElementById('reg-email').value.trim().toLowerCase());
    const password = document.getElementById('reg-password').value;
    const age = parseInt(document.getElementById('reg-age').value);
    const weight = parseFloat(document.getElementById('reg-weight').value);
    const height = parseFloat(document.getElementById('reg-height').value);
    const diet = document.getElementById('reg-diet').value;

    if (!name || !email || !password || !age || !weight || !height || !diet) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('90days_users') || '[]');
    if (users.find(u => u.email === email)) {
        showToast('An account with this email already exists', 'error');
        return;
    }

    const hashedPassword = await hashPassword(password);
    const durationSelect = document.getElementById('reg-duration').value;
    const customDays = parseInt(document.getElementById('reg-custom-days')?.value) || 90;
    const challengeDays = durationSelect === 'custom' ? customDays : parseInt(durationSelect);
    const startDateInput = document.getElementById('reg-start-date').value;
    const startDate = startDateInput || new Date().toISOString().split('T')[0];
    const endDate = new Date(new Date(startDate).getTime() + (challengeDays - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    const user = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        name,
        email,
        password: hashedPassword,
        age,
        weight,
        height,
        diet,
        bmi,
        startDate,
        endDate,
        challengeDays,
        createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem('90days_users', JSON.stringify(users));

    // Initialize challenge data for this user
    initializeChallengeData(user.id, user);

    // Set current session
    localStorage.setItem('90days_current_user', user.id);

    showToast('Account created! Welcome to the challenge!', 'success');
    document.getElementById('register-form').reset();

    setTimeout(() => {
        showPage('dashboard-page');
        initDashboard();
    }, 500);
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('90days_users') || '[]');
    const hashedPassword = await hashPassword(password);
    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (!user) {
        showToast('Invalid email or password', 'error');
        return;
    }

    localStorage.setItem('90days_current_user', user.id);
    showToast(`Welcome back, ${user.name}!`, 'success');
    document.getElementById('login-form').reset();

    setTimeout(() => {
        showPage('dashboard-page');
        initDashboard();
    }, 500);
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('90days_current_user');
    showToast('Logged out successfully', 'info');
    showPage('landing-page');
}

// Get challenge total days for current user
function getChallengeTotalDays() {
    const user = getCurrentUser();
    return user?.challengeDays || 90;
}

// Toggle custom days input
function toggleCustomDays() {
    const sel = document.getElementById('reg-duration');
    const group = document.getElementById('custom-days-group');
    if (sel && group) {
        group.style.display = sel.value === 'custom' ? '' : 'none';
    }
}

// Set default start date to today on page load
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('reg-start-date');
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
});

// Get Current User
function getCurrentUser() {
    const userId = localStorage.getItem('90days_current_user');
    if (!userId) return null;
    const users = JSON.parse(localStorage.getItem('90days_users') || '[]');
    return users.find(u => u.id === userId) || null;
}

// Initialize challenge data for a new user
function initializeChallengeData(userId, user) {
    const data = {
        userId,
        dailyTasks: {},
        roadmapProgress: {
            cpp: {},
            python: {},
            dsa: {}
        },
        reflections: {},
        streak: 0,
        bestStreak: 0,
        totalTasksCompleted: 0,
        problemsSolved: 0,
        workoutsDone: 0,
        lastActiveDate: null
    };
    localStorage.setItem(`90days_data_${userId}`, JSON.stringify(data));
}

// Get challenge data for current user
function getChallengeData() {
    const userId = localStorage.getItem('90days_current_user');
    if (!userId) return null;
    const data = localStorage.getItem(`90days_data_${userId}`);
    return data ? JSON.parse(data) : null;
}

// Save challenge data
function saveChallengeData(data) {
    const userId = localStorage.getItem('90days_current_user');
    if (userId) {
        localStorage.setItem(`90days_data_${userId}`, JSON.stringify(data));
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Reset Challenge
function resetChallenge() {
    if (!confirm('Are you sure? This will reset ALL your progress. This cannot be undone!')) return;
    const user = getCurrentUser();
    if (user) {
        initializeChallengeData(user.id, user);
        showToast('Challenge has been reset', 'info');
        initDashboard();
    }
}

// Check auth on load
function checkAuth() {
    const user = getCurrentUser();
    if (user) {
        showPage('dashboard-page');
        initDashboard();
    }
}

// Auto-check auth on load
document.addEventListener('DOMContentLoaded', checkAuth);
