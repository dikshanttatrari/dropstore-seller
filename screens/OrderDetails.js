import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Orders from "../components/Orders";
import { useNavigation } from "@react-navigation/native";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const fetchOrderDetails = async () => {
    const response = await fetch(
      "http://https://dropstore-seller-api.onrender.com//all-orders",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    setOrders(data);
  };

  const handleDetails = (id) => {
    navigation.navigate("user-order-details", { orderId: id, data: orders });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orders?.delivered, orders]);

  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View>
        <View
          style={{
            backgroundColor: "#333",
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              padding: 10,
              fontFamily: "semiBold",
              fontSize: 18,
            }}
          >
            All Orders
          </Text>
        </View>
        <View>
          {orders.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#333",
                  padding: 5,
                  marginHorizontal: 20,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#1e88e5",
                    borderRadius: 8,
                    marginHorizontal: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "semiBold",
                      marginLeft: 2,
                    }}
                  >
                    Orders of {item?.shippingAddress?.name}
                  </Text>
                  <Pressable
                    onPress={() => handleDetails(item?._id)}
                    style={{
                      backgroundColor: "white",
                      padding: 2,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{ fontFamily: "semiBold", paddingHorizontal: 4 }}
                    >
                      Details
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Orders item={item} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
