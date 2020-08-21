export const facilityHTMLConverter = (facilityObj, facilities) => {
    return `
        <div> 
            Facility: ${facilityObj.facilityName}
            <br>
            Capacity: ${facilityObj.capacity}
            <br>
            Security: ${facilityObj.securityLevel}
    </div>
        `
}