import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Image } from 'react-native';

import Home from '../screens/Home';
import Locais from '../screens/Locais';
import Desc from '../screens/DescricaoLocais';
import Perfil from '../screens/Perfil';
import SobreNos from '../screens/SobreNos';
import Itens from '../screens/Itens';
import Dados from '../screens/Dados';
import QrCode from '../screens/QrCode';
import Pontos from '../screens/Pontos';
import TrocarPontos from '../screens/TrocarPontos';
import Dados2 from '../screens/Dados2';
import Dados3 from '../screens/Dados3';
import Editar from '../screens/EditarPerfil';
import Cupom from '../screens/Cupom';
import LocaisProximos from '../screens/LocaisProximos';

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function Lateral1() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: '#222222',
          width: 230,
        },

        drawerLabelStyle: {
          color: 'white',
          marginLeft: -5
        },

        drawerPosition: "right"
      })}>

      <Drawer.Screen name="Home" component={Home} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Itens" component={Itens} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Editar Perfil" component={Editar} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados" component={Dados} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/icon_dados.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Sobre Nós" component={SobreNos} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/logo-topo.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Descricao Locais" component={Desc} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Trocar Pontos" component={TrocarPontos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados2" component={Dados2} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados3" component={Dados3} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Cupom" component={Cupom} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
      
      <Drawer.Screen name="LocaisProximos" component={LocaisProximos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
    </Drawer.Navigator>
  )
}

function Lateral2() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: '#222222',
          width: 230,
        },

        drawerLabelStyle: {
          color: 'white',
          marginLeft: -5
        },

        drawerPosition: "right"
      })}>

      <Drawer.Screen name="Pontos" component={Pontos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados" component={Dados} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/icon_dados.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Sobre Nós" component={SobreNos} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/logo-topo.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Itens" component={Itens} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Editar Perfil" component={Editar} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Descricao Locais" component={Desc} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Trocar Pontos" component={TrocarPontos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados2" component={Dados2} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados3" component={Dados3} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Cupom" component={Cupom} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="LocaisProximos" component={LocaisProximos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
    </Drawer.Navigator>
  )
}

function Lateral3() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: '#222222',
          width: 230,
        },

        drawerLabelStyle: {
          color: 'white',
          marginLeft: -5
        },

        drawerPosition: "right",
      })}>

      <Drawer.Screen name="QrCode" component={QrCode} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados" component={Dados} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/icon_dados.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Editar Perfil" component={Editar} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Sobre Nós" component={SobreNos} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/logo-topo.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Itens" component={Itens} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Descricao Locais" component={Desc} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Trocar Pontos" component={TrocarPontos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados2" component={Dados2} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados3" component={Dados3} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Cupom" component={Cupom} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="LocaisProximos" component={LocaisProximos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
    </Drawer.Navigator>
  )
}

function Lateral4() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: '#222222',
          width: 230,
        },

        drawerLabelStyle: {
          color: 'white',
          marginLeft: -5
        },

        drawerPosition: "right",
      })}>

      <Drawer.Screen name="Locais" component={Locais} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Descricao Locais" component={Desc} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Editar Perfil" component={Editar} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados" component={Dados} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/icon_dados.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Sobre Nós" component={SobreNos} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/logo-topo.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Itens" component={Itens} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Trocar Pontos" component={TrocarPontos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados2" component={Dados2} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados3" component={Dados3} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Cupom" component={Cupom} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="LocaisProximos" component={LocaisProximos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
    </Drawer.Navigator>
  )
}

function Lateral5() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerStyle: {
          backgroundColor: '#222222',
          width: 230,
        },

        drawerLabelStyle: {
          color: 'white',
          marginLeft: -5
        },

        drawerPosition: "right",
      })}>

      <Drawer.Screen name="Perfil" component={Perfil} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Editar Perfil" component={Editar} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados" component={Dados} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/icon_dados.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Sobre Nós" component={SobreNos} options={{ headerShown: false, drawerIcon: () => (<Image source={require('../assets/logo-topo.png')} style={{ width: 55, height: 55 }} />) }} />

      <Drawer.Screen name="Itens" component={Itens} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Descricao Locais" component={Desc} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Trocar Pontos" component={TrocarPontos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados2" component={Dados2} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Dados3" component={Dados3} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="Cupom" component={Cupom} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

      <Drawer.Screen name="LocaisProximos" component={LocaisProximos} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
    </Drawer.Navigator>
  )
}

export default function Rotas() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{
      tabBarStyle: {
        backgroundColor: '#eaeaea',
        height: 87,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      },
    }}>

      <Tab.Screen name="Home" component={Lateral1} options={{ headerShown: false, tabBarIcon: ({ focused }) => <View style={focused && estilos.click}><Image source={require('../assets/home.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false }} />

      <Tab.Screen name="Pontos" component={Lateral2} options={{ headerShown: false, tabBarIcon: ({ focused }) => <View style={focused && estilos.click}><Image source={require('../assets/pontos.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false }} />

      <Tab.Screen name="Qr Code" component={Lateral3} options={{ headerShown: false, tabBarIcon: ({ focused }) => <View style={focused && estilos.click}><Image source={require('../assets/qrcode.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false }} />

      <Tab.Screen name="Locais" component={Lateral4} options={{ headerShown: false, tabBarIcon: ({ focused }) => <View style={focused && estilos.click}><Image source={require('../assets/locais.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false }} />

      <Tab.Screen name="Perfil" component={Lateral5} options={{ headerShown: false, tabBarIcon: ({ focused }) => <View style={focused && estilos.click}><Image source={require('../assets/perfil.png')} style={estilos.imgs} /></View>, tabBarShowLabel: false }} />

    </Tab.Navigator>
  );
}

const estilos = StyleSheet.create({
  click: {
    borderColor: '#205a0c',
    width: 55,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1
  },

  imgs: {
    width: 40,
    height: 40
  },
})