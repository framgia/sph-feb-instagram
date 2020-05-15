import React from "react";
import { useSelector } from "react-redux";
import { FlatList, View } from "react-native";

import MealItem from "./MealItem";

import Colors from "../constants/Colors";
import { mainStyles as styles } from "../assets/stylesheets/Main";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const isFav = favoriteMeals.some((meal) => meal.id === itemData.item.id);
    return (
      <MealItem
        item={itemData.item}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              title: itemData.item.title,
              isFav: isFav,
              color: props.selectedCategory
                ? props.selectedCategory.color
                : Colors.primaryColor,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.meals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default MealList;
