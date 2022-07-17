import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Awesome5 from 'react-native-vector-icons/FontAwesome5'
import style from './style';
const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  return (
    <>
      <View style={style.container}>
        <View style={style.profileContainer}>
          <Image source={require('../../assets/img/profpict.png')} style={style.profpict} />
          <Text style={style.username}>Zulaikha</Text>
          <Text style={style.email}>zulaikha17@gmail.com</Text>
        </View>
        <View style={style.menuContainer}>
          <View style={style.menuList}>
            <Ionicons name='person-circle-outline' size={35} color='#6A4029' />
            <Text style={style.menuText}>Edit Profile</Text>
          </View>
          <View style={style.menuList}>
            <Material name='cart-arrow-down' size={35} color='#6A4029' />
            <Text style={style.menuText}>Orders</Text>
          </View>
          <View style={style.menuList}>
            <Ionicons name='fast-food-outline' size={35} color='#6A4029' />
            <Text style={style.menuText}>All menu</Text>
          </View>
          <View style={style.menuList}>
            <Ionicons name='newspaper-outline' size={35} color='#6A4029' />
            <Text style={style.menuText}>Privacy policy</Text>
          </View>
          <View style={style.menuList}>
            <Awesome5 name='shield-alt' size={35} color='#6A4029' />
            <Text style={style.menuText}>Security</Text>
          </View>
        </View>
        <View style={style.menuList}>
          <Material name='logout' size={35} color='#6A4029' />
          <Text style={style.menuText}>Logout</Text>
        </View>
        {/* <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem />
      </DrawerContentScrollView> */}
      </View>
    </>
  );
}

export default MyDrawer