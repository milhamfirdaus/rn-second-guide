import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../assets/theme/styles'

const numberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        padding : 8,
        borderRadius: 10,
        alignItems : 'center',
        justifyContent : 'center'
    },

    number : {
        color : Colors.primary,
        fontSize : 22
    }
});

export default numberContainer;