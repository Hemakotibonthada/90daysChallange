/* ============================================
   ALGORITHM VISUALIZER MODULE
   Visual animations for sorting algorithms,
   searching algorithms, and data structures.
   Step-by-step execution with speed control.
   ============================================ */

// ===== CONFIG =====
const VISUALIZER_COLORS = {
    default: '#6366f1',
    comparing: '#f59e0b',
    swapping: '#ef4444',
    sorted: '#10b981',
    pivot: '#ec4899',
    searching: '#06b6d4',
    found: '#10b981',
    current: '#8b5cf6',
    visited: '#64748b',
    path: '#fbbf24',
};

let vizState = {
    array: [],
    originalArray: [],
    running: false,
    paused: false,
    speed: 50,
    algorithm: 'bubble',
    steps: [],
    currentStep: 0,
    animationTimer: null,
    comparisons: 0,
    swaps: 0,
    arrayAccesses: 0,
};

// ===== ARRAY GENERATION =====
function generateArray(size = 30) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 95) + 5);
    }
    vizState.array = [...arr];
    vizState.originalArray = [...arr];
    vizState.steps = [];
    vizState.currentStep = 0;
    vizState.comparisons = 0;
    vizState.swaps = 0;
    vizState.arrayAccesses = 0;
    vizState.running = false;
    vizState.paused = false;
    renderVisualizerBars();
    updateVizStats();
}

function generateSortedArray(size = 30) {
    const arr = Array.from({ length: size }, (_, i) => Math.floor(((i + 1) / size) * 95) + 5);
    vizState.array = [...arr];
    vizState.originalArray = [...arr];
    vizState.steps = [];
    renderVisualizerBars();
}

function generateReversedArray(size = 30) {
    const arr = Array.from({ length: size }, (_, i) => Math.floor(((size - i) / size) * 95) + 5);
    vizState.array = [...arr];
    vizState.originalArray = [...arr];
    vizState.steps = [];
    renderVisualizerBars();
}

function generateNearlySortedArray(size = 30) {
    const arr = Array.from({ length: size }, (_, i) => Math.floor(((i + 1) / size) * 95) + 5);
    // Swap a few random pairs
    for (let i = 0; i < Math.floor(size / 5); i++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        [arr[a], arr[b]] = [arr[b], arr[a]];
    }
    vizState.array = [...arr];
    vizState.originalArray = [...arr];
    vizState.steps = [];
    renderVisualizerBars();
}

// ===== RENDER =====
function renderVisualizerBars() {
    const container = document.getElementById('viz-bars');
    if (!container) return;

    const maxVal = Math.max(...vizState.array, 1);
    const barWidth = Math.max(2, Math.floor(container.offsetWidth / vizState.array.length) - 2);

    container.innerHTML = vizState.array.map((val, i) => {
        const height = (val / maxVal) * 100;
        const color = vizState.steps.length > 0 && vizState.currentStep < vizState.steps.length ?
            getBarColor(i, vizState.steps[vizState.currentStep]) : VISUALIZER_COLORS.default;
        return `<div class="viz-bar" style="height:${height}%;width:${barWidth}px;background:${color};" data-value="${val}" data-index="${i}"></div>`;
    }).join('');
}

function renderVisualizerBarsWithHighlight(highlights) {
    const container = document.getElementById('viz-bars');
    if (!container) return;

    const maxVal = Math.max(...vizState.array, 1);
    const barWidth = Math.max(2, Math.floor(container.offsetWidth / vizState.array.length) - 2);

    container.innerHTML = vizState.array.map((val, i) => {
        const height = (val / maxVal) * 100;
        let color = VISUALIZER_COLORS.default;
        if (highlights.sorted && highlights.sorted.includes(i)) color = VISUALIZER_COLORS.sorted;
        if (highlights.comparing && highlights.comparing.includes(i)) color = VISUALIZER_COLORS.comparing;
        if (highlights.swapping && highlights.swapping.includes(i)) color = VISUALIZER_COLORS.swapping;
        if (highlights.pivot !== undefined && highlights.pivot === i) color = VISUALIZER_COLORS.pivot;
        if (highlights.current !== undefined && highlights.current === i) color = VISUALIZER_COLORS.current;
        if (highlights.found !== undefined && highlights.found === i) color = VISUALIZER_COLORS.found;
        return `<div class="viz-bar" style="height:${height}%;width:${barWidth}px;background:${color};transition:height 0.1s ease,background 0.1s ease;" data-value="${val}"></div>`;
    }).join('');
}

