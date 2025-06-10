import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Rotas from './routes/Rotas';
import RotasMercados from './routes/RotasMercados';
import TelaInicial from './screens/Inicial'; 
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import LoginMercados from './screens/LoginMercados';
import CadastroMercados from './screens/CadastroMercados';
import {UserProvider} from './ContextPerfil';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Inicial">
            <Stack.Screen name="Inicial" component={TelaInicial}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Cadastro" component={Cadastro}/>
            <Stack.Screen name="Login Mercados" component={LoginMercados}/>
            <Stack.Screen name="Cadastro Mercados" component={CadastroMercados}/>
            <Stack.Screen name="Rotas" component={Rotas}/>
            <Stack.Screen name="Rotas Mercados" component={RotasMercados}/>
          </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}