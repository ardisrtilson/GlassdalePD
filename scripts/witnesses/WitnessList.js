import { useWitness, getWitness } from "../witnesses/WitnessProvider.js";
import { WitnessHTMLConverter } from "../witnesses/WitnessHTMLGenerator.js";

const eventHub = document.querySelector(".container")
const witnessTarget = document.querySelector(".witnesses")

export const WitnessList = () => {
    getWitness().then(() => {
        const witnesses = useWitness()
        renderWitness(witnesses)
})}

eventHub.addEventListener("showWitness", (witnessSelectedEvent) => {
    WitnessList()
    })

export const renderWitness = (witnessArray) => {
    let witnessHTML = ""
    
    witnessArray.forEach(witness => {
        witnessHTML += WitnessHTMLConverter(witness)
    })
    witnessTarget.innerHTML = `
    ${ witnessHTML }
`
}

const render = () => {

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