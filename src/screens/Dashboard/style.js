import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
  },
  card: {
    backgroundColor: '#ffffff',
    // marginHorizontal: '5%',
    marginVertical: 10,
    paddingHorizontal: '5%',
    paddingVertical: 10,
    borderRadius: 10
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 22
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 16
  },
  chart: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    height: 150
  },
  chartColLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5
  },
  chartCol: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  chartTxt: {
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    // height: 30,
    color: '#7C828A',
    textAlign: 'center',
    flex: 1
  },
  incomeBarContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  incomeBar: {
    height: '50%',
    width: 10,
    backgroundColor: '#FFBA33',
    borderRadius: 10
  },
  outcomeBarContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  outcomeBar: {
    height: '50%',
    width: 10,
    backgroundColor: '#6A4029',
    borderRadius: 10
  },
  dailyBarContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title2: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 22,
    textAlign: 'center'
  },
  subtitle2: {
    fontFamily: 'Poppins-Regular',
    color: '#7C828A',
    textAlign: 'center',
    fontSize: 16
  },
  circle: {
    marginVertical: 20,
    borderWidth: 20,
    borderColor: '#FFBA33',
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  percent: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#000000'
  },
  btn: {
    marginVertical: 20,
    height: 50,
    width: '50%',
    backgroundColor: '#6A4029',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10
  },
  btnTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#ffffff'
  }
})