import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DescricaoLocais({route, navigation}) {
  const { mercados } = route.params;

  const link = () => {
    const url = mercados.data().website; 
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir URL:', err));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='#31420a' />
          </TouchableOpacity>
        </View>

        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={estilos.titulo}>
          <Text style={estilos.txt_tit}>{mercados.data().nome}</Text>
        </View>

        <View style={estilos.area_img}>
          <View style={estilos.cont_img}>
            <Image source={require('../assets/logo_kacula.png')} style={estilos.img} />
          </View>
        </View>

        <View style={estilos.area_infos}>
          <View style={estilos.cont_avaliacao}>
            <MaterialCommunityIcons name={mercados.e1} size={45} color='#31420a' />
            <MaterialCommunityIcons name={mercados.e2} size={45} color='#31420a' />
            <MaterialCommunityIcons name={mercados.e3} size={45} color='#31420a' />
            <MaterialCommunityIcons name={mercados.e4} size={45} color='#31420a' />
            <MaterialCommunityIcons name={mercados.e5} size={45} color='#31420a' />
          </View>

          <View style={estilos.infos}>
            <View style={estilos.conts_infos}>
              <Image source={require('../assets/endereco.png')} style={estilos.imgs} />
              <Text style={estilos.texto_infos}>{mercados.data().endereco}</Text>
            </View>

            <View style={estilos.conts_infos}>
              <Image source={require('../assets/link.png')} style={estilos.imgs} />

              <TouchableOpacity style={estilos.btn_link} onPress={link}>
                <Text style={estilos.links}>{mercados.data().website}</Text>
              </TouchableOpacity>
            </View>

            <View style={estilos.conts_infos}>
              <Image source={require('../assets/telefone.png')} style={estilos.imgs} />
              <Text style={estilos.texto_infos}>{mercados.data().numero}</Text>
            </View>
          </View>
        </View>

        <View style={estilos.linha} />

        <View style={estilos.infos_mercado}>
          <Text style={estilos.txt_infomerc}>{mercados.data().descricao}</Text>

          <TouchableOpacity style={estilos.btn_cupons} onPress={()=>navigation.navigate('Pontos', {mercados: mercados})}>
            <Text style={estilos.txt_btn}>Veja os cupons disponiveis</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  titulo:{
    width: '100%',
    marginTop: 7,
    alignItems: 'center'
  },

  txt_tit:{
    fontSize: 28,
    color: '#31420a',
    fontWeight: 'bold'
  },

  area_img:{
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },

  cont_img:{
    width: '100%', 
    height: '100%', 
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#f8f8f8',
    marginTop: 5,
    borderColor: 'gray'
  },

  img:{
    width: '52%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 25
  },

  area_infos:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    marginTop: 10,
    marginBottom: 10,
  },

  cont_avaliacao:{
    flexDirection: 'row',
  },

  infos:{
    width: '100%',
    gap: 25,
  },

  conts_infos:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 30,
  },

  imgs:{
    width: 45,
    height: 45,
  },

  texto_infos:{
    textAlign: 'justify',
    fontSize: 13,
    flex: 1,
  },

  btn_link:{
    justifyContent: 'center',
    flex: 1,
  },

  links:{
    textAlign: 'justify',
    fontSize: 13,
    textDecorationLine: 'underline',
    color: 'blue'
  },

  linha:{
    width: '88%',
    height: 1,
    backgroundColor: 'black'
  },
  
  infos_mercado:{
    width: '100%',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 1
  },

  btn_cupons:{
    width: '80%',
    borderWidth: 1,
    alignItems: 'center',
    height: 45,
    backgroundColor: '#31420a',
    justifyContent: 'center',
    borderRadius: 100
  },

  txt_infomerc:{
    textAlign: 'justify',
    fontSize: 15
  },

  txt_btn:{
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold'
  },
});