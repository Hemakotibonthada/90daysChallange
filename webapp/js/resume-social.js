/* ============================================
   RESUME BUILDER MODULE
   Generate a tech resume from challenge
   progress data, customizable sections,
   export as formatted text
   ============================================ */

// ===== RESUME DATA =====
const RESUME_TEMPLATES = {
    modern: { name: 'Modern', color: '#6366f1' },
    classic: { name: 'Classic', color: '#1e293b' },
    creative: { name: 'Creative', color: '#ec4899' },
};

const SKILL_LEVELS = {
    beginner: { label: 'Beginner', pct: 25, color: '#06b6d4' },
    intermediate: { label: 'Intermediate', pct: 50, color: '#f59e0b' },
    advanced: { label: 'Advanced', pct: 75, color: '#10b981' },
    expert: { label: 'Expert', pct: 100, color: '#6366f1' },
};

function getResumeData() {
    const data = getChallengeData();
    const user = getCurrentUser();
    if (!data || !user) return null;

    if (!data.resume) {
        const dsaSolved = Object.values(data.roadmapProgress?.dsa || {}).filter(v => v).length;
        const cppDone = Object.values(data.roadmapProgress?.cpp || {}).filter(v => v).length;
        const pyDone = Object.values(data.roadmapProgress?.python || {}).filter(v => v).length;
        const totalTasks = Object.values(data.dailyTasks || {}).reduce((sum, day) =>
            sum + Object.values(day || {}).filter(v => v === true).length, 0);

        data.resume = {
            name: user.name,
            title: 'Software Developer',
            email: user.email,
            phone: '',
            location: '',
            linkedin: '',
            github: 'github.com/Hemakotibonthada',
            portfolio: '',
            summary: `Dedicated software developer who completed a rigorous 90-day coding challenge. Proficient in C++ and Python with strong DSA problem-solving skills. Solved ${dsaSolved}+ LeetCode problems and completed ${totalTasks}+ learning tasks.`,
            skills: {
                languages: [
                    { name: 'C++', level: cppDone > 20 ? 'advanced' : cppDone > 10 ? 'intermediate' : 'beginner' },
                    { name: 'Python', level: pyDone > 20 ? 'advanced' : pyDone > 10 ? 'intermediate' : 'beginner' },
                    { name: 'JavaScript', level: 'beginner' },
                ],
                concepts: ['Data Structures', 'Algorithms', 'OOP', 'Problem Solving', 'Time Complexity Analysis'],
                tools: ['Git', 'VS Code', 'LeetCode', 'Linux/Terminal'],
                soft: ['Self-discipline', 'Consistency', 'Analytical Thinking', 'Quick Learning'],
            },
            education: [
                { degree: 'B.Tech / B.E. in Computer Science', school: 'Your University', year: '2020-2024', gpa: '' },
            ],
            experience: [
                {
                    title: '90-Day Coding Challenge',
                    company: 'Self-Directed Learning',
                    duration: 'Apr 2026 - Jul 2026',
                    bullets: [
                        `Solved ${dsaSolved}+ DSA problems across arrays, trees, graphs, DP, and more`,
                        `Completed ${totalTasks}+ structured learning tasks in C++ and Python`,
                        'Built a full-stack web application with 15K+ lines of code',
                        'Maintained a consistent study streak with daily coding practice',
                        'Implemented and analyzed 6+ sorting and searching algorithms',
                    ],
                },
            ],
            projects: [
                {
                    name: '90 Days Challenge Web App',
                    tech: 'HTML, CSS, JavaScript',
                    description: 'Built a comprehensive learning platform with 30+ features including algorithm visualizer, code editor, quiz system, gamification, and progress tracking.',
                    link: 'https://github.com/Hemakotibonthada/90daysChallange',
                },
            ],
            certifications: [],
            achievements: [
                `Solved ${dsaSolved}+ DSA problems on LeetCode`,
                `Completed ${totalTasks}+ tasks in 90-day challenge`,
                `Built 2 projects from scratch`,
                `Maintained ${data.bestStreak || 0}-day coding streak`,
            ],
            template: 'modern',
        };
        saveChallengeData(data);
    }

    return data.resume;
}

