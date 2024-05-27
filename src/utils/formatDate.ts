 const dateOptions:Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year:"numeric",
    day: "2-digit",
    timeZone:"UTC"
}

const timeOptions:Intl.DateTimeFormatOptions = {
    hour12 : true,
    hourCycle: "h12",
    hour: "2-digit",
    minute: "2-digit",
    timeZone:"UTC"
}

export const formatDate= (date: Date) => {
    if(!date){
        return "";
    }
    return new Date(date).toLocaleDateString("es-MX", dateOptions);
}

export const formatTime= (date:Date) => {
    if(!date){
        return '00:00';
    }
    return new Date(date).toLocaleTimeString("es-MX", timeOptions);
}