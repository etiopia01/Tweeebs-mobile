import { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import supabase from "../lib/supabase";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>TWeeebs</Text>
        <Text style={styles.subtitleText}>A manga and anime hub</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginWithGoogle} style={styles.googleBtn}>
          <Text style={styles.loginText}>Login with Google</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        {!showSignIn ? (
          <TouchableOpacity
            onPress={() => {
              setShowSignIn(true);
              setShowSignUp(false);
            }}
            style={styles.signBtn}
          >
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        ) : (
          <SignInForm />
        )}
        {!showSignUp ? (
          <TouchableOpacity
            onPress={() => {
              setShowSignUp(true);
              setShowSignIn(false);
            }}
            style={styles.signBtn}
          >
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <SignUpForm />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010B13",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitleText: {
    fontSize: 18,
    color: "#6B7280",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  orText: {
    fontSize: 16,
    color: "#6B7280",
  },
  googleBtn: {
    padding: 7,
    borderRadius: 8,
    backgroundColor: "grey",
    fontWeight: "bold",
  },
  signBtn: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: "green",
    fontWeight: "bold",
    width: 100,
  },
  loginText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default LoginPage;
