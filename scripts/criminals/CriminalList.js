import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";
import { AlibiHTMLConverter } from "./AlibiHTMLGenerator.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useWitness, getWitness } from "../witnesses/WitnessProvider.js";
import { WitnessHTMLConverter } from "../witnesses/WitnessHTMLGenerator.js";


const contentTarget = document.querySelector(".criminalsContainer")
const witnessTarget = document.querySelector(".witnesses")
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
    const filteredByAlibi = allCriminals.find(
        (currentAlibiObject) => {
            return selectedAlibi === currentAlibiObject.id
})
alibiRender(filteredByAlibi)
}
)

const alibiRender = (arrayOfAlibis) => {
const associatesAlibi=arrayOfAlibis.known_associates
    let alibiHTML = ""

    associatesAlibi.forEach(alibi => {
    console.log(alibi)
    alibiHTML += AlibiHTMLConverter(alibi)
})

alibiTarget.innerHTML = `<div class="criminalCard">Criminal Name: ${arrayOfAlibis.name}
        ${alibiHTML}
</div>`
}

eventHub.addEventListener("showWitness", (witnessSelectedEvent) => {
    getWitness().then(() => {
        const witnesses = useWitness()
        renderWitness(witnesses)
    })
})

const renderWitness = (witnessArray) => {
    console.log(witnessArray)
    let witnesslHTML = ""
    witnessArray.forEach(witness => {
        witnesslHTML += WitnessHTMLConverter(witness)
    })
    witnessTarget.innerHTML = `
    ${ witnesslHTML }
`
}