function getBarColor(index, step) {
    if (!step) return VISUALIZER_COLORS.default;
    if (step.sorted && step.sorted.includes(index)) return VISUALIZER_COLORS.sorted;
    if (step.comparing && step.comparing.includes(index)) return VISUALIZER_COLORS.comparing;
    if (step.swapping && step.swapping.includes(index)) return VISUALIZER_COLORS.swapping;
    return VISUALIZER_COLORS.default;
}

function updateVizStats() {
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('viz-comparisons', vizState.comparisons);
    setEl('viz-swaps', vizState.swaps);
    setEl('viz-accesses', vizState.arrayAccesses);
    setEl('viz-array-size', vizState.array.length);
}

// ===== SORTING ALGORITHMS =====

// Bubble Sort
async function bubbleSortViz() {
    const arr = [...vizState.array];
    const n = arr.length;
    const sorted = [];

    for (let i = 0; i < n - 1 && vizState.running; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1 && vizState.running; j++) {
            vizState.comparisons++;
            vizState.arrayAccesses += 2;

            // Highlight comparing
            renderVisualizerBarsWithHighlight({ comparing: [j, j + 1], sorted });
            await vizDelay();

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                vizState.swaps++;
                vizState.array = [...arr];
                renderVisualizerBarsWithHighlight({ swapping: [j, j + 1], sorted });
                await vizDelay();
                swapped = true;
            }

            updateVizStats();
            while (vizState.paused && vizState.running) await vizDelay(100);
        }
        sorted.unshift(n - 1 - i);
        if (!swapped) {
            for (let k = 0; k < n - i - 1; k++) sorted.unshift(k);
            break;
        }
    }
    sorted.unshift(0);
    vizState.array = [...arr];
    renderVisualizerBarsWithHighlight({ sorted: Array.from({ length: n }, (_, i) => i) });
}

// Selection Sort
async function selectionSortViz() {
    const arr = [...vizState.array];
    const n = arr.length;
    const sorted = [];

    for (let i = 0; i < n - 1 && vizState.running; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n && vizState.running; j++) {
            vizState.comparisons++;
            vizState.arrayAccesses += 2;
            renderVisualizerBarsWithHighlight({ comparing: [minIdx, j], current: i, sorted });
            await vizDelay();

            if (arr[j] < arr[minIdx]) minIdx = j;
            while (vizState.paused && vizState.running) await vizDelay(100);
        }

        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            vizState.swaps++;
            vizState.array = [...arr];
            renderVisualizerBarsWithHighlight({ swapping: [i, minIdx], sorted });
            await vizDelay();
        }

        sorted.push(i);
        updateVizStats();
    }
    sorted.push(n - 1);
    renderVisualizerBarsWithHighlight({ sorted: Array.from({ length: n }, (_, i) => i) });
}

// Insertion Sort
async function insertionSortViz() {
    const arr = [...vizState.array];
    const n = arr.length;
    const sorted = [0];

    for (let i = 1; i < n && vizState.running; i++) {
        const key = arr[i];
        let j = i - 1;
        vizState.arrayAccesses++;

        renderVisualizerBarsWithHighlight({ current: i, sorted });
        await vizDelay();

        while (j >= 0 && arr[j] > key && vizState.running) {
            vizState.comparisons++;
            vizState.arrayAccesses += 2;
            arr[j + 1] = arr[j];
            vizState.swaps++;
            j--;
            vizState.array = [...arr];
            renderVisualizerBarsWithHighlight({ swapping: [j + 1, j + 2], sorted });
            await vizDelay();
            while (vizState.paused && vizState.running) await vizDelay(100);
        }
        arr[j + 1] = key;
        vizState.array = [...arr];
        sorted.push(i);
        updateVizStats();
    }
    renderVisualizerBarsWithHighlight({ sorted: Array.from({ length: n }, (_, i) => i) });
}

// Merge Sort
async function mergeSortViz() {
    const arr = [...vizState.array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    vizState.array = [...arr];
    renderVisualizerBarsWithHighlight({ sorted: Array.from({ length: arr.length }, (_, i) => i) });
}

async function mergeSortHelper(arr, left, right) {
    if (left >= right || !vizState.running) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);
    await mergeViz(arr, left, mid, right);
}

