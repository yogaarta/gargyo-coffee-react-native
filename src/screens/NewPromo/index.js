import { View, Text, TextInput, Pressable, Modal, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { REACT_APP_BE_HOST } from '@env'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import Toast from 'react-native-toast-message'
import Awesome5 from 'react-native-vector-icons/FontAwesome5'
import Awesome from 'react-native-vector-icons/FontAwesome'
import Header from '../../components/Header'
import style from './style'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function NewPromo(props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [discount, setDiscount] = useState(0)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [code, setCode] = useState('')
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [show, setShow] = useState(false)
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
      body.append('normal_price', price);
      body.append('description', description);
      body.append('category_id', category);
      body.append('discount', discount);
      body.append('start_date', start);
      body.append('end_date', end);
      body.append('code', code);
      body.append('picture', data);
      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "content-type": "multipart/form-data" } }
      const result = await axios.post(`${REACT_APP_BE_HOST}/promos`, body, config)
      console.log(result)
      successToast()
      setName('')
      setPrice('')
      setDescription('')
      setCategory('')
      setDiscount('')
      setStart('')
      setEnd('')
      setCode('')
      setData(null)
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
      <ScrollView style={style.container}>
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
          <TextInput style={style.input} placeholder={'Input Promo Description'} placeholderTextColor={'#9f9f9f'} value={description} onChangeText={(e) => setDescription(e)} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Discount</Text>
          <TextInput style={style.input} placeholder={'Input Promo Discount'} placeholderTextColor={'#9f9f9f'} keyboardType={'number-pad'} value={discount} onChangeText={(e) => setDiscount(e)} />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Start Date</Text>
          <View style={style.dateInputContainer}>
            <TextInput placeholder='Input Promo Start Date' placeholderTextColor={'#9f9f9f'} editable={false} style={style.dateInput} value={start} />
            <Awesome name='calendar' size={20} onPress={() => setOpen(true)} color={'#9f9f9f'} style={{flex: 1}}/>
            <DatePicker modal open={open} date={start ? new Date(start) : new Date()} mode='date'
              onConfirm={date => {
                setOpen(false)
                // console.log(moment(date).format('YYYY-MM-DD'))
                setStart(moment(date).format('YYYY-MM-DD'))
                // setEnd(date)
              }}
              onCancel={() => setOpen(false)} />
          </View>
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>End Date</Text>
          <View style={style.dateInputContainer}>
            <TextInput placeholder='Input Promo End Date' placeholderTextColor={'#9f9f9f'} editable={false} style={style.dateInput} value={end} />
            <Awesome name='calendar' size={20} onPress={() => setOpen2(true)} color={'#9f9f9f'} style={{flex: 1}}/>
            <DatePicker modal open={open2} date={end ? new Date(end) : new Date()} mode='date'
              onConfirm={date => {
                setOpen2(false)
                // console.log(moment(date).format('YYYY-MM-DD'))
                setEnd(moment(date).format('YYYY-MM-DD'))
                // setEnd(date)
              }}
              onCancel={() => setOpen(false)} />
          </View>
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.title}>Code</Text>
          <TextInput style={style.input} placeholder={'Input Promo Code'} placeholderTextColor={'#9f9f9f'} value={code} onChangeText={(e) => setCode(e)} />
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
            <Text style={style.saveTxt}>Save Promo</Text>
          }
        </Pressable>
      </ScrollView>
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