"use strict";

const userToken = sessionStorage.getItem('@semprenotas:token');

if (userToken === '') {
    document.location.href = '../login/login.html'
}

const createNoteButton = document.getElementById('to-createnote-button');

createNoteButton.addEventListener("click", () => {
    const titleNote = document.getElementById('title_note').value;
    const textNote = document.getElementById('text_note').value;

    console.log(userToken);
    const createNoteEndpoint = "http://localhost:8080/anotacao/";

    (async () => {
        const createNote = await fetch(createNoteEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: userToken, nota: {title: titleNote, description: textNote}})
        })
        .then(response => {
            if (response.status === 201 || response.status === 200) {
                document.location.href = '../dashboard/dashboard.html';
            }
        })
        .catch(error => console.log(error));
      })();
});


const lateralBarEvents = () => {
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
        },
    ];

    const lateralBar = document.getElementById("lateralbar");

    events.forEach(element => {
        var boxEvent = document.createElement("div");
        boxEvent.className = "event-calendar";
        var contentBoxEvent = document.createElement("div");
        contentBoxEvent.className = "box-event-lateral-bar";
        
        var boldTitle = document.createElement("b");
        boldTitle.appendChild(document.createTextNode(element.title));
        var titleEvent = document.createElement("p");
        titleEvent.appendChild(boldTitle);

        var dateEvent = document.createElement("p");
        dateEvent.appendChild(document.createTextNode(element.date));

        contentBoxEvent.appendChild(titleEvent);
        contentBoxEvent.appendChild(dateEvent);
        boxEvent.appendChild(contentBoxEvent);
        lateralBar.appendChild(boxEvent);
    })

}

lateralBarEvents();