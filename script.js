// heyyy welcome to javascript, i'm your man :p

// -----------------------------
// GLOBAL VARIABLES / SELECTORS
// -----------------------------

const startButton = document.getElementById('start-button');
const homeScreen = document.getElementById('home-screen');
const gameRoot = document.getElementById('game-root');

const nextButton = document.getElementById('next-button');
const dialogueBox = document.getElementById('dialogue-box');
const choicesWrap = document.getElementById('choices');
const layer = document.getElementById('interactive-layer');
const background = document.getElementById('background');

const dayLabel = document.getElementById('day-label');
const timeLabel = document.getElementById('time-label');
const countdownEL = document.getElementById('countdown');
const memoryBar = document.getElementById('memory-bar');
const memoryPercent = document.getElementById('memory-percent');

// ----------------
// GAME STATE
// ----------------

let currentDay = 1;
let memory = 100;
let gameTimeMinutes = 10 * 60; // 
let currentScene = 1; // so the room is scene 1, friends is scene 2, date is scene 3
let timerId = null;

// ------------------
// GAME LOGIC & DATA
// ------------------
const gameData = {
    1: {
        bgRoom: "assets/day-1/room-bg-1.png",
        bgFriends: "assets/day-1/school-bg-1.png",
        bgDate: "assets/day-1/date-bg-1.png",
        friendCharacter: "assets/day-1/friend-char-1.png",
        dateCharacter: "assets/day-1/date-char-1.png",
        stickyImg: "assets/day-1/sticky-note-1.png",
        roomNotes: [
            { text: "You got into a car accident and woke up in your bed.", 
                x: "12%", y: "40%", w: "120px", h: "120px" },
            { text: "It seems that your memory resets every day.", 
                x: "40%", y: "35%", w: "140px", h: "140px" },
            { text: "Check your phone for clues about your past.", 
                x: "70%", y: "45%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Hey, how are you doing?", 
        ],
        dateDialogue: [
            "He smiles at you warmly. 'It's so good to see you again,' he says.",
        ],
        choices: [
            { text: "Ask about the accident", result: "Your friends look at you surprised but explain gently." }, 
            { text: "Change the subject", result: "You laugh it off; they seem relieved." }
        ],
        familyPhoto: {
            src: "assets/day-1/family-photo-1.png",
            x: "80%",
            y: "30%",
            w: "150px",
            h: "100px",
        }
    },
    2: {
        bgRoom: "assets/day-2/room-bg-2.png",
        bgFriends: "assets/day-2/school-bg-2.png",
        bgDate: "assets/day-2/date-bg-2.png",
        friendCharacter: "assets/day-2/friend-char-2.png",
        dateCharacter: "assets/day-2/date-char-2.png",
        stickyImg: "assets/day-2/sticky-note-2.png",
        roomNotes: [
            { text: "You woke up confused again in your bed.", 
                x: "14%", y: "20%", w: "120px", h: "120px" },
            { text: "Your phone illuminates the dark room.", 
                x: "50%", y: "35%", w: "140px", h: "140px" },
            { text: "Don't trust your memory.", 
                x: "75%", y: "60%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends look at you with concern.", 
        ],
        dateDialogue: [
            "He orders your favorite meal. You don't remember ever enjoying it."
        ],
        choices: [
            { text: "Ask if they're worried", result: "They say they are only trying to help." }, 
            { text: "Pretend it's fine", result: "They nod but look uneasy." }
        ],
        familyPhoto: {
            src: "assets/day-2/family-photo-2.png",
            x: "80%",
            y: "30%",
            w: "150px",
            h: "100px",
        }
    },
    3: {
        bgRoom: "assets/day-3/room-bg-3.png",
        bgFriends: "assets/day-3/school-bg-3.png",
        bgDate: "assets/day-3/date-bg-3.png",
        friendCharacter: "assets/day-3/friend-char-3.png",
        dateCharacter: "assets/day-3/date-char-3.png",
        stickyImg: "assets/day-3/sticky-note-3.png",
        roomNotes: [
            { text: "You wake up to a blistering headache.", 
                x: "12%", y: "40%", w: "120px", h: "120px" },
            { text: "Your room feels unfamiliar, yet strangely comforting.", 
                x: "40%", y: "35%", w: "140px", h: "140px" },
            { text: "You find a note on your bedside table: 'Don't forget who you are.'", 
                x: "70%", y: "65%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "They mention a trip you took together, but you can't recall it."
        ],
        dateDialogue: [
            "You struggle to connect with him, even though you know he's important to you."
        ],
        choices: [
            { text: "Ask about the trip", result: "They describe it in detail, but you can't visualize it." }, 
            { text: "Say you don't remember", result: "They seem disappointed but don't push further." }
        ],
        familyPhoto: {
            src: "assets/day-3/family-photo-3.png",
            x: "80%",
            y: "30%",
            w: "150px",
            h: "100px",
        }
    },
     4: {
        bgRoom: "assets/day-4/room-bg-4.png",
        bgFriends: "assets/day-4/school-bg-4.png",
        bgDate: "assets/day-4/date-bg-4.png",
        friendCharacter: "assets/day-4/friend-char-4.png",
        dateCharacter: "assets/day-4/date-char-4.png",
        stickyImg: "assets/day-4/sticky-note-4.png",
        roomNotes: [
            { text: "Your room is messy and disorganized, reflecting the chaos in your mind.", 
                x: "10%", y: "30%", w: "120px", h: "120px" },
            { text: "You find a note in your journal: 'The truth is hidden in plain sight.'", 
                x: "45%", y: "45%", w: "140px", h: "140px" },
            { text: "You see a calendar with important dates circled, but you can't remember why.", 
                x: "75%", y: "65%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends show you photos of past events, but the faces are blurred and unrecognizable.",
        ],
        dateDialogue: [
            "He looks at you with a mix of sadness and frustration. 'I don't know how to help you,' he says.",
        ],
        choices: [
            { text: "Try to explain", result: "Words fail you; they look worried." }, 
            { text: "Stay silent", result: "Silence grows heavy." }
        ],
        familyPhoto: {
            src: "assets/day-4/family-photo-4.png",
            x: "80%",
            y: "30%",
            w: "150px",
            h: "100px",
        }
    },
     5: {
        bgRoom: "assets/day-5/room-bg-5.png",
        bgFriends: "assets/day-5/school-bg-5.png",
        bgDate: "assets/day-5/date-bg-5.png",
        friendCharacter: "assets/day-5/friend-char-5.png",
        dateCharacter: "assets/day-5/date-char-5.png",
        stickyImg: "assets/day-5/sticky-note-5.png",
        roomNotes: [
            { text: "Your room is empty and sterile, anything that was once familiar is gone.", 
                x: "10%", y: "30%", w: "120px", h: "120px" },
            { text: "You find a note on the wall: 'The end is near.'", 
                x: "45%", y: "45%", w: "140px", h: "140px" },
            { text: "You look outside and see the sun setting, signaling the end of another day, and perhaps the end of your memories as well.", 
                x: "75%", y: "65%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends have stopped trying to reach out to you, they're angry at you for not remembering them, remembering their names or how you met them."
        ],
        dateDialogue: [
            "You observe him from a distance, feeling a deep sense of loss and longing.",
        ],
        choices: [
            { text: "Try to reach out", result: "They don't recognize you anymore." }, 
            { text: "Walk away", result: "You find a bittersweet comfort in the fading memories." }
        ],
        familyPhoto: {
            src: "assets/day-5/family-photo-5.png",
            x: "80%",
            y: "30%",
            w: "150px",
            h: "100px",
        }
    },
}

// ----------------------------------------
// UTILITY FUNCTIONS + SIMPLIFYING COMMANDS
// ----------------------------------------

function setBackground(src) {
    background.src = src || "";
}

function setMemory(value) {
    memory = Math.max(0, Math.min(100, value));
    // determine the max pixel width for the bar (cache on the element)
    if (!memoryBar.dataset.maxWidth) {
        const cs = getComputedStyle(memoryBar);
        // cs.width returns px value like '220px'
        memoryBar.dataset.maxWidth = parseFloat(cs.width) || 220;
    }
    const maxW = parseFloat(memoryBar.dataset.maxWidth);
    memoryBar.style.width = (maxW * (memory / 100)) + "px";
    memoryPercent.innerText = memory + "%";
    if (memory > 60) {
        memoryBar.style.background = "linear-gradient(90deg, #5cc186, #255e2e)";
    } else if (memory > 30) {
        memoryBar.style.background = "linear-gradient(90deg, #eaf044, #cf8918)";
    } else {
        memoryBar.style.background = "linear-gradient(90deg, #e74c3c, #4f1a14)";
    }
}

function minutestoHHMM(minutes) {
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}

function advanceTime(minutes) {
    gameTimeMinutes += minutes;
    timeLabel.innerText = minutestoHHMM(gameTimeMinutes);
}

function clearLayer() {
    layer.innerHTML = "";
    dialogueBox.innerHTML = "";
    dialogueBox.style.display = "none";
    choicesWrap.innerHTML = "";
    choicesWrap.style.display = "none";
    lockNext();
    nextButton.style.display = "none";
}

// ----------------------------
// COUNTDOWN TIMER (3, 2, 1...)
// ----------------------------

function startCountdown(seconds, onTick, onEnd) {
    clearCountdown();

    if (!seconds || seconds <= 0) {
        countdownEL.innerText = "0";
        if (onEnd) onEnd();
        return;
    } 
    
    let s = seconds;
    countdownEL.innerText = s;

    timerId = setInterval(() => {
        s--;
    
    // making it more scary near the end
    if (s <= 3) {
        countdownEL.style.transform = "scale(1.2)";
    } else {
        countdownEL.style.transform = "scale(1)";
    }

    countdownEL.innerText = s;
    
    if (onTick) onTick(s);

    if (s <= 0) {
        clearCountdown();
        if (onEnd) onEnd();
    }
    }, 1000);
}

function clearCountdown() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
   }
   countdownEL.innerText = "";
   countdownEL.style.transform = "scale(1)";
}

function startSceneTimer(seconds, onEnd) {
    clearCountdown();              // always stop previous timer
    startCountdown(
        seconds,
        null,
        () => {
            onEnd && onEnd();
        }
    );
}

// ----------------------------------------
// MAKE THE STICKY NOTES APPEAR IN THE ROOM
// ----------------------------------------

function createSticky(noteData, stickyImg, onReveal) {
    const el = document.createElement("div");
    el.className = "sticky";
    el.style.left = noteData.x;
    el.style.top = noteData.y;
    if (noteData.w) el.style.width = noteData.w;
    if (noteData.h) el.style.height = noteData.h;

    // using the sticky image to cover the text before revealing
    if (stickyImg) {
        el.classList.add("sticky-img");
        el.style.backgroundImage = `url(${stickyImg})`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.innerText = ""; // hide text until revealed
    } else {
        el.innerText = "???"
    }
    el.dataset.revealed = "false";
    el.addEventListener("click", () => {
        if (el.dataset.revealed === "true") return; // already revealed
        el.dataset.revealed = "true";
        // using the image and overlaying the text
        if (stickyImg) { 
            el.innerText = ""; 
            const t = document.createElement("div"); 
            t.style.position = "relative"; 
            t.style.zIndex = "20"; 
            t.style.padding = "6px"; 
            t.style.background = "rgba(255,255,255,0.9)"; 
            t.style.borderRadius = "6px"; 
            t.style.color = "#000"; 
            t.style.fontWeight = "700"; 
            t.innerText = noteData.text; 
            el.appendChild(t); 
        } else { 
            el.innerText = noteData.text; 
        } 
        el.style.opacity = "0.95"; 
        onReveal && onReveal(el); 
    }); 
    layer.appendChild(el); 
    return el; 
} 

    // make the family photo
    function createFamilyPhoto(photoData) {
        if (!photoData) return;
        
        const el = document.createElement("div");
        el.className = "family-photo";

        el.style.left = photoData.x;
        el.style.top = photoData.y;
        el.style.width = photoData.w;
        el.style.height = photoData.h;
        el.style.backgroundImage = `url(${photoData.src})`;
        layer.appendChild(el);
    }

    // add character 
    function addCharacter(src, x, y, size = "140px") { 
        if (!src) return null; 
        const img = document.createElement("img"); 
        img.className = "character"; 
        img.src = src; 
        img.style.left = x; 
        img.style.top = y; 
        img.style.width = size; 
        layer.appendChild(img); 
        return img; 
    } 
    
    // to be able to move to the next scene appropriately
    function setNextHandler(fn) { 
        nextButton.onclick = null; 
        nextButton.onclick = fn; 
    }

    function lockNext() {
        nextButton.disabled = true;
        nextButton.onclick = null;
    }

    function unlockNext(handler) {
        nextButton.style.display = "block";
        nextButton.disabled = false;
        setNextHandler(handler);
    }


// ------------
// SCENES! :)
// ------------

// SCENE 1: ROOM

function sceneRoom(day) {
    currentScene = 1;
    const data = gameData[day];
    if (!data) {
        console.error("No data for day " + day);
        return;
    }

    setBackground(data.bgRoom);
    clearLayer();
    createFamilyPhoto(data.familyPhoto);
    clearCountdown();
    dialogueBox.innerHTML = "";
    nextButton.style.display = "none";

    // adding the sticky notes and requiring the play to click all of them before they can proceed to the next scene
    let required = data.roomNotes.length;
    let clicked = 0;

    // countdown starts and if time runs out, then all sticky notes are revealed and player gets memory penalized
    const roomTimer = 10; // seconds
    startSceneTimer(roomTimer, () => {
        // this means the timer ended and all unrevealed notes are revealed
        const notes = Array.from(layer.querySelectorAll(".sticky"));
        notes.forEach((note, idx) => {
            if (note.dataset.revealed !== "true") {
                const noteData = data.roomNotes[idx];
                note.dataset.revealed = "true";
                if (data.stickyImg) {
                    note.innerHTML = "";
                    const t = document.createElement("div");
                    t.style.position = "relative";
                    t.style.zIndex = "20";
                    t.style.padding = "10px";
                    t.style.background = "rgba(255, 255, 255, 0.9)";
                    t.style.borderRadius = "8px";
                    t.style.color = "#333";
                    t.style.fontWeight = "700";
                    t.innerText = noteData.text;
                    note.appendChild(t);
                } else {
                    note.innerText = noteData.text;
                }
                note.style.opacity = 0.8;
            }
        });
        // penalize memory for not revealing in time
        setMemory(memory - 10);
        unlockNext (() => {
            advanceTime(30);
            sceneFriends(day);
        });
    }); 

    // creating the sticky notes based on the data for the day
    data.roomNotes.forEach(note => {
        createSticky(note, data.stickyImg, () => {
            clicked++;
            if (clicked >= required) {
                clearCountdown();
                unlockNext(() => {
                    advanceTime(60);
                    sceneFriends(day);
                });
            }
        });
    });

    dayLabel.innerText = "Day " + day;
    timeLabel.innerText = minutestoHHMM(gameTimeMinutes);
}


// SCENE 2 - FRIENDS / SCHOOL
    function sceneFriends(day) {
    currentScene = 2;
    const data = gameData[day];
    if (!data) {
        console.error('No data for day', day);
        return;
    }

    setBackground(data.bgFriends);
    clearLayer();
    clearCountdown();
    lockNext();
    
    startSceneTimer(8, () => {
    // player took too long
    setMemory(memory - 5);

    unlockNext(() => {
        advanceTime(45);
        sceneDate(day);
     });
    });

    // place friend character 
    addCharacter(data.friendCharacter, "85%", "85%", "160px");

    let index = 0;
    dialogueBox.style.display = "block";
    dialogueBox.innerText = data.friendsDialogue[index] || "";

    // show choices (always enabled; no locking)
    showChoices(data.choices, day, (choice) => {
        dialogueBox.innerText = choice.result;
        unlockNext(() => {
            advanceTime(45);
            sceneDate(day);
        });
        });
    }

// SCENE 3 - DATE + MEMORY DECREASE
    function sceneDate(day) {
    currentScene = 3;
    const data = gameData[day];
    if (!data) {
        console.error('No data for day', day);
        return;
    }

    setBackground(data.bgDate);
    clearLayer();
    clearCountdown();
    
    startSceneTimer(8, () => {
    setMemory(memory - 8);

    unlockNext(() => {
        if (day < 5) {
            currentDay = day + 1;
            advanceTime(60 * 12);
            sceneRoom(currentDay);
        } else {
            reflectionScreen();
        }
    });
});

    // place date character with sensible coordinates so it stays on screen
    addCharacter(data.dateCharacter, "70%", "85%", "160px");

    let index = 0;
    dialogueBox.style.display = "block";
    dialogueBox.innerText = data.dateDialogue[index] || "";

    // show interactive choices
    showChoices(data.choices, day, (choice) => {
        dialogueBox.innerText = choice.result 
        setMemory(memory - 8);

        unlockNext(() => {
        if (day < 5) {
            currentDay = day + 1;
            advanceTime(60 * 12);
            sceneRoom(currentDay);
        } else {
            reflectionScreen();
        }
        });
    });
}

// ------------------
// REFLECTION SCREEN
// ------------------

function reflectionScreen() {
    clearLayer();
    dialogueBox.style.display = "block";
    
    dialogueBox.innerHTML = `
    <h2>Reflection</h2>
    <p>What did your friend say on Day 2?</p>
    <p>What did your date order on Day 4?</p>
    <p>What note was there on your bed on Day 3?</p>
    `;    
    nextButton.style.display = "inline-block";
    clearCountdown();
    unlockNext(finalPage);
}

// ------------
// FINAL PAGE
// ------------
function finalPage() {
    clearLayer();
    nextButton.style.display = "inline-block";
    dialogueBox.innerHTML = `
    <h2>Final Page</h2>
    <p>As your memory fades, you start to question the nature of your reality. Are these people truly your friends and loved ones, or just figments of a fading memory?</p> 
    <p>What does it mean to truly know someone? Is it the memories you share, or something deeper?</p>
    <p>As you lose yourself in the haze of forgotten moments, you find solace in the fleeting connections that still linger in your heart.</p>
    `;
    unlockNext(startGame);
}

// -----------------
// RESTART THE GAME
// -----------------
startButton.addEventListener("click", startGame);

function startGame() {
    homeScreen.style.display = "none";
    gameRoot.style.display = "block";

    currentDay = 1;
    setMemory(100);
    gameTimeMinutes = 10 * 60;

    dayLabel.innerText = "Day " + currentDay;
    timeLabel.innerText = minutestoHHMM(gameTimeMinutes);

    sceneRoom(currentDay);
}