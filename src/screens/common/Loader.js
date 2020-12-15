import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
class Loader extends Component {

    render() {
        const {Copacity} = this.props;
        return (
            <View style={[styles.container, { opacity: Copacity ? Copacity : 0.7}]}>
                <ActivityIndicator color={"#D0252A"} size={'large'} />
            </View>
        );
    }
}
export default Loader;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
       
    }
})