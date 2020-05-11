import React, { useState } from "react";
import { View, TextInput, Button, Modal } from "react-native";
import { styles } from "../assets/css/styles";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState({});

  const handleGoalInput = (input) => {
    setEnteredGoal({
      id: (props.courseGoals.length + 1).toString(),
      content: input,
      status: "in-progress",
    });
  };

  const submitGoalHandler = () => {
    if (enteredGoal.content) {
      props.handleSubmit(enteredGoal);
      setEnteredGoal({});
    }
  };

  const cancelHandler = () => {
    props.closeModal();
    setEnteredGoal({});
  };

  return (
    <Modal visible={props.modalVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Task ..."
          style={styles.input}
          value={enteredGoal.content}
          onChangeText={handleGoalInput}
        />
        <View style={styles.button}>
          <View style={{ width: 100, marginRight: 7 }}>
            <Button title="Cancel" color="red" onPress={cancelHandler} />
          </View>
          <View style={{ width: 100 }}>
            <Button title="Add" onPress={submitGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;
