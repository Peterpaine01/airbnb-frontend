import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

import axios from "axios";

// components
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(data.id);
      setErrorMessage("");
      setToken(data.token);
      setId(data.id);
      alert("Connexion réussie");
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        // Je met à jour mon state errorMessage
        setErrorMessage("Please fill all fields");
      } else if (error.response.status === 400) {
        setErrorMessage("Email or password invalid");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={15}
    >
      <View style={styles.section}>
        <Image style={styles.logo} source={require("../assets/airbnb.png")} />
        <Text style={styles.title}>Sign in</Text>
      </View>
      <View style={styles.section}>
        <CustomInput
          placeholder="email"
          value={email}
          setValue={(text) => {
            setErrorMessage("");
            setEmail(text);
          }}
          multiline={false}
          lines={1}
          type="input"
        />

        <CustomInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          setValue={(text) => {
            setErrorMessage("");
            setPassword(text);
          }}
          multiline={false}
          lines={1}
          type="input"
        />
      </View>

      <View style={styles.section}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        <CustomButton onPress={handleSubmit} text="Sign in" type="primary" />
        <TouchableOpacity
          style={styles.container_link}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.link}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 40,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
  },

  section: {
    width: "100%",
    alignItems: "center",
  },
  container_link: {
    marginVertical: 10,
  },
  link: {
    color: "grey",
  },
  error: {
    color: "#FF5A5E",
    marginVertical: 10,
  },
  logo: {
    width: "40%",
    maxWidth: 300,
    height: 100,
    marginTop: 50,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    color: "grey",
    fontWeight: 700,
  },
});
