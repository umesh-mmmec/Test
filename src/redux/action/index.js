import React from 'react';
import types from '../types';
// import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import {LINK} from '../../../src/config';
import {View, Text} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';


const fetchUserData = (id, success) => {
    return async dispatch => {
        try {
            const userData = await firestore().collection('Users').doc(id).get();
            if (userData._data != undefined) {
                dispatch({ type: types.SET_USER_INFO, payload: userData._data });
                dispatch({ type: types.SET_USER_Image, payload:userData. _data.imagePath });
                dispatch(fetchScheduleMeeting()); 
                success();
            }
        } catch (error) {
            dispatch({ type: types.ERROR, payload: error });
        }
    };
};


const fetchScheduleMeeting = () => {
    return async dispatch => {
        const userID = await AsyncStorage.getItem('@userID');
        try {
            const meetingData = await firestore().collection('ScheduleMeeting').where('userID', '==', userID).get();
            var arrData = [];
            meetingData.forEach(documentSnapshot => {
                arrData.push(documentSnapshot.data());
            });
            const todayMeeting = arrData.filter(data => moment(data.date).isSame(moment().format('YYYY-MM-DD')));
            const nextMeeting = arrData.filter(data => moment(data.date).isAfter(moment().format('YYYY-MM-DD'), 'day'));
            dispatch({ type: types.TODAY_MEETING, payload: todayMeeting });
            dispatch({ type: types.NEXT_MEETING, payload: nextMeeting });

        } catch (error) {
            dispatch({ type: types.ERROR, payload: error });
        }
    };
};

const deleteScheduleMeeting = (id, success) => {
    return async dispatch => {
        const userID = await AsyncStorage.getItem('@userID');
        try {
            const meetingData = await firestore().collection('ScheduleMeeting').where('meetingID', '==', id).where('userID', '==', userID).get();
            meetingData.forEach(function (doc) {
                doc.ref.delete();
            });
            success();
            dispatch(fetchScheduleMeeting());
        } catch (error) {
            dispatch({ type: types.ERROR, payload: error });
        }
    };
};

const resetData = () => ({
    type: types.RESET,
});

const checkUser = async () => {
    const a = await AsyncStorage.getItem('userLoggedIn');
    console.log("+++++++++++++++++++++++++++++++++++");
    console.log("User", a);
    console.log("+++++++++++++++++++++++++++++++++++");
    if(a == 'true'){
        return true;
    }else{
        return false;
    }
}

const UserRegister = async (data) => {
    console.log(data);

    const a = [
        { name : 'userfile', filename : data.userfile ? 'userImage.jpeg' : "", data: data.userfile ? RNFetchBlob.wrap(data.userfile) : ""},
        // elements without property `filename` will be sent as plain text
        { name : 'name', data : data.name},
        { name : 'user_id', data : data.user_id},
        { name: 'mobile_no', data : data.mobile_no },
        { name : 'email_id', data : data.email_id },
        { name: 'password', data : data.password },
        { name:  'confirm_password', data : data.confirm_password},
        { name: 'registration_type', data : data.registration_type }
      ];

      console.log("fetch data => ", a);

    const h = await RNFetchBlob.fetch('POST',LINK + 'api/register',{
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          authorization: 'Basic YWRtaW46MTIzNA==',
          Authorizationkeyfortoken:
            'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcktleSI6IlVuOG81UjMwOTMiLCJpc3N1ZWRBdCI6IjIwMTctMDQtMDVUMTU6MjU6MDMrMDAwMCIsImZpcnN0TmFtZSI6IkZhcmhhZCIsInVzZXJFbWFpbCI6InBvbG9rMDE3MTdAZ21haWwuY29tIiwidXNlcklkIjoiMSIsInVzZXJUeXBlIjoiMSJ9.EuJPSGHVedZscFj4mARHObzrnxgaYouvcwO5c94Po4U',
          accept: '*/*',
          // here's the body you're going to send, should be a BASE64 encoded string
          // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
          // The data will be converted to "byte array"(say, blob) before request sent.
        }, a);

        console.log(h);


    return JSON.parse(h.data);


}

const getToken = async () => {
    const a = await AsyncStorage.getItem('userIDToken');
    return a;
}

