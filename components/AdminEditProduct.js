import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

const AdminEditProduct = ({
  onClose,
  item,
  openEditProduct,
  setOpenEditProduct,
  fetchData,
}) => {
  const [productName, setProductName] = useState(item?.productName || "");
  const [brandName, setBrandName] = useState(item?.brandName || "");
  const [category, setCategory] = useState(item?.category || "");
  const [productImage, setProductImage] = useState(item?.productImage || []);
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(String(item?.price || ""));
  const [uploadProductImage, setUploadProductImage] = useState("");

  const productCategory = [
    { id: 1, label: "Stationery", value: "stationery" },
    { id: 2, label: "Sauces & Spreads", value: "sauces & Spreads" },
    { id: 3, label: "Personal Care", value: "personalCare" },
    { id: 4, label: "Baby Care", value: "babyCare" },
    { id: 5, label: "Cleaning Essentials", value: "cleaning Essentials" },
    { id: 6, label: "Snacks & Munchies", value: "snacks & Munchies" },
    { id: 7, label: "Bakery & Biscuits", value: "bakery & Biscuits" },
    { id: 8, label: "Dairy, Bread & Eggs", value: "dairy, Bread & Eggs" },
    { id: 9, label: "Sweets & Ice cream", value: "sweets & Ice cream" },
    { id: 10, label: "Cold Drinks & Juices", value: "cold drinks & juices" },
    { id: 11, label: "Pet Care", value: "petCare" },
    { id: 12, label: "Home & Office", value: "home & Office" },
    {
      id: 13,
      label: "Breakfast & Instant food",
      value: "breakfast & Instant Food",
    },
    { id: 14, label: "Tea, Coffee & More", value: "tea, Coffee & More" },
    { id: 15, label: "Atta, Rice & Dal", value: "aata, Rice & Dal" },
    { id: 16, label: "Masala, Oil & More", value: "masala, Oil & More" },
  ];

  const handleDeleteImage = async (index) => {
    try {
      const newImage = [...productImage];
      newImage.splice(index, 1);
      setProductImage(newImage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        productId: item?._id,
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
      };
      const response = await fetch(
        "http://https://dropstore-seller-api.onrender.com//update-product",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: responseData.message,
        });
        onClose();
        fetchData();
      } else {
        Toast.show({
          type: "error",
          text1: responseData.message,
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Error updating product";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const file = `data:image/png;base64,${result.assets[0].base64}`;
      setUploadProductImage(file);

      const url = `https://api.cloudinary.com/v1_1/dzwuseok5/image/upload`;

      const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "dropstore_products");
        const dataResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });
        return await dataResponse.json();
      };

      const uploadImageCloudinary = await uploadImage(file);

      setProductImage((prevImages) => [
        ...prevImages,
        uploadImageCloudinary.url,
      ]);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openEditProduct}
        onRequestClose={() => setOpenEditProduct(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            opacity: 0.8,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "90%",
            }}
          >
            <ScrollView style={{ maxHeight: "80vh" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text style={{ fontFamily: "bold", fontSize: 16 }}>
                  Edit Product
                </Text>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  onPress={onClose}
                />
              </View>

              <View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: "semiBold" }}>Product Name:</Text>
                  <TextInput
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                    placeholder="Enter product name.."
                    placeholderTextColor="white"
                    style={{
                      backgroundColor: "#c88568",
                      borderRadius: 10,
                      fontFamily: "poppins",
                      padding: 5,
                      color: "white",
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: "semiBold" }}>Brand Name:</Text>
                  <TextInput
                    placeholder="Enter brand name.."
                    placeholderTextColor="white"
                    value={brandName}
                    onChangeText={(text) => setBrandName(text)}
                    style={{
                      backgroundColor: "#c88568",
                      borderRadius: 10,
                      fontFamily: "poppins",
                      padding: 5,
                      color: "white",
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: "semiBold" }}>Category:</Text>
                  <View
                    style={{
                      backgroundColor: "#c88568",
                      borderRadius: 10,
                      fontFamily: "poppins",
                    }}
                  >
                    <Picker
                      selectedValue={category}
                      onValueChange={(itemValue) => setCategory(itemValue)}
                      style={{ color: "white" }}
                    >
                      <Picker.Item label="Select Category" value="" />
                      {productCategory.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item?.label}
                            value={item?.value}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: "semiBold" }}>Description:</Text>
                  <TextInput
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Enter description.."
                    placeholderTextColor="white"
                    style={{
                      backgroundColor: "#c88568",
                      borderRadius: 10,
                      fontFamily: "poppins",
                      padding: 5,
                      color: "white",
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: "semiBold" }}>Price:</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    placeholder="Enter price.."
                    placeholderTextColor="white"
                    style={{
                      backgroundColor: "#c88568",
                      borderRadius: 10,
                      fontFamily: "poppins",
                      padding: 5,
                      color: "white",
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
                <View style={{ padding: 5 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontFamily: "semiBold" }}>
                      Product Images:
                    </Text>
                    <Pressable
                      onPress={pickImage}
                      style={{
                        backgroundColor: "#c88568",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 2,
                        borderRadius: 5,
                        marginRight: 5,
                        gap: 5,
                        paddingHorizontal: 5,
                      }}
                    >
                      <AntDesign name="cloudupload" size={24} color="white" />
                      <Text style={{ fontFamily: "semiBold", color: "white" }}>
                        Upload
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {productImage.length > 0 ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 10,
                          marginTop: 10,
                        }}
                      >
                        {productImage.map((item, index) => {
                          return (
                            <View key={index}>
                              <Image
                                source={{ uri: item }}
                                key={index}
                                style={{
                                  width: 80,
                                  height: 80,
                                  backgroundColor: "gray",
                                  borderRadius: 10,
                                  resizeMode: "cover",
                                }}
                              />
                              <MaterialIcons
                                onPress={() => handleDeleteImage(index)}
                                name="delete"
                                size={18}
                                color="white"
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  right: 0,
                                  backgroundColor: "#e23856",
                                  borderRadius: 25,
                                  padding: 5,
                                }}
                              />
                            </View>
                          );
                        })}
                      </View>
                    ) : null}
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <Pressable
                    onPress={handleUploadProduct}
                    style={{
                      backgroundColor: "#c88568",
                      borderRadius: 10,
                      padding: 10,
                      width: "50%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontFamily: "semiBold" }}>
                      Update Product
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminEditProduct;
