
import { API_CLIENTE } from "../general/url";

export const searchClient = async({search}:{search:String}):Promise<string[]> => {
    if (search === '') return [];

    try {
        const response = await fetch(API_CLIENTE+ `?search=${search}`,
        {
            method:"GET",
        }
        );
        const clients:string[] = await response.json();
        return clients;

    } catch (error) {
        throw new Error("Error al buscar el nombre");
    }
}