async function mergeViz(arr, left, mid, right) {
    const temp = [];
    let i = left, j = mid + 1;

    while (i <= mid && j <= right && vizState.running) {
        vizState.comparisons++;
        vizState.arrayAccesses += 2;

        renderVisualizerBarsWithHighlight({ comparing: [i, j] });
        await vizDelay();

        if (arr[i] <= arr[j]) {
            temp.push(arr[i++]);
        } else {
            temp.push(arr[j++]);
        }

        while (vizState.paused && vizState.running) await vizDelay(100);
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = 0; k < temp.length && vizState.running; k++) {
        arr[left + k] = temp[k];
        vizState.swaps++;
        vizState.array = [...arr];
        renderVisualizerBarsWithHighlight({ swapping: [left + k] });
        await vizDelay();
    }

    updateVizStats();
}

// Quick Sort
async function quickSortViz() {
    const arr = [...vizState.array];
    await quickSortHelper(arr, 0, arr.length - 1);
    vizState.array = [...arr];
    renderVisualizerBarsWithHighlight({ sorted: Array.from({ length: arr.length }, (_, i) => i) });
}

async function quickSortHelper(arr, low, high) {
    if (low >= high || !vizState.running) return;
    const pi = await partitionViz(arr, low, high);
    await quickSortHelper(arr, low, pi - 1);
    await quickSortHelper(arr, pi + 1, high);
}

async function partitionViz(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    renderVisualizerBarsWithHighlight({ pivot: high });
    await vizDelay();

    for (let j = low; j < high && vizState.running; j++) {
        vizState.comparisons++;
        vizState.arrayAccesses += 2;

        renderVisualizerBarsWithHighlight({ comparing: [j], pivot: high });
        await vizDelay();

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            vizState.swaps++;
            vizState.array = [...arr];
            renderVisualizerBarsWithHighlight({ swapping: [i, j], pivot: high });
            await vizDelay();
        }

        while (vizState.paused && vizState.running) await vizDelay(100);
        updateVizStats();
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    vizState.swaps++;
    vizState.array = [...arr];
    renderVisualizerBarsWithHighlight({ swapping: [i + 1, high] });
    await vizDelay();

    return i + 1;
}

// Heap Sort
async function heapSortViz() {
    const arr = [...vizState.array];
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0 && vizState.running; i--) {
        await heapifyViz(arr, n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0 && vizState.running; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        vizState.swaps++;
        vizState.array = [...arr];
        renderVisualizerBarsWithHighlight({ swapping: [0, i], sorted: Array.from({ length: n - i }, (_, j) => n - 1 - j) });
        await vizDelay();
        await heapifyViz(arr, i, 0);
    }

    vizState.array = [...arr];
    renderVisualizerBarsWithHighlight({ sorted: Array.from({ length: n }, (_, i) => i) });
}

async function heapifyViz(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    vizState.comparisons += 2;
    vizState.arrayAccesses += 3;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i && vizState.running) {
        renderVisualizerBarsWithHighlight({ comparing: [i, largest] });
        await vizDelay();

        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        vizState.swaps++;
        vizState.array = [...arr];
        renderVisualizerBarsWithHighlight({ swapping: [i, largest] });
        await vizDelay();

        updateVizStats();
        await heapifyViz(arr, n, largest);
    }
}

// ===== SEARCHING ALGORITHMS =====

// Linear Search
async function linearSearchViz(target) {
    const arr = vizState.array;
    for (let i = 0; i < arr.length && vizState.running; i++) {
        vizState.comparisons++;
        vizState.arrayAccesses++;
        renderVisualizerBarsWithHighlight({ current: i });
        await vizDelay();

        if (arr[i] === target) {
            renderVisualizerBarsWithHighlight({ found: i });
            showToast(`Found ${target} at index ${i}!`, 'success');
            updateVizStats();
            return i;
        }
        while (vizState.paused && vizState.running) await vizDelay(100);
        updateVizStats();
    }
    showToast(`${target} not found`, 'info');
    return -1;
}

