import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useProducts } from "../../../hooks/useProducts";
import { catalogs } from "../../../general/Constants";
import { useCatalogs } from "../../../hooks/useCatalogs";
import './FormProducts.css'
import { Carousel } from "../../../components/carousel/Carousel";

export function FormProducts({ handleSetNewProducts }) {
    const { products,setProducts } = useProducts();
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm({
        defaultValues: {
            text: '',
            size: '',
            tipo: '',
            flavor: '',
            comments: ''
        }
    });
    const [productSelected, setProductSelected] = useState(null);
    const { catalog: typesPizza } = useCatalogs({ tipo: catalogs.pizzas })
    const { catalog: typesFlavor } = useCatalogs({ tipo: catalogs.sabores })
    const { catalog: typesJelly } = useCatalogs({ tipo: catalogs.gelatinas })
    const [types, setTypes] = useState([])


    const handleAddProduct = (productInfo) => {
        console.log(productInfo);
        const { tipo, flavor } = productInfo;
        const productRef = { ...productSelected, type:tipo, flavor };
        const newProducItem = { ...productInfo, product: productRef, id: new Date().getMilliseconds() };
        handleSetNewProducts(newProducItem);
        reset();
        setProducts([...products]);
    }



    const handleClickSelect = (product) => {
        if(!product){
            return
        }
        if ( product.id === 'pizza') {
            setTypes(typesPizza)
        }
        if (product.id === 'gelatina') {
            setTypes(typesJelly)
        }
        setProductSelected(product);
    };

    return (
        <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className='content-products'>
                {products &&
                    <Carousel products={products}  onClickSelected={handleClickSelect}></Carousel>
                }
            </div>
            <div className='content-products-info'>
                <div className='content-products-inputs'>
                    <div>
                        <div className='form-input'>
                            <label >Texto</label>
                            <input type='text' {...register("text")} placeholder='Feliz compleaños'></input>
                        </div>
                        <div className='form-input'>
                            <label >Tamaño</label>
                            <input type='number' {...register("size")} placeholder='140'></input>
                        </div>
                        <div className='form-select'>
                            <label >Tipo</label>
                            <select {...register("tipo")}>
                                <option value='' defaultValue>Seleccionar</option>
                                {types.map(optionSelect => (
                                    <option key={optionSelect.value} value={optionSelect.value}>
                                        {optionSelect.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='form-select'>
                            <label >Sabor</label>
                            <select {...register("flavor")}>
                                <option value='' defaultValue>Seleccionar</option>
                                {typesFlavor.map(optionSelect => (
                                    <option key={optionSelect.value} value={optionSelect.value}>
                                        {optionSelect.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='form-input'>
                            <label >Comentarios</label>
                            <textarea  {...register("comments")}></textarea>
                        </div>
                    </div>
                </div>
                <button className='btn-add add-product' type='submit' >Agregar</button>
                <hr></hr>
            </div>
        </form>
    )
}