/* ============================================
   UTILITIES MODULE — Helper Functions
   Date helpers, formatters, validators,
   string utils, math utils, storage helpers,
   animation helpers, PWA registration
   ============================================ */

// ===== PWA REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => {
                console.log('Service Worker registered:', reg.scope);
            })
            .catch((err) => {
                console.log('Service Worker registration failed:', err);
            });
    });
}

// ===== DATE UTILITIES =====
const DateUtils = {
    // Format date to readable string
    formatDate(date, format = 'medium') {
        const d = new Date(date);
        const options = {
            short: { month: 'short', day: 'numeric' },
            medium: { year: 'numeric', month: 'short', day: 'numeric' },
            long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' },
            full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        };
        return d.toLocaleDateString('en-US', options[format] || options.medium);
    },

    // Get relative time string
    timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
        ];

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count > 0) {
                return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    },

    // Get date string (YYYY-MM-DD)
    toDateString(date) {
        return new Date(date).toISOString().split('T')[0];
    },

    // Get days between two dates
    daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.floor(Math.abs(d2 - d1) / 86400000);
    },

    // Get day of week name
    getDayName(date) {
        return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    },

    // Check if date is today
    isToday(date) {
        return new Date(date).toDateString() === new Date().toDateString();
    },

    // Get start of week (Sunday)
    getWeekStart(date) {
        const d = new Date(date);
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
    },

    // Get array of dates for a range
    getDateRange(startDate, days) {
        const dates = [];
        for (let i = 0; i < days; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            dates.push(DateUtils.toDateString(d));
        }
        return dates;
    },

    // Get current challenge day number
    getChallengeDay(startDate) {
        const start = new Date(startDate);
        const today = new Date();
        start.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return Math.min(90, Math.max(1, Math.floor((today - start) / 86400000) + 1));
    }
};

// ===== STRING UTILITIES =====
const StringUtils = {
    // Capitalize first letter
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Title case
    titleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },

    // Truncate with ellipsis
    truncate(str, maxLen = 50) {
        if (!str || str.length <= maxLen) return str;
        return str.substring(0, maxLen) + '...';
    },

    // Slugify string
    slugify(str) {
        return str.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    // Count words
    wordCount(str) {
        return str.trim().split(/\s+/).filter(Boolean).length;
    },

    // Generate random ID
    generateId(length = 8) {
        return Array.from(crypto.getRandomValues(new Uint8Array(length)))
            .map(b => b.toString(36))
            .join('')
            .substring(0, length);
    },

    // Escape HTML entities
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Extract initials
    getInitials(name) {
        return name.split(' ')
            .map(n => n.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    },

    // Highlight search terms
    highlight(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
};

// ===== NUMBER UTILITIES =====
const NumberUtils = {
    // Format number with commas
    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    },

    // Format percentage
    formatPercent(value, total, decimals = 0) {
        if (total === 0) return '0%';
        return ((value / total) * 100).toFixed(decimals) + '%';
    },

    // Clamp number between min and max
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },

    // Random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Calculate BMI
    calculateBMI(weightKg, heightCm) {
        const heightM = heightCm / 100;
        return (weightKg / (heightM * heightM)).toFixed(1);
    },

    // Calculate BMR (Mifflin-St Jeor)
    calculateBMR(weightKg, heightCm, age, gender = 'male') {
        const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
        return Math.round(gender === 'male' ? base + 5 : base - 161);
    },

    // Calculate TDEE
    calculateTDEE(bmr, activityLevel = 'moderate') {
        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            veryActive: 1.9
        };
        return Math.round(bmr * (multipliers[activityLevel] || 1.55));
    },

    // Format duration
    formatDuration(minutes) {
        if (minutes < 60) return `${minutes}m`;
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
    },

    // Format bytes
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
};

// ===== VALIDATION UTILITIES =====
const ValidationUtils = {
    // Email validation
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // URL validation
    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // Check minimum length
    minLength(str, min) {
        return str && str.length >= min;
    },

    // Check if string is alphanumeric
    isAlphanumeric(str) {
        return /^[a-zA-Z0-9\s]+$/.test(str);
    },

    // Check if number is in range
    inRange(num, min, max) {
        return num >= min && num <= max;
    }
};

// ===== STORAGE UTILITIES =====
const StorageUtils = {
    // Get storage usage
    getStorageUsage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += (localStorage[key].length + key.length) * 2; // UTF-16
            }
        }
        return total;
    },

    // Format storage usage
    getStorageInfo() {
        const used = StorageUtils.getStorageUsage();
        const limit = 5 * 1024 * 1024; // ~5MB typical limit
        return {
            used,
            limit,
            usedFormatted: NumberUtils.formatBytes(used),
            limitFormatted: NumberUtils.formatBytes(limit),
            percentUsed: ((used / limit) * 100).toFixed(1)
        };
    },

    // Safe JSON parse
    safeGet(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    // Safe JSON stringify and set
    safeSet(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },

    // Remove item
    remove(key) {
        localStorage.removeItem(key);
    }
};

