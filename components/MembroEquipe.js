import {View, Text, StyleSheet, Image} from 'react-native';

export default function MembroEquipe({nome, imagem}){
    return (
        <View style={estilos.campo_imgs}>
            <Image source={imagem} style={estilos.img} />
            <Text style={estilos.txt_eq}>{nome}</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
  campo_imgs:{
    alignItems: 'center',
    gap: 4,
    marginHorizontal: 35
  },

  img:{
    width: 100,
    height: 100,
    borderRadius: 100
  },

  txt_eq:{
    fontWeight: 500, 
    width: 120,
    textAlign: 'center'
  }
});