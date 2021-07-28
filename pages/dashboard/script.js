"use strict";

// go to create notes
const createNoteButton = document.getElementById('create-note-button');

createNoteButton.addEventListener("click", () => {
    document.location.href = '../createNote/createNote.html';
});

// add notes
const notes = [
    {
        id: 0,
        title: "Título da Nota 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "02/05/2021",
    },
    {
        id: 1,
        title: "Título da Nota 2",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "12/05/2021",
    },
    {
        id: 2,
        title: "Título da Nota 3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "22/05/2021",
    },
    {
        id: 3,
        title: "Título da Nota 4",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "15/06/2021",
    },
    {
        id: 4,
        title: "Título da Nota 5",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "01/02/2020",
    },
];

const notesContainer = document.getElementById("notes-container");

notes.forEach(element => {
    var mainContainer = document.createElement("div");
    var containerNote = document.createElement("div");
    var titleNote = document.createElement("p");
    var textNote = document.createElement("p");
    var boldNote = document.createElement("b");
    containerNote.className = "note-label";

    boldNote.appendChild(document.createTextNode(element.title));
    textNote.appendChild(document.createTextNode(element.text.substring(0, 55) + '...'));
    titleNote.appendChild(boldNote);
    containerNote.appendChild(titleNote);
    containerNote.appendChild(textNote);
    mainContainer.appendChild(containerNote)
    notesContainer.appendChild(mainContainer)
    
});

// dropdown notes
const allNotes = notesContainer.childNodes;
var count = 0;
const drops = new Array;

allNotes.forEach(element => {
    if (count > 2) {
        element.onclick = function(){
            if (drops.indexOf(element) !== -1) {
                element.removeChild(element.childNodes[1]);
                drops.splice(drops.indexOf(element), 1);
                element.style = "height: 66px";
            } else {
                drops.push(element);
                const drop = document.createElement("div");
                drop.className = "drop-element";
                element.style = "height: 100%";
                drop.style = "height: 150px; background-color: #5E2129; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;";
                element.appendChild(drop);
            }
        }
    }
    count += 1;
})
