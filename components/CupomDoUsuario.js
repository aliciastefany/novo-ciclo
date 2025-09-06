import { View, Text, StyleSheet, Image } from 'react-native';

export default function CupomDoUsuario({ precoTroca, nomeMercado, descPorc }) {
  return (
    <View style={estilos.card_cupom}>
      <View style={{ alignItems: 'center', marginTop: -20 }}>
        <Text style={estilos.txt_troca}>Preço de troca: {precoTroca} pontos</Text>
        <Image source={require('../assets/img_cupom.png')} style={estilos.img} />

        <View style={estilos.cobrir}>
          <Text style={estilos.txt_cobrir}>{descPorc}</Text>
        </View>
      </View>

      <View style={estilos.nome_mercado}><Text style={estilos.texto_mercado}>{nomeMercado}</Text></View>
    </View>
  )
}

const estilos = StyleSheet.create({
  card_cupom: {
    width: 320,
    height: 225,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 24
  },

  img: {
    width: 250,
    height: 150,
  },

  txt_troca: {
    color: '#31420a',
    fontSize: 18,
    fontWeight: 800
  },

  nome_mercado:{
    backgroundColor: '#31420a',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    height: 32
  },

  texto_mercado: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
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
  }
})