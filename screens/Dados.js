import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function Dados({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View style={{flex: 1, width: '100%'}}>
        <ImageBackground source={require('../assets/dados1.jpg')} style={estilos.img_fn} >
          <View style={estilos.opacidade}/>
          
          <TouchableOpacity style={estilos.btn_voltar} onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace' size={35} />
          </TouchableOpacity>

          <View style={estilos.area_img}>
            <Image source={require('../assets/img_dados1.png')} style={estilos.img} />
          </View>

          <View style={estilos.area_txt1}>
            <Text style={estilos.txt1}>Desperdício global: 96% dos resíduos não são reaproveitados, aumentando a poluição.</Text>
          </View>

          <View style={estilos.area_txt2}>
            <Text style={estilos.txt2}>Aproximadamente 96% dos resíduos produzidos não são reaproveitados, resultando em um acúmulo crescente de lixo que polui o meio ambiente e contamina solos, rios e oceanos. Esse desperdício representa uma ameaça grave à biodiversidade, à saúde pública e ao equilíbrio ecológico. Ao não serem reciclados ou reutilizados, esses materiais acabam em aterros sanitários ou, pior ainda, em áreas naturais, onde podem liberar substâncias tóxicas e microplásticos que se espalham por toda a cadeia alimentar.</Text>
          </View>

          <View style={estilos.area_btn}>
            <TouchableOpacity style={estilos.btn} onPress={()=>navigation.navigate('Dados2')}>
              <MaterialCommunityIcons name='arrow-right-thin' size={50} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fn:{
    width: '100%',
    height: '100%',
  },

  opacidade:{
    backgroundColor: '#00000060', 
    height: '100%', 
    zIndex: 1, 
    width: '100%', 
    position: 'absolute'
  },

  area_img:{
    width: '100%',
    marginTop: 25,
    marginRight: 25,
    zIndex: 2,
    alignItems: 'flex-end'
  },

  img:{
    width: 120,
    height: 120,
    marginRight: 30
  },

  area_txt1:{
    width: '77.5%',
    marginLeft: 25,
    marginTop: 20,
    zIndex: 2
  },

  txt1:{
    fontWeight: 700,
    color: 'white',
    fontSize: 16,
    textAlign: 'justify',
  },

  area_txt2:{
    zIndex: 2,
    width: '84%',
    marginTop: 10,
    backgroundColor: '#00000075',
    height: 399,
    paddingLeft: 20,
    justifyContent: 'center'
  },

  txt2:{
    color: 'white',
    fontSize: 16,
    width: '92%',
    fontWeight: 300,
    lineHeight: 26
  },
  
  area_btn:{
    flex: 1, 
    width: '100%', 
    paddingRight: 25,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  btn:{
    backgroundColor: 'white',
    width: 65,
    height: 65,
    zIndex: 2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn_voltar:{
    backgroundColor: 'white',
    position: 'absolute',
    width: 40,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    left: 7,
    borderRadius: 25
  }
});