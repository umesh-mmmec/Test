import React, { Component, } from "react";
import { StyleSheet, ScrollView, View, TextInput, ImageBackground, Text, Image, ToastAndroid, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchScheduleMeeting, createMeeting } from '@action';
// import firestore from '@react-native-firebase/firestore';
import { Loader, Header } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import { Join, Create, customAlert, DefButton } from '@common';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment';
import theme from '@theme';
import { RFValue } from "react-native-responsive-fontsize";
const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
class ScheduleMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      participents: [],
      time: '',
      date: '',
      startDate: '', //start date
      endDate:'', //end date
      duration: '',
      meetingID: '',
      loading: false,
      selectedUsers: [],
      showStartTime: false,
      startTime: new Date(),
      setStartTime: '',
      showEndTime: false,
      endTime: new Date(),
      setEndTime: '',
      meetingTitle:'',
      agenda:'',
      startDateShow: false,
      endDateShow: false
    };
   
  }

  UNSAFE_componentWillReceiveProps(props){
    const {selected} = props.route.params;
    console.log("selected => ",selected);
    this.setState({
      selectedUsers: selected
    });
    let names = [];
    selected.forEach(e => {
      names.push(e.name)
    })

    this.setState({participents: names})
  }

  async scheduleMeeting() {
    this.setState({loading:true});
    const { meetingID, agenda, startDate, endDate, setStartTime, setEndTime, selectedUsers, meetingTitle } = this.state;
    // this.setState({ loading: true });
    if(meetingID === ""){
      this.setState({loading:false});
      ToastAndroid.show("Meeting id Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(agenda === ""){
      this.setState({loading:false});
      ToastAndroid.show("agenda Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(startDate === ""){
      this.setState({loading:false});
      ToastAndroid.show("Start Date Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(endDate === ""){
      this.setState({loading:false});
      ToastAndroid.show("End Date Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(setStartTime === ""){
      this.setState({loading:false});
      ToastAndroid.show("Start time Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(setEndTime === ""){
      this.setState({loading:false});
      ToastAndroid.show("End time Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(selectedUsers === []){
      this.setState({loading:false});
      ToastAndroid.show("Meeting id Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
    if(meetingTitle === ""){
      this.setState({loading:false});
      ToastAndroid.show("Meeting title Should not be empty", ToastAndroid.BOTTOM, ToastAndroid.LONG);
      return false;
    }
   
    
    let data = {};
    data = {
      'title': meetingTitle,
      'agenda': agenda,
      'meeting_id':meetingID,
      'participate_id': selectedUsers,
      'meeting_start_date': startDate,
      'meeting_end_date': endDate,
      'starting_time': setStartTime,
      'userType': 'Registered',
      'ending_time': setEndTime,
      'token_code': await AsyncStorage.getItem('userIDToken')
    };

    console.log(data);
    // return true;
    
   const meet = await createMeeting(data);
   customAlert(meet.msg);
   ToastAndroid.show(meet.msg, ToastAndroid.LONG, ToastAndroid.BOTTOM)
   this.setState({loading:false})
   this.props.navigation.navigate('modules', {refresh:true});

  }


  startTime = (event, date) => {
    console.log('-------------------------------------------------------------------------');
    console.log("start time event => ", event);
    console.log("start time date => ", moment(date).format('h:mm:ss a'));
    const time = date.getTime();
    const a = moment(date).format('h:mm a');
    this.setState({
      setStartTime:a,
      showStartTime: false
    });
    return a;
  }

  StarttoDate = (event, date) => {
    console.log("date = > ", moment(date).format('YYYY-MM-DD'));
    var d = moment(date).format('YYYY-MM-DD');
    this.setState({
      startDate:d,
      startDateShow:false
    })
  }

  EndTODate = (event, date) => {
    console.log("date = > ", moment(date).format('YYYY-MM-DD'));
    var d = moment(date).format('YYYY-MM-DD');
    this.setState({
      endDate:d,
      endDateShow:false
    })
  }

  endTime = (event, date) => {
    console.log('-------------------------------------------------------------------------');
    console.log("end time event => ", event);
    console.log("end time date => ", moment(date).format('h:mm:ss a'));
    const time = date.getTime();
    const a = moment(date).format('h:mm a');
    this.setState({
      setEndTime:a,
      showEndTime:false
    });
    return a;
  }

  showStartDate(b){
    this.setState({startDateShow: b});
    return true;
  }

  showEndDate(b){
    this.setState({endDateShow: b});
    return true;
  }

  render() {
    const { meetingID, subject, participents, time, duration, date, startDate, showStartTime, showEndTime, startTime, endDate, endTime, startDateShow, endDateShow } = this.state;
    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
        <Header {...this.props} name={"Schedule Meeting"} />
        <View style={styles.contentContainer}>
        
          <ScrollView contentContainerStyle={styles.scrollView}>
           
            {/* <Text style={styles.headingText}>Schedule Your Meeting</Text> */}

            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="clipboard-outline" type='material-community' size={25} color="#f35925" />
              <TextInput
                style={styles.input}
                placeholder="Meeting Title"
                value={this.state.meetingTitle}
                onChangeText={(text) => this.setState({ meetingTitle: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={25} color="#f35925" />
            </View>


            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="flag" type='font-awesome' size={25} color="#f35925" />
              <TextInput
                style={styles.input}
                value={this.state.meetingID}
                placeholder="Meeting ID"
                onChangeText={(text) => this.setState({ meetingID: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#f35925" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="user" type='font-awesome' size={25} color="#f35925" />
              <TextInput
                style={styles.input}
                placeholder="Meeting Participants"
                underlineColorAndroid="transparent"
                value={participents.join(", ")}
                onFocus={() => {
                  this.props.navigation.navigate("ParticipitantList");
                }}
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={25} color="#f35925" />
            </View>
                {/* start date time */}
            <View style={styles.dateTime}>

              <TouchableOpacity style={styles.datePicker} onPress={() => this.showStartDate(true)}>
                <Text style={styles.timeSelect}>
                {startDate != '' ? startDate : 'Start date'}
                </Text>
                </TouchableOpacity>

                {
                startDateShow && <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode={'date'}
                is24Hour={false}
                display="default"
                onChange={this.StarttoDate}
              />
                }



              <View style={styles.datePicker}>
              <TouchableOpacity onPress={() => this.setState({showStartTime:true})}>
                <Text style={styles.timePlaceholder}>
                {this.state.setStartTime != '' ? this.state.setStartTime : 'Start time'}
                </Text>
                </TouchableOpacity>
                {
                  showStartTime && <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={this.startTime}
              />
                }




              </View>
             
              
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#f35925" />

             
            </View>

              {/* end date time */}
            <View style={styles.dateTime}>
              <TouchableOpacity style={styles.datePicker} onPress={() => this.showEndDate(true)}>
                  <Text style={styles.timeSelect}>
                    {endDate != '' ? endDate : 'End date'}
                  </Text>
              </TouchableOpacity>

              
              {
                endDateShow && <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'date'}
                is24Hour={false}
                display="default"
                onChange={this.EndTODate}
              />
              }

              <View style={styles.datePicker}>
                <TouchableOpacity onPress={() => this.setState({showEndTime:true})}>
                  <Text style={styles.timePlaceholder}>
                    {this.state.setEndTime != '' ? this.state.setEndTime : 'End time'}
                  </Text>
                </TouchableOpacity>
              {
                showEndTime && <DateTimePicker
                testID="dateTimePicker"
                value={endTime}
                mode={'time'}
                is24Hour={false}
                display="default"
                onChange={this.endTime}
              />
              }
              </View>
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#f35925" />
            </View>
            <View style={styles.searchSection}>
              <Icon style={styles.searchIcon} name="book" type='entypo' size={25} color="#f35925" />
              <TextInput
                style={styles.input}
                placeholder="Agenda"
                value={this.state.agenda}
                onChangeText={(text) => this.setState({ agenda: text })}
                underlineColorAndroid="transparent"
              />
              <View style={styles.searchIcon} name="microphone" type='font-awesome' size={30} color="#f35925" />
            </View>
          </ScrollView>
          {/* <Button
            buttonStyle={styles.button}
            title="Send"
            onPress={() => { this.scheduleMeeting() }}
            disabled={this.state.email == '' || this.state.pass == ''}
          /> */}
          <View style={styles.buttonSch}>
          <DefButton name={"Schedule".toUpperCase()} callback={() => this.scheduleMeeting()}/>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, { fetchScheduleMeeting })(ScheduleMeeting);

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  timeSelect:{
    color: 'grey',
    fontSize: RFValue(20),
    textAlign: "center",
    marginStart: 30
  },
  buttonSch:{
    marginTop: RFValue(20),
    marginBottom: RFValue(20)
  },
  timePlaceholder:{
    textAlign: 'center',
    marginTop: '0%',
    color: 'grey',
    fontSize: RFValue(20)
  },
  dateTime:{
    height: 70,
    width: displayWidth-45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor:'#f35925',
    borderWidth:0.99
  },
  searchSection: {
    height: 70,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#f35925',
    borderRadius: 10,
    borderWidth: 0.99
  },
  searchIcon: {
    padding: 10,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#5104e0',
    borderRadius: 5,
  },
  input: {
    width: '70%',
    margin: 0,
    padding: 0,
    height: '100%',
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#959595'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  contentContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  scrollView: {
    height: '120%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 0
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
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  }
})