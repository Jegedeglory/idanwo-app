import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './InitialScreen';
import { Ionicons } from '@expo/vector-icons';

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const topUsers = [
    { id: 2, name: 'John Doe', score: '760', avatar: { uri: 'https://via.placeholder.com/100' } },
    { id: 1, name: 'David James', score: '980', avatar: { uri: 'https://via.placeholder.com/100' }, isTop: true },
    { id: 3, name: 'Michael', score: '700', avatar: { uri: 'https://via.placeholder.com/100' } },
  ];

  // Other users in ranking
  const otherUsers = [
    { id: 4, name: 'Smith Carol', score: '6/10', avatar: { uri: 'https://via.placeholder.com/40' } },
    { id: 5, name: 'Harry', score: '5/10', avatar: { uri: 'https://via.placeholder.com/40' } },
    { id: 6, name: 'Jon', score: '4/10', avatar: { uri: 'https://via.placeholder.com/40' } },
    { id: 7, name: 'Ken', score: '3/10', avatar: { uri: 'https://via.placeholder.com/40' } },
    { id: 8, name: 'Potter', score: '2/10', avatar: { uri: 'https://via.placeholder.com/40' } },
  ];
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Leaderboard</Text>
      <View style={styles.placeholder} />
    </View>

    <View style={styles.topUsersContainer}>
      {topUsers.map((user, index) => {
        // Arrange users with winner in middle, 2nd on left, 3rd on right
        const position = index === 0 ? 'left' : index === 1 ? 'middle' : 'right';
        return (
          <View 
            key={user.id} 
            style={[
              styles.topUserItem, 
              position === 'left' && styles.leftUser,
              position === 'middle' && styles.middleUser,
              position === 'right' && styles.rightUser,
            ]}
          >
            <View style={[
              styles.avatarContainer, 
              position === 'middle' && styles.winnerAvatarContainer
            ]}>
              {position === 'middle' && (
                <View style={styles.crownContainer}>
                  <Text style={styles.crown}>👑</Text>
                </View>
              )}
              <Image source={user.avatar} style={styles.topAvatar} />
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userScore}>{user.score}</Text>
          </View>
        );
      })}
    </View>

    <View style={styles.rankListContainer}>
  <View style={styles.arcOverlay} />
  <ScrollView contentContainerStyle={styles.rankList}>
    {otherUsers.map((user) => (
      <View key={user.id} style={styles.rankItem}>
        <Text style={styles.rankNumber}>{user.id}</Text>
        <Image source={user.avatar} style={styles.rankAvatar} />
        <Text style={styles.rankName}>{user.name}</Text>
        <Text style={styles.rankScore}>{user.score}</Text>
      </View>
    ))}
  </ScrollView>
</View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#5C8D89',
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 12,
},
backButton: {
  padding: 8,
},
headerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
},
placeholder: {
  width: 40,
},
topUsersContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  paddingTop: 12,
  paddingBottom: 32,
},
topUserItem: {
  alignItems: 'center',
  marginHorizontal: 12,
},
leftUser: {
  marginTop: 40,
},
middleUser: {
  marginTop: 0,
},
rightUser: {
  marginTop: 40,
},
avatarContainer: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#4A7A76',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#4A7A76',
  overflow: 'hidden',
},
winnerAvatarContainer: {
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 3,
  borderColor: '#FFD700',
},
crownContainer: {
  position: 'absolute',
  top: -15,
  zIndex: 1,
},
crown: {
  fontSize: 24,
},
topAvatar: {
  width: '100%',
  height: '100%',
  borderRadius: 50,
},
userName: {
  color: 'white',
  fontWeight: '600',
  marginTop: 8,
  fontSize: 14,
},
userScore: {
  color: '#E0E0E0',
  fontSize: 12,
  marginTop: 2,
},
rankListContainer: {
  flex: 1,
  backgroundColor: 'white',
  overflow: 'hidden',
  borderTopLeftRadius: 200, // Large radius for the arc
  borderTopRightRadius: 200,
},
arcOverlay: {
  position: 'absolute',
  top: -20, // Adjust to control the arc height
  left: 0,
  right: 0,
  height: 200, // Adjust to control the arc height
  backgroundColor: 'white',
  borderBottomLeftRadius: 200, // Create the arc
  borderBottomRightRadius: 200,
},
rankList: {
  padding: 26,
  marginTop: 100,
},
rankItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
},
rankNumber: {
  width: 30,
  fontSize: 16,
  fontWeight: 'bold',
  color: '#555',
},
rankAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 12,
},
rankName: {
  flex: 1,
  fontSize: 16,
  fontWeight: '500',
},
rankScore: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#777',
},
});

// export defaulthttps://www.figma

export default ProfileScreen;