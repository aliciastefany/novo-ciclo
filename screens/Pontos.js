import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList} from 'react-native';
import {mercados} from '../data/dadosMercados';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import db from "../config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
//import {UserContext} from '../ContextPerfil';

export default function Pontos({navigation}) {

  //const {dados} = useContext(UserContext);
  
  const [pontos, setPontos] = useState(0); 

  useEffect(() => {
    const getPontos = onSnapshot(doc(db, 'usuarios', 'L0VLujsDuTYoBCMXaT4S'), (doc) => {
      setPontos(doc.data()['pontos']);
    });
    console.log(pontos);
    return () => getPontos();
  })

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
        
        <View>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu' size={40} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={{marginTop: 12}}>
          <Text style={estilos.txt_tit}>TROCAR PONTOS</Text>
        </View>

        <View style={estilos.area_cards}>
          <View style={estilos.card_pts}>
            <Text style={estilos.txt_pts}>{pontos}</Text>
          </View>

          <View style={estilos.card_lixo}>
            <Text style={estilos.txt_lixo}>27,5 KG DE LIXO RECICLADOS</Text>
          </View>
        </View>

        <View style={estilos.linha} />

        <View style={estilos.area_lista}>
          <View style={{marginLeft: 15}}>
            <Text style={estilos.title}>Escolha o mercado:</Text>
          </View>

          <View style={estilos.cont_lista}>
            <FlatList
              style={{marginVertical: 10}}
              data={mercados}
              //{item} = desestruturar
              renderItem={({item})=>(
                <TouchableOpacity style={estilos.btn} onPress={()=>navigation.navigate('Trocar Pontos', {mercadosAnt: item})}>
                  <Image style={estilos.imgs} source={item.logo} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
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
  
  area_cards:{
    width: '100%',
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10
  },

  card_pts:{
    width: '30%',
    height: 80,
    backgroundColor: '#31420a',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },

  card_lixo:{
    width: '53%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#31420a',
    padding: 10
  },

  txt_pts:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30
  },

  txt_lixo:{
    fontWeight: 'bold',
    color: '#31420a',
    fontSize: 20
  },

  linha:{
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 15
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

  cont_lista:{
    flex: 1, 
    marginTop: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn:{
    width: 135,
    height: 110,
    borderRadius: 20,
    margin: 7
  },

  imgs:{
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'black'
  }
});