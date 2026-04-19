/* ============================================
   COURSES & VIDEO PLAYER MODULE
   Add YouTube playlists, organize by day,
   embedded video player, progress tracking,
   watch history, daily schedule
   ============================================ */

// ===== DEFAULT PLAYLISTS =====
const DEFAULT_PLAYLISTS = [
    { id: 'pl_cpp_cherno', name: 'C++ by The Cherno', category: 'cpp', playlistId: 'PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb', thumbnail: '', videoCount: 100, isDefault: true },
    { id: 'pl_python_corey', name: 'Python by Corey Schafer', category: 'python', playlistId: 'PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU', thumbnail: '', videoCount: 50, isDefault: true },
    { id: 'pl_dsa_striver', name: 'DSA by Striver (A2Z)', category: 'dsa', playlistId: 'PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz', thumbnail: '', videoCount: 200, isDefault: true },
    { id: 'pl_dsa_neetcode', name: 'NeetCode 150', category: 'dsa', playlistId: 'PLot-Xpze53ldVwtstag2TL4HQhAnC8ATf', thumbnail: '', videoCount: 150, isDefault: true },
    { id: 'pl_cpp_jenny', name: 'C++ Full Course - Jenny', category: 'cpp', playlistId: 'PLdo5W4Nhv31YU5Wx1dopka58teJP1d1dl', thumbnail: '', videoCount: 60, isDefault: true },
    { id: 'pl_python_freecodecamp', name: 'Python Full Course - freeCodeCamp', category: 'python', playlistId: 'PLWKjhJtqVAbnqBxcdjVGqAhKTCnagvcp3', thumbnail: '', videoCount: 30, isDefault: true },
];

// ===== STATE =====
let currentVideo = null;
let currentPlaylistView = null;

// ===== GET COURSES DATA =====
function getCoursesData() {
    const data = getChallengeData();
    if (!data) return null;
    if (!data.courses) {
        data.courses = {
            playlists: [...DEFAULT_PLAYLISTS],
            watchHistory: {},
            dailySchedule: {},
            videoNotes: {},
        };
        saveChallengeData(data);
    }
    return data.courses;
}

// ===== EXTRACT PLAYLIST ID =====
function extractPlaylistId(url) {
    // Handle various YouTube URL formats
    const patterns = [
        /[?&]list=([a-zA-Z0-9_-]+)/,
        /playlist\?list=([a-zA-Z0-9_-]+)/,
    ];
    for (const p of patterns) {
        const match = url.match(p);
        if (match) return match[1];
    }
    // If it's already just an ID
    if (/^[a-zA-Z0-9_-]{10,}$/.test(url)) return url;
    return null;
}

// ===== EXTRACT VIDEO ID =====
function extractVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
        const match = url.match(p);
        if (match) return match[1];
    }
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    return null;
}

// ===== ADD PLAYLIST =====
function addPlaylist() {
    document.getElementById('course-playlist-name').value = '';
    document.getElementById('course-playlist-url').value = '';
    document.getElementById('course-playlist-category').value = 'dsa';
    document.getElementById('course-modal').classList.add('active');
}

function savePlaylist() {
    const name = document.getElementById('course-playlist-name')?.value.trim();
    const url = document.getElementById('course-playlist-url')?.value.trim();
    const category = document.getElementById('course-playlist-category')?.value || 'dsa';

    if (!name) { showToast('Please enter a playlist name', 'error'); return; }
    if (!url) { showToast('Please enter a YouTube playlist URL or ID', 'error'); return; }

    const playlistId = extractPlaylistId(url);
    if (!playlistId) { showToast('Invalid YouTube playlist URL', 'error'); return; }

    const data = getChallengeData();
    if (!data) return;
    const courses = data.courses || { playlists: [], watchHistory: {}, dailySchedule: {}, videoNotes: {} };

    // Check duplicate
    if (courses.playlists.some(p => p.playlistId === playlistId)) {
        showToast('This playlist is already added', 'info');
        return;
    }

    courses.playlists.push({
        id: 'pl_' + Date.now().toString(36),
        name,
        category,
        playlistId,
        thumbnail: '',
        videoCount: 0,
        isDefault: false,
        addedAt: new Date().toISOString(),
    });

    data.courses = courses;
    saveChallengeData(data);
    document.getElementById('course-modal').classList.remove('active');
    showToast('Playlist added!', 'success');
    renderCoursesTab();
}

