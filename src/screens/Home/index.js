import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import style from './style'

export default function Home(props) {
  return (
    <View>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>A good coffee is a good day</Text>
      </View>
      <View style={style.searchContainer}>
        <IconIonicons name='search' size={20} color='#9F9F9F' />
        <TextInput style={style.searchInput} placeholder={'Search'} />
      </View>
      <View style={style.categoryContainer}>
        <ScrollView horizontal={true} style={{ width: 700 }}>
          <Text>Favorite</Text>
          <Text>Coffee</Text>
          <Text>NonCoffee</Text>
          <Text>Food</Text>
          <Text>All</Text>
        </ScrollView>
      </View>
      {/* <Text style={style.categoryTitle}>Favorite Products</Text>
        <Text style={style.seeAll}>See more</Text> */}
    </View>
  )
}