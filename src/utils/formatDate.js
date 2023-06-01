import { dateOptions  as options} from "../general/Constants";

export const formatDate= (dateString) => {
    
    return new Date(dateString).toLocaleString("es-MX", options);
}