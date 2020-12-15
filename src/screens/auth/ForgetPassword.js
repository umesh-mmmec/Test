import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
  ToastAndroid,
  StatusBar
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
// import auth from '@react-native-firebase/auth';
import { ToastAlert, Header, DefButton, InputBox, customAlert } from "@common";
import {forgotPassword} from '@action';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from '@theme'
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  async forget() {
    var emailAddress = this.state.email;
    if(emailAddress == ''){
      customAlert("Email address should not be empty");
      return false;
    }
    var a = await forgotPassword(emailAddress);
    ToastAndroid.showWithGravity(
      "Reset password link has been send to youe email",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    )

    this.props.navigation.navigate('modules', {refresh: true})
  }
  render() {
    return (
      <ImageBackground source={require('@assets/login.png')} style={styles.background}>
      <StatusBar translucent={true} backgroundColor={theme.STATUS} />

      <Header tommargin={50} name={'Forgot Password'} topmar={-25} {...this.props} />

      <View style={styles.container}>


        
      <Image style={styles.image_one} resizeMode={'cover'} source={require('@assets/logo.png')}/>

        <View style={styles.inputMainView}>
          <Text style={styles.Header}>Forgoot Password</Text>
          <InputBox onChangeText={(text) => { this.setState({ email: text }) }} icon={'user'} name={'Email Address'} />
          {/* <InputBox onChangeText={(text) => { this.setState({ password: text }) }} icon={'lock'} secureTextEntry={true} name={'Password'} /> */}
        </View>


        <DefButton fontSize={20} name={"Request Password Reset".toUpperCase()} callback={() => this.forget()}/>
        {/* <View style={styles.lowerview}> */}
          {/* <Text style={{ color: '#fff', fontSize: 15, fontWeight:'bold' }}>Don’t have an account yet? </Text> */}
          {/* <TouchableOpacity style={styles.registerBtn} onPress={() => this.props.navigation.navigate("Register")}> */}
            {/* <Text style={styles.register}> Sign up now</Text> */}
            {/* <Image style={{ height:30, width:60 }} resizeMode={'center'} source={require('@assets/schedule/register.png')}/> */}
          {/* </TouchableOpacity> */}
        {/* </View> */}

        <View>
          
    <Text style={{ color:'#fff' }}>{'\n'}or continue with social media</Text> 
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
export default Forget

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