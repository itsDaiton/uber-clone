import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Home from './screens/Home';
import Map from './screens/Map';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen 
              name='Home' 
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name='Map' 
              component={Map}
              options={{
                headerShown: false,
              }}
            />        
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
