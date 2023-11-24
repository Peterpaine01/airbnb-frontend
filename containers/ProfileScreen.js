import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";

// components
import CustomInput from "../components/CustomInput";

export default function ProfileScreen({ setToken }) {
  // const { params } = useRoute();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handlePress = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const { data } = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
        {
          email,
          description,
          username,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDescription(data.description);
      setEmail(data.email);
      setUsername(data.username);
      alert("Account successfully updated !");
    } catch (error) {
      console.log("catch >>", error.response);
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
        // console.log(data);
        setDescription(data.description);
        setEmail(data.email);
        setUsername(data.username);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
      <CustomInput
        placeholder="email"
        value={email}
        setValue={setEmail}
        multiline="false"
        lines={5}
      />
      <CustomInput
        placeholder="username"
        value={username}
        setValue={setUsername}
        multiline="false"
        lines={1}
      />
      <CustomInput
        placeholder="description"
        value={description}
        setValue={setDescription}
        multiline="true"
        lines={5}
      />

      <Button
        title="Update"
        onPress={() => {
          handlePress();
        }}
      />
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