// ===== ANIMATION UTILITIES =====
const AnimationUtils = {
    // Smooth counter animation
    animateCounter(element, target, duration = 1000) {
        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    },

    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    },

    // Fade in element
    fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = '';
        element.style.transition = `opacity ${duration}ms ease`;
        requestAnimationFrame(() => {
            element.style.opacity = 1;
        });
    },

    // Fade out element
    fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    // Slide down
    slideDown(element, duration = 300) {
        element.style.maxHeight = 0;
        element.style.overflow = 'hidden';
        element.style.display = '';
        element.style.transition = `max-height ${duration}ms ease`;
        requestAnimationFrame(() => {
            element.style.maxHeight = element.scrollHeight + 'px';
        });
    },

    // Typewriter effect
    typewriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(timer);
        }, speed);
    },

    // Shake animation (for errors)
    shake(element) {
        element.style.animation = 'none';
        requestAnimationFrame(() => {
            element.style.animation = 'shake 0.5s ease';
        });
    }
};

// Add shake keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== ARRAY UTILITIES =====
const ArrayUtils = {
    // Shuffle array (Fisher-Yates)
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    // Chunk array into groups
    chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },

    // Get unique values
    unique(arr) {
        return [...new Set(arr)];
    },

    // Group by key
    groupBy(arr, key) {
        return arr.reduce((groups, item) => {
            const val = typeof key === 'function' ? key(item) : item[key];
            (groups[val] = groups[val] || []).push(item);
            return groups;
        }, {});
    },

    // Sum of array
    sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
    },

    // Average
    average(arr) {
        return arr.length > 0 ? ArrayUtils.sum(arr) / arr.length : 0;
    },

    // Find max by property
    maxBy(arr, fn) {
        return arr.reduce((max, item) => fn(item) > fn(max) ? item : max, arr[0]);
    },

    // Flatten nested array
    flatten(arr, depth = 1) {
        return arr.flat(depth);
    },

    // Remove item at index
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
};

// ===== DEBOUNCE & THROTTLE =====
function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function throttle(fn, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== CLIPBOARD UTILITY =====
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
        return true;
    } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!', 'success');
        return true;
    }
}

// ===== COLOR UTILITIES =====
const ColorUtils = {
    // Generate random hex color
    randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    },

    // Hex to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    // Lighten/darken color
    adjustColor(hex, percent) {
        const rgb = ColorUtils.hexToRgb(hex);
        if (!rgb) return hex;
        const adjust = (val) => Math.min(255, Math.max(0, Math.round(val + (val * percent / 100))));
        return `rgb(${adjust(rgb.r)}, ${adjust(rgb.g)}, ${adjust(rgb.b)})`;
    },

    // Get contrast color (black or white)
    getContrastColor(hex) {
        const rgb = ColorUtils.hexToRgb(hex);
        if (!rgb) return '#ffffff';
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
};

// ===== PERFORMANCE MONITORING =====
const PerfMonitor = {
    marks: {},

    start(name) {
        PerfMonitor.marks[name] = performance.now();
    },

    end(name) {
        if (!PerfMonitor.marks[name]) return 0;
        const duration = performance.now() - PerfMonitor.marks[name];
        delete PerfMonitor.marks[name];
        return Math.round(duration * 100) / 100;
    },

    measure(name, fn) {
        PerfMonitor.start(name);
        const result = fn();
        const duration = PerfMonitor.end(name);
        console.log(`[Perf] ${name}: ${duration}ms`);
        return result;
    }
};

// ===== EVENT BUS (simple pub/sub) =====
const EventBus = {
    listeners: {},

    on(event, callback) {
        if (!EventBus.listeners[event]) EventBus.listeners[event] = [];
        EventBus.listeners[event].push(callback);
    },

    off(event, callback) {
        if (!EventBus.listeners[event]) return;
        EventBus.listeners[event] = EventBus.listeners[event].filter(cb => cb !== callback);
    },

    emit(event, data) {
        if (!EventBus.listeners[event]) return;
        EventBus.listeners[event].forEach(cb => cb(data));
    }
};

// ===== INITIALIZATION =====
console.log('%c🔥 90 Days Challenge v2.0', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with ❤️ by Hema Koteswar Naidu', 'font-size: 12px; color: #94a3b8;');

// Register PWA manifest
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = '/manifest.json';
document.head.appendChild(manifestLink);

// Add meta theme color
const themeColor = document.createElement('meta');
themeColor.name = 'theme-color';
themeColor.content = '#0a0a1a';
document.head.appendChild(themeColor);

// Add apple touch icon
const appleIcon = document.createElement('link');
appleIcon.rel = 'apple-touch-icon';
appleIcon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>";
document.head.appendChild(appleIcon);

// ===== PWA INSTALL PROMPT =====
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] Install prompt available');
});

function installPWA() {
    if (!deferredPrompt) {
        showToast('App already installed or not supported', 'info');
        return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            showToast('App installed! Find it on your home screen.', 'success');
        }
        deferredPrompt = null;
    });
}

// ===== ONLINE/OFFLINE DETECTION =====
window.addEventListener('online', () => {
    showToast('Back online!', 'success');
});

window.addEventListener('offline', () => {
    showToast('You are offline. Data is saved locally.', 'info');
});

// ===== VISIBILITY CHANGE (pause timers when tab hidden) =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('[App] Tab hidden — pausing animations');
    } else {
        console.log('[App] Tab visible — resuming');
    }
});

// ===== KEYBOARD NAVIGATION HELPERS =====
function trapFocus(element) {
    const focusable = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    });
}

// ===== ARIA HELPERS =====
function announce(message) {
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
        document.body.appendChild(announcer);
    }
    announcer.textContent = message;
}
