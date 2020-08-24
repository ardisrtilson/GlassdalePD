import { useNotes, getNotes, editNote } from "./NoteProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".editFieldContainer")

let capturedId = 0

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        capturedId = id
    render()
    }
})   

const render = () => {
    contentTarget.innerHTML = `
        </article>
        <textarea class="edit--content" placeholder="Edit Your Text Here"></textarea>
        <button class="buttonSpace" id="saveEditedNote">Save Changes</button>
        </article>`
}

    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === ("saveEditedNote")) {
            const editedText = document.querySelector(".edit--content")
            getNotes()
            .then(() => {
            const allNotes = useNotes()
            const foundNote = allNotes.find(findNote => findNote.id === parseInt(capturedId))
            foundNote.content = editedText.value
            console.log(foundNote.content)
            editNote(foundNote)
            })
    }})