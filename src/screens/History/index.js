import { View, Text, Image, Pressable, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { REACT_APP_BE_HOST } from '@env'
import { currencyFormatter } from '../../helpers/formatter'
import Header from '../../components/Header'
import style from './style'
import axios from 'axios'

export default function History(props) {
  const [isDelete, setIsDelete] = useState(false)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)


  const { userInfo } = useSelector(state => state.auth)

  const getHistory = async () => {
    try {
      setLoading(true)
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      const response = await axios.get(`${REACT_APP_BE_HOST}/transactions`, config)
      setHistory(response.data.data)
      console.log('SUCCESS')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getHistory()
  }, [])
  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>Order History</Text>
        <View style={{marginBottom: 200}}>
          {loading ?
            <ActivityIndicator size={'large'} style={style.loading} />
            :
            <FlatList data={history} renderItem={({ item, idx }) => (
              <Pressable style={isDelete ? style.cardSelect : style.card} onLongPress={() => setIsDelete(!isDelete)}>
                <Image source={item.picture ? { uri: item.picture } : require('../../assets/img/hazelnut.png')} style={style.img} />
                <View style={style.info}>
                  <Text style={style.name}>{item.name}</Text>
                  <Text style={style.price}>{currencyFormatter.format(item.total_price)}</Text>
                  <Text style={style.status}>Success</Text>
                </View>
              </Pressable>
            )} />
          }
        </View>
        {/* <Pressable style={isDelete ? style.cardSelect : style.card} onLongPress={() => setIsDelete(!isDelete)}>
          <Image source={require('../../assets/img/hazelnut.png')} style={style.img} />
          <View style={style.info}>
            <Text style={style.name}>Hazelnut Latte</Text>
            <Text style={style.price}>IDR 34.000</Text>
            <Text style={style.status}>Waiting for delivery [will arrive at 3 PM]</Text>
          </View>
        </Pressable> */}
      </View>
    </>
  )
}