/* ============================================
   INTERVIEW PREP MODULE
   Mock Interview Simulator, Behavioral Questions,
   System Design Basics, Coding Patterns,
   Company-specific Prep, Interview Tracker
   ============================================ */

// ===== BEHAVIORAL QUESTIONS =====
const behavioralQuestions = [
    { category: 'About You', question: 'Tell me about yourself.', tips: 'Keep it 2 minutes. Present-Past-Future format. Focus on relevant experience.', example: 'I am a software developer passionate about problem-solving. I have been learning C++ and Python for X months, solved 100+ DSA problems, and built projects including...' },
    { category: 'About You', question: 'What are your strengths?', tips: 'Pick 2-3 strengths relevant to the role. Give examples.', example: 'My strengths are problem-solving (I solved 150+ LeetCode problems), consistency (I completed a 90-day challenge), and quick learning.' },
    { category: 'About You', question: 'What are your weaknesses?', tips: 'Be honest but show you are working on it. Never say "I have no weaknesses."', example: 'I sometimes spend too much time optimizing code. I am learning to balance perfection with pragmatism by setting time limits.' },
    { category: 'About You', question: 'Where do you see yourself in 5 years?', tips: 'Show ambition but be realistic. Align with the company/role.', example: 'I see myself as a senior developer leading a team, contributing to architecture decisions, and mentoring junior developers.' },
    { category: 'About You', question: 'Why should we hire you?', tips: 'Connect your skills to their needs. Be specific.', example: 'I bring strong DSA skills, hands-on experience with C++ and Python, and a proven track record of consistent learning and growth.' },
    { category: 'Experience', question: 'Tell me about a challenging project you worked on.', tips: 'Use STAR method: Situation, Task, Action, Result. Be specific.', example: 'During my 90-day challenge, I built a full-stack web application with 10K+ lines of code, implementing 25+ features from authentication to real-time analytics.' },
    { category: 'Experience', question: 'How do you handle tight deadlines?', tips: 'Show planning and prioritization skills.', example: 'I break the task into smaller parts, prioritize the most critical features, use time-boxing techniques, and communicate early if there are blockers.' },
    { category: 'Experience', question: 'Describe a time you failed and what you learned.', tips: 'Be genuine. Focus on the lesson, not the failure.', example: 'Early in my learning, I tried to memorize solutions instead of understanding patterns. I failed repeatedly on new problems. I learned that deep understanding of concepts is essential.' },
    { category: 'Experience', question: 'How do you handle disagreements with teammates?', tips: 'Show emotional intelligence and collaboration.', example: 'I listen to understand their perspective, present data/evidence for my viewpoint, and focus on finding the best solution for the project rather than "winning."' },
    { category: 'Experience', question: 'Tell me about a time you went above and beyond.', tips: 'Show initiative and dedication.', example: 'During my 90-day challenge, I not only completed the coding and DSA goals but also built a comprehensive web application and maintained a fitness routine.' },
    { category: 'Technical', question: 'How do you stay updated with technology?', tips: 'Mention specific resources, communities, practices.', example: 'I follow tech blogs, solve daily LeetCode problems, read documentation, watch conference talks, and participate in coding communities.' },
    { category: 'Technical', question: 'Describe your approach to debugging.', tips: 'Show systematic thinking.', example: '1. Reproduce the bug. 2. Read error messages carefully. 3. Add logs/breakpoints. 4. Isolate the issue. 5. Fix and test. 6. Understand root cause to prevent recurrence.' },
    { category: 'Technical', question: 'How do you approach learning a new technology?', tips: 'Show structured learning approach.', example: 'I start with official docs, build a small project, read best practices, solve problems with it, and teach what I learned to solidify understanding.' },
    { category: 'Technical', question: 'What is your favorite programming language and why?', tips: 'Be genuine, show depth. Acknowledge trade-offs.', example: 'I enjoy Python for its readability and rapid prototyping, and C++ for its performance and fine-grained control. The right tool depends on the problem.' },
    { category: 'Technical', question: 'Explain a complex technical concept to a non-technical person.', tips: 'Use analogies. Keep it simple. Check understanding.', example: 'An API is like a waiter in a restaurant — you tell the waiter what you want, the waiter communicates with the kitchen, and brings back your food.' },
    { category: 'Problem Solving', question: 'How do you approach a coding problem you have never seen?', tips: 'Show structured problem-solving.', example: '1. Understand the problem (read 3 times). 2. Identify patterns (two pointers? DP?). 3. Start with brute force. 4. Optimize. 5. Code. 6. Test with edge cases.' },
    { category: 'Problem Solving', question: 'Describe your problem-solving process.', tips: 'Be structured. Show you think before coding.', example: 'I clarify requirements, think about edge cases, consider time/space complexity, implement the solution, test thoroughly, and refactor if needed.' },
    { category: 'Problem Solving', question: 'How do you handle a problem when you are completely stuck?', tips: 'Show resourcefulness and humility.', example: 'I take a short break, re-read the problem, try a different approach, draw diagrams, look at similar solved problems for patterns, and if needed, ask for help.' },
    { category: 'Culture', question: 'What motivates you?', tips: 'Be genuine. Connect to the role.', example: 'I am motivated by solving complex problems, continuous learning, building things that impact users, and working with talented people who push me to grow.' },
    { category: 'Culture', question: 'How do you prioritize when everything is urgent?', tips: 'Show decision-making framework.', example: 'I use the Eisenhower Matrix: urgent+important first, important but not urgent next. I communicate with stakeholders about realistic timelines.' },
];

