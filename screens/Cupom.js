import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CupomDoUsuario from '../components/CupomDoUsuario';
import QRCode from 'react-native-qrcode-svg';
import { db } from '../config/firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../ContextPerfil.js';
import { useContext } from 'react';

export default function Cupom({route, navigation}){
    const { infosCupom } = route.params;
    const cupom = infosCupom;

    const data = cupom.data_resgate.toDate();

    const valueQr = {
      "idCupom": cupom.id,
    }

    const json = JSON.stringify(valueQr);

    const { idUser } = useContext(UserContext);

    const atualizarCupom = async () => {
      try{
        const 
      } catch(err){
        console.error(err);
        Alert.alert('Ocorreu um erro', err);
      }

      try{
        const atualizacao = await updateDoc(doc(db, 'usuario', idUser), {
          [`cuponsResgatados.${cupom.index}.troca`]: true,
        });
        console.log(atualizacao);
      } catch(err){
        console.error(err);
        Alert.alert('Ocorreu um erro', err);
      }
    }

    const validado = async () => {
      Alert.alert(
        'Validar cupom', 
        'Se este cupom já foi utilizado no mercado, clique em Validar',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Validar', onPress: () => atualizarCupom() },
        ],
        { cancelable: true },
      );
    }

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
        <View style={{flex: 1, width: '100%', alignItems: 'center', gap: 25}}>
          <CupomDoUsuario precoTroca={cupom.precoTroca} itens={cupom.itens} descPorc={cupom.descPorc} nomeMercado={cupom.mercado}/>

          <QRCode value={json} size={250} />


          <View style={estilos.areaResgate}>
            <Text>Data de troca: {data.toLocaleDateString('pt-BR')} - {data.toLocaleTimeString('pt-BR')}</Text>

            <TouchableOpacity style={estilos.btnResgatado} onPress={validado}>
              <MaterialCommunityIcons name='check' color='white' size={35} />
            </TouchableOpacity>
          </View>
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
  },
  areaResgate:{
    gap: 10,
    width: '100%',
    alignItems: 'center',
  },
  btnResgatado: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: '100%',
    backgroundColor: '#31420a',
    gap: 15,
    flexDirection: 'row',
  },
})