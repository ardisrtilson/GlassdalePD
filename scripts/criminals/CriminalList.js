import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";

const contentTarget = document.querySelector(".criminalsContainer")

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            let criminalHTMLRepresentations = ""
            criminalArray.forEach(criminals => {
                criminalHTMLRepresentations += CriminalHTMLConverter(criminals)
            })

            contentTarget.innerHTML = `
            <h2>Criminals</h2>
            <div class=criminalsContainer>
            ${criminalHTMLRepresentations}
            </div>
            `
        })
}