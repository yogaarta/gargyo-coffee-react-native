import { View, Text, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { REACT_APP_BE_HOST } from '@env'
import axios from 'axios'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import style from './style'
import { currencyFormatter } from '../../helpers/formatter'
import { addProductAction } from '../../redux/actionCreators/cart'
import PromoCard from '../../components/PromoCard'

export default function Cart(props) {
  const [quantity, setQuantity] = useState(1)
  const [promo, setPromo] = useState({})
  const [allPromo, setAllPromo] = useState([])
  const [page, setPage] = useState('cart')

  const { product } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const getPromo = async () => {
    try {
      const result = await axios.get(`${REACT_APP_BE_HOST}/promos/today`)
      setAllPromo(result.data.data)
      console.log(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPromo()
  }, [])

  const itemTotal = product.price * quantity
  const delivery = 0
  const tax = 10000
  const discount = promo.discount ? itemTotal * promo.discount / 100 : 0
  const subtotal = itemTotal + delivery + tax - discount

  const checkoutHandler = () => {
    const newProduct = { ...product, subtotal, promo, quantity }
    dispatch(addProductAction(newProduct))
    setQuantity(1)
    setPromo({})
    props.navigation.navigate('Delivery')
  }
  return (
    <>
      <Header {...props} />
      {!product.name ?
        <View style={style.container}>
          <Ionicons name='cart-outline' size={300} style={{ textAlign: 'center' }} color={'#C7C7C7'} />
          <Text style={style.title}>Your Cart is Empty</Text>
          <Pressable style={style.orderBtn} onPress={() => props.navigation.navigate('AllProduct', { category: 'all' })}>
            <Text style={style.orderTxt}>Start Ordering</Text>
          </Pressable>
        </View>
        :
        page === 'cart' ?
          <View style={style.container}>
            <View style={style.cartContainer}>
              <View style={style.cardProduct}>
                <Image source={product.picture ? { uri: product.picture } : require('../../assets/img/hazelnut.png')} style={style.img} />
                <Text style={style.price}>{currencyFormatter.format(product.price)}</Text>
              </View>
              <View style={style.rightCart}>
                <Text style={style.name}>{product.name}</Text>
                <View style={style.quantityContainer}>
                  <Text style={style.counter} onPress={() => setQuantity(quantity === 1 ? quantity : quantity - 1)}>-</Text>
                  <Text style={style.quantity}>{quantity}</Text>
                  <Text style={style.counter} onPress={() => setQuantity(quantity + 1)}>+</Text>
                </View>
              </View>
            </View>

            {promo.id ?
              <>
                <Pressable style={style.promoCard} onPress={()=> setPromo({})}>
                  <Image source={promo.picture ? { uri: promo.picture } : require('../../assets/img/hazelnut.png')} style={style.img} />
                  <View style={style.txtContainer}>
                    <Text style={style.pname}>{promo.code}</Text>
                    <View style={style.btmTxt}>
                      <View>
                        <Text style={style.date}>{`valid until`}</Text>
                        <Text style={style.date}>{moment(promo.end_date).format('MMM Do YY')}</Text>
                      </View>
                      <Text style={style.discount}>{`${promo.discount}%`}</Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable style={style.couponBtn} onPress={() => setPage('coupon')}>
                  <Text style={style.couponText}>
                    Change Coupons
                  </Text>
                </Pressable>
              </>
              :
              <Pressable style={style.couponBtn} onPress={() => setPage('coupon')}>
                <Text style={style.couponText}>
                  Choose Coupons
                </Text>
              </Pressable>
            }

            <View style={style.infoContainer}>
              <View style={style.infoRow}>
                <Text style={style.infoLeft}>Item Total</Text>
                <Text style={style.infoRight}>{currencyFormatter.format(itemTotal)}</Text>
              </View>
              <View style={style.infoRow}>
                <Text style={style.infoLeft}>Delivery Charge</Text>
                <Text style={style.infoRight}>{currencyFormatter.format(delivery)}</Text>
              </View>
              <View style={style.infoRow}>
                <Text style={style.infoLeft}>Discount</Text>
                <Text style={style.infoRight}>{currencyFormatter.format(discount)}</Text>
              </View>
              <View style={style.infoRow}>
                <Text style={style.infoLeft}>Tax</Text>
                <Text style={style.infoRight}>{currencyFormatter.format(tax)}</Text>
              </View>
            </View>
            <View style={style.totalRow}>
              <Text style={style.total}>Total :</Text>
              <Text style={style.total}>{currencyFormatter.format(subtotal)}</Text>
            </View>
            <Pressable style={style.checkoutBtn} onPress={checkoutHandler}>
              <Text style={style.checkoutText}>
                CHECKOUT
              </Text>
            </Pressable>
          </View>
          :
          <View style={style.container}>
            <FlatList data={allPromo} renderItem={({ item, idx }) => (
              <PromoCard key={idx} code={item.code} picture={item.picture} discount={item.discount} id={item.id} end_date={item.end_date} idx={idx} promo={promo} setPromo={setPromo} />
            )} />
            <Pressable style={style.couponBtn} onPress={() => setPage('cart')}>
              <Text style={style.couponText}>
                Apply Coupons
              </Text>
            </Pressable>
          </View>
      }
    </>
  )
}