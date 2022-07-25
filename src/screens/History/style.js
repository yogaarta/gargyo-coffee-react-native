import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container:{
    paddingHorizontal: '5%',
    paddingVertical: 20,
    paddingBottom: 20
  },
  titleContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    color: '#000000'
  },
  subtitle:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#895537',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#ffffff',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 4,
    borderColor: '#ffffff'
  },
  cardSelect: {
    backgroundColor: '#ffffff',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 4,
    borderColor: '#895537'
  },
  deleteBtn: {
    backgroundColor: '#6A4029',
    width: '50%',
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteContainer: {
    // backgroundColor: '#6A4029',
    width: '50%',
    height: 40,
    borderRadius: 10,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center'
  },
  loading: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#000000',
    marginTop: 100
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  info: {
    marginLeft: 20,
    flexShrink: 1
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#000000'
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#895537'
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6A4029'
  },
})
  
  