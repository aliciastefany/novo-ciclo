import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../config/firebase';
import { updateDoc, doc, GeoPoint } from 'firebase/firestore';
import { UserContext } from '../ContextPerfil.js';
import Geocoder from 'react-native-geocoding';

export default function EditarMercado({navigation, route}) {
  const {dados} = route.params;
  const [username, setUsername] = useState(dados.nome || '');
  const [email, setEmail] = useState(dados.email || '');
  const [numero, setNumero] = useState(dados.numero || '');
  const [endereco, setEndereco] = useState(dados.endereco || '');
  const [descricao, setDescricao] = useState(dados.descricao || '');
  const [website, setWebsite] = useState(dados.website || '');
  
  const { idUser } = useContext(UserContext);

  const salvarInfo = async () => {
    if(!idUser){
      return;
    }
    
    try{
      Geocoder.init('AIzaSyCd65Fjy3fMfsNls74nh98LEf4vtWvFu8M');

      const geocodificacao = await Geocoder.from(endereco);
      const coordenadas = geocodificacao.results[0].geometry.location;
      const lat = coordenadas.lat;
      const lng = coordenadas.lng;

      await updateDoc(doc(db, 'mercados', idUser), {
        nome: username,
        email: email,
        numero: numero,
        endereco: endereco,
        descricao: descricao,
        website: website,
        coordenadas: new GeoPoint(lat, lng),
      });

      Alert.alert('Dados atualizados!');
      navigation.navigate('Perfil');
    }
    catch(err){
      console.error(err);
    }
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <View style={estilos.img_fundo}>
            <Image source={require('../assets/logo_kacula.png')} style={estilos.img} />
          </View>

          <View style={estilos.area_perfil}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={image ? {uri:image} : require('../assets/kacula_perfil.png')} style={estilos.perfil} />
            </TouchableOpacity>
          </View>

          <View style={estilos.descricao}>
            <View>
              <Text style={estilos.tit_desc}>Nome do mercado</Text>
              <TextInput style={estilos.inputs} placeholder='Nome' value={username} onChangeText={(txt)=>setUsername(txt)} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Email</Text>
              <TextInput style={estilos.inputs} placeholder='Email' value={email} onChangeText={(txt)=>setEmail(txt)} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Número</Text>
              <TextInput style={estilos.inputs} placeholder='Número de telefone' value={numero} onChangeText={(txt)=>setNumero(txt)} />

            </View>

            <View>
              <Text style={estilos.tit_desc}>Endereço</Text>
              <TextInput style={estilos.inputs} placeholder='Endereço' value={endereco} onChangeText={(txt)=>setEndereco(txt)} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Website</Text>
              <TextInput style={estilos.inputs} placeholder='Website' value={website} onChangeText={(txt)=>setWebsite(txt)} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Descrição do mercado</Text>
              <TextInput style={estilos.input_bio} placeholder='Descrição do mercado' multiline={true} maxLength={300} textAlignVertical="top" value={descricao} onChangeText={(txt)=>setDescricao(txt)} />
            </View>
          </View>

          <TouchableOpacity style={estilos.btn_editar} onPress={salvarInfo}>
            <MaterialCommunityIcons name='content-save' size={35} color='white' />
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
    borderRadius: 100
  },

  descricao:{
    width: '100%',
    marginTop: 10,
    paddingLeft: 45,
    gap: 10
  },

  tit_desc:{
    fontWeight: 800,
    fontSize: 18,
  },

  btn_editar:{
    backgroundColor: '#31420a',
    position: 'absolute',
    width: 60,
    height: 60,
    right: 27,
    top: 237,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputs:{
    borderWidth: 1,
    width: '78%',
    height: 40,
    borderRadius: 20,
    borderColor: 'gray',
    marginTop: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },

  input_bio:{
    borderWidth: 1,
    width: '78%',
    height: 120,
    borderRadius: 20,
    borderColor: 'gray',
    marginTop: 10,
    fontSize: 14,
    padding: 15
  },
});