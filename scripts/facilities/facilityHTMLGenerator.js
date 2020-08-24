export const facilityHTMLConverter = (facilityObj, criminals) => {
    return `
        <div> 
            Facility: ${facilityObj.facilityName}
            <br>
            Capacity: ${facilityObj.capacity}
            <br>
            Security: ${facilityObj.securityLevel}
            <br>
            Criminals:      
            <ul>
            ${criminals.map(c => `<li>${c.name}</li>`).join("")}
        </ul>
    </div>
        `
}