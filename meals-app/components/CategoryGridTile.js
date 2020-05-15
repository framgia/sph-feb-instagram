import React from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import { categoryStyles as styles } from "../assets/stylesheets/Categories";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const CategoryGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableCmp
        style={{ height: "100%" }}
        onPress={() => {
          props.onSelect();
        }}
      >
        <View
          style={{
            ...styles.container,
            ...{ backgroundColor: props.color },
          }}
        >
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

export default CategoryGridTile;
