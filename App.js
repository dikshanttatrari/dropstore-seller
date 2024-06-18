import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import Toast from "react-native-toast-message";
import BottomTabs from "./BottomTabs";
import { UserContext } from "./userContext";

export default function App() {
  let [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/poppins.ttf"),
    semiBold: require("./assets/fonts/semiBold.ttf"),
    bold: require("./assets/fonts/bold.ttf"),
    extraBold: require("./assets/fonts/extraBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserContext>
      <StackNavigator />

      <Toast />
    </UserContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
