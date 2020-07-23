import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Dimensions } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/numberContainer';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import Styles from '../assets/theme/global-styles';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    if (randomNumber === exclude) {
        generateRandomNumber(min, max, exclude);
    }
    else {
        return randomNumber;
    }
}

const renderListItem = (value, round) => (
    <View key={value} style={customStyles.listItem}>
        <Text style={Styles.text}>#{round}</Text>
        <Text style={Styles.text}>{value}</Text>
    </View>
);

const GameScreen = props => {
    const userInputedNumber = generateRandomNumber(1, 100, props.userNumber);
    const [computerNumber, setComputerNumber] = useState(userInputedNumber);
    const [pastGuessesNumber, setpastGuessesNumber] = useState([userInputedNumber]);
    const [availableHeight, setavailableHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { onGameOver, userNumber } = props;

    useEffect(() => {
        if (computerNumber === userNumber) {
            onGameOver(pastGuessesNumber.length);
        }
    }, [computerNumber, userNumber, onGameOver]);

    useEffect(() => {
        const changeLayout = () => {
            setavailableHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', changeLayout);
        return () => {
            Dimensions.removeEventListener('change', changeLayout)
        }
    });

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && computerNumber < props.userNumber) || (direction === 'greater' && computerNumber > props.userNumber)) {
            Alert.alert("Don't lie!", 'You know that is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = computerNumber;
        }
        else {
            currentLow.current = computerNumber + 1;
        }

        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, computerNumber);
        setComputerNumber(nextNumber);
        setpastGuessesNumber(currentGuess => [nextNumber, ...currentGuess]);
    }

    if (availableHeight < 500) {
        return (
            <View style={customStyles.screen}>
                <Text>Opponent Guess</Text>
                <View style={customStyles.buttonContainer_landscape}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer> {computerNumber} </NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={customStyles.listContainer}>
                    <ScrollView contentContainerStyle={customStyles.list}>
                        {pastGuessesNumber.map((guess, index) => renderListItem(guess, pastGuessesNumber.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    }
    return (
        <View style={customStyles.screen}>
            <Text>Opponent Guess</Text>
            <NumberContainer> {computerNumber} </NumberContainer>
            <Card style={customStyles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={customStyles.listContainer}>
                <ScrollView contentContainerStyle={customStyles.list}>
                    {pastGuessesNumber.map((guess, index) => renderListItem(guess, pastGuessesNumber.length - index))}
                </ScrollView>
            </View>
        </View>
    );
}

const customStyles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        height: 80,
        width: 300,
        maxWidth: '80%'
    },

    buttonContainer_landscape: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },

    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 300 ? '60%' : '80%'
    },

    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    listItem: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 15,
        marginVertical: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});

export default GameScreen;