import React, { Component } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, StatusBar } from 'react-native';
import { Icon, } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { resetData, linkImage,specialLog, fetchScheduleMeeting, authUser, deleteScheduleMeeting, checkUser, getUserData, getMeetings, todayMeetings, nextDayMeetings } from '@action';
import { Loader, Header, DefButton } from "@common";
import theme from '@theme';
import {Options} from '@common';
class Profile extends Component {

  constructor(props){
    super(props);
    console.log("profile page opened")
    this.state = {
      loggedIn: false,
      userData: {}
    }

    this.checkUserLogin();
    this.authUserData();
  }

  authUserData = async () => {
    const a = await authUser();
    console.log(this.state.userData);
    if(a !== false){
      this.setState({userData: a.data});
    }
  }

  async checkUserLogin(){
    const a = await checkUser();
    if (a == true) {
      this.setState({loggedIn:true})
      await this.getUdata()
    }
  }

  getUdata = async () => {
    const a = await getUserdata();
    this.setState({userData: a});
    console.log("'user data => ", a);
  }

  validateINfo(data) {
    const DataInfo = data ? data : 'No info available';
    return DataInfo;
  }

  async logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate('modules', {refresh:true});
    // this.props.resetData()
  }

  edit(){
    this.props.navigation.navigate("Edit", {refresh:true});
  }
 
  render() {
    const { getUserProfile, userImagePath } = this.props;
    const {loggedIn, userData} = this.state;

    specialLog(userData);
    if (loggedIn == false) {
      return null;
    }
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
        <StatusBar translucent={false} backgroundColor={theme.STATUS} />
        <Header tommargin={100} name={'My Profile Settings'.toUpperCase()} fontSize={20} topmar={-55} {...this.props} />

          <Image style={styles.image_one} resizeMode={'cover'} source={require('@assets/logo.png')}/>

        <View style={styles.userInfoContainer}>
        {/* <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.iconStyle}>
          <Icon name="angle-left" type='font-awesome' size={30} color={'#000'} />
        </TouchableOpacity> */}
      

          <View style={styles.imageContainer}>

            <Image
              style={styles.userImage}
              resizeMode='cover'
              source={userData.image ? {uri: linkImage(userData.image)} : require('@assets/profile2.png')}  >
            </Image>
          <Icon name="pen" onPress={() => this.edit()} raised type='material-community' style={{marginStart:-30, marginTop:20}} size={10} color={'#f35925'} />
          </View>
          {/* <View style={styles.userLoginInfo}>
          <Text style={styles.userLoginInfoText1}>{userData.name}</Text>
          <Text style={styles.userLoginInfoText2}>{userData.email_id}</Text>
          </View> */}
        </View>
        <View style={styles.detailsContainer}>

            <Options title={'Name'} value={userData.name}/>
            <Options title={'Email  '} value={userData.email_id}/>
            <Options title={'Phone'} value={userData.mobile_no}/>
            <Options title={'Password'} value={'**********'}/>

            <DefButton name={"logout".toUpperCase()} callback={() => this.logout()}/>

          </View>

      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, { resetData })(Profile);

const styles = StyleSheet.create({
  line:{
    borderWidth: 3,
    height: 50,
    borderColor: '#f35925'
  },
  image_one: {
    height: '20%',
    width: '90%',
    overflow: 'hidden',
    marginBottom:'-10%',
    marginTop:'20%'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchSection: {
    height: 50,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
    borderBottomWidth:0.9,
    borderBottomColor:'#f35925'
  },
  userInfoContainer: {
    top: responsiveHeight(2),
    height: '30%',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  imageContainer: {
    height: responsiveWidth(30),
    backgroundColor: 'transparent',
    borderRadius: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    flexDirection: 'row',
    marginTop:140
  },
  userImage: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    overflow: 'hidden',
    borderRadius: responsiveWidth(14),
  },
  userLoginInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:70,
    marginStart:-20
  },
  navController: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.TITLE,
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    borderRadius: 30,
    top: responsiveHeight(2)
  },
  navText: {
    color: 'blue',
    fontSize: responsiveFontSize(2.5),
    fontWeight: '400',
    right: responsiveWidth(8)
  },
  accountInfoContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  accountInfoHead: {
    color: '#f35925',
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%'
  },
  detailsContainer: {
    width: responsiveHeight(45),
    height: responsiveHeight(75),
    alignItems: 'center',
  },
  infoText:{ 
    color: '#000', 
    fontSize: 15, 
    fontWeight: '400' 
  },
  buttonContainer:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: theme.TITLE, 
    height: responsiveHeight(8), 
    width: responsiveWidth(80), 
    borderRadius: 30, 
    // top: responsiveHeight(2) 
  },
  logOutText:{ 
    color: 'blue', 
    fontSize: 20, 
    fontWeight: '400', 
  },
  userLoginInfoText1:{ color: '#f35925', fontSize: 25, fontWeight: 'bold' },
  userLoginInfoText2:{ color: '#000', fontSize: 10  , },
  textParentView:{ width: '100%', marginBottom:10 },
  iconStyle:{ 
    position: 'absolute', 
    left: 20, 
    top: 30 
  }
})