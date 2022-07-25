import { View, Text, TextInput, Pressable, Modal, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { REACT_APP_BE_HOST } from '@env'
import Toast from 'react-native-toast-message'
import Awesome5 from 'react-native-vector-icons/FontAwesome5'
import Awesome from 'react-native-vector-icons/FontAwesome'
import Header from '../../components/Header'
import style from './style'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function NewProduct(props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)


  const { userInfo } = useSelector(state => state.auth)

  const chooseImage = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    try {
      setShow(false)
      const result = await launchImageLibrary(options)
      setData({
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
        height: result.assets[0].height,
        width: result.assets[0].width
      })
      console.log(result.assets[0])
    } catch (error) {
      console.log(error)
    }
  }
  const useCamera = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    try {
      setShow(false)
      const result = await launchCamera(options)
      setData({
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
        height: result.assets[0].height,
        width: result.assets[0].width
      })
      console.log(result.assets[0])
    } catch (error) {
      console.log(error)
    }
  }
  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Product Successfuly Created'
    })
  }
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Create Failed',
      text2: 'Please check your connection and try again'
    })
  }

  const saveHandler = async () => {
    try {
      setLoading(true)
      const body = new FormData();
      body.append('name', name);
      body.append('price', price);
      body.append('description', description);
      body.append('category_id', category);
      body.append('picture', data)
      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "content-type": "multipart/form-data" } }
      const result = await axios.post(`${REACT_APP_BE_HOST}/products`, body, config)
      console.log(result)
      successToast()
      setName('')
      setPrice('')
      setDescription('')
      setCategory('')
      setData({})
      setLoading(false)
    } catch (error) {
      console.log(error)
      errorToast()
      setLoading(false)
    }
  }

  return (
    <View>
      <Header {...props} />
      <View style={style.container}>
        <View style={style.imgContainer}>
          {data && data.uri ?
            <Image source={{ uri: data.uri }} style={style.img} />
            :
            <View style={style.defaultContainer}>
              <Awesome5 name='camera' color={'#bababa'} size={50} />
            </View>
          }
          <Pressable style={style.plusContainer} onPress={() => setShow(true)}>
            <Awesome5 name='plus' color={'#ffffff'} size={25} style={style.plus} />
          </Pressable>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Name</Text>
          <TextInput style={style.input} placeholder={'Input Product Name'} placeholderTextColor={'#9f9f9f'} value={name} onChangeText={(e) => setName(e)} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Price</Text>
          <TextInput style={style.input} placeholder={'Input Product Price'} placeholderTextColor={'#9f9f9f'} keyboardType={'number-pad'} value={price} onChangeText={(e) => setPrice(e)} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Description</Text>
          <TextInput style={style.input} placeholder={'Input Product Description'} placeholderTextColor={'#9f9f9f'} value={description} onChangeText={(e) => setDescription(e)} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Category</Text>
          <View style={style.categoryContainer}>
            <Pressable style={category === '1' ? style.categoryBtnAct : style.categoryBtn} onPress={() => setCategory('1')}>
              <Text style={category === '1' ? style.categoryTxtAct : style.categoryTxt}>Coffee</Text>
            </Pressable>
            <Pressable style={category === '2' ? style.categoryBtnAct : style.categoryBtn} onPress={() => setCategory('2')}>
              <Text style={category === '2' ? style.categoryTxtAct : style.categoryTxt}>Non Coffee</Text>
            </Pressable>
            <Pressable style={category === '4' ? style.categoryBtnAct : style.categoryBtn} onPress={() => setCategory('4')}>
              <Text style={category === '4' ? style.categoryTxtAct : style.categoryTxt}>Food</Text>
            </Pressable>
          </View>
        </View>
        <Pressable style={style.saveBtn} onPress={saveHandler}>
          {loading ?
            <ActivityIndicator />
            :
            <Text style={style.saveTxt}>Save Product</Text>
          }
        </Pressable>
      </View>
      <Modal visible={show} transparent={true} animationType={'fade'}>
        <Pressable style={{ backgroundColor: '#000000', flex: 1, opacity: 0.5 }} onPress={() => setShow(false)}>
        </Pressable>
        <View style={{
          backgroundColor: '#ffffff',
          paddingVertical: 20,
          paddingHorizontal: '10%',
          position: 'relative',
          // top: '30%', left: '20%', 
          height: '18%', width: '100%',
          display: 'flex', flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between',
          borderRadius: 10
        }}>
          <Pressable style={{
            backgroundColor: '#FFBA33',
            width: '30%',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', borderRadius: 10
          }} onPress={chooseImage}>
            <Awesome name='photo' size={30} color={'#ffffff'} />
          </Pressable>
          <Pressable style={{
            backgroundColor: '#6A4029',
            width: '30%',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', borderRadius: 10
          }} onPress={useCamera}>
            <Awesome name='camera' size={30} color={'#ffffff'} />
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}