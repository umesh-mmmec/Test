import React, { Component, } from "react";
import { Dimensions, StyleSheet, ScrollView, View, TextInput, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button, Card, ListItem, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchScheduleMeeting } from '@action';
// import firestore from '@react-native-firebase/firestore';
import { Loader, Header } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import { duration } from "moment";
import { responsiveHeight, } from "react-native-responsive-dimensions";
import Swiper from 'react-native-swiper';

import {LINK} from '../config';
import theme from '@theme';
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
export default class Videos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: {},
            VideoCategory: [],
            Videos:[],
            list: [
              {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
              },
              {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
              },
            ],
            intervals: 1,
            width: '',
            items: {},
            itemsPerInterval: 1

        }

        const link = LINK+'api/video-category';

        fetch(link).then(a => {
          if(a.status == 200){
            return a.json();
          }else{
            Alert.alert('Sttus is not 200');
          }
        }).then(a => {
          this.setState(
            {
              VideoCategory: a['data']
            }
            )

            console.log( 'data video category |||||||=> ', this.state.VideoCategory )
        
        }).catch(e => {
          console.log(e)
        });


        const linkVideo = LINK+'api/video';
        const h = new FormData();
        h.append('sub_category_id', 5);
        fetch(linkVideo, {
          method: 'POST',
          body: h
        }).then(a => {
          if(a.status == 200){
            return a.json();
          }else{
            Alert.alert('Status is not 200');
          }
        }).then(a => {
          console.log('data video => ', a);
          this.setState({
            Videos: a['data']
          });
        }).catch(e => console.log('error => ', e));


      }

      
      changeValue = async (text) => {
        this.setState({
            value: text
        });
      }

      DefaultScroll = () => {
        if(this.state.result === 0){
            return (<Text style={{ fontSize: 30, color: 'white' }}>No Data Found</Text>);
        }else{
            return null;
        }
      }

      init = (width) => {
        // initialise width
        this.setState({width : width});
        // initialise total intervals
        const totalItems = {}.length;
        this.setState({intervals: Math.ceil(totalItems / this.state.itemsPerInterval)});
      }

      MoveToNewsDetails = (id, category) => {
        return this.props.navigation.navigate('VideoDetail', {selectedNews: id, category: category});
    }

    MoveToNewsCategoryList = (id) => {
      return this.props.navigation.navigate('VideoCategory', {category: id});
    }

      Swipe = () => {
        var {Videos} = this.state;
        return(
          <View style={{height: displayHeight/3, borderRadius: 20, shadowColor: '#000'}}>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled
        >

          {
            Videos.map((v, k) => {
              const image = LINK+'uploads/'+v.image;
              console.log("value => ", image);
              return (
                <TouchableOpacity onPress={() => this.MoveToNewsDetails(v.id, v.category_id)}>
                <View style={{flex:1, borderRadius: 20, zIndex: 999999, flexDirection:'row', height: 300, width: displayWidth-40}}>
                  <ImageBackground imageStyle={{ borderRadius: 25, height: displayHeight/3, marginRight: 5 }} source={{uri: image}} style={[styles.image]}>
                   
                  </ImageBackground>
                </View>
                </TouchableOpacity>
              );
            })
          }
        


        </ScrollView>
        </View>
        );
      }

    Allcate = () => {
      const {VideoCategory} = this.state;
      return(
        <View style={styles.Allcate}>
          <Text style={styles.catetext}>| All category</Text>
          <View style={{ flex: 1, flexDirection: 'column' }}>
      {VideoCategory.length == 0 ? <Text style={{ color:'#000', textAlign:'center', alignContent:'center' }}>No Videos Available</Text> : null}

          <ScrollView contentContainerStyle={{height: 120}}>
        <ScrollView horizontal contentContainerStyle={{width: 1000}}>

        {
          VideoCategory.map(e => {
            return(
              <TouchableOpacity style={{ width: '15%', marginEnd: 20, shadowColor: '#000' }} onPress={() => this.MoveToNewsCategoryList(e.id)}>
              <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 20, marginEnd: '2%', shadowColor: '#000' }}>
                  <Image 
                  
                  source={{ uri: LINK+'uploads/'+e.image }}
                  style={{ width: '100%', height: 100, borderRadius:20 }}
                  />
                  <Text style={{ backgroundColor: 'White', textAlign: 'center', fontSize: 15 }}>{e.name}</Text>
                  </View>
                  </TouchableOpacity>      
            );
          })
        }
     
            
           
            </ScrollView>
            </ScrollView>
          </View>
        </View>
      );
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
      const {Videos} = this.state;
      return(
        <View style={styles.Allcate}>
         <View style={{ flex: 1, flexDirection: 'row' }}>
         <Text style={{ color: 'white', fontSize: 20 }}>
             | Latest Videos
           </Text>
           <Text style={{ color: 'white', marginStart: '40%' }}>
             All Videos &gt;
           </Text>

         </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>

          {/* list end */}

            {
              Videos.map(e => {

                console.log("vodeos list", e.category_id);
                return(
                  <TouchableOpacity 
          onPress={() => this.MoveToNewsDetails(e.id, e.category_id)}
          >
          <View style={{ backgroundColor: 'white', borderColor:'#f35925', borderWidth:0.9, height: 100, borderRadius: 10, flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ marginStart: '5%', marginTop: '5%', color: '#000', fontSize: 15, width: '70%' }}>
             {this.title(e.title)}
             {'\n'}
             <Text style={{ color: '#000', fontSize:10, paddingTop: 10}}>
               {this.description(e.details)}...
             </Text>
           </Text>
            <Text style={{ marginTop: 2, height: 30, borderRadius: 5, color: 'white', position: 'absolute', zIndex: 99999, backgroundColor: '#f35925', marginStart: 170, padding:5 }}>30 Jul</Text>
            <ImageBackground
              imageStyle={{borderRadius:10}}
              source={{ uri: LINK+'uploads/'+e.image }}
              resizeMode={'cover'}
              style={{marginEnd:-10, width: '50%', borderRadius: 10, height: '100%'}}
            />
            </View>
            </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      );
    }






    render(){
        return(
            <>
            <ImageBackground source={require('@assets/bg-screen.png')} style={styles.container}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.headerIconStyle}>
                <Icon name="angle-left" type='font-awesome' size={30} color="#000" />
                </TouchableOpacity>
                <TextInput
                    style={styles.CustomTextInput}
                    onChangeText={text => this.changeValue(text)}
                    value={this.state.value}
                    placeholder = {"Seach Videos"}
                    placeholderTextColor = "#f35925"
                />
                 
            </View>
            <View style={styles.contentContainer}>
              <this.Swipe/>
              <ScrollView contentContainerStyle={styles.scrollView}>
              <this.Allcate/>
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
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
      height: '100%',
      width: '100%',
      paddingRight: 5,
      marginRight: 5
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
