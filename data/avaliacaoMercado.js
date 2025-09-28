import { db } from '../config/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function getAvaliacao(mercadoId){
    const [nota, setNota] = useState(null);

    useEffect(()=>{
        if(!mercadoId){
            return;
        }
        
        const snap = onSnapshot(doc(db, 'mercados', mercadoId), (doc)=>{
            let soma = 0;
            let notaFinal = 0;

            if(doc.data().avaliacoes_recebidas !== undefined){
               try{
                    doc.data().avaliacoes_recebidas.map((item)=>{
                        soma = soma + item.nota;
                        notaFinal = soma / doc.data().avaliacoes_recebidas.length;
                    });
                    setNota(notaFinal);
                }
                catch(err){
                    console.error(err);
                } 
            } else{
                setNota(0);
            }
        }); 

        return ()=>snap();
    }, [mercadoId]);

    return nota;
}