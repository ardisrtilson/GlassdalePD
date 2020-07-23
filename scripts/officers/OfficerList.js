import { useOfficers, getOfficers } from "./OfficerProvider.js";
import { OfficerHTMLConverter } from "./OfficerHTMLGenerator.js";

const contentTarget = document.querySelector(".officersContainer")

export const OfficerList = () => {

    getOfficers()
        .then(() => {
            const officerArray = useOfficers()

            let officerHTMLRepresentations = ""

            officerArray.forEach(officer => {
                officerHTMLRepresentations += OfficerHTMLConverter(officer)
            })

            contentTarget.innerHTML = `
                <h2>Glassdale PD Officers</h2>
                <div class=officersContainer>
                    ${ officerHTMLRepresentations }
                    </div>
            `
        })
}