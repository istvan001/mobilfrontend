import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Etterem from './Etterem';

function HomeScreen({ navigation }) {
  return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Éttermek')}
        title="Éttermek lap"
      />
    </View>
  );
}

function Screen ({ navigation }) {
  return (
    <Etterem
    options={{
      headerStyle: {
        backgroundColor: '#f4511e',
      }
    }}
  />
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Kezdőlap" component={HomeScreen} options={{
  title: 'Főoldal',
  headerStyle: {
    backgroundColor: 'darkblue',
  },
  headerTintColor: '#fff',

}}/>
        <Drawer.Screen name="Éttermek" component={Screen} options={{
  title: 'Éttermek',
  headerStyle: {
    backgroundColor: 'darkblue',
  },
  headerTintColor: '#fff',

}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
