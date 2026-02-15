// ----------------
// GAME STATE
// ----------------

let day = 1;
let memory = 100;

const nextButton = document.getElementById('next-button');
const dialogueBox = document.getElementById('dialogue-box');
const layer = document.getElementById('interactive-layer');
const background = document.getElementById('background');

// ----------------
// GAME LOGIC
// ----------------

// this is for each day i.e. 1 = day 1, 2 = day 2, etc.
const gameData = {
    1: {
        roomNotes: [
            "You got into a car accident and woke up in your bed.",
            "It seems that your memory resets every day.",
            "Check your phone for clues about your past."
        ],
        friendsDialogue: [
            "Hey, how are you doing?", 
            "Remember last semester at the beach? We had so much fun!"
        ],
        dateDialogue: [
            "He smiles at you warmly. 'It's so good to see you again,' he says.",
            "You feel a strange sense of familiarity with him, but don't quite know why."
        ]
    },
    2: {
        roomNotes: [
            "You woke up confused again in your bed.",
            "Your phone illuminates the dark room.",
            "Don't trust your memory."
        ],
        friendsDialogue: [
            "Your friends look at you with concern.", 
            "You can't remember the joke they told you yesterday."
        ],
        dateDialogue: [
            "He orders your favorite meal.",
            "You don't remember ever enjoying it."
        ]
    },
    3: {
        roomNotes: [
            "You wake up to a blistering headache.",
            "Your room feels unfamiliar, yet strangely comforting.",
            "You find a note on your bedside table: 'Don't forget who you are.'"
        ],
        friendsDialogue: [
            "Your friends are trying to jog your memory.",
            "They mention a trip you took together, but you can't recall it."
        ],
        dateDialogue: [
            "He takes you to a place you used to love, but now it feels alien.",
            "You struggle to connect with him, even though you know he's important to you."
        ]
    },
     4: {
        roomNotes: [
            "Your room is messy and disorganized, reflecting the chaos in your mind.",
            "You find a note in your journal: 'The truth is hidden in plain sight.'",
            "You see a calendar with important dates circled, but you can't remember why."
        ],
        friendsDialogue: [
            "Your friends show you photos of past events, but the faces are blurred and unrecognizable.",
            "They talk about inside jokes and shared experiences, but you can't recall any of them."
        ],
        dateDialogue: [
            "He looks at you with a mix of sadness and frustration. 'I don't know how to help you,' he says.",
            "You feel a deep sense of loss and isolation, 'What's wrong with me?' you think to yourself."
        ]
    },
     5: {
        roomNotes: [
            "Your room is empty and sterile, anything that was once familiar is gone.",
            "You find a note on the wall: 'The end is near.'",
            "You look outside and see the sun setting, signaling the end of another day, and perhaps the end of your memories as well."
        ],
        friendsDialogue: [
            "Your friends have stopped trying to reach out to you, their faces now just distant memories.",
            "They're angry at you for not remembering them, remembering their names or how you met them."
        ],
        dateDialogue: [
            "You observe him from a distance, feeling a deep sense of loss and longing.",
            "You can't remember the last time you were truly happy together."
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
    background.src = "assets/room/day-1-scene-1.png";
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
    background.src = "assets/friends/day-1-scene-2.png";
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
    background.src = "assets/date/day-1-scene-3.png";
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

// -----------------------------------
// REFLECTION SCREEN
// -----------------------------------

function reflectionScreen() {
    background.src = "";
    layer.innerHTML = "";
    nextButton.style.display = "none";

    dialogueBox.innerHTML = `
    <h2>Reflection - Questions</h2>
    <p>What did your friend say on Day 2?</p>
    <p>What did your date order on Day 4?</p>

  `;
}

// ------------
// FINAL PAGE
// ------------
function finalPage() {
    background.src = "";
    layer.innerHTML = "";
    nextButton.style.display = "none";

    dialogueBox.innerHTML = `
    <h2>Final Page</h2>
    <p>As your memory fades, you start to question the nature of your reality. Are these people truly your friends and loved ones, or just figments of a fading memory?</p> 
    <p>What does it mean to truly know someone? Is it the memories you share, or something deeper?</p>
    <p>As you lose yourself in the haze of forgotten moments, you find solace in the fleeting connections that still linger in your heart.</p>'
    `;
}

// -----------------
// START THE GAME
// -----------------
sceneRoom(1);

