import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";

const AddProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  // const [openEditProduct, setOpenEditProduct] = useState(false);

  const fetchAllProducts = async () => {
    const response = await fetch(
      "http://https://dropstore-seller-api.onrender.com//all-products"
    );
    const dataResponse = await response.json();
    setAllProducts(dataResponse || []);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const renderProductRows = () => {
    const rows = [];
    for (let i = 0; i < allProducts.length; i += 2) {
      rows.push(
        <View style={styles.row} key={i}>
          <AdminProductCard
            item={allProducts[i]}
            fetchData={fetchAllProducts}
          />
          {allProducts[i + 1] && (
            <AdminProductCard
              item={allProducts[i + 1]}
              fetchData={fetchAllProducts}
            />
          )}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          All Products ({allProducts.length})
        </Text>
        <Pressable
          onPress={() => setOpenUploadProduct(!openUploadProduct)}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>Upload Products</Text>
        </Pressable>
      </View>

      <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
        {renderProductRows()}
      </ScrollView>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} />
      )}
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    height: "100%",
  },
  header: {
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  headerText: {
    color: "white",
    fontFamily: "semiBold",
    fontSize: 18,
  },
  uploadButton: {
    backgroundColor: "#e23856",
    padding: 4,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: "white",
    fontFamily: "semiBold",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
