import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

const QuestionProgressIndicator = ({
  current = 30,
  total = 60,
  size = 60,
  strokeWidth = 6,
  progressColor = '#2D6E63',
  backgroundColor = '#E9F5F3',
  textColor = '#333333'
}: ProgressIndicatorProps) => {
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const halfCircle = size / 2;
  const progressPercentage = (current / total) * 100;
  
  // Calculate the progress stroke dash offset
  const strokeDashoffset = circumference - (circumference * progressPercentage) / 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background Circle */}
          <Circle
            cx={halfCircle}
            cy={halfCircle}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              cx={halfCircle}
              cy={halfCircle}
              r={radius}
              stroke={progressColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </G>
        </Svg>
        <Text style={[styles.progressText, { color: textColor, fontSize: size * 0.35 }]}>
          {current}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    position: 'absolute',
    fontWeight: '600',
  }
});

export default QuestionProgressIndicator;

// Example usage:
export const ProgressExample = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#FFFFFF', borderRadius: 12 }}>
      <QuestionProgressIndicator 
        current={30} 
        total={90} 
        size={60} 
        strokeWidth={6}
        progressColor="#2D6E63"
        backgroundColor="#E9F5F3"
      />
    </View>
  );
};