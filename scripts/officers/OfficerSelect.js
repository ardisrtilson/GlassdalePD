import { getOfficers, useOfficers} from "./OfficerProvider.js"

const contentTarget = document.querySelector(".filters__officers")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {

    const officerSelected = new CustomEvent("officerSelected", {
        detail: { 
            officerID: changeEvent.target.name
        }
    })

    eventHub.dispatchEvent(officerSelected)
})

const render = officerCollection => {
    
    contentTarget.innerHTML = `                
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officerCollection.map(
                    officerObject => {
                        return `<option value="${officerObject.name}">${officerObject.name}</option>`
                    }
                ).join("")
            }
        </select>
    `
}

export const OfficerSelect = () => {
    getOfficers().then(() => {

        const convictions = useOfficers()

        render(convictions)
    })
}