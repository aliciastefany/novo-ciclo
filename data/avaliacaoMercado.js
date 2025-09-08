import { db } from '../config/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function getAvaliacao(mercadoId){
    const [nota, setNota] = useState(0);

    useEffect(()=>{
        const snap = onSnapshot(doc(db, 'mercados', mercadoId), (doc)=>{
            let soma = 0;
            let notaFinal = 0;

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
        }); 

        return ()=>snap();
    }, [mercadoId]);

    return nota;
}