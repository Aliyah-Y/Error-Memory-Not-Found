// ----------------
// GAME STATE
// ----------------

let day = 1;
let memory = 100;

const nextButton = document.getElementById('nextButton');
const dialogueBOX = document.getElementById('dialogueBox');
const layer = document.getElementById('layer');
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
            
        ],
        friendsDialogue: [
            
        ],
        dateDialogue: [
            
        ]
    },
     4: {
        roomNotes: [
            
        ],
        friendsDialogue: [
            
        ],
        dateDialogue: [
            
        ]
    },
     5: {
        roomNotes: [
            
        ],
        friendsDialogue: [
            
        ],
        dateDialogue: [
            
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
        note.className = "sticky-note";
        note.style.left = (100 + index * 200) + "px";
        note.style.top = "200px";
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

