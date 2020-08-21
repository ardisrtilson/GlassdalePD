const contentTarget = document.querySelector(".facility__button")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showFacilities") {
        const customEvent = new CustomEvent("showFacilities")
        eventHub.dispatchEvent(customEvent)
    }
})

export const ShowFacilitiesButton = () => {
    contentTarget.innerHTML = "<button id='showFacilities'>Show Facilities</button>"
}