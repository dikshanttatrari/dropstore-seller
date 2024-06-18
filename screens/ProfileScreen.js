import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.navigate("login");
  };

  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <Text>ProfileScreen</Text>
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#c88568",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: "auto",
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "white",
            padding: 4,
            fontFamily: "semiBold",
            fontSize: 16,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;
