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
  ScrollView,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const RoomScreen = ({ navigation, route }) => {
  const { id } = route.params;
  // console.log("route >>", id);
  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfLines, setNumberOfLines] = useState(3);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        console.log(response.data);
        setRoom(response.data);
        setLatitude(response.data.location[1]);
        setLongitude(response.data.location[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  // Utilisation de la fonction 'useStyle' qui utilise le hook "useWindowDimensions"
  const styles = useStyle();

  const displayStars = (rate) => {
    // Créer un tableau vide
    const tab = [];

    // faire une boucle qui tourne 5 fois
    for (let i = 1; i <= 5; i++) {
      // A chaque tour, si le numéro du tour est inférieur ou égal au score => j'ajoute au tableau une étoile jaune sinon une étoile grise
      if (i <= rate) {
        tab.push(<AntDesign name="star" size={20} color="#FFB000" key={i} />);
      } else {
        tab.push(<AntDesign name="star" size={20} color="#cccccc" key={i} />);
      }
    }

    // Retourner le tableau
    return tab;
  };

  const markers = [
    {
      id: room._id,
      latitude: latitude,
      longitude: longitude,
      title: room.title,
    },
  ];

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: room.photos[0].url }}
        style={styles.image}
      >
        <Text style={styles.price}>{room.price} €</Text>
      </ImageBackground>
      <View style={styles.article}>
        <View style={styles.flexBottom}>
          <View style={styles.left}>
            <Text style={styles.title} numberOfLines={1}>
              {room.title}
            </Text>
            <View style={styles.flexBottom}>
              <View style={styles.flexRating}>
                {/* Afficher les étoiles : la fonction retourne un tableau contenant les icônes */}
                {displayStars(room.ratingValue)}
              </View>

              <Text style={styles.review}>{room.reviews} reviews</Text>
            </View>
          </View>
          <Image
            source={{ uri: `${room.user.account.photo.url}` }}
            style={styles.avatar}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (numberOfLines === 3) {
              setNumberOfLines(0);
              // console.log(numberOfLines);
            } else {
              setNumberOfLines(3);
              // console.log(numberOfLines);
            }
          }}
        >
          <Text numberOfLines={numberOfLines}>{room.description}</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container_map}>
          <MapView
            // La MapView doit obligatoirement avoir des dimensions
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            // showsUserLocation={true}
          >
            {markers.map((marker) => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                />
              );
            })}
          </MapView>
        </View>
      )}
    </ScrollView>
  );
};

export default RoomScreen;

const useStyle = () => {
  // Création du style
  // utilisation du hook "useWindowDimensions"
  // const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      width: "100%",

      justifyContent: "center",
      backgroundColor: "white",
    },
    article: {
      width: "100%",
      display: "flex",
      marginBottom: 20,
      padding: 20,
    },
    image: {
      width: "100%",
      height: 250,
      resizeMode: "cover",

      alignItems: "flex-start",
      justifyContent: "flex-end",
    },
    flexBottom: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
    },
    flexRating: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      gap: 5,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: "100%",
    },
    left: {
      flex: 2,
      display: "flex",
      justifyContent: "space-between",
      gap: 20,
      marginVertical: 15,
    },
    title: {
      fontSize: 18,
    },
    review: {
      paddingTop: 5,
      color: "#cccccc",
    },
    price: {
      backgroundColor: "black",
      color: "white",
      padding: 15,
      width: 100,
      textAlign: "center",
      fontSize: 18,
      marginBottom: 20,
    },
    container_map: {
      width: "100%",
    },
    map: {
      width: "100%",
      height: 200,
    },
  });

  // Retourne le style
  return styles;
};
