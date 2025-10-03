import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import { useEffect, useState, useContext } from 'react';
import { db } from '../config/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { getAvaliacao } from '../data/avaliacaoMercado'; 
import { UserContext } from '../ContextPerfil.js';

export default function DescricaoLocais({route, navigation}) {
  const { mercado } = route.params;
  const [rating, setRating] = useState(0);
  const [avaliacaoMedia, setAvaliacaoMedia] = useState('');
  const { idUser } = useContext(UserContext);

  const link = () => {
    const url = 'https://www.instagram.com/novo.cicloapp'; 
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir URL:', err));
  };

  const nota = getAvaliacao(mercado.id);
  useEffect(()=>{
    setAvaliacaoMedia(nota);

    const getUserAvaliacao = async () => {
      try{
        const docUsuario = await getDoc(doc(db, 'usuario', idUser));
        const avaliacoes = docUsuario.data().avaliacoes_feitas || [];
        const mercadoAvaliado = avaliacoes.findIndex(item => item.mercado_avaliado.id === mercado.id);

        if(mercadoAvaliado === -1){
          setRating(nota);
        } else{
          const nota = avaliacoes[mercadoAvaliado].nota;
          setRating(nota);
        }
      } catch(err){
        console.error(err);
      }
    }
    getUserAvaliacao();
  }, [nota]);

  const addAvaliacao = () => {
    const avaliacaoUsuario = async () => {
      try{
        const docUsuario = await getDoc(doc(db, 'usuario', idUser));
        const avaliacoes = docUsuario.data().avaliacoes_feitas || [];
        const mercadoAvaliado = avaliacoes.findIndex(item => item.mercado_avaliado.id === mercado.id);

        if(mercadoAvaliado === -1){
          try{
            avaliacoes.push({
              mercado_avaliado: doc(db, 'mercados', mercado.id),
              nota: rating
            });

            await updateDoc(doc(db, 'usuario', idUser), {
              avaliacoes_feitas: avaliacoes
            });
          }
          catch(err){
            console.error(err);
          }
        } else{
          avaliacoes[mercadoAvaliado] = {
            mercado_avaliado: doc(db, 'mercados', mercado.id),
            nota: rating
          }

          await updateDoc(doc(db, 'usuario', idUser), {
            avaliacoes_feitas: avaliacoes
          });
        }
      }
      catch(err){
        console.error(err);
      }
    }
    avaliacaoUsuario();

    const avaliacaoMercado = async () => {
      try{
        const docMercado = await getDoc(doc(db, 'mercados', mercado.id));
        const avaliacoesRecebidas = docMercado.data().avaliacoes_recebidas || [];
        const avaliador = avaliacoesRecebidas.findIndex(item => item.avaliador.id === idUser);

        if(avaliador === -1){
          try{
            avaliacoesRecebidas.push({
              avaliador: doc(db, 'usuario', idUser),
              nota: rating
            });

            await updateDoc(doc(db, 'mercados', mercado.id), {
              avaliacoes_recebidas: avaliacoesRecebidas
            });
          }
          catch(err){
            console.error(err);
          }
        } else{
          avaliacoesRecebidas[avaliador] = {
            avaliador: doc(db, 'usuario', idUser),
            nota: rating
          }

          await updateDoc(doc(db, 'mercados', mercado.id), {
            avaliacoes_recebidas: avaliacoesRecebidas
          });
        }
      }
      catch(err){
        console.error(err);
      }
    }
    avaliacaoMercado();
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='#31420a' />
          </TouchableOpacity>
        </View>

        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={estilos.titulo}>
          <Text style={estilos.txt_tit}>{mercado.data().nome}</Text>
        </View>

        <View style={estilos.area_img}>
          <View style={estilos.cont_img}>
            <Image source={mercado.data().fotoPerfil ? {uri: mercado.data().fotoPerfil} : require('../assets/perfil_perfil.png')} style={estilos.img} resizeMode={!mercado.data().fotoPerfil && 'contain'} />
          </View>
        </View>

      <ScrollView style={{marginTop: 10, marginBottom: 10}} contentContainerStyle={{alignItems: 'center'}}>
        <View style={estilos.area_infos}>
          <View style={estilos.cont_avaliacao}>
            <StarRating 
              rating={rating}
              onChange={valor => setRating(valor)}
              starSize={45}
              color='#31420a'
              emptyColor='#31420a'
              onRatingEnd={addAvaliacao}
            />

            <View style={estilos.areaAvaliacaoMedia}>
              <Text style={estilos.txt_avaliacao}>Média</Text>
              <Text style={estilos.txt_avaliacao}>{avaliacaoMedia ? avaliacaoMedia : 0}</Text>
            </View>
          </View>

          <View style={estilos.infos}>
            <View style={estilos.conts_infos}>
              <Image source={require('../assets/endereco.png')} style={estilos.imgs} />
              <Text style={estilos.texto_infos}>{mercado.data().endereco}</Text>
            </View>

            <View style={estilos.conts_infos}>
              <Image source={require('../assets/link.png')} style={estilos.imgs} />

              <TouchableOpacity style={estilos.btn_link} onPress={link}>
                <Text style={estilos.links}>{mercado.data().website}</Text>
              </TouchableOpacity>
            </View>

            <View style={estilos.conts_infos}>
              <Image source={require('../assets/telefone.png')} style={estilos.imgs} />
              <Text style={estilos.texto_infos}>{mercado.data().numero}</Text>
            </View>
          </View>
        </View>

        <View style={estilos.linha} />

        <View style={estilos.infos_mercado}>
          <View style={{flex: 1}}>
            <Text style={estilos.txt_infomerc}>{mercado.data().descricao}</Text>
          </View>
          
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
            <TouchableOpacity style={estilos.btn_cupons} onPress={()=>navigation.navigate('Trocar Pontos', { mercado: mercado.id, fotoPerfil: mercado.data().fotoPerfil })}>
              <Text style={estilos.txt_btn}>Veja os cupons disponiveis</Text>
            </TouchableOpacity>
          </View>
          
        </View></ScrollView>
      </View>
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
    paddingHorizontal: 25
  },

  titulo:{
    width: '100%',
    marginTop: 7,
    alignItems: 'center'
  },

  txt_tit:{
    fontSize: 28,
    color: '#31420a',
    fontWeight: 'bold',
    textAlign: 'center',
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
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f8f8f8',
    marginTop: 5,
    borderColor: 'gray'
  },

  img:{
    width: '52%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 25
  },

  area_infos:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    marginTop: 10,
    marginBottom: 10,
  },

  cont_avaliacao:{
    width: 'auto',
    justifyContent: 'center'
  },

  areaAvaliacaoMedia: {
    position: 'absolute',
    right: -32,
  },

  txt_avaliacao: {
    fontSize: 11,
    fontWeight: 500,
    textAlign: 'center',
  },

  infos:{
    width: '100%',
    gap: 25,
  },

  conts_infos:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 30,
  },

  imgs:{
    width: 45,
    height: 45,
  },

  texto_infos:{
    textAlign: 'justify',
    fontSize: 13,
    flex: 1,
  },

  btn_link:{
    justifyContent: 'center',
    flex: 1,
  },

  links:{
    textAlign: 'justify',
    fontSize: 13,
    textDecorationLine: 'underline',
    color: 'blue'
  },

  linha:{
    width: '88%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 10,
  },
  
  infos_mercado:{
    width: '100%',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    flex: 1,
    marginTop: 1,
  },

  btn_cupons:{
    width: '83%',
    borderWidth: 1,
    alignItems: 'center',
    height: 45,
    backgroundColor: '#31420a',
    justifyContent: 'center',
    borderRadius: 100
  },

  txt_infomerc:{
    textAlign: 'justify',
    fontSize: 15,
  },

  txt_btn:{
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold'
  },
});