import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import style from './style';
const Drawer = createDrawerNavigator();

function MyDrawer(props) {
  return (
    <>
    <View style={style.container}>
      <Text>Teks</Text>
      {/* <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem />
      </DrawerContentScrollView> */}
    </View>
      </>
  );
}

export default MyDrawer