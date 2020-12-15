import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, } from "react-native";
import Dialog from "react-native-popup-dialog";
import { Button, Icon } from 'react-native-elements';
import { responsiveHeight } from "react-native-responsive-dimensions";
import { connect } from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
import { Loader } from "@common";
import AsyncStorage from '@react-native-community/async-storage';
class Join extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false };
    }

    show() {
        this.setState({ visible: true, meetingID: '' });
    }

    
    async joinMeeting() {

        const { meetingID } = this.state;
        const { getUserProfile } = this.props;
        this.setState({ loading: true });
        let data = null;
        data = {
            'meetingID': meetingID,
            'createdAt': "--------",
            'meetingType': 'Join',
            'userType': 'Guest',
            'userID': ''
        };
        this.setState({ visible: false, loading: false });
        setTimeout(() => {
            this.props.navigation.navigate("Calling", { meetingID: meetingID });
        }, 1500);
       

        // await firestore().collection('VideoSessions').add(data)
        //     .then((res) => {
        //         console.log("data => ", data)
        //         const uid = res._documentPath._parts[1];
        //         if (uid) {
        //             this.setState({ visible: false, loading: false });
                   
        //         }
        //     })
        //     .catch(error => console.error(error));
    }


    render() {
        return (
            <View>
                <Dialog
                    onTouchOutside={() => this.setState({ visible: false })}
                    width={1.0}
                    visible={this.state.visible}
                    dialogStyle={styles.dialogStyle}
                >
                    <Text style={styles.text}>Enter Meeting Code</Text>
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Code"
                            onChangeText={(text) => this.setState({ meetingID: text })}
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="clipboard-outline" type='material-community' size={30} color="#595959" />
                    </View>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title="Join"
                        onPress={() => this.joinMeeting()}
                    />
                    {this.state.loading && <Loader />}
                </Dialog>
            </View>
        );
    }
}

const mapStateToProps = ({ utils }) => {
    const { getUserProfile, userImagePath } = utils;
    return { getUserProfile, userImagePath };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Join);

const styles = StyleSheet.create({
    input: {
        margin: responsiveHeight(1),
        height: responsiveHeight(6),
        borderRadius: 5,
        width: '80%',
    },
    searchSection: {
        height: 50,
        width: '93%',
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#f35925',
        borderRadius: 5
        , borderWidth: 2
    },
    dialogStyle: {
        paddingVertical: 20,
        backgroundColor: '#ffffff',
        height: responsiveHeight(40),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        width: 300,
        height: 50,
        backgroundColor: '#f35925',
        borderRadius: 5,
    }
})