import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import { REACT_APP_BE_HOST } from '@env'
import Toast from 'react-native-toast-message'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker';
import Header from '../../components/Header'
import style from './style'
import moment from 'moment'
import axios from 'axios'


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
  const [gender, setGender] = useState('')
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

  // image Picker start
  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        setData({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  // renderFileData() {
  //   if (this.state.fileData) {
  //     return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
  //       style={styles.images}
  //     />
  //   } else {
  //     return <Image source={require('./assets/dummy.png')}
  //       style={styles.images}
  //     />
  //   }
  // }

  // renderFileUri() {
  //   if (this.state.fileUri) {
  //     return <Image
  //       source={{ uri: this.state.fileUri }}
  //       style={styles.images}
  //     />
  //   } else {
  //     return <Image
  //       source={require('./assets/galeryImages.jpg')}
  //       style={styles.images}
  //     />
  //   }
  // }
  // image picker end

  const updateHandler = async () => {
    try {
      const { mobile_number, display_name, address, birthday, gender, profile_picture, email } = body
      let newBody = new FormData()
      newBody.append('profile_picture', profile_picture);
      newBody.append('mobile_number', mobile_number);
      newBody.append('email', email);
      newBody.append('display_name', display_name);
      newBody.append('address', address);
      newBody.append('birthday', birthday);
      newBody.append('gender', gender);

      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "content-type": "multipart/form-data" } }
      const response = await axios.patch(`${REACT_APP_BE_HOST}/users`, newBody, config)
      console.log(response)
      console.log('SUCCESS')
      successToast()
    } catch (error) {
      console.log('FAILED')
      console.log(error)
    }
  }
  return (
    <>
      <Header {...props} />
      <View style={style.container}>
        <Text style={style.title}>Edit Profile</Text>
        <View style={style.imgContainer}>
          <Image source={body.profile_picture ? {uri: body.profile_picture} : require('../../assets/img/profpict.png')} style={style.profpict} />
          <Pressable style={style.pencilContainer}>
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
        <Pressable style={style.saveBtn} onPress={updateHandler}>
          <Text style={style.saveTxt}>
            Save and Update
          </Text>
        </Pressable>
      </View>
      <Toast />
    </>
  )
}