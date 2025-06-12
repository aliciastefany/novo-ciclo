import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';

export default function Cupons({ setBtnRmv, btnRmv, onPress }){
    return (
        <TouchableWithoutFeedback onPress={()=>{setBtnRmv(!btnRmv)}}>
            <View style={estilos.card_cupom}>
                <View style={{alignItems: 'center', marginTop: -20}}>
                    <Text style={estilos.txt_troca}>Preço de troca: {item.precoTroca} pontos</Text>
                    <Image source={require('../assets/img_cupom.png')} style={estilos.img}/>  

                    <View style={estilos.cobrir}>
                    <Text style={estilos.txt_cobrir}>{item.descPorc}</Text>
                    </View>
                </View>

                <TouchableOpacity style={btnRmv ? estilos.btn_rmv : {display: 'none'}} onPress={() => {onPress}}>
                    <MaterialCommunityIcons name='delete' color='white' size={30} />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const estilos = StyleSheet.create({
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
})