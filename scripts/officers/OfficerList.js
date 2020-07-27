import { useOfficers, getOfficers } from "./OfficerProvider.js";
import { OfficerHTMLConverter } from "./OfficerHTMLGenerator.js";

const contentTarget = document.querySelector(".officersContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {

    const officerThatWasSelected = officerSelectedEvent.detail.officerID
    const arrayOfOfficers = useOfficers()
    const foundOfficersObject = arrayOfOfficers.find(
        (officer) => {
            return officerThatWasSelected === officer.name
        }
    )
    console.log(foundOfficersObject.name)

    const allOfficers = useOfficers()

    const filteredOfficers = allOfficers.filter(
        (currentOfficerObject) => {
            return foundOfficersObject.name === currentOfficerObject.name
        }
    )

    render(filteredOfficers)

    })

const render = (arrayOfOfficers) => {
    let officerHTML = ""

    arrayOfOfficers.forEach(officer => {
        officerHTML += OfficerHTMLConverter(officer)
    })

    contentTarget.innerHTML = `
    <h2 class="officerHeading">Selected Officers</h2>
    <div class="criminalsContainer">
            ${ officerHTML }
            </div>
    `
}
export const OfficerList = () => {

    getOfficers()
        .then(() => {
            const officers = useOfficers()
            render(officers)
        })
}