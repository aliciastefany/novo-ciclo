import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { UserContext } from '../ContextPerfil.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function EditarPerfil({route, navigation}) {
  const { infoUsuario } = route.params;
  const { idUser } = useContext(UserContext);
  
  const [username, setUsername] = useState(infoUsuario.username);
  const [email, setEmail] = useState(infoUsuario.email);
  const [cpf, setCpf] = useState(infoUsuario.cpf);
  const [image, setImage] = useState(infoUsuario.fotoPerfil);

  const salvarInfo = async () => {
    try{
      await updateDoc(doc(db, 'usuario', idUser), {
        username: username,
        email: email,
        cpf: cpf
      });

      Alert.alert('Dados atualizados!');
      navigation.navigate('Perfil');
    }
    catch(err){
      console.error(err);
    }
  }

  const pickImage = async () => {
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

        const referencia = ref(storage, `/perfil-usuarios/${idUser}.jpg`);

        await uploadBytes(referencia, blob);

        const urlFoto = await getDownloadURL(referencia);

        await updateDoc(doc(db, 'usuario', idUser), {
          fotoPerfil: urlFoto,
        });

        setImage(urlFoto);
      } catch(err){
        console.error(err);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu' size={40} color='black' />
          </TouchableOpacity>
        </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={estilos.img_fundo}>
          <Image source={require('../assets/fundo_perfil.jpg')} style={estilos.img} />
        </View>

        <View style={estilos.area_perfil}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={image ? {uri: image} : require('../assets/perfil_perfil.png')} style={estilos.perfil} />
          </TouchableOpacity>
        </View>

        <View style={estilos.descricao}>
          <View>
            <Text style={estilos.tit_desc}>Nome do Usuário</Text>
            <TextInput style={estilos.inputs} placeholder='@nomedeusuario' value={username} onChangeText={(txt)=>setUsername(txt)} />
          </View>

          <View>
            <Text style={estilos.tit_desc}>Email</Text>
            <TextInput style={estilos.inputs} placeholder='emaildousuario@email.com' value={email} onChangeText={(txt)=>setEmail(txt)} />

          </View>

           <View>
            <Text style={estilos.tit_desc}>CPF</Text>
            <TextInput style={estilos.inputs} placeholder='XXX.XXX.XXX-XX' value={cpf} onChangeText={(txt)=>setCpf(txt)} />
          </View>
        </View>

        <TouchableOpacity style={estilos.btn_editar} onPress={salvarInfo}>
          <MaterialCommunityIcons name='content-save' size={35} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{height: 10, bottom: 0}} />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  cabecalho:{
    marginTop: 45,
    width: '100%',
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    position: 'absolute',
    zIndex: 1
  },

  img_fundo:{
    width: '100%',
    height: 220,
    borderTopWidth: 1,
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
    borderRadius: 100,
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
});