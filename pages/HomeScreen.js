import React, { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    View,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions,
    StyleSheet,
} from 'react-native';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Styles from '../assets/theme/global-styles';
import Input from '../components/Input';
import NumberContainer from '../components/numberContainer';

const HomeScreen = props => {
    const [inputNumber, setInputNumber] = useState('');
    const [confirmed, setConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const orientationChanged = () => {
            setButtonWidth(Dimensions.get('window').width / 4); //changebuttonsize
        }

        Dimensions.addEventListener('change', orientationChanged);
        return () => {
            Dimensions.removeEventListener('change', orientationChanged);
        };
    });

    const inputHandler = (value) => {
        setInputNumber(value.replace(/[^0-9]/g, ''));
    }

    const resetHandler = () => {
        setInputNumber('');
        setConfirm(false);
        console.log(Dimensions.get('window').width);
    }

    const confirmHandler = () => {
        const fixNumber = parseInt(inputNumber);
        if (isNaN(fixNumber) || fixNumber <= 0 || fixNumber > 99) {
            Alert.alert(
                'Invalid Number',
                'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetHandler }]
            )
            return;
        }
        setConfirm(true);
        setSelectedNumber(fixNumber);
        setInputNumber('');
        Keyboard.dismiss();
    }

    let notificationComponent;
    if (confirmed) {
        notificationComponent =
            <Card style={localStyle.notification}>
                <Text style={Styles.text}>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)} style={localStyle.button}>
                    Start Game
                </MainButton>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} >
                    <View style={Styles.HomeScreen}>
                        <Text style={localStyle.title}>Start a New Game</Text>
                        <Card style={localStyle.inputContainer}>
                            <Text style={Styles.text}>Select Number :</Text>
                            <Input style={localStyle.input}
                                onChangeText={inputHandler}
                                value={inputNumber}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                value={inputNumber}
                            />
                            <View style={localStyle.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="reset" onPress={resetHandler} color={Styles.accent.color} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={confirmHandler} color={Styles.primary.color} />
                                </View>
                            </View>
                        </Card>
                        {notificationComponent}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView >
    );

}

const localStyle = StyleSheet.create({
    inputContainer: {
        width: '80%',
        minWidth: 260,
        //maxWidth: '80%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    input: {
        width: 80,
        maxWidth: '80%',
        textAlign: 'center',
    },

    title: {
        marginBottom: 10,
        fontSize: Styles.textBig.fontSize,
        fontFamily: Styles.textBig.fontFamily,
    },

    notification: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default HomeScreen;