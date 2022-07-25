import React, { useState } from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Awesome5 from 'react-native-vector-icons/FontAwesome5'
import Awesome from 'react-native-vector-icons/FontAwesome'
import style from './style';
import { logoutAction } from '../../redux/actionCreators/auth';
const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const { userData } = useSelector(state => state.user)
  return (
    <>
      <View style={style.container}>
        <View style={style.profileContainer}>
          <Image source={userData.profile_picture ? { uri: userData.profile_picture } : require('../../assets/img/profpict.png')} style={style.profpict} />
          <Text style={style.username}>{userData.display_name ? userData.display_name : 'Display Name'}</Text>
          {userData.roles === 'admin' ?
            <Text style={style.email}>Admin</Text>
            :
            <></>
          }
          <Text style={style.email}>{userData.email}</Text>
        </View>
        <View style={style.menuContainer}>
          <Pressable style={style.menuList} onPress={() => props.navigation.navigate('Home')}>
            <Awesome5 name='home' size={35} color='#6A4029' />
            <Text style={style.menuText}>Home</Text>
          </Pressable>
          <Pressable style={style.menuList} onPress={() => props.navigation.navigate('Profile')}>
            <Ionicons name='person-circle-outline' size={35} color='#6A4029' />
            <Text style={style.menuText}>Profile</Text>
          </Pressable>
          <Pressable style={style.menuList} onPress={() => props.navigation.navigate('Cart')}>
            <Material name='cart-arrow-down' size={35} color='#6A4029' />
            <Text style={style.menuText}>Orders</Text>
          </Pressable>
          <Pressable style={style.menuList} onPress={() => props.navigation.navigate('AllProduct', { category: 'all' })}>
            <Ionicons name='fast-food-outline' size={35} color='#6A4029' />
            <Text style={style.menuText}>All menu</Text>
          </Pressable>
          {userData.roles === 'admin' ?
            <View style={style.menuList}>
              <Material name='newspaper-variant-outline' size={35} color='#6A4029' />
              <Text style={style.menuText}>Sales Report</Text>
            </View>
            :
            <View style={style.menuList}>
              <Ionicons name='newspaper-outline' size={35} color='#6A4029' />
              <Text style={style.menuText}>Privacy policy</Text>
            </View>
          }
          {/* <View style={style.menuList}>
            <Awesome5 name='shield-alt' size={35} color='#6A4029' />
            <Text style={style.menuText}>Security</Text>
          </View> */}
        </View>
        <Pressable style={style.menuList} onPress={() => {
          setShow(true)
          // dispatch(logoutAction())
          // props.navigation.replace("Login")
        }}>
          <Material name='logout' size={35} color='#6A4029' />
          <Text style={style.menuText}>Logout</Text>
        </Pressable>
        {/* <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem />
      </DrawerContentScrollView> */}
      </View>
      <Modal visible={show} transparent={true}>
        <Pressable style={{ backgroundColor: '#000000', flex: 1, opacity: 0.5 }} onPress={() => setShow(false)}>
        </Pressable>
        <View style={{
          backgroundColor: '#ffffff',
          position: 'absolute',
          width: '60%',
          height: '20%',
          borderRadius: 10,
          top: '40%',
          left: '20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          paddingVertical: 20
        }}>

          <Text style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 20,
            color: '#000000',
            textAlign: 'center'
          }}>
            Are You Sure?
          </Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: '10%'
          }}>
            <Pressable style={{
              backgroundColor: '#6A4029',
              paddingVertical: 2.5,
              paddingHorizontal: '5%',
              borderRadius: 10
            }} onPress={() => {
              dispatch(logoutAction())
              props.navigation.replace("Login")
            }}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                color: '#ffffff',
                textAlign: 'center',
              }}>Logout</Text>
            </Pressable>
            <Pressable style={{
              backgroundColor: '#FFBA33',
              paddingVertical: 2.5,
              paddingHorizontal: '5%',
              borderRadius: 10
            }} onPress={() => setShow(false)}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                color: '#6A4029',
                textAlign: 'center'
              }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default MyDrawer