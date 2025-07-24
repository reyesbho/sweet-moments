import { FirestoreTimestamp } from "../general/interfaces/pedido";

export const formatDate= (date: Date) => {
    if(!date){
        return "";
    }
    return new Date(date).toLocaleDateString("es-MX", {
        month: "2-digit",
        year:"numeric",
        day: "2-digit",
        timeZone:"UTC"
    });
}

export const formatTime= (date:Date) => {
    if(!date){
        return '00:00';
    }
    return new Date(date).toLocaleTimeString("es-MX", {
        hour12 : false,
        hourCycle: "h12",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export const dateTimeOptions:Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year:"numeric",
    day: "2-digit",
    hour12 : false,
    hourCycle: "h12",
    hour: "2-digit",
    minute: "2-digit",
}


export const formatDateTime= (date:FirestoreTimestamp) => {
    if(!date){
        return '';
    }
    return new Date(date.seconds * 1000).toLocaleTimeString("es-MX", dateTimeOptions);
}