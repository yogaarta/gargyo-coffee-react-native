import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  defaultContainer: {
    width: 175,
    height: 175,
    borderRadius: 150,
    backgroundColor: '#dbdbdb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 175,
    height: 175,
    borderRadius: 150,
    // backgroundColor: '#dbdbdb',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  plusContainer: {
    position: 'absolute',
    backgroundColor: '#6A4029',
    width: 40,
    height: 40,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '75%',
    left: '65%'
  },
  plus: {
    color: '#ffffff',
  },
  inputContainer:{
    marginHorizontal: '5%',
    marginVertical: 10
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#000000'
  },
  input: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#000000',
    padding: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#9f9f9f'
  },
  categoryContainer: {
    marginVertical: 10,
    marginHorizontal: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryBtn: {
    backgroundColor: '#dbdbdb',
    height: 35,
    // width: '28%',
    paddingHorizontal: 10,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryBtnAct: {
    backgroundColor: '#FFBA33',
    height: 35,
    // width: '28%',
    paddingHorizontal: 10,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#9a9a9a'
  },
  categoryTxtAct: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#6A4029'
  },
  saveBtn:{
    marginVertical: 20,
    marginHorizontal: '5%',
    width: '60%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#6A4029',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#ffffff'
  }
})