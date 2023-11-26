import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// components
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen({ setToken, setId }) {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handlePress = async () => {
    setIsLoading(true);
    const tab = selectedPicture.split(".");
    try {
      const token = await AsyncStorage.getItem("userToken");

      const { data } = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
        {
          email,
          description,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Récupère l'extension de l'image
      const extension = selectedPicture.split(".").at(-1);

      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `myPict.${extension}`,
        type: `image/${extension}`,
      });
      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      setSelectedPicture(response.data.photo);
      setDescription(data.description);
      setEmail(data.email);
      setUsername(data.username);
      if (response.data) {
        setIsLoading(false);
        console.log(response.data);
      }
      alert("Account successfully updated !");
    } catch (error) {
      console.log("catch >>", error.response.data);
    }
  };

  const getPermissionAndGetPicture = async () => {
    //Demander le droit d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //Ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //Ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("userToken");
        // console.log(id);
        // console.log(token);
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        setDescription(data.description);
        setEmail(data.email);
        setUsername(data.username);
        if (data.photo) {
          setSelectedPicture(data.photo.url);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("catch>>", error.response);
      }
    };

    fetchData();
  }, []);

  // console.log(selectedPicture);
  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.flexParent}>
        <View style={styles.left}>
          {selectedPicture ? (
            <Image
              style={styles.roundContainer}
              source={{ uri: selectedPicture }}
            />
          ) : (
            <Ionicons name="person" size={134} color="grey" />
          )}
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={getPermissionAndGetPicture}>
            <Ionicons name="images" size={32} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity onPress={getPermissionAndTakePicture}>
            <Ionicons name="camera" size={32} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.center}>
        <CustomInput
          placeholder="email"
          value={email}
          setValue={setEmail}
          multiline={false}
          lines={1}
          type="input"
        />
        <CustomInput
          placeholder="username"
          value={username}
          setValue={setUsername}
          multiline={false}
          lines={1}
          type="input"
        />
        <CustomInput
          placeholder="description"
          value={description}
          setValue={setDescription}
          multiline={true}
          lines={5}
          type="textarea"
        />
        <CustomButton onPress={handlePress} text="Update" type="primary" />

        <CustomButton
          // onPress={setToken(null)}
          onPress={() => {
            setToken(null);
            setId(null);
          }}
          text="Log out"
          type="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 40,
    justifyContent: "center",
    backgroundColor: "white",
  },
  flexParent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    marginBottom: 40,
  },
  left: {
    width: 200,
    height: 200,
    borderColor: "#FF5A5E",
    borderWidth: 1,
    borderRadius: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    width: 32,
    display: "flex",
    justifyContent: "space-evenly",
  },
  roundContainer: {
    width: 200,
    height: 200,
    borderRadius: "100%",
  },
  center: {
    display: "flex",
    alignItems: "center",
  },
});
