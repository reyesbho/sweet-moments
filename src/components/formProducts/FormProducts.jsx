import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import { useCatalogs } from "../../hooks/useCatalogs";
import './FormProducts.css';
import { Carousel } from "../carousel/Carousel";

export function FormProducts({ handleSetNewProducts, handleIsOpen }) {
    const { products, setProducts} = useProducts();
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm({
        defaultValues: {
            text: '',
            size: '',
            tipoId: '',
            flavorId: '',
            comments: ''
        }
    });
    const [productSelected, setProductSelected] = useState(null);
    const { catalog,flavors, getCatalogsType } = useCatalogs()

    const isValidForm = (productInfo) => {
        if (!productInfo || !productSelected || ( 
            productInfo.text === '' && 
            productInfo.size === '' && 
            productInfo.flavor === '' && 
            productInfo.comments === '' )){
                return false;
            }
        return true;
    }

    const handleAddProduct = (productInfo) => {
        if(!isValidForm(productInfo)){
            return
        }
        const { tipo, flavor } = productInfo;
        
        const productRef = { ...productSelected, type:catalog.find(cat => cat.id == tipo)?.label, flavor: flavors.find(cat => cat.id === flavor).label };
        const newProducItem = { ...productInfo, product: productRef, id: new Date().getMilliseconds() };
        handleSetNewProducts(newProducItem);
        reset();
        setProductSelected(null);
        setProducts([...products]);
        handleIsOpen();
    }

    const handleClickSelect = (product) => {
        if(!product){
            return
        }
        console.log(product)
        getCatalogsType(product.id);
        setProductSelected(product);
    };

    return (
        <div className="modal"> 
        <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className='content-products'>
                {products &&
                    <Carousel products={products}  onClickSelected={handleClickSelect}></Carousel>
                }
            </div>
            <div className='content-products-info'>
                <div className='content-products-inputs'>
                    <div>
                        { 
                        productSelected?.key == 'pastel' &&
                        <div className='form-input'>
                            <label >Texto</label>
                            <input type='text' {...register("text")} placeholder='Feliz compleaños'></input>
                        </div>
                        }
                        
                            <div className='form-input'>
                                {productSelected?.key == 'pizza' ? <label >Rebanadas</label> : productSelected?.key == 'coop_cake' ? <label >Cantidad</label> : <label >Tamaño</label>}
                                <input type='number' {...register("size")} placeholder='140'></input>
                            </div>
                        <div className='form-select'>
                            <label >Tipo</label>
                            <select {...register("tipoId")}>
                                <option value='' defaultValue>Seleccionar</option>
                                {catalog.map(optionSelect => (
                                    <option key={optionSelect.value} value={optionSelect.value}>
                                        {optionSelect.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                         {productSelected?.key !== 'pizza' &&
                        <div className='form-select'>
                            <label >Sabor</label>
                            <select {...register("flavorId")}>
                                <option value='' defaultValue>Seleccionar</option>
                                {flavors?.map(optionSelect => (
                                    <option key={optionSelect.value} value={optionSelect.value}>
                                        {optionSelect.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        }
                        <div className='form-input'>
                            <label >Comentarios</label>
                            <textarea  {...register("comments")}></textarea>
                        </div>
                    </div>
                </div>
                <div className="form-product-buttons">
                    <button className='btn btn-cancel' type='none'  onClick={() => handleIsOpen()}>Cancelar</button>
                    <button className='btn btn-add' type='submit'  >Agregar</button>
                </div>
            </div>
        </form>
        </div>
    )
}