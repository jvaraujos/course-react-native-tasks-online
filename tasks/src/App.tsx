import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator></Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
