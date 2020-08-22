import { useWitness, getWitness } from "../witnesses/WitnessProvider.js";
import { WitnessHTMLConverter } from "../witnesses/WitnessHTMLGenerator.js";

const eventHub = document.querySelector(".container")
const witnessTarget = document.querySelector(".witnesses")

    eventHub.addEventListener("showWitness", (witnessSelectedEvent) => {
        getWitness().then(() => {
        const witnesses = useWitness()
        renderWitness(witnesses)
        })
    })

    const renderWitness = (witnessArray) => {
        const arrayOfWitnesses = witnessArray.map(
            (witness) => {
                return WitnessHTMLConverter(witness)
            })
        witnessTarget.innerHTML = `
                ${ arrayOfWitnesses.join("<br>") }
            `
            }