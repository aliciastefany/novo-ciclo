import {SafeAreaView, Image, StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, Keyboard, Alert} from 'react-native';
import {useState, useEffect} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {getDocs, collection, query, where} from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Login({navigation}){

  const [senhaOculta, setSenhaOculta] = useState(true);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  //const {dados} = useContext(UserContext);
  const [senha, setSenha] = useState('');
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setTecladoVisivel(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setTecladoVisivel(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const realizarLogin = async () => {
    const docRef = collection(db, 'usuario');
    const queryLogin = query(docRef, where('username', '==', username), where('email', '==', email), where('senha', '==', senha));
    const resultado = await getDocs(queryLogin);

    if (resultado.size > 0){
      navigation.navigate('Rotas');
    }else{
      Alert.alert(
        'Não foi possível realizar o login!',
        'Dados incorretos',
        [
          {
            text: 'Ok'
          }
        ]
      );
    }
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/textura_login.jpg')} style={estilos.img_fundo}>
        <View style={tecladoVisivel ? estilos.area_logoPeq : estilos.area_logo}>
          <Image source={require('../assets/logo-topo.png')} style={tecladoVisivel ? estilos.logoPeq : estilos.logo} />
        </View>

        <View style={{flex: 1, paddingHorizontal: 30, justifyContent: 'center'}}>
          <View style={tecladoVisivel ? estilos.area_titPeq : estilos.area_tit}>
            <Text style={tecladoVisivel ? estilos.titPeq : estilos.tit}>Login</Text>
          </View>

          <View style={tecladoVisivel ? estilos.card_loginPeq : estilos.card_login}>
            <ImageBackground source={require('../assets/fundo-login.jpg')} style={estilos.img_textura} imageStyle={{borderRadius: 20}}>
              <View style={estilos.campos_card}>
                <View style={tecladoVisivel ? estilos.area_inputsPeq : estilos.area_inputs}>
                  <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Usuário' onChangeText={setUsername} />  
    
                  <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Email' onChangeText={setEmail} />

                  <View style={{justifyContent: 'center'}}>
                    <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Senha' secureTextEntry={senhaOculta} onChangeText={setSenha}/>
                    <TouchableOpacity style={estilos.olho} onPress={()=>(setSenhaOculta(!senhaOculta))}>
                      <MaterialCommunityIcons name={senhaOculta ? 'eye-outline' : 'eye-off'} size={tecladoVisivel ? 20 : 22}/>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={tecladoVisivel ? {marginTop: 10, width: '100%'} : {marginTop: 15, width: '100%'}}>
                  <TouchableOpacity style={tecladoVisivel ? estilos.btnPeq : estilos.btn} onPress={realizarLogin}>
                    <Text style={tecladoVisivel ? estilos.txtPeq : estilos.txt}>Login</Text>
                  </TouchableOpacity>
                </View>

                <View  style={tecladoVisivel ? {marginTop: 10, width: '100%'} : {marginTop: 17, width: '100%'}}>
                  <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>Ainda não tem uma conta? Faça seu </Text>

                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Cadastro')}>
                      <Text style={tecladoVisivel ? estilos.txt_cadastroPeq : estilos.txt_cadastro}>cadastro</Text>
                    </TouchableOpacity> 
                    <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>!</Text>
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>É um mercado parceiro? Faça login ou</Text>

                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>cadastro </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login Mercados')}>
                      <Text style={tecladoVisivel ? estilos.txt_cadastroPeq : estilos.txt_cadastro}>aqui</Text>
                    </TouchableOpacity> 
                    <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>!</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={{height: 205}}/>
      </ImageBackground>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fundo:{
    width:'100%', 
    height:'100%', 
  },

  area_logo:{
    marginLeft: 10,
  },

  logo:{
    height: 120,
    width: 140,
  },

  area_tit:{
    alignItems:'flex-end',
    paddingRight: 15
  },

  tit:{
    fontFamily: 'Open Sans',
    fontSize: 35,
    color: '#6b803b',
    fontWeight: 'bold'
  },

  card_login:{
    backgroundColor: '#6b803b',
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  campos_card:{
    flexDirection: 'column',
    alignItems:  'center',
    width: '100%',
    flex: 1,
    padding: 25,
    justifyContent: 'center'
  },
  
  img_textura:{
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  area_inputs:{
    width: '100%',
    gap: 18,
  },

  btn:{
    backgroundColor: '#31420a',
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  txt:{
    fontSize: 18,
    color: 'white',
    fontWeight: 700,
  },

  inputs:{
    backgroundColor: 'white',
    borderRadius: 8,
    height: 43,
    width: '100%',
    paddingLeft: 15
  },

  txt2: {
    color: 'white',
    fontWeight: 600,
    textAlign: 'center'
  },

  txt_cadastro:{
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 600,
    textAlign: 'center'
  },

  olho:{
    position: 'absolute',
    right: 15,
  },

  //Pequenos
  area_logoPeq:{
    marginTop: 40,
    marginLeft: 10,
  },

  logoPeq:{
    height: 60,
    width: 70,
  },

  area_titPeq:{
    alignItems:'flex-end',
    paddingRight: 15,
    marginTop: 155,
  },

  titPeq:{
    fontFamily: 'Open Sans',
    fontSize: 25,
    color: '#6b803b',
    fontWeight: 'bold' 
  },

  card_loginPeq:{
    backgroundColor: '#6b803b',
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 310
  },

  area_inputsPeq:{
    width: '100%',
    gap: 15,
  },

  inputsPeq:{
    backgroundColor: 'white',
    borderRadius: 8,
    height: 35,
    width: '100%',
    paddingLeft: 15,
    fontSize: 12,
    paddingVertical: 0,
  },

  btnPeq:{
    backgroundColor: '#31420a',
    height: 30,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtPeq:{
    fontSize: 11,
    color: 'white',
    fontWeight: 700,
  },

  txt2Peq: {
    color: 'white',
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 12
  },

  txt_cadastroPeq:{
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 12
  },
})
