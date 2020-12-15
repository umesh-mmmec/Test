import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground, Text, Image, StatusBar, ToastAndroid, } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { InputBox, Loader, ToastAlert, Header, DefButton } from "@common";
// import auth from '@react-native-firebase/auth';
import { connect } from "react-redux";
import { updateProfileUser, authUser,linkImage } from '@action';
import theme from '@theme';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

// import { responsiveHeight,responsiveWidth } from "react-native-responsive-dimensions";
import { RFValue } from "react-native-responsive-fontsize";
import {LINK} from '../../config';
const imageOptions = {
  title: "Select ProfilePic",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  maxWidth: 300,
  maxHeight: 300
};
export default class EditPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userImage: '',
      userName: '',
      password: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      pinCode: '',
      loading: false,
      uri: '',
      islogged: true,
      type: '',
      token : '',
      userImageLink: '',
      name: '',
      imageLink: '',
      img:{},
      city:'',
      state:'',
      pinCode:''
    };

    this.user();
  }


  async user(){
      const a = await authUser();
      const b = await a !== false ? await a.data : [];
      console.log(b);
        var c= {
            userName:b.user_id,
            name:b.name,
            phone:b.mobile_no,
            email:b.email_id,
            img:{uri:LINK+"uploads/"+b.image},
            city:b.city,
            state:b.state,
            pinCode:b.pincode
        }
        this.setState(c);

      console.log("user data", c);
  }


  async register() {

    console.log("register button clicked")
    this.onRegister();
  }

  addProfilePic = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // You can also display the image using data:
        console.log("image", response.uri);
        this.setState({
            imageLink: response.uri
        });
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ img: source, uri: 'data:image/jpeg;base64,' + response.data, userImageLink: response.uri });
      }
    });
  }


  async onRegister(pro) {
    this.setState({loading:true});
    const { password,userName, email, phone, name, imageLink,city,state,pinCode } = this.state;
    const data = {
      'name': name,
      'user_id': userName,
      'mobile_no': phone,
      'email_id': email,
      'password': password,
      'confirm_password': password,
      'userfile': imageLink,
      'registration_type': 'manual',
      'city':city,
      'state':state,
      'pincode':pinCode
    };

    const a = await updateProfileUser(data);
    console.log("user data => ",a);
    this.setState({loading:false});
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    this.props.navigation.navigate('modules',{refresh:true});

  }




  render() {
    return (
      <ImageBackground source={require('@assets/register.png')} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={theme.STATUS} />
        <Header {...this.props} topmar={-15} name={"Update".toUpperCase()} />

        <Image style={styles.image_one} resizeMode={'cover'} source={require('@assets/logo.png')}/>

        <View style={styles.container}>
            <View style={styles.uploadView}>
              <TouchableOpacity style={styles.upload} onPress={this.addProfilePic}>
              {/* <Image
              style={styles.userImage}
              resizeMode='cover'
              source={this.state.img ? {uri: linkImage(this.state.img)} : require('@assets/profile2.png')}  >
            </Image> */}
                {this.state.img == {} ? <Icon name="user-o" type='font-awesome' size={40} color="#dcdcdc" /> : <Image style={styles.image} resizeMode='cover' source={this.state.img} />}
              </TouchableOpacity>
            </View>
          <ScrollView contentContainerStyle={styles.ScrollView}>
          {/* <InputBox icon={""} readonly value={this.state.userName} onChangeText={(text) => { this.setState({ userName: text }) }} icon={'user'} name={'Username'} keyboardType={'default'} /> */}
          <InputBox icon={""} readonly value={this.state.email} onChangeText={(text) => { this.setState({ email: text }) }} icon={'envelope-open'} name={'Email Address'} keyboardType={'email-address'} />
          <InputBox icon={""} value={this.state.phone} onChangeText={(text) => { this.setState({ phone: text }) }} icon={'phone'} name={'Phone Number'} keyboardType={'numeric'} />
          <InputBox icon={""} value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} icon={'user'} name={'Name'} keyboardType={'default'} />
          {/* <InputBox icon={""} value={this.state.city} onChangeText={(text) => { this.setState({ city: text }) }} icon={'map'} name={'City'} keyboardType={'default'} /> */}
          {/* <InputBox icon={""} value={this.state.state} onChangeText={(text) => { this.setState({ state: text }) }} icon={'map'} name={'State'} keyboardType={'default'} /> */}
          {/* <InputBox icon={""} value={this.state.pinCode} onChangeText={(text) => { this.setState({ pinCode: text }) }} icon={'map'} name={'Pincode'} keyboardType={'default'} /> */}
          <DefButton name={"update".toUpperCase()} callback={() => this.register()}/>
          </ScrollView>

        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({

  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  image_one: {
    height: '20%',
    width: '100%',
    overflow: 'hidden',
    marginBottom:'-10%',
    marginTop:'20%'
  },
  userImage: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    overflow: 'hidden',
    borderRadius: responsiveWidth(14),
  },
  uploadView: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    height: '125%'
  },
  ScrollView: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop:'10%'
  },
  login: {
    color: theme.LINK,
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginView: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  upload: {
    backgroundColor: '#f35925',
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView: {
    backgroundColor: 'transparent',
    height: 100,
    alignItems: 'baseline',
    justifyContent: 'flex-end'
  },
  lowerView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'transparent',
    marginBottom: '40%'
  },
  title: {
    color: 'white',
    fontSize: RFValue('35'),
    fontWeight: 'bold',
    textAlign: 'left',
    bottom: 0
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300, height: 80,
    backgroundColor: 'transparent',
  },
  container: {
    height: '65%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  lowerViewText:{ color: theme.FONT, fontSize: 20 }
})