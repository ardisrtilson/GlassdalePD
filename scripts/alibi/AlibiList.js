import { AlibiHTMLConverter } from "./AlibiHTMLGenerator.js";
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";

const eventHub = document.querySelector(".container")
const alibiTarget = document.querySelector(".alibiList")

eventHub.addEventListener("showAlibi", (showAlibiEvent) => { 
    getCriminals().then(() => {
    const selectedAlibi = showAlibiEvent.detail
    const allCriminals = useCriminals()
    const filteredByAlibi = allCriminals.find(
        (currentAlibiObject) => {
            return selectedAlibi === currentAlibiObject.id
        }
    )
    alibiRender(filteredByAlibi)
    })
})

const alibiRender = (arrayOfAlibis) => {
    const associatesAlibi=arrayOfAlibis.known_associates.map(
        (names) => {
            return AlibiHTMLConverter(names)
        })
    alibiTarget.innerHTML = `<div class="criminalCard">Criminal Name: ${arrayOfAlibis.name}
            ${associatesAlibi}</div>
        `
        }