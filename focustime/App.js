import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { FocustHistory } from './src/features/focus/focusHistory';
import { bodycolor } from './src/utils/color';
import { Timer } from './src/features/timer/timer';
import { spacing } from './src/utils/sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STATUS = {
  create: 1,
  canceled: 0,
};
export default function App() {
  const [focustSubject, setfocustSubject] = useState(null);
  const [focustHistory, setfocustHistory] = useState([]);
  const addfocusthistorywithstate = (subject, status) => {
    setfocustHistory([...focustHistory, {key:String(focustHistory.length+1), subject, status }]);
  };
  const onClear = () => {
    setfocustHistory([]);
  };
  const saveFocustHistory = async () => {
    try {
      await AsyncStorage.setItem('FocusHistory', JSON.stringify(focustHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory=async()=>{
    try{
      const history= await AsyncStorage.getItem('FocusHistory')
      if(history && JSON.parse(history.length)){
        setfocustHistory(JSON.parse(history))
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    loadFocusHistory()
  },[])
  useEffect(() => {
    saveFocustHistory();
  }, [focustHistory]);
  return (
    <View style={styles.container}>
      {focustSubject ? (
        <Timer
          focustSubject={focustSubject}
          onTheEnd={() => {
            addfocusthistorywithstate(focustSubject, STATUS.create);
            setfocustSubject(null);
          }}
          clearSubject={() => {
            addfocusthistorywithstate(focustSubject, STATUS.canceled);
            setfocustSubject(null);
          }}
        />
      ) : (
        //return ettiğimiz yazıyı import ettik
        <View style={{flex:1 }}>
          <Focus addsubject={setfocustSubject} />
          <FocustHistory focusHistory={focustHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bodycolor.purple,
    padding: 50,
    paddingTop: Platform.OS === 'ios' ? spacing.xxxl : spacing.lg,
  },
});