// ===== MOCK INTERVIEW SIMULATOR =====
let mockInterviewState = {
    active: false,
    type: null,
    questions: [],
    currentIndex: 0,
    answers: [],
    startTime: null,
    timeLimit: 0,
    timerInterval: null,
};

function startMockInterview(type) {
    const config = {
        behavioral: { questions: shuffleMockArray([...behavioralQuestions]).slice(0, 8), timeMinutes: 20, title: 'Behavioral Interview' },
        technical: { questions: generateTechnicalQuestions(), timeMinutes: 30, title: 'Technical Interview' },
        coding: { questions: generateCodingQuestions(), timeMinutes: 45, title: 'Coding Interview' },
        system_design: { questions: generateSystemDesignQuestions(), timeMinutes: 30, title: 'System Design Interview' },
    };

    const c = config[type];
    if (!c) return;

    mockInterviewState = {
        active: true,
        type,
        questions: c.questions,
        currentIndex: 0,
        answers: new Array(c.questions.length).fill(''),
        startTime: Date.now(),
        timeLimit: c.timeMinutes * 60,
        timerInterval: null,
    };

    document.getElementById('interview-menu').style.display = 'none';
    document.getElementById('interview-active').style.display = 'block';
    document.getElementById('interview-results').style.display = 'none';

    document.getElementById('interview-title').textContent = c.title;
    document.getElementById('interview-total').textContent = c.questions.length;

    renderInterviewQuestion();
    startInterviewTimer();
}

function generateTechnicalQuestions() {
    const qs = [
        { category: 'C++', question: 'Explain the difference between stack and heap memory in C++.', tips: 'Discuss allocation, speed, size, lifetime, management.' },
        { category: 'C++', question: 'What are smart pointers? Explain unique_ptr, shared_ptr, weak_ptr.', tips: 'Discuss ownership semantics, reference counting, preventing memory leaks.' },
        { category: 'C++', question: 'Explain virtual functions and vtable.', tips: 'Discuss dynamic dispatch, runtime polymorphism, vtable structure.' },
        { category: 'Python', question: 'Explain the GIL and its impact on multithreading.', tips: 'Discuss CPython limitation, use multiprocessing for CPU-bound tasks.' },
        { category: 'Python', question: 'What are decorators? How do they work internally?', tips: 'Discuss closures, wrapper functions, functools.wraps.' },
        { category: 'DSA', question: 'Explain the time complexity of common sorting algorithms.', tips: 'Compare bubble, merge, quick, heap sort. Best/average/worst cases.' },
        { category: 'DSA', question: 'When would you use BFS vs DFS?', tips: 'BFS for shortest path, DFS for path finding/cycle detection.' },
        { category: 'DSA', question: 'Explain dynamic programming with an example.', tips: 'Use Fibonacci or Climbing Stairs. Discuss memoization vs tabulation.' },
    ];
    return shuffleMockArray(qs).slice(0, 6);
}

