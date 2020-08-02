import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./CriminalHTMLConverter.js";
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
    <div>
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

eventHub.addEventListener("showAlibi", (showAlibiEvent) => {
    const allCriminals = useCriminals()
    const criminalAddress = showAlibiEvent.detail
    const foundCriminal = allCriminals.find(
        (alibi) => {
            return parseInt(criminalAddress) === alibi.id
        }
    )
    const criminalAlibi = foundCriminal.known_associates
    let nameArray = []
    let alibiArray = []
    for(const associates of criminalAlibi){
        nameArray.push(associates.name)
        alibiArray.push(associates.alibi)
    }
    alibiTarget.innerHTML = `<fieldset>Name: ${nameArray.join(" ")}<br>Alibi: ${alibiArray.join(" ")}</fieldset>`
    })