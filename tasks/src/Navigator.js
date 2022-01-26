import React from 'react'
import {StyleSheet} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import Auth from './screens/Auth'
import DrawerNavigator from './routes/DrawerNavigator';



const mainRoutes ={
  Auth:{
      name:'Auth',
      screen:Auth
  },
  Home:{
      name:'Home',
      screen:DrawerNavigator,
  }
}

const mainNavigator = createSwitchNavigator(mainRoutes,{
  initialRouteName:'Auth'
})


export default createAppContainer(mainNavigator)
