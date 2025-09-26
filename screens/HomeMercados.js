import { SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, View, Text, Alert } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { db, auth } from '../config/firebase.js';
import { onSnapshot, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { UserContext } from '../ContextPerfil.js';

export default function HomeMercados({navigation}){
  const [dados, setDados] = useState({});
  const { setIdUser, idUser } = useContext(UserContext);

  useEffect(() => {
    if (!idUser) {
      return;
    }

    try{
      const getInfos = onSnapshot(doc(db, 'mercados', idUser), (doc)=>{
        setDados(doc.data());
      });
        
      return ()=>getInfos();
    }
    catch(err){
      console.error(err);
    }
  }, []);

  const sair = async () => {
    try{
      await signOut(auth);
      Alert.alert('Você saiu da sua conta!');
      navigation.reset({
        index: 0,
        routes: [{name: 'Inicial'}]
      });
      setIdUser(null);
    } catch(err){
      Alert.alert(`Ocorreu um erro: ${err}`);
      console.error(err);
    }
  }

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 0.37, width: '100%'}}>
        <View>
          <ImageBackground source={require('../assets/fundo-home.jpg')} style={estilos.img_fundo} />

          <View style={estilos.opacidade} />
        </View>

        <View style={estilos.area_text_img_fundo}>
          <Text style={estilos.text_fundo}>Seja bem-vindo!</Text>
        </View>
      </View>

       <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%', marginVertical: 20, paddingRight: 18}}>
            <Text style={estilos.txt_tit1}>Seu Mercado</Text>
          </View>

          <View style={estilos.lista}> 
            <TouchableOpacity style={{width: '100%'}} onPress={()=>navigation.navigate('Editar Mercado', { dados: dados })}>
              <ImageBackground source={dados.fundoPerfil ? {uri: dados.fundoPerfil} : require('../assets/semfundo_mercado.png')} style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                <View style={estilos.area_textos}>
                  <Text style={estilos.txt_tit2}>{dados.nome}</Text>
                  <Text style={estilos.txt_desc}>{dados?.descricao || 'Descreva a missão do seu mercado!'}</Text>
                </View>

                <View style={estilos.opacidade} />

                <View style={estilos.area_editar}>
                  <Text style={estilos.txt_editar}>Edite as informações!</Text>
                </View>
              </ImageBackground> 
            </TouchableOpacity>
          </View> 
          
          <View style={estilos.area_btnSair}>
            <TouchableOpacity style={estilos.btn_sair} onPress={sair}>
              <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Sair</Text>
            </TouchableOpacity>
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
    width: 240
  },

  text_fundo: {
    fontSize: 27,
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

  txt_tit1:{
    fontSize: 23,
    fontWeight: 700,
    color: '#31420a',
    textAlign: 'right'
  },

  txt_tit2:{
    fontSize: 23,
    fontWeight: 700,
    color: 'white',
    textAlign: 'left'
  },

  lista:{
    width: '87%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },  

  area_textos:{
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 10,
    gap: 2,
  },  

  area_editar:{
    width: '100%',
    backgroundColor: '#253304',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    height: '20%',
  },

  txt_editar:{
    fontSize: 18,
    color: 'white',
    fontWeight: 600
  },

  txt_desc:{
    fontSize: 15,
    color: 'white',
    fontWeight: 400,
    overflow: 'hidden',
    maxHeight: 55,
  },

  area_btnSair:{
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btn_sair:{
    width: '32%',
    backgroundColor: '#31420a',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }
});