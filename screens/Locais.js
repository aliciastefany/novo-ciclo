import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Image, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Locais({navigation}) {
  const [mercados, setMercados] = useState('');

  useEffect(() => {
    const getDados = async () => {
      try{
        const getInfos = await getDocs(collection(db, 'mercados'));
        setMercados(getInfos.docs);
      }
      catch(err){
        console.error(err);
      } 
    }
    getDados();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
        
        <View>
          <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu' size={40} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{alignItems: 'center', marginTop: 12}}>
          <Text style={estilos.title}>LOCAIS PARCEIROS</Text>
        </View>

        <View style={estilos.area_lista}>
          <FlatList 
            style={estilos.flatlist}
            data={mercados}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>(
              <View style={estilos.lista}> 
                <ImageBackground source={require('../assets/kacula.jpg')} style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                  <View style={estilos.area_textos}>
                    <Text style={estilos.txt_tit}>{item.data().nome}</Text>
                    <Text style={estilos.txt_desc}>{item.data().descricao}</Text>
                  </View>

                  <View style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
                    <TouchableOpacity style={estilos.btn} onPress={()=>navigation.navigate('Descricao Locais', { mercado: item })}>
                      <Text style={estilos.txt_btn}>Conheça já!</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={estilos.opacidade} />
                </ImageBackground>
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{gap: 30}}
          />

          <View style={estilos.areaBotao}>
            <TouchableOpacity style={estilos.btnLocais} onPress={()=>navigation.navigate('LocaisProximos')}>
              <Text style={estilos.txtLocais}>Locais Próximos</Text>
            </TouchableOpacity>
          </View>
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

  title: {
    fontSize: 37,
    fontWeight: 'bold',
    color: '#31420a'
  },

  area_lista:{
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginVertical: 22,
  },

  flatlist:{
    width: '86%', 
    marginVertical: 15,
  },

  lista:{
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden'
  },  

  opacidade:{
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#00000077'
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

  txt_tit:{
    fontSize: 21,
    color: 'white',
    fontWeight: 600
  },

  txt_desc:{
    fontSize: 15,
    color: 'white',
    fontWeight: 400
  },

  areaBotao: {
    width: '100%',
    alignItems: 'center',
  },

  btnLocais: {
    width: '50%',
    height: 39,
    backgroundColor: '#31420a',
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtLocais: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
});
