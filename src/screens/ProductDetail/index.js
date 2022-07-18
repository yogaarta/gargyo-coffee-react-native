import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
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
    getProductDetail()
  }, [props.route.params.id])

  const addCartHandler = () => {
    const newProduct = {...product, size}
    dispatch(addProductAction(newProduct))
    props.navigation.navigate("Cart")
  }

  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <Image source={product.picture ? { uri: product.picture } : require('../../assets/img/hazelnut.png')} style={style.img} />
        <Text style={style.name}>{product.name ? product.name : 'Cold Brew'}</Text>
        <Text style={style.price}>{product.price ? product.price : 'IDR 30.000'}</Text>
        <View>
          <Text style={style.descTitle}>Description</Text>
          <Text style={style.desc}>{product.description ? product.description : 'Description space'}</Text>
        </View>
        <View>
          <Text style={style.sizeTitle}>Choose a size</Text>
          <View style={style.sizeContainer}>
              <Text style={size === 'R'? style.sizeTextActive : style.sizeText} onPress={()=>setSize('R')}>R</Text>
              <Text style={size === 'L'? style.sizeTextActive : style.sizeText} onPress={()=>setSize('L')}>L</Text>
              <Text style={size === 'XL'? style.sizeTextActive : style.sizeText} onPress={()=>setSize('XL')}>XL</Text>
          </View>
        </View>
        <Pressable style={style.btnContainer} onPress={addCartHandler}>
          <Text style={style.btnText}>Add to cart</Text>
        </Pressable>
      </View>
    </>
  )
}