import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";
import { AlibiHTMLConverter } from "../alibi/AlibiHTMLGenerator.js";
import {getFacilities, useFacilities} from "../facilities/FacilityProvider.js";
import {getCriminalFacilities, useCriminalFacilities} from "../facilities/CriminalFacilityProvider.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { useWitness, getWitness } from "../witnesses/WitnessProvider.js";
import { WitnessHTMLConverter } from "../witnesses/WitnessHTMLGenerator.js";


const contentTarget = document.querySelector(".criminalsContainer")
const witnessTarget = document.querySelector(".witnesses")
const alibiTarget = document.querySelector(".alibiList")
const eventHub = document.querySelector(".container")

let criminals = []
let criminalFacilities = []
let facilities = []
const chosenFilters = {
    crime: "0",
    officer: "0"
}

export const CriminalList = () => {

    getCriminals()
    .then(getFacilities)
    .then(getCriminalFacilities)
    .then(() => {
        criminals = useCriminals()
        criminalFacilities = useCriminalFacilities()
        facilities = useFacilities()

        render()
    })
}

const filterCriminals = () => {
    criminals = useCriminals()
    const arrayOfCrimes = useConvictions()

    // If a crime was chosen, filter all criminals by that crime
    if (chosenFilters.crime !== "0") {
        const foundCrimeObject = arrayOfCrimes.find(
            (crime) => {
                return parseInt(chosenFilters.crime) === crime.id
            }
        )

        criminals = criminals.filter(
            (currentCriminalObject) => {
                return foundCrimeObject.name === currentCriminalObject.conviction
            }
        )
    }

    // If an officer was chosen, filter all criminals by that crime
    if (chosenFilters.officer !== "0") {
        criminals = criminals.filter(
            (currentCriminal) => {
                if (currentCriminal.arrestingOfficer === chosenFilters.officer) {
                    return true
                }
                return false
            }
        )
    }
}

eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {

    chosenFilters.crime = crimeSelectedEvent.detail.crimeId

    filterCriminals()
    render()
})

eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {

        chosenFilters.officer = officerSelectedEvent.detail.officerId
        filterCriminals()
        render()
    })

    const render = () => {
        let criminalHTML = ""
    
        const arrayOfCriminalHTMLRepresentations = criminals.map(
            (criminal) => {
                // Get all of the criminal/facility relationships for this criminal
                const criminalFacilityRelationships = criminalFacilities.filter(
                    (cf) => {
                        return criminal.id === cf.criminalId
                    }
                )
    
                // Convert the relationship objects to facility objects
                const matchingFacilities = criminalFacilityRelationships.map(
                    (currentRelationship) => {
                        return facilities.find(
                            (facility) => {
                                return currentRelationship.facilityId === facility.id
                            }
                        )
                    }
                )
    
                return CriminalHTMLConverter(criminal, matchingFacilities)
            }
        )
    
        contentTarget.innerHTML = `
            <h2>Glassdale Convicted Criminals</h2>
            <article class="criminalList">
                ${arrayOfCriminalHTMLRepresentations.join("")}
            </article>
        `
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
    let witnessHTML = ""
    witnessArray.forEach(witness => {
        witnessHTML += WitnessHTMLConverter(witness)
    })
    witnessTarget.innerHTML = `
    ${ witnessHTML }
`
}