import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function Dados2({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View style={{flex: 1, width: '100%'}}>
        <ImageBackground source={require('../assets/dados2.jpg')} style={estilos.img_fn} >
          <View style={estilos.opacidade}/>

          <View style={estilos.area_img}>
            <Image source={require('../assets/img_dados2.png')} style={estilos.img} />
          </View>

          <View style={estilos.area_txt1}>
            <Text style={estilos.txt1}>Milhões de toneladas de lixo poluente enchem aterros sanitários e ameaçam o meio ambiente.</Text>
          </View>

          <View style={estilos.area_txt2}>
            <Text style={estilos.txt2}>Milhões de toneladas de lixo poluente são descartados todos os anos, e grande parte desse volume acaba em aterros sanitários. Embora os aterros sejam uma alternativa controlada para o descarte de resíduos, eles ainda representam uma ameaça ambiental significativa. Com o tempo, o lixo depositado em aterros libera gases de efeito estufa, como o metano, e substâncias tóxicas que podem contaminar o solo e os lençóis freáticos, prejudicando ecossistemas e comunidades próximas.</Text>
          </View>

          <View style={estilos.area_btn}>
            <TouchableOpacity style={estilos.btn} onPress={()=>navigation.navigate('Dados')}>
              <MaterialCommunityIcons name='arrow-left-thin' size={50} />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.btn2} onPress={()=>navigation.navigate('Dados3')}>
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
    marginLeft: 25,
    zIndex: 2
  },

  img:{
    width: 120,
    height: 120
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
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center'
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

  btn2:{
    backgroundColor: 'white',
    width: 65,
    height: 65,
    zIndex: 2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
