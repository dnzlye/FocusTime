import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/roundedButton';
import { fontsizes, spacing } from '../../utils/sizes';
export const Focus = ({ addsubject }) => {
  const [subject, setsubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> Would you like to focus on ?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textContainer}
            style={{ marginRight: spacing.md, flex: 1 }}
            onSubmitEditing={({ nativeEvent }) => {
              setsubject(nativeEvent.text);
            }}></TextInput>
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addsubject(subject);
            }}></RoundedButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    color: '#fff',
    fontSize: fontsizes.lg,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
