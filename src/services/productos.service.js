import {  collection,  getDocs } from "firebase/firestore/lite";
import { db } from "../config/firebase.config";

export const getProductos = async() => {
    try {
        const productosColl = collection(db, 'productos');
        const productosSnapshot = await getDocs(productosColl);
        const productosList = productosSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        console.log(productosList)

        return productosList?.map(producto => ({
            id:producto.id,
            name:producto.nombre,
            thumbnail: producto.image,
            status: producto.estatus
        }));
    } catch (error) {
        console.log(error)
        throw new Error("Error al buscar los productos")
    }
}