import { useCriminals, getCriminals } from "./CriminalProvider.js";

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    getCriminals().then(() => {

        const criminals = useCriminals()
        
    for (let i = 0; i < criminals.length; i++) {
    if(clickEvent.target.id === `associates--${i}`) {
    let buttonID = i
        const customEvent = new CustomEvent("showAlibi", {detail: buttonID})
        eventHub.dispatchEvent(customEvent)
    }
}
})
})