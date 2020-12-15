import React, { Component } from "react";
import { StatusBar, StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, BackHandler, AsyncStorage, Alert } from 'react-native';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import { Header } from '@common';

// import facbookLogin from '@auth/facebook/index';
// import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager  } from 'react-native-fbsdk';

import {fb_userImage} from '@configdata';


export default class facebookLogin extends Component{
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
          facebook: {},
          tokenSet: false,
          userId:''
          
        }


        const value = AsyncStorage.getItem('@isLoggedIn');
        if (value === 'true') {
         this.setState({loggedIn: true})
         
        }

        AsyncStorage.getItem('@token').then(b => {

        if(b !== null){
            console.log("objet => ", b);
            this.setState({loginType: b});
            fetch("https://graph.facebook.com/me?access_token="+b+"&fields=email,name").then(r => {
                if(r.status == 200){
                    return r.json();
                }else{
                    alert('graph api failed')
                }
            }).then(r => {
                this.setState({userId:r.id})

            })
        }
        })
      }

      
async UNSAFE_componentWillUpdate(){
    const perm = [
        'public_profile',
        'email',
      ];
     
      if(this.state.loggedIn == false){
        try {
            const login = await LoginManager.logInWithPermissions(perm);
            if(login.isCancelled){
              alert('Login has been cancelled');
            }
            const token = await AccessToken.getCurrentAccessToken();
            const accTok = token.accessToken;
            await AsyncStorage.setItem('@isLoggedIn', 'true');
            await AsyncStorage.setItem('@type', 'facebook');
            await AsyncStorage.setItem('@token', accTok);
            await AsyncStorage.setItem('@facebookUserId', token.userID);

            fetch("https://graph.facebook.com/"+token.userID+"?fields=id,name,gender,link,picture&type=large&access_token="+token.accessToken).then(r => {
                if(r.status == 200){
                    return r.text();
                }else{
                    alert("Graph api got error");
                }
            }).then(r => {
                AsyncStorage.setItem("@facebook", r);
            })
    
           console.log('token => ',token.userID)
           AsyncStorage.setItem('@userID', token.userID);
           this.setState({
             loggedIn:true,
             loginType: {
               type: 'facebook',
               token: accTok
             } 
            });

            // this.props.navigation.navigate('Home');
    
           
          } catch (error) {
            console.log(error);
            alert('Login error', error)
          }
      }else{
        console.log("user already logged in => ", this.state)
      }


        
     
}

    
    render(){
        const {loginType, loggedIn, facebook} = this.state;
        
        const getUserPhoto = () => {
            const {token} = loginType;
            console.log(token);
        }

    return (<Text>{JSON.stringify(loginType.token)}</Text>)
    }
}
