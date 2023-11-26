import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, type }) => {
  // console.log(type);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#FF5A5E",
    borderWidth: 3,
    width: "60%",
    borderRadius: "100%",
    paddingVertical: 15,
    marginVertical: 5,
  },
  container_primary: {
    backgroundColor: "white",
  },
  container_secondary: {
    backgroundColor: "#eeeeee",
  },
  text: {
    color: "grey",
    textAlign: "center",
    fontSize: 18,
  },
});

export default CustomButton;
