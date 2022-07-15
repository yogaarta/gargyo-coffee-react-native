import { View, Text, ImageBackground, TextInput, Image, Pressable } from 'react-native'
import React from 'react'

import style from './style'

export default function Login() {
  return (
    <ImageBackground source={require('../../assets/img/login-bg.jpg')} style={style.imageBg}>
      <View style={style.imageBgClr}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Login</Text>
        </View>
        <View style={style.btmContainer}>
          <TextInput style={style.input} placeholder='Enter your email address' placeholderTextColor='#cccccc'/>
          <TextInput style={style.input} placeholder='Enter your password' placeholderTextColor='#cccccc' secureTextEntry={true}/>
          <Text style={style.forgot}>Forgot password?</Text>
          <Pressable style={style.loginBtn}>
            <Text style={style.loginText}>Login</Text>
          </Pressable>
          <View style={style.info}>
            <View style={style.border}></View>
            <Text style={style.infoText}>or login in with</Text>
            <View style={style.border}></View>
          </View>
          <Pressable style={style.gbutton}>
          <Image source={require('../../assets/icons/google.png')} style={style.google}/>
            <Text style={style.gbuttonText}>Create with Google</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}