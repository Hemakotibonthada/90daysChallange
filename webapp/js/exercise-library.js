/* ============================================
   EXERCISE LIBRARY MODULE
   Complete bodyweight exercise database,
   with instructions, muscles, difficulty,
   workout builder, exercise search
   ============================================ */

const exerciseLibrary = {
    "Push-ups": {
        category: "upper", muscles: ["Chest", "Triceps", "Shoulders"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Start in a plank position with hands slightly wider than shoulders",
            "Keep body in a straight line from head to heels",
            "Lower chest toward the floor by bending elbows",
            "Push back up to starting position",
            "Keep core tight throughout the movement"
        ],
        variations: ["Knee push-ups", "Wide push-ups", "Diamond push-ups", "Decline push-ups", "Archer push-ups"],
        sets: "3-4", reps: "10-20", rest: "60s"
    },
    "Diamond Push-ups": {
        category: "upper", muscles: ["Triceps", "Chest", "Shoulders"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Form a diamond shape with your hands under your chest",
            "Thumbs and index fingers touching",
            "Lower your chest to your hands",
            "Push back up while keeping elbows close to body",
            "Excellent for tricep activation"
        ],
        variations: ["Elevated diamond push-ups", "Slow diamond push-ups"],
        sets: "3", reps: "8-15", rest: "60s"
    },
    "Pike Push-ups": {
        category: "upper", muscles: ["Shoulders", "Triceps"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Start in a downward dog position with hips high",
            "Hands shoulder-width apart",
            "Bend elbows and lower head toward the floor",
            "Push back up to starting position",
            "Great shoulder press alternative"
        ],
        variations: ["Elevated pike push-ups", "Wall handstand push-ups"],
        sets: "3", reps: "8-12", rest: "90s"
    },
    "Dips (Chair)": {
        category: "upper", muscles: ["Triceps", "Chest", "Shoulders"],
        difficulty: "beginner", equipment: "chair",
        instructions: [
            "Place hands on the edge of a chair behind you",
            "Extend legs out in front",
            "Lower body by bending elbows to 90 degrees",
            "Push back up to starting position",
            "Keep back close to the chair"
        ],
        variations: ["Bent knee dips", "Single leg dips", "Weighted dips"],
        sets: "3", reps: "10-15", rest: "60s"
    },
    "Squats": {
        category: "lower", muscles: ["Quadriceps", "Glutes", "Hamstrings"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Stand with feet shoulder-width apart",
            "Push hips back and bend knees",
            "Lower until thighs are parallel to floor",
            "Keep chest up and knees tracking over toes",
            "Drive through heels to stand back up"
        ],
        variations: ["Sumo squats", "Pulse squats", "Jump squats", "Pistol squats", "Bulgarian split squats"],
        sets: "3-4", reps: "15-25", rest: "60s"
    },
    "Jump Squats": {
        category: "lower", muscles: ["Quadriceps", "Glutes", "Calves"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Start in a regular squat position",
            "Lower into a squat",
            "Explosively jump up as high as you can",
            "Land softly with bent knees",
            "Immediately go into the next rep"
        ],
        variations: ["Tuck jumps", "180-degree jump squats"],
        sets: "3", reps: "10-15", rest: "90s"
    },
    "Lunges": {
        category: "lower", muscles: ["Quadriceps", "Glutes", "Hamstrings"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Stand tall with feet hip-width apart",
            "Step forward with one leg",
            "Lower until both knees are at 90 degrees",
            "Push through front heel to return",
            "Alternate legs"
        ],
        variations: ["Reverse lunges", "Walking lunges", "Lateral lunges", "Curtsy lunges", "Jump lunges"],
        sets: "3", reps: "10-15 each", rest: "60s"
    },
    "Glute Bridges": {
        category: "lower", muscles: ["Glutes", "Hamstrings", "Core"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Lie on your back with knees bent, feet flat",
            "Push through heels to lift hips off the ground",
            "Squeeze glutes at the top",
            "Hold for 1-2 seconds",
            "Lower back down slowly"
        ],
        variations: ["Single leg bridge", "Elevated bridge", "Marching bridge"],
        sets: "3", reps: "15-20", rest: "45s"
    },
    "Calf Raises": {
        category: "lower", muscles: ["Calves", "Ankles"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Stand with feet hip-width apart",
            "Rise up onto the balls of your feet",
            "Hold at the top for 1-2 seconds",
            "Lower back down slowly",
            "Can do on edge of step for more range"
        ],
        variations: ["Single leg calf raises", "Seated calf raises", "Slow eccentrics"],
        sets: "3", reps: "20-30", rest: "30s"
    },
    "Plank": {
        category: "core", muscles: ["Core", "Shoulders", "Glutes"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Start in a forearm plank position",
            "Elbows directly under shoulders",
            "Body in a straight line from head to heels",
            "Engage core, glutes, and legs",
            "Don't let hips sag or pike up"
        ],
        variations: ["Side plank", "Plank with shoulder taps", "Plank jacks", "Plank up-downs", "Plank with leg lift"],
        sets: "3", reps: "30-60s hold", rest: "45s"
    },
    "Mountain Climbers": {
        category: "core", muscles: ["Core", "Hip Flexors", "Shoulders"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Start in a push-up position",
            "Drive one knee toward your chest",
            "Quickly switch legs",
            "Keep hips level and core tight",
            "Move as fast as you can with good form"
        ],
        variations: ["Cross-body mountain climbers", "Slow mountain climbers", "Sliding mountain climbers"],
        sets: "3", reps: "20-30 each", rest: "45s"
    },
    "Bicycle Crunches": {
        category: "core", muscles: ["Abs", "Obliques"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Lie on your back with hands behind head",
            "Lift shoulders off the ground",
            "Bring right elbow to left knee",
            "Extend right leg while bringing left elbow to right knee",
            "Continue alternating in a pedaling motion"
        ],
        variations: ["Slow bicycle crunches", "Weighted bicycle crunches"],
        sets: "3", reps: "15-20 each", rest: "30s"
    },
    "Leg Raises": {
        category: "core", muscles: ["Lower Abs", "Hip Flexors"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Lie flat on your back, legs straight",
            "Place hands under your hips for support",
            "Raise legs to 90 degrees keeping them straight",
            "Lower slowly without touching the floor",
            "Keep lower back pressed to the ground"
        ],
        variations: ["Single leg raises", "Flutter kicks", "Hanging leg raises"],
        sets: "3", reps: "12-15", rest: "45s"
    },
    "Russian Twists": {
        category: "core", muscles: ["Obliques", "Abs"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Sit with knees bent, feet slightly off the floor",
            "Lean back slightly to engage core",
            "Twist torso to touch the floor on each side",
            "Keep chest up and core tight",
            "Move slowly and with control"
        ],
        variations: ["Weighted Russian twists", "V-sit Russian twists"],
        sets: "3", reps: "15-20 each", rest: "30s"
    },
    "Burpees": {
        category: "full", muscles: ["Full Body", "Cardio"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Stand with feet shoulder-width apart",
            "Drop into a squat and place hands on floor",
            "Jump feet back to plank position",
            "Do a push-up (optional)",
            "Jump feet forward and explosively jump up"
        ],
        variations: ["Half burpees (no push-up)", "Burpee box jumps", "Burpee pull-ups"],
        sets: "3", reps: "8-15", rest: "90s"
    },
    "High Knees": {
        category: "cardio", muscles: ["Hip Flexors", "Core", "Calves"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Stand tall with feet hip-width apart",
            "Drive one knee up to hip height",
            "Quickly alternate legs",
            "Pump arms for momentum",
            "Stay on the balls of your feet"
        ],
        variations: ["Slow high knees", "High knee holds"],
        sets: "3", reps: "30s", rest: "30s"
    },
    "Jumping Jacks": {
        category: "cardio", muscles: ["Full Body", "Calves", "Shoulders"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Stand with feet together, arms at sides",
            "Jump feet out wide while raising arms overhead",
            "Jump back to starting position",
            "Maintain a steady rhythm",
            "Great for warm-up or cardio intervals"
        ],
        variations: ["Star jumps", "Seal jacks", "Cross-body jacks"],
        sets: "3", reps: "30-50", rest: "30s"
    },
    "Wall Sit": {
        category: "lower", muscles: ["Quadriceps", "Glutes"],
        difficulty: "beginner", equipment: "wall",
        instructions: [
            "Stand with back against a wall",
            "Slide down until thighs are parallel to floor",
            "Keep knees at 90 degrees",
            "Press back flat against the wall",
            "Hold the position"
        ],
        variations: ["Single leg wall sit", "Wall sit with calf raises"],
        sets: "3", reps: "30-60s", rest: "60s"
    },
    "Superman": {
        category: "core", muscles: ["Lower Back", "Glutes", "Shoulders"],
        difficulty: "beginner", equipment: "none",
        instructions: [
            "Lie face down with arms extended overhead",
            "Simultaneously lift arms, chest, and legs off the floor",
            "Hold for 2-3 seconds at the top",
            "Lower back down slowly",
            "Strengthens the posterior chain"
        ],
        variations: ["Superman with twist", "Alternating superman", "Superman hold"],
        sets: "3", reps: "12-15", rest: "30s"
    },
    "Bear Crawl": {
        category: "full", muscles: ["Shoulders", "Core", "Quads"],
        difficulty: "intermediate", equipment: "none",
        instructions: [
            "Start on all fours with knees hovering off the ground",
            "Move forward by stepping opposite hand and foot simultaneously",
            "Keep hips low and core engaged",
            "Take small steps",
            "Can also go backward or lateral"
        ],
        variations: ["Bear crawl hold", "Lateral bear crawl", "Bear crawl push-ups"],
        sets: "3", reps: "30s", rest: "60s"
    },
};

