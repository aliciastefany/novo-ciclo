import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { conquistas } from '../data/dadosConquistas';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import CupomDoUsuario from '../components/CupomDoUsuario';
import { db } from '../config/firebase';

export default function Perfil({navigation}) {
  const [infoUsuario, setInfoUsuario] = useState('');
  const [refsCupons, setRefsCupons] = useState([]);
  const [cuponsUsuario, setCuponsUsuario] = useState([]);

  useEffect(() => {
    const getInfoUsuario = onSnapshot(doc(db, 'usuario', 'WvwjLK9WqoQOsld2nv8AvxIoen32'), (doc)=>{
      try{
        setInfoUsuario(doc.data());
      }
      catch(err){
        console.error(err);
      }
    });
        
    return ()=>getInfoUsuario();
  }, []);

  useEffect(() => {
    const getResgatados = onSnapshot(doc(db, 'usuario', 'WvwjLK9WqoQOsld2nv8AvxIoen32'), (doc)=>{
      try{
        const lista = doc.data().cuponsResgatados.map((item)=>(
          item.id
        ))
        setRefsCupons(lista);
      }
      catch(err){
        console.error(err);
      }
    });
    setInterval(()=>console.log(cuponsUsuario), 40000);
    return ()=>getResgatados();
  }, []);

  useEffect(() => {
    const cupons = () => {
      try{
        let array = [];
        refsCupons.map((item)=>{
          const get = async () => {
            const cupom = await getDoc(doc(db, 'cupons', item));
            const mercado = await getDoc(cupom.data().mercado);
            const nome = mercado.data().nome;

            const infos = {
              id: cupom.id,
              precoTroca: cupom.data().precoTroca,
              mercado: nome,
              descPorc: cupom.data().descPorc,
            }
            array.push(infos);
            setCuponsUsuario(array);
          }
          get();
        })
      }
      catch(err){
        console.error(err);
      }
    } 
    cupons();
  }, [refsCupons]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
          <MaterialCommunityIcons name='menu' size={40} color='black' />
        </TouchableOpacity>
      </View>
        
      <ScrollView style={{flex: 1, width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View style={estilos.img_fundo}>
            <Image source={require('../assets/fundo_perfil.jpg')} style={estilos.img} />
        </View>
          
        <View style={estilos.area_perfil}>
          <Image source={require('../assets/perfil_perfil.png')} style={estilos.perfil} />
        </View>

          <View style={estilos.descricao}>
            <View>
              <Text style={estilos.tit_desc}>Nome do Usuário</Text>
              <Text style={estilos.txt_desc}>@{infoUsuario.username}</Text>
            </View>

            <View>
              <Text style={estilos.tit_desc}>Email</Text>
              <Text style={estilos.txt_desc}>{infoUsuario.email}</Text>
            </View>

            <View>
              <Text style={estilos.tit_desc}>CPF</Text>
              <Text style={estilos.txt_desc}>{infoUsuario.cpf}</Text>
            </View>
          </View>

          <TouchableOpacity style={estilos.btn_editar} onPress={() => navigation.navigate('Editar Perfil', { infoUsuario })}>
            <MaterialCommunityIcons name='pencil' size={35} color='white' />
          </TouchableOpacity>

          <View style={estilos.conquistas}>
            <View style={{marginLeft: 25}}>
              <Text style={estilos.txt_cqst}>Suas Conquistas</Text>
            </View>

            <View style={{alignItems: 'center', width: '100%'}}>
              <FlatList 
                style={{width: '100%', marginVertical: 10}}
                contentContainerStyle={{gap: 20, alignItems: 'center'}}
                data={conquistas}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <View style={estilos.cont_cqst}>
                    <Image source={item.imagem} style={estilos.img_conqs} />
                    <Text style={estilos.txt_lista}>{item.descricao}</Text>
                  </View>
                )}
              />
            </View>
          </View> 
        </View>
        <View estilos={estilos.qrCode}>
          <View style={{marginLeft: 25}}>
            <Text style={estilos.txt_cqst}>Seu QR Code</Text>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 15}}>
            <Image source={require('../assets/qrcode_pg.png')} style={estilos.imgQrCode} />
          </View>
        </View>
        <View style={estilos.cupons}>
          <View style={{marginLeft: 25}}>
            <Text style={estilos.txt_cqst}>Seus cupons resgatados</Text>
          </View>

          <View style={{alignItems: 'center', width: '100%'}}>
            <FlatList 
              data={cuponsUsuario}
              style={{width: '100%', marginVertical: 10}}
              contentContainerStyle={{gap: 20, alignItems: 'center'}}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Cupom', { infosCupom: item })}>
                  <View>
                    <CupomDoUsuario precoTroca={item.precoTroca} descPorc={item.descPorc} nomeMercado={item.mercado}/>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </View> 
      </ScrollView>
      <View style={{height: 10, bottom: 0}} />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  cabecalho:{
    marginTop: 45,
    width: '100%',
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    position: 'absolute',
    zIndex: 1
  },

  img_fundo:{
    width: '100%',
    height: 220,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  
  img:{
    width: '100%',
    height: '100%',
  },

  area_perfil:{
    borderWidth: 1,
    marginTop: -60,
    backgroundColor: 'white',
    borderRadius: 100,
    marginLeft: -200,
    borderColor: 'gray'
  },

  perfil:{
    width: 120,
    height: 120,
    borderRadius: 100,
  },

  descricao:{
    width: '100%',
    marginTop: 10,
    paddingLeft: 45,
    gap: 10
  },

  tit_desc:{
    fontWeight: 800,
    fontSize: 18,
  },

  txt_desc:{
    fontSize: 15
  },

  btn_editar:{
    backgroundColor: '#31420a',
    position: 'absolute',
    width: 60,
    height: 60,
    right: 27,
    top: '33%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  conquistas:{
    marginTop: 15, 
    width: '100%',
    flex: 1
  },

  txt_cqst:{
    fontSize: 27,
    color: '#31420a',
    fontWeight: 'bold'
  },

  cont_cqst:{
    width: 340,
    height: 60,
    backgroundColor: '#31420a',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 20
  },

  img_conqs:{
    width: 50,
    height: 50
  },

  txt_lista:{
    flex: 1, 
    fontSize: 14,
    color: 'white',
    textAlign: 'justify'
  },
  cupons: {
    marginTop: 15, 
    width: '100%',
    flex: 1
  },
  qrCode:{
    width: '100%',
    alignItems: 'center',
  },
  imgQrCode: {
    width: 200,
    height: 230
  }
});