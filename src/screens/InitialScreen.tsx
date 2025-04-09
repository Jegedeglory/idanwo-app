
import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../component/CustomButton';

export type RootStackParamList = {
  InitialScreen: undefined;
  Details: { itemId: number; title: string };
  Profile: undefined;
};

type InitialScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'InitialScreen'>;
};

const InitialScreen: React.FC<InitialScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
   <View style={styles.eclipse}>
   <View style={styles.textWrapper}>
          <Text style={styles.quizText}>Ìdánwò</Text>
          <Text style={styles.khelo}>App</Text>
        </View>
    </View>
    <View style={styles.nameInput}>
      <Text style={{ fontSize: 18, color: '#EEEFF2', marginBottom: 8 }}>Enter your name</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputBox}
          placeholder="Your Name"
          placeholderTextColor="#aaaaaa"
        />
      </View>
    </View>
    <View style={{ width: '80%' }}>
        <CustomButton
          title="Start Quiz"
          backgroundColor="#F8C660"
          textColor="#FFFFFF"
          onPress={() =>
            navigation.navigate('Details', { itemId: 123, title: 'Item Details' })
          }
        />
      </View>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 123, title: 'Item Details' })}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      /> */}
    </View>
  );
};

// const InitialScreen: React.FC<InitialScreenProps> = ({ navigation }) => {
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "android" ? 'padding' : undefined}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//           <View style={styles.container}>
//             <View style={styles.eclipse}>
//               <View style={styles.textWrapper}>
//                 <Text style={styles.quizText}>Quiz</Text>
//                 <Text style={styles.khelo}>Khelo</Text>
//               </View>
//             </View>
//             <View style={styles.nameInput}>
//               <Text style={{ fontSize: 18, color: '#EEEFF2', marginBottom: 8 }}>Enter your name</Text>
//               <View style={styles.input}>
//                 <TextInput
//                   style={styles.inputBox}
//                   placeholder="Your Name"
//                   placeholderTextColor="#aaaaaa"
//                 />
//               </View>
//             </View>
//             <View style={{ width: '80%' }}>
//               <CustomButton
//                 title="Start Quiz"
//                 backgroundColor="#F8C660"
//                 textColor="#FFFFFF"
//                 onPress={() =>
//                   navigation.navigate('Details', { itemId: 123, title: 'Item Details' })
//                 }
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#004643',
    backgroundColor: 'rgba(0, 70, 67, 0.7)', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  eclipse: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '30%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  textWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  quizText: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 40,
    fontWeight: 700,
    textAlign: 'center',
    color: '#004643',
    marginBottom: -10,
  },
  khelo: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'right',
    color: '#F8C660',
    position: 'absolute',
    bottom: -20,
    right: -4,
  },
  nameInput: {
    marginTop: "auto",
    width: '80%',
    marginBottom: "30%",
    },
input: {
  backgroundColor: "transparent",
   borderRadius: 8,
    paddingHorizontal: 10,
     paddingVertical: 5,
   width: '100%',
   borderColor: '#EEEFF2',
   borderWidth: 1,
},

  inputBox: {
    height: 40, 
    color: '#004643',
  },
  button: {
    backgroundColor: '#F8C660',
    borderRadius: 5,
    margin: 20,
    width: '80%',
    padding: 10,
  },

});

export default InitialScreen;