// ===== WORKOUT BUILDER =====
const presetWorkouts = {
    "Quick Morning (15 min)": {
        duration: 15,
        exercises: [
            { name: "Jumping Jacks", sets: 2, reps: "30" },
            { name: "Push-ups", sets: 3, reps: "10" },
            { name: "Squats", sets: 3, reps: "15" },
            { name: "Plank", sets: 2, reps: "30s" },
            { name: "Mountain Climbers", sets: 2, reps: "20" },
        ]
    },
    "Upper Body Focus (25 min)": {
        duration: 25,
        exercises: [
            { name: "Push-ups", sets: 4, reps: "12" },
            { name: "Diamond Push-ups", sets: 3, reps: "10" },
            { name: "Pike Push-ups", sets: 3, reps: "8" },
            { name: "Dips (Chair)", sets: 3, reps: "12" },
            { name: "Plank", sets: 3, reps: "40s" },
            { name: "Superman", sets: 3, reps: "12" },
        ]
    },
    "Lower Body Blast (25 min)": {
        duration: 25,
        exercises: [
            { name: "Squats", sets: 4, reps: "20" },
            { name: "Lunges", sets: 3, reps: "12 each" },
            { name: "Jump Squats", sets: 3, reps: "10" },
            { name: "Glute Bridges", sets: 3, reps: "15" },
            { name: "Wall Sit", sets: 3, reps: "30s" },
            { name: "Calf Raises", sets: 3, reps: "25" },
        ]
    },
    "Core Crusher (20 min)": {
        duration: 20,
        exercises: [
            { name: "Plank", sets: 3, reps: "45s" },
            { name: "Mountain Climbers", sets: 3, reps: "20" },
            { name: "Bicycle Crunches", sets: 3, reps: "20 each" },
            { name: "Leg Raises", sets: 3, reps: "12" },
            { name: "Russian Twists", sets: 3, reps: "15 each" },
            { name: "Superman", sets: 3, reps: "12" },
        ]
    },
    "Full Body HIIT (30 min)": {
        duration: 30,
        exercises: [
            { name: "Jumping Jacks", sets: 3, reps: "40" },
            { name: "Burpees", sets: 3, reps: "10" },
            { name: "Push-ups", sets: 3, reps: "15" },
            { name: "Squats", sets: 3, reps: "20" },
            { name: "Mountain Climbers", sets: 3, reps: "25" },
            { name: "High Knees", sets: 3, reps: "30s" },
            { name: "Plank", sets: 3, reps: "40s" },
            { name: "Lunges", sets: 3, reps: "10 each" },
        ]
    },
    "Beginner Friendly (20 min)": {
        duration: 20,
        exercises: [
            { name: "Jumping Jacks", sets: 2, reps: "20" },
            { name: "Push-ups", sets: 3, reps: "5-8 (knee OK)" },
            { name: "Squats", sets: 3, reps: "10" },
            { name: "Plank", sets: 3, reps: "15-20s" },
            { name: "Glute Bridges", sets: 3, reps: "10" },
            { name: "Superman", sets: 2, reps: "8" },
        ]
    },
};

