import { View, Text, TextInput, ScrollView, FlatList, ActivityIndicator } from 'react-native'
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
  const [loading, setLoading] = useState({
    all: false,
    coffee: false,
    nonCoffee: false,
    food: false,
    favorite: false
  })

  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const getNonCoffee = async () => {
    try {
      setLoading({ ...loading, nonCoffee: true })
      let URL = `${REACT_APP_BE_HOST}/products?category=noncoffee&limit=5`
      const response = await axios.get(URL)
      setNonCoffee(response.data.data)
      setLoading({ ...loading, nonCoffee: false })
    } catch (error) {
      console.log(error)
      setLoading({ ...loading, nonCoffee: false })
    }
  }
  const getCoffee = async () => {
    try {
      setLoading({ ...loading, coffee: true })
      let URL = `${REACT_APP_BE_HOST}/products?category=coffee&limit=5`
      const response = await axios.get(URL)
      setCoffee(response.data.data)
      setLoading({ ...loading, coffee: false })
    } catch (error) {
      console.log(error)
      setLoading({ ...loading, coffee: false })
    }
  }
  const getFood = async () => {
    try {
      setLoading({ ...loading, food: true })
      let URL = `${REACT_APP_BE_HOST}/products?category=coffee&limit=5`
      const response = await axios.get(URL)
      setFood(response.data.data)
      setLoading({ ...loading, food: false })
    } catch (error) {
      console.log(error)
      setLoading({ ...loading, food: false })
    }
  }

  const getProduct = async () => {
    try {
      setLoading({ ...loading, all: true })
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
      setLoading({ ...loading, all: false })
    } catch (error) {
      console.log(error)
      setLoading({ ...loading, all: false })
    }
  }

  useEffect(() => {
    getProduct()
    getCoffee()
    getNonCoffee()
    getFood()
  }, [menu])

  useEffect(() => {
    dispatch(getUserAction(userInfo.token))
  }, [])

  // console.log(product)
  return (
    <View>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>A good coffee is a good day</Text>
      </View>
      {/* <View style={style.searchContainer}>
        <IconIonicons name='search' size={20} color='#9F9F9F' />
        <TextInput style={style.searchInput} placeholder={'Search'} onChange={(e) => {
          // setTimeout(setSearch(e.nativeEvent.text), 3000)
          // setSearch(e.nativeEvent.text)
          // console.log(e.nativeEvent.text)
          // (setTimeout(()=> console.log(e.nativeEvent.text)), 2000)
        }} />
      </View>
      <ScrollView horizontal={true} style={style.scrollViewH} showsHorizontalScrollIndicator={false}>
        <Text style={menu === 'favorite' ? style.categoryTextAct : style.categoryText}
          onPress={() => setMenu('favorite')}
        >Favorite</Text>
        <Text style={menu === 'coffee' ? style.categoryTextAct : style.categoryText}
          onPress={() => setMenu('coffee')}
        >Coffee</Text>
        <Text style={menu === 'noncoffee' ? style.categoryTextAct : style.categoryText}
          onPress={() => setMenu('noncoffee')}
        >Non Coffee</Text>
        <Text style={menu === 'food' ? style.categoryTextAct : style.categoryText}
          onPress={() => setMenu('food')}
        >Food</Text>
        <Text style={menu === 'all' ? style.categoryTextAct : style.categoryText}
          onPress={() => setMenu('all')}
        >All</Text>
      </ScrollView> */}
      <ScrollView style={style.productContainer} showsHorizontalScrollIndicator={false}>
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Favorite Products</Text>
          <Text style={style.seeAll} 
          onPress={()=> props.navigation.navigate('AllProduct', {category: 'favorite'})}
          >See more</Text>
        </View>
        {loading.all ?
          <ActivityIndicator size={'large'} style={style.loading}/>
          :
          <FlatList horizontal={true} data={product} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Coffee</Text>
          <Text style={style.seeAll}
          onPress={()=> props.navigation.navigate('AllProduct', {category: 'coffee'})}
          >See more</Text>
        </View>
        {loading.coffee ?
          <ActivityIndicator size={'large'} style={style.loading}/>
          :
          <FlatList horizontal={true} data={coffee} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Non Coffee</Text>
          <Text style={style.seeAll}
          onPress={()=> props.navigation.navigate('AllProduct', {category: 'noncoffee'})}
          >See more</Text>
        </View>
        {loading.nonCoffee ?
          <ActivityIndicator size={'large'} style={style.loading}/>
          :
          <FlatList horizontal={true} data={nonCoffee} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={style.subtitleContainer}>
          <Text style={style.categoryTitle}>Food</Text>
          <Text style={style.seeAll}
          onPress={()=> props.navigation.navigate('AllProduct', {category: 'food'})}
          >See more</Text>
        </View>
        {loading.food ?
          <ActivityIndicator size={'large'} style={style.loading}/>
          :
          <FlatList horizontal={true} data={food} renderItem={({ item, idx }) => (
            <ProductCard key={idx} id={item.id} name={item.name} picture={item.picture} price={item.price} {...props} />
          )} />
        }
        <View style={{height: 200}}></View>
      </ScrollView>
    </View>
  )
}