// Binary Search (array must be sorted)
async function binarySearchViz(target) {
    const arr = [...vizState.array].sort((a, b) => a - b);
    vizState.array = [...arr];
    renderVisualizerBars();
    await vizDelay(500);

    let lo = 0, hi = arr.length - 1;
    while (lo <= hi && vizState.running) {
        const mid = Math.floor((lo + hi) / 2);
        vizState.comparisons++;
        vizState.arrayAccesses++;

        renderVisualizerBarsWithHighlight({ comparing: [lo, hi], current: mid });
        await vizDelay();

        if (arr[mid] === target) {
            renderVisualizerBarsWithHighlight({ found: mid });
            showToast(`Found ${target} at index ${mid}!`, 'success');
            updateVizStats();
            return mid;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
        while (vizState.paused && vizState.running) await vizDelay(100);
        updateVizStats();
    }
    showToast(`${target} not found`, 'info');
    return -1;
}

// ===== PATHFINDING VISUALIZER =====
let gridState = {
    grid: [],
    rows: 15,
    cols: 30,
    start: { r: 7, c: 3 },
    end: { r: 7, c: 26 },
    drawing: false,
    drawMode: 'wall',
    running: false,
};

function initGrid() {
    gridState.grid = Array.from({ length: gridState.rows }, () =>
        Array.from({ length: gridState.cols }, () => ({
            wall: false,
            visited: false,
            path: false,
            distance: Infinity,
        }))
    );
    renderGrid();
}

function renderGrid() {
    const container = document.getElementById('pathfinding-grid');
    if (!container) return;

    container.style.gridTemplateColumns = `repeat(${gridState.cols}, 1fr)`;
    container.innerHTML = '';

    for (let r = 0; r < gridState.rows; r++) {
        for (let c = 0; c < gridState.cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';

            if (r === gridState.start.r && c === gridState.start.c) cell.classList.add('start');
            else if (r === gridState.end.r && c === gridState.end.c) cell.classList.add('end');
            else if (gridState.grid[r][c].wall) cell.classList.add('wall');
            else if (gridState.grid[r][c].path) cell.classList.add('path');
            else if (gridState.grid[r][c].visited) cell.classList.add('visited');

            cell.addEventListener('mousedown', () => { gridState.drawing = true; toggleWall(r, c); });
            cell.addEventListener('mouseenter', () => { if (gridState.drawing) toggleWall(r, c); });
            cell.addEventListener('mouseup', () => { gridState.drawing = false; });

            // Touch support
            cell.addEventListener('touchstart', (e) => { e.preventDefault(); gridState.drawing = true; toggleWall(r, c); });
            cell.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const el = document.elementFromPoint(touch.clientX, touch.clientY);
                if (el && el.classList.contains('grid-cell')) {
                    const idx = Array.from(container.children).indexOf(el);
                    const tr = Math.floor(idx / gridState.cols);
                    const tc = idx % gridState.cols;
                    toggleWall(tr, tc);
                }
            });
            cell.addEventListener('touchend', () => { gridState.drawing = false; });

            container.appendChild(cell);
        }
    }
}

function toggleWall(r, c) {
    if ((r === gridState.start.r && c === gridState.start.c) ||
        (r === gridState.end.r && c === gridState.end.c)) return;

    gridState.grid[r][c].wall = !gridState.grid[r][c].wall;
    const idx = r * gridState.cols + c;
    const container = document.getElementById('pathfinding-grid');
    if (container && container.children[idx]) {
        container.children[idx].classList.toggle('wall', gridState.grid[r][c].wall);
    }
}

function clearGrid() {
    for (let r = 0; r < gridState.rows; r++) {
        for (let c = 0; c < gridState.cols; c++) {
            gridState.grid[r][c] = { wall: false, visited: false, path: false, distance: Infinity };
        }
    }
    gridState.running = false;
    renderGrid();
}

function clearPath() {
    for (let r = 0; r < gridState.rows; r++) {
        for (let c = 0; c < gridState.cols; c++) {
            gridState.grid[r][c].visited = false;
            gridState.grid[r][c].path = false;
            gridState.grid[r][c].distance = Infinity;
        }
    }
    gridState.running = false;
    renderGrid();
}

function generateMaze() {
    clearGrid();
    for (let r = 0; r < gridState.rows; r++) {
        for (let c = 0; c < gridState.cols; c++) {
            if (Math.random() < 0.3 &&
                !(r === gridState.start.r && c === gridState.start.c) &&
                !(r === gridState.end.r && c === gridState.end.c)) {
                gridState.grid[r][c].wall = true;
            }
        }
    }
    renderGrid();
}

