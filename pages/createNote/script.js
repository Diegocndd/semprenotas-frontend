const createNoteButton = document.getElementById('to-createnote-button');

createNoteButton.addEventListener("click", () => {
    const titleNote = document.getElementById('title_note').value;
    const textNote = document.getElementById('text_note').value;

    console.log(titleNote);
    console.log(textNote);
})