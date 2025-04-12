import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './InitialScreen';
import { MaterialIcons } from '@expo/vector-icons';
import CircularTimer from '../component/Timer';

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Details'>;
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
};


const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, itemId } = route.params;
  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const totalQuestions = 20;
  const answeredQuestions = 4;

  const options = ["1986", "1994", "2002", "2010"];

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      {/* <Text style={styles.progress}>
        {answeredQuestions}/{totalQuestions}
      </Text> */}
      {/* <Text style={styles.title}>{title}</Text>
      <Text>{itemId}</Text> */}

        {/* <View style={styles.timerContainer}>
          <View style={styles.timer}>
            <Text style={styles.timerText}>30</Text>
          </View>
        </View> */}

<CircularTimer
        duration={60} // Duration in seconds
        size={200}    // Size of the circle in pixels
        strokeWidth={20} // Thickness of the progress line
      />
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            In what year did the United States host the FIFA World Cup for the first time?
          </Text>
        </View>
        
        <View style={styles.answersContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerOption,
                selectedOption === index && styles.selectedOption
              ]}
              onPress={() => handleOptionPress(index)}
            >
              <Text style={styles.answerText}>{option}</Text>
              {selectedOption === index ? (
                <View style={styles.checkIcon}>
                  <MaterialIcons name="check" size={18} color="white" />
                </View>
              ) : (
                <View style={styles.radioButton} />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Next Button */}
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#0D7377',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  timerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 22,
  },
  answersContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  answerOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#E3F1EF',
    borderColor: '#0D7377',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d0d0d0',
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0D7377',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#0D7377',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default DetailsScreen;