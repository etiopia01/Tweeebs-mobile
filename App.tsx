import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import NewTweeb from "./components/NewTweeb";
import TweebCard from "./components/TweebCard";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "./components/loginPage";
import SideNav from "./components/SideNav";
import { Tweeb } from "./components/types";
import supabase from "./lib/supabase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Home() {
  const session = useSession();

  const [error, setError] = useState<string | undefined>(undefined);
  const [tweebs, setTweebs] = useState<Tweeb[] | null>(null);
  const [add, setAdd] = useState(false);
  const [bypass, setBypass] = useState(true);

  useEffect(() => {
    async function fetchTweebs() {
      const { data, error } = await supabase.from("tweeebs").select();

      if (error) {
        setError("Could not load tweeebs");
      }
      if (data) {
        setTweebs(data);
        setError(undefined);
      }
    }
    fetchTweebs();
  }, [add, supabase]);

  const handleRemove = (id: number) => {
    setTweebs((prev) => prev?.filter((tweeb) => tweeb.id !== id) || []);
  };

  const addTweeb = () => {
    setAdd((prev) => !prev);
  };

  if (!session && !bypass) {
    return <LoginPage />;
  } else {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View>
          <SideNav />
          <View style={styles.header}>
            <Text style={styles.headerText}>TWeeebs</Text>
          </View>
          <NewTweeb add={addTweeb} />
          <ScrollView>
            {tweebs &&
              tweebs.map((tweeb) => (
                <TweebCard key={tweeb.id} tweeb={tweeb} remove={handleRemove} />
              ))}
          </ScrollView>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#6B7280",
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D1D5DB",
    marginBottom: 6,
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
});
