import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Header from '../../components/Header'
import style from './style'
import { currencyFormatter } from '../../helpers/formatter'
import { addProductAction } from '../../redux/actionCreators/cart'

export default function Delivery(props) {
  const [delivery, setDelivery] = useState('')
  const { product } = useSelector(state => state.cart)
  const { userData } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Please Input Delivery Method'
    })
  }
  const proceedHandler = () => {
    if(!delivery){
      return errorToast()
    }
    const newProduct = { ...product, delivery }
    dispatch(addProductAction(newProduct))
    setDelivery('')
    props.navigation.navigate('Payment')
  }

  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>Delivery</Text>
        <View style={style.subtitleContainer}>
          <Text style={style.subtitle}>Address details</Text>
          <Text style={style.change}>change</Text>
        </View>
        <View style={style.addressCard}>
          <Text style={style.address}>{userData.address ? userData.address : 'Iskandar Street'}</Text>
          <View style={style.border}></View>
          <Text style={style.phone}></Text>
          <View style={style.border}></View>
          <Text style={style.phone}>{userData.mobile_number}</Text>
        </View>
        <View style={style.subtitleContainer}>
          <Text style={style.subtitle}>Delivery methods</Text>
        </View>
        <View style={style.addressCard}>
          <Text style={style.delivery} onPress={() => setDelivery('delivery')}>
            <Fontisto name={delivery === 'delivery' ? 'radio-btn-active' : 'radio-btn-passive'} size={15} color={'#6A4029'} /> Door delivery
          </Text>
          <View style={style.border}></View>
          <Text style={style.delivery} onPress={() => setDelivery('pickup')}>
            <Fontisto name={delivery === 'pickup' ? 'radio-btn-active' : 'radio-btn-passive'} size={15} color={'#6A4029'} /> Pick up at store
          </Text>
          <View style={style.border}></View>
          <Text style={style.delivery} onPress={() => setDelivery('dinein')}>
            <Fontisto name={delivery === 'dinein' ? 'radio-btn-active' : 'radio-btn-passive'} size={15} color={'#6A4029'} /> Dine in
          </Text>
        </View>
        <View style={style.totalContainer}>
          <Text style={style.subtitle}>Total</Text>
          <Text style={style.subtitle}>{currencyFormatter.format(product.subtotal)}</Text>
        </View>
        <Pressable style={style.paymentBtn} onPress={proceedHandler}>
          <Text style={style.paymentTxt}>Proceed to payment</Text>
        </Pressable>
      </View>
    </>
  )
}