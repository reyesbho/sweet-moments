import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../config/firebase.config";

export const  getCatalog = async({catalogo}) => {
    try {    
        const catColl = collection(db, catalogo);
        const catSnapshot = await getDocs(catColl);
        const catList = catSnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
        return catList?.map(cat => ({
            value: cat.id,
            label: cat.name
        }));
    } catch (error) {
        throw new Error("Error al buscar el catalogo")
    }
}