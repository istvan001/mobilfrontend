import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Etterem from './Etterem';

function HomeScreen({ navigation }) {
  return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function Screen ({ navigation }) {
  return (
  <Etterem />
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Kezdőlap" component={HomeScreen} />
        <Drawer.Screen name="Éttermek" component={Screen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
