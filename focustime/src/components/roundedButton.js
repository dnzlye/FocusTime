import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {fontSizes,paddingsizes} from '../utils/sizes'
export const RoundedButton = ({
  style = {},
  textstyle = {},
  size = 45,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textstyle]} onPress={props.onPress}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent:"center",
      borderColor:'#fff',
      borderWidth:3,
    },
    text: {
      color: '#fff',
      fontSize: size/3,
    },
  });
