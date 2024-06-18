import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Avatar from "../assets/images/avatar.png";

const Users = ({ item }) => {
  const timeStampToDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear()).slice(0);
    return `${day} ${month} ${year}`;
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#222",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        marginBottom: 5,
      }}
    >
      <Image
        source={item?.profilePic ? { uri: item?.profilePic } : Avatar}
        style={{ height: 40, width: 40, borderRadius: 50 }}
      />
      <Pressable style={{ display: "flex" }}>
        <Text style={{ color: "white", fontFamily: "semiBold", fontSize: 14 }}>
          {item?.name}
        </Text>
        <Text
          style={{
            color: "gray",
            fontFamily: "poppins",
            fontSize: 10,
            marginTop: -2,
          }}
        >
          {item?.email}
        </Text>
      </Pressable>
      <View style={{ marginLeft: 10, alignItems: "center" }}>
        <Text style={{ color: "white", fontFamily: "semiBold", fontSize: 14 }}>
          Role
        </Text>
        <Text
          style={{
            color: "gray",
            fontFamily: "poppins",
            textTransform: "uppercase",
            marginTop: -2,
            fontSize: 11,
          }}
        >
          {item?.role}
        </Text>
      </View>
      <View style={{ marginLeft: 10, alignItems: "center" }}>
        <Text style={{ color: "white", fontFamily: "semiBold", fontSize: 14 }}>
          Verified
        </Text>
        <Text
          style={{
            color: "gray",
            fontFamily: "poppins",
            textTransform: "uppercase",
            marginTop: -2,
            fontSize: 11,
          }}
        >
          {item?.verified.toString()}
        </Text>
      </View>
    </View>
  );
};

export default Users;
