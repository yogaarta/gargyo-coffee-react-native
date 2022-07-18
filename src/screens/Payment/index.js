import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { REACT_APP_BE_HOST } from '@env'
import style from './style'
import Octicons from 'react-native-vector-icons/Octicons'
import Header from '../../components/Header'
import { currencyFormatter } from '../../helpers/formatter'
import axios from 'axios'

export default function Payment(props) {
  const [payment, setPayment] = useState('')
  const [loading, setLoading] = useState(false)
  const { product } = useSelector(state => state.cart)
  const { token } = useSelector(state => state.auth.userInfo)
  const { id } = useSelector(state => state.user.userData)

  const paymentHandler = async () => {
    try {
      setLoading(true)
      const body = {
        product_id: product.id,
        total_price: product.subtotal,
        quantity: product.quantity,
        user_id: id,
        payment_method: payment,
        delivery_method: product.delivery,
        promo_id: product.promo
      }
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(`${REACT_APP_BE_HOST}/transactions`, body, config)
      console.log(response)
      console.log('SUCCESS')
      setLoading(false)
    } catch (error) {
      console.log(error)
      console.log('ERROR')
      setLoading(false)
    }
  }
  const dispatch = useDispatch()
  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <View style={style.subtitleContainer}>
          <Text style={style.subtitle}>Products</Text>
        </View>
        <View style={style.card}>
          <Image source={product.picture ? { uri: product.picture } : require('../../assets/img/hazelnut.png')} style={style.img} />
          <View style={style.productInfo}>
            <Text style={style.item}>{product.name ? product.name : 'Hazelnut Latte'}</Text>
            <Text style={style.item}>{`x${product.quantity}`}</Text>
            <Text style={style.item}>{product.size === 'R' ? 'Regular' : product.size === 'L' ? 'Large' : 'Extra Large'}</Text>
          </View>
          <Text style={style.price}>{currencyFormatter.format(product.subtotal)}</Text>
        </View>
        <View style={style.subtitleContainer}>
          <Text style={style.subtitle}>Payment method</Text>
        </View>
        <View style={style.methodCard}>
          <Text style={style.delivery} onPress={() => setPayment('card')}>
            <Octicons name={payment === 'card' ? 'dot-fill' : 'dot'} size={15} color={'#6A4029'} /> Card
          </Text>
          <View style={style.border}></View>
          <Text style={style.delivery} onPress={() => setPayment('bank')}>
            <Octicons name={payment === 'bank' ? 'dot-fill' : 'dot'} size={15} color={'#6A4029'} /> Bank account
          </Text>
          <View style={style.border}></View>
          <Text style={style.delivery} onPress={() => setPayment('cod')}>
            <Octicons name={payment === 'cod' ? 'dot-fill' : 'dot'} size={15} color={'#6A4029'} /> Cash on delivery
          </Text>
        </View>
        <View style={style.totalContainer}>
          <Text style={style.subtitle}>Total</Text>
          <Text style={style.subtitle}>{currencyFormatter.format(product.subtotal)}</Text>
        </View>
        <Pressable style={style.paymentBtn} onPress={paymentHandler}>
          <Text style={style.paymentTxt}>Proceed payment</Text>
        </Pressable>
      </View>
    </>
  )
}