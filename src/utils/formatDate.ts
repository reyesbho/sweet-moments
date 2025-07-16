import dayjs, { Dayjs } from "dayjs";
import { FirestoreTimestamp } from "../general/interfaces/pedido";

export const dateOptions:Intl.DateTimeFormatOptions = {
    month: "2-digit",
    year:"numeric",
    day: "2-digit",
    timeZone:"UTC"
}

export const timeOptions:Intl.DateTimeFormatOptions = {
    hour12 : false,
    hourCycle: "h12",
    hour: "2-digit",
    minute: "2-digit",
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