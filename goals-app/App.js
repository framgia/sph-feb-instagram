import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { styles } from "./assets/css/styles";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const insertGoal = (newGoal) => {
    if (newGoal.content) {
      setCourseGoals(() => [...courseGoals, newGoal]);
    }
    toggleModal();
  };

  const removeGoal = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.screen}>
      <StatusBar />
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
          Goal App
        </Text>
      </View>
      {/* Task Panel */}
      <View style={styles.taskPanel}>
        {/* Task Form */}
        <GoalInput
          modalVisible={modalVisible}
          handleSubmit={insertGoal}
          courseGoals={courseGoals}
          closeModal={toggleModal}
        />
        {/* Task List */}
        {!courseGoals.length ? (
          <View>
            <Text> No Data </Text>
          </View>
        ) : (
          <FlatList
            data={courseGoals}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <GoalItem item={itemData.item} onDelete={removeGoal} />
            )}
          />
        )}
      </View>
      {/* GoalFormModal */}
      <TouchableOpacity style={styles.addGoalButton} onPress={toggleModal}>
        <Text style={styles.goalButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
