import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

// components
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction qui sera appelée lors de la validation du formulaire
  const handleSignup = async () => {
    // Vérifier que tous les champs sont remplis
    if (email && username && description && password && confirmPassword) {
      // vérifier que les mots de passe sont identique
      if (confirmPassword === password) {
        try {
          //   Requête axios :
          // - Premier argument : l'url que j'interroge
          // - deuxième : le body que j'envoi
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );
          setErrorMessage("");
          // J'enregistre le token dans mon state
          setToken(data.token);
          setId(data._id);
          alert("Account successfully created !");

          console.log(data._id);
        } catch (error) {
          // le '?' permet de vérifier si la clé existe, si non le reste du chemin n'est pas lu
          console.log("catch>>", error.response?.data?.error);

          if (error.response) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("Une erreur est survenue");
          }
        }
      } else {
        setErrorMessage("Passwords must be the same");
      }
    } else {
      setErrorMessage("Missing Parameters");
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={15}
      contentContainerStyle={styles.container}
    >
      <View style={styles.section}>
        <Image style={styles.logo} source={require("../assets/airbnb.png")} />
        <Text style={styles.title}>Sign up</Text>
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
          placeholder="username"
          value={username}
          setValue={(text) => {
            setErrorMessage("");
            setUsername(text);
          }}
          multiline={false}
          lines={1}
          type="input"
        />
        <CustomInput
          placeholder="Describ yourself in a few words..."
          value={description}
          setValue={(text) => {
            setErrorMessage("");
            setDescription(text);
          }}
          multiline={true}
          lines={5}
          type="textarea"
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

        <CustomInput
          placeholder="confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          setValue={(text) => {
            setErrorMessage("");
            setConfirmPassword(text);
          }}
          multiline={false}
          lines={1}
          type="input"
        />
      </View>

      <View style={styles.section}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        <CustomButton
          onPress={async () => {
            handleSignup();
          }}
          text="Sign up"
          type="primary"
        />
        <TouchableOpacity
          style={styles.container_link}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.link}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setErrorMessage("");
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setErrorMessage("");
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Describ yourself in a few words..."
          multiline
          value={description}
          onChangeText={(text) => {
            setErrorMessage("");
            setDescription(text);
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setErrorMessage("");
            setPassword(text);
          }}
        />
        <TextInput
          placeholder="Confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => {
            setErrorMessage("");
            setConfirmPassword(text);
          }}
        />
        {errorMessage && <Text>{errorMessage}</Text>}
        <Button
          title="Sign up"
          onPress={async () => {
            handleSignup();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Already have an account? Sign in</Text>
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
    gap: 40,
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
