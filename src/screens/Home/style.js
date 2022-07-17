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
    justifyContent: 'space-between',
    width: 800,
  },
})