const login = async (data,) => {
    const a = data.email_id;
    const b = data.password;
    var c = new FormData();
    c.append('email_id', a);
    c.append('password', b);
    var l = LINK+'api/login';
    var d = await fetch(l, {
        method: 'POST',
        body: c
    });
var e = await d.json();
if(e.status == 1){
    // staus is success full;
    // save the token id;
    await AsyncStorage.setItem('userLoggedIn', 'true');
    await AsyncStorage.setItem("userIDToken", e.token_code.toString());
    return true;
}else{
    return e;
}
}

// data

const loginCustom = async (data,) => {
    const a = data.user_id;
    const b = data.password;
    var c = new FormData();
    c.append('user_id', a);
    c.append('password', b);
    console.log("user id", a);
    console.log("passwors", b);
    var l = LINK+'api/login';
    var d = await fetch(l, {method: 'POST',body: c});
    return d.text();
}


// forgot password
const forgotPassword = async (email) => {
    var l = LINK+'api/forgotten-password';
    var b = new FormData();
    b.append('email', email);
    var x = await fetch(l, {
        method: 'POST',
        body: b
    });
    var x = x.json();
    return true;
}

const getUserData = async () => {
    const a = await AsyncStorage.getItem('userIDToken');
    if(a !== null){
        console.log("user token ", a);
        var l = LINK+'api/all-register-data';
        var b = new FormData();
        b.append('token_code', a);
        var c = await fetch(l, {
            method: 'POST',
            body: b
        })

        let e;
        if(c.status == 200){
            e = c.json();
        }else{
            return false;
        }

        return e;
    }else{
        return false;
    }
}



const createMeeting = async (data) => {
    console.log("data => ", data);
    var d = new FormData();
    d.append('token_code', data.token_code);
    d.append('title', data.title);
    d.append('participate_id', JSON.stringify(data.participate_id));
    d.append('meeting_start_date', data.meeting_start_date);
    d.append('meeting_end_date', data.meeting_end_date);
    d.append('starting_time', data.starting_time);
    d.append('ending_time', data.ending_time);
    d.append('agenda', data.agenda);

    const l = LINK+'api/create-new-meeting';
    console.log("link => ", JSON.stringify(d));
    const a = await fetch(l, {
        method: 'POST',
        body:d
    });

    const b = await a.status == 200 ? await a.json() : {};
    return b;
}

const currentDate = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}


const getMeetings = async () => {
    const a = await getToken();
    if(a !== null){
        const l = LINK+'api/get-meeting';
        var b = new FormData();
        b.append('token_code', a);
        const c = await fetch(l, {
            method: 'POST',
            body:b
        });

        var d = c.status == 200 ? c.json() : {};
        return d;
    }else{
        return {};
    }
}


const todayMeetings = async () => {
    const a = await getMeetings();
    const e = a.data;
    const c = await currentDate();
    let  b = [];
    if(e.length !== 0){
       e.forEach(e => {
           if(e.meeting_details.meeting_start_date == c){
            b.push(e);
           }
           
       })
        return b;
    }else{
        return b;
    }
}


const nextDayMeetings = async () => {
    const a = await getMeetings();
    const e = a.data;
    const c = await currentDate();
    let  b = [];
    if(e.length !== 0){
       e.forEach(e => {
           if(e.meeting_details.meeting_start_date != c){
            b.push(e);
           }
           
       })
        return b;
    }else{
        return b;
    }
}


const authUser = async () => {
    // check the user logged in or not
    const check = await checkUser();
    if(check){
        // get the auth user token
        const token = await getToken();
        if(token !=  null){
            const l = LINK+'api/user-details';
            var b = new FormData();
            b.append('token_code', token);
            const data = await fetch(l, {method: 'POST', body:b});
            const user = data.status == 200 ? data.json() : {};
            return user;
        }else{
            return false;
        }
    }else{  
        return false;
    }
}


const linkImage = (i) => {
    const l = LINK+'uploads/'+i;
    return l;
}