function renderResumeBuilder() {
    const resume = getResumeData();
    if (!resume) return;

    renderResumeForm(resume);
    renderResumePreview(resume);
}

function renderResumeForm(resume) {
    const container = document.getElementById('resume-form');
    if (!container) return;

    container.innerHTML = `
        <div class="resume-form-section">
            <h4><i class="fas fa-user"></i> Personal Info</h4>
            <div class="resume-form-grid">
                <div class="form-group"><label>Full Name</label><input type="text" id="res-name" value="${escapeHtml(resume.name)}" onchange="updateResume()"></div>
                <div class="form-group"><label>Title</label><input type="text" id="res-title" value="${escapeHtml(resume.title)}" onchange="updateResume()"></div>
                <div class="form-group"><label>Email</label><input type="email" id="res-email-field" value="${escapeHtml(resume.email)}" onchange="updateResume()"></div>
                <div class="form-group"><label>Phone</label><input type="tel" id="res-phone" value="${escapeHtml(resume.phone)}" onchange="updateResume()"></div>
                <div class="form-group"><label>Location</label><input type="text" id="res-location" value="${escapeHtml(resume.location)}" placeholder="City, State" onchange="updateResume()"></div>
                <div class="form-group"><label>GitHub</label><input type="text" id="res-github" value="${escapeHtml(resume.github)}" onchange="updateResume()"></div>
                <div class="form-group"><label>LinkedIn</label><input type="text" id="res-linkedin" value="${escapeHtml(resume.linkedin)}" onchange="updateResume()"></div>
                <div class="form-group"><label>Portfolio</label><input type="text" id="res-portfolio" value="${escapeHtml(resume.portfolio)}" onchange="updateResume()"></div>
            </div>
        </div>
        <div class="resume-form-section">
            <h4><i class="fas fa-align-left"></i> Professional Summary</h4>
            <textarea id="res-summary" rows="4" onchange="updateResume()">${escapeHtml(resume.summary)}</textarea>
        </div>
        <div class="resume-form-section">
            <h4><i class="fas fa-code"></i> Technical Skills</h4>
            <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">Skills are auto-populated from your challenge progress. Edit as needed.</p>
            <div class="form-group"><label>Languages (comma separated)</label>
                <input type="text" id="res-languages" value="${resume.skills.languages.map(s => s.name).join(', ')}" onchange="updateResume()">
            </div>
            <div class="form-group"><label>Concepts</label>
                <input type="text" id="res-concepts" value="${resume.skills.concepts.join(', ')}" onchange="updateResume()">
            </div>
            <div class="form-group"><label>Tools</label>
                <input type="text" id="res-tools" value="${resume.skills.tools.join(', ')}" onchange="updateResume()">
            </div>
            <div class="form-group"><label>Soft Skills</label>
                <input type="text" id="res-soft" value="${resume.skills.soft.join(', ')}" onchange="updateResume()">
            </div>
        </div>
        <div class="resume-form-section">
            <h4><i class="fas fa-trophy"></i> Key Achievements</h4>
            <textarea id="res-achievements" rows="4" onchange="updateResume()">${resume.achievements.join('\n')}</textarea>
        </div>
    `;
}

