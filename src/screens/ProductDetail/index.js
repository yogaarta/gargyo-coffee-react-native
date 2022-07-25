import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { REACT_APP_BE_HOST } from '@env'
import Header from '../../components/Header'
import style from './style'
import { currencyFormatter } from '../../helpers/formatter'
import { addProductAction } from '../../redux/actionCreators/cart'

export default function ProductDetail(props) {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [size, setSize] = useState('')
  console.log(props.route.params.id)
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  const getProductDetail = async () => {
    try {
      setLoading(true)
      console.log('loading')
      const id = props.route.params.id
      const response = await axios.get(`${REACT_APP_BE_HOST}/products/${id}`)
      console.log(response.data.data)
      setProduct(response.data.data[0])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    setSize('')
    getProductDetail()
  }, [props.route.params.id, props.route.params.edited])

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Please input product size!'
    })
  }

  const addCartHandler = () => {
    if (!size) {
      return errorToast()
    }
    const newProduct = { ...product, size }
    dispatch(addProductAction(newProduct))
    props.navigation.navigate("Cart")
  }

  // console.log(REACT_APP_BE_HOST)
  return (
    <>
      <Header {...props} />
      {loading ?
        <ActivityIndicator size={50} style={{ flex: 1 }} />
        :
        <View style={style.container}>
          <Image source={product.picture ? { uri: product.picture } : require('../../assets/img/hazelnut.png')} style={style.img} />
          <Text style={style.name}>{product.name ? product.name : 'Cold Brew'}</Text>
          <Text style={style.price}>{product.price ? currencyFormatter.format(product.price) : 'IDR 30.000'}</Text>
          <View>
            <Text style={style.descTitle}>Description</Text>
            <Text style={style.desc}>{product.description ? product.description : 'Description space'}</Text>
          </View>
          <View>
            <Text style={style.sizeTitle}>Choose a size</Text>
            <View style={style.sizeContainer}>
              <Text style={size === 'R' ? style.sizeTextActive : style.sizeText} onPress={() => setSize('R')}>R</Text>
              <Text style={size === 'L' ? style.sizeTextActive : style.sizeText} onPress={() => setSize('L')}>L</Text>
              <Text style={size === 'XL' ? style.sizeTextActive : style.sizeText} onPress={() => setSize('XL')}>XL</Text>
            </View>
          </View>
          {userData.roles === 'admin' ?
            <Pressable style={style.btnContainer} onPress={() => props.navigation.navigate('EditProduct', { id: props.route.params.id })}>
              <Text style={style.btnText}>Edit Product</Text>
            </Pressable>
            :
            <Pressable style={style.btnContainer} onPress={addCartHandler}>
              <Text style={style.btnText}>Add to cart</Text>
            </Pressable>
          }
        </View>
      }
    </>
  )
}