// BFS Pathfinding
async function bfsPathfinding() {
    clearPath();
    gridState.running = true;

    const { rows, cols, start, end, grid } = gridState;
    const queue = [{ r: start.r, c: start.c }];
    const parent = {};
    grid[start.r][start.c].visited = true;
    grid[start.r][start.c].distance = 0;
    parent[`${start.r},${start.c}`] = null;

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let found = false;

    while (queue.length > 0 && gridState.running) {
        const { r, c } = queue.shift();

        if (r === end.r && c === end.c) {
            found = true;
            break;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                !grid[nr][nc].visited && !grid[nr][nc].wall) {
                grid[nr][nc].visited = true;
                grid[nr][nc].distance = grid[r][c].distance + 1;
                parent[`${nr},${nc}`] = { r, c };
                queue.push({ r: nr, c: nc });

                // Animate
                const idx = nr * cols + nc;
                const container = document.getElementById('pathfinding-grid');
                if (container && container.children[idx]) {
                    container.children[idx].classList.add('visited');
                }
            }
        }

        await vizDelay(vizState.speed / 3);
    }

    // Trace path
    if (found) {
        let curr = { r: end.r, c: end.c };
        const pathCells = [];
        while (curr) {
            pathCells.push(curr);
            curr = parent[`${curr.r},${curr.c}`];
        }
        pathCells.reverse();

        for (const p of pathCells) {
            grid[p.r][p.c].path = true;
            const idx = p.r * cols + p.c;
            const container = document.getElementById('pathfinding-grid');
            if (container && container.children[idx]) {
                container.children[idx].classList.add('path');
            }
            await vizDelay(30);
        }

        showToast(`Path found! Length: ${pathCells.length}`, 'success');
    } else {
        showToast('No path found!', 'error');
    }

    gridState.running = false;
}

// DFS Pathfinding
async function dfsPathfinding() {
    clearPath();
    gridState.running = true;

    const { rows, cols, start, end, grid } = gridState;
    const stack = [{ r: start.r, c: start.c }];
    const parent = {};
    parent[`${start.r},${start.c}`] = null;
    let found = false;

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    while (stack.length > 0 && gridState.running) {
        const { r, c } = stack.pop();

        if (grid[r][c].visited) continue;
        grid[r][c].visited = true;

        const idx = r * cols + c;
        const container = document.getElementById('pathfinding-grid');
        if (container && container.children[idx]) {
            container.children[idx].classList.add('visited');
        }

        if (r === end.r && c === end.c) {
            found = true;
            break;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                !grid[nr][nc].visited && !grid[nr][nc].wall) {
                stack.push({ r: nr, c: nc });
                if (!parent[`${nr},${nc}`]) parent[`${nr},${nc}`] = { r, c };
            }
        }

        await vizDelay(vizState.speed / 3);
    }

    if (found) {
        let curr = { r: end.r, c: end.c };
        const pathCells = [];
        while (curr) {
            pathCells.push(curr);
            curr = parent[`${curr.r},${curr.c}`];
        }
        pathCells.reverse();

        for (const p of pathCells) {
            grid[p.r][p.c].path = true;
            const idx = p.r * cols + p.c;
            const container = document.getElementById('pathfinding-grid');
            if (container && container.children[idx]) {
                container.children[idx].classList.add('path');
            }
            await vizDelay(30);
        }
        showToast(`Path found! Length: ${pathCells.length}`, 'success');
    } else {
        showToast('No path found!', 'error');
    }

    gridState.running = false;
}

