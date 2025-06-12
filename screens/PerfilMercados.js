import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Image, ScrollView} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {UserContext} from '../ContextPerfil';
import {useContext} from 'react';
import {mercados} from '../data/dadosMercados';

export default function PerfilMercados({navigation}) {

  const link = () => {
    const url = mercados.link; 
    Linking.openURL(url).catch((err) => console.error('Erro ao abrir URL:', err));
  };

  const {dados} = useContext(UserContext);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View style={estilos.img_fundo}>
            <Image source={mercados[0].logo} style={estilos.img} />
          </View>

          <View style={estilos.area_perfil}>
            <Image source={dados.imgMercado ? {uri: dados.imgMercado} : require('../assets/kacula_perfil.png')} style={estilos.perfil} />
          </View>

          <View style={estilos.descricao}>
            <View>
              <Text style={estilos.tit_desc}>Nome do mercado</Text>
              <Text style={estilos.txt_desc}>{dados.usernameMercado}</Text>
            </View>

            <View>
              <Text style={estilos.tit_desc}>Email</Text>
              <Text style={estilos.txt_desc}>{dados.emailMercado}</Text>
            </View>

            <View>
              <Text style={estilos.tit_desc}>Número</Text>
              <Text style={estilos.txt_desc}>{dados.numeroMercado}</Text>
            </View>

            <View>
              <Text style={estilos.tit_desc}>Endereço</Text>
              <Text style={estilos.txt_desc}>{dados.enderecoMercado}</Text>
            </View> 
            
            <View>
              <Text style={estilos.tit_desc}>WebSite</Text>
              <Text style={[estilos.txt_desc, {textDecorationLine: 'underline'}]}>{dados.site}</Text>
            </View>
          </View>

          <TouchableOpacity style={estilos.btn_editar} onPress={()=>navigation.navigate('Editar Mercado')}>
            <MaterialCommunityIcons name='pencil' size={35} color='white' />
          </TouchableOpacity>
        </View>

        <View style={{height: 10, bottom: 0}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fundo:{
    width: '100%',
    height: 220,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  
  img:{
    width: '100%',
    height: '100%',
  },

  area_perfil:{
    borderWidth: 1,
    marginTop: -60,
    backgroundColor: 'white',
    borderRadius: 100,
    marginLeft: -200,
    borderColor: 'gray'
  },

  perfil:{
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 100,
  },

  descricao:{
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 45,
    gap: 15,
  },

  tit_desc:{
    fontWeight: 800,
    fontSize: 20,
  },

  txt_desc:{
    fontSize: 17,
    lineHeight: 24
  },

  btn_editar:{
    backgroundColor: '#31420a',
    position: 'absolute',
    width: 60,
    height: 60,
    right: 27,
    top: '33%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
});