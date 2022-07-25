import { View, Text, TextInput, Pressable, Modal, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import PromoCard from '../../components/PromoCard'

export default function EditPromo(props) {
  const [page, setPage] = useState('promo')
  const [allPromo, setAllPromo] = useState([])
  const [promo, setPromo] = useState({})
  const [promo1, setPromo1] = useState({})
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
      text1: 'Product Successfuly Updated'
    })
  }
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Create Failed',
      text2: 'Please check your connection and try again'
    })
  }

  const updateHandler = async () => {
    try {
      setLoading(true)
      const body = new FormData();
      body.append('name', promo1.name);
      body.append('normal_price', promo1.normal_price);
      body.append('description', promo1.description);
      body.append('category_id', promo1.category_id);
      body.append('discount', promo1.discount);
      body.append('start_date', promo1.start_date);
      body.append('end_date', promo1.end_date);
      body.append('code', promo1.code);
      body.append('picture', data);
      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "content-type": "multipart/form-data" } }
      const result = await axios.patch(`${REACT_APP_BE_HOST}/promos/${promo.id}`, body, config)
      console.log(result.data.data)
      successToast()
      setData(null)
      setPage('promo')
      setLoading(false)
    } catch (error) {
      console.log(error)
      errorToast()
      setLoading(false)
    }
  }
  const getPromo = async () => {
    try {
      // console.log(REACT_APP_BE_HOST)
      const result = await axios.get(`${REACT_APP_BE_HOST}/promos/all`)
      setAllPromo(result.data.data)
      console.log(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getPromoById = async () => {
    try {
      setLoading(true)
      const result = await axios.get(`${REACT_APP_BE_HOST}/promos/${promo.id}`)
      setPromo1(result.data.data[0])
      console.log(result.data.data[0])
      setPage('edit')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPromo()
  }, [page])
  // useEffect(() => {
  //   getPromoById()
  // }, [page])

  return (
    <>
      <Header {...props} />
      {page === 'promo' ?
        <View style={style.container2}>
          {loading ?
            <ActivityIndicator size={50} style={{ marginTop: 100 }} />
            :
            <FlatList data={allPromo} renderItem={({ item, idx }) => (
              <PromoCard key={idx} code={item.code} picture={item.picture} discount={item.discount} id={item.id} end_date={item.end_date} idx={idx} promo={promo} setPromo={setPromo} />
            )} />
          }
          <Pressable style={style.couponBtn} onPress={getPromoById}>
            <Text style={style.couponText}>
              Edit Coupons
            </Text>
          </Pressable>
        </View>
        :
        <ScrollView style={style.container}>
          <View style={style.imgContainer}>
            {data && data.uri ?
              <Image source={{ uri: data.uri }} style={style.img} />
              :
              promo1.picture ?
                <Image source={{ uri: promo1.picture }} style={style.img} />
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
            <TextInput style={style.input} placeholder={'Input Product Name'} placeholderTextColor={'#9f9f9f'} value={promo1.name} onChangeText={(e) => setPromo1({ ...promo1, name: e })} />
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>Price</Text>
            <TextInput style={style.input} placeholder={'Input Product Price'} placeholderTextColor={'#9f9f9f'} keyboardType={'number-pad'} value={promo1.normal_price && promo1.normal_price.toString()} onChangeText={(e) => setPromo1({ ...promo1, normal_price: e })} />
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>Description</Text>
            <TextInput style={style.input} placeholder={'Input Promo Description'} placeholderTextColor={'#9f9f9f'} value={promo1.description} onChangeText={(e) => setPromo1({ ...promo1, description: e })} />
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>Discount</Text>
            <TextInput style={style.input} placeholder={'Input Promo Discount'} placeholderTextColor={'#9f9f9f'} keyboardType={'number-pad'} value={promo1.discount && promo1.discount.toString()} onChangeText={(e) => setPromo1({ ...promo1, discount: e })} />
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>Start Date</Text>
            <View style={style.dateInputContainer}>
              <TextInput placeholder='Input Promo Start Date' placeholderTextColor={'#9f9f9f'} editable={false} style={style.dateInput} value={promo1.start_date} />
              <Awesome name='calendar' size={20} onPress={() => setOpen(true)} color={'#9f9f9f'} style={{ flex: 1 }} />
              <DatePicker modal open={open} date={promo1.start_date ? new Date(promo1.start_date) : new Date()} mode='date'
                onConfirm={date => {
                  setOpen(false)
                  // console.log(moment(date).format('YYYY-MM-DD'))
                  setPromo1({ ...promo1, start_date: moment(date).format('YYYY-MM-DD') })
                  // setStart(moment(date).format('YYYY-MM-DD'))
                  // setEnd(date)
                }}
                onCancel={() => setOpen(false)} />
            </View>
            <View style={style.border}></View>
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>End Date</Text>
            <View style={style.dateInputContainer}>
              <TextInput placeholder='Input Promo End Date' placeholderTextColor={'#9f9f9f'} editable={false} style={style.dateInput} value={promo1.end_date} />
              <Awesome name='calendar' size={20} onPress={() => setOpen2(true)} color={'#9f9f9f'} style={{ flex: 1 }} />
              <DatePicker modal open={open2} date={promo1.end_date ? new Date(promo1.end_date) : new Date()} mode='date'
                onConfirm={date => {
                  setOpen2(false)
                  // console.log(moment(date).format('YYYY-MM-DD'))
                  setPromo1({ ...promo1, end_date: moment(date).format('YYYY-MM-DD') })
                  // setEnd(moment(date).format('YYYY-MM-DD'))
                  // setEnd(date)
                }}
                onCancel={() => setOpen(false)} />
            </View>
            <View style={style.border}></View>
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>Code</Text>
            <TextInput style={style.input} placeholder={'Input Promo Code'} placeholderTextColor={'#9f9f9f'} value={promo1.code} onChangeText={(e) => setPromo1({ ...promo1, code: e })} />
          </View>
          <View style={style.inputContainer}>
            <Text style={style.title}>Category</Text>
            <View style={style.categoryContainer}>
              <Pressable style={promo1.category_id === '1' ? style.categoryBtnAct : style.categoryBtn} onPress={() => setPromo1({ ...promo1, category_id: '1' })}>
                <Text style={promo1.category_id === '1' ? style.categoryTxtAct : style.categoryTxt}>Coffee</Text>
              </Pressable>
              <Pressable style={promo1.category_id === '2' ? style.categoryBtnAct : style.categoryBtn} onPress={() => setPromo1({ ...promo1, category_id: '2' })}>
                <Text style={promo1.category_id === '2' ? style.categoryTxtAct : style.categoryTxt}>Non Coffee</Text>
              </Pressable>
              <Pressable style={promo1.category_id === '4' ? style.categoryBtnAct : style.categoryBtn} onPress={() => setPromo1({ ...promo1, category_id: '4' })}>
                <Text style={promo1.category_id === '4' ? style.categoryTxtAct : style.categoryTxt}>Food</Text>
              </Pressable>
            </View>
          </View>
          <Pressable style={style.saveBtn} onPress={updateHandler}>
            {loading ?
              <ActivityIndicator />
              :
              <Text style={style.saveTxt}>Update Promo</Text>
            }
          </Pressable>
          <Pressable style={style.saveBtn2} onPress={()=> setPage('promo')}>
            <Text style={style.saveTxt2}>
              Back to Coupons
            </Text>
          </Pressable>
        </ScrollView>
      }
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
    </>
  )
}