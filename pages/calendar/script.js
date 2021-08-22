"use strict";

const userToken = sessionStorage.getItem('@semprenotas:token');

if (userToken === '') {
    document.location.href = '../login/login.html'
}

var notes = [];

(async () => {
    await fetch('http://localhost:8080/anotacao?token=' + userToken)
        .then((resp) => resp.json())
        .then(function(data) {
            notes = [];
            data.map(e => {
                notes.push(e);
            })
            lateralBarNotes();
        })
        .catch(error => console.log(error));
})();

var events = [
    {
        id: 0,
        title: "Evento 1",
        description: "",
        dateEvent: "02/05/2021",
        participants: ['Fulano', 'Sicrano'],
    },
];

// get eventos
(async () => {
    await fetch('http://localhost:8080/evento?token=' + userToken)
        .then((resp) => resp.json())
        .then(function(data) {
            events = [];
            data.map(e => {
                events.push(e);
            })
            dropdownEvents();
        })
        .catch(error => console.log(error));
})();

const createNoteButton = document.getElementById('to-createnote-button');

// criar eventos
createNoteButton.addEventListener("click", () => {
    const titleEvent = document.getElementById('title_event').value;
    const textEvent = document.getElementById('text_event').value;
    const dateEvent = document.getElementById('date_event').value;

    const createEventEndpoint = "http://localhost:8080/evento/";

    (async () => {
        const createEvent = await fetch(createEventEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: userToken,
              evento: {
                title: titleEvent,
                date: dateEvent,
                description: textEvent,
              }})
        })
        .then(response => {
            if (response.status === 201 || response.status === 200) {
                location.reload();
            }
        })
        .catch(error => console.log(error));
      })();
});

const getEventByTitle = title => {
    var retEvent;
    events.forEach(event => {
        if (title === event.title) {
            retEvent = event;
        } else if (event.title.substring(0, 15) + '...' === title) {
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
        dateBold.appendChild(document.createTextNode(element.dateEvent));
        date.appendChild(dateBold);

        texts.appendChild(date);
    
        // adiciona o título ao container
        titleEvent.appendChild(document.createTextNode(element.title.length > 15 ? element.title.substring(0, 15) + '...' : element.title));
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
        if (element.toString() === '[object HTMLDivElement]') {
            element.onclick = function(){
                if (drops.indexOf(element) !== -1) {
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
                    dateEvent.appendChild(document.createTextNode('Data: ' + getEventByTitle(event).dateEvent))

                    dateEvent.style = `
                        color: white;
                        margin-left: 20px;
                    `;

                    var contentEvent = document.createElement("p");
                    contentEvent.appendChild(document.createTextNode('Descrição: ' + getEventByTitle(event).description))

                    contentEvent.style = `
                        color: white;
                        margin-left: 20px;
                    `;

                    drop.appendChild(titleEvent);
                    drop.appendChild(contentEvent);
                    drop.appendChild(dateEvent);

                    if (getEventByTitle(event).participants && getEventByTitle(event).participants.length > 0) {
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
            count += 1;
        }
    })
}

const lateralBarNotes = () => {

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
        dateEvent.appendChild(document.createTextNode(element.description.substring(0, 30) + '...'));

        contentBoxEvent.appendChild(titleEvent);
        contentBoxEvent.appendChild(dateEvent);
        boxEvent.appendChild(contentBoxEvent);
        lateralBar.appendChild(boxEvent);
    })

}

const dateInputMask = (elm) => {
    elm.addEventListener('keypress', function(e) {
      if(e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }
      
      var len = elm.value.length;
      
      if(len !== 1 || len !== 3) {
        if(e.keyCode == 47) {
          e.preventDefault();
        }
      }
      
      if(len === 2) {
        elm.value += '/';
      }
  
      if(len === 5) {
        elm.value += '/';
      }
    });
};

const inputDate = document.getElementById('date_event')

dateInputMask(inputDate);
