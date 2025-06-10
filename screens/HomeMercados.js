import {SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, View, Text, Platform, Alert} from 'react-native';
import {useContext, useState} from 'react';
import {UserContext} from '../ContextPerfil';

export default function HomeMercados({navigation}){

  const {dados, setDados} = useContext(UserContext);

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
            <ImageBackground source={require('../assets/kacula.jpg')} style={{height: '100%', width: '100%', justifyContent: 'center'}}>
              <View style={estilos.area_textos}>
                <Text style={estilos.txt_tit2}>Kaçula Supermercados</Text>
                <Text style={estilos.txt_desc}>Plásticos, metais, papelão e mais!</Text>
              </View>

              <View style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={estilos.btn} onPress={()=>navigation.navigate('Editar Mercado')}>
                  <Text style={estilos.txt_btn}>Edite as informações!</Text>
                </TouchableOpacity>
              </View>

              <View style={estilos.opacidade} />
            </ImageBackground>
          </View> 
          
          <View style={estilos.area_btnSair}>
            <TouchableOpacity style={estilos.btn_sair} onPress={() => {
              if (Platform.OS === 'android') {
                Alert.alert(
                  'Sair da conta',
                  'Você quer sair da sua conta?',
                  [
                    { text: 'Não', style: 'cancel' },
                    { text: 'Sim', onPress: () => {
                        navigation.navigate('Inicial')
                      }
                    },
                  ],
                  { cancelable: true }
                );
              }
              setDados({
                username: 'Pedro_Henrique',
                  email: 'etectaboaosp@etec.sp.gov.br',
                  cpf: '015.516.690-47',
                  senha: 'etec2024',
                  numero: '11 98457-2561',
                  usernameMercado: 'Kaçula Supermercados',
                  emailMercado: 'kaculasuper@gmail.com',
                  cnpj: '54.839.485/0002-11',
                  senhaMercado: 'kacula2024',
                  numeroMercado: '(11) 4701-6181',
                  descricaoMercado: 'O Kaçula Supermercado é um dos parceiros do nosso aplicativo Novo Ciclo, servindo como ponto de coleta para materiais recicláveis como papel, papelão, metal e vidro.',
                  site: 'https://www.kacula.com.br/',
                  enderecoMercado: 'Rua José Milani, 244 - Jardim Irapua, Taboão da Serra - SP, 06766-420',
                  pontos: 275.5,
              })
            }}>
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
    gap: 2
  },  

  btn:{
    width: '100%',
    height: '20%',
    backgroundColor: '#253304',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },

  txt_btn:{
    fontSize: 18,
    color: 'white',
    fontWeight: 600
  },

  txt_desc:{
    fontSize: 15,
    color: 'white',
    fontWeight: 400
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