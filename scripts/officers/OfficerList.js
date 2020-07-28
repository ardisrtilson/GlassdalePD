import { useOfficers, getOfficers } from "./OfficerProvider.js";
import { OfficerHTMLConverter } from "./OfficerHTMLGenerator.js";

const contentTarget = document.querySelector(".officersContainer")

const render = (arrayOfOfficers) => {
    let officerHTML = ""

    arrayOfOfficers.forEach(officer => {
        officerHTML += OfficerHTMLConverter(officer)
    })

    contentTarget.innerHTML = `
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