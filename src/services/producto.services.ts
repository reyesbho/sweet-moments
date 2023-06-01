import { doc, getDoc } from "firebase/firestore/lite"
import { db } from "../config/firebase.config"

export const getProducto = async ({id}) => {
    console.log(id)
    try {
        const pedidoRef = doc(db, 'productos', id);
        const pedidoSnapshot = await getDoc(pedidoRef);
        if(pedidoSnapshot.exists()){
            const pedidoData = pedidoSnapshot.data();
            return {
                        id: pedidoSnapshot.id, 
                        nameProduct: pedidoData.nombre,
                        thumbnail: pedidoData.image,
                        status: pedidoData.estatus
                   }
        }else{
            throw new Error("El producto no existe")
        }

    } catch (error) {
        throw new Error("Error al buscar el producto")
    }
}