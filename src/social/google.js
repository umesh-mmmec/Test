import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SocialLoginFetch} from '@action';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

const Google = async () => {
const config = {
        "web":
    {
        "client_id":"941841944354-17qv40o65uk3rehirota2jh7qhij0lpn.apps.googleusercontent.com",
        "project_id":"getonme-8748c",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret":"ZWG5CkqZrEo9H1513U56tScn"
    }
};


const config_2 = {
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '941841944354-17qv40o65uk3rehirota2jh7qhij0lpn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  };

    GoogleSignin.configure(config);


      try {
        await GoogleSignin.hasPlayServices();
        const b = await GoogleSignin.signIn();
        console.log("userinfo ", b);

        var f = {
            email_id: b.user.email,
            user_id: b.user.id,
            name: b.user.name,
            platform_name: 'google',
            platform_id: b.user.id
        };

        const g = await SocialLoginFetch(f);
        if(g == true){
            var z = {status:1, msg:'User logged is success'};
            return z;
        }else{
            var z = {status:0, msg:'User logged is failed'};
            return z;
        }
      } catch (error) {
          console.log("error ", error);

        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            var z = {status:0, msg:'Google Sign in cancelled'};
            return z;
        } else if (error.code === statusCodes.IN_PROGRESS) {
            var z = {status:0, msg:'Google Sign is in Progress'};
            return z;
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            var z = {status:0, msg:'Google play services not Available'};
            return z;
        } else {
            var z = {status:0, msg:'Google play services failed'};
            return z;
        }

      }
}


export default Google;

