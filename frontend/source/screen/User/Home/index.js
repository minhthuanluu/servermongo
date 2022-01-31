import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getProductListByCategoryId } from "../../../api";
import { getFilterCondition, getPriceList } from "../../../api/constant";
import { Input, Button, SelectData, SearchItem } from "../../../comps";
import { _getBrandList } from "../../../redux/actions/brandAction";
import { _getCategoryList } from "../../../redux/actions/categoryAction";
import { filterProduct } from "../../../redux/actions/filterAction";
import {
  _getAllProduct,
  _getPriceList,
} from "../../../redux/actions/productAction";
import { height, width } from "../../../until/dimension";
import { images } from "../../../until/images";
import { _receiveData } from "../../../until/storage";
import { styles } from "./style";

const index = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [brandList, setBrandList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [choosenBrand, setChoosenBrand] = useState("");
  const [choosenCategory, setChoosenCategory] = useState("");
  const [choosenPrice, setChoosenPrice] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const catList = useSelector((state) => state.categoryReducer);
  const { category } = catList;
  const _brandList = useSelector((state) => state.brandReducer);
  const { brands } = _brandList;
  const _productList = useSelector((state) => state.productReducer);
  const { product, loading, error } = _productList;
  const _priceList = useSelector((state) => state.priceReducer);
  const { prices } = _priceList;
  const _filterList = useSelector((state) => state.filterReducer);
  const { productFilter } = _filterList;

  const getCategory = async () => {
    await getAllCategory().then((data) => {
      if (data.status == "success") {
        setCategoryList(data.data);
      }
    });
  };

  const getData = async (catId) => {
    await getProductListByCategoryId(catId).then((data) => {
      if (data.status == "success") {
        setProductList(data.data.data);
      }
    });
  };

  const checkRole = async () => {
    await _receiveData("userInfo").then((item) => {
      console.log(item);
      if (item != null) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  };

  const _goToCart = async () => {
    await _receiveData("userInfo").then((item) => {
      console.log(item);
      if (item != null) {
        setIsAuth(true);
        navigation.navigate("Cart");
      } else {
        setIsAuth(false);
        navigation.navigate("Login");
      }
    });
  };

  const getBrand = async () => {
    setLoading(true);
    await getAllBrand().then((data) => {
      setBrandList(data.data);
    });
    await getPriceList().then((data) => {
      setPriceList(data.data);
    });
  };

  useEffect(() => {
    const init = async () => {
      dispatch(_getCategoryList());
      dispatch(_getBrandList());
      dispatch(_getAllProduct());
      dispatch(_getPriceList());
    };
    if (isFocused == true) {
      init();
    }
  }, [dispatch]);

  const filterData = async (brand, category, price) => {
    // let brand = branch.id;
    // let from = price.from;
    // let to = price.to;
    // let catId = category._id;

    // await getFilterCondition(catId, brand, from, to).then((data) => {
    //   if (data.status == "success") {
    //     setShowModal(!showModal);
    //     if (data.data.data.length == 0) {
    //       setMessage("Không tìm thấy sản phẩm");
    //     } else {
    //       setMessage("");
    //       setSearchData(data.data.data);
    //     }
    //   }
    // });
    console.log(brand._id, category._id, price.from, price.to);

    let brandId = brand._id;
    let catId = category._id;
    let fPrice = price.from;
    let tPrice = price.to;

    dispatch(
      filterProduct(
        catId,
        brandId,
        fPrice == undefined ? 0 : fPrice,
        tPrice == undefined ? 0 : tPrice
      )
    );
    setShowModal(!showModal);
    if (productFilter) {
      console.log(productFilter);
      setShowModal(!showModal);
    } else {
      setMessage("Không tìm thấy sản phẩm nào");
    }
  };
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isAuth == true ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{
              flex: 1,
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={images.avatar}
              style={styles.avatar}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        <Input
          style={{ marginTop: 30, marginLeft: 10 }}
          placeholder="Tìm kiếm sản phẩm"
          leftIcon={images.search}
          width={isAuth == true ? width - 100 : width - 60}
        />
        <TouchableOpacity
          onPress={() => {
            _goToCart();
          }}
          style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          <Image source={images.cart} style={{ marginTop: 20 }} />
          {isAuth == true ? (
            <View style={styles.cartCountContainer}>
              <Text style={{ color: "red" }}>{cartItemCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <Image source={images.banner01} style={styles.banner} />

      <View style={{ backgroundColor: "#fff" }}>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <SelectData
            style={{ marginLeft: 5 }}
            data={brands}
            width={width / 2 - 10}
            onPress={(value) => setChoosenBrand(value)}
            placeholder="Chọn hãng"
          />
          <SelectData
            style={{ marginLeft: 10 }}
            data={category}
            width={width / 2 - 10}
            onPress={(value) => setChoosenCategory(value)}
            placeholder="Chọn thể loại"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <SelectData
            price
            data={prices}
            style={{ marginHorizontal: 10 }}
            width={width - 110}
            onPress={(value) => setChoosenPrice(value)}
            placeholder="Chọn khoản giá"
          />
          <Button
            label={"Tìm kiếm"}
            onPress={() =>
              filterData(choosenBrand, choosenCategory, choosenPrice)
            }
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {categoryList.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                getBrand(), setSelectedIndex(index), getData(item._id);
              }}
              style={[
                styles.categoryContainer,
                {
                  backgroundColor:
                    index == selectedIndex ? "#FCB100" : "#ECECEC",
                },
              ]}
            >
              <Text style={{ color: index == selectedIndex ? "#FFF" : "#000" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text>{message}</Text>
        <FlatList
          data={product.data}
          showsVerticalScrollIndicator={false}
          style={{ height: height / 2 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailProduct", { id: item.id })
                }
                style={{
                  width: width / 2 - 80,
                  margin: 10,
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  shadowColor: "#333",
                  shadowRadius: 15,
                  shadowOffset: 10,
                  elevation: 10,
                  padding: 10,
                }}
              >
                <Image
                  style={{ width: width / 2 - 100, height: width / 2 - 100 }}
                  resizeMode="contain"
                  source={{
                    uri: `http://172.22.240.1:3000/api/v1/${item.image}`,
                  }}
                />
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {isAuth == true ? (
        <TouchableOpacity
          style={styles.myBill}
          onPress={() => navigation.navigate("MyOrder")}
        >
          <Image source={images.bill} style={styles.myBillImg} />
        </TouchableOpacity>
      ) : null}
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Image source={images.close} style={styles.closebtn} />
        </TouchableOpacity>
        <View style={styles.modalSearch}>
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
          >
            Kết quả tìm kiếm sản phẩm
          </Text>
          {/* <Text>{JSON.stringify(productFilter.data)}</Text> */}
          {productFilter ? (
            <FlatList
              data={productFilter.data && productFilter.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <SearchItem
                    item={item}
                    index={index}
                    onPress={() => {
                      setShowModal(!showModal);
                      navigation.navigate("DetailProduct", { id: item.id });
                    }}
                  />
                );
              }}
            />
          ) : (
            <Text>{message}</Text>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default index;
