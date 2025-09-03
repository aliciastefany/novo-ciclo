import { SafeAreaView, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardMaterial from '../components/CardMaterial';
import { materiais } from '../data/dadosMateriais';
import { db } from "../config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import Legenda from '../components/Legenda';

export default function Home({navigation}){
  const [pontos, setPontos] = useState(0); 
  const [lixoKG, setLixoKG] = useState(0); 

  useEffect(() => {
    const getPontos = onSnapshot(doc(db, 'usuario', 'WvwjLK9WqoQOsld2nv8AvxIoen32'), (doc) => {
      setPontos(doc.data().pontos);
    });
    return () => getPontos();
  }, [])

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 0.37, width: '100%'}}>
        <View>
          <ImageBackground source={require('../assets/fundo-home.jpg')} style={estilos.img_fundo} />

          <View style={estilos.opacidade} />

          <View style={estilos.menu}>
            <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
              <MaterialCommunityIcons name="menu" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={estilos.area_text_img_fundo}>
          <Text style={estilos.text_fundo}>Veja sobre a reciclagem dos produtos!</Text>
        </View>
      </View>

       <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={estilos.area_btns}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10}}
            data={materiais}
            renderItem={({item})=>(
              <CardMaterial item={item} onPress={()=>navigation.navigate('Itens', {materiais: item})}/>
            )}
            keyExtractor={(item)=>item.id}
            contentContainerStyle={{gap: 20}}
          />
        </View>

        <View style={estilos.linha} />

        <View style={estilos.pontos}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <Image source={require('../assets/circ_prog.png')} style={{width: 100, height: 100}} />

              <View style={estilos.texto_img}>
                <Text style={{fontWeight: 500, fontSize: 15}}>{lixoKG} kg</Text>
              </View>
            </View>

            <View style={{flex: 1, marginTop: 8}}>
              <FlatList
                data={materiais}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                  <Legenda corLegenda={item.corLegenda} titulo={item.titulo} />
                )}
                contentContainerStyle={{gap: 7}}
              />
            </View>
          </View>

          <View style={{flex: 2, alignItems: 'center'}}>
            <View style={{width: '100%', alignItems: 'flex-end', paddingRight: 20}}>
              <View>
                <Text style={{fontSize: 22, fontWeight: 800}}>Seu Progresso</Text>
              </View>

              <View style={{marginTop: 6}}>
                <Text style={estilos.text_prog}>Você já reciclou {pontos} kg de lixo.</Text>
              </View>
            </View>

            <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
              <View style={estilos.card_pontos}>
                <View style={estilos.tit_card}>
                  <Text style={estilos.text_pts}>SEUS PONTOS</Text>
                </View>

                <View style={{gap: 4, width: '70%', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, fontWeight: 700}}>{pontos}</Text>
                    <Text style={{fontWeight: 500}}>pontos</Text>
                  </View>

                  <View style={{marginTop: -8}}>
                    <Text style={{textAlign: 'center', fontWeight: 500}}>com produtos reciclados</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fundo:{
    width: '100%',
    height: '100%',
    borderTopWidth: 1,
    borderColor: '#31420A8C'
  },

  area_text_img_fundo: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: 165
  },

  text_fundo: {
    fontSize: 22,
    color: 'white',
    fontWeight: 700
  },

  opacidade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#31420A8C',  
  },

  area_btns:{
    flex: 1.6,
    marginTop: 7,
    width: '100%',
    marginBottom: 7
  },

  btn_materiais:{
    alignItems: 'center',
  },

  geral_btns:{
    width: 340,
    height: 80,
    borderRadius: 20,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titulo:{
    color: 'white',
    fontSize: 20,
    fontWeight: 500
  },

  descricao: {
    color: 'white',
    fontWeight: 400
  },

  cont_img: {
    position: 'absolute',
    right: 18,
  },

  img: {
    width: 50,
    height: 50,
  },

  linha:{
    marginBottom: 10,
    backgroundColor: 'black',
    width: '83%',
    height: 1
  },

  pontos: {
    flex: 1, 
    marginBottom: 10, 
    width: '100%',
    flexDirection: 'row',
  },

  area_legendas:{
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '90%',
    left: 17,
  },

  bola_leg:{
    width: 20,
    height: 20,
    borderRadius: 20,
  },

  legendas:{
    fontSize: 15,
  },

  text_prog:{
    fontSize: 15,
    fontWeight: 500
  },

  card_pontos:{
    width: '62%',
    height: '88%',
    backgroundColor: '#6b803b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    gap: 8,
    paddingVertical: 8,
    marginTop: 7
  },

  tit_card:{
    backgroundColor: 'white',
    height: '30%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  text_pts:{
    fontWeight: 700,
    fontSize: 16
  },

  texto_img:{
    position: 'absolute',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menu:{
    position: 'absolute',
    right: 17,
    top: 20
  },
});