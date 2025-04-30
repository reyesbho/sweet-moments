
import { ClientDto } from "../general/Dtos";
import { ClienteModel } from "../general/Models";
import { API_CLIENTE } from "../general/url";
import {  mapToClienteDto } from "../utils/mapsToDto";

export const searchClient = async({search}:{search:String}):Promise<ClientDto[]> => {
    if (search === '') return [];

    try {
        const response = await fetch(API_CLIENTE+ `?search=${search}`,
        {
            method:"GET",
        }
        );
        const clients = await response.json();
        return clients?.map((cliente:ClienteModel) => mapToClienteDto(cliente))

    } catch (error) {
        throw new Error("Error al buscar el nombre");
    }
}
