import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SocialLoginFetch} from '@action';
import { NativeModules } from 'react-native';
const { RNTwitterSignIn } = NativeModules;

const BearerToken = "AAAAAAAAAAAAAAAAAAAAANbpIAEAAAAAjoSE8GVsDvE%2BcDJJa5AVwoaIPRA%3DM24Znbbz2VBjFlEx9Nnq0zAnzWSkMIZYFJlvki7dtN3wiLphnx";
const AccessToken = "1302555908996620289-atIs1zyacPSheFjzvmAqjE3Q1o8XnH";
const AccessTokenSecret = "cKLiJvU808MxcRGGwpO1w6EdqREcU4lHNp7ecypZEtQk1";


const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "TngODXaUFcRU41CpDuByFRkW7",
  TWITTER_CONSUMER_SECRET: "ANm5sr18ANrsjAVwWsBibs7vGT583ketrI9idh1GqP50aCpQxA"
}


const Twitter  = async () => {

  try {
    const a = await RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
    const t = await RNTwitterSignIn.logIn();
    const {authToken, authTokenSecret, email, name, userID, userName} = t;
    console.log("website",t )
    
    var f = {
      email_id: userID+'@twitter.com',
      user_id: userName,
      name: name,
      platform_name: 'twitter',
      platform_id: userID
  };

  console.log(f);


  
  const g = await SocialLoginFetch(f);
      if(g == true){
        var z = {status:1, msg:'User logged is success'};
        return z;
      }else{
        var z = {status:0, msg:'User logged is failed'};
        return z;
      }
  } catch (error) {
    var z = {status:0, msg:'Twitter Sign in cancelled'};
    return z;
  }

 
}

export default Twitter;