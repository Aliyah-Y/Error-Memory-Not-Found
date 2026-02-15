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
let gameTimeMinutes = 8 * 60; // 8 hours in minutes i.e., 8:00 AM
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
        friendAvatar: "assets/day-1/friend-avatar-1.png",
        dateAvatar: "assets/day-1/date-avatar-1.png",
        stickyImg: "assets/day-1/sticky-note-1.png",
        roomNotes: [
            { text: "You got into a car accident and woke up in your bed.", x: "12%", y: "40%", w: "120px", h: "120px" },
            { text: "It seems that your memory resets every day.", x: "40%", y: "35%", w: "140px", h: "140px" },
            { text: "Check your phone for clues about your past.", x: "70%", y: "45%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Hey, how are you doing?", 
            "Remember last semester at the beach? We had so much fun!"
        ],
        dateDialogue: [
            "He smiles at you warmly. 'It's so good to see you again,' he says.",
            "You feel a strange sense of familiarity with him, but don't quite know why."
        ],
        choices: [
            { text: "Ask about the accident", result: "surprised and explain gently.", availableFromDay: 1 }, 
            { text: "Change the subject", result: "You laugh it off; they seem relieved.", availableFromDay: 1 }
        ] 
    },
    2: {
        bgRoom: "assets/day-2/room-bg-2.png",
        bgFriends: "assets/day-2/school-bg-2.png",
        bgDate: "assets/day-2/date-bg-2.png",
        friendAvatar: "assets/day-2/friend-avatar-2.png",
        dateAvatar: "assets/day-2/date-avatar-2.png",
        stickyImg: "assets/day-2/sticky-note-2.png",
        roomNotes: [
            { text: "You woke up confused again in your bed.", x: "14%", y: "20%", w: "120px", h: "120px" },
            { text: "Your phone illuminates the dark room.", x: "50%", y: "35%", w: "140px", h: "140px" },
            { text: "Don't trust your memory.", x: "75%", y: "60%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends look at you with concern.", 
            "You can't remember the joke they told you yesterday."
        ],
        dateDialogue: [
            "He orders your favorite meal.",
            "You don't remember ever enjoying it."
        ],
        choices: [
            { text: "Ask if they're worried", result: "They say they are only trying to help.", availableFromDay: 1 }, 
            { text: "Pretend it's fine", result: "They nod but look uneasy.", availableFromDay: 1 }
        ]
    },
    3: {
        bgRoom: "assets/day-3/room-bg-3.png",
        bgFriends: "assets/day-3/school-bg-3.png",
        bgDate: "assets/day-3/date-bg-3.png",
        friendAvatar: "assets/day-3/friend-avatar-3.png",
        dateAvatar: "assets/day-3/date-avatar-3.png",
        stickyImg: "assets/day-3/sticky-note-3.png",
        roomNotes: [
            { text: "You wake up to a blistering headache.", x: "12%", y: "40%", w: "120px", h: "120px" },
            { text: "Your room feels unfamiliar, yet strangely comforting.", x: "40%", y: "35%", w: "140px", h: "140px" },
            { text: "You find a note on your bedside table: 'Don't forget who you are.'", x: "70%", y: "65%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends are trying to jog your memory.",
            "They mention a trip you took together, but you can't recall it."
        ],
        dateDialogue: [
            "He takes you to a place you used to love, but now it feels alien.",
            "You struggle to connect with him, even though you know he's important to you."
        ],
        choices: [
            { text: "Ask about the trip", result: "They describe it in detail, but you can't visualize it.", availableFromDay: 1 }, 
            { text: "Say you don't remember", result: "They seem disappointed but don't push further.", availableFromDay: 2 }
        ]
    },
     4: {
        bgRoom: "assets/day-4/room-bg-4.png",
        bgFriends: "assets/day-4/school-bg-4.png",
        bgDate: "assets/day-4/date-bg-4.png",
        friendAvatar: "assets/day-4/friend-avatar-4.png",
        dateAvatar: "assets/day-4/date-avatar-4.png",
        stickyImg: "assets/day-4/sticky-note-4.png",
        roomNotes: [
            { text: "Your room is messy and disorganized, reflecting the chaos in your mind.", x: "10%", y: "30%", w: "120px", h: "120px" },
            { text: "You find a note in your journal: 'The truth is hidden in plain sight.'", x: "45%", y: "45%", w: "140px", h: "140px" },
            { text: "You see a calendar with important dates circled, but you can't remember why.", x: "75%", y: "65%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends show you photos of past events, but the faces are blurred and unrecognizable.",
            "They talk about inside jokes and shared experiences, but you can't recall any of them."
        ],
        dateDialogue: [
            "He looks at you with a mix of sadness and frustration. 'I don't know how to help you,' he says.",
            "You feel a deep sense of loss and isolation, 'What's wrong with me?' you think to yourself."
        ],
        choices: [
            { text: "Try to explain", result: "Words fail you; they look worried.", availableFromDay: 1 }, 
            { text: "Stay silent", result: "Silence grows heavy.", availableFromDay: 3 }
        ]
    },
     5: {
        bgRoom: "assets/day-5/room-bg-5.png",
        bgFriends: "assets/day-5/school-bg-5.png",
        bgDate: "assets/day-5/date-bg-5.png",
        friendAvatar: "assets/day-5/friend-avatar-5.png",
        dateAvatar: "assets/day-5/date-avatar-5.png",
        stickyImg: "assets/day-5/sticky-note-5.png",
        roomNotes: [
            { text: "Your room is empty and sterile, anything that was once familiar is gone.", x: "10%", y: "30%", w: "120px", h: "120px" },
            { text: "You find a note on the wall: 'The end is near.'", x: "45%", y: "45%", w: "140px", h: "140px" },
            { text: "You look outside and see the sun setting, signaling the end of another day, and perhaps the end of your memories as well.", x: "75%", y: "65%", w: "130px", h: "130px" }
        ],
        friendsDialogue: [
            "Your friends have stopped trying to reach out to you, their faces now just distant memories.",
            "They're angry at you for not remembering them, remembering their names or how you met them."
        ],
        dateDialogue: [
            "You observe him from a distance, feeling a deep sense of loss and longing.",
            "You can't remember the last time you were truly happy together."
        ],
        choices: [
            { text: "Try to reach out", result: "They don't recognize you anymore.", availableFromDay: 1 }, 
            { text: "Walk away", result: "You find a bittersweet comfort in the fading memories.", availableFromDay: 4 }
        ]
    },
}











// -----------------
// UI LOGIC (user interface)
// -----------------

function showDialogue(text) {
    dialogueBox.innerText = text;
    nextButton.style.display = "block";
}

function decreaseMemory(amount) {
    memory -= amount;
    document.getElementById("memory-bar").style.width = memory + "%"

    if (memory <= 0) {
        reflectionScreen();
    }
}

// -----------------------------------
// SCENE 1 - ROOM
// -----------------------------------

function sceneRoom(day) {
    background.src = "assets/day-1/room-bg-1.png";
    layer.innerHTML = "";
    dialogueBox.innerHTML = "";
    nextButton.style.display = "none";

    const notes = gameData[day].roomNotes;
    let clicked = 0;

    notes.forEach((text, index) => {
        const note = document.createElement("div");
        note.className = "sticky";
        
        // in order to make it responsive to window size
        const noteWidth = 140; 
        const noteHeight = 140;
        const spacing = 20;
        const startX = window.innerWidth * 0.1; 
        const startY = window.innerHeight * 0.3; 
        
        note.style.left = (startX + index * (noteWidth + spacing)) + "px";
        note.style.top = startY + "px";
        note.innerText = "???";

        note.onclick = () => {
            note.innerText = text;
            note.style.opacity = 0.8;
            clicked++;

            if (clicked === notes.length) {
                nextButton.style.display = "block";
                nextButton.onclick = () => sceneFriends(day);
            }
        };

        layer.appendChild(note);
    });
}

// -----------------------------------
// SCENE 2 - FRIENDS
// -----------------------------------

function sceneFriends(day) {
    background.src = "assets/day-1/school-bg-1.png";
    layer.innerHTML = "";
    nextButton.style.display = "block";

    const dialogue = gameData[day].friendsDialogue;
    let index = 0;
    
    showDialogue(dialogue[index]);

    nextButton.onclick = () => {
        index++;
        if (index < dialogue.length) {
            showDialogue(dialogue[index]);
        } else {
            sceneDate(day);
        }
    };
}

// -----------------------------------
// SCENE 3 - DATE + MEMORY DECREASE
// -----------------------------------

function sceneDate(day) {
    background.src = "assets/day-1/date-bg-1.png";
    layer.innerHTML = "";
    nextButton.style.display = "block";

    const dialogue = gameData[day].dateDialogue;
    let index = 0;
    
    showDialogue(dialogue[index]);

    nextButton.onclick = () => {
        decreaseMemory(20);

        index++;
        if (index < dialogue.length) {
            showDialogue(dialogue[index]);
        } else {
            if (day < 5) {
                day++;
                sceneRoom(day);
            } else {
                reflectionScreen();
            }
        }
    };
}

// ------------------
// REFLECTION SCREEN
// ------------------

function reflectionScreen() {
    setBackground("");
    clearLayer();
    dialogueBox.style.display = "block";
    dialogueBox.innerHTML = `
    <h2>Reflection - Questions</h2>
    <p>What did your friend say on Day 2?</p>
    <p>What did your date order on Day 4?</p>
    `;    
    nextButton.style.display = "none";
    clearCountdown();
}

// ------------
// FINAL PAGE
// ------------
function finalPage() {
    setBackground("");
    clearLayer();
    nextButton.style.display = "none";
    dialogueBox.innerHTML = `
    <h2>Final Page</h2>
    <p>As your memory fades, you start to question the nature of your reality. Are these people truly your friends and loved ones, or just figments of a fading memory?</p> 
    <p>What does it mean to truly know someone? Is it the memories you share, or something deeper?</p>
    <p>As you lose yourself in the haze of forgotten moments, you find solace in the fleeting connections that still linger in your heart.</p>'
    `;
}

// -----------------
// RESTART THE GAME
// -----------------
startButton.addEventListener("click", () => {
    homeScreen.style.display = "none";
    gameRoot.style.display = "block";
    currentDay = 1;
    setMemory(100);
    gameTimeMinutes = 8 * 60; // reset to 8:00 AM
    dayLabel.innerText = "Day" + currentDay;
    timeLabel.innerText = minutestoHHMM(gameTimeMinutes);
    sceneRoom(currentDay);
});