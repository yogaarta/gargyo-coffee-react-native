import { View, Text, ImageBackground, Pressable, TextInput, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { REACT_APP_BE_HOST } from '@env'
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import style from './style'
import Header from '../../components/Header'
import { logoutAction } from '../../redux/actionCreators/auth';

export default function ChangePass(props) {
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [msg, setMsg] = useState('')
  const [page, setPage] = useState('email')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)

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
  console.log(REACT_APP_BE_HOST)
  const resetHandler = async () => {
    try {
      if (!pass || !pass2) {
        return errorToast('Input Password and Confirm Password!')
      }
      if (pass !== pass2) {
        return errorToast('Invalid password and confirmation password!')
      }
      setLoading(true)
      const body = { newPass: pass }
      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "content-type": "multipart/form-data" } }
      const result = await axios.patch(`${REACT_APP_BE_HOST}/users/changepass`, body, config)
      successToast('Password Changed, Please Login Again')
      dispatch(logoutAction())
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
    <>
      <Header {...props} />
      <View style={style.imageBgClr}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Edit Password</Text>
          <Text style={style.subtitle}>We've just sent a link to your email to request a new password</Text>
        </View>
        <View style={style.btnContainer}>
          <View style={style.passContainer}>
            <TextInput style={style.inputPass} placeholder='Enter your password' placeholderTextColor='#9f9f9f' secureTextEntry={showPass ? false : true}
              onChangeText={(e) => { setPass(e) }}
            />
            <Ionicons name={showPass ? 'eye-outline' : 'eye-off-outline'} style={style.eye} onPress={() => setShowPass(!showPass)} />
          </View>
          <View style={style.passContainer}>
            <TextInput style={style.inputPass} placeholder='Confirm your password' placeholderTextColor='#9f9f9f' secureTextEntry={showPass2 ? false : true}
              onChangeText={(e) => { setPass2(e) }}
            />
            <Ionicons name={showPass2 ? 'eye-outline' : 'eye-off-outline'} style={style.eye} onPress={() => setShowPass2(!showPass2)} />
          </View>
          <Pressable style={style.button} onPress={resetHandler}>
            {loading ?
              <ActivityIndicator />
              :
              <Text style={style.buttonText}>Edit Password</Text>
            }
          </Pressable>
        </View>
      </View>
    </>
  )
}