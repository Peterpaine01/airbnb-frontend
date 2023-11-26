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

const HomeScreen = ({ navigation }) => {
  const [roomsList, setRoomsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        // console.log(response.data);
        setRoomsList(response.data);
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

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {/* Afficher les éléments d'un tableau */}
      <FlatList
        data={roomsList}
        keyExtractor={(room) => room._id}
        //  Attention  👇 destructuration de la clé 'item'
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.article}
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              {/* Image en background */}
              <ImageBackground
                source={{ uri: item.photos[0].url }}
                style={styles.image}
              >
                <Text style={styles.price}>{item.price} €</Text>
              </ImageBackground>
              <View style={styles.flexBottom}>
                <View style={styles.left}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.flexBottom}>
                    <View style={styles.flexRating}>
                      {/* Afficher les étoiles : la fonction retourne un tableau contenant les icônes */}
                      {displayStars(item.ratingValue)}
                    </View>

                    <Text style={styles.review}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  source={{ uri: `${item.user.account.photo.url}` }}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const useStyle = () => {
  // Création du style
  // utilisation du hook "useWindowDimensions"
  // const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 20,
      justifyContent: "center",
      backgroundColor: "white",
    },
    article: {
      width: "100%",
      display: "flex",
      borderBottomWidth: 1,
      borderColor: "#cccccc",
      marginBottom: 20,
      paddingBottom: 5,
    },
    image: {
      width: "100%",
      height: 180,
      resizeMode: "cover",
      marginBottom: 20,
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
  });

  // Retourne le style
  return styles;
};
