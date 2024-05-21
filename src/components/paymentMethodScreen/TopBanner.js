import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function TopBanner({title, icon}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.text}>Month : September</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#011F4B",
    width: '100%',
  },
  text: {
    paddingLeft: 12,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: "white"
  },
});
