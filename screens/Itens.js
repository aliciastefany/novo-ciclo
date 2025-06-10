import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Keyboard, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';

import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function Itens({route, navigation}) {

  const {materiais} = route.params;

  const [valor, setValor] = useState('');
  const [tecladoVisivel, setTecladoVisivel] = useState(false);  

  const numeros = (input) => {
    const novoValor = input.replace(/[^0-9,]/g, '');
    setValor(novoValor);
  };

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView>
        <View style={estilos.cabecalho}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <MaterialCommunityIcons name='keyboard-backspace' size={tecladoVisivel ? 35 : 50} color='#31420a' />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, alignItems:'flex-end'}}>
            <Image source={require('../assets/logo-topo.png')} style={tecladoVisivel ? {width: 30, height: 30} : {width: 70, height: 70}}/>
          </View>
        </View>

        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={tecladoVisivel ? estilos.titlePeq : estilos.title}>{materiais.titulo}</Text>
          </View>

          <View style={tecladoVisivel ? [estilos.cards_descricao, {marginTop: 10}] : estilos.cards_descricao}>
            <View style={tecladoVisivel ? estilos.card1Peq : estilos.card1}>
              <Image source={materiais.imagem_itens} style={tecladoVisivel ? estilos.img_peq : estilos.img} />
              
              <Text style={tecladoVisivel ? estilos.textoPeq : estilos.texto}>{materiais.texto1}</Text>

              <Text style={tecladoVisivel ? estilos.textoPeq : estilos.texto} adjustsFontSizeToFit minimumFontScale={0.65}>{materiais.texto2}</Text>
            </View>

            <View style={tecladoVisivel ? [estilos.card2, {gap: 6}] : estilos.card2}>
              <View style={tecladoVisivel ? {gap: 4} : {gap: 10}}>
                <Text style={tecladoVisivel ? estilos.texto_destPeq : estilos.texto_destaque}>Quais são os benefícios de reciclar?</Text>

                <Text style={tecladoVisivel ? estilos.textoPeq : estilos.texto}>{materiais.texto3}</Text>
              </View>

              <View style={tecladoVisivel ? [estilos.area_pontos, {gap: 6}] : estilos.area_pontos}>
                <View style={tecladoVisivel ? estilos.pontosPeq : estilos.pontos}>
                  <Text style={tecladoVisivel ? {color: 'white', fontSize: 10} : {color: 'white', fontSize: 15}}>1 kg = {materiais.kg} pontos</Text>
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row', gap: 3}}>
                  <TextInput style={tecladoVisivel ? estilos.inputPeq : estilos.input} onChangeText={numeros} value={valor} inputMode='numeric' maxLength={2} />
                  <Text style={tecladoVisivel ? estilos.textoPeq : estilos.texto}>Kg = {((valor * [materiais.kg]).toFixed(1))} pontos</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginVertical: 10}}>
            <TouchableOpacity style={tecladoVisivel ? estilos.btn_coletaPeq : estilos.btn_coleta} onPress={()=>navigation.navigate('Locais')}>
              <Text style={tecladoVisivel ? estilos.texto_btnPeq : estilos.texto_btn}>Pontos de Coleta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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

  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  cards_descricao:{
    flex: 1,
    width: '88%',
    marginTop: 15,
    borderWidth: 3,
    borderColor: '#31420a',
    borderRadius: 17,
  },
  
  card1:{
    flex: 1,
    borderColor: '#31420a',
    borderBottomWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 14,
    padding: 13,
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  card2:{
    flex: 1,
    borderColor: '#31420a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 13,
    padding: 13,
  },

  texto:{
    fontSize: 14,
    textAlign: 'justify',
  },

  texto_destaque:{
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 14
  },

  pontos:{
    alignItems: 'center',
    width: '50%',
    backgroundColor: 'darkgreen',
    height: 45,
    borderRadius: 12,
    justifyContent: 'center'
  },

  input:{
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    textAlign: 'center',
    padding: 0,
  },

  btn_coleta:{
    backgroundColor: '#31420a',
    height: 50,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },  

  area_pontos:{
    width: '100%', 
    alignItems: 'center', 
    gap: 13
  },

  img:{
    width:'50%',
    height: 80,
    resizeMode: 'contain'
  },

  texto_btn:{
    fontSize: 16, 
    fontWeight: 600, 
    textAlign: 'center', 
    color: 'white'
  },
  
  //Pequenos
  titlePeq:{
    fontSize: 25,
    fontWeight: 'bold'
  },

  textoPeq:{
    fontSize: 10,
    textAlign: 'justify'
  },

  img_peq:{
    width: 50,
    height: 30
  },

  texto_destPeq:{
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 10
  },

  card1Peq:{
    flex: 1,
    borderColor: '#31420a',
    borderBottomWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 14,
    padding: 9,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  pontosPeq:{
    alignItems: 'center',
    width: '40%',
    backgroundColor: 'darkgreen',
    height: 25,
    borderRadius: 12,
    justifyContent: 'center'
  },

  inputPeq:{
    width: 25,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 10,
    padding: 0,
  },

  btn_coletaPeq:{
    backgroundColor: '#31420a',
    height: 35,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },  

  texto_btnPeq:{
    fontSize: 11, 
    fontWeight: 600, 
    textAlign: 'center', 
    color: 'white'
  },
});