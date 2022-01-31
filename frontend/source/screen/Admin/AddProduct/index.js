import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../../until/images";
import { styles } from "./style";
import * as ImagePicker from "expo-image-picker";
import { addProduct, getAllCategory } from "../../../api";
import { Button, Input, SelectData } from "../../../comps";
import { width } from "../../../until/dimension";
import { connect, useDispatch, useSelector } from "react-redux";
import { _getCategoryList } from "../../../redux/actions/categoryAction";
import { _createAdminProduct } from "../../../redux/actions/adminProductAction";
import { _getBrandList } from "../../../redux/actions/brandAction";
import { useNavigation } from "@react-navigation/native";

export default function AddProduct(props) {
  const [path, setPath] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState({});
  const [localUri, setLocalUri] = useState("");
  const [type, setType] = useState("");
  const [fileName, setFileName] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const dispatch = useDispatch();
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const brandReducer = useSelector((state) => state.brandReducer);
  const addProductReducer = useSelector((state) => state.addProductReducer);
  const { product, loading, error } = addProductReducer;
  const navigation = useNavigation();

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
      setImage(fData);
      setPath(result);
      setLocalUri(localUri);
      setType(type);
      setFileName(fileName);
    }
  };
  const getCategory = async () => {
    dispatch(_getCategoryList());
    dispatch(_getBrandList());
    setBrand(brandReducer.brands);
    setCategoryList(categoryReducer.category);
  };
  const _addProduct = async (
    name = "",
    brand = "",
    price = 0,
    description = "",
    category = "",
    countInStock = "",
    rating = "",
    numReviews = "",
    image
  ) => {
    if (name.length == 0) {
      setMessage("Vui lòng nhập tên sản phẩm");
    } else if (brand.length == 0) {
      setMessage("Vui lòng nhập thương hiệu sản phẩm");
    } else if (price <= 0) {
      setMessage("Vui lòng nhập giá sản phẩm");
    } else if (description.length == 0) {
      setMessage("Vui lòng nhập mô tả sản phẩm");
    } else if (countInStock.length == 0) {
      setMessage("Vui lòng nhập số lượng sản phẩm trong kho");
    } else if (rating.length == 0) {
      setMessage("Vui lòng nhập xếp hạng sản phẩm");
    } else if (numReviews.length == 0) {
      setMessage("Vui lòng nhập số lượt đánh giá sản phẩm");
    } else if (category.length == 0) {
      setMessage("Vui lòng chọn loại sản phẩm");
    } else if (Object.values(image).length == 0) {
      setMessage("Vui lòng chọn hình ảnh cho sản phẩm");
    } else {
      setMessage("");
      let fData = new FormData();
      fData.append("image", {
        uri: localUri,
        type: type,
        name: fileName,
      });
      fData.append("name", name);
      fData.append("description", description);
      fData.append("brand", brand);
      fData.append("price", price);
      fData.append("category", category);
      fData.append("countInStock", countInStock);
      fData.append("rating", rating);
      fData.append("numReviews", numReviews);
      fData.append("isFeatured", isFeatured);

      dispatch(_createAdminProduct(fData));
      if (product) {
        Alert.alert("Thông báo", product.message, [
          {
            text: "OK",
            onPress: () => navigation.navigate("AdminHome"),
          },
        ]);
      }
      if (error) {
        Alert.alert("Thông báo", product.message, [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
      }
    }
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
      <TouchableOpacity onPress={() => pickImage()}>
        <Image
          source={path ? { uri: path.uri } : images.avatar}
          style={styles.avatar}
        />
      </TouchableOpacity>
      {/* <Text>{JSON.stringify(categoryReducer.category)}</Text> */}
      <Input
        placeholder="Name"
        width={width - 50}
        style={{ marginTop: 15 }}
        onChangeText={(text) => setName(text)}
      />
      {/* <Input
        placeholder="Brand"
        width={width - 50}
        style={{ marginTop: 15 }}
        onChangeText={(text) => setBrand(text)}
      /> */}
      <SelectData
        style={{ marginTop: 15 }}
        placeholder="Chọn hãng sản xuất"
        data={brandReducer && brandReducer.brands}
        width={width - 50}
        onPress={(item) => setBrand(item._id)}
      />
      <Input
        placeholder="Price"
        number
        width={width - 50}
        style={{ marginTop: 15 }}
        onChangeText={(text) => setPrice(text)}
      />
      <Input
        placeholder="Description"
        multiline
        width={width - 50}
        style={{ marginTop: 15 }}
        onChangeText={(text) => setDescription(text)}
      />
      <Input
        placeholder="Count in stock"
        number
        width={width - 50}
        style={{ marginTop: 15 }}
        onChangeText={(text) => setPrice(text)}
      />
      <View style={{ flexDirection: "row", marginLeft: 25 }}>
        <Input
          placeholder="Rating"
          number
          width={width / 2 - 30}
          style={{ marginTop: 15 }}
          onChangeText={(text) => setRating(text)}
        />
        <Input
          placeholder="numReviews"
          number
          width={width / 2 - 30}
          style={{ marginLeft: 10, marginTop: 15 }}
          onChangeText={(text) => setNumReviews(text)}
        />
      </View>
      <View style={{ flexDirection: "row", marginLeft: 25 }}>
        <SelectData
          style={{ marginTop: 15 }}
          placeholder="Chọn thể loại"
          data={categoryReducer && categoryReducer.category}
          width={width / 2 - 30}
          onPress={(item) => setCategory(item._id)}
        />
        <SelectData
          style={{ marginLeft: 10, marginTop: 15 }}
          placeholder="Sản phẩm thuộc top"
          data={featuredList}
          width={width / 2 - 30}
          onPress={(item) => setIsFeatured(item._id)}
        />
      </View>
      <Button
        label="Thêm mới"
        onPress={() =>
          _addProduct(
            name,
            brand,
            price,
            description,
            category,
            countInStock,
            rating,
            numReviews,
            image,
            isFeatured
          )
        }
        width={width - 50}
        style={{ alignSelf: "center", marginTop: 30 }}
      />
      <Text style={styles.message}>{message}</Text>
    </SafeAreaView>
  );
}
