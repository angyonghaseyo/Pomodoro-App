import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import CircularCountdown from './CircularCountdown'; // <-- Import it

const image = {
  uri: "https://s.yimg.com/uu/api/res/1.2/DdytqdFTgtQuxVrHLDdmjQ--~B/aD03MTY7dz0xMDgwO3NtPTE7YXBwaWQ9eYTachy on-/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
};

function FocusScreen({ route }) {
  const { taskId, taskTitle, markTaskAsDone } = route.params;
  const [seconds, setSeconds] = useState(10); // For demo purposes
  const [taskDone, setTaskDone] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (isStarted && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      finishFocus();
    }

    return () => clearInterval(interval);
  }, [isStarted, isPaused, seconds]);

  const finishFocus = () => {
    markTaskAsDone(taskId);
    setTaskDone(true);
    setIsStarted(false);
  };

  const togglePause = () => setIsPaused(!isPaused);
  const startTimer = () => setIsStarted(true);
  const stopTimer = () => {
    setIsStarted(false);
    setSeconds(10);
    setIsPaused(false);
  };

  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text>Focusing on: {taskTitle} (Task: {taskId})</Text>

        <CircularCountdown
          radius={45}
          strokeWidth={5}
          secondsLeft={seconds}
          totalSeconds={10}
        />

        {!taskDone ? (
          <>
            {!isStarted ? (
              <Button title="Start" onPress={startTimer} />
            ) : (
              <>
                {isPaused ? (
                  <Button title="Play" onPress={togglePause} />
                ) : (
                  <Button title="Pause" onPress={togglePause} />
                )}
                <Button title="Restart" onPress={stopTimer} />
                <Button title="Mark as Done" onPress={finishFocus} />
              </>
            )}
          </>
        ) : (
          <Text>Task completed!</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  }
});

export default FocusScreen;
