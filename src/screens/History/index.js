import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import style from './style'

export default function History(props) {
  const [isDelete, setIsDelete] = useState(false)
  return (
    <>
      <Header {...props} />
      <ScrollView style={style.container}>
        <Text style={style.title}>Order History</Text>
        <Pressable style={isDelete ? style.cardSelect : style.card} onLongPress={()=> setIsDelete(!isDelete)}>
          <Image source={require('../../assets/img/hazelnut.png')} style={style.img} />
          <View style={style.info}>
            <Text style={style.name}>Hazelnut Latte</Text>
            <Text style={style.price}>IDR 34.000</Text>
            <Text style={style.status}>Waiting for delivery [will arrive at 3 PM]</Text>
          </View>
        </Pressable>
        <Pressable style={isDelete ? style.cardSelect : style.card} onLongPress={()=> setIsDelete(!isDelete)}>
          <Image source={require('../../assets/img/hazelnut.png')} style={style.img} />
          <View style={style.info}>
            <Text style={style.name}>Hazelnut Latte</Text>
            <Text style={style.price}>IDR 34.000</Text>
            <Text style={style.status}>Waiting for delivery [will arrive at 3 PM]</Text>
          </View>
        </Pressable>
      </ScrollView>
    </>
  )
}