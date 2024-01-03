import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";
import { Tweeb } from "./types";

interface TweebCardProps {
  tweeb: Tweeb;
  remove: (id: number) => void;
}

const TweebCard: React.FC<TweebCardProps> = ({ tweeb, remove }) => {
  const session = useSession();

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("tweeebs")
      .delete()
      .eq("id", tweeb.id)
      .select();

    remove(tweeb.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: tweeb.author_avatar }} />
        <View style={styles.headerText}>
          <Text style={styles.author}>{tweeb.author}</Text>
          <Text style={styles.date}>
            {new Date(tweeb.created_at).toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{tweeb.title}</Text>
          <Text style={styles.topic}>{tweeb.topic}</Text>
        </View>
        <Text style={styles.contentText}>{tweeb.content}</Text>
        {tweeb.uploads && (
          <View style={styles.imageContainer}>
            {tweeb.uploads.map((file, index) => (
              <Image key={index} source={{ uri: file }} style={styles.image} />
            ))}
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text>{tweeb.likes?.length}</Text>
        </TouchableOpacity>
        {tweeb.author === session?.user.user_metadata.name && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>x</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#4B5563",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontSize: 16,
    color: "#CBD5E0",
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  content: {
    marginLeft: 56,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    color: "#D1D5DB",
  },
  topic: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#6B7280",
    marginLeft: 8,
  },
  contentText: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  deleteButton: {
    paddingHorizontal: 8,
    borderRadius: 16,
    alignSelf: "flex-end",
    backgroundColor: "#1F2937",
  },
  deleteButtonText: {
    color: "#D1D5DB",
  },
});

export default TweebCard;
