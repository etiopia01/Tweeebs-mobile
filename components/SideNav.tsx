import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";
import User from "./User";

const SideNav = () => {
  const session = useSession();

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      {session && (
        <User
          name={session.user.user_metadata.name}
          pic={session.user.user_metadata.picture}
        />
      )}
      {session && (
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
    padding: 16,
    height: 80,
    borderRightWidth: 1,
    borderRightColor: "#4B5563",
    width: "100%",
  },
  button: {
    fontSize: 16,
    color: "#D1D5DB",
  },
});

export default SideNav;
