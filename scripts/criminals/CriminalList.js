import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";
import { getFacilities, useFacilities } from "../facilities/FacilityProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facilities/CriminalFacilityProvider.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";

let criminals = []
let criminalFacilities = []
let facilities = []

const chosenFilters = {
    crime: "0",
    officer: "0"
}

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminalsContainer")

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

const render = () => {
    
    const arrayOfCriminalHTMLRepresentations = criminals.map(
        (criminal) => {
              
            const criminalFacilityRelationships = criminalFacilities.filter(
                (cf) => {
                    return criminal.id === cf.criminalId
                }
            )
    
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