import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
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

          // console.log(token);
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
    <KeyboardAwareScrollView extraScrollHeight={10}>
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
