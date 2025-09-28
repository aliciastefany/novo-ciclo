import { SafeAreaView, Image, StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, Keyboard, Alert} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../ContextPerfil.js';
import { cadastrarMercadoRepository } from '../repositories/cadastroMercadoRepository.js';

export default function CadastroMercados({navigation}){
  const [senhaOculta, setSenhaOculta] = useState(true);
  const [senhaOculta2, setSenhaOculta2] = useState(true);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);  

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

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [confsenha, setConfsenha] = useState('');

  const { setIdUser } = useContext(UserContext);

  const cadastrar = async () => {
    const buscarCnpj = async () => {
      const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

      try{
        const resposta = await fetch(url);
        const dados = await resposta.json();
        if(dados.type === 'bad_request'){
          Alert.alert(dados.message);
          return false;
        } else{
          setUsername(dados.nome_fantasia);
          return true;
        }
        
      } catch(err){
        Alert.alert('Erro ao buscar CNPJ', err);
        console.error(err);
      }
    }

    if(username !== '' && email !== '' && cnpj !== '' && senha !== '' && senha === confsenha){
      const dados = {
        nome: username,
        email: email.replace(/\s/g, ''),
        cnpj: cnpj,
      };

      const valido = await buscarCnpj();
      if(valido){
        const resposta = await cadastrarMercadoRepository(dados, senha);

        if(resposta.sucess){
          Alert.alert('Cadastro realizado com sucesso!');
          setIdUser(resposta.id);

          navigation.reset({
            index: 0,
            routes: [
              {name: 'Rotas Mercados'}
            ]
          });
        } else{
          if(resposta.erro === 'auth/weak-password'){
            Alert.alert('A senha deve ter pelo menos 6 caracteres!');
          }

          if(resposta.erro === 'auth/email-already-in-use'){
            Alert.alert('Este email já está em uso!');
          }

          if(resposta.erro === 'auth/invalid-email' || resposta.erro === 'auth/missing-email'){
            Alert.alert('Email inválido!');
          }
        }
      } else{
        Alert.alert('Informe um CNPJ válido!');
      }
    } else{
      Alert.alert('Preencha todos os campos corretamente!');
    }
  };

  return(
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/textura-cadastro.jpg')} style={estilos.img_fundo}>
        <View style={tecladoVisivel ? estilos.area_logoPeq : estilos.area_logo}>
          <Image source={require('../assets/logo-topo.png')} style={tecladoVisivel ? estilos.logoPeq : estilos.logo} />
        </View>

        <View style={{flex: 1, paddingHorizontal: 30, justifyContent: 'center'}}>
          <View style={tecladoVisivel ? estilos.area_titPeq : estilos.area_tit}>
            <Text style={tecladoVisivel ? estilos.titPeq : estilos.tit}>Cadastrar</Text>
          </View>

          <View style={tecladoVisivel ? estilos.card_loginPeq : estilos.card_login}>
            <ImageBackground source={require('../assets/fundo-login.jpg')} style={estilos.img_textura} imageStyle={{borderRadius: 20}}>
              <View style={estilos.campos_card}>
                <View style={tecladoVisivel ? estilos.area_inputsPeq : estilos.area_inputs}>
                  <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Nome do mercado' value={username} onChangeText={(txt)=>setUsername(txt)} />

                  <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='CNPJ' maxLength={14} value={cnpj} onChangeText={(txt)=>setCnpj(txt)} />
    
                  <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Email' value={email} onChangeText={(txt)=>setEmail(txt)} />

                  <View style={{justifyContent: 'center'}}>
                    <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Senha' value={senha} onChangeText={(txt)=>setSenha(txt)} secureTextEntry={senhaOculta}/>
                    <TouchableOpacity style={estilos.olho} onPress={()=>(setSenhaOculta(!senhaOculta))}>
                      <MaterialCommunityIcons name={senhaOculta ? 'eye-outline' : 'eye-off'} size={tecladoVisivel ? 20 : 22}/>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent: 'center'}}>
                    <TextInput style={tecladoVisivel ? estilos.inputsPeq : estilos.inputs} placeholder='Confirmar Senha' value={confsenha} secureTextEntry={senhaOculta2} onChangeText={(txt)=>setConfsenha(txt)} />
                    <TouchableOpacity style={estilos.olho} onPress={()=>(setSenhaOculta2(!senhaOculta2))}>
                      <MaterialCommunityIcons name={senhaOculta2 ? 'eye-outline' : 'eye-off'} size={tecladoVisivel ? 20 : 22}/>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={tecladoVisivel ? {marginTop: 10, width: '100%'} : {marginTop: 23, width: '100%'}} >
                  <TouchableOpacity style={tecladoVisivel ? estilos.btnPeq : estilos.btn} onPress={cadastrar}>
                    <Text style={tecladoVisivel ? estilos.txtPeq : estilos.txt}>Cadastrar</Text>
                  </TouchableOpacity>
                </View>

                <View style={tecladoVisivel ? {marginTop: 10} : {marginTop: 20}}>
                  <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>Já tem uma conta? Faça seu </Text>

                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login Mercados')}>
                      <Text style={tecladoVisivel ? estilos.txt_cadastroPeq : estilos.txt_cadastro}>login</Text>
                    </TouchableOpacity> 
                    <Text style={tecladoVisivel ? estilos.txt2Peq : estilos.txt2}>!</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={{height: 73}}/>
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
    paddingRight: 15,
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
    height: 55,
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
    height: 50,
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

  //pequenos
  area_logoPeq:{
    marginTop: 40,
    marginLeft: 10,
  },

  logoPeq:{
    height: 60,
    width: 70,
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
    marginTop: 7,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 375,
  },

  inputsPeq:{
    backgroundColor: 'white',
    borderRadius: 8,
    height: 38,
    width: '100%',
    paddingLeft: 15,
    fontSize: 12
  },

  btnPeq:{
    backgroundColor: '#31420a',
    height: 35,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
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

  txtPeq:{
    fontSize: 10,
    color: 'white',
    fontWeight: 700,
  },

  area_inputsPeq:{
    width: '100%',
    gap: 15,
  },

  area_titPeq:{
    alignItems:'flex-end',
    paddingRight: 15,
    marginTop: 55
  },
})