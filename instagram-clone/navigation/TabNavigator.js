import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import {
  HomeNavigator,
  CameraNavigator,
  ActivityNavigator,
  SearchNavigator,
  ProfileNavigator,
} from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarVisible: route.state == undefined || route.state.index != 1,
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
        component={ProfileNavigator}
        options={({ route }) => ({
          tabBarVisible: route.state == undefined || route.state.index != 1,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name={focused ? "person" : "person-outline"}
                size={32}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
