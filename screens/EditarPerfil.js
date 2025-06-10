import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useContext, useState} from 'react';
import {UserContext} from '../ContextPerfil';
import * as ImagePicker from 'expo-image-picker';

export default function EditarPerfil({navigation}) {

  const {dados, setDados} = useContext(UserContext);
  const [username, setUsername] = useState(dados.username || '');
  const [email, setEmail] = useState(dados.email || '');
  const [numero, setNumero] = useState(dados.numero || '');
  
  const salvar = () => {
    setDados({
      username,
      email,
      numero,
      img: image,
      pontos: 275.5,
    });
    navigation.navigate('Perfil');
  };

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
        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
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
            <TextInput style={estilos.inputs} placeholder='@nomedeusuario' value={username} onChangeText={setUsername} />
          </View>

          <View>
            <Text style={estilos.tit_desc}>Email</Text>
            <TextInput style={estilos.inputs} placeholder='emaildousuario@email.com' value={email} onChangeText={setEmail} />

          </View>

           <View>
            <Text style={estilos.tit_desc}>Número</Text>
            <TextInput style={estilos.inputs} placeholder='+55 (XX) 9XXXX-XXXX' value={numero} onChangeText={setNumero} />
          </View>
        </View>

        <TouchableOpacity style={estilos.btn_editar} onPress={salvar}>
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