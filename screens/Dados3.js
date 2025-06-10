import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function Dados3({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View style={{flex: 1, width: '100%'}}>
        <ImageBackground source={require('../assets/dados3.jpg')} style={estilos.img_fn} >
          <View style={estilos.opacidade}/>

          <View style={estilos.area_img}>
            <Image source={require('../assets/img_dados3.png')} style={estilos.img} />
          </View>

          <View style={estilos.area_txt1}>
            <Text style={estilos.txt1}>Reciclagem: benefícios para o meio ambiente e economia sustentável.</Text>
          </View>

          <View style={estilos.area_txt2}>
            <Text style={estilos.txt2}>A reciclagem traz diversos benefícios, como:
 </Text>
            <Text style={estilos.txt2_1}>1. Redução do lixo em aterros: diminui a quantidade de resíduos descartados.</Text>
            <Text style={estilos.txt2_1}>2. Conservação de recursos naturais: reutiliza materiais, evitando extração de novos recursos.</Text>
            <Text style={estilos.txt2_1}>3. Economia de energia: produzir a partir de reciclados consome menos energia.</Text>
            <Text style={estilos.txt2_1}>4. Criação de empregos: Gera postos de trabalho na coleta e processamento.</Text>
            <Text style={estilos.txt2_1}>5. Proteção ambiental: Reduz poluição e protege ecossistemas.</Text>
            <Text style={estilos.txt2_1}>6. Economia circular: Mantém os materiais em uso, diminuindo o desperdício.</Text>
          </View>

            <View style={estilos.area_btn}>
              <TouchableOpacity style={estilos.btn} onPress={()=>navigation.navigate('Dados2')}>
                <MaterialCommunityIcons name='arrow-left-thin' size={50} />
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
    marginTop: 14,
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
    width: '90%',
    marginTop: 10,
    backgroundColor: '#00000075',
    height: 427,
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

  txt2_1:{
    color: 'white',
    fontSize: 16,
    width: '97%',
    fontWeight: 300,
    lineHeight: 26,
    paddingLeft: 15,
    marginTop: 3
  },

  area_btn:{
    flex: 1, 
    width: '100%', 
    justifyContent: 'center',
    paddingLeft: 25,
    zIndex: 2
  },

  btn:{
    backgroundColor: 'white',
    width: 65,
    height: 65,
    zIndex: 2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
