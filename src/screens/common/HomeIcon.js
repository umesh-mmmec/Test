import React, {Component} from 'react';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import theme from '@theme';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
export default class HomeIcon extends Component{
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    render(){
        const {callback, image, title, empty, row, color, marginSt} = this.props;
        
        return (
          <>
          {
            row ? <TouchableOpacity onPress={callback ? callback : () => console.log("Specify the call back")}>
            <View style={[styles.centerViewRow, {backgroundColor: '#f35925'}]}>
                <View style={styles.optionsRow}>
                  <Image
                    style={styles.optionImageRow}
                    resizeMode='contain'
                    source={image ? image : '@assets/transparent.png'} >
                  </Image>
                  <Text style={[styles.optionsTextRow, {marginStart: marginSt ? RFValue(marginSt) : RFValue(-15)}]}>{title ? this.capitalizeFirstLetter(title) : null}</Text>
                </View>
              </View>
              </TouchableOpacity>
              : <TouchableOpacity onPress={callback ? callback : () => console.log("Specify the call back")}>
            <View style={[styles.centerView, {backgroundColor: empty ? 'transparent' : ( color ? color : '#f35925')}]}>
                <View style={styles.options}>
                  <Image
                    style={styles.optionImage}
                    resizeMode='contain'
                    source={image ? image : '@assets/transparent.png'} >
                  </Image>
                <Text style={styles.optionsText}>{title ? this.capitalizeFirstLetter(title) : null}</Text>

                </View>
              </View>
              </TouchableOpacity>
          }
            
              </>
        );
    };
}

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: responsiveWidth(20),
        margin: 0,
        borderRadius: 10,
        height: responsiveHeight(10),
     },
     options: {
        height: responsiveHeight(10),
        width: responsiveHeight(10),
        backgroundColor: 'transparent',
        borderRadius: 20,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
      },
      optionImage: {
        alignContent: 'center',
        height: '50%',
        width: '50%',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '10%'
      },
      optionsText: {
        width: '100%',
        color: '#fff',
        fontSize: RFValue(11),
        textAlign: 'center',
        marginTop: 2,
        fontWeight: 'bold'
      },
      centerViewRow:{
        flex: 1,
        flexDirection: 'row',
        width: responsiveWidth(42),
        margin: 5,
        borderRadius: 20,
        height: responsiveHeight(10),
        alignContent: 'center',
      },
      optionsRow:{
        height: responsiveHeight(10),
        width: responsiveHeight(30),
        backgroundColor: 'transparent',
        borderRadius: 10,
        flexDirection: 'row',
        zIndex: 99999,        
        marginStart: RFValue(-5),
        alignContent: 'center',
        marginTop: '13%'
      },
      optionImageRow: {
        height: '45%',
        width: '45%',
      },
      optionsTextRow:{
        width: '120%',
        fontSize: RFValue(10),
        color: '#000',
        alignContent: 'center',
        marginTop: RFValue(10),
        fontWeight: 'bold'
        
      }
    
});