// ===== RENDER =====
function renderExerciseLibrary(filter) {
    const container = document.getElementById('exercise-list');
    if (!container) return;

    const searchQuery = (document.getElementById('exercise-search')?.value || '').toLowerCase();
    const categoryFilter = filter || 'all';

    const exercises = Object.entries(exerciseLibrary).filter(([name, ex]) => {
        const matchesSearch = !searchQuery || name.toLowerCase().includes(searchQuery) ||
            ex.muscles.some(m => m.toLowerCase().includes(searchQuery));
        const matchesCategory = categoryFilter === 'all' || ex.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (exercises.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-dumbbell"></i><p>No exercises found.</p></div>';
        return;
    }

    const diffColors = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };
    const catIcons = { upper: 'fa-hand-rock', lower: 'fa-shoe-prints', core: 'fa-shield-alt', full: 'fa-user', cardio: 'fa-heartbeat' };

    container.innerHTML = exercises.map(([name, ex]) => `
        <div class="exercise-card" onclick="this.classList.toggle('open')">
            <div class="exercise-card-header">
                <div class="exercise-card-icon"><i class="fas ${catIcons[ex.category] || 'fa-dumbbell'}"></i></div>
                <div class="exercise-card-info">
                    <h4>${name}</h4>
                    <span class="exercise-muscles">${ex.muscles.join(', ')}</span>
                </div>
                <span class="exercise-difficulty" style="color:${diffColors[ex.difficulty]}">${ex.difficulty}</span>
                <i class="fas fa-chevron-down exercise-chevron"></i>
            </div>
            <div class="exercise-card-body">
                <div class="exercise-meta">
                    <span><i class="fas fa-layer-group"></i> ${ex.sets} sets</span>
                    <span><i class="fas fa-redo"></i> ${ex.reps} reps</span>
                    <span><i class="fas fa-clock"></i> ${ex.rest} rest</span>
                </div>
                <h5>How to do it:</h5>
                <ol class="exercise-instructions">
                    ${ex.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
                <h5>Variations:</h5>
                <div class="exercise-variations">
                    ${ex.variations.map(v => `<span class="exercise-variation-tag">${v}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderPresetWorkouts() {
    const container = document.getElementById('preset-workouts');
    if (!container) return;

    container.innerHTML = Object.entries(presetWorkouts).map(([name, workout]) => `
        <div class="preset-workout-card">
            <div class="preset-workout-header">
                <h4>${name}</h4>
                <span class="preset-duration"><i class="fas fa-clock"></i> ${workout.duration} min</span>
            </div>
            <div class="preset-exercises">
                ${workout.exercises.map(ex => `
                    <div class="preset-exercise">
                        <span class="preset-ex-name">${ex.name}</span>
                        <span class="preset-ex-detail">${ex.sets}×${ex.reps}</span>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-outline btn-sm" onclick="startWorkoutTimer('${escapeHtml(name)}')">
                <i class="fas fa-play"></i> Start Workout
            </button>
        </div>
    `).join('');
}

// ===== WORKOUT TIMER =====
let workoutTimerState = { active: false, exercise: 0, set: 0, workout: null, resting: false, timer: null, seconds: 0 };

function startWorkoutTimer(workoutName) {
    const workout = presetWorkouts[workoutName];
    if (!workout) return;

    workoutTimerState = {
        active: true,
        exercise: 0,
        set: 1,
        workout,
        workoutName,
        resting: false,
        timer: null,
        seconds: 0,
    };

    document.getElementById('workout-timer-section').style.display = 'block';
    updateWorkoutTimerDisplay();
    showToast(`Workout started: ${workoutName}`, 'success');
}

function updateWorkoutTimerDisplay() {
    const container = document.getElementById('workout-timer-display');
    if (!container || !workoutTimerState.active) return;

    const { workout, exercise, set, resting } = workoutTimerState;
    const ex = workout.exercises[exercise];
    if (!ex) { finishWorkout(); return; }

    const totalExercises = workout.exercises.length;
    const pct = ((exercise + 1) / totalExercises) * 100;

    container.innerHTML = `
        <div class="wt-progress">
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
            <span style="font-size:0.8rem;color:var(--text-muted);">Exercise ${exercise + 1}/${totalExercises}</span>
        </div>
        <div class="wt-current">
            <h3>${resting ? '⏸️ Rest' : '🏋️ ' + ex.name}</h3>
            <div class="wt-setinfo">Set ${set} of ${ex.sets}</div>
            <div class="wt-reps">${resting ? 'Take a breath!' : ex.reps}</div>
        </div>
        <div class="wt-controls">
            ${resting ?
                `<button class="btn btn-primary btn-lg" onclick="nextSet()"><i class="fas fa-play"></i> Ready!</button>` :
                `<button class="btn btn-primary btn-lg" onclick="completeSet()"><i class="fas fa-check"></i> Done</button>`
            }
            <button class="btn btn-ghost" onclick="skipExercise()">Skip <i class="fas fa-forward"></i></button>
            <button class="btn btn-ghost" onclick="endWorkoutTimer()"><i class="fas fa-stop"></i></button>
        </div>
    `;
}

function completeSet() {
    const { workout, exercise, set } = workoutTimerState;
    const ex = workout.exercises[exercise];
    const totalSets = parseInt(ex.sets) || 3;

    if (set < totalSets) {
        workoutTimerState.resting = true;
        workoutTimerState.set++;
    } else {
        workoutTimerState.exercise++;
        workoutTimerState.set = 1;
        if (workoutTimerState.exercise < workout.exercises.length) {
            workoutTimerState.resting = true;
        }
    }
    updateWorkoutTimerDisplay();
}

function nextSet() {
    workoutTimerState.resting = false;
    updateWorkoutTimerDisplay();
}

function skipExercise() {
    workoutTimerState.exercise++;
    workoutTimerState.set = 1;
    workoutTimerState.resting = false;
    updateWorkoutTimerDisplay();
}

function endWorkoutTimer() {
    workoutTimerState.active = false;
    document.getElementById('workout-timer-section').style.display = 'none';
    showToast('Workout ended!', 'info');
}

function finishWorkout() {
    workoutTimerState.active = false;
    document.getElementById('workout-timer-section').style.display = 'none';
    showToast('🎉 Workout complete! Great job!', 'success');

    if (typeof awardXP === 'function') awardXP(30, `Workout: ${workoutTimerState.workoutName}`);
    if (typeof launchConfetti === 'function') launchConfetti();

    const data = getChallengeData();
    if (data) {
        data.workoutsDone = (data.workoutsDone || 0) + 1;
        if (!data.workoutHistory) data.workoutHistory = [];
        data.workoutHistory.push({
            name: workoutTimerState.workoutName,
            date: new Date().toISOString(),
        });
        saveChallengeData(data);
    }
}

function filterExercises(category) {
    document.querySelectorAll('.exercise-filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.exercise-filter-btn[data-cat="${category}"]`)?.classList.add('active');
    renderExerciseLibrary(category);
}

// ===== INIT =====
const _origSwitchExercise = typeof switchTab === 'function' ? switchTab : null;
if (_origSwitchExercise) {
    const origSwEx = switchTab;
    switchTab = function(tabName) {
        origSwEx(tabName);
        if (tabName === 'exercises') {
            document.getElementById('topbar-title').textContent = 'Exercise Library';
            renderExerciseLibrary();
            renderPresetWorkouts();
        }
    };
}
