export const NoteHTMLConverter = (noteObject, criminalObject) => {
    console.log(criminalObject)
    return `
    <section class="note">
    <fieldset>
    <div class="note--title">Title: ${ noteObject.title }</div>
    <div class="note--author">Author: ${ noteObject.author }</div>
    <div class="note--timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
    <br>
    <div class="note--content">${ noteObject.content }</div>
    <div class="note--related__criminal">Related Criminal: ${ criminalObject.name}</div>
    <button id="deleteNote--${noteObject.id}">Delete Note</button>
</section>   
    `
}