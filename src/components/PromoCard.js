import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import style from '../screens/Cart/style'
import moment from 'moment'

export default function PromoCard({ key, picture, id, code, discount, end_date, idx, promo, setPromo }) {
  return (
    <Pressable style={promo.id === id ? style.promoCard2 : style.promoCard} onPress={() => {
      setPromo({
        picture, id, code, discount, end_date
      })
    }}>
      <Image source={picture ? { uri: picture } : require('../assets/img/hazelnut.png')} style={style.img} />
      <View style={style.txtContainer}>
        <Text style={style.pname}>{code}</Text>
        <View style={style.btmTxt}>
          <View>
            <Text style={style.date}>{`valid until`}</Text>
            <Text style={style.date}>{moment(end_date).format('MMM Do YY')}</Text>
          </View>
          <Text style={style.discount}>{`${discount}%`}</Text>
        </View>
      </View>
    </Pressable>
  )
}