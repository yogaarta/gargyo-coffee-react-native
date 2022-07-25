import { View, Text, ImageBackground, Pressable, TextInput, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { REACT_APP_BE_HOST } from '@env'
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import style from './style'
import { set } from 'react-native-reanimated'

export default function Forgot(props) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [msg, setMsg] = useState('')
  const [page, setPage] = useState('email')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const successToast = (msg) => {
    Toast.show({
      type: 'success',
      text1: msg
    })
  }
  const errorToast = (msg) => {
    Toast.show({
      type: 'error',
      text1: msg
    })
  }
  const sendLinkHandler = async () => {
    try {
      setLoading(true)
      setSuccess(null)
      if (!email) {
        // setMsg('Please input email')
        errorToast('Please input email')
        return
      }
      const result = await axios.get(`${REACT_APP_BE_HOST}/auth/forgot/${email}`)
      setMsg(result.data.message)
      // console.log(result.data.message)
      successToast(result.data.message)
      setSuccess(true)
      setPage('reset')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setMsg('Error')
      setSuccess(false)
      setLoading(false)
    }
  }
  const resetHandler = async () => {
    try {
      if (!pass || !pass2) {
        return errorToast('Input Password and Confirm Password!')
      }
      if (pass !== pass2) {
        return errorToast('Invalid password and confirmation password!')
      }
      if (!code) {
        return errorToast('Input Confirmation Code!')
      }
      setLoading(true)
      const body = { confirmCode: code, newPass: pass }
      const result = await axios.patch(`${REACT_APP_BE_HOST}/auth/reset/${email}`, body)
      successToast(result.data.msg)
      props.navigation.replace('Login')
      setLoading(false)
    } catch (error) {
      console.log(error.response.data.err.msg)
      errorToast(error.response.data.err.msg)
      setLoading(false)
    }
  }

  // useEffect(()=>{
  //   if(success){
  //     successToast()
  //   }
  //   if(success === false){
  //     errorToast()
  //   }
  // },[msg])

  return (
    <ImageBackground source={require('../../assets/img/forgot-bg.jpg')} style={style.imgBg}>
      <View style={style.imageBgClr}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Don't Worry!</Text>
          <Text style={style.subtitle}>We've just sent a link to your email to request a new password</Text>
        </View>
        {page === 'email' ?
          <View style={style.btnContainer}>
            <TextInput style={style.input} placeholder='Enter your email address' placeholderTextColor='#cccccc'
              keyboardType='email-address'
              onChangeText={(e) => setEmail(e)}
            />
            <Pressable style={style.button} onPress={sendLinkHandler}>
              {loading ?
                <ActivityIndicator />
                :
                <Text style={style.buttonText}>Send Link</Text>
              }
            </Pressable>
          </View>
          :
          <View style={style.btnContainer}>
            <TextInput style={style.input} placeholder='Enter your confirmation code' placeholderTextColor='#cccccc'
              keyboardType='email-address'
              onChangeText={(e) => setCode(e)}
            />
            <View style={style.passContainer}>
              <TextInput style={style.inputPass} placeholder='Enter your password' placeholderTextColor='#cccccc' secureTextEntry={showPass ? false : true}
                onChangeText={(e) => { setPass(e) }}
              />
              <Ionicons name={showPass ? 'eye-outline' : 'eye-off-outline'} style={style.eye} onPress={() => setShowPass(!showPass)} />
            </View>
            <View style={style.passContainer}>
              <TextInput style={style.inputPass} placeholder='Confirm your password' placeholderTextColor='#cccccc' secureTextEntry={showPass2 ? false : true}
                onChangeText={(e) => { setPass2(e) }}
              />
              <Ionicons name={showPass2 ? 'eye-outline' : 'eye-off-outline'} style={style.eye} onPress={() => setShowPass2(!showPass2)} />
            </View>
            <Pressable style={style.button} onPress={resetHandler}>
              {loading ?
                <ActivityIndicator />
                :
                <Text style={style.buttonText}>Reset Password</Text>
              }
            </Pressable>
          </View>

        }
      </View>
    </ImageBackground>
  )
}