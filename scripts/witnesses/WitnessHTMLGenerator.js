export const WitnessHTMLConverter = (witnessObj) => {
    return `
        <div> 
            Witness Name: ${witnessObj.name}
            <br>
            Statments: ${witnessObj.statements}
    </div>
        `
}