import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { REACT_APP_BE_HOST } from '@env'
import style from './style'
import moment from 'moment'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Dashboard(props) {
  const [daily, setDaily] = useState([])
  const [loading, setLoading] = useState(false)

  const { userInfo } = useSelector(state => state.auth)

  const getDaily = async () => {
    try {
      setLoading(true)
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
      const result = await axios.get(`${REACT_APP_BE_HOST}/transactions/daily`, config)
      console.log(result.data.data)
      setDaily(result.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }
  }
  useEffect(() => {
    getDaily()
  }, [])

  let heighResult = daily.length > 0 && daily.map(daily => daily.revenue / 1000000 * 100)
  // console.log(heighResult)
  return (
    <>
      <Header {...props} />
      <ScrollView style={style.container}>
        <View style={style.card}>
          <Text style={style.title}>Monthly Report</Text>
          <Text style={style.subtitle}>Last 6 months</Text>
          <View style={style.chart}>
            <View style={style.chartColLeft}>
              <Text style={style.chartTxt}>IDR 1M</Text>
              <Text style={style.chartTxt}>IDR 0.5M</Text>
              <Text style={style.chartTxt}>IDR 0</Text>
              <Text style={style.chartTxt}>IDR 1M</Text>
              <Text style={style.chartTxt}></Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '50%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '50%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>Jan</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '90%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '60%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>Feb</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '60%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '80%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>Mar</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '80%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '50%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>Apr</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '40%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '50%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>May</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '50%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '70%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>Jun</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.incomeBarContainer}>
                <View style={{
                  height: '80%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <View style={style.outcomeBarContainer}>
                <View style={{
                  height: '80%',
                  width: 10,
                  backgroundColor: '#6A4029',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>Jul</Text>
            </View>
          </View>
        </View>
        <View style={style.card}>
          <Text style={style.title}>Daily Report</Text>
          <Text style={style.subtitle}>Daily average</Text>
          <View style={style.chart}>
            <View style={style.chartColLeft}>
              <Text style={style.chartTxt}>IDR 1.5M</Text>
              <Text style={style.chartTxt}>IDR 1M</Text>
              <Text style={style.chartTxt}>IDR 0.5M</Text>
              <Text style={style.chartTxt}>IDR 0</Text>
              <Text style={style.chartTxt}></Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[6] ? `${heighResult[6]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().subtract(6, 'days').format('dd')}</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[5] ? `${heighResult[5]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().subtract(5, 'days').format('dd')}</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[4] ? `${heighResult[4]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().subtract(4, 'days').format('dd')}</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[3] ? `${heighResult[3]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().subtract(3, 'days').format('dd')}</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[2] ? `${heighResult[2]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().subtract(2, 'days').format('dd')}</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[1] ? `${heighResult[1]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().subtract(1, 'days').format('dd')}</Text>
            </View>
            <View style={style.chartCol}>
              <View style={style.dailyBarContainer}>
                <View style={{
                  height: heighResult[0] ? `${heighResult[0]}%` : '0%',
                  width: 10,
                  backgroundColor: '#FFBA33',
                  borderRadius: 10
                }}></View>
              </View>
              <Text style={style.chartTxt}>{moment().format('dd')}</Text>
            </View>
          </View>
        </View>
        <View style={style.card}>
          <Text style={style.title2}>Goals</Text>
          <Text style={style.subtitle2}>Your goals is still on 76%. Keep up the good work!</Text>
          <View style={style.circle}>
            <Text style={style.percent}>76%</Text>
          </View>
        </View>
        <View style={style.btn}>
          <Text style={style.btnTxt}>Print Report</Text>
        </View>
      </ScrollView>
    </>
  )
}