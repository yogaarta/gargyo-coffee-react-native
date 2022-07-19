import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Header from '../../components/Header'
import style from './style'

export default function EditProfile(props) {
  const [gender, setGender] = useState('')
  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>Edit Profile</Text>
        <View style={style.imgContainer}>
          <Image source={require('../../assets/img/profpict.png')} style={style.profpict} />
          <View style={style.pencilContainer}>
            <SimpleLineIcons name='pencil' size={20} color={'#ffffff'} style={style.pencil} />
          </View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Name :</Text>
          <TextInput placeholder='Input Your Name' style={style.input} />
          <View style={style.border}></View>
        </View>
        <View style={style.genderContainer}>
          <Text style={gender === 'female' ? style.genderActive : style.gender} onPress={() => setGender('female')}>
            <Fontisto name={gender === 'female' ? 'radio-btn-active' : 'radio-btn-passive'} style={style.radio} />
            Female
          </Text>
          <Text style={gender === 'male' ? style.genderActive : style.gender} onPress={() => setGender('male')}>
            <Fontisto name={gender === 'male' ? 'radio-btn-active' : 'radio-btn-passive'} style={style.radio} />
            Male
          </Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Email Adress :</Text>
          <TextInput placeholder='Input Your Email' style={style.input} />
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Phone Number :</Text>
          <TextInput placeholder='Input Your Phone Number' style={style.input} />
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Date of Birth</Text>
          <TextInput placeholder='Input Your Date of Birth' style={style.input} />
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Delivery Address :</Text>
          <TextInput placeholder='Input Your Address' style={style.input} />
          <View style={style.border}></View>
        </View>
        <View style={style.saveBtn}>
          <Text style={style.saveTxt}>
            Save and Update
          </Text>
        </View>
      </View>
    </>
  )
}