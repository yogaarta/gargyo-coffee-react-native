import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    paddingHorizontal: '5%'
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    color: '#000000'
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginVertical: 20
  },
  categoryTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: '#6A4029'
  },
  loading: {
    marginVertical: 30
  },
  seeAll: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#6A4029'
  },
  searchContainer: {
    display: 'flex',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEEEE',
    marginHorizontal: '20%',
    borderRadius: 100,
    paddingHorizontal: 15,
    // paddingVertical: 5
  },
  searchInput:{
    paddingVertical: 5,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '100%',
    textAlignVertical: 'auto'
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    width: 800,
  },
  scrollViewH:{
    marginHorizontal: '5%',
    // marginVertical: 10
  },
  categoryText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#9A9A9D',
    marginRight: 20
  },
  categoryTextAct: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#6A4029',
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#6A4029'
  },
  productContainer: {
    // marginVertical: 10,
    marginHorizontal: '5%',
    // paddingBottom: 500
  },
  adminContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%'
  },
  adminBtn:{
    backgroundColor: '#6A4029',
    width: '45%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  adminTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffffff'
  }
})