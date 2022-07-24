import { View, Text, TextInput, ScrollView, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { REACT_APP_BE_HOST } from '@env'
import Toast from 'react-native-toast-message'
import style from './style'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import { getUserAction } from '../../redux/actionCreators/user'

export default function Home(props) {
  const [menu, setMenu] = useState('favorite')
  const [search, setSearch] = useState('')
  const [product, setProduct] = useState([])
  const [coffee, setCoffee] = useState([])
  const [nonCoffee, setNonCoffee] = useState([])
  const [food, setFood] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingCoffee, setLoadingCoffee] = useState(false)
  const [loadingNonCoffee, setLoadingNonCoffee] = useState(false)
  const [loadingFood, setLoadingFood] = useState(false)

  const { userInfo } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const getNonCoffee = async () => {
    try {
      setLoadingNonCoffee(true)
      let URL = `${REACT_APP_BE_HOST}/products?category=noncoffee&limit=5`
      const response = await axios.get(URL)
      setNonCoffee(response.data.data)
      setLoadingNonCoffee(false)
    } catch (error) {
      console.log(error)
      setLoadingNonCoffee(false)
    }
  }
  const getCoffee = async () => {
    try {
      setLoadingCoffee(true)
      let URL = `${REACT_APP_BE_HOST}/products?category=coffee&limit=5`
      const response = await axios.get(URL)
      setCoffee(response.data.data)
      setLoadingCoffee(false)
    } catch (error) {
      console.log(error)
      setLoadingCoffee(false)
    }
  }
  const getFood = async () => {
    try {
      setLoadingFood(true)
      let URL = `${REACT_APP_BE_HOST}/products?category=food&limit=5`
      const response = await axios.get(URL)
      setFood(response.data.data)
      setLoadingFood(false)
    } catch (error) {
      console.log(error)
      setLoadingFood(false)
    }
  }

  const getProduct = async () => {
    try {
      setLoading(true)
      let URL = `${REACT_APP_BE_HOST}/products`
      if (menu === 'favorite') {
        URL += '/favorite'
      }
      if (menu !== 'favorite') {
        URL += `?limit=5`
      }
      if (search !== '') {
        URL += `&name=${search}`
      }
      if (menu !== 'favorite' && menu !== 'all') {
        URL += `&category=${menu}`
      }
      const response = await axios.get(URL)
      setProduct(response.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct()
    getCoffee()
    getNonCoffee()
    getFood()
  }, [menu])

  useEffect(() => {
    if (userInfo.token) {
      dispatch(getUserAction(userInfo.token))
    }
  }, [])

  return (
    <View>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>A good coffee is a good day</Text>
      </View>

      <ScrollView style={style.productContainer} showsHorizontalScrollIndicator={false}>
        {userData.roles === 'admin' ?
          <View style={style.adminContainer}>
            <Pressable style={style.adminBtn} onPress={()=> props.navigation.navigate("NewProduct")}>
              <Text style={style.adminTxt}>New Product</Text>
            </Pressable>
            <Pressable style={style.adminBtn} onPress={()=> props.navigation.navigate("NewPromo")}>
              <Text style={style.adminTxt}>New Promo</Text>
            </Pressable>
          </View>
          : <></>}
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Favorite Products</Text>
          <Text style={style.seeAll}
            onPress={() => props.navigation.navigate('AllProduct', { category: 'favorite' })}
          >See more</Text>
        </View>
        {loading ?
          <ActivityIndicator size={'large'} style={style.loading} />
          :
          <FlatList horizontal={true} data={product} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Coffee</Text>
          <Text style={style.seeAll}
            onPress={() => props.navigation.navigate('AllProduct', { category: 'coffee' })}
          >See more</Text>
        </View>
        {loadingCoffee ?
          <ActivityIndicator size={'large'} style={style.loading} />
          :
          <FlatList horizontal={true} data={coffee} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Non Coffee</Text>
          <Text style={style.seeAll}
            onPress={() => props.navigation.navigate('AllProduct', { category: 'noncoffee' })}
          >See more</Text>
        </View>
        {loadingNonCoffee ?
          <ActivityIndicator size={'large'} style={style.loading} />
          :
          <FlatList horizontal={true} data={nonCoffee} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Food</Text>
          <Text style={style.seeAll}
            onPress={() => props.navigation.navigate('AllProduct', { category: 'food' })}
          >See more</Text>
        </View>
        {loadingFood ?
          <ActivityIndicator size={'large'} style={style.loading} />
          :
          <FlatList horizontal={true} data={food} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={{ height: 200 }}></View>
      </ScrollView>

    </View>
  )
}