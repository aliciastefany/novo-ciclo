import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';

export default function CardMaterial({ item, onPress }){
    return(
        <TouchableOpacity style={estilos.btn_materiais} onPress={onPress}>
            <View style={[estilos.geral_btns, {backgroundColor: `${item.cor}`}]}>
                <View style={{gap: 4, flex: 1, marginRight: 68}}>
                <Text style={estilos.titulo}>{item.titulo}</Text>
                <Text style={estilos.descricao}>{item.descricao}</Text>
                </View>

                <View style={estilos.cont_img}>
                <Image source={item.imagem} style={estilos.img} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({

  btn_materiais:{
    alignItems: 'center',
  },

  geral_btns:{
    width: 340,
    height: 80,
    borderRadius: 20,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titulo:{
    color: 'white',
    fontSize: 20,
    fontWeight: 500
  },

  descricao: {
    color: 'white',
    fontWeight: 400
  },

  cont_img: {
    position: 'absolute',
    right: 18,
  },

  img: {
    width: 50,
    height: 50,
  },
});