const specialLog = (a) => {
    console.log("{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]||||||||||||||||||||||||||");
    console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{-------Special log --------}}}}}}}{{{{{[[[[[[[[[[[[[[[]]]]]]]]]]]]");
    console.log(a);
    console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{-------Special log --------}}}}}}}{{{{{[[[[[[[[[[[[[[[]]]]]]]]]]]]");
    console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}{{{{{[[[[[[[[[[[[[[[]]]]]]]]]]]]");
}

const acceptMeetings = async (id) => {
    const token = await getToken();
    const l = LINK+'api/accept-meeting';
    var d = new FormData();
    d.append("token_code", token);
    d.append('id', id);
    const data = await fetch(l,{method: 'POST', body:d});
    const res = data.status == 200 ? data.json() : {};
    return res;
}

const rejectMeetings = async (id) => {
    const token = await getToken();
    const l = LINK+'api/reject-meeting';
    var d = new FormData();
    d.append("token_code", token);
    d.append('id', id);
    const data = await fetch(l,{method: 'POST', body:d});
    const res = data.status == 200 ? data.json() : {};
    return res;
}


const Participant_name = () => {
   return null;
  }


  const createMeetings = async (id) => {
    const token = await getToken();
    const code = token == null ? 0 : token;
    const l = LINK+'api/add-meeting-history';
    var b = new FormData();
    b.append("meeting_id", b);
    const a = await fetch(l, {method: "POST", body: b});
    const c = await a.status == 200 ? await a.json() : {};
    console.log("create meetings", c);
    return c;
  }

  async function getBase64Image(img) {
    var a = await ImgToBase64.getBase64String(img);
    console.log("image required", a);
  return a;
}


const updateProfileUser = async (data) => {
    console.log(data);

    var ui = await getToken() !== null ? await getToken() : 0;
    var l = LINK+"api/update-profile";
   
    const a = [
        { name : 'userfile', filename : data.userfile ? 'userImage.jpeg' : "", data: data.userfile ? await getBase64Image(data.userfile) : ""},
        // elements without property `filename` will be sent as plain text
        { name : 'name', data : data.name},
        { name : 'user_id', data : data.user_id},
        { name: 'mobile_no', data : data.mobile_no },
        { name : 'token_code', data : ui },
        { name : 'address', data : data.address },
        { name : 'pincode', data : data.pincode },
        { name : 'city', data : data.city },
        { name : 'state', data : data.state}
      ];

      console.log("fetch data => ", a);

    const h = await RNFetchBlob.fetch('POST',LINK + 'api/update-profile',{
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          authorization: 'Basic YWRtaW46MTIzNA==',
          Authorizationkeyfortoken:
            'eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcktleSI6IlVuOG81UjMwOTMiLCJpc3N1ZWRBdCI6IjIwMTctMDQtMDVUMTU6MjU6MDMrMDAwMCIsImZpcnN0TmFtZSI6IkZhcmhhZCIsInVzZXJFbWFpbCI6InBvbG9rMDE3MTdAZ21haWwuY29tIiwidXNlcklkIjoiMSIsInVzZXJUeXBlIjoiMSJ9.EuJPSGHVedZscFj4mARHObzrnxgaYouvcwO5c94Po4U',
          accept: '*/*',
          // here's the body you're going to send, should be a BASE64 encoded string
          // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
          // The data will be converted to "byte array"(say, blob) before request sent.
        }, a);

        console.log(h.data);


    return JSON.parse(h.data);
  }



  async function FilesSHaredWithMe(){
      const a = await getToken(); //get current user token
      const b = a != null ? a : 0;
      const c = new FormData();
      const e = LINK+'api/share-list';
    c.append('token_code', b);
    const d = await fetch(e,{method:'POST', body:c});
    const f = await d.status == 200 ? await d.json() : {};
    console.log("data",f);
    return f;
}



 async function SocialLoginFetch(a){
    var l = LINK+'api/register-by-media';
    var b = new FormData();
    b.append('email_id', a.email_id);
    b.append('user_id', a.user_id);
    b.append('name', a.name);
    b.append('platform_name', a.platform_name);
    b.append('platform_id', a.platform_id);
    var c = await fetch(l, {method:'POST', body:b});
    var d = await c.status == 200 ? await c.json() : {};

   
    if(d.status == 1){
        await AsyncStorage.setItem('userLoggedIn', 'true');
        await AsyncStorage.setItem("userIDToken", d.token_code.toString());
        return true;
    }else{
        return false;
    }
}

export { SocialLoginFetch, FilesSHaredWithMe, updateProfileUser, createMeetings, acceptMeetings, rejectMeetings, Participant_name, specialLog, linkImage, todayMeetings, authUser, currentDate, nextDayMeetings, getToken, createMeeting,getMeetings, fetchUserData, resetData, fetchScheduleMeeting, deleteScheduleMeeting, checkUser, UserRegister, login, loginCustom, forgotPassword, getUserData };
