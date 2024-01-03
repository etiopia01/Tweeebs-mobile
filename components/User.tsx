import React from "react";
import { Image, StyleSheet } from "react-native";

const User = ({ name, pic }: { name: string; pic: string }) => {
  return <Image source={{ uri: pic }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20, // Assuming you want a circular image
  },
});

export default User;
