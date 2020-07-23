import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';

import MainButton from '../components/MainButton';
import Styles from '../assets/theme/global-styles';

const GameOverScreen = props => {
    
    return (
        <ScrollView>
            <View style={Styles.GameOverscreen}>
                <View style={customStyles.imageContainer}>
                    <Image style={customStyles.images} source={require('../assets/success.jpg')} />
                </View>

                <Text style={Styles.textBig}>The Game is Over</Text>

                <View style={customStyles.resultContainer}>
                    <Text style={[Styles.text, Styles.textResult]}>
                        Your phone need
                    <Text style={Styles.textHighlight}>{' ' + props.totalRounds + ' '}</Text>
                    rounds to guess the number
                    <Text style={Styles.textHighlight}>{' ' + props.userNumber}</Text>
                    </Text>
                </View>

                <View>
                    <MainButton onPress={props.onNewGame}>
                        New Game
                </MainButton>
                </View>
            </View>
        </ScrollView>
    );
}
const customStyles = StyleSheet.create({
    resultContainer: {
        marginHorizontal: Dimensions.get('window').width < 300 ? 20 : 40,
        marginVertical: Dimensions.get('window').width / 20,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,

        borderColor: Styles.accent.color,
        borderWidth: 3,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,

        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Dimensions.get('window').width / 20,
    },
    images: {
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;