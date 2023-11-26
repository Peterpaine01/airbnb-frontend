import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

// screens
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RoomScreen from "./containers/RoomScreen";
import MapScreen from "./containers/MapScreen";

// composants
import Logo from "./components/Logo";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      console.log("token storage >>>", token);
    } else {
      await AsyncStorage.removeItem("userToken");
      ("token storage >>> ko");
    }

    setUserToken(token);
  };

  const setId = async (id) => {
    if (id) {
      await AsyncStorage.setItem("userId", id);
      console.log("id storage >>>", id);
    } else {
      await AsyncStorage.removeItem("userId");
      ("id storage >>> ko");
    }

    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "#FF5A5E",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: (arg) => <Logo />,
                      }}
                    >
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "Home",
                          headerStyle: {
                            backgroundColor: "white",
                            borderBottomColor: "#eeeeee",
                            shadowColor: "#eeeeee",
                          },
                          headerTitleStyle: { color: "black" },
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-pin"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: (arg) => <Logo />,
                      }}
                    >
                      <Stack.Screen
                        name="Map"
                        options={{
                          title: "Home",
                          headerStyle: {
                            backgroundColor: "white",
                            borderBottomColor: "#eeeeee",
                            shadowColor: "#eeeeee",
                          },
                          headerTitleStyle: { color: "black" },
                        }}
                      >
                        {(props) => <MapScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabProfile"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: (arg) => <Logo />,
                      }}
                    >
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                        }}
                      >
                        {() => (
                          <ProfileScreen setToken={setToken} setId={setId} />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    maincolor: "#FF5A5E",
  },
});
