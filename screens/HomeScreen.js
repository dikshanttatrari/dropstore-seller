import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../userContext";
import axios from "axios";
import Users from "../components/Users";

const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(
          `http://https://dropstore-seller-api.onrender.com//users/${userId}`
        )
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log("Error fetching users", err);
        });
    };
    fetchUsers();
  }, []);

  return (
    <View style={{ backgroundColor: "#111", height: "100%" }}>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <Users key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
