import { useDispatch } from "react-redux";
import { View, Text, Switch, Platform } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { setFilters } from "../store/actions/meals";

import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";
import { mainStyles } from "../assets/stylesheets/Main";
import { filterStyles as styles } from "../assets/stylesheets/Filter";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FilterScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={mainStyles.screen}>
      <Text style={styles.title}>Available Filters/ Restriction</Text>
      <FilterSwitch
        label="Gluten-Free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />

      <FilterSwitch
        label="Lactose-Free"
        state={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />

      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />

      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
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

export default FilterScreen;
