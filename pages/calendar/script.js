"use strict";

const events = [
    {
        id: 0,
        title: "Evento 1",
        date: "02/05/2021",
        participants: [],
    },
    {
        id: 1,
        title: "Evento 2",
        date: "03/07/2021",
        participants: [],
    },
    {
        id: 2,
        title: "Evento 3",
        date: "12/05/2021",
        participants: [],
    },
    {
        id: 3,
        title: "Evento 4",
        date: "22/04/2021",
        participants: [],
    },
    {
        id: 4,
        title: "Evento 5",
        date: "11/05/2021",
        participants: [],
    }
];

const eventsContainer = document.getElementById("event-list");

events.forEach(element => {
    var mainContainer = document.createElement("div");
    mainContainer.className = "event-label";
    var date = document.createElement("p");
    var dateBold = document.createElement("b");
    var titleEvent = document.createElement("p");

    // adiciona a data ao container
    dateBold.appendChild(document.createTextNode(element.date));
    date.appendChild(dateBold);
    mainContainer.appendChild(date);

    // adiciona o título ao container
    titleEvent.appendChild(document.createTextNode(element.title));
    mainContainer.appendChild(titleEvent);

    eventsContainer.appendChild(mainContainer);
});


// dropdown events
const allEvents = eventsContainer.childNodes;
var count = 0;
const drops = new Array;

allEvents.forEach(element => {
    if (count > 2) {
        element.onclick = function(){
            if (drops.indexOf(element) !== -1) {
                element.removeChild(element.childNodes[2]);
                drops.splice(drops.indexOf(element), 1);
                element.style = "height: 50px";
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

