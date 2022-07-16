import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import style from './style'

export default function Home(props) {
  return (
    <View>
      <Header {...props}/>
      <View style={style.container}>
        <Text style={style.title}>A good coffee is a good day</Text>
      </View>
    </View>
  )
}