function generateCodingQuestions() {
    const qs = [
        { category: 'Array', question: 'Given an array of integers, find two numbers that add up to a target. Explain your approach and complexity.', tips: 'Hash map approach: O(n) time, O(n) space.' },
        { category: 'String', question: 'Find the longest substring without repeating characters. Walk through your solution.', tips: 'Sliding window with hash set. O(n) time.' },
        { category: 'Linked List', question: 'Reverse a linked list. Can you do it iteratively and recursively?', tips: 'Iterative: prev/curr/next pointers. Recursive: base case + reverse rest.' },
        { category: 'Tree', question: 'Validate if a binary tree is a valid BST. Explain your approach.', tips: 'Use min/max bounds or inorder traversal should be sorted.' },
        { category: 'Graph', question: 'Count the number of islands in a 2D grid. What algorithm would you use?', tips: 'DFS/BFS from each unvisited "1". Mark visited. O(m×n).' },
        { category: 'DP', question: 'Given coins of different denominations, find minimum coins to make a target amount.', tips: 'DP: dp[i] = min coins for amount i. O(n × amount).' },
    ];
    return shuffleMockArray(qs).slice(0, 4);
}

function generateSystemDesignQuestions() {
    const qs = [
        { category: 'Design', question: 'Design a URL shortener like bit.ly. What components would you need?', tips: 'Hash function, database, redirect service, analytics, caching.' },
        { category: 'Design', question: 'How would you design a real-time chat application?', tips: 'WebSockets, message queue, database, user presence, scaling.' },
        { category: 'Design', question: 'Design a rate limiter. What algorithms would you consider?', tips: 'Token bucket, leaky bucket, fixed window, sliding window.' },
        { category: 'Design', question: 'How would you design a news feed system like Twitter?', tips: 'Fan-out on write vs read, caching, pagination, ranking algorithm.' },
        { category: 'Design', question: 'Design a file storage service like Google Drive.', tips: 'Chunking, deduplication, metadata DB, CDN, sync conflict resolution.' },
    ];
    return shuffleMockArray(qs).slice(0, 3);
}

function renderInterviewQuestion() {
    if (!mockInterviewState.active) return;
    const q = mockInterviewState.questions[mockInterviewState.currentIndex];
    const idx = mockInterviewState.currentIndex;

    document.getElementById('interview-q-num').textContent = idx + 1;
    document.getElementById('interview-category').textContent = q.category;
    document.getElementById('interview-question').textContent = q.question;
    document.getElementById('interview-tips').textContent = q.tips || '';
    document.getElementById('interview-answer').value = mockInterviewState.answers[idx] || '';

    const pct = ((idx + 1) / mockInterviewState.questions.length) * 100;
    document.getElementById('interview-progress-bar').style.width = `${pct}%`;

    document.getElementById('interview-prev-btn').disabled = idx === 0;
    const nextBtn = document.getElementById('interview-next-btn');
    nextBtn.innerHTML = idx === mockInterviewState.questions.length - 1 ?
        '<i class="fas fa-flag-checkered"></i> Finish' :
        'Next <i class="fas fa-chevron-right"></i>';
}

function saveInterviewAnswer() {
    const answer = document.getElementById('interview-answer')?.value || '';
    mockInterviewState.answers[mockInterviewState.currentIndex] = answer;
}

function interviewNext() {
    saveInterviewAnswer();
    if (mockInterviewState.currentIndex < mockInterviewState.questions.length - 1) {
        mockInterviewState.currentIndex++;
        renderInterviewQuestion();
    } else {
        finishInterview();
    }
}

function interviewPrev() {
    saveInterviewAnswer();
    if (mockInterviewState.currentIndex > 0) {
        mockInterviewState.currentIndex--;
        renderInterviewQuestion();
    }
}

