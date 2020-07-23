import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...style.card, ...props.style }}>
            {props.children}
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 10,
        padding: 10
    }
});

export default Card;