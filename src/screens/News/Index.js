import React, { Component, } from "react";
import { StyleSheet, ScrollView, Dimensions,  View, TextInput, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button, Card, ListItem, Image } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import Swiper from 'react-native-swiper';
import {LINK} from '../config';
import HeaderBar from '@header';
import theme from '@theme';
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

export default class News extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value:  "",
            result: 0,
            resultObject: {},
            categories: [],
            cate: [],
            news: [],
            newList:[],
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
            itemsPerInterval: 1,

        }


        const link = LINK+'api/news-category';
        fetch(link).then(a => {
          if(a.status == 200){
            return a.json();
          }else{
            Alert.alert('category did not load');
          }
        }).then(b => {
          this.setState({
            categories: b['data']
          })
          this.newList();
        }).catch(e => console.log('error => ', e));

        const form = new FormData();
        form.append('sub_category_id', 4);

        const NewsLink = LINK+'api/news';
        fetch(NewsLink, {
          method: 'POST',
          body:form
        }).then(a => {
          if(a.status == 200){
            return a.json();
          }else{
            Alert.alert('New Fetch failed state is not 200');
          }
        }).then(b => {
          this.setState({
            news:b['data']
          })

          console.log('news => ', this.state.news);
        }).catch(e => {

          console.log('+++++++++++++++++++++++++++error+++++++++++++++++++++++++')
          console.log(e)
          console.log('+++++++++++++++++++++++++++error+++++++++++++++++++++++++')

        })
        
      this.newList();
      }

      UNSAFE_componentWillMount(){
        console.log('categories =>', this.state.categories)
      }




      async newList(){
        console.log("categories", this.state.categories);
        let newNews = [];
        Object.values(this.state.categories ? this.state.categories : {}).map( async e => {
         
          var a = e.category_id;


          const l = LINK+'api/news';
          const form = new FormData();
         form.append('sub_category_id', 4);
          const z = await fetch(l,{method:'POST', body:form});
          const x = await z.status == 200 ? await z.json() : {};
          
          const saperateNews = [];
          const newsBody = x.data;
          Object.values(newsBody ? newsBody : {}).map(e => {
            
            saperateNews.push(e.image);
          })

          

          return newNews.push(saperateNews);;

        })

        console.log("news", newNews);

        this.setState({newList:newNews})
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

      MoveToNewsDetails = (id) => {
        return this.props.navigation.navigate('NewsDetails', {selectedNews: id});
    }

    MoveToNewsCategoryList = (id) => {
      return this.props.navigation.navigate('NewsCategory',{category: id});
    }

      Swipe = () => {
        const {categories, cate, list, news} = this.state;
        return(
          <View style={{height: displayHeight/3, borderRadius: 20, shadowColor: '#000'}}>
              <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={200}
              decelerationRate="fast"
              pagingEnabled>

              {/* {news.length == 0 ? <Text style={{ color:'#000' }}>No news available</Text> : null} */}

          {
            news.map((v, k) => {
              const image = LINK+'uploads/'+v.image;
              console.log("value => ", image);
              return (
                <TouchableOpacity onPress={() => this.MoveToNewsDetails(v.id)}>
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
      const {categories, cate, list} = this.state;
      console.log('Cotegories  hrer => ', categories);
      return(
        <View style={styles.Allcate}>
          <Text style={styles.catetext}>| All category</Text>
      <View style={{ flex: 1, flexDirection: 'column' }}>
      {categories.length == 0 ? <Text style={{ color:'#000', textAlign:'center', alignContent:'center' }}>No News Available</Text> : null}

      <ScrollView contentContainerStyle={{height: 120}}>
      <ScrollView horizontal contentContainerStyle={{width: 1000}}>
{
            categories.map((e) => {
              return (
                <TouchableOpacity style={{ borderRadius:20, width: '15%', marginEnd: 20 }} onPress={() => this.MoveToNewsCategoryList(e.id)}>
                <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 20, marginEnd: '2%' }}>
                <Image 
                source={{  uri: LINK+'uploads/'+e.image }}
                style={{ width: '100%', height: 100, borderRadius:20}}
                />
                <Text style={{ backgroundColor: 'White', textAlign: 'center', fontSize: 10 }}>{e.name}</Text>
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



    listView = () => {
      const {news} = this.state;
      return(
        <View style={styles.Allcate}>
         <View style={{ flex: 1, flexDirection: 'row' }}>
         <Text style={{ color: 'white', fontSize: 20 }}>
             | Latest News
           </Text>
           <Text style={{ color: 'white', marginStart: '50%' }}>
             All News &gt;
           </Text>

         </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>

          {/* list end */}

          {
            news.map(e => {
              return(
                <TouchableOpacity 
                    onPress={() => this.MoveToNewsDetails(e.id)}
                    >
                    <View style={{ backgroundColor: 'white', height: 100, borderRadius: 10, flexDirection: 'row', marginBottom: 10 , borderColor:'#f35925', borderWidth:0.9 }}>

                      <Text style={{ marginStart: '5%', color: 'black', fontSize: 15, width: '70%' }}>
                      {this.title(e.title)} ...
                      {'\n'}
                      <Text style={{ color: '#bfbbbb' }}>
                       {this.description(e.details)} ...
                      </Text>
                    </Text>

              <Text style={{ marginTop: 2,borderRadius: 5, color: 'white', position: 'absolute', zIndex: 99999, backgroundColor: '#f35925', marginStart: 190, width: -20 }}>{e.month}</Text>
              
                      <ImageBackground
                      imageStyle={{borderRadius:10}}
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
      const {newList} = this.state;
      console.log("news list render", newList);
        return(
            <>
            <ImageBackground style={styles.container} source={theme.BACKGROUND_IMAGE}>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
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
    backgroundColor: 'transparent',
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
    color: '#f35925',
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
    },
    searchSection: {
      height: 40,
      width: '93%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f35925',
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
      backgroundColor: '#f35925',
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
