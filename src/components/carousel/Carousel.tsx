import { useEffect, useState } from "react";
import { Product } from "../product/Product";
import './Carousel.css'
import Slider from "react-slick";
import "./../../../node_modules/slick-carousel/slick/slick.css"; 
import "./../../../node_modules/slick-carousel/slick/slick-theme.css";
import { ProductSelectDto } from "../../general/Interfaces";


export function Carousel({ products, onClickSelected }:{ products:ProductSelectDto[] , onClickSelected:CallableFunction }) {
    const [productsList, setProductsList] = useState(products);

    const handleOnChange = (event:any, productSelected:ProductSelectDto, active: boolean) => {
        event.preventDefault();
        if (active) {
            const newProductSelected = { ...productSelected, isCheck: active }
            onClickSelected(newProductSelected)
            const newListProducts = [...productsList].map(product => (product.id === productSelected.id) ? newProductSelected : { ...product, isCheck: false });
            setProductsList(newListProducts)
        } else {
            const newProductsList = structuredClone(productsList);
            setProductsList(newProductsList.slice().map(product => ({ ...product, isCheck: false })))
        }
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 0
              }
            }
          ]
    };
    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {productsList &&
                    productsList.map((product) => (
                            <Product key={product.id} product={product} isCheck={product.isCheck} onClickProduct={handleOnChange}></Product>
                    ))
                }
            </Slider>
        </div>
    )
}