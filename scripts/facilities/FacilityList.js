import { useCriminalFacilities, getCriminalFacilities } from "./CriminalFacilityProvider.js";
import { useFacilities, getFacilities } from "./FacilityProvider.js";
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js";
import { facilityHTMLConverter } from "./facilityHTMLGenerator.js";

let criminals = []
let crimFac = []
let facilities = []

const eventHub = document.querySelector(".container")
const facilityTarget = document.querySelector(".facilityList")

eventHub.addEventListener("showFacilities", (facilitesSelectedEvent) => {
    getFacilities().then(
    getCriminalFacilities().then(
    getCriminals().then(() => {
    criminals = useCriminals()
    facilities = useFacilities()
    crimFac = useCriminalFacilities()
    renderFacilities()
    })
    ))
})

const renderFacilities = () => {

        const arrayOfFacilities =  facilities.map(
            (facility) => {
            
        const facilityCriminalRelationships = crimFac.filter(
            (cf) => {
                return facility.id === cf.facilityId
            }
        )

        const matchingCriminals = facilityCriminalRelationships.map(
            (currentRelationship) => {
                return criminals.find(
                    (criminal) => {
                        return currentRelationship.criminalId === criminal.id
                    }
                )
  
            }
        )

        return facilityHTMLConverter(facility, matchingCriminals)
        }    
    )
    facilityTarget.innerHTML = `
            ${ arrayOfFacilities.join("<br>") }
        `
        }