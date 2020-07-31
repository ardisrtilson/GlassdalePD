const contentTarget = document.querySelector(".noteListButton")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showNotes") {
        debugger
        const customEvent = new CustomEvent("showNotesClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

export const ShowNoteButton = () => {
    contentTarget.innerHTML = "<button class='buttonSpace' id='showNotes'>Show Notes</button>"
}