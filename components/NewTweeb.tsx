import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useSession } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { Tweeb } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface NewTweebProps {
  add: () => void;
}

const NewTweeb: React.FC<NewTweebProps> = ({ add }) => {
  const session = useSession();

  const [uploads, setUploads] = useState<string[]>();
  const [tweeb, setTweeb] = useState<Tweeb>({
    title: "",
    content: "",
    author: "",
    author_avatar: "",
    topic: "",
    id: 0,
    created_at: "",
  });

  const handleChange = (name: keyof Tweeb, value: string) => {
    setTweeb((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    const { data, error } = await supabase
      .from("tweeebs")
      .insert({
        title: tweeb.title,
        topic: tweeb.topic,
        content: tweeb.content,
        author: session?.user.user_metadata.name || "",
        author_avatar: session?.user.user_metadata.avatar_url || "",
        uploads: uploads,
      })
      .select();

    setTweeb((prev) => ({ ...prev, content: "", title: "", topic: "" }));
    setUploads(undefined);
    add();
  };

  const addFiles = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const urls = result.assets.map((e) => e.uri);
        setUploads((prev) => (prev ? [...prev, ...urls] : urls));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your title..."
        placeholderTextColor={"grey"}
        value={tweeb.title}
        onChangeText={(value) => handleChange("title", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="What do you want to talk about?"
        placeholderTextColor={"grey"}
        value={tweeb.topic}
        onChangeText={(value) => handleChange("topic", value)}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Your take on it.."
        placeholderTextColor={"grey"}
        value={tweeb.content}
        multiline
        onChangeText={(value) => handleChange("content", value)}
      />
      {uploads && (
        <View style={styles.imageContainer}>
          {uploads.map((file, index) => (
            <Image key={index} style={styles.image} source={{ uri: file }} />
          ))}
          <TouchableOpacity onPress={() => setUploads(undefined)}>
            <Text style={styles.deleteButton}>x</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.fileInput} onPress={addFiles}>
          <MaterialCommunityIcons name="upload" size={20} color={"white"} />
          <Text style={styles.fileText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePublish}
          style={{ backgroundColor: "white", borderRadius: 8, padding: 10 }}
          disabled={!tweeb.content}
        >
          <Text style={{ fontWeight: "bold" }}>Publish Tweeb</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    padding: 16,
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#6B7280",
    padding: 5,
    color: "white",
    fontSize: 14,
    backgroundColor: "#1F2937",
  },
  multilineInput: {
    height: 80,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 4,
    padding: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  deleteButton: {
    fontSize: 12,
    color: "#6B7280",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    gap: 100,
  },
  fileInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  fileIcon: {
    width: 24,
    height: 24,
  },
  fileText: {
    fontSize: 14,
    color: "#D1D5DB",
  },
});

export default NewTweeb;
