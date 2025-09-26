import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../config/firebase';
import { updateDoc, doc, GeoPoint } from 'firebase/firestore';
import { UserContext } from '../ContextPerfil.js';
import Geocoder from 'react-native-geocoding';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

  const [image, setImage] = useState(dados.fotoPerfil || null);
  const [imageFundo, setImageFundo] = useState(dados.fundoPerfil || null);

  const pickImagePerfil = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      try{
        const imagem = result.assets[0].uri;
      
        const fetchImg = await fetch(imagem);
        const blob = await fetchImg.blob();

        const referencia = ref(storage, `/perfil-mercados/${idUser}.jpg`);

        await uploadBytes(referencia, blob);

        const urlFoto = await getDownloadURL(referencia);

        await updateDoc(doc(db, 'mercados', idUser), {
          fotoPerfil: urlFoto,
        });

        setImage(urlFoto);
      } catch(err){
        console.error(err);
      }
    }
  };

  const pickImageFundo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try{
        const imagem = result.assets[0].uri;
      
        const fetchImg = await fetch(imagem);
        const blob = await fetchImg.blob();

        const referencia = ref(storage, `/fundo-mercados/${idUser}.jpg`);

        await uploadBytes(referencia, blob);

        const urlFoto = await getDownloadURL(referencia);

        await updateDoc(doc(db, 'mercados', idUser), {
          fundoPerfil: urlFoto,
        });

        setImageFundo(urlFoto);
      } catch(err){
        console.error(err);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <TouchableOpacity style={estilos.btn_voltar} onPress={()=>navigation.navigate('Perfil')}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
          </TouchableOpacity>

          <View style={estilos.img_fundo}> 
            <TouchableOpacity onPress={pickImageFundo}>
              <Image source={imageFundo ? {uri: imageFundo} : require('../assets/kacula_perfil.png')} style={estilos.img} />
            </TouchableOpacity>
          </View>

          <View style={estilos.area_perfil}>
            <TouchableOpacity onPress={pickImagePerfil}>
              <Image source={image ? {uri: image} : require('../assets/kacula_perfil.png')} style={estilos.perfil} />
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
  btn_voltar: {
    position: 'absolute',
    marginTop: 35,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    zIndex: 1
  },

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