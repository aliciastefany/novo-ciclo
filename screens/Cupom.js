import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CupomDoUsuario from '../components/CupomDoUsuario';
import QRCode from 'react-native-qrcode-svg';

export default function Cupom({route, navigation}){
    const { infosCupom } = route.params;
    const cupom = infosCupom;

    const valueQr = {
      "idCupom": cupom.id,
    }

    const json = JSON.stringify(valueQr);

    return(
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center', gap: 10}}>
        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
          </TouchableOpacity>
          <View style={{marginTop: 12}}>
            <Text style={estilos.txt_tit}>QR CODE DO CUPOM</Text>
          </View>
        </View>
        <View style={{flex: 1, width: '100%', alignItems: 'center', gap: 30}}>
          <CupomDoUsuario precoTroca={cupom.precoTroca} descPorc={cupom.descPorc} nomeMercado={cupom.mercado}/>
          <QRCode value={json} size={250} />
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
  cobrir:{
    position: 'absolute',
    backgroundColor: '#A9C26F',
    height: 52,
    width: 120,
    top: 70,
    left: 89,
    alignContent: 'center',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  txt_cobrir:{
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontWeight: 700
  }
})