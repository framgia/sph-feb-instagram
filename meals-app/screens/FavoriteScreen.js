import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";

const FavoriteScreen = (props) => {
  const favorites = useSelector((state) => state.meals.favoriteMeals);

  if (favorites.length === 0 || !favorites) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start Adding Some</DefaultText>
      </View>
    );
  }
  return <MealList meals={favorite} navigation={props.navigation} />;
};

FavoriteScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoriteScreen;
