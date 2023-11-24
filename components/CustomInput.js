import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({ value, setValue, placeholder, multiline, lines }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        multiline={multiline}
        numberOfLines={lines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
