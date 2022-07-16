import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Register from './screens/Register'
import Login from './screens/Login'
import Forgot from './screens/Forgot'
import Start from './screens/Start'
import Home from './screens/Home'

const Drawer = createDrawerNavigator()

const Router = () => {
  const { Navigator, Screen } = createStackNavigator()
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Navigator>
        <Screen name='Start' component={Start} options={{ headerShown: false }} />
        <Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Screen name='Forgot' component={Forgot} options={{ headerShown: false }} />
      </Navigator>
      {/* <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home} />
      </Drawer.Navigator> */}
    </>
  )
}

export default Router