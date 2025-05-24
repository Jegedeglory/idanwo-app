import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./InitialScreen";
import { MaterialIcons } from "@expo/vector-icons";
import CircularTimer from "../component/Timer";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
};

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, "Details">;
  navigation: StackNavigationProp<RootStackParamList, "Details">;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { title, itemId, username } = route.params;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/quizzes");
        const data = await response.json();

        if (data && data.length > 0 && data[0].questions) {
          setQuestions(data[0].questions);
        } else {
          // Fallback to sample questions if no questions are returned
          setQuestions([
            {
              id: "1",
              text: "In what year did the United States host the FIFA World Cup for the first time?",
              options: ["1986", "1994", "2002", "2010"],
              correctAnswer: 1
            },
            {
              id: "2",
              text: "Which planet is known as the Red Planet?",
              options: ["Venus", "Jupiter", "Mars", "Saturn"],
              correctAnswer: 2
            },
            {
              id: "3",
              text: "What is the capital of Japan?",
              options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
              correctAnswer: 2
            }
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Fallback to sample questions
        setQuestions([
          {
            id: "1",
            text: "In what year did the United States host the FIFA World Cup for the first time?",
            options: ["1986", "1994", "2002", "2010"],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "Which planet is known as the Red Planet?",
            options: ["Venus", "Jupiter", "Mars", "Saturn"],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "What is the capital of Japan?",
            options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
            correctAnswer: 2
          }
        ]);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = async () => {
    // Save the current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption !== null ? selectedOption : -1;
    setAnswers(newAnswers);

    // Check if answer is correct and update score
    if (selectedOption !== null && questions[currentQuestionIndex] && 
        selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    // If this was the last question, submit the quiz
    if (currentQuestionIndex === questions.length - 1) {
      try {
        // Submit quiz to backend
        const response = await fetch(`http://localhost:3001/api/quizzes/1/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            username,
            answers: newAnswers
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit quiz");
        }

        // Navigate to leaderboard
        navigation.navigate("Profile");
      } catch (error) {
        console.error("Error submitting quiz:", error);
        Alert.alert("Error", "Failed to submit quiz. Your score may not be saved.");
        navigation.navigate("Profile");
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(60); // Reset timer for next question
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#0D7377" />
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}> 
        <CircularTimer
          current={timeLeft}
          total={60}
          backgroundColor="#E9F5F3"
          progressColor="#2D6E63"
          textColor="#333333"
          key={`${currentQuestionIndex}-${timeLeft}`}
          size={160}
          strokeWidth={14}
        />
        <View style={{ margin: 10 }}></View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {currentQuestion?.text || "No question available"}
          </Text>
        </View>

        <View style={styles.answersContainer}>
          {currentQuestion?.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerOption,
                selectedOption === index && styles.selectedOption,
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

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#0D7377",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "relative",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  questionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    lineHeight: 22,
  },
  answersContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  answerOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: "#E3F1EF",
    borderColor: "#0D7377",
  },
  answerText: {
    fontSize: 16,
    color: "#333",
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#d0d0d0",
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#0D7377",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#0D7377",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomNav: {
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
  },
  navItem: {
    alignItems: "center",
  },
});

export default DetailsScreen;
