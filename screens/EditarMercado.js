import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useContext, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {UserContext} from '../ContextPerfil';

export default function EditarMercado({navigation}) {

  const {dados, setDados} = useContext(UserContext);
  const [username, setUsername] = useState(dados.usernameMercado || '');
  const [email, setEmail] = useState(dados.emailMercado || '');
  const [numero, setNumero] = useState(dados.numeroMercado || '');
  const [endereco, setEndereco] = useState(dados.enderecoMercado || '');
  const [descricao, setDescricao] = useState(dados.descricaoMercado || '');
  const [website, setWebsite] = useState(dados.site || '');
  
  const salvar = () => {
    setDados({
      ...dados,
      usernameMercado: username,
      emailMercado: email,
      numeroMercado: numero,
      enderecoMercado: endereco,
      descricaoMercado: descricao,
      imgMercado: image,
      site: website,
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
              <TextInput style={estilos.inputs} placeholder='Kaçula Supermercados' value={username} onChangeText={setUsername} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Email</Text>
              <TextInput style={estilos.inputs} placeholder='kacula@email.com' value={email} onChangeText={setEmail} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Número</Text>
              <TextInput style={estilos.inputs} placeholder='+55 11 0000-0000' value={numero} onChangeText={setNumero} />

            </View>

            <View>
              <Text style={estilos.tit_desc}>Endereço</Text>
              <TextInput style={estilos.inputs} placeholder='R. Kaçula, 00 - Jardim Kaçula, São Paulo - SP, 00000-00' value={endereco} onChangeText={setEndereco} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Website</Text>
              <TextInput style={estilos.inputs} placeholder='https://www.kacula.com.br/' value={website} onChangeText={setWebsite} />
            </View>

            <View>
              <Text style={estilos.tit_desc}>Descrição do mercado</Text>
              <TextInput style={estilos.input_bio} placeholder='O Kaçula Supermercados é...' multiline={true} textAlignVertical="top" value={descricao} onChangeText={setDescricao} />
            </View>
          </View>

          <TouchableOpacity style={estilos.btn_editar} onPress={salvar}>
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