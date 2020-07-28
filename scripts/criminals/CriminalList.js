import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { useOfficers} from "../officers/OfficerProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
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

    const officerThatWasSelected = officerSelectedEvent.detail.officerID
    const arrayOfOfficers = useOfficers()
    const foundOfficersObject = arrayOfOfficers.find(
        (officer) => {
            return officerThatWasSelected === officer.name
        }
    )

    console.log(foundOfficersObject.name)
    const allCriminals = useCriminals()
    const filteredByOfficers = allCriminals.filter(
        (currentCriminalObject) => {
            return foundOfficersObject.name === currentCriminalObject.arrestingOfficer
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
    <div>
    <h2 class="criminalHeading">Convicted Criminals</h2>
    <div class="criminalsContainer">
            ${ criminalHTML }
            </div>
    `
}

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminals= useCriminals()
          render(criminals)
        })
}