function renderResumePreview(resume) {
    const container = document.getElementById('resume-preview');
    if (!container) return;

    const color = RESUME_TEMPLATES[resume.template]?.color || '#6366f1';

    container.innerHTML = `
        <div class="resume-paper">
            <div class="resume-header-section" style="border-bottom:3px solid ${color};">
                <h1 class="resume-name">${escapeHtml(resume.name)}</h1>
                <p class="resume-title-text">${escapeHtml(resume.title)}</p>
                <div class="resume-contact">
                    ${resume.email ? `<span><i class="fas fa-envelope"></i> ${escapeHtml(resume.email)}</span>` : ''}
                    ${resume.phone ? `<span><i class="fas fa-phone"></i> ${escapeHtml(resume.phone)}</span>` : ''}
                    ${resume.location ? `<span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(resume.location)}</span>` : ''}
                    ${resume.github ? `<span><i class="fab fa-github"></i> ${escapeHtml(resume.github)}</span>` : ''}
                    ${resume.linkedin ? `<span><i class="fab fa-linkedin"></i> ${escapeHtml(resume.linkedin)}</span>` : ''}
                </div>
            </div>

            ${resume.summary ? `
                <div class="resume-section">
                    <h2 class="resume-section-title" style="color:${color};">Professional Summary</h2>
                    <p class="resume-text">${escapeHtml(resume.summary)}</p>
                </div>
            ` : ''}

            <div class="resume-section">
                <h2 class="resume-section-title" style="color:${color};">Technical Skills</h2>
                <div class="resume-skills-grid">
                    <div><strong>Languages:</strong> ${resume.skills.languages.map(s => s.name).join(', ')}</div>
                    <div><strong>Concepts:</strong> ${resume.skills.concepts.join(', ')}</div>
                    <div><strong>Tools:</strong> ${resume.skills.tools.join(', ')}</div>
                    <div><strong>Soft Skills:</strong> ${resume.skills.soft.join(', ')}</div>
                </div>
            </div>

            ${resume.experience.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title" style="color:${color};">Experience</h2>
                    ${resume.experience.map(exp => `
                        <div class="resume-exp-item">
                            <div class="resume-exp-header">
                                <div><strong>${escapeHtml(exp.title)}</strong> — ${escapeHtml(exp.company)}</div>
                                <span class="resume-exp-date">${escapeHtml(exp.duration)}</span>
                            </div>
                            <ul class="resume-bullets">
                                ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${resume.projects.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title" style="color:${color};">Projects</h2>
                    ${resume.projects.map(proj => `
                        <div class="resume-exp-item">
                            <div class="resume-exp-header">
                                <div><strong>${escapeHtml(proj.name)}</strong> — ${escapeHtml(proj.tech)}</div>
                                ${proj.link ? `<a href="${escapeHtml(proj.link)}" style="font-size:0.75rem;">${escapeHtml(proj.link)}</a>` : ''}
                            </div>
                            <p class="resume-text">${escapeHtml(proj.description)}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${resume.education.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title" style="color:${color};">Education</h2>
                    ${resume.education.map(edu => `
                        <div class="resume-exp-item">
                            <div class="resume-exp-header">
                                <div><strong>${escapeHtml(edu.degree)}</strong> — ${escapeHtml(edu.school)}</div>
                                <span class="resume-exp-date">${escapeHtml(edu.year)}</span>
                            </div>
                            ${edu.gpa ? `<p class="resume-text">GPA: ${escapeHtml(edu.gpa)}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${resume.achievements.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title" style="color:${color};">Achievements</h2>
                    <ul class="resume-bullets">
                        ${resume.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

function updateResume() {
    const data = getChallengeData();
    if (!data || !data.resume) return;

    const r = data.resume;
    r.name = document.getElementById('res-name')?.value || r.name;
    r.title = document.getElementById('res-title')?.value || r.title;
    r.email = document.getElementById('res-email-field')?.value || r.email;
    r.phone = document.getElementById('res-phone')?.value || '';
    r.location = document.getElementById('res-location')?.value || '';
    r.github = document.getElementById('res-github')?.value || '';
    r.linkedin = document.getElementById('res-linkedin')?.value || '';
    r.portfolio = document.getElementById('res-portfolio')?.value || '';
    r.summary = document.getElementById('res-summary')?.value || '';

    const languages = (document.getElementById('res-languages')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    r.skills.languages = languages.map(name => ({ name, level: 'intermediate' }));
    r.skills.concepts = (document.getElementById('res-concepts')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    r.skills.tools = (document.getElementById('res-tools')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    r.skills.soft = (document.getElementById('res-soft')?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    r.achievements = (document.getElementById('res-achievements')?.value || '').split('\n').map(s => s.trim()).filter(Boolean);

    saveChallengeData(data);
    renderResumePreview(r);
}

function exportResumeText() {
    const resume = getResumeData();
    if (!resume) return;

    const lines = [
        resume.name.toUpperCase(),
        resume.title,
        [resume.email, resume.phone, resume.location, resume.github, resume.linkedin].filter(Boolean).join(' | '),
        '',
        '═══ PROFESSIONAL SUMMARY ═══',
        resume.summary,
        '',
        '═══ TECHNICAL SKILLS ═══',
        `Languages: ${resume.skills.languages.map(s => s.name).join(', ')}`,
        `Concepts: ${resume.skills.concepts.join(', ')}`,
        `Tools: ${resume.skills.tools.join(', ')}`,
        `Soft Skills: ${resume.skills.soft.join(', ')}`,
        '',
    ];

    if (resume.experience.length > 0) {
        lines.push('═══ EXPERIENCE ═══');
        resume.experience.forEach(exp => {
            lines.push(`${exp.title} — ${exp.company} (${exp.duration})`);
            exp.bullets.forEach(b => lines.push(`  • ${b}`));
            lines.push('');
        });
    }

    if (resume.projects.length > 0) {
        lines.push('═══ PROJECTS ═══');
        resume.projects.forEach(proj => {
            lines.push(`${proj.name} — ${proj.tech}`);
            lines.push(`  ${proj.description}`);
            if (proj.link) lines.push(`  ${proj.link}`);
            lines.push('');
        });
    }

    if (resume.education.length > 0) {
        lines.push('═══ EDUCATION ═══');
        resume.education.forEach(edu => {
            lines.push(`${edu.degree} — ${edu.school} (${edu.year})`);
        });
        lines.push('');
    }

    if (resume.achievements.length > 0) {
        lines.push('═══ ACHIEVEMENTS ═══');
        resume.achievements.forEach(a => lines.push(`  • ${a}`));
    }

    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.name.replace(/\s+/g, '_')}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume exported!', 'success');
}

function printResume() {
    const preview = document.getElementById('resume-preview');
    if (!preview) return;
    const win = window.open('', '_blank');
    win.document.write(`
        <html><head><title>Resume - ${getResumeData()?.name}</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1e293b; }
            h1 { font-size: 24px; margin: 0 0 4px; } h2 { font-size: 14px; border-bottom: 2px solid #6366f1; padding-bottom: 4px; margin: 16px 0 8px; color: #6366f1; text-transform: uppercase; letter-spacing: 1px; }
            p { margin: 4px 0; font-size: 12px; line-height: 1.5; } ul { margin: 4px 0; padding-left: 20px; } li { font-size: 12px; line-height: 1.6; }
            .contact { font-size: 11px; color: #475569; } .date { color: #64748b; font-size: 11px; } strong { font-weight: 600; }
        </style></head><body>
        ${preview.innerHTML.replace(/class="[^"]*"/g, '').replace(/style="[^"]*"/g, '')}
        </body></html>
    `);
    win.document.close();
    win.print();
}

// ===== INIT =====
const _origSwitchResume = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchResume) {
    const origSwRes = switchTab;
    switchTab = function(tabName) {
        origSwRes(tabName);
        if (tabName === 'resume') {
            document.getElementById('topbar-title').textContent = 'Resume Builder';
            renderResumeBuilder();
        }
    };
}


/* ============================================
   SOCIAL FEED MODULE
   Community-style activity feed,
   achievement sharing, progress posts,
   kudos system
   ============================================ */

const SIMULATED_FEED = [
    { user: 'AlgoNinja', avatar: '🥷', action: 'solved', detail: 'N-Queens problem', xp: 25, time: '2 hours ago', reactions: 12 },
    { user: 'PythonPro', avatar: '🐍', action: 'completed', detail: 'Day 42 — All tasks done!', xp: 30, time: '3 hours ago', reactions: 18 },
    { user: 'CodeMaster_42', avatar: '🦊', action: 'earned badge', detail: '🏆 50 DSA Problems Solved', xp: 50, time: '5 hours ago', reactions: 24 },
    { user: 'DSA_Queen', avatar: '👸', action: 'reached', detail: 'Level 38 — Expert!', xp: 0, time: '6 hours ago', reactions: 31 },
    { user: 'ByteWarrior', avatar: '⚔️', action: 'completed', detail: 'Merge Sort visualization', xp: 5, time: '8 hours ago', reactions: 7 },
    { user: 'StackOverflow', avatar: '📚', action: 'shared', detail: 'Week 9 Progress Report', xp: 15, time: '10 hours ago', reactions: 15 },
    { user: 'RecursionKing', avatar: '🔄', action: 'scored', detail: '100% on DSA Fundamentals quiz', xp: 100, time: '12 hours ago', reactions: 22 },
    { user: 'CppWizard', avatar: '🧙', action: 'completed', detail: 'Binary Search Tree implementation', xp: 25, time: '14 hours ago', reactions: 9 },
    { user: 'BugHunter', avatar: '🐛', action: 'started', detail: 'Phase 2: Intermediate', xp: 500, time: '1 day ago', reactions: 28 },
    { user: 'FullStackDev', avatar: '🏗️', action: 'built', detail: 'Banking System project in C++', xp: 50, time: '1 day ago', reactions: 35 },
];

function renderSocialFeed() {
    const container = document.getElementById('social-feed');
    if (!container) return;

    // Add user's recent activity
    const data = getChallengeData();
    const user = getCurrentUser();
    const myPosts = [];

    if (data && user) {
        const recentXP = (data.gamification?.xpHistory || []).slice(-3).reverse();
        recentXP.forEach(xp => {
            myPosts.push({
                user: user.name.split(' ')[0],
                avatar: '🔥',
                action: 'earned',
                detail: `+${xp.amount} XP — ${xp.reason}`,
                xp: xp.amount,
                time: typeof DateUtils !== 'undefined' ? DateUtils.formatDate(xp.date, 'short') : 'recently',
                reactions: Math.floor(Math.random() * 10) + 1,
                isMe: true,
            });
        });
    }

    const allPosts = [...myPosts, ...SIMULATED_FEED].slice(0, 15);

    container.innerHTML = allPosts.map(post => `
        <div class="feed-post ${post.isMe ? 'is-me' : ''}">
            <div class="feed-avatar">${post.avatar}</div>
            <div class="feed-content">
                <div class="feed-header">
                    <strong>${escapeHtml(post.user)}</strong>
                    ${post.isMe ? '<span class="lb-you-badge">You</span>' : ''}
                    <span class="feed-action">${post.action}</span>
                </div>
                <div class="feed-detail">${escapeHtml(post.detail)}</div>
                <div class="feed-footer">
                    <span class="feed-time">${post.time}</span>
                    <button class="feed-reaction" onclick="this.classList.toggle('liked');this.querySelector('span').textContent=parseInt(this.querySelector('span').textContent)+(this.classList.contains('liked')?1:-1)">
                        <i class="fas fa-heart"></i> <span>${post.reactions}</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function createFeedPost() {
    const text = document.getElementById('feed-post-input')?.value.trim();
    if (!text) { showToast('Write something to share!', 'error'); return; }

    const data = getChallengeData();
    if (!data) return;
    if (!data.feedPosts) data.feedPosts = [];
    data.feedPosts.push({
        text,
        date: new Date().toISOString(),
    });
    saveChallengeData(data);

    document.getElementById('feed-post-input').value = '';
    showToast('Post shared!', 'success');
    if (typeof awardXP === 'function') awardXP(5, 'Shared a post');
    renderSocialFeed();
}

// ===== INIT =====
const _origSwitchFeed = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchFeed) {
    const origSwFeed = switchTab;
    switchTab = function(tabName) {
        origSwFeed(tabName);
        if (tabName === 'feed') {
            document.getElementById('topbar-title').textContent = 'Community Feed';
            renderSocialFeed();
        }
    };
}
