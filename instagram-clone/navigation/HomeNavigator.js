import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import Map from "../screens/main/Map";
import Home from "../screens/main/Home";
import Upload from "../screens/main/Post";
import Search from "../screens/main/Search";
import Profile from "../screens/main/Profile";
import EditProfile from "../screens/main/EditProfile";
import Activity from "../screens/main/Activity";
import CameraUpload from "../screens/main/CameraUpload";

import styles from "../screens/styles/style";

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

      <Stack.Screen name="Map" component={Map} />
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
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
