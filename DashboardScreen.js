import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const image1 = {
  uri: "https://s.yimg.com/uu/api/res/1.2/eVhRAfqktvdso0PiNImkXA--~B/aD0xMzU0O3c9MjA0ODtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7bdeb400-112b-11ea-bfee-1085713233ef"
};

function DashboardScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Example', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      const newTaskTitle = inputValue;
      setTasks(prevTasks => [...prevTasks, { id: (tasks.length + 1).toString(), title: newTaskTitle, completed: false }]);
      setInputValue('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const markTaskAsDone = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <ImageBackground source={image1} style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.taskRow}>
              {item.completed ? <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" /> : null}
              <Text style={styles.taskText}>{item.title}</Text>
              
              <View style={styles.buttonContainer}>
                <Button
                  title="Focus"
                  onPress={() => navigation.navigate('Focus', { taskId: item.id, taskTitle: item.title, markTaskAsDone })}
                />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => deleteTask(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Add a new task title..."
          style={styles.input}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15
  },
  taskText: {
    fontSize: 16,
    flex: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5
  }
});

export default DashboardScreen;
