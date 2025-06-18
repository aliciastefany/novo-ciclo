import {Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CuponsDoUsuario from '../components/CuponsDoUsuario';
import db from '../config/firebase'
import {doc, getDoc} from 'firebase/firestore';
import {useState, useEffect} from 'react';

export default function Cupon({route, navigation}){
    
    const {idCupom} = route.params;
    
    const [cupon, setCupon] = useState({})

    useEffect(() => {
      const getCupon = async () => {
          const getCuponUsuario = await getDoc(doc(db, 'cupons', idCupom));
          setCupon(getCuponUsuario.data());
      }
      getCupon();
    }, [idCupom])

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', gap: 10}}>
        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
          </TouchableOpacity>
          <View style={{marginTop: 12}}>
            <Text style={estilos.txt_tit}>PONTOS E CUPONS</Text>
          </View>
        </View>
        <View style={{flex: 1, width: '100%', alignItems: 'center', gap: 30}}>
          <CuponsDoUsuario precoTroca={cupon.precoTroca} nomeMercado={cupon.nomeMercado}/>
          <Image source={require('../assets/qrcode_pg.png')} style={estilos.imgQrCode} />
        </View>
      </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
  cabecalho: {
    marginTop: 50,
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-around',
    gap: '5%'
  },
  txt_tit:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#31420a',
    width: '95%',
    textAlign: 'right'
  },
})