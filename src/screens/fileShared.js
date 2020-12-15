import React, {Component} from 'react';
import {View, Text, ImageBackground, Modal, StyleSheet, Linking, TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native';
import {Header} from '@common';
import theme from '@theme';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Icon, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
import {FilesSHaredWithMe} from '@action';
import {LINK} from '../config';
export default class FileShared extends Component{
    constructor(props){
        super(props);
        this.state = {
            files : [],
            modal:false,
            modal_data:""
        }

        this.getFiles();
        this.ListItem = this.ListItem.bind(this);
    }

    showModal(d){
      this.setState({modal:true, modal_data:d});
    }

    resetModal(){
      this.setState({modal:false, modal_data:""});
    }

    async getFiles(){

      try {
        const a = await FilesSHaredWithMe();
        this.setState({files:a.data})
        console.log("files shared", a.data);
      } catch (error) {
        console.log("error", error);
       this.setState({files:[]})
      }
       
    }

    

    ListItem(props){
    const {sr,description,title,sharedby,download,view} = props;
    function GoToLink(l){
      Linking.openURL(LINK+'uploads/'+l);
    }
        return(
            <>
            <LinearGradient colors={['#8357fa', '#4469e6', '#2471df']} style={styles.linearGradient}>
                    
            <View style={styles.item}>
                        <Text style={[styles.white_text, styles]}>Download</Text>
                        <Text style={[styles.white_text]}></Text>
                        <View style={{ flex:1, flexDirection:'row', width:50, marginEnd:15, alignContent:'center', top:-6 }}>
                            <Text onPress={() => GoToLink(download)} style={ [styles.white_text, styles.small_text, styles.button, {backgroundColor:'#0fe786'}] }>Download</Text>
                            <Text onPress={() => this.showModal(description)} style={ [styles.white_text, styles.small_text, styles.button] }>View</Text>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.white_text}>Date</Text>
                        <Text style={[styles.white_text, styles.line]}></Text>
                        <Text style={[styles.white_text]}>10-12-20</Text>
                    </View>
                    
                    <View style={styles.item}>
                        <Text style={styles.white_text}>Title</Text>
                        <Text style={[styles.white_text]}></Text>
                        <Text style={[styles.white_text, {top:-7}]}>{title}</Text>
                    </View>
                    
                    <View style={styles.item}>
                        <Text style={styles.white_text}>Share by</Text>
                        <Text style={[styles.white_text]}></Text>
                        <Text style={[styles.white_text, {top:-7}]}>{sharedby}</Text>
                    </View>
                    
                    </LinearGradient>
                    </>
        );
    }

    render(){
       const {files} = this.state;
       console.log("fies", typeof files);
        return(
            <>
            <ImageBackground source={theme.BACKGROUND_IMAGE} style={styles.container}>
            <View style={styles.userInfoContainer}>
            
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.iconStyle}>
                <Icon name="angle-left" type='font-awesome' size={30} color={'#000'} />
                <Text style={styles.header}>Shared Files</Text>
            </TouchableOpacity>
                <SafeAreaView style={styles.safe}>
                    <ScrollView style={styles.scroll}>

                  {
                Object.entries(files ? files : []).length == 0 ? <Text style={styles.textCenter}>You have no files to show</Text> : 
                   Object.values(files).map((e) => {
                    console.log("files show", e);
                     return  (
                       <this.ListItem 
                        sr={1}
                        description={e.details}
                        title={e.title}
                        sharedby={e.share_by}
                        download={e.file}
                        view={e.file}
                     />)
                    })
                  }

                    </ScrollView>
                </SafeAreaView>
            </View>

                  {/* modal start */}
                  {
                    this.state.modal && <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                    console.log("request to close");
                    }}
                    style={{ backgroundColor:'#0000' }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>{this.state.modal_data}</Text>

                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                         this.resetModal();
                        }}
                      >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
                  }
                  {/* modal end */}

            </ImageBackground>
            
            </>
        );
    }
}

const styles = StyleSheet.create({
    scroll:{
    backgroundColor: 'transparent'
    },
    textCenter:{
      textAlign:'center',
      marginTop:dh/3,
      fontSize:15
    },
    item:{
        flex:1,
        alignItems:'center'
    },
    button:{
        backgroundColor:'#f2a748',
        padding:2,
        marginEnd:2,
        borderRadius:5
    },
    small_text:{
        fontSize:10,
        marginBottom:10
    },
    line:{
        borderWidth:0.9,
        borderColor:'#fff',
        height:0,
        width:dw*2,
        marginTop:20
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        flexDirection:'row'
      },
      white_text:{
        color:'#fff',
        marginTop:10
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
    safe:{
        flex:1,
        flexDirection:'column',
        height:dh,
        width:dw-30,
        marginTop:30
    },
    header:{
        fontSize:30,
        color:'#f35925',
        marginStart:50,
        top:-2
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
        borderColor: 'white',
        borderRadius: 30,
        marginBottom: 10
      },
      userInfoContainer: {
        top: responsiveHeight(2),
        height: dh,
        width: '100%',
        zIndex: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
      },
      imageContainer: {
        height: responsiveWidth(30),
        backgroundColor: 'transparent',
        borderRadius: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        flexDirection: 'row'
      },
      userImage: {
        height: responsiveWidth(28),
        width: responsiveWidth(28),
        overflow: 'hidden',
        borderRadius: responsiveWidth(14),
      },
      userLoginInfo: {
        alignItems: 'center',
        justifyContent: 'center'
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
        fontSize: 25,
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
      userLoginInfoText2:{ color: '#000', fontSize: 17, },
      textParentView:{ width: '75%' },
      iconStyle:{ 
        position: 'absolute', 
        left: 20, 
        top: 0,
        flex:1,
        flexDirection:'row',
        alignContent:'center',
        textAlign:'center'
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      modalView: {
        backgroundColor: "#fff",
        borderRadius: 2,
        padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowOpacity: 100,
        shadowRadius: 1,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:dw-100
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
    
});