import { SafeAreaView, Image, StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, Keyboard, Alert} from 'react-native';
import { useState, useEffect, useContext } from 'react';

export default function LocaisProximos({navigation}){
  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={estilos.fundoMapa}>
        
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  img_fundo:{
    width:'100%', 
    height: '100%', 
  },
})