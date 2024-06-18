import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ item, fetchData }) => {
  const [openEditProduct, setOpenEditProduct] = useState(false);
  return (
    <View
      style={{
        backgroundColor: "white",
        display: "flex",
        borderRadius: 15,
        padding: 5,
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Image
        source={{ uri: item?.productImage[0] }}
        style={{
          width: 100,
          height: 100,
          marginBottom: 5,
          alignSelf: "center",
          resizeMode: "cover",
        }}
      />
      <Text
        style={{
          fontFamily: "semiBold",
          color: "black",
          width: 150,
          textAlign: "center",
        }}
      >
        {item?.productName}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "semiBold",
            color: "#c88568",
            marginLeft: 10,
            marginTop: 5,
            marginBottom: 5,
          }}
        >{`Price: ₹${item?.price}.00`}</Text>
        <Feather
          onPress={() => setOpenEditProduct(!openEditProduct)}
          name="edit-2"
          size={18}
          color="white"
          style={{
            marginRight: 10,
            backgroundColor: "#e23856",
            padding: 5,
            borderRadius: 25,
            marginBottom: 5,
          }}
        />
        {openEditProduct && (
          <AdminEditProduct
            onClose={() => setOpenEditProduct(false)}
            item={item}
            openEditProduct={openEditProduct}
            setOpenEditProduct={setOpenEditProduct}
            fetchData={fetchData}
          />
        )}
      </View>
    </View>
  );
};

export default AdminProductCard;
