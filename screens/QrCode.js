import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../ContextPerfil.js';
import QRCode from 'react-native-qrcode-svg';
import { db } from '../config/firebase.js';

export default function QrCode({navigation}) {
  const [username, setUsername] = useState('');
  const { idUser } = useContext(UserContext);

  useEffect(()=>{
    const getUser = async () => {
      try{
        const usuario = await getDoc(doc(db, 'usuario', idUser));
        setUsername(usuario.data().username);
      }
      catch(err){
        console.error(err);
      }
    };
    getUser();
  }, [])

  const json = JSON.stringify({
    idCliente: idUser,
    username: username
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
        
        <View>
          <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu' size={40} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{alignItems: 'center', width: '100%'}}>
          <View style={{marginTop: 25, paddingLeft: 25, width: '100%'}}>
            <Text style={estilos.txt_tit}>SEU QR CODE</Text>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 15}}>
            <QRCode value={json} size={200} />
          </View>

          <View style={{width: '100%', marginTop: 24, paddingHorizontal: 20, gap: 7}}>
            <Text style={estilos.txt_tit2}>Como utilizar?</Text>
            <Text style={estilos.txt}>Quando for fazer o descarte de materiais recicláveis, como papel ou papelão, mostre esse QR Code para o responsável pelo ponto de coleta, que irá escanear e registrar os materiais e a quantidade descartada. Com isso, seus pontos serão automaticamente adicionados à sua conta no aplicativo, permitindo que você os acompanhe e troque por cupons de desconto diretamente no app.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  cabecalho:{
    marginTop: 7,
    width: '100%',
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },

  txt_tit:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#31420a',
  },

  txt_tit2:{
    fontSize: 27,
    fontWeight: 'bold',
    color: '#31420a',
  },

  txt:{
    fontSize: 18,
    textAlign:'justify'
  },

  img:{
    width: 200,
    height: 230
  }
});