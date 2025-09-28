import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CupomDoUsuario from '../components/CupomDoUsuario';
import QRCode from 'react-native-qrcode-svg';
import { db } from '../config/firebase.js';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../ContextPerfil.js';
import { useContext, useState, useEffect } from 'react';

export default function Cupom({route, navigation}){
    const { infosCupom } = route.params;
    const cupom = infosCupom;
    const [qrcode, setQrcode] = useState(cupom.troca);
    const data = cupom.data_resgate.toDate();
    const troca = cupom.data_troca ? cupom.data_troca.toDate() : null;

    useEffect(() => {
      setQrcode(cupom.troca);
    }, [cupom]);
  
    const valueQr = {
      "idCupom": cupom.id,
      "idMercado": cupom.id_mercado
    }

    const json = JSON.stringify(valueQr);

    const { idUser } = useContext(UserContext);

    const atualizarCupom = async () => {
      try{
        const busca = await getDoc(doc(db, 'usuario', idUser));
        const arrayCupons = busca.data().cuponsResgatados;
        const marca = Timestamp.fromDate(new Date());
        arrayCupons[cupom.index] = {
          ...arrayCupons[cupom.index],
          troca: true,
          data_troca: marca,
        }

        const cuponsResgatadosId = busca.data().cuponsResgatadosId;
        const novoArray = cuponsResgatadosId.filter(item => item !== cupom.id);
        
        await updateDoc(doc(db, 'usuario', idUser), {
          cuponsResgatados: arrayCupons,
          cuponsResgatadosId: novoArray,
        });

        setQrcode(true);
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

          {
            !qrcode && <QRCode value={json} size={220} />
          }

          <View style={estilos.areaResgate}>
            <Text>Data de resgate: {data.toLocaleDateString('pt-BR')} - {data.toLocaleTimeString('pt-BR')}</Text>

            {
              qrcode ? troca !== null ?
                  <Text style={{fontSize: 19, fontWeight: 'bold', marginTop: 15}}>Data de uso: {troca.toLocaleDateString('pt-BR')} - {troca.toLocaleTimeString('pt-BR')}</Text> 
                  : <Text style={{fontSize: 19, fontWeight: 'bold', marginTop: 15}}>Cupom resgatado!</Text> 
                : 
                <TouchableOpacity style={estilos.btnResgatado} onPress={validado}>
                  <MaterialCommunityIcons name='check' color='white' size={35} />
                </TouchableOpacity>
            }
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