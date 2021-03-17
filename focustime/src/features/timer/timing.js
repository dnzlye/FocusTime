import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import {RoundedButton} from '../../components/roundedButton'

export const Timing=({onChangeTime})=>{
return(
  <>
  <View style={styles.timingButton}>
  <RoundedButton size={100} title="10" onPress={()=>onChangeTime(10)}/>
  </View>
  <View style={styles.timingButton}> 
  <RoundedButton size={100} title="15" onPress={()=>onChangeTime(15)}/>
  </View>
  <View style={styles.timingButton}>
  <RoundedButton size={100} title="20" onPress={()=>onChangeTime(20)}/>
  </View>
  </>
)
}

const styles=StyleSheet.create({
  timingButton:{
    flex:1,
    marginTop:100,
    alignItems:"center",
  }
})