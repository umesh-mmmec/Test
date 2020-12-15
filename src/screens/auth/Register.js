import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground, Text, Image, StatusBar, ToastAndroid, Dimensions} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { InputBox, Loader, ToastAlert, Header, DefButton } from "@common";
// import auth from '@react-native-firebase/auth';
import { connect } from "react-redux";
import { fetchUserData, UserRegister, login } from '@action';
import theme from '@theme';
import { responsiveHeight } from "react-native-responsive-dimensions";
import { RFValue } from "react-native-responsive-fontsize";
import {FacebookLogin, Google} from '@social';

const imageOptions = {
  title: "Select ProfilePic",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  maxWidth: 300,
  maxHeight: 300
};

const devHeight = Dimensions.get('window').height;
const devWidth = Dimensions.get('window').width;

class Register extends Component {

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
      islogged: '',
      type: '',
      token : '',
      userImageLink: '',
      name: '',
      imageLink: '',
    };
   

    console.log("props => ", props.route.params)
  }


  async register() {

    console.log("register button clicked")
    this.onRegister();
  }

  async facebook(){
    this.setState({ loading: true });
    const a = await FacebookLogin();
    this.setState({ loading: false });
    if(a.isCancelled == true){
      ToastAndroid.showWithGravity("Login with facebook is cancelled", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }

    // const {id, name, picture.data.url} = a;
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);

    if(a.status == 1){
      // ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      this.props.navigation.navigate('modules', {refresh:true});
    }
    return a;
  }


  async GoogleLogin(){
    this.setState({ loading: true });
    const a = await Google();
    this.setState({ loading: false });
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if(a.status == 1){
      // ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      this.props.navigation.navigate('modules', {refresh:true});
    }
    return a;
  }


  addProfilePic = () => {
    ImagePicker.showImagePicker(imageOptions, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        // You can also display the image using data:
        console.log("image", response.uri);
        this.setState({imageLink: response.uri});
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ userImage: source, uri: 'data:image/jpeg;base64,' + response.data, userImageLink: response.uri });
      }
    });
  }


  async onRegister(pro) {
    this.setState({loading:true});
    const { password,userName, email, phone, name, imageLink } = this.state;
    const data = {
      'name': name,
      'user_id': userName,
      'mobile_no': phone,
      'email_id': email,
      'password': password,
      'confirm_password': password,
      'userfile': imageLink,
      'registration_type': 'manual'
    };

    const a = await UserRegister(data);
    console.log("user data => ",a);
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if(a.status === 1){
      // login the user
      const loginData = {
        user_id: userName,
        password: password
      }
      const log = await login(loginData);
      
      if(log){
        this.props.navigation.navigate('modules',{refresh:true});
        ToastAndroid.showWithGravity("You are sucessfully registered", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }else{
        ToastAndroid.showWithGravity("Credentil are not please check the correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
      this.setState({loading:false});
    }else{
      this.setState({loading:false});
    }
    console.log("register data => ",a);
  }




  render() {
    return (
      <ImageBackground source={require('@assets/register.png')} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={theme.STATUS} />
        <Header name={'Register'} {...this.props} topmar={10} />
        <View style={styles.container}>
        <Image style={styles.image_one} resizeMode={'cover'} source={require('@assets/logo.png')}/>

    {/* <Text style={{fontSize:20}}>{'\n'}Register</Text> */}
        
            <View style={styles.uploadView}>
              
              <TouchableOpacity style={styles.upload} onPress={this.addProfilePic}>
                {this.state.userImage == '' ? <Icon name="user-o" type='font-awesome' size={40} color="#dcdcdc" />
                  :
                  <Image style={styles.image} resizeMode='cover' source={this.state.userImage} />}
              </TouchableOpacity>
            </View>
            
          <ScrollView contentContainerStyle={styles.ScrollView}>
          <InputBox icon={""} onChangeText={(text) => { this.setState({ name: text }) }} icon={'user-o'} name={'Username'} keyboardType={'default'} />
          {/* <InputBox icon={""} onChangeText={(text) => { this.setState({ userName: text }) }} icon={'user-o'} name={'Username'} keyboardType={'default'} /> */}
          <InputBox icon={""} onChangeText={(text) => { this.setState({ email: text }) }} icon={'envelope-open-o'} name={'Email Address'} keyboardType={'email-address'} />
          <InputBox icon={""} onChangeText={(text) => { this.setState({ phone: text }) }} icon={'phone'} name={'Phone Number'} keyboardType={'numeric'} />
          <InputBox icon={""} onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} name={'Password'} keyboardType={'password'} secureTextEntry={true} />
          <View style={{ marginTop:20 }}>
          <DefButton name={"SIGNUP, It's Free"} callback={() => this.register()}/>

          </View>

         
          <View style={styles.lowerView}>
            <Text style={styles.lowerViewText}>Already have an account?</Text>
            <TouchableOpacity style={styles.loginView} onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.login}> Sign In</Text>
            </TouchableOpacity>
           
          </View>

          <View>
            <Text style={{ color:'#fff' }}>or continue with social media</Text> 
          </View>

            <Text>{'\n'}</Text>

          <View style={{ flex:1, flexDirection:'row', justifyContent:'space-around' }}>
            <Image style={{ height:50, width:50, top:0, marginEnd:10 }} source={require('@assets/schedule/facebook.png')}/>
            <Image style={{ height:50, width:50, marginStart:10 }} source={require('@assets/schedule/gmail.png')}/>
          </View>
          </ScrollView>
          
         
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}

export default connect(null, { fetchUserData })(Register);

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
    marginTop:'-30%'
  },
  uploadView: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    height: devHeight+100,
    width:devWidth
  },
  ScrollView: {
    marginTop:'0%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  login: {
    color: '#615bd6',
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  upload: {
    backgroundColor: '#fff',
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
    backgroundColor: 'transparent'
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
    height: '80%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  lowerViewText:{ color: '#000', fontWeight:'bold', fontSize: 20 }
})