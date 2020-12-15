import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { View, BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import { Loader } from '@common';
import 'react-native-gesture-handler'
import { fetchUserData } from '@action'
import { connect } from "react-redux";
import { fetchScheduleMeeting, deleteScheduleMeeting, checkUser, getUserData, specialLog } from '@action';

class modules extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.loadApp();
        SplashScreen.hide(); 
    }



    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
      }


      handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
         )
         return true;
       } 

    

    UNSAFE_componentDidMount() { 
        SplashScreen.hide(); 
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

    UNSAFE_componentWillReceiveProps(){
        this.loadApp();
    }




    async loadApp() {
        const check = await checkUser();
        specialLog('dasdsadadad  '+check);
        if(check){
            await AsyncStorage.setItem('userLoggedIn', 'true');
            this.props.navigation.navigate('Home', {loggedIn:true})
        }else{
            this.props.navigation.navigate('Home', {loggedIn:false})
        }
    }
    
    render() {
        this.loadApp();
        return (
            <View style={{ flex: 1 }}>
                <Loader />
            </View>
        )
    }
}

export default connect(null, { fetchUserData })(modules);