import { View, Text, Image, Pressable, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { REACT_APP_BE_HOST } from '@env'
import { currencyFormatter } from '../../helpers/formatter'
import Header from '../../components/Header'
import style from './style'
import axios from 'axios'

export default function History(props) {
  const [isDelete, setIsDelete] = useState(false)
  const [history, setHistory] = useState([])
  const [historyId, setHistoryId] = useState([])
  const [loading, setLoading] = useState(false)
  // const [msg, setMsg] = useState(props.route.params.msg)


  const { userInfo } = useSelector(state => state.auth)
  // console.log(REACT_APP_BE_HOST)
  const getHistory = async () => {
    try {
      setLoading(true)
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      const response = await axios.get(`${REACT_APP_BE_HOST}/transactions`, config)
      setHistory(response.data.data)
      // setMsg('Success')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Delete Success'
    })
  }
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Please Check Your Connection'
    })
  }

  const deleteHandler = async () => {
    try {
      setLoading(true)
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      const body = { id: historyId }
      // console.log(body)
      const result = await axios.patch(`${REACT_APP_BE_HOST}/transactions/user`, body, config)
      console.log(result.data)
      console.log('DELETE SUCCESS')
      setIsDelete(false)
      successToast()
      setLoading(false)
      getHistory()
    } catch (error) {
      console.log(error)
      errorToast()
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getHistory()
  }, [])

  // console.log(historyId)
  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Order History</Text>
          {isDelete ?
            <Text style={style.subtitle} onPress={() => {
              setIsDelete(false)
              setHistoryId([])
            }}> Cancel</Text>
            :
            <></>
          }
        </View>
        {isDelete ?
          <Pressable style={style.deleteBtn} onPress={deleteHandler}>
            <Text style={style.deleteTxt}>Delete</Text>
          </Pressable>
          :
          <View style={style.deleteContainer}>
            <Text style={style.subtitle}>Long Press to Delete</Text>
          </View>
        }
        <View style={{ marginBottom: 260, marginTop: 10 }}>
          {loading ?
            <ActivityIndicator size={'large'} style={style.loading} />
            :
            history.length === 0 ?
            <Text style={style.loading}>You dont have any transaction history</Text>
            :
            <FlatList data={history} renderItem={({ item, idx }) => (
              <Pressable style={historyId.includes(item.id) ? style.cardSelect : style.card}
                onLongPress={() => {
                  if (!isDelete) {
                    setIsDelete(true)
                    let newHistoryId = [...historyId]
                    newHistoryId.push(item.id)
                    setHistoryId(newHistoryId)
                  }
                }}
                onPress={() => {
                  if (isDelete) {
                    let newHistoryId = [...historyId]
                    if (!historyId.includes(item.id)) {
                      newHistoryId.push(item.id)
                      setHistoryId(newHistoryId)
                    }
                    if (historyId.includes(item.id)) {
                      // console.log(newHistoryId.includes(item.id))
                      // newHistoryId = historyId.filter(item => item !== item.id)
                      setHistoryId(newHistoryId.filter(val => val !== item.id))
                      // console.log(newHistoryId)
                    }
                  }
                }}>
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