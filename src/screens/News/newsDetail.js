import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput, Dimensions, ImageBackground, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { responsiveHeight, responsiveScreenFontSize } from "react-native-responsive-dimensions";

import {LINK} from '../config';
import theme from '@theme';
import { color } from 'react-native-reanimated';
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
import {Loader} from '@common';
import { RFValue } from "react-native-responsive-fontsize";
export default class NewsDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: {},
            selectedNews: props.route.params.selectedNews,
            newsDetails: {},
            category: '',
            isLoading: true,
            categoryList: []
        }

        

      this.runfun();
      }


    async runfun(){
      if(this.newsDetailsUpdate()){
        this.category();
        return true;
      }else{
        this.newsDetailsUpdate();
        this.category();
        return true;
      }
    }




    async newsDetailsUpdate(){
      try {
        const link = LINK+'api/newsby-id';
        // console.log('link => ', link);
        const id = new FormData();
        id.append('news_id', this.state.selectedNews);
        const a = await fetch(link, { method:'POST', body:id});
        const s = await a.status == 200 ? await a.json() : {};
        // console.log('status', s['data'][0].category_id);
        this.setState({ newsDetails: s['data'][0], category: s['data'][0].category_id, isLoading: false });
        return s;
      } catch (error) {
        // console.log("error => ", error);
        return error;
      }
    }



    // get all category data
    async category(){
      const {selectedNews, } = this.state;
      // console.log("--------------------------------------")
      // console.log("selected news", selectedNews);
      const l = LINK+'api/news';
      var news = new FormData();
      news.append('sub_category_id', selectedNews);
      const data = await fetch(l, {method:'POST', body:news});
      var da = await data.status == 200 ? await data.json() : {};
      this.setState({categoryList:da['data']});
      // console.log("news category", da);
      // console.log("--------------------------------------")
      this.newsDetailsUpdate();
      return true;


    }



 
     description = (t) => {
       var a = t.split("");
       var length = 80;
      //  console.log("tittle array => ", a);
       var title = [];
       a.forEach((a, b) => {
         if(b < length){
           title.push(a);
         }
       })
      //  console.log();
    return title.join("");
     }

      title = (t) => {
        // console.log("title",);
        return t;
        var a = t.split("");
         var length = 10;
        //  console.log("tittle array => ", a);
         var title = [];
         a.forEach((a, b) => {
           if(b < length){
             title.push(a);
           }
         })
        //  console.log();
      return title.join("");
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

      changetProduct(d){
        this.setState({selectedNews:d})
        this.category();
      }



      listView = () => {
        const {categoryList} = this.state;
        // console.log("===================");
        // console.log("category list type of", typeof categoryList)
        // console.log("===================");

        return(
         <>
           <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'column', zIndex:999999999999}}>
            <Text style={{color: '#fff', fontSize:RFValue(20)}}>| You may also like</Text>
            {
              Object.entries(categoryList).map((v,k) => {
                var d = v[1];
                {/* console.log("entries title => ", d) */}
                {/* console.log("entries title key => ", k) */}
                return (
                  <TouchableOpacity onPress={() => this.changetProduct(d.id)}>
                  <View style={{ margin:5, width:displayWidth-20, flexDirection: 'row', height: 70, borderRadius: 10, borderColor:'#f35925', borderWidth:0.9, borderEndColor:'#000' }}>
                  <Text style={{ marginStart: '5%', color: 'black', fontSize: 10, width: '70%' }}>
                   {this.title(d.title)}...
                   {'\n'}
                   <Text style={{ color: '#bfbbbb' }}>
                     {this.description(d.details)}...
                     </Text>
                  </Text>
                  <ImageBackground
                  imageStyle={{ borderRadius:10,}} 
                    source={{ uri: LINK+'uploads/'+d.image }}
                    style={{marginEnd:-10, width: '50%', borderRadius: 10, height: '100%'}}
                    />
                  </View>
                  </TouchableOpacity>
                )
              })
            }
            </View>
           </>
        );
      }


     
    render(){
      const {newsDetails, isLoading} = this.state;
      // console.log('lengt',newsDetails.title);
        return(
            <>
            
            <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.headerIconStyle}>
                <Icon name="angle-left" type='font-awesome' size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={[styles.contentContainer, {textAlign: 'center'}]}>
              <ScrollView contentContainerStyle={styles.scrollView}>

                        <View style={{ 
                          flex: 1, 
                          borderWidth: 0, 
                          shadowColor: 'transparent', 
                          shadowOpacity: 10, 
                          flexDirection: 'column',
                          borderRadius: 40,
                          textAlign: 'center'
                        }}>
                        <ImageBackground 
                          source={{ uri: LINK+'uploads/'+newsDetails.image }}
                          imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                          style={{ width: '100%', paddingBottom: 5, marginTop: 100, height: displayHeight/3}}
                          >
                          <View style={{ backgroundColor:'#fff', borderRadius:20, position:'absolute', zIndex:9999999999, flexDirection:'row', flex:1, marginStart: '80%', marginTop:20 }}>
              <Text style={{ color:'#fff', backgroundColor:'#f35925', borderRadius:20, padding:10, zIndex:99, position:'absolute' }}>Sep 30</Text>

                          </View>

                          </ImageBackground>                          
                          <View style={{ alignSelf: 'flex-start', color: '#000', backgroundColor: '#fff'}}>

                              <Text style={{ 
                                  fontSize: 20,
                                  marginStart: 10,
                                }}>
                                {'\n'}
                                {this.title(newsDetails.title)}
                                </Text>
                          </View>
                          <ScrollView contentContainerStyle={{ align:'flex-start' }}>
                          <View style={{ borderBottomColor:'#000', borderBottomWidth:0 }}>
                          <Text style={{ color: '#bfbbbb', fontSize:responsiveScreenFontSize(2) }}>
                                {newsDetails.details}
                                </Text>
                          </View>
                          <this.listView/>

                          </ScrollView>
                          </View>
                          
             
          </ScrollView>

          </View>

        {
              isLoading && <Loader Copacity={2}/>
            }
          </ImageBackground>
            </>
        );
    }
}


const styles = StyleSheet.create({
    buttonStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    width: '100%',
    textAlign: 'center',
    marginBottom: '5%',
    height: 50,
    color: 'white'
    },
    CustomTextInput: {
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        width: '80%',
        end: 5,
        top:5,
        start: 30,
        color: 'white',
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
      borderColor: '#595959'
    },
    searchIcon: {
      padding: 10,
    },
    button: {
      width: 100,
      height: 40,
      backgroundColor: 'transparent',
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
      width: '100%',
      backgroundColor: 'transparent',
      justifyContent: 'space-around',
      padding: 5,
      borderRadius: 20,
      marginTop: -40,
    },
    scrollView: {
      width: '100%',
      height:displayHeight
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
        top: -20,
        height: '15%',
        width: '100%',
        zIndex: 100,
        backgroundColor: theme.HEADER_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      },
      headerIconStyle:{ 
        position: 'absolute', 
        left: 20, 
        top: 50 
      }
  })
