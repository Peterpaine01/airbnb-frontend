import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCoords, setUserCoords] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
  });
  const [roomsList, setRoomsList] = useState([]);

  useEffect(() => {
    const askPermissionAndGetCoords = async () => {
      // Demande la permission d'accéder aux coordonnées de l'utilisateur
      const { status } = await Location.requestForegroundPermissionsAsync();

      //   console.log("status>>>", status);
      if (status === "granted") {
        //  -- L'utilisateur donne l'autorisation d'accéder à ses coordonées
        // console.log("if");

        // -- Récupère les coordonnées de l'utilisateur
        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords);

        setUserCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        try {
          // Récupère les 4 rooms les plus proches de l'utilisateur
          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude= ${coords.latitude}&longitude=${coords.longitude}`
          );

          console.log("response>>", data.length);

          setRoomsList(data);
        } catch (error) {
          console.log("catch>>", error);
        }
      } else {
        //  -- L'utilisateur n'a pas donnéé l'autorisation d'accéder à ses coordonées
        console.log("else");

        // Récupère toutes les rooms
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        console.log("response 2>>>", data.length);

        setRoomsList(data);
      }

      setIsLoading(false);
    };

    askPermissionAndGetCoords();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: userCoords.latitude,
        longitude: userCoords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation
    >
      {roomsList.map((room) => {
        // console.log(">>>", room.location);
        return (
          <Marker
            key={room._id}
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
            // Pour naviguer vers l'écran de la room lorsqu'on appuie sur l'épingle
            onPress={() => {
              navigation.navigate("Room", { id: room._id });
            }}
          />
        );
      })}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
