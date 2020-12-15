import React, { Component } from "react";
import { StatusBar, StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, BackHandler, AsyncStorage, Alert } from 'react-native';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import { Header } from '@common';

// import facbookLogin from '@auth/facebook/index';
const facebookLogin = () => (null);
// import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager  } from 'react-native-fbsdk';

import {fb_userImage} from '@configdata'
import { RFValue } from "react-native-responsive-fontsize";
class SocialLogin extends Component {
  constructor(props){
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
      loggedIn: false,
      loginType: {
        type: '',
        token: ''
      },
      facebookToken: '',
      facebook: {}
    }
  }

  async tofacebook(){
    const perm = [
      'public_profile',
      'email',
    ];
    try {
    //   const login = await LoginManager.logInWithPermissions(perm);
    //   if(login.isCancelled){
    //     alert('Login has been cancelled');
    //   }
    //   const token = await AccessToken.getCurrentAccessToken();
    //   const accTok = token.accessToken;
      

    //   fetch("https://graph.facebook.com/"+token.userID+"?fields=id,name,gender,link,picture&type=large&access_token="+token.accessToken).then(r => {
    //       if(r.status == 200){
    //           return r.text();
    //       }else{
    //           alert("Graph api got error");
    //       }
    //   }).then(r => {
    //       AsyncStorage.setItem("@facebook", r);
    //   })

    //  console.log('token => ',token.userID)
    //  AsyncStorage.setItem('@userID', token.userID);
     

    //   this.props.navigation.navigate('Home');

    return;

     
    } catch (error) {
      return error;
      console.log(error);
      alert('Login error', error)
    }
  }

  render() {
   
    return (
      <ImageBackground source={require('@assets/bg-screen.png')} style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Header name={" "} {...this.props} />
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={require('@assets/logo.png')} >
            </Image>
          </View>
          <View style={styles.headingContainer}>
    <Text style={styles.headingText}>Connect with social media</Text>
            <Text style={styles.headingSubText}>Keep everyone connected</Text>
          </View>

          <View style={styles.platformContainer}>
            <View style={styles.platformContentContainer}>
              
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/gmail.png')} >
                </Image>
              </TouchableOpacity>

              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/email.png')} >
                </Image>
              </TouchableOpacity>


              <TouchableOpacity style={styles.options} onPress={() => this.tofacebook()}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/fb.png')} >
                </Image>
              </TouchableOpacity>



            </View>
            <View style={styles.platformContentContainer}>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/pinterest.png')} >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/twitter.png')} >
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={styles.options}>
                <Image
                  style={styles.platformImage}
                  resizeMode='cover'
                  source={require('@assets/outlook.png')} >
                </Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default SocialLogin

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  options: {
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  imageContainer: {
    height: responsiveHeight(30),
    width: responsiveHeight(35),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingText: {
    color: '#f35925',
    fontSize: RFValue(25.5),
    fontWeight: 'bold'
  },
  headingSubText: {
    color: '#f35925',
    fontSize: RFValue(25),
  },
  platformContainer: {
    width: responsiveHeight(50),
    height: responsiveHeight(25),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  platformImage: {
    height: '70%',
    width: '70%'
  },
  platformContentContainer: {
    flexDirection: 'row',
    width: responsiveHeight(42),
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})