function startInterviewTimer() {
    clearInterval(mockInterviewState.timerInterval);
    mockInterviewState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - mockInterviewState.startTime) / 1000);
        const remaining = Math.max(0, mockInterviewState.timeLimit - elapsed);
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        const display = document.getElementById('interview-timer');
        if (display) {
            display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            display.style.color = remaining <= 60 ? '#ef4444' : remaining <= 180 ? '#f59e0b' : '#22d3ee';
        }
        if (remaining <= 0) finishInterview();
    }, 1000);
}

function finishInterview() {
    saveInterviewAnswer();
    clearInterval(mockInterviewState.timerInterval);
    mockInterviewState.active = false;

    const elapsed = Math.floor((Date.now() - mockInterviewState.startTime) / 1000);
    const answered = mockInterviewState.answers.filter(a => a.trim().length > 0).length;
    const total = mockInterviewState.questions.length;

    document.getElementById('interview-active').style.display = 'none';
    document.getElementById('interview-results').style.display = 'block';

    document.getElementById('interview-result-answered').textContent = `${answered} / ${total}`;
    document.getElementById('interview-result-time').textContent = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;
    document.getElementById('interview-result-score').textContent = `${Math.round((answered / total) * 100)}%`;

    let reviewHTML = '';
    mockInterviewState.questions.forEach((q, i) => {
        const answer = mockInterviewState.answers[i] || '(Not answered)';
        reviewHTML += `
            <div class="interview-review-item">
                <div class="interview-review-header">
                    <span class="interview-review-num">Q${i + 1}</span>
                    <span class="interview-review-cat">${q.category}</span>
                    ${answer.trim() ? '<i class="fas fa-check-circle" style="color:var(--success);"></i>' : '<i class="fas fa-times-circle" style="color:var(--danger);"></i>'}
                </div>
                <p class="interview-review-question">${escapeHtml(q.question)}</p>
                <div class="interview-review-answer">${escapeHtml(answer)}</div>
                <details class="interview-review-tips">
                    <summary>💡 Tips</summary>
                    <p>${escapeHtml(q.tips || '')}</p>
                    ${q.example ? `<p><strong>Example:</strong> ${escapeHtml(q.example)}</p>` : ''}
                </details>
            </div>
        `;
    });

    document.getElementById('interview-review').innerHTML = reviewHTML;

    // Save to history
    const data = getChallengeData();
    if (data) {
        if (!data.interviewHistory) data.interviewHistory = [];
        data.interviewHistory.push({
            type: mockInterviewState.type,
            answered,
            total,
            duration: elapsed,
            date: new Date().toISOString(),
        });
        if (data.interviewHistory.length > 30) data.interviewHistory = data.interviewHistory.slice(-30);
        saveChallengeData(data);

        if (typeof awardXP === 'function') {
            awardXP(answered * 15, `Mock Interview: ${answered}/${total} answered`);
        }
    }

    renderInterviewHistory();
}

function showInterviewMenu() {
    document.getElementById('interview-active').style.display = 'none';
    document.getElementById('interview-results').style.display = 'none';
    document.getElementById('interview-menu').style.display = 'block';
    renderInterviewHistory();
}

function endInterview() {
    if (confirm('End interview early?')) finishInterview();
}

