export const AlibiHTMLConverter = (alibiObj) => {
    return `
        <div class="criminalCard"> 
            Name: ${alibiObj.name}
            <br>
            Alibi: ${alibiObj.alibi}
            <br>
    </div>
        `
}