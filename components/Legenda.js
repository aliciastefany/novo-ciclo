import {StyleSheet, View, Text} from 'react-native';

export default function Legenda({ corLegenda, titulo }) {
    return (
      <View style={estilos.area_legendas}>
        <View style={[estilos.bola_leg, {
            backgroundColor: `${corLegenda}`
        }]} />
        <Text style={estilos.legendas}>{titulo}</Text>
      </View>
    )
}

const estilos = StyleSheet.create({
  titulo:{
    color: 'white',
    fontSize: 20,
    fontWeight: 500
  },

  area_legendas:{
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '90%',
    left: 17,
  },

  bola_leg:{
    width: 20,
    height: 20,
    borderRadius: 20,
  },

  legendas:{
    fontSize: 15,
  },
});