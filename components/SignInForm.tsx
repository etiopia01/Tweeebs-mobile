import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import supabase from "../lib/supabase";

const SignInForm = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      setUserData({ email: "", password: "" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={userData.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Choose password"
        value={userData.password}
        secureTextEntry={true}
        onChangeText={(value) => handleChange("password", value)}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ backgroundColor: "#84CC16" }}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    padding: 16,
    backgroundColor: "#010B13",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#6B7280",
    borderWidth: 1,
    marginBottom: 2,
    padding: 8,
    color: "#F3F4F6",
  },
});

export default SignInForm;
