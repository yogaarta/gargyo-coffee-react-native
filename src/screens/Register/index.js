import { View, Text, ImageBackground, Pressable, TextInput, Image } from 'react-native'
import React, { useState } from 'react'

import style from './style'


export default function Register() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    phoneNumber: ''
  })
  return (
    <ImageBackground source={require('../../assets/img/register-bg.jpg')} style={style.imageBg}>
      <View style={style.imageBgClr}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Sign Up</Text>
        </View>
        <View style={style.btnContainer}>
          <TextInput style={style.input} placeholder='Enter your email address' placeholderTextColor='#cccccc' 
          keyboardType='email-address'
          onChange={(e)=> setInput({...input, email: e.nativeEvent.text})}
          />
          <TextInput style={style.input} placeholder='Enter your password' placeholderTextColor='#cccccc' secureTextEntry={true}
          onChange={(e)=> setInput({...input, password: e.nativeEvent.text})}
          />
          <TextInput style={style.input} placeholder='Enter your phone number' placeholderTextColor='#cccccc' keyboardType='numeric'
          onChange={(e)=> setInput({...input, phoneNumber: e.nativeEvent.text})}
          />
          <Pressable style={style.button}>
            <Text style={style.buttonText}>Create Account</Text>
          </Pressable>
          <Pressable style={style.gbutton}>
          <Image source={require('../../assets/icons/google.png')} style={style.google}/>
            <Text style={style.gbuttonText}>Create with Google</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}