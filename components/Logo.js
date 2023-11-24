import { View, Text, StyleSheet, Image } from "react-native";

const Logo = () => {
  return (
    <Image
      source={require("../assets/airbnb.png")}
      resizeMode="cover"
      style={styles.logo}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: "40%",
    height: 35,
    maxWidth: 100,
  },
});
