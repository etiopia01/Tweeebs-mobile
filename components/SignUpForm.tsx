import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import supabase from "../lib/supabase";
import { validateEmail } from "./utils";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (validateEmail(userData.email)) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              username: userData.username,
            },
          },
        });
        alert("Check your email for confirmation");
        setUserData({ username: "", email: "", password: "" });
        setEmailError(null);
      } catch (error) {
        alert(error);
      }
    } else setEmailError("Email not valid");
  };

  return (
    <>
      <View
        onTouchStart={() => setEmailError(null)}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Select username"
          value={userData.username}
          onChangeText={(value) => handleChange("username", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={userData.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Choose password"
          value={userData.password}
          secureTextEntry={true}
          onChangeText={(value) => handleChange("password", value)}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ backgroundColor: "#84CC16" }}
        disabled={!userData.email || !userData.password || !userData.username}
      >
        <Text>Create Account</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#6B7280",
    borderWidth: 1,
    marginBottom: 2,
    padding: 8,
    color: "#93C5FD",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginBottom: 2,
  },
});

export default SignUpForm;
