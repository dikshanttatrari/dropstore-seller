import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";

const Orders = ({ item }) => {
  const [products, setProducts] = useState(item?.products);

  const handleCancelProduct = async (productId) => {
    const response = await fetch(
      "http://https://dropstore-seller-api.onrender.com//cancel-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: item?._id,
          productId: productId,
        }),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, cancelled: true } : product
        )
      );
      alert(data.message);
    }
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      {products.map((product, index) => (
        <View
          key={index}
          style={{
            display: "flex",
            gap: 10,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
            width: 150,
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <Image
              source={{ uri: product?.image }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "semiBold",
              }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {product?.name}
            </Text>
            <Text
              style={{
                fontFamily: "semiBold",
                color: "gray",
                marginLeft: 10,
              }}
            >
              Qty: {product?.quantity}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            {item?.delivered && !product?.cancelled ? (
              <Pressable
                style={{
                  backgroundColor: "#7CB342",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "poppins",
                    paddingHorizontal: 5,
                  }}
                >
                  Delivered
                </Text>
              </Pressable>
            ) : (
              <View>
                {product.cancelled ? (
                  <Pressable
                    style={{
                      backgroundColor: "#e23856",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "poppins",
                        paddingHorizontal: 5,
                      }}
                    >
                      Cancelled
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => handleCancelProduct(product._id)}
                    style={{
                      backgroundColor: "#e23856",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "poppins",
                        paddingHorizontal: 5,
                      }}
                    >
                      Cancel
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Orders;
