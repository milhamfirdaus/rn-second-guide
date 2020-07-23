import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import GameScreen from './pages/GameScreen';
import GameOverScreen from './pages/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'openSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'openSans-Bold': require('./assets/fonts/OpenSans-Semibold.ttf')
  });
}

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [storedUserNumber, setStoreUserNumber] = useState('');
  const [gameRounds, setGameRounds] = useState(0);

  if (!assetsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setAssetsLoaded(true)} onError={(message) => console.log(message)} />
  }

  const newGameHandler = () => {
    setGameRounds(0);
    setStoreUserNumber(null);
  }

  const switchHandler = selectedNumber => {
    setStoreUserNumber(selectedNumber);
  }

  const gameOverHandler = round => {
    setGameRounds(round);
  }


  let content = <HomeScreen onStartGame={switchHandler} />

  if (storedUserNumber && gameRounds <= 0) {
    content = <GameScreen userNumber={storedUserNumber} onGameOver={gameOverHandler} />
  }
  else if (gameRounds > 0) {
    content = <GameOverScreen userNumber={storedUserNumber} totalRounds={gameRounds} onNewGame={newGameHandler} />
  }

  return (
    <View style={styles.screenConfig}>
      <StatusBar style="auto" />
      <Header appTitle="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screenConfig: {
    flex: 1,
  },
});