import { useConvictions, getConvictions } from "./ConvictionProvider.js"

const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {

    const customEvent = new CustomEvent("crimeSelected", {
        detail: { 
            crimeID: changeEvent.target.value
        }
    })

    eventHub.dispatchEvent(customEvent)
})

const render = convictionsCollection => {
    
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(
                    convictionObject => {
                        return `<option value="${ convictionObject.id }">${convictionObject.name}</option>`
                    }
                ).join("")
            }
        </select>
    `
}

export const ConvictionSelect = () => {
    getConvictions().then(() => {

        const convictions = useConvictions()

        render(convictions)
    })
}