import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput,PixelRatio, Dimensions, SafeAreaView, ImageBackground, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import {YOUTUBE} from '../../config';
import {LINK} from '../config';
import theme from '@theme';
import { RFValue } from "react-native-responsive-fontsize";
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

import {Loader} from '@common';

export default class VideoDetail extends Component{

    constructor(props) {
        // console.log("props : ", props.route.params)
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: {},
            isReady: false,
            status: null,
            quality: null,
            error: null,
            isPlaying: true,
            isLooping: true,
            duration: 0,
            currentTime: 0,
            fullscreen: false,
            playerWidth: Dimensions.get('window').width,
            VideoDetails: {},
            videoId: props.route.params.selectedNews,
            videoCategory:props.route.params.category,
            categoryList:[],
            videoList: [],
            categoryId: 2,
            loading:true,
            subcategoryID:''
        }

       
        this.newsList();
        this.fetchApiFunc();


        // this.youTubeAPi();
      }

      async componentWillReceiveProps(nextProps) {
        console.log('received props',nextProps.route.params);
        this.setState({
         videoId: nextProps.route.params.selectedNews,
         videoCategory:nextProps.route.params.category
        })
        await this.fetchApiFunc();
       await this.newsList();
      
 
 
       }
 



      fetchApiFunc(){
        this.setState({loading:true})
        var link = LINK+'api/videoby-id';
        var data = new FormData();
        data.append('video_id', this.state.videoId);
        fetch(link, {
          method: "POST",
          body: data
        }).then(s => {
          if(s.status == 200){
            return s.json();
          }else{
            Alert.alert("Response is not 200")
          }
        }).then(async s => {
          this.setState({
            VideoDetails: s['data'][0],
            loading:false,
            subcategoryID:s['data'][0].sub_category_id
          })


          await this.newsList();

          return;

          console.log('liat ---><dasdasd------------',s['data'][0].sub_category_id);
        }).catch(e => {
          // console.log("error => ", e)
          this.setState({loading:false})
          return e;
        })

      }

      youTubeAPi(){
        YouTubeStandaloneAndroid.playVideo({
          apiKey: 'AIzaSyCnLd1JO3djse5w3G94e5_aOY-whcO7n-Q', // Your YouTube Developer API Key
          videoId: '4Y4YSpF6d6w', // YouTube video ID
          autoplay: true, // Autoplay the video
          startTime: 120, // Starting point of video (in seconds)
        })
          .then((e) => console.log('Standalone Player Exited', e))
          .catch(errorMessage => console.error(errorMessage));
      }



      

      description = (t) => {
       
        var a = t.split("");
        var length = 100;
        var title = [];
        a.forEach((a, b) => {
          if(b < length){
            title.push(a);
          }
        })
     return title.join("");
      }
 
       title = (t) => {
        
        //  console.log("title",);
        
         var a = t.split("");
          var length = 10;
          var title = [];
          a.forEach((a, b) => {
            if(b < length){
              title.push(a);
            }
          })
       return title.join("");
        }


      async newsList(){
        this.setState({loading:true})
        var link = LINK+'api/video';
        var id = new FormData();
        id.append("sub_category_id", 1);
        const a = await fetch(link, {method:'POST', body:id});
        const b = await a.status == 200 ? await a.json() : [];
        this.setState({categoryList:b});
        this.setState({loading:false});
        return true;
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

      _youTubeRef = React.createRef();

      Article = () => {
        const {VideoDetails, categoryList} = this.state;
        const YOUR_API_KEY = YOUTUBE;
        return (
            <View style={{ backgroundColor: '#fff',  width: displayWidth-20, flex: 1, borderWidth: 0.1, borderRadius:20, shadowColor: 'black', shadowOpacity: 10, flexDirection: 'column' }}>
            <YouTube
              ref={this._youTubeRef}
              apiKey = {"AIzaSyCnLd1JO3djse5w3G94e5_aOY-whcO7n-Q"}
              // playlistId={VideoDetails.url}
              videoId={VideoDetails.url}
              play={this.state.isPlaying}
              loop={this.state.isLooping}
              fullscreen={this.state.fullscreen}
              controls={1}
              style={[
                { borderRadius: 20, height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) }
              ]}
              onError={e => {
                this.setState({ error: e.error });
              }}
              onReady={e => {
                this.setState({ isReady: true });
              }}
              onChangeState={e => {
                this.setState({ status: e.state });
              }}
              onChangeQuality={e => {
                this.setState({ quality: e.quality });
              }}
              onChangeFullscreen={e => {
                this.setState({ fullscreen: e.isFullscreen });
              }}
              onProgress={e => {
                this.setState({ currentTime: e.currentTime });
              }}
            />

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", padding:5, flexWrap: 'wrap', marginTop: '5%'}}>
                <Text style={{ 
                    fontSize: 20,
                    width: '100%'
                 }}>{VideoDetails.title}
                 {'\n'}
                <Text style={{ color: '#bfbbbb' }}>
                 {VideoDetails.details}
                 </Text>
                 </Text>
                 <Text style={{ marginTop: 2,borderRadius: 5, padding:5, color: 'white', position: 'absolute', zIndex: 99999, backgroundColor: '#f35925', marginStart: 270, width: -15 }}>
                 30 Jul
                 </Text>
            </View>
                 <View style={{backgroundColor: 'transparent', width: displayWidth, flex: 1, flexDirection: 'column', zIndex:999999999999}}>
            <Text style={{color: '#000', marginStart: 20, fontSize:RFValue(20)}}>| You may also like</Text>
            {
              Object.entries(categoryList).map((v,k) => {
                var d = v[1][0];
               var l = d ? d : {};
               console.log("list related to videos", l);
               if(Object.entries(l).length == 0){
                 return null;
               }
                return (
                  <TouchableOpacity onPress={() => {
                    // this.setState({videoId:l.id,videoCategory:l.category_id});
                    this.props.navigation.navigate('VideoDetail',  {selectedNews: l.id, category: l.category_id})
                  }}>
                  <View style={{ borderWidth:2, marginEnd:20, backgroundColor: 'transparent', borderColor:'#f35925', flexDirection: 'row', marginBottom: 5, marginTop: 5, height: 100, borderRadius: 10 }}>
                  <Text style={{ marginStart: '5%', color: 'black', fontSize: 20, fontWeight:'bold', width: '70%' }}>
                   {this.title(l.title)} ...
                   {'\n'}
                   <Text style={{ color: '#000', fontSize:15, fontWeight:'normal', marginBottom:10 }}>
                     {this.description(l.details)} ...
                     </Text>
                  </Text>
                  {/* <Image 
                    source={{ uri: LINK+'uploads/'+l.image }}
                    style={{backgroundColor: 'white', width: displayWidth/5, borderRadius: 5, height: '100%', borderBottomRightRadius: 10}}
                    /> */}
                    <ImageBackground
                  imageStyle={{ borderRadius:10,}} 
                  source={{ uri: LINK+'uploads/'+l.image }}
                    style={{marginEnd:-10, width: '50%', borderRadius: 10, height: '100%'}}
                    />
                  </View>
                  </TouchableOpacity>
                )
              })
            }
            </View>
                 {/* end list */}
            </View>
        );
      }

    render(){
      
        return(
            <>

            <ImageBackground imageStyle={{}} source={require('@assets/bg-screen.png')} style={styles.container}>
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.headerIconStyle}>
                <Icon name="angle-left" type='font-awesome' size={30} color="#000" />
                </TouchableOpacity>
            </View>
              <ScrollView contentContainerStyle={styles.scrollView}>
                  <this.Article/>
        </ScrollView>

        {this.state.loading && <Loader/>}
          
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
      height: '85%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: displayWidth
      

    },
    scrollView: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius:20,
      top:0
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
        height: '10%',
        width: '100%',
        zIndex: 100,
        backgroundColor: theme.HEADER_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center'
      },
      headerIconStyle:{ 
        position: 'absolute', 
        left: 20, 
        top: 10 
      }
  })
