import React from 'react';
import { StyleSheet,View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { connect } from 'react-redux';
import {createMeetings, getToken} from '@action';
import {LINK} from '../../../src/config';
class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }



  async componentDidMount() {
    const id = this.props.route.params.meetingID;

    var a = await getToken();
    var b = a == null ? 0 : a;
    var c = LINK+"api/add-meeting-history";
    var e = new FormData();
    e.append("token_code", a);
    e.append("meeting_id", id);
    var d = await fetch(c, {method:"POST", body:e});
    var f = await d.status == 200 ? await d.json() : {};
    console.log("api registartion", f);
    let userInfo = { displayName: 'User', email: 'user@example.com', avatar: 'https://i.postimg.cc/zvqhb1FN/hablame-oranage.png' };
    // JitsiMeet.initialize();
    setTimeout(() => {
      const url = `https://video.habla-me.online/${id}`;
      JitsiMeet.call(url, userInfo);
    }, 1000);

    return true;
  }

  async onConferenceTerminated() {
    await JitsiMeet.endCall();
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 1000);
  }

  onConferenceJoined(nativeEvent) {
    / Conference joined event /
  }

  onConferenceWillJoin(nativeEvent) {
    / Conference will join event /
  }

  render() {
    return (
      <View style={{ backgroundColor: 'black', height:'90%', flex: 1 }}>
      <JitsiMeetView
        style={styles.container}
        onConferenceJoined={this.onConferenceJoined}
        onConferenceTerminated={this.onConferenceTerminated}
        onConferenceWillJoin={this.onConferenceWillJoin}
      />
      </View>
    );
  }
}

const mapStateToProps = ({ utils }) => {
  const { getUserProfile, userImagePath } = utils;
  return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, {})(VideoCall);
const styles = StyleSheet.create({
  container: { flex: 1, height: '90%', width: '100%' }
})