function renderInterviewHistory() {
    const container = document.getElementById('interview-history');
    if (!container) return;

    const data = getChallengeData();
    const history = (data?.interviewHistory || []).slice().reverse().slice(0, 10);

    if (history.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No interviews done yet.</p>';
        return;
    }

    const typeNames = { behavioral: 'Behavioral', technical: 'Technical', coding: 'Coding', system_design: 'System Design' };

    container.innerHTML = history.map(h => {
        const date = new Date(h.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
        const pct = Math.round((h.answered / h.total) * 100);
        return `
            <div class="quiz-history-item">
                <span>${typeNames[h.type] || h.type}</span>
                <span style="color:var(--text-muted);font-size:0.8rem;">${date} • ${Math.floor(h.duration / 60)}m</span>
                <span class="quiz-history-score ${pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad'}">${h.answered}/${h.total}</span>
            </div>
        `;
    }).join('');
}

// ===== STAR METHOD BUILDER =====
function renderSTARBuilder() {
    const container = document.getElementById('star-builder');
    if (!container) return;

    const data = getChallengeData();
    const stories = data?.starStories || [];

    container.innerHTML = `
        <div class="star-form">
            <div class="form-group">
                <label><strong>S</strong>ituation — Set the scene</label>
                <textarea id="star-situation" rows="2" placeholder="What was the context? When/where did this happen?"></textarea>
            </div>
            <div class="form-group">
                <label><strong>T</strong>ask — Your responsibility</label>
                <textarea id="star-task" rows="2" placeholder="What was your specific task or responsibility?"></textarea>
            </div>
            <div class="form-group">
                <label><strong>A</strong>ction — What you did</label>
                <textarea id="star-action" rows="3" placeholder="What specific actions did you take? Use 'I' not 'we'."></textarea>
            </div>
            <div class="form-group">
                <label><strong>R</strong>esult — The outcome</label>
                <textarea id="star-result" rows="2" placeholder="What was the outcome? Quantify if possible."></textarea>
            </div>
            <div class="form-group">
                <label>Story Title</label>
                <input type="text" id="star-title" placeholder="e.g., Led team through tight deadline">
            </div>
            <button class="btn btn-primary" onclick="saveSTARStory()"><i class="fas fa-save"></i> Save Story</button>
        </div>
        <div class="star-stories" style="margin-top:20px;">
            <h4 style="margin-bottom:12px;">Saved STAR Stories (${stories.length})</h4>
            ${stories.length === 0 ? '<p style="color:var(--text-muted);font-size:0.85rem;">No stories saved yet.</p>' :
                stories.map((s, i) => `
                    <div class="star-story-card">
                        <div class="star-story-header">
                            <strong>${escapeHtml(s.title)}</strong>
                            <button class="btn btn-ghost btn-sm" onclick="deleteSTARStory(${i})"><i class="fas fa-trash" style="color:var(--danger);"></i></button>
                        </div>
                        <div class="star-story-body">
                            <p><strong>S:</strong> ${escapeHtml(s.situation)}</p>
                            <p><strong>T:</strong> ${escapeHtml(s.task)}</p>
                            <p><strong>A:</strong> ${escapeHtml(s.action)}</p>
                            <p><strong>R:</strong> ${escapeHtml(s.result)}</p>
                        </div>
                    </div>
                `).join('')
            }
        </div>
    `;
}

function saveSTARStory() {
    const title = document.getElementById('star-title')?.value.trim();
    const situation = document.getElementById('star-situation')?.value.trim();
    const task = document.getElementById('star-task')?.value.trim();
    const action = document.getElementById('star-action')?.value.trim();
    const result = document.getElementById('star-result')?.value.trim();

    if (!title || !situation || !action) {
        showToast('Please fill at least title, situation, and action', 'error');
        return;
    }

    const data = getChallengeData();
    if (!data) return;
    if (!data.starStories) data.starStories = [];

    data.starStories.push({ title, situation, task, action, result, date: new Date().toISOString() });
    saveChallengeData(data);

    showToast('STAR story saved!', 'success');
    renderSTARBuilder();

    ['star-title', 'star-situation', 'star-task', 'star-action', 'star-result'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

function deleteSTARStory(index) {
    if (!confirm('Delete this story?')) return;
    const data = getChallengeData();
    if (!data || !data.starStories) return;
    data.starStories.splice(index, 1);
    saveChallengeData(data);
    renderSTARBuilder();
}

function shuffleMockArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ===== INIT =====
function initInterview() {
    renderInterviewHistory();
    renderSTARBuilder();
}

const _origSwitchIntv = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchIntv) {
    const origSwIntv = switchTab;
    switchTab = function(tabName) {
        origSwIntv(tabName);
        if (tabName === 'interview') {
            document.getElementById('topbar-title').textContent = 'Interview Prep';
            initInterview();
        }
    };
}
