import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import Awesome5 from 'react-native-vector-icons/FontAwesome5'
import Header from '../../components/Header'
import style from './style'

export default function NewProduct(props) {
  return (
    <View>
      <Header {...props} />
      <View style={style.container}>
        <View style={style.imgContainer}>
          <View style={style.defaultContainer}>
            <Awesome5 name='camera' color={'#bababa'} size={50} />
            <View style={style.plusContainer}>
              <Awesome5 name='plus' color={'#ffffff'} size={25} style={style.plus} />
            </View>
          </View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Name</Text>
          <TextInput style={style.input} placeholder={'Input Product Name'} placeholderTextColor={'#9f9f9f'} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Price</Text>
          <TextInput style={style.input} placeholder={'Input Product Price'} placeholderTextColor={'#9f9f9f'} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Description</Text>
          <TextInput style={style.input} placeholder={'Input Product Description'} placeholderTextColor={'#9f9f9f'} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Category</Text>
          <View style={style.categoryContainer}>
            <Pressable style={style.categoryBtn}>
              <Text style={style.categoryTxt}>Non Coffee</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}