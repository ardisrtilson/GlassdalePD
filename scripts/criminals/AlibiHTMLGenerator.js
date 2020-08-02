export const AlibiHTMLConverter = (alibiObj) => {
    return `
        <div class="alibis"> 
            Name: ${alibiObj.name}
            <br>
            Alibi: ${alibiObj.alibi}
            <br>
    </div>
        `
}