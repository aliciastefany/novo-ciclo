import {Image, StyleSheet, Text, View} from 'react-native';
import db from '../config/firebase'
import {doc, getDoc} from 'firebase/firestore';
import {useState} from 'react';

export default function Cupon(){
    
    const {idCupom} = route.params;
    
    const [cupon, setCupon] = useState({})

    useEffect(() => {
        const getCupon = async () => {
            const getCuponsUsuario = await getDoc(doc(db, 'cupons', idCupom));
            setCupon(getCuponsUsuario.data());
        }
        getCupon();
    }, [])
    

    return(
        <View>
           <View style={estilos.card_cupom} onPress={onPress}>
                <View style={{ alignItems: 'center', marginTop: -20 }}>
                    <Text style={estilos.txt_troca}>Preço de troca: {cupon.precoTroca} pontos</Text>
                    <Image source={require('../assets/img_cupom.png')} style={estilos.img} />
                </View>

                <View style={estilos.nome_mercado}><Text style={estilos.texto_mercado}>{cupon.nomeMercado}</Text></View>
            </View> 
            <Image source={require('../assets/qrcode_pg.png')} style={estilos.imgQrCode} />
        </View>
    )
}

const estilos = StyleSheet.create({
    card_cupom: {
      width: 320,
      height: 225,
      alignItems: 'center',
      borderWidth: 1,
      justifyContent: 'center',
      borderRadius: 24
    },
  
    img: {
      width: 250,
      height: 150,
    },
  
    txt_troca: {
      color: '#31420a',
      fontSize: 18,
      fontWeight: 800
    },
  
    nome_mercado:{
      backgroundColor: '#31420a',
      width: '100%',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 0,
      borderBottomLeftRadius: 23,
      borderBottomRightRadius: 23,
      height: 32
    },
    texto_mercado: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15
    }
})