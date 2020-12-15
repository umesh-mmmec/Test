import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput, ImageBackground, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchScheduleMeeting } from '@action';
// import firestore from '@react-native-firebase/firestore';
import { Loader, Header } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import { duration } from "moment";
import { responsiveHeight, } from "react-native-responsive-dimensions";
import {LINK} from '../config';
import theme from '@theme';




export default class NewsCategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: [],
            categoryId: props.route.params.category
        }

        var link = LINK+'api/news';
        var id = new FormData();
        id.append("sub_category_id", this.state.categoryId);
        fetch(link, {
          method: "POST",
          body:id
        }).then(s => {if(s.status == 200){
          return s.json();
        }else{
          Alert.alert("response is not 200")
        }}).then(s => {
          this.setState({
            resultObject: s['data']
          })

          console.log("dtaa => ", this.state.resultObject);
        }).catch(e => console.log('erro'));
        
      }

      changeValue = async (text) => {
        this.setState({
            value: text
        });

        

        if(text.length > 3){
         
          
        }
      }

      DefaultScroll = () => {
        if(this.state.result === 0){
            return (<Text style={{ fontSize: 30, color: 'white' }}>No Data Found</Text>);
        }else{
            return null;
        }
      }

      MoveToNewsDetails = (id) => {
        return this.props.navigation.navigate('NewsDetails', {selectedNews: id});
    }

    title = (t) => {
      var a = t.split("");
       var length = 15;
       console.log("tittle array => ", a);
       var title = [];
       a.forEach((a, b) => {
         if(b < length){
           title.push(a);
         }
       })
       console.log();
    return title.join("");
     }
 
 
     description = (t) => {
       var a = t.split("");
       var length = 80;
       console.log("tittle array => ", a);
       var title = [];
       a.forEach((a, b) => {
         if(b < length){
           title.push(a);
         }
       })
       console.log();
    return title.join("");
     }

      listView = () => {
        const {resultObject} = this.state;
        return(
          <View style={styles.Allcate}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
  
            {/* list end */}


            {
              resultObject.map(e => {
                return(
                  <TouchableOpacity 
                  onPress={() => this.MoveToNewsDetails(e.id)}
                  >
                  <View style={{ backgroundColor: 'white', borderColor:'#f35925', borderWidth:2, height: 100, borderRadius: 10, flexDirection: 'row', marginBottom: 10 }}>
                    
                    <Text style={{ marginStart: '5%', color: 'black', fontSize: 15, width: '70%' }}>
                    {this.title(e.title)}...
                     {'\n'}
                     <Text style={{ color: '#bfbbbb' }}>
                     {this.description(e.details)}...
                     </Text>
                   </Text>
                    <Text style={{ marginTop: 2,borderRadius: 5, color: 'white', position: 'absolute', zIndex: 99999, backgroundColor: '#f35925', marginStart: 190, width: -20 }}>30 Jul</Text>
                    <ImageBackground
                  imageStyle={{ borderRadius:10,}} 
                  source={{ uri: LINK+'uploads/'+e.image }}
                    style={{marginEnd:-10, width: '50%', borderRadius: 10, height: '100%'}}
                    />
                    </View>
                    </TouchableOpacity>
                );
              })
            }
           
  
              {/* list end */}  
              
            </View>
          </View>
        );
      }

    render(){
        return(
            <>
            <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.headerIconStyle}>
                <Icon name="angle-left" type='font-awesome' size={30} color="#000" />
                </TouchableOpacity>
                <TextInput
                    style={styles.CustomTextInput}
                    onChangeText={text => this.changeValue(text)}
                    value={this.state.value}
                    placeholder = {"Seach News"}
                    placeholderTextColor = "#f35925"
                />
            </View>
            <View style={styles.contentContainer}>
              <ScrollView>
                <this.listView/>
              </ScrollView>
            </View>
          </ImageBackground>
            </>
        );
    }
}


const styles = StyleSheet.create({
    allCategorySwipe: {
        height: 120,
      },
    
      subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingImage: {
        height: 19.21,
        width: 100
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      },
    
      cateSwipeOne:{
        width: '100%',
      },
      Allcate: {
        marginTop: 30,
        marginEnd: 0
      },
      catetext: {
        color: 'white',
        fontSize: 20
      },
      Swipe: {
        height:'25%',
        borderRadius: 50,
        borderRadius: 20
      },
      SwipePaginate: {
          marginBottom: -50,
      },
      wrapper: {
        borderRadius: 50,
        borderRadius: 20
      },
      swipeDot: {
        width: 20,
        backgroundColor: 'black',
    
      },
      swipeDotActive: {
        width: 20,
        backgroundColor: 'blue',
      },
      slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        borderRadius: 15
      },
      slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
      },
      slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
      },
    
    
        buttonStyle: {
        alignItems: "center",
        backgroundColor: "#5256db",
        width: '100%',
        textAlign: 'center',
        marginBottom: '5%',
        height: 50,
        color: 'white'
        },
        CustomTextInput: {
            borderBottomWidth: 3,
            borderBottomColor: '#f35925',
            width: '80%',
            end: 5,
            top:5,
            start: 30,
            color: '#f35925',
            fontSize: 20,
            fontWeight: 'bold'
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
          fontSize: 20
        },
        container: {
          flex: 1,
          justifyContent: 'center'
        },
        contentContainer: {
          height: '100%',
          backgroundColor: 'transparent',
          justifyContent: 'space-around',
          padding: 20,
          flex:1,
          flexDirection: 'column'
        },
        scrollView: {},
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
            backgroundColor: theme.HEADER_BACKGROUND,
            alignItems: 'center',
            justifyContent: 'center'
          },
          headerIconStyle:{ 
            position: 'absolute', 
            left: 20, 
            top: 50 
          }
  })
