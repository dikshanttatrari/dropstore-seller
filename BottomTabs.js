import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AddProducts from "./screens/AddProducts";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import OrderDetails from "./screens/OrderDetails";
import ProfileScreen from "./screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: "#e23856",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#222",
          },
          title: "All Users",
          headerTitleStyle: {
            fontFamily: "bold",
            fontSize: 24,
            color: "#e23856",
          },
          headerTitleAlign: "center",
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "bold",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="home"
                size={24}
                style={{ marginTop: 5 }}
                color={focused ? "#e23856" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="add-products"
        component={AddProducts}
        options={{
          tabBarActiveTintColor: "#e23856",
          tabBarInactiveTintColor: "gray",
          title: "Add Products",
          headerTitleStyle: {
            fontFamily: "bold",
            fontSize: 24,
            color: "#e23856",
          },
          headerTitleAlign: "center",
          tabBarLabel: "Add Products",
          tabBarLabelStyle: {
            fontFamily: "bold",
          },
          tabBarStyle: {
            backgroundColor: "#222",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="pluscircle"
                size={24}
                color={focused ? "#e23856" : "gray"}
                style={{ marginTop: 5 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="order-details"
        component={OrderDetails}
        options={{
          tabBarActiveTintColor: "#e23856",
          tabBarInactiveTintColor: "gray",
          title: "Order Details",
          headerTitleStyle: {
            fontFamily: "bold",
            fontSize: 24,
            color: "#e23856",
          },
          headerTitleAlign: "center",
          tabBarLabel: "Orders",
          tabBarLabelStyle: {
            fontFamily: "bold",
          },
          tabBarStyle: {
            backgroundColor: "#222",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="shopping-bag"
                size={24}
                color={focused ? "#e23856" : "gray"}
                style={{ marginTop: 5 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarActiveTintColor: "#e23856",
          tabBarInactiveTintColor: "gray",
          title: "Profile",
          headerTitleStyle: {
            fontFamily: "bold",
            fontSize: 24,
            color: "#e23856",
          },
          headerTitleAlign: "center",
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontFamily: "bold",
          },
          tabBarStyle: {
            backgroundColor: "#222",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="person-circle"
                size={24}
                color={focused ? "#e23856" : "gray"}
                style={{ marginTop: 5 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
