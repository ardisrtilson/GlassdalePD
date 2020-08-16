import { saveNote } from "./NoteProvider.js"
import { useCriminals, getCriminals } from "../scripts/criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")
        const noteCriminal = document.querySelector("#noteForm--criminal")
        const criminalId = parseInt(noteCriminal.value)

        if (criminalId !== 0) {
        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            content: noteContent.value,
            timestamp: Date.now(),
            criminalId: parseInt(noteCriminal.value)
        }
        saveNote(newNote)
    }
    else {
        window.alert("Please choose a criminal, dummy!")
    }
}
})

const render = (criminals) => {
    console.log(criminals.id)
    contentTarget.innerHTML = `
        <input type="text" id="note--title" placeholder ="Enter note title" />
        <input type="text" id="note--author" placeholder="Your name here" />
        <textarea id="note--content" placeholder="Note text here"></textarea>
        <select id="noteForm--criminal">
        <option value="0">Select a criminal...</option>
        ${
            criminals.map(
                (criminalObject) => {
                    return `<option value="${criminalObject.id}">
                        ${ criminalObject.name }
                    </option>`
                }
            )
        }
    </select>
        <button class="buttonSpace" id="saveNote">Save Note</button>
        </article>`
}

export const NoteForm = () => {
        getCriminals()
            .then(() => {
                const criminals = useCriminals()
                render(criminals)
            })
    }