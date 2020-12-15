import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';


const SideMenu = () => {
    return(
        <>
        <View style = {[styles.lineStyle,{width:40}]} />
        <View style = {[styles.lineStyle,{width:35}]} />
        <View style = {[styles.lineStyle,{width:30}]} />
        </>
    )
}

const GoBack = (e) => {
    useEffect(() => {
        console.log('goback => ', e)
    })
    return(
        <>
        <TouchableOpacity onPress={() => { e.goBack() }} style={{ marginStart: '-80%' }}>
          <Icon name="arrow-left" type='material-community' size={30} color="white" />
        </TouchableOpacity>
        </>
    );
}

const HeaderBar = (e) => {  
    useEffect(() => {
       console.log(e);
    })

    

    return (    
        <>   
        <View style={styles.headerBack}>
            <View style={{ flex:1, flexDirection:"column",}}>
            {
                e.back ? <GoBack {...e.navigation}/> : <SideMenu/>
            }
                {/* <SideMenu is={e.back}/> */}
            </View>
                <View style={[styles.center, {marginEnd: e.marginEnd}]}>
                    <Text style={styles.menu}>{e.title}</Text>
                </View>
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    headerBack: {
        backgroundColor: '#fe740b',
        height:'10%',
        shadowColor: 'red',
        shadowOffset: { width: 10, height: 90 },
        shadowColor: 'black',
        shadowOpacity: 100,
        elevation: 90,
        alignItems: "center",
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        top: 10
    },
    menu:{
        color:"white",
        fontWeight:"bold",
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center'
    },
    center:{
        flexDirection:'row',
        borderBottomColor: 'white',
        borderBottomWidth: 3,
        borderBottomEndRadius: 60,
        borderBottomStartRadius: 60
    },
    lineStyle:{
        borderWidth: 2,
        marginTop:10,
        marginStart:10,
        marginBottom: -5,
        borderTopColor: 'white',
        borderStartColor: "white",
        borderBottomColor: "white",
        borderEndColor:"white"
   },

   lineStyleCp:{
    borderBottomWidth: 5,
    marginBottom: -5,
    borderBottomColor: "white",
   }
});
export default HeaderBar;