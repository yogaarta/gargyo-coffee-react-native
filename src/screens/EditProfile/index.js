import { View, Text, Image, TextInput, Pressable, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import { REACT_APP_BE_HOST } from '@env'
import Toast from 'react-native-toast-message'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Header from '../../components/Header'
import style from './style'
import moment from 'moment'
import axios from 'axios'
import { getUserAction } from '../../redux/actionCreators/user'


const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function EditProfile(props) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [gender, setGender] = useState('')
  const [show, setShow] = useState(false)
  const [data, setData] = useState({})
  // const [body, setBody] = useState({...userData})
  const [body, setBody] = useState({
    display_name: '',
    email: '',
    gender: '',
    profile_picture: null,
    mobile_number: '',
    address: '',
    birthday: '',
  })
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    setBody(userData)
  }, [])


  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Update Success'
    })
  }
  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Update failed'
    })
  }

  // image Picker start
  const chooseImage = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     const source = { uri: response.uri };

    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     // alert(JSON.stringify(response));
    //     console.log('response', JSON.stringify(response));
    //     setData({
    //       filePath: response,
    //       fileData: response.data,
    //       fileUri: response.uri
    //     });
    //   }
    // });
    try {
      setShow(false)
      const result = await launchImageLibrary(options)
      setData({
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
        height: result.assets[0].height,
        width: result.assets[0].width
      })
      console.log(result.assets[0])
    } catch (error) {
      console.log(error)
    }
  }

  const useCamera = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    try {
      setShow(false)
      const result = await launchCamera(options)
      setData({
        name: result.assets[0].fileName,
        size: result.assets[0].fileSize,
        type: result.assets[0].type,
        uri: result.assets[0].uri,
        height: result.assets[0].height,
        width: result.assets[0].width
      })
      console.log(result.assets[0])
    } catch (error) {
      console.log(error)
    }
  }

  // function renderFileData() {
  //   if (data.base64) {
  //     return <Image source={{ uri: 'data:image/jpeg;base64,' + data.base64}}
  //       style={style.profpict}
  //     />
  //   } else {
  //     return <Image source={require('../../assets/img/profpict.png')}
  //       style={style.profpict}
  //     />
  //   }
  // }

  function renderFileUri() {
    if (data.uri) {
      return <Image
        source={{ uri: data.uri }}
        style={style.profpict}
      />
    } else {
      return <Image
        source={require('../../assets/img/profpict.png')}
        style={style.profpict}
      />
    }
  }
  // image picker end

  const updateHandler = async () => {
    try {
      setLoading(true)
      const { mobile_number, display_name, address, birthday, gender, profile_picture, email } = body
      let newBody = new FormData()
      newBody.append('profile_picture', data);
      newBody.append('mobile_number', mobile_number);
      newBody.append('email', email);
      newBody.append('display_name', display_name);
      newBody.append('address', address);
      newBody.append('birthday', birthday);
      newBody.append('gender', gender);

      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "content-type": "multipart/form-data" } }
      const response = await axios.patch(`${REACT_APP_BE_HOST}/users`, newBody, config)
      // console.log(response)
      dispatch(getUserAction(userInfo.token))
      console.log('SUCCESS')
      setIsSuccess(true)
      successToast()
      setLoading(false)
      props.navigation.navigate('Profile')
    } catch (error) {
      console.log('FAILED')
      errorToast()
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(getUserAction(userInfo.token))
    }
  }, [isSuccess])
  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>Edit Profile</Text>
        <View style={style.imgContainer}>
          {/* {renderFileData()} */}
          {/* {renderFileUri()} */}
          <Image source={data.uri ? { uri: data.uri } : body.profile_picture ? { uri: body.profile_picture } : require('../../assets/img/profpict.png')} style={style.profpict} />
          <Pressable style={style.pencilContainer} onPress={() => setShow(true)}>
            <SimpleLineIcons name='pencil' size={20} color={'#ffffff'} style={style.pencil} />
          </Pressable>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Name :</Text>
          <TextInput placeholder='Input Your Name' style={style.input} value={body.display_name} onChange={(e) => setBody({ ...body, display_name: e.nativeEvent.text })} />
          <View style={style.border}></View>
        </View>
        <View style={style.genderContainer}>
          <Text style={body.gender === 'female' ? style.genderActive : style.gender} onPress={() => setBody({ ...body, gender: 'female' })}>
            <Fontisto name={body.gender === 'female' ? 'radio-btn-active' : 'radio-btn-passive'} style={style.radio} />
            Female
          </Text>
          <Text style={body.gender === 'male' ? style.genderActive : style.gender} onPress={() => setBody({ ...body, gender: 'male' })}>
            <Fontisto name={body.gender === 'male' ? 'radio-btn-active' : 'radio-btn-passive'} style={style.radio} />
            Male
          </Text>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Email Adress :</Text>
          <TextInput placeholder='Input Your Email' style={style.input} value={body.email} editable={false} />
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Phone Number :</Text>
          <TextInput placeholder='Input Your Phone Number' style={style.input} value={body.mobile_number} onChange={(e) => setBody({ ...body, mobile_number: e.nativeEvent.text })} keyboardType={'number-pad'} />
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Date of Birth</Text>
          <View style={style.dateInput}>
            <TextInput placeholder='Input Your Date of Birth' style={style.input} value={body.birthday} />
            <FontAwesome name='calendar' size={20} onPress={() => setOpen(true)} />
            <DatePicker modal open={open} date={body.birthday ? new Date(body.birthday) : new Date()} mode='date'
              onConfirm={date => {
                setOpen(false)
                // console.log(moment(date).format('YYYY-MM-DD'))
                setBody({ ...body, birthday: moment(date).format('YYYY-MM-DD') })
              }}
              onCancel={() => setOpen(false)} />
          </View>
          <View style={style.border}></View>
        </View>
        <View style={style.inputContainer}>
          <Text style={style.label}>Delivery Address :</Text>
          <TextInput placeholder='Input Your Address' style={style.input} value={body.address} onChange={(e) => setBody({ ...body, address: e.nativeEvent.text })} />
          <View style={style.border}></View>
        </View>
        {loading ?
          <Pressable style={style.saveBtn}>
            <ActivityIndicator />
          </Pressable>
          :
          <Pressable style={style.saveBtn} onPress={updateHandler}>
            <Text style={style.saveTxt}>
              Save and Update
            </Text>
          </Pressable>
        }
      </View>
      <Modal visible={show} transparent={true}>
        <Pressable style={{ backgroundColor: '#000000', flex: 1, opacity: 0.5 }} onPress={() => setShow(false)}>
        </Pressable>
        <View style={{
          backgroundColor: '#ffffff',
          paddingVertical: 20,
          paddingHorizontal: '10%',
          position: 'relative',
          // top: '30%', left: '20%', 
          height: '18%', width: '100%',
          display: 'flex', flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between', 
          borderRadius: 10
        }}>
          <Pressable style={{
            backgroundColor: '#FFBA33',
            width: '30%',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', borderRadius: 10
          }} onPress={chooseImage}>
            <FontAwesome name='photo' size={30} color={'#ffffff'} />
          </Pressable>
          <Pressable style={{
            backgroundColor: '#6A4029',
            width: '30%',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', borderRadius: 10
          }} onPress={useCamera}>
            <FontAwesome name='camera' size={30} color={'#ffffff'} />
          </Pressable>
        </View>
      </Modal>
      <Toast />
    </>
  )
}