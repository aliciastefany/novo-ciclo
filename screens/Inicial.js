import { SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Inicial({navigation}){
  return(
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../assets/textura_inicial.jpg')} style={estilos.img_fundo}>

        <View style={estilos.logo}>
          <Image source={require('../assets/logo-inicial.png')} />
        </View>

        <View style={{flex: 1}}>
          <View style={estilos.area_btns}>
            <LinearGradient start={{x:0,y:1}} end={{x:1,y:0}} colors={['#43924C','#69813C']} style={estilos.btns}>
              <TouchableOpacity style={estilos.btns} onPress={()=>navigation.navigate('Login')}>   
                <Text style={estilos.texto}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient start={{x:0,y:1}} end={{x:1,y:0}} colors={['#43924C','#69813C']} style={estilos.btns}>
              <TouchableOpacity style={estilos.btns} onPress={()=>navigation.navigate('Cadastro')}>   
                <Text style={estilos.texto}>Cadastrar</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{flex: 1}} />
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fundo:{
    width:'100%', 
    height:'100%', 
  },

  logo:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  area_btns:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 18
  },

  btns:{
    width: 162,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },

  texto:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
})