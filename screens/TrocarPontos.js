import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Alert} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {cuponsAssai, cuponsCarrefour, cuponsKacula, cuponsPortoSeguro} from '../data/dadosCupons';
import {useState, useEffect} from 'react';
//import {UserContext} from '../ContextPerfil';
import db from '../config/firebase'
import {doc, updateDoc, onSnapshot} from 'firebase/firestore';

export default function TrocarPontos({route, navigation}) {

  const {mercadosAnt} = route.params;
  //const {dados, setDados} = useContext(UserContext);

  const [pontos, setPontos] = useState(0); 

  useEffect(() => {
    const getPontos = onSnapshot(doc(db, 'usuarios', 'L0VLujsDuTYoBCMXaT4S'), (doc) => {
      setPontos(doc.data().pontos);
      console.log(pontos);
    });
    return () => getPontos();
  })


  const exibirCupons = (idMercado) => {
    switch (idMercado) {
      case 'Kaçula Supermercados': return cuponsKacula;
      case 'Carrefour Hipermercado': return cuponsCarrefour;
      case 'Supermercado Porto Seguro': return cuponsPortoSeguro;
      case 'Assaí Atacadista': return cuponsAssai;
      default: return [];
    }
  };

  const cupons = exibirCupons(mercadosAnt.titulo);

  const alterarPontos = async (novoValor) => {
    await updateDoc(doc(db, 'usuarios', 'L0VLujsDuTYoBCMXaT4S'), {
      pontos: novoValor
    })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
          </TouchableOpacity>
        </View>
        
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={{marginTop: 12}}>
          <Text style={estilos.txt_tit}>PONTOS E CUPONS</Text>
        </View>

        <View style={estilos.linha} />

        <View style={estilos.area_lista}>
          <View style={{marginLeft: 15}}>
            <Text style={estilos.title}>Resgatar recompensas</Text>
          </View>

          <View style={estilos.area_img}>
            <View style={estilos.cont_img}>
              <Image source={mercadosAnt.logo} style={estilos.img_logo} />
            </View>
          </View>

          <View style={estilos.cont_lista}>
            <FlatList
              style={estilos.flatlist}
              data={cupons}
              renderItem={({item})=>(
                <View style={estilos.card_cupom}>
                  <View style={{alignItems: 'center', marginTop: -20}}>
                    <Text style={estilos.txt_troca}>Preço de troca: {item.precoTroca} pontos</Text>
                    <Image source={require('../assets/img_cupom.png')} style={estilos.img}/>  

                    <View style={estilos.cobrir}>
                      <Text style={estilos.txt_cobrir}>{item.descPorc}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={estilos.btn_troca} onPress={() => {
                    if (pontos < item.precoTroca) {
                      Alert.alert('Não foi possível resgatar cupom!', 'Você não tem pontos suficientes para resgatar esse cupom!');
                    } else {
                      const pontosAtualizados = pontos - item.precoTroca;
                      setPontos(pontosAtualizados); 
                      alterarPontos(pontosAtualizados);
                      Alert.alert('Cupom resgatado!', 'Parabéns! Você resgatou esse cupom.');
                    }
                  }}>
                    <Text style={estilos.txt_troca2}>Trocar e Resgatar!</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={{gap: 20, alignItems: 'center'}}
            />
          </View>
        </View>

        <View style={{height: 32,justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 17}}>Seus pontos: </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{pontos}</Text>
        </View>
      </View>

      <View style={{height: 10}} />
    </SafeAreaView>
  );
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
    color: '#31420a'
  },

  linha:{
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 7
  },

  area_lista:{
    flex: 1,
    width: '100%',
  },

  title:{
    fontSize: 24,
    color: '#31420a',
    fontWeight: 700
  },

  area_img:{
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },

  cont_img:{
    width: '100%', 
    height: '100%', 
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginTop: 5,
    justifyContent: 'center'
  },

  img_logo:{
    width: '50%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 25
  },

  cont_lista:{
    flex: 1, 
    marginTop: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  flatlist:{
    marginVertical: 10, 
    width: '100%', 
    //alignItems: 'center'
  },

  card_cupom:{
    width: 320,
    height: 225,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 24
  },

  img:{
    width: 250,
    height: 150,
  },

  txt_troca:{
    color: '#31420a',
    fontSize: 18,
    fontWeight: 800
  },

  btn_troca:{
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

  txt_troca2:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
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
});