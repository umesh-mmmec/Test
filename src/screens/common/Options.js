import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import theme from '@theme';
import { Icon, } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";


export default class Options extends Component{

    constructor(props){
        super(props);
    }

    render(){
      const {title, value} = this.props;
        return(
            <View style={styles.searchSection}>
            {/* <View style={styles.line}></View> */}
              {/* <Icon name="mobile" type='font-awesome'  size={20} color="#000" /> */}
              <View style={styles.textParentView}>
                <Text style={[styles.infoText, {color:'#ecc8ba'}]}>{title}</Text>
                <Text style={styles.infoText}>{value ? value : 'no value'}</Text>
              </View>
              <Text style={{ color:'#fff' }}>Edit</Text>
            </View>
        )
    }
}

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
        marginTop:100
      },
      userImage: {
        height: responsiveWidth(28),
        width: responsiveWidth(28),
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
        color: '#fff', 
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