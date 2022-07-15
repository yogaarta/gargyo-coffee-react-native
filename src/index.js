import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './screens/Home'
import Register from './screens/Register'

 const Router = () => {
  const {Navigator, Screen} = createStackNavigator()
  return (
    <>
    <StatusBar barStyle={"light-content"} />
    <Navigator>
      <Screen name='Home' component={Home} options={{headerShown: false}} />
      <Screen name='Register' component={Register} options={{headerShown: false}} />
    </Navigator>
    </>
  )
}

export default Router