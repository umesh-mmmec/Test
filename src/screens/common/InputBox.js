import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Icon } from 'react-native-elements';
import theme from '@theme';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
export default class InputBox extends React.Component {
    render() {
        const { icon, onChangeText, name, fontType, keyboardType, secureTextEntry, value, readonly } = this.props;
        return (
            <View style={styles.searchSection}>
                <ScrollView>
                <TextInput
                    style={styles.input}
                    placeholder={name}
                    placeholderTextColor={theme.PLACEHOLDER}
                    onChangeText={(text) => onChangeText(text)}
                    underlineColorAndroid="transparent"
                    keyboardType={keyboardType ? keyboardType : ''}
                    secureTextEntry={secureTextEntry ? true : false}
                    value={value ? value : null}
                    editable={readonly ? false : true}
                />
                </ScrollView>
                {/* <Icon style={styles.searchIcon} name={icon} type={fontType ? fontType : 'font-awesome'} size={25} color="#ff3223" /> */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchSection: {
        height: 40,
        width: responsiveWidth(80),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.TEXT_INPUT_ICON_BACKGROUND_COLOR,
        borderColor: theme.TEXT_INPUT_ICON_BORDER,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 0.99,
        borderColor: '#ff3223',
        marginBottom: 5
    },
    searchIcon: {
        width: 60,
        padding: 10,
    },
    input: {
        width: '100%',
        margin: 0,
        padding: 0,
        height: '100%',
        textAlign: 'left',
        fontSize: 20,
        backgroundColor: theme.TEXT_INPUT_BACKGROUND,
        color: theme.TEXT_INPUT,
        marginStart: 10
    },
});
