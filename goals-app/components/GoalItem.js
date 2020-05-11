import React from "react";
import { View, Text, CheckBox, TouchableOpacity } from "react-native";
import { styles } from "../assets/css/styles";

const GoalItem = (props) => {
  const deleteGoalHandler = () => {
    props.onDelete(props.item.id);
  };

  return (
    <TouchableOpacity onPress={deleteGoalHandler}>
      <View style={styles.goalWrapper}>
        <Text>{`${props.item.id.toString()} ${props.item.content}`}</Text>
        <View>
          <CheckBox />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalItem;
