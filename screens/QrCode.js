import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native/types_generated/index';
import textura from '../assets/fundo_login.jpg';

export default function QrCode({navigation}) {
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
        </TouchableOpacity>        
      </View>
      
      <View style={estilos.fundoMapa}>

      </View>

      <View style={estilos.areaCard}>
        <View style={estilos.card}>
          <Text style={estilos.tit}>Locais Próximos</Text>

          <ImageBackground src={textura} style={estilos.areaBusca}>

          </ImageBackground>
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
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    height: 40,
    backgroundColor: 'white',
  },

  fundoMapa: {
    backgroundColor: '#31420a',
    height: '40%',
  },

  areaCard: {
    height: '60%',
    backgroundColor: 'transparent',

  },

  card: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 60,
    padding: 27,
    alignItems: 'center',
    gap: 12,
  },
  
  tit:{
    fontSize: 28,
    color: '#31420a',
    fontWeight: 'bold',
  },

  areaBusca: {
    width: '80%',
    height: '100%',
    flex: 1,
  }

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