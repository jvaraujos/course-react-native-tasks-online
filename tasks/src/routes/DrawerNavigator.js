import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TaskList from '../screens/TaskList';

export default props => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Today" screenOptions={menuConfig}
      drawerContent={(props) => <Menu {...props} email={email} name={name} />}>
      <Drawer.Screen name="Today" 
      component={props => <TaskList title='Hoje' daysAhead={0} {...props}/>}   
      options={{ headerShown: false }} />
      <Drawer.Screen name="Tomorrow" 
      component={props => <TaskList title='Amanha' daysAhead={1} {...props}/>}   
      options={{ headerShown: false }}/>
         <Drawer.Screen name="Week" 
      component={props => <TaskList title='Semana' daysAhead={7} {...props}/>}   
      options={{ headerShown: false }}/>
         <Drawer.Screen name="Month" 
      component={props => <TaskList title='Mes' daysAhead={30} {...props}/>}   
      options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
};
const menuConfig = {
  initialRouteName : 'Today',
  contentComponent:Menu,
  contentOptions:{
    labelStyle:{
      fontFamily:commonStyles.fontFamily,
      fontWeight:'normal',
      fontSize:20,
    },
    activeLabelStyle:{
      color:'#080',
      fontWeight:'bold',
    }
  }
}

