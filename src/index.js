import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Register from './screens/Register'
import Login from './screens/Login'
import Forgot from './screens/Forgot'
import Start from './screens/Start'
import Home from './screens/Home'
import MyDrawer from './screens/Drawer'

const Drawer = createDrawerNavigator()

const DrawerNav = () => {
  return (
      <Drawer.Navigator useLegacyImplementation={true} drawerContent={(props)=> <MyDrawer {...props}/>}>
        <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  )
}

const Router = () => {
  const { Navigator, Screen } = createStackNavigator()
  return (
    <>
      <StatusBar barStyle={"light-content"} hidden={true} />
      <Navigator>
        <Screen name='Start' component={Start} options={{ headerShown: false }} />
        <Screen name='Register' component={Register} options={{ headerShown: false }}/>
        <Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Screen name='Forgot' component={Forgot} options={{ headerShown: false }} />
        <Screen name='Drawer' component={DrawerNav} options={{ headerShown: false }}/>
      </Navigator>
    </>
  )
}

export default Router