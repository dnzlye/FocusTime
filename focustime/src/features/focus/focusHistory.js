import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { spacing, fontsizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/roundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.itemstyle(item.status)}>{item.subject}</Text>;
};
export const FocustHistory = ({ focusHistory, onClear }) => {
  const clearhistory = () => {
    onClear();
  };


  return (
    <>
      <SafeAreaView style={{ flex:0.5,alignItems:'center' }}>
        {!!focusHistory.length && (
          <>
        <Text style={styles.title}>Things we've focused on </Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={styles.clearContainer}>   
      <RoundedButton size={42} title='Clear' onPress={()=>onClear()}/>
      </View>
          </>
        )}
      </SafeAreaView>
      
    </>
  );
};
const styles = StyleSheet.create({
  itemstyle: (status) => ({
    color: status == 0  ? 'orange' : '#00b894',
    fontSize: fontsizes.xxl,
    fontWeight: 'light',
  }),
  title: {
    color: 'white',
    fontSize: fontsizes.lg,
  },
  clearContainer:{
    alignItems:'center',
    padding:spacing.md
  }
});
