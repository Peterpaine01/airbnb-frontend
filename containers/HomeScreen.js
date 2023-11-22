import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
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
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  // Utilisation de la fonction 'useStyle' qui utilise le hook "useWindowDimensions"
  const styles = useStyle();

  return (
    <View>
      {/* Afficher les éléments d'un tableau */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        //  Attention  👇 destructuration de la clé 'item'
        renderItem={({ item }) => {
          console.log(item.user.account.photo.url);
          return (
            <View styles={styles.article}>
              <View>
                <Image src={item.photos[0].url} styles={styles.images} />
                <View>
                  <Text numberOfLines={1}>{item.price} €</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>{item.title}</Text>
                </View>
                <Image
                  src={item.user.account.photo.url}
                  styles={styles.images}
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
      borderBlockColor: "yellow",
      borderWidth: 2,
    },
    images: {
      width: 150,
      height: 120,
      resizeMode: "cover",
      borderBlockColor: "red",
      borderWidth: 2,
    },
  });

  // Retourne le style
  return styles;
};