function removePlaylist(playlistInternalId) {
    if (!confirm('Remove this playlist?')) return;
    const data = getChallengeData();
    if (!data || !data.courses) return;
    data.courses.playlists = data.courses.playlists.filter(p => p.id !== playlistInternalId);
    saveChallengeData(data);
    renderCoursesTab();
    showToast('Playlist removed', 'info');
}

// ===== ADD INDIVIDUAL VIDEO =====
function addSingleVideo() {
    document.getElementById('video-title-input').value = '';
    document.getElementById('video-url-input').value = '';
    document.getElementById('video-category-input').value = 'dsa';
    document.getElementById('video-day-input').value = '';
    document.getElementById('video-modal').classList.add('active');
}

function saveSingleVideo() {
    const title = document.getElementById('video-title-input')?.value.trim();
    const url = document.getElementById('video-url-input')?.value.trim();
    const category = document.getElementById('video-category-input')?.value || 'dsa';
    const day = parseInt(document.getElementById('video-day-input')?.value) || 0;

    if (!title || !url) { showToast('Please fill title and URL', 'error'); return; }

    const videoId = extractVideoId(url);
    if (!videoId) { showToast('Invalid YouTube video URL', 'error'); return; }

    const data = getChallengeData();
    if (!data) return;
    if (!data.courses) data.courses = { playlists: [], watchHistory: {}, dailySchedule: {}, videoNotes: {} };
    if (!data.courses.videos) data.courses.videos = [];

    data.courses.videos.push({
        id: 'v_' + Date.now().toString(36),
        title,
        videoId,
        category,
        day: day || null,
        addedAt: new Date().toISOString(),
    });

    data.courses = data.courses;
    saveChallengeData(data);
    document.getElementById('video-modal').classList.remove('active');
    showToast('Video added!', 'success');
    renderCoursesTab();
}

// ===== SCHEDULE VIDEO TO DAY =====
function scheduleVideo(videoId, day) {
    const data = getChallengeData();
    if (!data || !data.courses) return;
    if (!data.courses.dailySchedule) data.courses.dailySchedule = {};
    if (!data.courses.dailySchedule[day]) data.courses.dailySchedule[day] = [];

    if (!data.courses.dailySchedule[day].includes(videoId)) {
        data.courses.dailySchedule[day].push(videoId);
        saveChallengeData(data);
        showToast(`Scheduled for Day ${day}`, 'success');
    }
}

// ===== MARK VIDEO WATCHED =====
function toggleWatched(videoId) {
    const data = getChallengeData();
    if (!data || !data.courses) return;
    if (!data.courses.watchHistory) data.courses.watchHistory = {};
    data.courses.watchHistory[videoId] = !data.courses.watchHistory[videoId];
    saveChallengeData(data);

    if (data.courses.watchHistory[videoId]) {
        showToast('Marked as watched ✓', 'success');
        if (typeof awardXP === 'function') awardXP(10, 'Video watched');
    }

    renderCoursesTab();
}

// ===== SAVE VIDEO NOTE =====
function saveVideoNote(videoId) {
    const textarea = document.getElementById(`vnote-${videoId}`);
    if (!textarea) return;

    const data = getChallengeData();
    if (!data || !data.courses) return;
    if (!data.courses.videoNotes) data.courses.videoNotes = {};
    data.courses.videoNotes[videoId] = textarea.value;
    saveChallengeData(data);
    showToast('Note saved!', 'success');
}

