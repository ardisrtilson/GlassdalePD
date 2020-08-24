import { getNotes, useNotes, deleteNote, editNote} from "./NoteProvider.js"
import { getCriminals, useCriminals } from '../scripts/criminals/CriminalProvider.js'
import { NoteHTMLConverter } from "./NoteHTMLConverter.js"

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
       deleteNote(id).then(
           () => {
               const updatedNotes = useNotes()
               const criminals = useCriminals()
               render(updatedNotes, criminals)
           }
       )
    }
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editNote--")) {
        getNotes()
        .then(() => {
        const allNotes = useNotes()
        const [prefix, id] = clickEvent.target.id.split("--")
        const foundNote = allNotes.find(findNote => findNote.id === parseInt(id))
        console.log(id)
        editNote(foundNote)
        })
}})

export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const allNotes = useNotes()
            const allCriminals = useCriminals()
            render(allNotes, allCriminals)
        })
    }     

    const render = (noteArray, criminalArray) => {
        contentTarget.innerHTML = noteArray.reverse().map(currentNote => {
            const relatedCriminal = criminalArray.find(criminal => criminal.id === currentNote.criminalId)
            console.log(relatedCriminal)
                return NoteHTMLConverter(currentNote, relatedCriminal)
            }
        ).join("")

    }