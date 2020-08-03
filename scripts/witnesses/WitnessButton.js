const contentTarget = document.querySelector(".showWitness")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showWitness") {
        const customEvent = new CustomEvent("showWitness")
        eventHub.dispatchEvent(customEvent)
    }
})

export const ShowWitnessButton = () => {
    contentTarget.innerHTML = "<button id='showWitness'>Show Witnesses</button>"
}