import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function ImagePreview({ photoUri }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image Preview:</Text>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      ) : (
        <Text style={styles.text}>No image captured</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
