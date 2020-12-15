import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  FlatList
} from 'react-native';
import { Icon, } from 'react-native-elements';
import Header from '../screens/common/Header'
// import firestore from '@react-native-firebase/firestore';
import { Loader, } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import theme from '@theme';
import {createMeetings, getToken} from '@action';
import {LINK} from '../../src/config';
class MeetingHistory extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      data: null, 
      loading: true,
      meeting: []
    }

    this.his();
  }


  async his(){
    var a = await getToken();
    var b = LINK+"api/get-meeting-history";
    var c = new FormData();
    c.append("token_code", a);
    var d = await fetch(b, {method: "POST", body:c});
    var e = await d.status == 200 ? await d.json() : {};
    var f = await e.status == 1 ? await e.data : [];
    var g = [];
    f.map(e => {
      var h = [];
      Object.values(e).map((v) => {
        h.push(v.name)
      })
      var name = e[0];
      var o = {
        image:name.image,
        meeting_date:name.meeting_date,
        meeting_id:name.meeting_id,
        name:name.name,
        participants: h.join(", "),
        strating_time: name.strating_time
      }

      g.push(o);
    })
    console.log("values , ", JSON.stringify(g));
    this.setState({meeting:g, loading:false});
    return true;
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getHistoryData();
    });
  }

  async getHistoryData() {
   
        this.setState({ loading: false });
  }

  meet = () => {
    const {meeting} = this.state;
    return(
      <View>

      </View>
    );
  }




  render() {

    const { getUserProfile, userImagePath } = this.props;

    return (
      <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.background}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        {/* <Header {...this.props} /> */}
        {/* <Icon name="arrow-left" style={{marginStart: -6, marginTop: -8}} type='material-community' size={30} color="#000" /> */}

        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.ScrollView}>
          
          <View style={{flexDirection:'row', flex:1, width:720, marginTop:30, alignContent: 'space-between'}}>
            
            <Icon name="angle-left" onPress={() => this.props.navigation.goBack()} iconStyle={{marginStart:20}} style={{marginStart: 50, marginTop: 0}} type='font-awesome' size={30} color="#f35925" />

              {/* <Text>{'Meeting History'}</Text> */}

            <Image
          style={styles.imageLogo}
          resizeMode='contain'
          source={theme.LOGO} >
        </Image>
            </View>

            <View style={styles.listView}>
              {
                this.state.meeting.length > 0 ? <FlatList
                data={this.state.meeting}
                keyExtractor={(item, index) => `${index}K`}
                renderItem={({ item }) =>
                  <View style={styles.item}>
                    <View style={styles.imageView}>
                      <Image
                        style={styles.image}
                        resizeMode='cover'
                        source={item.image ? { uri: LINK+'uploads/'+item.image } : require('@assets/profile2.png')}>
                      </Image>
                    </View>
                    <View style={{ marginEnd:100, marginStart:50, position:'relative' }}>
                      <Text style={[styles.infoText, {fontWeight:'bold', fontSize:15}]}>{item.name}</Text>
                      <Text style={[styles.infoText, {fontWeight:'500'}]}>Meeting Id: {item.meeting_id}</Text>
                      <Text style={[styles.infoText, {flexWrap: 'wrap'}]}>Participants: {item.participants}</Text>
                      <Text style={styles.infoText}>{item.meeting_date} - ({item.strating_time})</Text>
                    </View>
                    
                    <View style={{ flexDirection:'column', marginEnd:40 }}>
                    
                      <Icon name="phone-call" raised type='feather' onPress={() => { this.props.navigation.navigate("Calling", { meetingID: item.meeting_id }) }} size={10} color="#000" />
                    
                      <Icon name="video" raised type='feather' onPress={() => { this.props.navigation.navigate("Calling", { meetingID: item.meeting_id }) }} size={10} color="#000" />

                    </View>
                    
                    </View>
                }
                keyExtractor={item => item.id}
              /> 
              : <Text style={styles.recordText}>No Records!</Text>
              }
            </View>
          </ScrollView>
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


export default connect(mapStateToProps, {})(MeetingHistory);

const styles = StyleSheet.create({

  image: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 55
  },
  imageLogo:{
      height: '100%',
      width: 120,
      marginStart:100
  },
  imageView: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart:15
  },
  listView: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '80%',
    padding: 10,
    marginStart:'-100%'
  },
  infoText: {
    color: '#000',
    fontSize: 10,
    textAlign: 'left',

  },
  recordText: {
    color: '#f35925',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center'
  },
  callButton: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    marginStart:'70%'
  },
  title: {
    color: '#f35925',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ScrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: 'transparent',
    padding: 5,
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#f35925',
    borderBottomWidth: 1,
    height: 80,
    width: '100%',
    margin: 5
  },


})