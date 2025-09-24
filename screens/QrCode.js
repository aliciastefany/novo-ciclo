import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default function QrCode({navigation}) {
  const [mercados, setMercados] = useState('');
  const [mercProx, setMercProx] = useState([]);

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

  function haversineDistanciaKM(lat1Deg, lon1Deg, lat2Deg, lon2Deg) {
    function toRad(degree) {
        return degree * Math.PI / 180;
    }
    
    const lat1 = toRad(lat1Deg);
    const lon1 = toRad(lon1Deg);
    const lat2 = toRad(lat2Deg);
    const lon2 = toRad(lon2Deg);
    
    const { sin, cos, sqrt, atan2 } = Math;
    
    const R = 6371; // earth radius in km 
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = sin(dLat / 2) * sin(dLat / 2)
            + cos(lat1) * cos(lat2)
            * sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a)); 
    const d = R * c;
    console.log('distancia', d)
    return d; // distance in km
}

  const [cep, setCep] = useState('');

  const getMercados = async () => {
    if(cep && mercados){
      try{
        Geocoder.init('AIzaSyCd65Fjy3fMfsNls74nh98LEf4vtWvFu8M');

        const busca = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await busca.json();
        const endereco = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}, ${dados.uf} - ${dados.cep}`;

        const geocodificacao = await Geocoder.from(endereco);
        const coordenadas = geocodificacao.results[0].geometry.location;
        console.log('coord', coordenadas)

        const listaMercados = [];
        const docsMercados = await getDocs(collection(db, 'mercados'));
        docsMercados.forEach((doc)=>{
          const dados = {
            latitude: doc.data().coordenadas.latitude,
            longitude: doc.data().coordenadas.longitude,
            id: doc.id,
            descricao: doc.data().descricao,
            nome: doc.data().nome,
          }
          listaMercados.push(dados);
        });
        const listaFormatada = listaMercados.filter((item) => haversineDistanciaKM(coordenadas.lat, coordenadas.lng, item.latitude, item.longitude) <= 50);
        setMercProx(listaFormatada);
      } catch(err){
        console.error(err);
      }
    } else{
      Alert.alert('Informe um CEP válido!');
    }
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={estilos.cabecalho}>
        <View>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
              <MaterialCommunityIcons name='keyboard-backspace' size={50}/>
            </TouchableOpacity>
        </View>
        
        <View>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu' size={40} color='black' />
          </TouchableOpacity>
        </View>       
      </View>
      
      <View style={{width: '100%', flex: 1, justifyContent: 'flex-end', height: '100%'}}>
        <View style={estilos.fundoMapa}>
          <MapView 
            style={{flex: 1, width: '100%', height: '100%'}}
            initialRegion={{
              latitude: -23.60519811,
              longitude: -46.7628802,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
              }}
            mapType="standard"
            showsUserLocation={true}>

            {/*<Marker
            key={pontoAtual.id}
            coordinate={{latitude: pontoAtual.latitude, longitude: pontoAtual.longitude}}
            title={pontoAtual.titulo}
            description={pontoAtual.descricao}
            pinColor={pontoAtual.cor}
            onPress={() => modalClicado(pontoAtual)}
            />*/}
          </MapView>
        </View>

          <View style={estilos.card}>
            <Text style={estilos.tit}>Locais Próximos</Text>

            <ImageBackground source={require('../assets/fundo-login.jpg')} style={estilos.areaBusca} imageStyle={{width: '100wh', height: 'auto', borderRadius: 15}}>
              <TextInput placeholder='Insira seu CEP' keyboardType='numeric' value={cep} onChangeText={(txt)=>setCep(txt)} maxLength={8} style={estilos.input}></TextInput>

              <TouchableOpacity style={estilos.btnBuscar} onPress={getMercados}>
                <MaterialCommunityIcons name='magnify' color='#31420a' size={30} />
              </TouchableOpacity>
            </ImageBackground>

            <View style={estilos.listaMercados}>
              {/* <FlatList 
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
                contentContainerStyle={{gap: 20}}       
              /> */}

              <FlatList 
                style={estilos.flatlist}
                data={mercProx}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(
                  <View style={estilos.lista}> 
                    <ImageBackground source={require('../assets/kacula.jpg')} style={{height: '100%', width: '100%', justifyContent: 'center'}}>
                      <View style={estilos.area_textos}>
                        <Text style={estilos.txt_tit}>{item.nome}</Text>
                        <Text style={estilos.txt_desc}>{item.descricao}</Text>
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
                contentContainerStyle={{gap: 20}}       
              />
            </View>
          </View>
      </View>
    </SafeAreaView>
  )
  /*const [username, setUsername] = useState('');
  const { idUser } = useContext(UserContext);

  useEffect(()=>{
    const getUser = async () => {
      try{
        const usuario = await getDoc(doc(db, 'usuario', idUser));
        setUsername(usuario.data().username);
      }
      catch(err){
        console.error(err);
      }
    };
    getUser();
  }, [])

  const json = JSON.stringify({
    idCliente: idUser,
    username: username
  });

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

      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{alignItems: 'center', width: '100%'}}>
          <View style={{marginTop: 25, paddingLeft: 25, width: '100%'}}>
            <Text style={estilos.txt_tit}>SEU QR CODE</Text>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 15}}>
            <QRCode value={json} size={200} />
          </View>

          <View style={{width: '100%', marginTop: 24, paddingHorizontal: 20, gap: 7}}>
            <Text style={estilos.txt_tit2}>Como utilizar?</Text>
            <Text style={estilos.txt}>Quando for fazer o descarte de materiais recicláveis, como papel ou papelão, mostre esse QR Code para o responsável pelo ponto de coleta, que irá escanear e registrar os materiais e a quantidade descartada. Com isso, seus pontos serão automaticamente adicionados à sua conta no aplicativo, permitindo que você os acompanhe e troque por cupons de desconto diretamente no app.</Text>
          </View>
        </View>
      </ScrollView>*/
}

const estilos = StyleSheet.create({
  cabecalho:{
    marginTop: 7,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    position: 'absolute',
    zIndex: 2,
  },

  fundoMapa: {
    backgroundColor: '#31420a',
    height: '45%',
    position: 'absolute',
    width: '100%',
    top: 0,
  },

  areaCard: {
    height: '60%',
    backgroundColor: '#31420a',
  },

  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    padding: 27,
    alignItems: 'center',
    gap: 12,
    height: '60%',
    zIndex: 1,
  },
  
  tit:{
    fontSize: 28,
    color: '#31420a',
    fontWeight: 'bold',
  },

  areaBusca: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 15,
  },

  input:{
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 10,
    flex: 1,
    borderRadius: 15,
  },

  btnBuscar: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 15,
    height: '100%'
  },

  listaMercados:{
    flex: 1,
    width: '100%',
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

  /*cabecalho:{
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
    color: '#31420a',
  },

  txt_tit2:{
    fontSize: 27,
    fontWeight: 'bold',
    color: '#31420a',
  },

  txt:{
    fontSize: 18,
    textAlign:'justify'
  },

  img:{
    width: 200,
    height: 230
  }*/
});