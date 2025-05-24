import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './InitialScreen';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

type User = {
  id: number;
  name: string;
  score: string;
  avatar: { uri: string };
  isTop?: boolean;
};

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/leaderboard');
        const data = await response.json();

        if (Array.isArray(data)) {
          // Process the leaderboard data
          const processedData = data.map((user, index) => ({
            id: index + 1,
            name: user.username,
            score: user.score.toString(),
            avatar: { 
              uri: getAvatarForRank(index + 1)
            },
            isTop: index === 0
          }));

          // Split into top 3 and others
          if (processedData.length > 0) {
            const top = processedData.slice(0, 3);
            // Ensure we have exactly 3 top users
            while (top.length < 3) {
              top.push({
                id: top.length + 1,
                name: 'No Player',
                score: '0',
                avatar: { uri: 'https://img.icons8.com/fluency/96/pawn.png' }
              });
            }

            // Sort top users to have winner in the middle
            const sortedTop = [
              top[1], // 2nd place on left
              top[0], // 1st place in middle
              top[2]  // 3rd place on right
            ];

            setTopUsers(sortedTop);
            setOtherUsers(processedData.slice(3));
          } else {
            // Fallback to sample data if no users
            setDefaultUsers();
          }
        } else {
          // Fallback to sample data if response is not an array
          setDefaultUsers();
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setDefaultUsers();
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getAvatarForRank = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'https://img.icons8.com/fluency/96/crown.png';
      case 2:
        return 'https://img.icons8.com/fluency/96/queen.png';
      case 3:
        return 'https://img.icons8.com/fluency/96/rook.png';
      case 4:
        return 'https://img.icons8.com/fluency/96/knight.png';
      case 5:
        return 'https://img.icons8.com/fluency/96/bishop.png';
      default:
        return rank <= 9 
          ? 'https://img.icons8.com/fluency/96/pawn.png'
          : 'https://img.icons8.com/fluency/96/cancel.png';
    }
  };

  const setDefaultUsers = () => {
    const defaultTopUsers = [
      { id: 2, name: 'Michael', score: '760', avatar: { uri: 'https://img.icons8.com/fluency/96/queen.png' } },
      { id: 1, name: 'David James', score: '980',  avatar: { uri: 'https://img.icons8.com/fluency/96/crown.png' }, isTop: true},
      { id: 3, name: 'John Doe', score: '700', avatar: { uri: 'https://img.icons8.com/fluency/96/rook.png' } },
    ];

    const defaultOtherUsers = [
      { id: 4, name: 'Smith Carol', score: '6/10', avatar: { uri: 'https://img.icons8.com/fluency/96/knight.png' } },
      { id: 5, name: 'Harry', score: '5/10', avatar: { uri: 'https://img.icons8.com/fluency/96/bishop.png' } },
      { id: 6, name: 'Jon', score: '4/10', avatar: { uri: 'https://img.icons8.com/fluency/96/pawn.png' } },
      { id: 7, name: 'Ken', score: '3/10', avatar: { uri: 'https://img.icons8.com/fluency/96/pawn.png' } },
      { id: 8, name: 'Potter', score: '2/10', avatar: { uri: 'https://img.icons8.com/fluency/96/pawn.png' } },
      { id: 9, name: 'Stephen', score: '1/10', avatar: { uri: 'https://img.icons8.com/fluency/96/pawn.png' } },
    ];

    setTopUsers(defaultTopUsers);
    setOtherUsers(defaultOtherUsers);
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading leaderboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.topUsersContainer}>
        {topUsers.map((user, index) => {
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

      <View style={styles.waveContainer}>
        <Svg
          height="20"
          width="100%"
          viewBox="0 0 1440 320"
          style={styles.waveSvg}
          preserveAspectRatio="none"
        >
          <Path
            d="M0,320C240,160,480,0,720,0C960,0,1200,160,1440,320L1440,320L0,320Z"
            fill="white"
            fillOpacity="1"
          />
        </Svg>
      </View>

      <View style={styles.rankListContainer}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
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
    paddingBottom: 20,
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
  waveContainer: {
    marginTop: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  waveSvg: {
    position: 'relative',
    width: '100%',
  },
  rankListContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  rankList: {
    padding: 26,
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

export default ProfileScreen;
