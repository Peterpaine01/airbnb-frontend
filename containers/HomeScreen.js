import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  // Utilisation de la fonction 'useStyle' qui utilise le hook "useWindowDimensions"
  const styles = useStyle();

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <View>
      {/* Afficher les éléments d'un tableau */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        //  Attention  👇 destructuration de la clé 'item'
        renderItem={({ item }) => {
          let rating = [];
          for (let i = 0; i < item.ratingValue; i++) {
            rating.push(i + 1);
          }
          // console.log(rating);

          return (
            <View style={styles.article}>
              <View>
                <Image
                  source={{ uri: `${item.photos[0].url}` }}
                  style={styles.images}
                />
                <View>
                  <Text numberOfLines={1}>{item.price} €</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>{item.title}</Text>
                  <View>
                    <View>
                      {rating.map((star) => {
                        return <Text>*</Text>;
                      })}
                    </View>

                    <Text>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  source={{ uri: `${item.user.account.photo.url}` }}
                  style={styles.images}
                />
              </View>
            </View>
          );
        }}
        // -- Orientation horizontal
        // horizontal
        // // -- Ajouter un footer
        // ListFooterComponent={() => <Text>Je suis un footer</Text>}
        // // -- Ajouter un header
        // ListHeaderComponent={() => <Text>Je suis un header</Text>}
        // // -- Ajouter un séparateur entre chaque élément
        // ItemSeparatorComponent={() => <Text>-------------------</Text>}
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
    // input: {
    //   borderWidth: 1,
    //   height: 30,
    //   marginVertical: 30,
    //   padding: 10,
    //   width: width - 40,
    // },
    article: {
      width: "100%",
      display: "flex",
    },
    images: {
      width: 150,
      height: 120,
      resizeMode: "cover",
    },
  });

  // Retourne le style
  return styles;
};
