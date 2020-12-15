import React, {Component} from 'react';
import {Alert} from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager  } from 'react-native-fbsdk';

import {SocialLoginFetch} from '@action';

const FacebookLogin = async () => {
    const perm = [
        'public_profile',
        'email',
      ];
      try {
        const login = await LoginManager.logInWithPermissions(perm);
        if(login.isCancelled){
          return login;
        }
        
        const token = await AccessToken.getCurrentAccessToken();
        const accTok = token.accessToken;
        // const l = "https://graph.facebook.com/me?access_token="+accTok;
        const l = "https://graph.facebook.com/"+token.userID+"?fields=id,name,gender,link,picture,email&type=large&access_token="+token.accessToken;
        const a = await fetch(l);
        const b = await a.status == 200 ? await a.json() : {};

        // api login
        var f = {
            email_id: b.id+'@facebookuser.com',
            user_id: b.id,
            name: b.name,
            platform_name: 'facebook',
            platform_id: b.id
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
          console.error(error);
        return error;
        console.log(error);
        alert('Login error', error)
      }
}


export default FacebookLogin;
