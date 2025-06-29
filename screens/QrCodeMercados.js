import {StyleSheet, SafeAreaView, TouchableOpacity, Text, View, FlatList, TextInput, Alert, Platform, Modal, Image} from 'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';
import {useState, useRef, useContext} from 'react';
import {UserContext} from '../ContextPerfil';

export default function QrCodeMercados(){
  const itens=[
    {id: 1, nome: 'Plástico', pontos: 7},
    {id: 2, nome: 'Papel', pontos: 8},
    {id: 3, nome: 'Papelão', pontos: 8.5},
    {id: 4, nome: 'Metal', pontos: 10},
    {id: 5, nome: 'Vidro', pontos: 15},
    {id: 6, nome: 'Madeira', pontos: 17},
    {id: 7, nome: 'Eletrônicos', pontos: 19},
  ];

  const alerta = () => {
    if (Platform.OS === 'android'){
      Alert.alert('Pontos enviados!', 'O usuário já pode visualizar seus pontos!',
        [
          {text: 'Ok'}
        ],
        
        {cancelable: true}
      )
    }
    setEnviarPontos(false);
  }

  const [clicado, setClicado] = useState(Array(itens.length).fill(false));
  const selecionado = (index) => {
    setClicado((prev) => {
      const newClicado = Array(itens.length).fill(false);  // Desmarca todos os checkboxes
      newClicado[index] = true;  // Marca o checkbox selecionado
      return newClicado;
    });
  };

  const pontos = () => {
    return itens.reduce((total, item, index) => {
      if (clicado[index]) {
        return total + item.pontos * valor;
      }
      return total;
    }, 0);
  };

  const [valor, setValor] = useState(0);
  const mais = () => {
    setValor(prev => prev + 1);
  };

  const menos = () => {
    setValor(prev => prev > 0 ? prev - 1 : 0);
  };

  const [display, setDisplay] = useState(false);

  const enviar = () => {
    if(pontos() !== 0){
      alerta();
    } else {
      Alert.alert("Sem valor", "Não há nenhum valor selecionado!")
    }
  }

  //Sessão QR Code
  const [modalVisible, setModalVisible] = useState(false);
  const [enviarPontos, setEnviarPontos] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrCodeLock = useRef(false);

  async function handleOpenCamera(){
    try{
      const {granted} = await requestPermission();

      if(!granted){
        return Alert.alert("Câmera", "Você precisa habilitar a câmera!")
      }
      qrCodeLock.current = false;
      setModalVisible(true);
    } catch (error) {
      alert(error);
    }
  }

  function handleQRCodeRead(){
    setModalVisible(false);
    setEnviarPontos(true);
  }
  //

  const {dados} = useContext(UserContext);

  return(
    <SafeAreaView style={{flex: 1, zIndex: 0, backgroundColor: 'white'}}>
      <View style={estilos.cabecalho}>
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
      </View>

      <View style={estilos.titulo}>
        <Text style={estilos.txt_tit}>Ler Qr Code</Text>
      </View>

      <View style={estilos.container}>           
        <TouchableOpacity style={estilos.btn_qrcode} onPress={handleOpenCamera}>
          <Text style={{color: 'white', fontSize: 18}}>Escanear</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} style={{flex: 1}} >
          <CameraView style={{flex: 1}} facing='back' onBarcodeScanned={handleQRCodeRead} />

          <View style={estilos.footer}>
            <TouchableOpacity style={estilos.btn_qrcode} onPress={()=>setModalVisible(false)}>
              <Text style={{color: 'white', fontSize: 18}}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <View style={enviarPontos ? estilos.card_pontos : {display: 'none'}}>
        <View style={{borderWidth: 1}}>
          <Text style={estilos.tit}>QR Code identificado!</Text>
        </View>

        <View style={{marginTop: 15, gap: 10}}>
          <Text style={{fontSize: 17}}>Usuário: {dados.username}</Text>
          <Text style={estilos.txt2}>O que o usuário descartou?</Text>
        </View>

        <View style={{marginTop: 10, paddingHorizontal: 15}}>
          <FlatList 
            contentContainerStyle={{gap: 7}}
            data={itens}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item, index})=>(
              <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => selecionado(index)} style={clicado[index] ? estilos.clicado : estilos.checkbox} />
                <Text style={clicado[index] ? estilos.txt_clicado : {fontSize: 17}}>{item.nome}</Text>
              </View>
            )}
          />
        </View>

        <View style={{marginTop: 10, gap: 6}}>
          <Text style={estilos.txt2}>Qual foi a quantidade (kg)?</Text>

          <View style={{flexDirection: 'row', gap: 8, justifyContent: 'center'}}>
            <TouchableOpacity style={estilos.btn_input} onPress={menos}>
              <Text style={clicado ? {fontSize: 17} : estilos.txt_clicado}>-</Text>
            </TouchableOpacity>

            <TextInput style={estilos.input} value={valor.toString()} editable={false} maxLength={2}/>

            <TouchableOpacity style={estilos.btn_input} onPress={mais}>
              <Text style={{fontSize: 17}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={estilos.txt2}>Pontos ganhos:</Text>
          <Text style={estilos.txt_pontos}>{pontos()}</Text>
        </View>

        <View style={{marginTop: 15, alignItems: 'center'}}>
          <TouchableOpacity style={estilos.btn_enviar} onPress={enviar}>
            <Text style={estilos.txt_btn_enviar}>Enviar</Text>
          </TouchableOpacity>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
  },

  titulo:{
    width: '100%',
    marginTop: 7,
    alignItems: 'center',
    borderBottomWidth: 2
  },

  txt_tit:{
    fontSize: 30,
    color: '#31420a',
    fontWeight: 'bold'
  },
  
   container:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

   footer:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    width: '100%'
  },

  btn_qrcode:{
    backgroundColor: '#31420a',
    width: '40%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 25,
  },

  card_pontos:{
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    top: '10%',
    left: '10%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    zIndex: 1,
  },

  tit:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  txt2:{
    fontSize: 17.5,
    fontWeight: 600
  },

  checkbox:{
    borderWidth: 1,
    width: 17,
    height: 17
  },

  input:{
    width: 41,
    height: 25,
    borderWidth: 1,
    borderRadius: 25,
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    padding: 0,
  },

  btn_input:{
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn_enviar:{
    backgroundColor: '#31420a',
    alignItems: 'center',
    justifyContent: 'center',
    width: '82%',
    height: 40,
    borderRadius: 7
  },

  txt_btn_enviar:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },

  clicado:{
    backgroundColor: 'gray',
    borderWidth: 1,
    width: 17,
    height: 17
  },

  txt_clicado:{
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 17
  },

  txt_pontos:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
})