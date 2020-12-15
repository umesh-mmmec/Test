import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput, ImageBackground, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, ThemeConsumer } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import {FIREBASE, SERVICE, USER, LINK} from '../config';
var _ = require('lodash');
import theme from '@theme';
import { getToken, linkImage,specialLog, fetchScheduleMeeting, authUser, deleteScheduleMeeting, checkUser, getUserData, getMeetings, todayMeetings, nextDayMeetings } from '@action';
import { RFValue } from "react-native-responsive-fontsize";
import Dash from 'react-native-dash';
import {DefButton} from '@common';
export default class SelectParticipitant extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: [],
            selectedUser:[]
        }

        this.participitant();
      }


      participitant = async () => {
        return Promise<Array>[];
        const a = await getUserData();
        this.setState({
          resultObject: a.data
        })
      }

      getdata = async(d) => {
        const a = await database()
        .ref(`/users`)
        .on('value', snapshot => {
          console.log('User data: ', snapshot.val());
        });
        return a;
      }


      UpdateSelected = (k) => {
        const {resultObject} = this.state;
        var d = [...resultObject];
        // checkThePrevious
        var p = d[k].selected; 
        if(p){
          d[k].selected = false;
        }else{
          d[k].selected = true;
        }
        this.setState({
          resultObject: d
        });

        return d[k];
      }


      selectedObject = () => {
        const {resultObject} = this.state;
        let selected = [];
        resultObject.map(e => {
          if(e.selected){
            selected.push(e);
          }
        })
        return selected;
      }


      ResultsObject = () => {
        const {selectedUser} = this.state;
        let Obj = [];
        Object.values(selectedUser).map((v) => {
          console.log("values", v);
          if (!Obj.includes(v)) {
            Obj.push(v);
          }
        })

        return Obj;

      }

      changeValue = async (text) => {
        const {resultObject} = this.state;
        this.setState({
            value: text
        });

        if(text.length > 3){
          var l = LINK+'api/search-user';
          var d = new FormData();
          var token = await getToken();
          d.append('token_code', token);
          d.append('search_key', text);
          var s = await fetch(l, {method:'POST', body:d});
          var v = s.status == 200 ? await s.json() : [];
          var j = v.status != 0 ? v.data : [];
          specialLog(j);
          this.setState({
            resultObject: j
          });
        }
      }

      DefaultScroll = () => {
        const {resultObject} = this.state;
        console.log("resuly", resultObject);
        if(resultObject.length === 0){
            return (<Text style={{ fontSize: 30, color: '#f35925' }}>Select Participants</Text>);
        }else{
          return (
            <ScrollView>
            <View style={{ flex:1, flexDirection: 'column' }}>
             {
               resultObject.map((e, k) => {
                 let backColor = require("@assets/logo.png");
                 if(e.selected){
                  backColor = require("@assets/correct.png");
                 }
                return ( 
                  <>
                <TouchableOpacity onPress={() => {
                  const {selectedUser} = this.state;
                  try{
                  var b = [...selectedUser];
                  var a = this.UpdateSelected(k);
                  var c = b.push(a);
                 
                  this.setState({selectedUser:b})
                  console.log("selected user", b);
                  return true;
                  }catch(error){
                    console.log(error);
                    return false;
                  }
                  
                  }}>

                <View style={[{flexDirection:'row', flex:1}, styles.items]}>
                 <Image style={{height:30, width:30, marginStart:5}} source={backColor} />
                <Text style={{marginStart:10, color:'#f35925'}}>
                {e.name}
                </Text>
                 </View>
              </TouchableOpacity>
                </>
               )
               })
             }
            </View>
            </ScrollView>
          );
        }
      }

      goback = () => {
        this.props.navigation.navigate('ScheduleMeeting',{selected: this.ResultsObject()});
      }

    render(){
      const {resultObject} = this.state;
        return(
            <>
             <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.headerIconStyle}>
                <Icon name="angle-left" type='font-awesome' size={30} color="#000" />
                </TouchableOpacity>
                <View style={{
                  width: '80%',
                  borderColor:'#f35925',
                  borderWidth:0.99,
                marginStart:'20%', borderRadius: 20,
                 backgroundColor: '#fff', marginTop: '20%', flex: 1, flexDirection: 'row', marginEnd: 20}}>
                <Icon name="search" style={{start:2, top:10, marginEnd:10}} type="font-awesome" size={16} color="#fff" />
                <TextInput style={styles.CustomTextInput}
                    onChangeText={text => this.changeValue(text)}
                    value={this.state.value}
                    placeholder = {"Seach..."}
                    placeholderTextColor = "grey" />
                    
                </View>
            </View>
            <View style={styles.contentContainer}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                  <this.DefaultScroll/>
              </ScrollView>
            </View>
        <View style={styles.buttonStyle}>
        <DefButton name={"Participants".toUpperCase()} callback={() => this.goback()} />
        </View>
        
          </ImageBackground>
            </>
        );
    }
}


const styles = StyleSheet.create({
    buttonStyle: {
    alignItems: "center",
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: '20%',
    height: 90,
    color: 'white',
    borderBottomColor: '#fff',
    borderRadius: 10
    },
    items:{
      backgroundColor: 'white',
      height: RFValue(60),
      width: RFValue(300),
      marginBottom: 3,
      borderRadius: 5,
      borderColor:'#f35925',
      borderWidth:0.99,
      alignContent:'center',
      alignItems:'center'
    },
    itemList: {
      marginStart: 20,
      marginTop: 10,
      fontSize: 20,
      color: '#fff'
    },
    CustomTextInput: {
        color: '#000',
        fontSize: 10,
        backgroundColor: "transparent"
    },
    image: {
      height: '100%',
      width: '100%',
    },
    searchSection: {
      height: 40,
      width: '93%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#595959',
      borderRadius: 30
    },
    searchIcon: {
      padding: 10,
    },
    button: {
      width: 100,
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 5,
    },
    input: {
      width: '100%',
      margin: 0,
      padding: 0,
      marginTop: '0%',
      textAlign: 'left',
      fontSize: 20,
      backgroundColor: '#fff',
      color: '#959595',
      height: '8%',
      fontSize: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    contentContainer: {
      marginTop: '20%',
      height: '70%',
      width: '100%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    scrollView: {
      height: '90%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    imageContainer: {
      height: 150,
      width: 200,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headingText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    datePicker: {
      height: 40,
      width: '90%',
      borderColor: 'white',
      borderWidth: 0
    },
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    },

    HeaderContainer: {
        top: responsiveHeight(2),
        height: '15%',
        width: '100%',
        zIndex: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      },
      headerIconStyle:{ 
        position: 'absolute', 
        left: 20, 
        top: 75 
      }
  })
