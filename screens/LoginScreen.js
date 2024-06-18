import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Logo from "../assets/images/logo.png";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        navigation.navigate("home");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      const user = {
        email: email,
        password: password,
      };
      const res = await axios.post(
        "http://https://dropstore-seller-api.onrender.com//login",
        user
      );
      Toast.show({
        type: "success",
        text1: "Logged in successfully",
        text1Style: {
          fontFamily: "poppins",
          fontSize: 16,
        },
        visibilityTime: 2000,
      });
      const token = res.data.token;
      await AsyncStorage.setItem("authToken", token);
      navigation.navigate("home");
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
      console.log("Error in login", err);
    }
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
        <Image
          source={Logo}
          style={{ height: 70, width: 70, marginTop: 10, alignSelf: "center" }}
        />
        <Text
          style={{
            color: "white",
            fontFamily: "semiBold",
            fontSize: 18,
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Login to your account now.
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
                secureTextEntry={!showPassword}
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
        <Pressable onPress={() => navigation.navigate("forgot-password")}>
          <Text
            style={{
              fontFamily: "semiBold",
              fontSize: 16,
              textAlign: "right",
              marginRight: 8,
              marginTop: 8,
              color: "#e23856",
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable
          onPress={handleLogin}
          style={{
            backgroundColor: "#e23856",
            marginHorizontal: "auto",
            width: "40%",
            padding: 5,
            borderRadius: 10,
            marginTop: 20,
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
            Login
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
          Don't have an account?{" "}
          <Text
            style={{ color: "#e23856", fontFamily: "semiBold" }}
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            Register
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
