import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export function FormInfo({ onSubmit }) {
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    const { register, handleSubmit, formState: { isDirty, isValid  } } = useForm({
        defaultValues: {
            cliente: '',
            lugarEntrega: '',
            fechaEntrega: ''
        }
    });

    return (
        <><form onSubmit={handleSubmit(onSubmit)}>
            <div className='btn-next-container'>
                <button className='btn-cancel' >Cancelar</button>
                <button type="submit" className='btn-next' disabled={isDirty && !isValid} >Siguiente</button>
            </div>
            
                <div className='form-input'>
                    <label htmlFor={idCliente}>Cliente</label>
                    <input id={idCliente} type='text' {...register("cliente", {required:true})} placeholder='Juan Garcia' />
                    <FaUser></FaUser>
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