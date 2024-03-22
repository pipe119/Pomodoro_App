import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const opciones = ["Pomodoro", "Descanso Corto", "Descanso Largo", "Personalizado"];

interface HeaderProps {
  setTime: (time: number) => void;
  currentTime: number;
  setCurrentTime: (index: number) => void;
  handlePress: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ setTime, currentTime, setCurrentTime, handlePress }) => {

  function handleCustomTimePress() {
    handlePress(3);
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
      {opciones.map((item, index) => (
        index !== 3 &&
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime !== index && { borderColor: "transparent" }
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleCustomTimePress}
        style={styles.itemStyle}
      >
        <Text style={{ fontWeight: "bold" }}>Personalizado</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    borderWidth: 3,
    padding: 5,
    width: "23%",
    marginVertical: 20,
    borderRadius: 15,
    alignItems: "center",
    borderColor: "white"
  },
});
