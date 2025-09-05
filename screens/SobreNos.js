import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { membros } from '../data/dadosMembros';
import MembroEquipe from '../components/MembroEquipe';

export default function SobreNos({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView style={{flex: 1}}>
        <View style={estilos.cabecalho}>
          <View>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
            </TouchableOpacity>
          </View>
          
          <View>
            <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
          </View>
        </View>

        <View style={{flex: 1, width: '100%'}}>
          <View style={{marginTop: 7, paddingLeft: 25}}>
            <Text style={estilos.txt_tit}>SOBRE NÓS</Text>
          </View>

          <View style={estilos.area_obj}>
            <View style={{gap: 7}}>
              <Text style={estilos.tit_obj1}>Nossa missão</Text>
              <Text style={estilos.txt}>Nossa missão é promover a conscientização e a prática da reciclagem, fronecendo informações acessíveis e interativas sobre o descarte adequado de resíduos.</Text>
            </View>

            <View style={{gap: 7}}>
              <Text style={estilos.tit_obj2}>Nossa visão</Text>
              <Text style={estilos.txt}>Nossa visão é ser uma referência em soluções sustentáveis, contribuindo para um futuro mais limpo e sustentável, onde a reciclagem é uma prática comum e valorizada.</Text>
            </View>
          </View>

          <View style={estilos.area_equipe}>
            <View>
              <Text style={estilos.tit_obj1}>Equipe</Text>
            </View>
            <View style={estilos.area_imgs}>
              <FlatList
                data={membros}
                numColumns={2}
                renderItem={({item})=>(
                  <MembroEquipe nome={item.nome} imagem={item.imagem}/>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{gap: 20, alignItems: 'center'}}
              />
            </View>
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
    paddingHorizontal: 25,
  },

  txt_tit:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#31420a'
  },

  area_obj:{
    marginTop: 15,
    gap: 20
  },

  tit_obj1:{
    color: '#31420a',
    fontSize: 25,
    fontWeight: 500,
    paddingRight: 15,
    textAlign: 'right',
  },

  tit_obj2:{
    color: '#31420a',
    fontSize: 25,
    fontWeight: 500,
    paddingLeft: 15,
  },

  txt:{
    fontSize: 16,
    paddingLeft: 15,
    lineHeight: 21,
    paddingRight: 30,
  },

  area_equipe:{
    flex: 1,
    marginTop: 7,
  },

  area_imgs:{
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
  },

  campo_imgs:{
    alignItems: 'center',
    gap: 4
  },

  img:{
    width: 100,
    height: 100,
    borderRadius: 100
  },

  txt_eq:{
    fontWeight: 500, 
    width: 120,
    textAlign: 'center'
  }
});