"use strict";

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
];

const events = [
    {
        id: 0,
        title: "Evento 1",
        date: "02/05/2021",
        participants: ['Fulano', 'Sicrano'],
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
        participants: ['Sicrano', 'Beltrano'],
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

const getEventByTitle = title => {
    var retEvent;
    events.forEach(event => {
        if (title === event.title) {
            retEvent = event;
        }
    })

    return retEvent;
}

const dropdownEvents = () => {
    
    const eventsContainer = document.getElementById("event-list");
    
    events.forEach(element => {
        var mainContainer = document.createElement("div");
        var texts = document.createElement("div");
        mainContainer.className = "event-label";
        var date = document.createElement("p");
        var dateBold = document.createElement("b");
        var titleEvent = document.createElement("p");

        // adiciona a data ao container
        dateBold.appendChild(document.createTextNode(element.date));
        date.appendChild(dateBold);

        texts.appendChild(date);
    
        // adiciona o título ao container
        titleEvent.appendChild(document.createTextNode(element.title));
        texts.appendChild(titleEvent);
        texts.style = `
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            border-radius: 10px;
            width: 70%;
        `;
        mainContainer.appendChild(texts);

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
                    console.log(element.childNodes)
                    element.removeChild(element.childNodes[1]);
                    drops.splice(drops.indexOf(element), 1);
                } else {
                    drops.push(element);
                    const drop = document.createElement("div");
                    drop.className = "drop-element";
                    drop.style = `
                        background-color: #5E2129;
                        width: 100%;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                    `;

                    var event = element.firstChild.children[1].textContent;
                    var titleEvent = document.createElement("p");
                    titleEvent.appendChild(document.createTextNode(event));
                    titleEvent.style = `
                        font-weight: bold;
                        color: white;
                        margin-left: 20px;
                    `;

                    var dateEvent = document.createElement("p");
                    dateEvent.appendChild(document.createTextNode('Data: ' + getEventByTitle(event).date))

                    dateEvent.style = `
                        color: white;
                        margin-left: 20px;
                    `;

                    drop.appendChild(titleEvent)
                    drop.appendChild(dateEvent);

                    if (getEventByTitle(event).participants.length > 0) {
                        var participants = document.createElement("p");
                        participants.appendChild(document.createTextNode("Participantes:"));
    
                        participants.style = `
                            color: white;
                            margin-left: 20px;
                        `;
                        
                        drop.appendChild(participants);

                        for (var i = 0; i < getEventByTitle(event).participants.length; i++) {
                            var participant = document.createElement("p");
                            participant.appendChild(document.createTextNode('\u2022 ' + getEventByTitle(event).participants[i]));
                            
                            participant.style = `
                                color: white;
                                margin-left: 50px;
                            `;

                            drop.appendChild(participant)
                        }

                    }

                    element.appendChild(drop);
                }
            }
        }
        count += 1;
    })
}

const lateralBarEvents = () => {

    const lateralBar = document.getElementById("lateralbar");

    notes.forEach(element => {
        var boxEvent = document.createElement("div");
        boxEvent.className = "event-calendar";
        var contentBoxEvent = document.createElement("div");
        contentBoxEvent.className = "box-event-lateral-bar";
        
        var boldTitle = document.createElement("b");
        boldTitle.appendChild(document.createTextNode(element.title));
        var titleEvent = document.createElement("p");
        titleEvent.appendChild(boldTitle);

        var dateEvent = document.createElement("p");
        dateEvent.appendChild(document.createTextNode(element.text.substring(0, 30) + '...'));

        contentBoxEvent.appendChild(titleEvent);
        contentBoxEvent.appendChild(dateEvent);
        boxEvent.appendChild(contentBoxEvent);
        lateralBar.appendChild(boxEvent);
    })

}

lateralBarEvents();
dropdownEvents();
