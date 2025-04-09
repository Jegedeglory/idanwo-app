// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import InitialScreen, { RootStackParamList } from './src/screens/InitialScreen';
import DetailsScreen from './src/screens/quizScreen';
import ProfileScreen from './src/screens/LeaderBoardScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InitialScreen">
        <Stack.Screen 
          name="InitialScreen" 
          component={InitialScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={({ route }) => ({
        headerStyle: { backgroundColor: "#EFF0F3" },
        headerTintColor: "#000",
        headerShadowVisible: false,
        headerTitle: () => (
          <React.Fragment>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: "20%" }}>
              <Text style={{ color: "#004643", fontSize: 14 }}>
                {route.params?.title}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                {route.params?.firstText}
              </Text>
            </View>
          </React.Fragment>
        ),
          })}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'User Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}