import React from "react";
import { FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import { CATEGORIES } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
  const renderGridItem = (item_data) => {
    return (
      <CategoryGridTile
        title={item_data.item.title}
        color={item_data.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: { categoryId: item_data.item.id },
          });
        }}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
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
    headerStyle: {
      backgroundColor: Platform.OS == "android" ? Colors.primaryColor : "",
    },
    headerTintColor: Platform.OS == "android" ? "white" : Colors.primaryColor,
  };
};

export default CategoriesScreen;
