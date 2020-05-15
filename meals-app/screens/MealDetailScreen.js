import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, Image, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";
import { toggleFavorite } from "../store/actions/meals";

import { mealDetailsStyle as styles } from "../assets/stylesheets/MealDetail";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = useSelector((state) => state.meals.meals);
  const isFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const meal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const favoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: favoriteHandler });
  }, [favoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFavorite: isFavorite });
  }, [isFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{meal.duration}m</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map((ingredient, index) => (
        <ListItem key={index}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {meal.steps.map((step, index) => (
        <ListItem key={index}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("title");
  const color = navigationData.navigation.getParam("color");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFavorite");

  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Platform.OS == "android" ? color : "",
    },
    headerTintColor: Platform.OS == "android" ? "white" : color,
  };
};

export default MealDetailScreen;
