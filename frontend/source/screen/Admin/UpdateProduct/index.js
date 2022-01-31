import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../until/images";
import { styles } from "./style";
import * as ImagePicker from "expo-image-picker";
import { addProduct, getAllCategory, updateProduct } from "../../../api";
import { Button, Input, SelectData } from "../../../comps";
import { width } from "../../../until/dimension";
import { useNavigation, useRoute } from "@react-navigation/core";
import { baseUrlUpload } from "../../../until";
import { useDispatch, useSelector } from "react-redux";
import { _updateAdminProduct } from "../../../redux/actions/adminProductAction";

const index = (props) => {
  const [path, setPath] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [fImage, setFImage] = useState({});
  const [localUri, setLocalUri] = useState("");
  const [type, setType] = useState("");
  const [fileName, setFileName] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const route = useRoute();
  const item = route.params?.item;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const updateProductReducer = useSelector(
    (state) => state.updateProductReducer
  );
  const { loading, product, error } = updateProductReducer;

  const featuredList = [
    {
      _id: true,
      name: "Đặc sắc",
    },
    {
      _id: false,
      name: "Thông thường",
    },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let localUri = "file:///" + result.uri.split("file:/").join("");
      let fileName = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : "image";

      let fData = new FormData();
      fData.append("image", {
        uri: localUri,
        type: type,
        name: fileName,
      });
      setFImage(fData);
      setPath(result);
      setLocalUri(localUri);
      setType(type);
      setFileName(fileName);
    }
  };
  const getCategory = async () => {
    await getAllCategory().then((data) => {
      if (data.status == "success") {
        setCategoryList(data.data);
      }
    });
  };
  const _updateProduct = async (
    id = "",
    name = "",
    brand = "",
    price = "",
    description = "",
    category = "",
    countInStock = "",
    rating = "",
    numReviews = "",
    image = "",
    isFeatured = ""
  ) => {
    if (name.length == 0) {
      name = item.name;
    } else if (brand.length == 0) {
      brand = item.brand;
    } else if (price == 0) {
      price = item.price;
    } else if (description.length == 0) {
      description = item.description;
    } else if (category.length == 0) {
      category = item.categoryId;
    } else if (countInStock.length == 0) {
      countInStock = item.countInStock;
    } else if (rating.length == 0) {
      rating = item.rating;
    } else if (numReviews.length == 0) {
      numReviews = item.numReviews;
    } else if (isFeatured.length == 0) {
      isFeatured = item.isFeatured;
    }
    if (image == undefined) {
      await updateProduct(
        null,
        id,
        name,
        description,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
      ).then((data) => {
        console.log(data);
      });
    } else {
      let fData = new FormData();
      image = fData.append("image", {
        uri: localUri,
        type: type,
        name: fileName,
      });
      let imgArr = [];
      imgArr.push(fImage);
      category = item.categoryId;
      fData.append("id", id);
      fData.append("name", name);
      fData.append("descriptions", description);
      fData.append("brand", brand);
      fData.append("price", price);
      fData.append("category", category);
      fData.append("countInStock", countInStock);
      fData.append("rating", rating);
      fData.append("numReviews", numReviews);

      dispatch(_updateAdminProduct(fData, id));
      Alert.alert("Thông báo", "Sửa sản phẩm thành công", [
        {
          text: "OK",
          onPress: async () => {
            navigation.navigate("AdminHome");
          },
          style: "default",
        },
      ]);
      if (product) {
        Alert.alert("Thông báo", "Sửa sản phẩm thành công", [
          {
            text: "OK",
            onPress: async () => {
              navigation.navigate("AdminHome");
            },
            style: "default",
          },
        ]);
      }

      if (error) {
        Alert.alert("Thông báo", error, [
          {
            text: "OK",
            onPress: async () => {},
            style: "default",
          },
        ]);
      }

      //   await updateProduct(fData, id).then((data) => {
      //     console.log(data);
      //     if (data.status == "success") {
      //       Alert.alert("Thông báo", "Sửa sản phẩm thành công", [
      //         {
      //           text: "OK",
      //           onPress: async () => {
      //             navigation.navigate("AdminHome");
      //           },
      //           style: "default",
      //         },
      //       ]);
      //     } else {
      //       Alert.alert("Thông báo", data.message);
      //     }
      //   });
    }
    // console.log('vao ham')
    // console.log(id, name, brand, price, description, category, countInStock, rating, numReviews, image, isFeatured)
    // setMessage("");
  };
  useEffect(() => {
    (async () => {
      await getCategory();
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity onPress={() => pickImage()}>
          <Image
            source={
              path
                ? { uri: path.uri }
                : {
                    uri:
                      "http://192.168.137.166:3000/public/uploads/" +
                      item.image,
                  }
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Input
          placeholder="Name"
          defaultValue={item && item.name}
          width={width - 50}
          style={{ marginTop: 15 }}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Brand"
          defaultValue={item && item.brand}
          width={width - 50}
          style={{ marginTop: 15 }}
          onChangeText={(text) => setBrand(text)}
        />
        <Input
          placeholder="Price"
          defaultValue={item && item.price}
          number
          width={width - 50}
          style={{ marginTop: 15 }}
          onChangeText={(text) => setPrice(text)}
        />
        <Input
          placeholder="Description"
          defaultValue={item && item.description}
          multiline
          width={width - 50}
          style={{ marginTop: 15 }}
          onChangeText={(text) => setDescription(text)}
        />
        <Input
          placeholder="Count in stock"
          defaultValue={item && item.countInStock.toString()}
          number
          width={width - 50}
          style={{ marginTop: 15 }}
          onChangeText={(text) => setCountInStock(text)}
        />
        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <Input
            placeholder="Rating"
            defaultValue={item && item.rating.toString()}
            number
            width={width / 2 - 30}
            style={{ marginTop: 15 }}
            onChangeText={(text) => setRating(text)}
          />
          <Input
            placeholder="numReviews"
            defaultValue={item && item.numReviews.toString()}
            number
            width={width / 2 - 30}
            style={{ marginLeft: 10, marginTop: 15 }}
            onChangeText={(text) => setNumReviews(text)}
          />
        </View>
        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <SelectData
            style={{ marginTop: 15 }}
            placeholder={item.categoryName}
            data={categoryList}
            width={width / 2 - 30}
            onPress={(item) => setCategory(item._id)}
          />
          <SelectData
            style={{ marginLeft: 10, marginTop: 15 }}
            placeholder={
              item.isFeatured == true
                ? featuredList[0].name
                : featuredList[1].name
            }
            data={featuredList}
            width={width / 2 - 30}
            onPress={(item) => setIsFeatured(item._id)}
          />
        </View>
        <Button
          label="Cập nhật"
          onPress={() =>
            _updateProduct(
              item._id,
              name,
              brand,
              price,
              description,
              category,
              countInStock,
              rating,
              numReviews,
              fImage,
              isFeatured
            )
          }
          width={width - 50}
          style={{ alignSelf: "center", marginTop: 30 }}
        />
        <Text style={styles.message}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
