import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import {
  HomeNavigator,
  SearchNavigator,
  ActivityNavigator,
  CameraNavigator,
  ProfileNavigator,
} from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      options={{
        tabBar: { visible: false },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={(navigation) => ({
          tabBarVisible:
            navigation.route.state === undefined ||
            navigation.route.state.routes.length === 1,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={32}
              />
            );
          },
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
