import React from "react";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/main/Home";
import Search from "../screens/main/Search";
import Activity from "../screens/main/Activity";
import Upload from "../screens/main/Post";
import Profile from "../screens/main/Profile";
import { Text, TouchableOpacity } from "react-native";
import styles from "../screens/styles/style";
import CameraUpload from "../screens/main/CameraUpload";

const Stack = createStackNavigator();

export const HomeNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={(navigation) => ({
          headerTitle: <Text style={styles.headerTitle}>Instashot</Text>,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Camera", { state: "camera" })
              }
            >
              <Feather style={{ marginLeft: 20 }} name="camera" size={40} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Message")}
            >
              <SimpleLineIcons
                name="paper-plane"
                style={{ marginRight: 20 }}
                size={35}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Camera"
        component={CameraNavigator}
        options={{
          title: null,
          headerTintColor: "white",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export const ActivityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
};

export const CameraNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={CameraUpload}
        options={{
          title: null,
          headerTintColor: "white",
          headerShown: false,
        }}
      />
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  );
};

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
