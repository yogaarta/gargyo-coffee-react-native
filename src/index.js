import { View, Text, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Register from './screens/Register'
import Login from './screens/Login'
import Forgot from './screens/Forgot'
import Start from './screens/Start'
import Home from './screens/Home'
import MyDrawer from './screens/Drawer'
import ProductDetail from './screens/ProductDetail'
import Cart from './screens/Cart'
import Delivery from './screens/Delivery'
import Payment from './screens/Payment'
import Profile from './screens/Profile'
import EditProfile from './screens/EditProfile'
import History from './screens/History'
import AllProduct from './screens/Product'
import NewProduct from './screens/NewProduct'
import EditProduct from './screens/EditProduct'
import NewPromo from './screens/NewPromo'
import ChangePass from './screens/ChangePass'

const Drawer = createDrawerNavigator()

const DrawerNav = () => {
  // const [logout, setLogout] = useState(false)
  return (
      <Drawer.Navigator useLegacyImplementation={true} drawerContent={(props)=> <MyDrawer {...props}/>} >
        <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name='Product' component={ProductDetail} options={{ headerShown: false }}/>
        <Drawer.Screen name='Cart' component={Cart} options={{ headerShown: false }}/>
        <Drawer.Screen name='Delivery' component={Delivery} options={{ headerShown: false }}/>
        <Drawer.Screen name='Payment' component={Payment} options={{ headerShown: false }}/>
        <Drawer.Screen name='Profile' component={Profile} options={{ headerShown: false }}/>
        <Drawer.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }}/>
        <Drawer.Screen name='History' component={History} options={{ headerShown: false }}/>
        <Drawer.Screen name='AllProduct' component={AllProduct} options={{ headerShown: false }}/>
        <Drawer.Screen name='NewProduct' component={NewProduct} options={{ headerShown: false }}/>
        <Drawer.Screen name='NewPromo' component={NewPromo} options={{ headerShown: false }}/>
        <Drawer.Screen name='EditProduct' component={EditProduct} options={{ headerShown: false }}/>
        <Drawer.Screen name='ChangePass' component={ChangePass} options={{ headerShown: false }}/>
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