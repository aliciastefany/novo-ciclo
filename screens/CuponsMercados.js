import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Modal, TextInput, TouchableWithoutFeedback} from 'react-native';
import {mercados} from './DadosMercados';
import {cuponsKacula} from './Cupons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useState} from 'react';

export default function CuponsMercados({navigation}) {

  const [cupons, setCupons] = useState(cuponsKacula);
  const [cardAdd, setCardAdd] = useState(false);
  const [preco, setPreco] = useState('');
  const [desc, setDesc] = useState('');
  const [item, setItem] = useState('');
  const [btnRmv, setBtnRmv] = useState(false);

  const novoCupom = () => {
     const novo = {
      id: cupons.length + 1, 
      precoTroca: preco, 
      descPorc: desc + '% DE DESCONTO EM ' + item.toUpperCase(), 
    };
    setCupons(prev => [...prev, novo]);
    setCardAdd(false);
  }

  const porcentagem = (atual) => {
    if(atual > 100){
      alert('Valor máximo: 100%');
    } else {
      setDesc(atual);
    }
  }

  const remover = (id) => {
    setCupons(prev => prev.filter(atual => atual.id != id));
  }
  //atual: indice do array percorrido no momento - {}
  //filter: cria um novo array com a condição
  //prev: estado anterior

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={estilos.cabecalho}>
        <View>
          <TouchableOpacity onPress={()=>navigation.navigate('Descricao')}>
            <MaterialCommunityIcons name='keyboard-backspace' size={40} color='black' />
          </TouchableOpacity>
        </View>
        
        <View>
          <Image source={require('../assets/logo-topo.png')} style={{width: 70, height: 70, borderRadius: 20}} />
        </View>
      </View>

      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={{marginTop: 12}}>
          <Text style={estilos.txt_tit}>CUPONS CADASTRADOS</Text>
        </View>

        <View style={estilos.area_logo}>
          <Image source={mercados[0].logo} style={estilos.logo} />
        </View>

        <TouchableOpacity style={estilos.btnModal} onPress={()=>(setCardAdd(true))}>
          <MaterialCommunityIcons name='plus' color='white' size={30} />
        </TouchableOpacity>

        <Modal visible={cardAdd}>
          <View style={estilos.modal}>
            <View style={estilos.area_add}>
              <View style={{gap: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 15}}>Preço de troca do cupom (pontos):</Text>
                <TextInput placeholder='000' style={estilos.input} keyboardType='numeric' maxLength={3} onChangeText={setPreco} />
              </View>

              <View style={{gap: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 15}}>Desconto do cupom (%):</Text>
                <TextInput placeholder='000' style={estilos.input} keyboardType='numeric' maxLength={3} onChangeText={porcentagem} />
              </View>

              <View style={{gap: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 15}}>Item em promoção:</Text>
                <TextInput placeholder='Frios, carnes...' style={estilos.input} maxLength={30} onChangeText={setItem} />
              </View>
            </View>

            <TouchableOpacity style={estilos.btn_add} onPress={novoCupom}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: 500}}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilos.btn_add, {marginTop: 15}]} onPress={()=>{setCardAdd(false)}}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: 500}}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={estilos.area_lista}>
          <View style={estilos.cont_lista}>
            <FlatList
              style={estilos.flatlist}
              data={cupons}
              renderItem={({item})=>(
                <TouchableWithoutFeedback onPress={()=>{setBtnRmv(!btnRmv)}}>
                  <View style={estilos.card_cupom}>
                    <View style={{alignItems: 'center', marginTop: -20}}>
                      <Text style={estilos.txt_troca}>Preço de troca: {item.precoTroca} pontos</Text>
                      <Image source={require('../assets/img_cupom.png')} style={estilos.img}/>  

                      <View style={estilos.cobrir}>
                        <Text style={estilos.txt_cobrir}>{item.descPorc}</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={btnRmv ? estilos.btn_rmv : {display: 'none'}} onPress={() => {remover(item.id)}}>
                      <MaterialCommunityIcons name='delete' color='white' size={30} />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={{gap: 20}}
            />
          </View>
        </View>
      </View>

      <View style={{height: 10}} />
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

  area_logo:{
    borderTopWidth: 1,
    borderBottomWidth: 1, 
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    height: 160
  },

  logo:{
    width: '80%',
    height: '100%',
  },

  btnModal:{
    backgroundColor: '#31420a',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 235
  },

  modal:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },  

  area_add:{
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },

  input:{
    borderRadius: 20,
    borderWidth: 1,
    width: 225,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 0,
    textAlign: 'center',
    fontSize: 16
  },

  btn_add:{
    backgroundColor: '#31420a',
    marginTop: 25,
    width: 150,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
  },

  area_lista:{
    flex: 1,
    width: '100%',
    marginTop: 42
  },

  cont_lista:{
    flex: 1, 
    marginTop: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  flatlist:{
    marginVertical: 10, 
    width: '100%', 
    alignItems: 'center'
  },

  card_cupom:{
    width: 320,
    height: 225,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 24
  },

  img:{
    width: 250,
    height: 150,
  },

  txt_troca:{
    color: '#31420a',
    fontSize: 18,
    fontWeight: 800
  },

  cobrir:{
    position: 'absolute',
    backgroundColor: '#A9C26F',
    height: 52,
    width: 120,
    top: 70,
    left: 89,
    alignContent: 'center',
    paddingLeft: 10,
    justifyContent: 'center'
  },

  txt_cobrir:{
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontWeight: 700
  },

  btn_rmv:{
    backgroundColor: '#31420a',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
});