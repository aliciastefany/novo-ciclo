import {Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CupomDoUsuario from '../components/CupomDoUsuario';
import db from '../config/firebase'
import {doc, getDoc} from 'firebase/firestore';
import {useState, useEffect} from 'react';

export default function Cupom({route, navigation}){
    
    const {idCupom} = route.params;
    
    const [cupom, setCupom] = useState({})

    useEffect(() => {
      const getCupom = async () => {
          const getCupomUsuario = await getDoc(doc(db, 'cupons', idCupom));
          setCupom(getCupomUsuario.data());
      }
      getCupom();
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
          <CupomDoUsuario precoTroca={cupom.precoTroca} nomeMercado={cupom.nomeMercado}/>
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