import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  multiline,
  lines,
  type,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
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
    borderColor: "#FF5A5E",
    width: "100%",
    paddingVertical: 10,
    marginVertical: 5,
    marginBottom: 20,
  },
  container_textarea: {
    borderWidth: 1,
    padding: 10,
    minHeight: 100,
  },
  container_input: {
    borderBottomWidth: 1,
  },
});

export default CustomInput;
