import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const UserOrderDetails = () => {
  const route = useRoute();
  const { orderId, data } = route.params;

  const navigation = useNavigation();

  const order = data.find((order) => order._id === orderId);

  if (!order) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", fontFamily: "poppins" }}>
          Order not found.
        </Text>
      </View>
    );
  }

  const handleDelivered = async () => {
    try {
      const response = await fetch(
        "http://https://dropstore-seller-api.onrender.com//mark-delivered",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      const data = await response.json();

      if (data.message === "Order delivered.") {
        alert("Order delivered successfully!");
      }
    } catch (err) {
      console.log("Error marking order as delivered", err);
      alert("Error marking order as delivered.");
      navigation.navigate("order-details");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View key={order._id}>
        <Text
          style={{
            backgroundColor: "#333",
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 6,
            padding: 5,
            fontSize: 18,
            fontFamily: "semiBold",
            color: "white",
          }}
        >
          Deliver to {order?.shippingAddress?.name}
        </Text>
        <Text
          style={{
            color: "white",
            fontFamily: "poppins",
            backgroundColor: "#333",
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 6,
            fontSize: 16,
            padding: 5,
          }}
        >
          Order ID: {order._id}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 20,
            marginHorizontal: 20,
            borderRadius: 10,
            display: "flex",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontFamily: "semiBold", marginTop: 10 }}>
              Total Price:
            </Text>

            <Text style={{ fontFamily: "semiBold", marginTop: 10 }}>
              ₹ {order.totalPrice}.00
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontFamily: "semiBold" }}>Payment Method:</Text>
            <Text style={{ fontFamily: "semiBold" }}>
              {order.paymentMethod}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontFamily: "semiBold" }}>Delivery Status:</Text>
            <Text style={{ fontFamily: "semiBold" }}>
              {order.delivered ? "Delivered" : "Pending"}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: 20,
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "gray" }}
            >
              Address:
            </Text>
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "black" }}
            >
              {order.shippingAddress.street}
            </Text>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "gray" }}
            >
              Landmark:
            </Text>
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "black" }}
            >
              {order.shippingAddress.landmark}
            </Text>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "gray" }}
            >
              Mobile no:
            </Text>
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "black" }}
            >
              {order.shippingAddress.mobileNo}
            </Text>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "gray" }}
            >
              Postal Code:
            </Text>
            <Text
              style={{ fontFamily: "semiBold", fontSize: 16, color: "black" }}
            >
              {order.shippingAddress.postalCode}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: "white",
              fontFamily: "bold",
              fontSize: 24,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            Products
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {order.products.map((product, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                gap: 10,
                backgroundColor: "white",
                width: 150,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <View style={{ display: "flex", alignItems: "center" }}>
                <Image
                  source={{ uri: product?.image }}
                  style={{ width: 100, height: 100, resizeMode: "cover" }}
                />
              </View>
              <View>
                <Text style={{ fontFamily: "semiBold", textAlign: "center" }}>
                  {product?.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "semiBold",
                    color: "gray",
                    marginLeft: 8,
                    marginTop: 5,
                  }}
                >
                  Qty: {product?.quantity}
                </Text>
                <Text
                  style={{
                    fontFamily: "semiBold",
                    color: "gray",
                    marginTop: 5,
                  }}
                >
                  Price: ₹ {product?.price}.00
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <Pressable
            onPress={handleDelivered}
            style={{
              backgroundColor: "#7CB342",
              marginHorizontal: "auto",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "semiBold",
                fontSize: 20,
                color: "white",
                paddingHorizontal: 10,
              }}
            >
              Delivered
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserOrderDetails;
