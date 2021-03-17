import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { bodycolor } from '../../utils/color';
import { fontsizes, spacing } from '../../utils/sizes';

const minituesToMillis = (min) => min * 1000 * 60;
const formatMinute = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minitues = 1, isPaused, progressBar, onEnd }) => {
  const [milis, setMillis] = useState(null);
  const interval = React.useRef(null);
  const countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      
      return timeLeft;
    });
  };
  useEffect(() => {
    setMillis(minituesToMillis(minitues));
  }, [minitues]);
  useEffect(()=>{
progressBar(milis / minituesToMillis(miniutes));
if(milis===0){
  onEnd()
}
  },[milis])
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const miniutes = Math.floor(milis / 1000 / 60) % 60;
  const second = Math.floor(milis / 1000) % 60;

  return (
    <Text style={styles.title}>
      {formatMinute(miniutes)} : {formatMinute(second)}{' '}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontsizes.xxxl,
    fontWeight: 'bold',
    backgroundColor: 'rgba(94,132,226,0.3)',
    padding: spacing.lg,
    color: bodycolor.white,
  },
});
