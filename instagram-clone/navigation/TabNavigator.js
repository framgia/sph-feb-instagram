import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import Home from "../screens/main/Home";
import Search from "../screens/main/Search";
import Activity from "../screens/main/Activity";
import Upload from "../screens/main/Upload";
import Profile from "../screens/main/Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={32}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "md-search" : "ios-search"} size={32} />
          ),
        })}
      />
      <Tab.Screen
        name="Camera"
        component={CameraNavigator}
        options={() => ({
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
              size={32}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityNavigator}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-heart" : "ios-heart-empty"}
              size={32}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={32}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
