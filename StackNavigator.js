import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import BottomTabs from "./BottomTabs";
import UserOrderDetails from "./screens/UserOrderDetails";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerTitleStyle: {
              fontFamily: "bold",
              fontSize: 24,
              color: "#e23856",
            },

            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{
            title: "Register",
            headerTitleStyle: {
              fontFamily: "bold",
              fontSize: 24,
              color: "#e23856",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forgot-password"
          component={ForgotPasswordScreen}
          options={{
            title: "Forgot Password",
            headerTitleStyle: {
              fontFamily: "bold",
              fontSize: 24,
              color: "#e23856",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="user-order-details"
          component={UserOrderDetails}
          options={{
            title: "User Order Details",
            headerTitleStyle: {
              fontFamily: "bold",
              fontSize: 24,
              color: "#e23856",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
