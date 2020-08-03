export const WitnessHTMLConverter = (witnessObj) => {
    return `
        <div> 
            Associate Name: ${witnessObj.name}
            <br>
            Statments: ${witnessObj.statements}
    </div>
        `
}