import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { bodycolor } from '../../utils/color';
import { spacing } from '../../utils/sizes';
import { Countdown } from './countDown';
import { RoundedButton } from '../../components/roundedButton';
import { Timing } from './timing';
import { useKeepAwake } from 'expo-keep-awake';
export const Timer = ({ focustSubject, onTheEnd, clearSubject }) => {
  useKeepAwake();
  const DEFAULT_MIN = 1;
  const [isStared, setisStarted] = useState(false);
  const [progress, setprogress] = useState(1);
  const [min, setmin] = useState(0.1);
  const timer = (progress) => {
    setprogress(progress);
  };
  const vibration = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  const onEnd = () => {
    vibration();
    setisStarted(false);
    setprogress(1);
    setmin(DEFAULT_MIN);
    onTheEnd();
  };
  const changeTime = (x) => {
    setisStarted(false);
    setprogress(1);
    setmin(x);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStared}
          progressBar={timer}
          minitues={min}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxxl }}>
        <Text style={styles.title}>Focusing on : </Text>
        <Text style={styles.task}>{focustSubject}</Text>
        <Text style={styles.title}>{`isStarted : ${isStared}`}</Text>
        <View style={{ paddingTop: spacing.md }}>
          <ProgressBar
            color={bodycolor.white}
            style={{ height: 10 }}
            progress={progress}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {isStared ? (
          <RoundedButton
            size={100}
            title="pause"
            onPress={() => {
              setisStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            size={100}
            title="start"
            onPress={() => {
              setisStarted(true);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="clear" onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: bodycolor.white,
    textAlign: 'center',
  },
  task: {
    color: bodycolor.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
