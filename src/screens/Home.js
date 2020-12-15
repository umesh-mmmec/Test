import React, { Component } from "react";
import {
  TouchableHighlight, SafeAreaView, StyleSheet,
  ImageBackground, TouchableOpacity, View, Text, Image,
  ScrollView, StatusBar, BackHandler, FlatList, RefreshControl, Modal, ToastAndroid,
  Dimensions, Alert
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
// import firestore from '@react-native-firebase/firestore';
import { Join, Create, Loader, customAlert, HomeIcon } from '@common';
import { Participant_name, acceptMeetings, rejectMeetings, linkImage,specialLog, fetchScheduleMeeting, authUser, deleteScheduleMeeting, checkUser, getUserData, getMeetings, todayMeetings, nextDayMeetings } from '@action';
import moment from 'moment';
import theme from '@theme';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
import PictureInPicture from 'react-native-picture-in-picture';
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      isLoggedIn: false,
      loginType:null,
      facebookData:null,
      userData:{},
      meetingsToday: [],
      meetingsNextDay: [],
      refreshing:false,
      modal:false,
      currentAgenda: ''
    };
    this.loginStatus();
    this.meetings();
    this.authUserData();
  }



  onButtonPress = () => {
   return null;
  }


  handleBackButton = () => {
   
     return true;
   } 


  authUserData = async () => {
    const a = await authUser();
    if(a !== false){
      this.setState({userData: a.data});
    }
  }


  async pipHandler(){
    try{
     await PictureInPicture.start();
    return true
    }catch(error){
      console.log("pip error", error);
      return false;
    }
  }

  meetings = async () => {
    const a = await todayMeetings();
    const b = await nextDayMeetings();
    
    specialLog({
      meetingsToday: a,
      mmeetingsNextday: b
    })

    console.log({
      today : a,
    });

    this.setState({
      meetingsToday: a,
      meetingsNextDay: b
    }) 

    
  }
  // check login status
  async loginStatus(){
    // console.log("login status");
    const check = await checkUser();
    specialLog("usercheck    ------------------       "+check);
        if(check){
          this.setState({isLoggedIn: true});
          const o = await getUserData();
          // console.log("User data => ", o);
        }
  }


  async getdata(){
    const {loginType} = this.state;
    if(loginType == "facebook"){
      const facebookData =  await AsyncStorage.getItem('@facebook');
      let a = {};
      if(typeof facebookData == 'string'){
        // convert to object
        a = JSON.parse(facebookData);
      }else{
        a = facebookData
      }

      var udata;
      udata = {
        name: a.name,
        pic: a.picture.data.url
      }

      this.setState({
          facebookData:a,
          userData:udata
        });


      // console.log("facebook data => ", a);
    }
  }

  async componentDidMount() {
    this.props.fetchScheduleMeeting();
    BackHandler.addEventListener('hardwareBackPress', this.pipHandler);
    // console.log("useris => |||||||||||||||||", await checkUser());
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.pipHandler)
  }
  

  async register() {
    if (await checkUser() === false) {
      this.props.navigation.navigate("Register")
    }
    else {
      customAlert('You are already Registered')
    }
  }

  async login() {
    if (await checkUser() === false) {
      this.props.navigation.navigate("Login")
    }
    else {
      customAlert('You are already Logged in')
    }
  }


  async forget() {
    if (await checkUser() === false) {
      this.props.navigation.navigate("ForgetPassword")

    }
    else {
      customAlert('You are already Logged in');
    }
  }

  
  async social() {
    if (await checkUser() === false) {
      this.props.navigation.navigate("SocialLogin")
    }
    else {
      customAlert('You are already Logged in')
    }
  }


  async schedule() {
    if (await checkUser() === true) {
      this.props.navigation.navigate("ScheduleMeeting")
    }
    else {
      customAlert('Please Login to schedule')
    }
  }


  async shareScreen() {
    if (await checkUser() === true) {
      this.props.navigation.navigate("FileShared")
    }
    else {
      customAlert('Please Login to Share')
    }
  }


  async createMeeting(meetingID) {
    const { getUserProfile } = this.props;
    this.setState({ loading: true });
    let data = null;
    if (getUserProfile) {
      const userID = await AsyncStorage.getItem('@userID');
      data = {
        'meetingID': meetingID,
        'createdAt': firestore.FieldValue.serverTimestamp(),
        'meetingType': 'Create',
        'userType': 'Registered',
        'userID': userID
      };
    } else {
      data = {
        'meetingID': meetingID,
        'createdAt': firestore.FieldValue.serverTimestamp(),
        'meetingType': 'Create',
        'userType': 'Guest',
        'userID': ''
      };
    }
    await firestore().collection('VideoSessions').add(data)
      .then((res) => {
        const uid = res._documentPath._parts[1];
        if (uid) {
          this.setState({ loading: false });
          setTimeout(() => {
            this.props.navigation.navigate("Calling", { meetingID: meetingID });
          }, 1500);
        }
      })
      .catch(error => console.error(error));
  }

  cancelMeeting(id) {
    this.setState({ loading: true });
    this.props.deleteScheduleMeeting(id, () => { this.setState({ loading: false }) })
  }

  joinMeeting(id) {
    this.createMeeting(id);
  }

  News(){
    this.props.navigation.navigate("News")
  }
  Videos(){
    this.props.navigation.navigate("Videos")
  }

  selectedId = () => {
    return null;
  }

  o = (a) => {
    let b = [];
    b.map(e => {
      b.push(e.name);
    })

    return b
  }


  joinMeet = (id) =>{
    this.props.navigation.navigate("Calling", { meetingID: id });
  }


  agenda = (a) => {
    this.setState({
      modal:true,
      currentAgenda:a
    })
  }

  async loginType(){
    // check login type
  }

  refresh(){
    this.props.navigation.navigate('modules', {refresh:true});
  }



  async accept(id){
    const a = await acceptMeetings(id);
    ToastAndroid.show(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    this.refresh();
    return true;
  }

  async reject(id){
    const a = await rejectMeetings(id);
    ToastAndroid.show(a.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
    this.refresh();
    return true;
  }


  capitalize(s){
    if (typeof s !== 'string') return '';
    console.log("+++++++++++++++  console.log split ", s.split(" "));
    var a = [];
    s.split(" ").map(v => {
     var b = a.push(v.charAt(0).toUpperCase()+v.slice(1));
     return b;
    })
    return a.join(" ");
  }


  


  allTodayMeetings = () => {
    const {meetingsToday} = this.state;
    var total = Object.keys(meetingsToday).length;
    console.log("----------------------------");
    specialLog(Object.keys(meetingsToday));
    console.log("-------------------------////////////////////////////]]]]]]]]]]]]]]]]")
    if(Object.keys(meetingsToday).length !== 0){
      return (
        <>
        {
          Object.values(meetingsToday).map(e => {
            var colo = e.my_status.status == 2 ? true : false;
            var image = e.my_status.status;
            var totalParticipant = e.perticipent_name.length;
            var lastParticipant = totalParticipant-1;
            console.log("{{{{{{{{{{{{{{{{{-- ----------meetings today start map --}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
            console.log(image);
            console.log("{{{{{{{{{{{{{{{{{-- ----------meetings today end map --}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
            return (
              <View style={[styles.meetingListContainer, {backgroundColor: '#f1d6d6'}]}>
              <View style={{ flex:1, backgroundColor:'transparent', height:50, flexDirection: 'row', marginTop: '-2%', alignItems: 'center', justifyContent: 'space-around' }}>
            
            <TouchableOpacity onPress={() => this.agenda(e.meeting_details.agenda)}>
            <Image style={{ width: 80, height: 25 }} resizeMode={'center'} source={require('@assets/schedule/agenda.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
            <Image style={{ width: 80, height: 25 }} resizeMode={'stretch'}  source={require('@assets/schedule/takeaway.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
            <Image style={{ width: 80, height: 25, marginEnd:-20, zIndex:999999999 }} resizeMode={'center'} source={require('@assets/schedule/view.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.meetingInside}>
          <View style={[styles.meetingDetailView, {marginTop: '0%'}]}>
            <Text style={styles.meetingDetails2}>{e.meeting_details.title.toUpperCase()} 
            {image == 2 ? <Text style={{ color: 'red' }}>( Cancelled )</Text> : (image == 1 ? <Text style={{ color: '#228B22' }}> ( Accepted )</Text> : null)}</Text>
            <Text style={styles.meetingDetails}>Start Time   {" "}:
            <Text style={styles.meetingDetailsOne}> {e.meeting_details.meeting_start_date} ({e.meeting_details.starting_time})</Text>
            
            </Text>
            <Text style={styles.meetingDetails}>End Time     {" "}:
            <Text style={styles.meetingDetailsOne}> {e.meeting_details.meeting_end_date} ({e.meeting_details.ending_time})</Text>
            
            </Text>

            <Text style={styles.meetingDetails}>Password     :<Text style={styles.meetingDetailsOne}> {e.meeting_details.password}</Text></Text>
            <Text style={styles.meetingDetails}>Meeting ID   :<Text style={styles.meetingDetailsOne}> {e.meeting_details.meeting_id.toUpperCase()}</Text></Text>
            <Text style={styles.meetingDetails}>Participants :<Text style={styles.meetingText}>
              {
                
                Object.values(e.perticipent_name).map((e, k) => {

                  var color = e.status == 0 ? '#000' : '#228B22';
                  var op = lastParticipant == k ? ' ' : ', ';
                  color = e.status == 2 ? 'red' : color
                  return(<Text style={{ color: color }}> {e.name}{op} </Text>);
                })
              }
              </Text>
            </Text>
          </View>
          <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id)}}>
              <Image style={{ width: 80, height: 25 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
              </TouchableOpacity> 
            {/* {
              image == 0 
              ? <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id)}}>
              <Image style={{ width: 150, height: 50 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
              </TouchableOpacity> 
              : (
                image == 1 
                ? <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id)}}>
                <Image style={{ width: 150, height: 50 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
                </TouchableOpacity> 
                : <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id}}>
                <Image style={{ width: 150, height: 50 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
                </TouchableOpacity>
              )
            } */}
           
            <TouchableOpacity onPress={() => {
              this.reject(e.meeting_details.id)
              return true;
              this.cancelMeeting(item.meetingID)
            }}>
            <Image style={{ width: 80, height: 25 }} resizeMode={'center'} source={require('@assets/schedule/cancel.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
            );
          })
        }
      </>
      );
    }else{
      return (
        <View>
          <Text style={{ color:theme.FONT }}>No meetings</Text>
        </View>
      );
    }
  }


  joinMeetings = () => {
    
  }


  allNextDayMeetings = () => {
    const {meetingsNextDay} = this.state;
    if(Object.keys(meetingsNextDay).length !== 0){
      return (
        <>
        {
          Object.values(meetingsNextDay).map(e => {
            var totalParticipant = e.perticipent_name.length;
            var lastParticipant = totalParticipant-1;
            console.log("total particiapnts, ", totalParticipant);
            var colo = e.my_status.status == 2 ? true : false;
            var image = e.my_status.status;
            console.log("{{{{{{{{{{{{{{{{{-- ----------meetings today start map --}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
            console.log(e);
            console.log("{{{{{{{{{{{{{{{{{-- ----------meetings today end map --}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
            var colo = e.my_status.status == 2 ? true : false; 
            return (
              <View style={[styles.meetingListContainer, {backgroundColor: '#f1d6d6'}]}>
              <View style={{ flex:1, backgroundColor:'transparent', height:50, flexDirection: 'row', marginTop: '-2%', alignItems: 'center', justifyContent: 'space-around' }}>
              
            <TouchableOpacity onPress={() => this.agenda(e.meeting_details.agenda)}>
            <Image style={{ width: 80, height: 25 }} resizeMode={'center'} source={require('@assets/schedule/agenda.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
            <Image style={{ width: 80, height: 25 }} resizeMode={'stretch'}  source={require('@assets/schedule/takeaway.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
            <Image style={{ width: 80, height: 25, marginEnd:-20 }} resizeMode={'center'} source={require('@assets/schedule/view.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.meetingInside}>
          <View style={[styles.meetingDetailView, {marginTop: '0%'}]}>
            <Text style={styles.meetingDetails2}>{e.meeting_details.title.toUpperCase()} 
            {image == 2 ? <Text style={{ color: 'red' }}>( Cancelled )</Text> : (image == 1 ? <Text style={{ color: '#228B22' }}> ( Accepted )</Text> : null)}
            </Text>
            <Text style={styles.meetingDetails}>Start Time   {" "}:
            <Text style={[styles.meetingDetailsOne, {color: '#000'}]}>{e.meeting_details.meeting_start_date} ({e.meeting_details.starting_time})</Text>

            </Text>
            <Text style={styles.meetingDetails}>End Time     {" "}:
            <Text style={styles.meetingDetailsOne}>{e.meeting_details.meeting_end_date} ({e.meeting_details.ending_time})</Text>
            
            </Text>
            <Text style={styles.meetingDetails}>Password      :<Text style={styles.meetingDetailsOne}>{e.meeting_details.password}</Text></Text>
            <Text style={styles.meetingDetails}>Meeting ID    :<Text style={styles.meetingDetailsOne}>{e.meeting_details.meeting_id.toUpperCase()}</Text></Text>
            <Text style={styles.meetingDetails}>Participants  : <Text style={styles.meetingText}>
            {
                Object.values(e.perticipent_name).map((e, k) => {
                  console.log("data==============");
                  specialLog(k);
                  console.log("data====================")
                  var op = lastParticipant == k ? ' ' : ', ';
                  var color = e.status == 0 ? '#000' : '#228B22';
                  color = e.status == 2 ? 'red' : color;
                return(<Text style={{ color: color }}> {e.name}{op} </Text>);
                })
              }
              </Text></Text>
          </View>
          <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id)}}>
              <Image style={{ width: 80, height: 25 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
              </TouchableOpacity> 

          {/* {
              image == 0 
              ?  
              : (
                image == 1 
                ? <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id)}}>
                <Image style={{ width: 150, height: 50 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
                </TouchableOpacity> 
                : <TouchableOpacity onPress={() => {this.joinMeet(e.meeting_details.meeting_id)}}>
                <Image style={{ width: 150, height: 50 }} resizeMode={'center'} source={require('@assets/schedule/join.png')} />
                </TouchableOpacity>
              )
            } */}

            
            <TouchableOpacity onPress={() => {
              this.reject(e.meeting_details.id)
              return true;
              this.cancelMeeting(item.meetingID)
            }}>
            <Image style={{ width: 80, height: 25 }} resizeMode={'center'} source={require('@assets/schedule/cancel.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
            );
          })
        }
      </>
      );
    }else{
      return (
        <View>
          <Text style={{ color:theme.FONT }}>No Meetings</Text>
        </View>
      );
    }
  }

  render() {
    const { getUserProfile, userImagePath, todayMeeting, nextMeeting } = this.props;
    const {isLoggedIn, facebookData, userData, meetingsToday, meetingsNextDay} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={isLoggedIn == false ? theme.BACKGROUND_IMAGE : null} style={styles.background}>
          <StatusBar translucent={true} backgroundColor={theme.STATUS} />
          {
            isLoggedIn == true ? <View style={styles.topView}>
            <View style={{ flexDirection: 'row', top:'20%'}}>
              <View style={styles.imageView}>
                {
                 <Image
                  style={styles.image}
                  resizeMode='cover'
                  source={userData.image ? {uri: linkImage(userData.image)} : require('@assets/profile2.png')}  >
                </Image>
                }
              </View>
              <View style={styles.userInfo}>
                <Text style={[styles.name, {color:'#f35925'}]}>{userData.name ? this.capitalize(userData.name) : 'User Name'}</Text>
                <Icon name="pencil" iconStyle={{ marginStart:10 }} onPress={() => this.props.navigation.navigate('Edit', {refresh:true})} type='font-awesome' size={20} color={'#fff'} />
              {/* <Text style={{ color: theme.TITLE, fontSize: RFValue(15) }}>{moment().format('LLLL')}</Text> */}
              </View>
            </View>

            <View style={styles.profileOption}>
              <TouchableHighlight onPress={() => {
                this.props.navigation.navigate("Profile")
              }}
                style={styles.profileClick}
              >
                <Icon name="dehaze" type='material' style={{ width:50 }} size={30} color={'#f35925'} />
              </TouchableHighlight>
                  {/* <Image style={{ width:100, height:20 }} src={require('@assets/logo.png')} /> */}
            </View>
            <View style={[styles.logoViewOne, {}]}>
             <Image
                  style={styles.image_one}
                  resizeMode='cover'
                  source={require('@assets/logo.png')}/>
            </View>
            </View>
             : 
             <View style={[styles.logoView, {}]}>
             <Image
                  style={styles.image}
                  resizeMode='cover'
                  source={require('@assets/logo.png')}/>
            </View>
          }


    <View style={{ height: '100%', marginTop: isLoggedIn ? RFValue(80) : RFValue(120), marginStart: -20 }}>
        <ScrollView style={{ height:'100%' }} 
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={() => {
            this.props.navigation.navigate('modules', {refresh:true})
          }} />
        }
        >
          <View style={styles.optionMainView}>

         <View style={styles.row}>
            <HomeIcon image={require('@assets/meeting.png')} title={"Schedule Meeting"} callback={() => { this.schedule() }}/>
           <HomeIcon image={require('@assets/video-call.png')} title={"Create Meeting"} callback={() => { this.Create.show() }}/>
           <HomeIcon image={require('@assets/team.png')} title={"Join Meeting"} callback={() => { this.Join.show() }}/>
           <HomeIcon image={require('@assets/conference.png')} title={"History"} callback={() => { this.props.navigation.navigate("MeetingHistory") }}/>
           </View>
        {
          isLoggedIn == false ? <View style={styles.row}>
          { isLoggedIn == false ?  <HomeIcon image={require('@assets/add.png')} title={"Register"} callback={() => { this.register() }}/> : null }
           { isLoggedIn == false ? <HomeIcon image={require('@assets/user1.png')} title={"Login"} callback={() => { this.login() }}/> : null }
          {isLoggedIn == true ? <HomeIcon empty /> : null}
          {isLoggedIn == true ? <HomeIcon empty /> : null}
          {isLoggedIn == true ? <HomeIcon empty /> : null}
          { isLoggedIn == false ?  <HomeIcon image={require('@assets/key.png')} title={"Forgotten Password ?"} callback={() => { this.forget() }}/> : null }
          <HomeIcon image={require('@assets/calendar.png')} title={"Calender"} callback={() => {  }}/>

            </View> : null
        }
           

          <View style={styles.row}>
           <HomeIcon image={require('@assets/news.png')} title={"News"} callback={() => { this.News() }}/>
            <HomeIcon image={require('@assets/videos.png')} title={"Video"} callback={() => { this.Videos() }}/>
            <HomeIcon image={require('@assets/Chat.png')} title={"Chat"} callback={() => {  }}/>
           <HomeIcon image={require('@assets/share.png')} title={"File Share"} callback={() => { this.shareScreen() }}/>
            </View>

          {
          isLoggedIn == true ? <View style={styles.row}>
          <HomeIcon image={require('@assets/calendar.png')} title={"Calender"} callback={() => {  }}/>
          { isLoggedIn == false ?  <HomeIcon image={require('@assets/add.png')} title={"Register"} callback={() => { this.register() }}/> : null }
           { isLoggedIn == false ? <HomeIcon image={require('@assets/user1.png')} title={"Login"} callback={() => { this.login() }}/> : null }
          {isLoggedIn == true ? <HomeIcon empty /> : null}
          {isLoggedIn == true ? <HomeIcon empty /> : null}
          {isLoggedIn == true ? <HomeIcon empty /> : null}
          { isLoggedIn == false ?  <HomeIcon image={require('@assets/key.png')} title={"Forgotten Password ?"} callback={() => { this.forget() }}/> : null }

            </View> : null
        }


           
        {
          isLoggedIn == true ? <View style={styles.meetingContainer}>
          <ScrollView style={{ marginTop:RFValue(60), width:displayWidth, paddingStart: 30, paddingEnd: 0 }}>
              <View style={styles.titleView1}>
                <Text style={styles.title1}>
                  Today's Meeting
              </Text>
                <Text style={styles.dash2}>
                  ──
                </Text>
              </View>
                <ScrollView
                  contentContainerStyle={styles.scrollBOt}
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  scrollEventThrottle={200}
                  decelerationRate="fast"
                  pagingEnabled
                >
                <this.allTodayMeetings/>
                </ScrollView>
              <View style={styles.nextMeetingView}>
                <Text style={styles.title1}>Next Day Meeting</Text>
                <Text style={styles.dash2}>──</Text>
              </View>
              <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  scrollEventThrottle={200}
                  decelerationRate="fast"
                  pagingEnabled
                >
                <this.allNextDayMeetings/>
                </ScrollView>
              </ScrollView>

            </View> : <ScrollView style={{ marginTop:40 }}></ScrollView>
        }

          </View>



        </ScrollView>
      </View>

      {/* modal start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modal}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
      <Text style={styles.modalText}>{this.state.currentAgenda ? this.state.currentAgenda : 'agenda...'}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "orange" }}
                onPress={() => {
                 this.setState({modal:false})
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {/* modal end */}
      {/* for joining and creating meetings start*/}
      <Join {...this.props} ref={popup => {this.Join = popup;}} />
      <Create {...this.props} ref={popup => { this.Create = popup; }} />
      {/* for joining and creating meetings end*/}
      {this.state.loading && <Loader />}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath, todayMeeting, nextMeeting } = utils;
  return { getUserProfile, userImagePath, todayMeeting, nextMeeting };
};



export default connect(mapStateToProps, { fetchScheduleMeeting, deleteScheduleMeeting })(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    width: '100%'
  },
  scrollBOt:{
    borderBottomColor:"#000",
    borderBottomWidth:0.99
  },
  imageView: {
    height: 60,
    width: 60,
    backgroundColor: 'grey',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    top: 25,
    left: 20
  },
  meetingDetails: {
    color: '#000',
    fontSize: RFValue(12),
    textAlign: 'left',
    width: '100%',

  },
  meetingDetailsOne: {
    color: '#000',
    fontSize: RFValue(12),
    textAlign: 'left',
    width: '100%',
    fontFamily: 'OpenSans',
    flexWrap: 'wrap',

  },
  meetingDetails2: {
    color: '#000',
    fontSize: 15,
    textAlign: 'left',
    width: '95%',
    marginTop: '-10%'
  },
  meetingDetailView: {
    backgroundColor: 'transparent',
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    start:0
  },
  meetingListContainer: {
    height: responsiveHeight(35),
    width: responsiveWidth(90),
    borderRadius: 6,
    paddingTop: 30,
    marginEnd: 10
  },
  meetingInside: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  optionImage: {
    height: '60%',
    width: '60%'
  },
  row: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginStart: 20
  },
  optionMainView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  meetingView: {
    marginTop: '20%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: responsiveHeight(45),
    height: responsiveHeight(40),
    borderRadius: 6,
    padding: 0
  },
  meetingContainer: {
    backgroundColor: 'transparent',
    height:responsiveHeight(109) 
  },
  titleView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1
  },
  title1: {
    color: '#f35925',
    fontSize: 19,
    fontWeight: 'bold'
  },
  dash1: {
    color: '#f35925',
    fontSize: 25,
    fontWeight: 'bold'
  },
  dash2: {
    color: '#f35925',
    fontSize: 25,
    fontWeight: 'bold'
  },
  nextMeetingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  title2: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold'
  },
  logoView: {
    height: responsiveHeight(20),
    width: responsiveWidth(100),
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: RFValue(70),
    marginStart:RFValue(15)
  },

  logoViewOne: {
    height: responsiveHeight(20),
    width: responsiveWidth(50),
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: RFValue(-85),
    marginStart:RFValue(30)
  },
  profileClick: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  city: {
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold'
  },
  ScrollView: {
    backgroundColor: 'transparent',
    height: responsiveHeight(50),
    width: responsiveHeight(45),
    marginHorizontal: 20,
    marginVertical: 20
  },
  ScrollViewOne: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  userInfo: {
    padding: 10,
    height: 80,
    backgroundColor: 'transparent',
    top: 20,
    flex:1,
    flexDirection:'row',
    marginTop:15
  },
  profileOption: {
    position: 'absolute',
    flexDirection: 'row',
    height: 50, width: 100,
    backgroundColor: 'transparent',
    top: 16,
    left: 0,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign:'center',
    marginStart: 19
  },
  image: {
    height: '90%',
    width: '90%',
    overflow: 'hidden',
    borderRadius: 55
  },
  image_one: {
    height: '50%',
    width: '100%',
    overflow: 'hidden',
    // borderRadius: 55,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  topView: {
    height: '10%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems:'center',
    alignContent:'center',
    marginTop:StatusBar.currentHeight
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: StatusBar.currentHeight,
  },

  options: {
    height: responsiveHeight(10),
    width: responsiveHeight(10),
    backgroundColor: theme.HOME_ICON,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsText: {
    color: theme.FONT,
    textAlign: 'center',
    fontSize: 15,
    width: responsiveHeight(11)
  },
  button: {
    width: 70,
    height: 30,
    backgroundColor: '#e87d2e',
    borderRadius: 5,
  },
  centerView: {
     alignItems: 'center', 
    marginBottom: -25
  },
  buttonView: {
    backgroundColor: 'transparent',
    height: '100%',
    justifyContent:'space-evenly',
    marginEnd: '-63%'
  },
  meetingText: { color: 'grey', fontSize: 15, textAlign: 'left', width: '100%' },
  profileOptionImage: { height: 30, width: 30 },
  logoImageView: { height: '100%', width: 120 },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})