import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TaskList from '../screens/TaskList';

export default props => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Today">
      <Drawer.Screen name="Today" component={TaskList}   options={{ headerShown: false }} />
      <Drawer.Screen name="Tomorrow" component={TaskList}   options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
};