// ===== PLAY VIDEO =====
function playVideo(videoId, title) {
    currentVideo = { videoId, title };
    const player = document.getElementById('course-video-player');
    const playerTitle = document.getElementById('course-player-title');
    const playerContainer = document.getElementById('course-player-container');

    if (player) {
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (playerTitle) playerTitle.textContent = title || 'Now Playing';
    if (playerContainer) {
        playerContainer.style.display = 'block';
        playerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function closePlayer() {
    const player = document.getElementById('course-video-player');
    const playerContainer = document.getElementById('course-player-container');
    if (player) player.src = '';
    if (playerContainer) playerContainer.style.display = 'none';
    currentVideo = null;
}

// ===== OPEN PLAYLIST (Show videos from YouTube embed) =====
function openPlaylist(playlistId, playlistName) {
    currentPlaylistView = { playlistId, playlistName };
    const player = document.getElementById('course-video-player');
    const playerTitle = document.getElementById('course-player-title');
    const playerContainer = document.getElementById('course-player-container');

    if (player) {
        player.src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`;
    }
    if (playerTitle) playerTitle.textContent = playlistName;
    if (playerContainer) {
        playerContainer.style.display = 'block';
        playerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== RENDER =====
function renderCoursesTab() {
    const courses = getCoursesData();
    if (!courses) return;

    renderPlaylistsGrid(courses);
    renderIndividualVideos(courses);
    renderDailyVideoSchedule(courses);
    renderWatchStats(courses);
}

function renderPlaylistsGrid(courses) {
    const container = document.getElementById('course-playlists-grid');
    if (!container) return;

    const filterCat = document.getElementById('course-filter')?.value || 'all';
    const playlists = courses.playlists.filter(p => filterCat === 'all' || p.category === filterCat);

    if (playlists.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-play-circle"></i><p>No playlists yet. Add your first one!</p></div>';
        return;
    }

    const catColors = { cpp: '#6366f1', python: '#f59e0b', dsa: '#06b6d4', other: '#10b981' };
    const catIcons = { cpp: 'fa-code', python: 'fa-python fab', dsa: 'fa-sitemap', other: 'fa-play' };
    const catLabels = { cpp: 'C++', python: 'Python', dsa: 'DSA', other: 'Other' };

    container.innerHTML = playlists.map(pl => {
        const color = catColors[pl.category] || catColors.other;
        const icon = catIcons[pl.category] || catIcons.other;
        const label = catLabels[pl.category] || 'Other';
        const watched = Object.keys(courses.watchHistory || {}).filter(k => k.startsWith(pl.playlistId)).length;

        return `
            <div class="course-playlist-card" onclick="openPlaylist('${escapeHtml(pl.playlistId)}', '${escapeHtml(pl.name)}')">
                <div class="cpl-thumbnail" style="background:linear-gradient(135deg, ${color}20, ${color}08);">
                    <i class="${icon.includes('fab') ? icon : 'fas ' + icon}" style="color:${color};font-size:2rem;"></i>
                    <div class="cpl-play-overlay"><i class="fas fa-play"></i></div>
                </div>
                <div class="cpl-info">
                    <span class="cpl-category" style="background:${color}15;color:${color};border:1px solid ${color}30;">${label}</span>
                    <h4 class="cpl-name">${escapeHtml(pl.name)}</h4>
                    <div class="cpl-meta">
                        <span><i class="fab fa-youtube"></i> YouTube Playlist</span>
                        ${!pl.isDefault ? `<button class="cpl-remove" onclick="event.stopPropagation();removePlaylist('${pl.id}')"><i class="fas fa-trash"></i></button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderIndividualVideos(courses) {
    const container = document.getElementById('course-videos-list');
    if (!container) return;

    const videos = courses.videos || [];
    if (videos.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No individual videos added yet.</p>';
        return;
    }

    const catColors = { cpp: '#6366f1', python: '#f59e0b', dsa: '#06b6d4', other: '#10b981' };

    container.innerHTML = videos.map(v => {
        const isWatched = courses.watchHistory?.[v.videoId];
        const note = courses.videoNotes?.[v.videoId] || '';
        const color = catColors[v.category] || '#6366f1';

        return `
            <div class="course-video-item ${isWatched ? 'watched' : ''}">
                <div class="cv-thumb" onclick="playVideo('${v.videoId}', '${escapeHtml(v.title)}')">
                    <img src="https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg" alt="${escapeHtml(v.title)}" loading="lazy">
                    <div class="cv-play"><i class="fas fa-play"></i></div>
                </div>
                <div class="cv-info">
                    <h4 onclick="playVideo('${v.videoId}', '${escapeHtml(v.title)}')">${escapeHtml(v.title)}</h4>
                    <div class="cv-meta">
                        <span class="cv-cat" style="color:${color};">${v.category.toUpperCase()}</span>
                        ${v.day ? `<span>Day ${v.day}</span>` : ''}
                    </div>
                    <div class="cv-actions">
                        <button class="btn btn-ghost btn-sm" onclick="toggleWatched('${v.videoId}')" title="${isWatched ? 'Mark unwatched' : 'Mark watched'}">
                            <i class="fas ${isWatched ? 'fa-check-circle' : 'fa-circle'}" style="color:${isWatched ? 'var(--success)' : 'var(--text-muted)'};"></i>
                        </button>
                        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('vnote-wrap-${v.videoId}').classList.toggle('open')">
                            <i class="fas fa-sticky-note"></i>
                        </button>
                    </div>
                </div>
                <div class="cv-note-wrap" id="vnote-wrap-${v.videoId}">
                    <textarea id="vnote-${v.videoId}" placeholder="Notes about this video...">${escapeHtml(note)}</textarea>
                    <button class="btn btn-primary btn-sm" onclick="saveVideoNote('${v.videoId}')"><i class="fas fa-save"></i> Save</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderDailyVideoSchedule(courses) {
    const container = document.getElementById('course-daily-schedule');
    if (!container) return;

    const user = getCurrentUser();
    if (!user) return;

    const startDate = new Date(user.startDate);
    const today = new Date();
    const totalDays = user.challengeDays || 90;
    const currentDay = Math.min(totalDays, Math.max(1, Math.floor((today - startDate) / 86400000) + 1));

    // Get today's scheduled videos
    const todayVideos = courses.dailySchedule?.[currentDay] || [];
    const allVideos = courses.videos || [];

    // Also show videos tagged with today's day number
    const dayTaggedVideos = allVideos.filter(v => v.day === currentDay);

    const allTodayVideos = [...new Set([
        ...todayVideos.map(vid => allVideos.find(v => v.videoId === vid)).filter(Boolean),
        ...dayTaggedVideos,
    ])];

    if (allTodayVideos.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:16px;color:var(--text-muted);">
                <p>No videos scheduled for Day ${currentDay}.</p>
                <p style="font-size:0.8rem;">Add videos and assign them to specific days, or open a playlist to start learning!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="cv-schedule-header">
            <span class="cv-schedule-day">Day ${currentDay} — Today's Classes</span>
            <span class="cv-schedule-count">${allTodayVideos.length} video${allTodayVideos.length > 1 ? 's' : ''}</span>
        </div>
        ${allTodayVideos.map((v, i) => {
            const isWatched = courses.watchHistory?.[v.videoId];
            return `
                <div class="cv-schedule-item ${isWatched ? 'done' : ''}" onclick="playVideo('${v.videoId}', '${escapeHtml(v.title)}')">
                    <span class="cv-schedule-num">${i + 1}</span>
                    <img src="https://img.youtube.com/vi/${v.videoId}/default.jpg" class="cv-schedule-thumb" alt="">
                    <div class="cv-schedule-info">
                        <span class="cv-schedule-title">${escapeHtml(v.title)}</span>
                        <span class="cv-schedule-cat">${v.category.toUpperCase()}</span>
                    </div>
                    ${isWatched ? '<i class="fas fa-check-circle" style="color:var(--success);"></i>' : '<i class="fas fa-play-circle" style="color:var(--accent-1);"></i>'}
                </div>
            `;
        }).join('')}
    `;
}

function renderWatchStats(courses) {
    const container = document.getElementById('course-watch-stats');
    if (!container) return;

    const totalVideos = (courses.videos || []).length;
    const watchedCount = Object.values(courses.watchHistory || {}).filter(Boolean).length;
    const notesCount = Object.values(courses.videoNotes || {}).filter(n => n && n.trim()).length;
    const playlistCount = courses.playlists.length;

    container.innerHTML = `
        <div class="cw-stat"><span class="cw-val">${playlistCount}</span><span class="cw-lbl">Playlists</span></div>
        <div class="cw-stat"><span class="cw-val">${totalVideos}</span><span class="cw-lbl">Videos</span></div>
        <div class="cw-stat"><span class="cw-val">${watchedCount}</span><span class="cw-lbl">Watched</span></div>
        <div class="cw-stat"><span class="cw-val">${notesCount}</span><span class="cw-lbl">Notes</span></div>
    `;
}

// ===== INIT =====
const _origSwitchCourses = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchCourses) {
    const origSwCrs = switchTab;
    switchTab = function(tabName) {
        origSwCrs(tabName);
        if (tabName === 'courses') {
            document.getElementById('topbar-title').textContent = 'Courses & Videos';
            renderCoursesTab();
        }
    };
}
