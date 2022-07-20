import { View, Text, ImageBackground, Pressable, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

import style from './style'
import { doRegister } from '../../modules/auth'


export default function Register({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)
  const [msg, setMsg] = useState('')
  const [input, setInput] = useState({
    email: '',
    pass: '',
    mobile_number: ''
  })
  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Register Success Please Login'
    })
  }
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: msg
    })
  }
  useEffect(()=>{
    if(isSuccess === true){
      successToast()
      navigation.navigate('Login')
    }
    if(isSuccess === false){
      errorToast()
    }
  },[msg])

  const registerHandler = async () => {
    try {
      if(!input.mobile_number){
        return setMsg('Input Phone Number')
      }
      setLoading(true)
      setIsSuccess(null)
      const response = await doRegister(input)
      console.log(response)
      // navigation.navigate('Login')
      setIsSuccess(true)
      setMsg(response.data.msg)
      setLoading(false)
    } catch (error) {
      setIsSuccess(false)
      setMsg(error.response.data.err.msg)
      // console.log(error.response.data.err.msg)
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={require('../../assets/img/register-bg.jpg')} style={style.imageBg}>
      <View style={style.imageBgClr}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Sign Up</Text>
        </View>
        <View style={style.btnContainer}>
          <TextInput style={style.input} placeholder='Enter your email address' placeholderTextColor='#cccccc'
            keyboardType='email-address'
            onChange={(e) => setInput({ ...input, email: e.nativeEvent.text })}
          />
          <TextInput style={style.input} placeholder='Enter your password' placeholderTextColor='#cccccc' secureTextEntry={true}
            onChange={(e) => setInput({ ...input, pass: e.nativeEvent.text })}
          />
          <TextInput style={style.input} placeholder='Enter your phone number' placeholderTextColor='#cccccc' keyboardType='numeric'
            onChange={(e) => {setInput({ ...input, mobile_number: e.nativeEvent.text })}}
          />
          <Pressable style={style.button} onPress={registerHandler}>
            <Text style={style.buttonText}>Create Account</Text>
          </Pressable>
          <Pressable style={style.gbutton}>
            <Image source={require('../../assets/icons/google.png')} style={style.google} />
            <Text style={style.gbuttonText}>Create with Google</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}