export const CriminalHTMLConverter = (criminalObj) => {
    return `
        <div class="criminalCard"> 
            Name: ${criminalObj.name}
            <br>
            Age: ${criminalObj.age}
            <br>
            <span class="caps">
            Eye Color: ${criminalObj.eyeColor}
            </span>
            <br>
            Work History: ${criminalObj.workHistory.join(", ")}
            <br>
            <span class="caps">
            Conviction: ${criminalObj.conviction}
            </span>
            <br>
            Arresting Officer: ${criminalObj.arrestingOfficer}
            <br>
            Incarceration Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}
            <br>
            Incarceration End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}
            <br>
            <button id="associates--${criminalObj.id}">Associate Alibis</button>
            <br>
    </div>
        `
}