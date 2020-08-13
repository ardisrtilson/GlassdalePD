import { getNotes, useNotes } from "./NoteProvider.js"
import { getCriminals, useCriminals } from '../scripts/criminals/CriminalProvider.js'
import { NoteHTMLConverter } from "./NoteHTMLConverter.js"

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})

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