import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import DefaultText from "../components/DefaultText";
import { mealsStyle as styles } from "../assets/stylesheets/Meal";

const MealItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mealItem}>
      <TouchableCmp onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.row, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.item.imageUrl }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text numberOfLines={2} style={styles.title}>
                  {props.item.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.row, ...styles.mealDetail }}>
            <DefaultText>{props.item.duration}m</DefaultText>
            <DefaultText>{props.item.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.item.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

export default MealItem;
