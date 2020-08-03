import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";
import { AlibiHTMLConverter } from "./AlibiHTMLGenerator.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";


const contentTarget = document.querySelector(".criminalsContainer")
const alibiTarget = document.querySelector(".alibiList")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {

    const crimeThatWasSelected = crimeSelectedEvent.detail.crimeID
    const arrayOfCrimes = useConvictions()
    const foundCrimeObject = arrayOfCrimes.find(
        (crime) => {
            return parseInt(crimeThatWasSelected) === crime.id
        }
    )
    console.log(foundCrimeObject)
    const allCriminals = useCriminals()

    const filteredByCrime = allCriminals.filter(
        (currentCriminalObject) => {
            return foundCrimeObject.name === currentCriminalObject.conviction
        }
    )
    render(filteredByCrime)
    })

eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {
    const selectedOfficer = officerSelectedEvent.detail.officerID
    const allCriminals = useCriminals()
    const filteredByOfficers = allCriminals.filter(
        (currentCriminalObject) => {
            return selectedOfficer === currentCriminalObject.arrestingOfficer
        }
    )

    render(filteredByOfficers)

    })

const render = (arrayOfCriminals) => {
    let criminalHTML = ""

    arrayOfCriminals.forEach(criminal => {
        criminalHTML += CriminalHTMLConverter(criminal)
    })

    contentTarget.innerHTML = `
            ${ criminalHTML }
    `
}

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminals= useCriminals()
          render(criminals)
        })
}

eventHub.addEventListener("showAlibi", (showAlibiEvent) => { 
    const selectedAlibi = showAlibiEvent.detail
    const allCriminals = useCriminals()
    const filteredByAlibi = allCriminals.filter(
        (currentAlibiObject) => {
            return selectedAlibi === currentAlibiObject.id
})
alibiRender(filteredByAlibi)
}
)

const alibiRender = (arrayOfAlibis) => {
const associatesAlibi=arrayOfAlibis[0].known_associates
    let alibiHTML = ""

    associatesAlibi.forEach(alibi => {
    console.log(alibi)
    alibiHTML += AlibiHTMLConverter(alibi)
})

alibiTarget.innerHTML = `<div class="criminalCard">Criminal Name: ${arrayOfAlibis[0].name}
        ${alibiHTML}
</div>`
}