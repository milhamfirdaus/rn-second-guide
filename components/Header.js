import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Theme from '../assets/theme/styles'

const Header = props => {
    return (
        <View style={style.header}>
            <Text style={style.headerTitle}>{props.appTitle}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        width : '100%',
        height : 85,
        paddingTop : 36,
        backgroundColor : Theme.primary,
        justifyContent: 'center',
        alignItems : 'center'
    },
    headerTitle: {
        fontSize : 18,
        color : 'white',
        fontFamily : Theme.titleText
    }
});

export default Header;