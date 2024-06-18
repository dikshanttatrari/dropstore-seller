import { View, Text, Image, TextInput, Pressable, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Logo from "../assets/images/logo.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Avatar from "../assets/images/avatar.png";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View>
            <Entypo
              name="chevron-left"
              size={30}
              color="#1E88E5"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        );
      },
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setProfilePic(`data:image/png;base64,${result.assets[0].base64}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name: name,
        email: email,
        password: password,
        profilePic: profilePic,
      };
      await axios
        .post(
          "http://https://dropstore-seller-api.onrender.com//register",
          user
        )
        .then((res) => {
          Toast.show({
            type: "success",
            text1: "Registration Successful!!",
            text2: "Please verify your email address.",
          });
          navigation.navigate("login");
        });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error logging in";
      Toast.show({
        type: "error",
        text1: errorMessage,
        text1Style: {
          fontFamily: "poppins",
          fontSize: 16,
        },
        visibilityTime: 2000,
      });
    }
    console.log("Error in registering", err);
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#e28854",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <View>
          <Image
            source={profilePic ? { uri: profilePic } : Avatar}
            style={{
              height: 70,
              width: 70,
              marginTop: 10,
              alignSelf: "center",
              borderRadius: 50,
              resizeMode: "cover",
            }}
          />
          <Text
            onPress={pickImage}
            style={{
              textAlign: "center",
              marginTop: 4,
              fontFamily: "bold",
              fontSize: 12,
              backgroundColor: "white",
              marginHorizontal: "auto",
              color: "#e28854",
              borderRadius: 10,
              padding: 4,
            }}
          >
            Upload Image
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontFamily: "semiBold",
            fontSize: 18,
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Create your account now.
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 8,
            marginHorizontal: "auto",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "semiBold",
                color: "white",
                marginLeft: 8,
                fontSize: 16,
              }}
            >
              Name:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                marginHorizontal: 8,
                borderRadius: 10,
                width: "90%",
                paddingVertical: 8,
              }}
            >
              <MaterialIcons
                name="person"
                size={24}
                color="gray"
                style={{ marginLeft: 10 }}
              />
              <TextInput
                placeholder="Enter your name.."
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  borderRadius: 10,
                  paddingLeft: 10,
                  fontFamily: "poppins",
                  fontSize: 16,
                  width: "90%",
                  paddingRight: 12,
                }}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "semiBold",
                color: "white",
                marginLeft: 8,
                fontSize: 16,
              }}
            >
              E-mail:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                marginHorizontal: 8,
                borderRadius: 10,
                width: "90%",
                paddingVertical: 8,
              }}
            >
              <MaterialCommunityIcons
                name="email"
                size={24}
                color="gray"
                style={{ marginLeft: 10 }}
              />
              <TextInput
                placeholder="Enter your email.."
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  borderRadius: 10,
                  paddingLeft: 10,
                  fontFamily: "poppins",
                  fontSize: 16,
                  width: "90%",
                  paddingRight: 12,
                }}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "semiBold",
                color: "white",
                marginLeft: 8,
                fontSize: 16,
              }}
            >
              Password:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                marginHorizontal: 8,
                borderRadius: 10,
                width: "90%",
                paddingVertical: 8,
              }}
            >
              <MaterialIcons
                name="password"
                size={24}
                color="gray"
                style={{ marginLeft: 10 }}
              />
              <TextInput
                placeholder="Enter your password.."
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={showPassword ? false : true}
                style={{
                  borderRadius: 10,
                  paddingLeft: 10,
                  fontFamily: "poppins",
                  fontSize: 16,
                  width: "77%",
                  paddingRight: 8,
                }}
              />

              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Entypo
                  name={showPassword ? "eye" : "eye-with-line"}
                  size={24}
                  color="gray"
                />
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleRegister}
          style={{
            backgroundColor: "#e23856",
            marginHorizontal: "auto",
            width: "40%",
            padding: 5,
            borderRadius: 10,
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins",
              textAlign: "center",
              color: "white",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </Pressable>

        <Text
          style={{
            fontFamily: "poppins",
            textAlign: "center",
            color: "white",
            marginTop: 10,
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          Already have an account?{" "}
          <Text
            style={{ color: "#e23856", fontFamily: "semiBold" }}
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            Login
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
