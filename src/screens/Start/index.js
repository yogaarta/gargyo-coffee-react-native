import { View, Text, ImageBackground, Pressable, } from 'react-native';
import React, { useEffect, useState } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto'
import style from './style'
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actionCreators/auth';


export default function Start({ navigation }) {
  const [page, setPage] = useState('splash')
  const dispatch = useDispatch()

  useEffect(() => {
    if (page === 'splash') {
      dispatch(logoutAction())
      setTimeout(() => {
        setPage('home')
      }, 5000)
    }
  })
  return (
    <View style={style.container}>
      {page === 'splash' ?
        <View style={style.splashBg}>
          <Fontisto name='coffeescript' size={100} color={'#FFBA33'} />
          <Text style={style.splashTitle}>Gargyo Coffee</Text>
        </View>
        :
        page === 'home' ?
          <ImageBackground source={require('../../assets/img/home-bg.png')} style={style.imageBg}>
            <View style={style.imageBgClr}>
              <Text style={style.title}>Coffee for Everyone</Text>
              <View style={style.btnContainer}>
                <Pressable style={style.button} onPress={() => setPage('welcome')}>
                  <Text style={style.buttonText}>Get started</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
          :
          <ImageBackground source={require('../../assets/img/welcome-bg.png')} style={style.imageBg}>
            <View style={style.imageBgClr}>
              <View>
                <Text style={style.title}>Welcome!</Text>
                <Text style={style.info}>Get a cup of coffee for free every sunday morning</Text>
              </View>
              <View style={style.btnContainer}>
                <Pressable style={style.buttonReg} onPress={() => navigation.navigate('Register')}>
                  {/* <Pressable style={style.buttonReg} onPress={() => navigation.navigate('Register')}> */}
                  <Text style={style.regText}>Create New Account</Text>
                </Pressable>
                <Pressable style={style.button} onPress={() => navigation.replace('Login')}>
                  <Text style={style.buttonText}>Login</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>

      }
    </View>
  );
}
