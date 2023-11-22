import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setUserToken }) {
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
      console.log(data);
      setErrorMessage("");
      setUserToken(data.token);
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
    <KeyboardAwareScrollView>
      <View>
        <Text>Email: </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        {errorMessage && <Text>{errorMessage}</Text>}
        <Button
          title="Sign in"
          onPress={async () => {
            // const userToken = "secret-token";
            handleSubmit();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
