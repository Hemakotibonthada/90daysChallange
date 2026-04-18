/* ============================================
   KANBAN BOARD MODULE
   Drag-and-drop task management with
   Todo, In Progress, Done columns.
   Custom boards, labels, due dates.
   ============================================ */

// ===== KANBAN STATE =====
const DEFAULT_COLUMNS = [
    { id: 'todo', title: 'To Do', icon: '📋', color: '#6366f1' },
    { id: 'progress', title: 'In Progress', icon: '🔄', color: '#f59e0b' },
    { id: 'review', title: 'Review', icon: '👀', color: '#8b5cf6' },
    { id: 'done', title: 'Done', icon: '✅', color: '#10b981' },
];

const KANBAN_LABELS = {
    cpp: { name: 'C++', color: '#6366f1' },
    python: { name: 'Python', color: '#f59e0b' },
    dsa: { name: 'DSA', color: '#06b6d4' },
    fitness: { name: 'Fitness', color: '#10b981' },
    personal: { name: 'Personal', color: '#ec4899' },
    urgent: { name: 'Urgent', color: '#ef4444' },
    learning: { name: 'Learning', color: '#8b5cf6' },
};

let draggedCard = null;

function getKanbanData() {
    const data = getChallengeData();
    if (!data) return null;
    if (!data.kanban) {
        data.kanban = {
            cards: [
                { id: 'k1', title: 'Solve 2 LeetCode Easy problems', column: 'todo', label: 'dsa', priority: 'medium', createdAt: new Date().toISOString() },
                { id: 'k2', title: 'Learn C++ pointers & references', column: 'todo', label: 'cpp', priority: 'high', createdAt: new Date().toISOString() },
                { id: 'k3', title: 'Python list comprehensions practice', column: 'todo', label: 'python', priority: 'medium', createdAt: new Date().toISOString() },
                { id: 'k4', title: '30 min workout', column: 'todo', label: 'fitness', priority: 'low', createdAt: new Date().toISOString() },
                { id: 'k5', title: 'Review Big-O notation', column: 'progress', label: 'dsa', priority: 'high', createdAt: new Date().toISOString() },
                { id: 'k6', title: 'Write Hello World in C++', column: 'done', label: 'cpp', priority: 'low', createdAt: new Date().toISOString() },
            ],
        };
        saveChallengeData(data);
    }
    return data.kanban;
}

function renderKanban() {
    const container = document.getElementById('kanban-board');
    if (!container) return;

    const kanban = getKanbanData();
    if (!kanban) return;

    container.innerHTML = DEFAULT_COLUMNS.map(col => {
        const cards = kanban.cards.filter(c => c.column === col.id);
        return `
            <div class="kanban-column" data-column="${col.id}"
                ondragover="event.preventDefault();this.classList.add('drag-over')"
                ondragleave="this.classList.remove('drag-over')"
                ondrop="dropKanbanCard(event, '${col.id}');this.classList.remove('drag-over')">
                <div class="kanban-column-header" style="border-bottom-color:${col.color};">
                    <span class="kanban-column-title">${col.icon} ${col.title}</span>
                    <span class="kanban-column-count">${cards.length}</span>
                </div>
                <div class="kanban-cards">
                    ${cards.map(card => renderKanbanCard(card)).join('')}
                </div>
                <button class="kanban-add-btn" onclick="addKanbanCard('${col.id}')">
                    <i class="fas fa-plus"></i> Add Card
                </button>
            </div>
        `;
    }).join('');

    updateKanbanStats();
}

