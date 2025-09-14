import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Image, ScrollView, Alert } from 'react-native';
import { mercados } from '../data/dadosMercados';
import { db } from '../config/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import StarRatingDisplay from 'react-native-star-rating-widget';
import { getAvaliacao } from '../data/avaliacaoMercado';

export default function InfoMercados({ navigation }) {
  const [dados, setDados] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);

  useEffect(() => {
    try{
      const getInfos = onSnapshot(doc(db, 'mercados', 'up9NTSgAfwP4pKVa8qMN'), (doc)=>{
        setDados(doc.data());
      });
        
      return ()=>getInfos();
    }
    catch(err){
      console.error(err);
    }
  }, []);

  const link = () => {
    const url = dados.website;
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir URL:', err));
  };

  const notas = getAvaliacao('up9NTSgAfwP4pKVa8qMN');
  useEffect(()=>{
    setAvaliacao(notas);
  }, [notas]);

  const notaAvaliada = () => {
    Alert.alert('Avaliação', `Sua avaliação é ${avaliacao}`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <ScrollView style={{ flex: 1, width: '100%', height: '100%' }}>
        <View style={estilos.cabecalho}>
          <View>
            <Image source={require('../assets/logo-topo.png')} style={{ width: 70, height: 70, borderRadius: 20 }} />
          </View>
        </View>

        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <View style={estilos.titulo}>
            <Text style={estilos.txt_tit}>{dados.nome}</Text>
          </View>

          <View style={estilos.area_img}>
            <View style={estilos.cont_img}>
              <Image source={mercados[0].logo} style={estilos.img} />
            </View>
          </View>

          <View style={estilos.area_infos}>
            <View style={estilos.cont_avaliacao}>
              <StarRatingDisplay 
                rating={avaliacao}
                starSize={45}
                color='#31420a'
                emptyColor='#31420a'
                onChange={notaAvaliada}
              />
            </View>

            <View style={estilos.infos}>
              <View style={estilos.conts_infos}>
                <Image source={require('../assets/endereco.png')} style={estilos.imgs} />
                <Text style={estilos.texto_infos}>{dados.endereco}</Text>
              </View>

              <View style={estilos.conts_infos}>
                <Image source={require('../assets/link.png')} style={estilos.imgs} />

                <TouchableOpacity style={estilos.btn_link} onPress={link}>
                  <Text style={estilos.links}>{dados.website}</Text>
                </TouchableOpacity>
              </View>

              <View style={estilos.conts_infos}>
                <Image source={require('../assets/telefone.png')} style={estilos.imgs} />
                <Text style={estilos.texto_infos}>{dados.numero}</Text>
              </View>
            </View>
          </View>

          <View style={estilos.linha} />

          <View style={estilos.infos_mercado}>
            <Text style={estilos.txt_infomerc}>{dados.descricao}</Text>
            <View style={estilos.btn_cupons}>
              <TouchableOpacity style={estilos.btn} onPress={() => navigation.navigate('Cupons')}>
                <Text style={estilos.txt_cps}>Cupons disponíveis no mercado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    marginTop: 7,
    width: '100%',
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 25
  },

  titulo: {
    width: '100%',
    marginTop: 7,
    alignItems: 'center'
  },

  txt_tit: {
    fontSize: 30,
    color: '#31420a',
    fontWeight: 'bold'
  },

  area_img: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },

  cont_img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f8f8f8',
    marginTop: 5,
    borderColor: 'gray'
  },

  img: {
    width: '52%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 25
  },

  area_infos: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    marginTop: 10,
    marginBottom: 10,
  },

  cont_avaliacao: {
    flexDirection: 'row',
  },

  infos: {
    width: '100%',
    gap: 25,
  },

  conts_infos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 30,
  },

  imgs: {
    width: 45,
    height: 45,
  },

  texto_infos: {
    textAlign: 'justify',
    fontSize: 13,
    flex: 1,
  },

  btn_link: {
    justifyContent: 'center',
    flex: 1,
  },

  links: {
    textAlign: 'justify',
    fontSize: 13,
    textDecorationLine: 'underline',
    color: 'blue'
  },

  linha: {
    width: '100%',
    height: 1,
    backgroundColor: 'black'
  },

  infos_mercado: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 22,
    flex: 1,
    justifyContent: 'center',
    marginTop: 18
  },

  txt_infomerc: {
    textAlign: 'justify',
    fontSize: 15
  },

  btn_cupons: {
    width: '70%'
  },

  btn: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31420a',
    borderRadius: 20,
    borderWidth: 1
  },

  txt_cps: {
    fontWeight: 500,
    color: 'white'
  },
});