// Dijkstra Pathfinding (weighted version — all edges weight 1 here)
async function dijkstraPathfinding() {
    clearPath();
    gridState.running = true;

    const { rows, cols, start, end, grid } = gridState;
    const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const parent = {};
    dist[start.r][start.c] = 0;
    parent[`${start.r},${start.c}`] = null;

    // Simple priority queue using sorted array
    const pq = [{ r: start.r, c: start.c, d: 0 }];
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let found = false;

    while (pq.length > 0 && gridState.running) {
        pq.sort((a, b) => a.d - b.d);
        const { r, c, d } = pq.shift();

        if (d > dist[r][c]) continue;
        if (grid[r][c].visited) continue;
        grid[r][c].visited = true;

        const idx = r * cols + c;
        const container = document.getElementById('pathfinding-grid');
        if (container && container.children[idx]) {
            container.children[idx].classList.add('visited');
        }

        if (r === end.r && c === end.c) {
            found = true;
            break;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                !grid[nr][nc].wall && !grid[nr][nc].visited) {
                const newDist = d + 1;
                if (newDist < dist[nr][nc]) {
                    dist[nr][nc] = newDist;
                    parent[`${nr},${nc}`] = { r, c };
                    pq.push({ r: nr, c: nc, d: newDist });
                }
            }
        }

        await vizDelay(vizState.speed / 3);
    }

    if (found) {
        let curr = { r: end.r, c: end.c };
        const pathCells = [];
        while (curr) {
            pathCells.push(curr);
            curr = parent[`${curr.r},${curr.c}`];
        }
        pathCells.reverse();

        for (const p of pathCells) {
            const idx = p.r * cols + p.c;
            const container = document.getElementById('pathfinding-grid');
            if (container && container.children[idx]) {
                container.children[idx].classList.add('path');
            }
            await vizDelay(30);
        }
        showToast(`Shortest path: ${pathCells.length} steps`, 'success');
    } else {
        showToast('No path found!', 'error');
    }

    gridState.running = false;
}

// ===== CONTROLS =====
async function startViz() {
    if (vizState.running) return;

    vizState.running = true;
    vizState.paused = false;
    vizState.comparisons = 0;
    vizState.swaps = 0;
    vizState.arrayAccesses = 0;
    vizState.array = [...vizState.originalArray];

    const btn = document.getElementById('viz-start-btn');
    if (btn) btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';

    const algo = document.getElementById('viz-algorithm')?.value || 'bubble';

    switch (algo) {
        case 'bubble': await bubbleSortViz(); break;
        case 'selection': await selectionSortViz(); break;
        case 'insertion': await insertionSortViz(); break;
        case 'merge': await mergeSortViz(); break;
        case 'quick': await quickSortViz(); break;
        case 'heap': await heapSortViz(); break;
        default: await bubbleSortViz();
    }

    vizState.running = false;
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start';

    if (typeof awardXP === 'function') awardXP(5, 'Algorithm visualized');
    showToast('Visualization complete!', 'success');
}

function pauseViz() {
    vizState.paused = !vizState.paused;
    const btn = document.getElementById('viz-pause-btn');
    if (btn) btn.innerHTML = vizState.paused ? '<i class="fas fa-play"></i> Resume' : '<i class="fas fa-pause"></i> Pause';
}

function stopViz() {
    vizState.running = false;
    vizState.paused = false;
    vizState.array = [...vizState.originalArray];
    renderVisualizerBars();
    const btn = document.getElementById('viz-start-btn');
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start';
}

function setVizSpeed(speed) {
    vizState.speed = 101 - speed; // Invert: slider right = faster
    document.getElementById('viz-speed-label').textContent = speed > 75 ? 'Fast' : speed > 40 ? 'Medium' : 'Slow';
}

function setArraySize(size) {
    generateArray(size);
    document.getElementById('viz-size-label').textContent = size;
}

async function startSearch() {
    const algo = document.getElementById('viz-search-algo')?.value || 'linear';
    const target = parseInt(document.getElementById('viz-search-target')?.value);

    if (isNaN(target)) {
        showToast('Enter a number to search for', 'error');
        return;
    }

    vizState.running = true;
    vizState.comparisons = 0;
    vizState.arrayAccesses = 0;

    if (algo === 'linear') await linearSearchViz(target);
    else if (algo === 'binary') await binarySearchViz(target);

    vizState.running = false;
}

async function startPathfinding() {
    const algo = document.getElementById('viz-path-algo')?.value || 'bfs';

    if (algo === 'bfs') await bfsPathfinding();
    else if (algo === 'dfs') await dfsPathfinding();
    else if (algo === 'dijkstra') await dijkstraPathfinding();
}

function vizDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || vizState.speed));
}

// ===== INIT =====
function initVisualizer() {
    generateArray(30);
    initGrid();
}

const _origSwitchViz = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchViz) {
    const origSwViz = switchTab;
    switchTab = function(tabName) {
        origSwViz(tabName);
        if (tabName === 'visualizer') {
            document.getElementById('topbar-title').textContent = 'Algorithm Visualizer';
            initVisualizer();
        }
    };
}
