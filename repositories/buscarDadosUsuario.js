import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { onSnapshot, doc } from "firebase/firestore";

export const getDados = (id) =>{
    const [dados, setDados] = useState('');

    useEffect(()=>{
        const snap = onSnapshot(doc(db, 'usuario', id), (doc) => {
            setDados(doc.data());
        }); 
        
        return ()=>snap();
    }, []);
    
    return dados;
} 