import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { MdLocationOn } from "react-icons/md";
import { useSearch } from "../../hooks/userSearch";
import { useCallback } from "react";
import debounce from "just-debounce";
import { useClients } from "../../hooks/useClients";
import './FormInfo.css';
import Select, { ActionMeta } from 'react-select';
import { ClientOptionDto } from "../../general/Interfaces";

export function FormInfo() {
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    const  {search, setSearch, error} = useSearch()
    const {clientsMap, getClients, loanding, errorClient} = useClients({search})
    const { register, handleSubmit, formState: { isDirty, isValid  }, setValue } = useForm<{
        clienteObj: ClientOptionDto | null,
        lugarEntrega: string,
        fechaEntrega: string
    }>({
        defaultValues: {
            clienteObj: null,
            lugarEntrega: '',
            fechaEntrega: ''
        }
    });

    const [selectedOption, setSelectedOption] = useState<ClientOptionDto | null>(null);

    const handleSelectOption = (option: ClientOptionDto | null, actionMeta: ActionMeta<ClientOptionDto>) =>{
        if(!option){    
            setSelectedOption(option)
            setValue('clienteObj', null)
        } else {    
            setSelectedOption(option)
            setValue('clienteObj', option)
            setValue('lugarEntrega', option.client.direccion)
        }
    }
    
    const debounceGetClients = useCallback(debounce(search => {
        getClients({search})
    },300), [])

    const handleChange = (event: any) => {
        setSearch(event);
        debounceGetClients(event);
      }

    return (
        //TODO falta el submit en el form
        <><form >
            <div className='btn-next-container'>
                <button className='btn btn-cancel' >Cancelar</button>
                <button type="submit" className='btn btn-next' disabled={isDirty && !isValid} >Siguiente</button>
            </div>
                <div className="form-input">
                <label htmlFor={idCliente}>Cliente</label>
                    <Select 
                        id={idCliente}
                        options={clientsMap} 
                        value={selectedOption} 
                        onInputChange={handleChange}
                        onChange={handleSelectOption}
                        isClearable = {true}
                        isSearchable = {true}
                        isLoading = {loanding}
                        />
                </div>
                <div className='form-input'>
                    <label htmlFor={idLugarEntrega}>Lugar de entrega</label>
                    <input id={idLugarEntrega} {...register("lugarEntrega",{required:true})} placeholder='Cerro prieto' type='text' />
                    <MdLocationOn></MdLocationOn>
                </div>
                <div className='form-input'>
                    <label htmlFor={idFechaHora} >Fecha y hora</label>
                    <input id={idFechaHora} {...register("fechaEntrega",{required:true})} type='datetime-local' placeholder='2023-06-04 13:30' />
                </div>
            </form>
        </>
    )
}