function renderKanbanCard(card) {
    const label = KANBAN_LABELS[card.label];
    const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
    const priorityIcons = { high: '🔴', medium: '🟡', low: '🟢' };
    const date = new Date(card.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' });

    return `
        <div class="kanban-card" draggable="true" data-card-id="${card.id}"
            ondragstart="startDragCard(event, '${card.id}')"
            ondragend="endDragCard(event)">
            <div class="kanban-card-top">
                ${label ? `<span class="kanban-label" style="background:${label.color}20;color:${label.color};border:1px solid ${label.color}40;">${label.name}</span>` : ''}
                <span class="kanban-priority" title="${card.priority}">${priorityIcons[card.priority] || '🟡'}</span>
            </div>
            <div class="kanban-card-title">${escapeHtml(card.title)}</div>
            ${card.description ? `<div class="kanban-card-desc">${escapeHtml(card.description)}</div>` : ''}
            <div class="kanban-card-footer">
                <span class="kanban-card-date"><i class="fas fa-calendar"></i> ${date}</span>
                <div class="kanban-card-actions">
                    <button onclick="event.stopPropagation();editKanbanCard('${card.id}')" title="Edit"><i class="fas fa-edit"></i></button>
                    <button onclick="event.stopPropagation();deleteKanbanCard('${card.id}')" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
}

// ===== DRAG & DROP =====
function startDragCard(e, cardId) {
    draggedCard = cardId;
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
}

function endDragCard(e) {
    e.target.classList.remove('dragging');
    draggedCard = null;
}

function dropKanbanCard(e, columnId) {
    e.preventDefault();
    if (!draggedCard) return;

    const data = getChallengeData();
    if (!data || !data.kanban) return;

    const card = data.kanban.cards.find(c => c.id === draggedCard);
    if (card) {
        const prevColumn = card.column;
        card.column = columnId;
        saveChallengeData(data);
        renderKanban();

        if (columnId === 'done' && prevColumn !== 'done') {
            showToast('Task completed! 🎉', 'success');
            if (typeof awardXP === 'function') awardXP(10, 'Kanban task done');
        }
    }
}

// ===== CRUD =====
function addKanbanCard(column) {
    document.getElementById('kanban-modal-title').textContent = 'New Card';
    document.getElementById('kanban-card-title-input').value = '';
    document.getElementById('kanban-card-desc-input').value = '';
    document.getElementById('kanban-card-label').value = 'dsa';
    document.getElementById('kanban-card-priority').value = 'medium';
    document.getElementById('kanban-card-column').value = column;
    document.getElementById('kanban-editing-id').value = '';
    document.getElementById('kanban-modal').classList.add('active');
}

function editKanbanCard(cardId) {
    const data = getChallengeData();
    if (!data || !data.kanban) return;
    const card = data.kanban.cards.find(c => c.id === cardId);
    if (!card) return;

    document.getElementById('kanban-modal-title').textContent = 'Edit Card';
    document.getElementById('kanban-card-title-input').value = card.title;
    document.getElementById('kanban-card-desc-input').value = card.description || '';
    document.getElementById('kanban-card-label').value = card.label || 'dsa';
    document.getElementById('kanban-card-priority').value = card.priority || 'medium';
    document.getElementById('kanban-card-column').value = card.column;
    document.getElementById('kanban-editing-id').value = cardId;
    document.getElementById('kanban-modal').classList.add('active');
}

function saveKanbanCard() {
    const title = document.getElementById('kanban-card-title-input')?.value.trim();
    const description = document.getElementById('kanban-card-desc-input')?.value.trim();
    const label = document.getElementById('kanban-card-label')?.value;
    const priority = document.getElementById('kanban-card-priority')?.value;
    const column = document.getElementById('kanban-card-column')?.value;
    const editingId = document.getElementById('kanban-editing-id')?.value;

    if (!title) { showToast('Please enter a title', 'error'); return; }

    const data = getChallengeData();
    if (!data) return;
    if (!data.kanban) data.kanban = { cards: [] };

    if (editingId) {
        const card = data.kanban.cards.find(c => c.id === editingId);
        if (card) {
            card.title = title;
            card.description = description;
            card.label = label;
            card.priority = priority;
            card.column = column;
        }
    } else {
        data.kanban.cards.push({
            id: 'k' + Date.now().toString(36),
            title,
            description,
            label,
            priority,
            column: column || 'todo',
            createdAt: new Date().toISOString(),
        });
    }

    saveChallengeData(data);
    document.getElementById('kanban-modal').classList.remove('active');
    renderKanban();
    showToast(editingId ? 'Card updated!' : 'Card created!', 'success');
}

function deleteKanbanCard(cardId) {
    if (!confirm('Delete this card?')) return;
    const data = getChallengeData();
    if (!data || !data.kanban) return;
    data.kanban.cards = data.kanban.cards.filter(c => c.id !== cardId);
    saveChallengeData(data);
    renderKanban();
    showToast('Card deleted', 'info');
}

function updateKanbanStats() {
    const kanban = getKanbanData();
    if (!kanban) return;

    const stats = DEFAULT_COLUMNS.map(col => ({
        ...col,
        count: kanban.cards.filter(c => c.column === col.id).length,
    }));

    const statsEl = document.getElementById('kanban-stats');
    if (statsEl) {
        const total = kanban.cards.length || 1;
        statsEl.innerHTML = stats.map(s => `
            <div class="kanban-stat">
                <span class="kanban-stat-icon">${s.icon}</span>
                <span class="kanban-stat-count">${s.count}</span>
                <span class="kanban-stat-label">${s.title}</span>
                <div class="kanban-stat-bar">
                    <div class="kanban-stat-fill" style="width:${(s.count / total) * 100}%;background:${s.color};"></div>
                </div>
            </div>
        `).join('');
    }
}

// ===== INIT =====
const _origSwitchKanban = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchKanban) {
    const origSwKb = switchTab;
    switchTab = function(tabName) {
        origSwKb(tabName);
        if (tabName === 'kanban') {
            document.getElementById('topbar-title').textContent = 'Kanban Board';
            renderKanban();
        }
    };
}
