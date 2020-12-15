import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { responsiveHeight, } from "react-native-responsive-dimensions";
import theme from '@theme';
import { RFValue } from "react-native-responsive-fontsize";
class Header extends Component {
  render() {
    const {name, topmar, tommargin, fontSize} = this.props;
    return (
      <View style={[styles.container, {top:tommargin ? tommargin : 40}]}>
        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={[styles.iconStyle, {top: topmar ? topmar : 50}]}>
          <Icon name="angle-left" style={styles.left} type='font-awesome' size={30} color="#000" />
        </TouchableOpacity>
        {
          name 
          ? ( name == 'Login'
            ? <Text style={styles.schedule}>{name}</Text> 
          : ( name == "Schedule Meeting" 
            ? <Text style={{fontSize:30, fontWeight: 'bold', color: '#000'}}>{name}</Text> 
          : <Text onPress={() => console.log('on')} style={[styles.name, {fontSize:fontSize ? fontSize : RFValue(30)}]}>{name}</Text>))
            :<Image
          style={styles.image}
          resizeMode='contain'
          source={theme.LOGO} >
        </Image>
        }
        
        
       
      </View>
    );
  }
}
export default Header;
const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '70%',
  },
  left:{
    marginStart: 4,
    marginTop: -8
  },
  container: {
    flex:1,
    flexDirection: 'row',
    top: responsiveHeight(2),
    height: '15%',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:9999
  },
  iconStyle:{ 
    position: 'absolute', 
    left: 20
  },
  name:{
    color: '#000',
    fontSize: RFValue(30),
    marginTop: RFValue(-100)
  },
  schedule:{
    color: '#000',
    fontSize: RFValue(30),
    marginTop: RFValue(-0)
  }
})