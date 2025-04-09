import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { View } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = '#F8C660',
  textColor = '#ffffff',
}) => {
const [currentBackgroundColor, setCurrentBackgroundColor] = React.useState(backgroundColor);

const handlePress = () => {
    setCurrentBackgroundColor(prevColor => (prevColor === backgroundColor ? '#004643' : backgroundColor));
    onPress();
};

return (
    <TouchableOpacity
        style={[styles.button, { backgroundColor: currentBackgroundColor }]}
        onPress={handlePress}
    >
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
