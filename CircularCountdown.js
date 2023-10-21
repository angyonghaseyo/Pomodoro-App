import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

function CircularCountdown({ radius, strokeWidth, secondsLeft, totalSeconds }) {
  const circumference = 2 * Math.PI * radius;
  const dashoffset = ((secondsLeft / totalSeconds) * circumference);

  return (
    <View>
      <Svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#ddd"
        />
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#f00"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${radius + strokeWidth}, ${radius + strokeWidth})`}
        />
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{secondsLeft}s</Text>
      </View>
    </View>
  );
}

export default CircularCountdown;
