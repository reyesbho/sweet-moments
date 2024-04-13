import { dateOptions  as options} from "../general/Constants";

export const formatDate= (date) => {
    if(!date){
        return "";
    }
    return new Date(date).toLocaleString("es-MX", options);
}
