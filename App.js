import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Header } from './src/Components/Header';
import { Timer } from './src/Components/Timer';

const colores = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isWorking]);

  function handleStartStop() {
    setIsActive((prev) => !prev);
  }

  function handlePress(index) {
    if (index === 3) {
      showCustomTimeInput();
    } else {
      const newTime = index === 0 ? 25 : index === 1 ? 5 : index === 2 ? 15 : 0;
      setCurrentTime(index);
      setTime(newTime * 60);
    }
  }

  function showCustomTimeInput() {
    Alert.prompt(
      'Tiempo Personalizado',
      'Ingrese el tiempo en minutos:',
      (inputValue) => {
        const newTime = parseInt(inputValue, 10);
        if (!isNaN(newTime) && newTime > 0) {
          setCurrentTime(3);
          setTime(newTime * 60);
        } else {
          Alert.alert('Tiempo Inválido', 'Por favor, ingrese un tiempo válido en minutos.');
        }
      },
      'plain-text',
      '',
      'numeric'
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colores[currentTime] }]}>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          handlePress={handlePress}
          showCustomTimeInput={showCustomTimeInput}
        />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.boton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 33,
    fontWeight: "bold",
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  }
});
