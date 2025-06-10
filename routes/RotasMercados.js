import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Image} from 'react-native';

const Tab = createBottomTabNavigator();

import Home from '../screens/HomeMercados';
import QrCode from '../screens/QrCodeMercados';
import Descricao from '../screens/InfoMercados';
import Perfil from '../screens/PerfilMercados';
import Cupons from '../screens/CuponsMercados';
import Editar from '../screens/EditarMercado';

export default function Rotas2() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={()=>({
      tabBarLabelStyle: {
        color: 'black',
        fontWeight: 500,
        fontSize: 14,
        position: 'relative',
        marginBottom: 4,
        marginTop: 0,
      },

      tabBarStyle: {
        backgroundColor: '#eaeaea',
        height: 55
      }
    })}>

    <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: ({focused}) => <View style={focused && estilos.click}><Image source={require('../assets/home.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false}} />
      
      <Tab.Screen name="Qr Code" component={QrCode} options={{headerShown: false, tabBarIcon: ({focused}) => <View style={focused && estilos.click}><Image source={require('../assets/qrcode.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false}}/>

      <Tab.Screen name="Descricao" component={Descricao} options={{headerShown: false, tabBarIcon: ({focused}) => <View style={focused && estilos.click}><Image source={require('../assets/locais.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false}}/>

      <Tab.Screen name="Perfil" component={Perfil} options={{headerShown: false, tabBarIcon: ({focused}) => <View style={focused && estilos.click}><Image source={require('../assets/perfil.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false}}/>

      <Tab.Screen name="Cupons" component={Cupons} options={{headerShown: false, tabBarShowLabel: false, tabBarItemStyle: {display: 'none'}}}/>

      <Tab.Screen name="Editar Mercado" component={Editar} options={{headerShown: false, tabBarShowLabel: false, tabBarItemStyle: {display: 'none'}}}/>
    </Tab.Navigator>
  );
}

const estilos = StyleSheet.create({
  click:{
    borderColor: '#205a0c',
    width: 55,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1
  },

  imgs:{
    width: 40,
    height: 40
  },
})