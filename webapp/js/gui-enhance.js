/* ============================================
   GUI ENHANCEMENT JS
   Particle effects, button ripples,
   sidebar group auto-expand on active tab,
   smooth scroll, loading states
   ============================================ */

// ===== PARTICLE BACKGROUND =====
function initParticles() {
    const container = document.getElementById('dashboard-particles');
    if (!container) return;

    container.innerHTML = '';
    const count = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.05;
        container.appendChild(particle);
    }
}

// ===== BUTTON RIPPLE EFFECT =====
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

// ===== AUTO-EXPAND SIDEBAR GROUP =====
const _origSwitchGUI = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchGUI) {
    const origSwGUI = switchTab;
    switchTab = function(tabName) {
        origSwGUI(tabName);

        // Expand the group containing the active tab
        document.querySelectorAll('.sidebar-group').forEach(group => {
            const hasActiveLink = group.querySelector(`.sidebar-link[data-tab="${tabName}"]`);
            if (hasActiveLink) {
                group.classList.remove('collapsed');
            }
        });
    };
}

// ===== SMOOTH SCROLL ON TAB SWITCH =====
document.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar-link');
    if (link) {
        const content = document.querySelector('.dashboard-content');
        if (content) content.scrollTop = 0;
    }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initParticles, 1000);
});

// Re-init on dashboard load
const _origInitGUI = typeof initDashboard === 'function' ? initDashboard : null;
if (_origInitGUI) {
    const origInitG = initDashboard;
    initDashboard = function() {
        origInitG();
        setTimeout(initParticles, 500);
    };
}
