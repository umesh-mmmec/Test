import React, { Component } from "react";
import { StyleSheet, Dimensions, ImageBackground, TouchableOpacity, View, Text, Image, StatusBar,ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { InputBox, Loader, ToastAlert, Header, DefButton } from "@common";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import { fetchUserData, login, loginCustom } from '@action'
import { color } from "react-native-reanimated";
import theme from '@theme';
import {Icon} from 'react-native-elements';
const dw = Dimensions.get('window').width;

import {FacebookLogin, Google, Twitter} from '@social';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: '',
      remembered:false,
      loading:false
    };
  }

  async login() {
    this.setState({ loading: true });
    this.onSubmit();
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


  async TwitterLogin(){
    this.setState({ loading: true });
    const a = await Twitter();
    this.setState({ loading: false });
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if(a.status == 1){
      // ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      this.props.navigation.navigate('modules', {refresh:true});
    }
    console.log("twitter", a);
    return a;
  }



  async GoogleLogin(){
    this.setState({ loading: true });
    const a = await Twitter();
    this.setState({ loading: false });
    ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    if(a.status == 1){
      // ToastAndroid.showWithGravity(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      this.props.navigation.navigate('modules', {refresh:true});
    }
    return a;
  }

  async onSubmit() {
    const { userID, password } = this.state;
    if(userID == ''){
    this.setState({ loading: false });

      ToastAndroid.showWithGravity("User id field is required", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      return false;
    }
    if(password == ''){
    this.setState({ loading: false });

      ToastAndroid.showWithGravity("Password field is required", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      return false;
    }
    var i = {
      email_id:userID,
      password:password
    }
    const log = await login(i);
    console.log("console", log);
    this.setState({ loading: false });
    if(log.status == 0){
      ToastAndroid.showWithGravity(log.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }else{
      ToastAndroid.showWithGravity(log.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
      this.props.navigation.navigate('modules', {refresh:true});
    }
    return log;
  }

  
  render() {
    const {remembered} = this.state;
    return (
      <ImageBackground source={require('@assets/login.png')} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={theme.STATUS} />
        <Header name={'Login'} topmar={25} {...this.props} />
        <View style={styles.container}>
          
        <Image style={styles.image_one} resizeMode={'cover'} source={require('@assets/logo.png')}/>

          <View style={styles.inputMainView}>
            <Text style={styles.Header}>Login to Get Started</Text>
            <InputBox onChangeText={(text) => { this.setState({ userID: text }) }} icon={'user'} name={'Email Address'} />
            <InputBox onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} secureTextEntry={true} name={'Password'} />
          </View>


          <DefButton name={"Log In"} callback={() => this.login()}/>
          <View style={styles.lowerview}>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight:'bold' }}>Don’t have an account yet? </Text>
            <TouchableOpacity style={styles.registerBtn} onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={styles.register}> Sign up now</Text>
              {/* <Image style={{ height:30, width:60 }} resizeMode={'center'} source={require('@assets/schedule/register.png')}/> */}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ color:'#fff' }}>or continue with social media</Text> 
          </View>

            <Text>{'\n'}</Text>

          <View style={{ flex:1, flexDirection:'row', justifyContent:'space-around', marginBottom:10 }}>
            <Image style={{ height:50, width:50, top:0, marginEnd:10 }} source={require('@assets/schedule/facebook.png')}/>
            <Image style={{ height:50, width:50, marginStart:10 }} source={require('@assets/schedule/gmail.png')}/>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}

export default connect(null, { fetchUserData })(Login);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  image_one: {
    height: '20%',
    width: '100%',
    overflow: 'hidden',
    marginBottom:'-10%',
    marginTop:'20%'
  },
  Header:{
    color:'#fff',
    fontSize:25,
    textAlign:'center',
    marginBottom:10
  },
  register: {
    color:'#5a66f1', fontSize: 20, fontWeight: 'bold'
  },
  imageView: {
    height: responsiveHeight(40),
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white', fontSize: 25, fontWeight: 'bold'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },
  container: {
    height: '90%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  lowerview: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'transparent'
  },
  inputMainView: {
    height: responsiveHeight(20),
    justifyContent: 'space-around',
    paddingHorizontal: responsiveWidth(1),
    marginTop:'25%'
   },
  registerBtn:{ alignItems: 'center', justifyContent: 'center' }
})