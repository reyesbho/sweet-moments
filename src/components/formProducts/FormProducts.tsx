import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useProducts } from "../../hooks/useProducts";
import { useCatalogs } from "../../hooks/useCatalogs";
import './FormProducts.css';
import { Carousel } from "../carousel/Carousel";
import { ProductDto, ProductForm } from "../../general/Interfaces";

export function FormProducts({ handleSetNewProducts, handleIsOpen }:{ handleSetNewProducts: CallableFunction, handleIsOpen:CallableFunction }) {
    const { products, setProducts, getProducts} = useProducts();
    const [productSelected, setProductSelected] = useState<ProductDto | null>(null);
    const { catalog,flavors, getCatalogsType, getFlavors } = useCatalogs()
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm<ProductForm>({
        defaultValues: {
            text: undefined,
            size: undefined,
            tipoId: undefined,
            flavorId: undefined,
            comments: undefined,
            price:undefined
        }
    });

    
    const isValidForm = (productInfo: ProductForm) => {
        if (!productInfo || !productSelected || ( 
            productInfo.size ==0 ||
            productInfo.tipoId == 0 )){
                return false;
            }
        return true;
    }

    const handleAddProduct:SubmitHandler<ProductForm> = (productInfo:ProductForm, event:any) => {
        event?.preventDefault();
        if(!isValidForm(productInfo)){
            return
        }
        const { tipoId, flavorId } = productInfo;
        
        const productRef = { ...productSelected, type:catalog.find(cat => cat.id == tipoId)?.label, flavor: flavors.find(cat => cat.id === flavorId)?.label };
        const newProducItem = { ...productInfo, product: productRef, id: new Date().getMilliseconds() };
        handleSetNewProducts(newProducItem);
        reset();
        setProductSelected(null);
        setProducts(structuredClone(products));
        handleIsOpen();
    }

    const handleClickSelect = (product: ProductDto) => {
        if(!product){
            return
        }
        getCatalogsType(product.id);
        setProductSelected(product);
    };

    return ( 
        <div className="modal"> 
        <form className="form-products" onSubmit={handleSubmit(handleAddProduct)}>
            <div className='content-products'>
                {products && 
                    <Carousel products={products.map(product => ({ ...product, isCheck: false }))}  onClickSelected={handleClickSelect}></Carousel>
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
                                {productSelected?.key == 'pizza' ? <label >Rebanadas</label> : productSelected?.key == 'coop_cake' ? <label >Cantidad</label> : <label >Tamaño (Personas)</label>}
                                <input type='number' {...register("size")} placeholder='140'></input>
                            </div>
                        <div className='form-select'>
                            <label >Tipo</label>
                            <select {...register("tipoId")}>
                                <option value=''>Seleccionar</option>
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
                                <option value=''>Seleccionar</option>
                                {flavors?.map(optionSelect => (
                                    <option key={optionSelect.value} value={optionSelect.value}>
                                        {optionSelect.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        }
                        <div className='form-input'>
                            {productSelected?.key == 'coop_cake' ? <label >Precio Unitario</label> : <label >Precio</label>}

                            <input type='number' {...register("price")} placeholder='$0.00'></input>
                        </div>
                        
                        <div className='form-input'>
                            <label >Comentarios</label>
                            <textarea  {...register("comments")}></textarea>
                        </div>
                    </div>
                </div>
                <div className="form-product-buttons">
                    <button className='btn btn-cancel btn-md' type='button'  onClick={() => handleIsOpen()}>Cancelar</button>
                    <button className='btn btn-add btn-md' type='submit'  >Agregar</button>
                </div>
            </div>
        </form>
        </div>
    )
}