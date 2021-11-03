import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getAllCategory, getProductListByCategoryId } from '../../../api';
import { Input } from '../../../comps';
import { height, width } from '../../../until/dimension';
import { images } from '../../../until/images';
import { _receiveData } from '../../../until/storage';
import { styles } from './style';

const index = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAuth, setIsAuth] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0)
    const navigation = useNavigation();
    const isFocused = useIsFocused()

    const getCategory = async () => {
        await getAllCategory().then((data) => {
            if (data.status == "success") {

                setCategoryList(data.data)
            }
        })
    }

    const getData = async (catId) => {
        await getProductListByCategoryId(catId).then((data) => {
            if (data.status == "success") {
                setProductList(data.data.data)
            }
        })
    }

    const checkRole = async () => {
        await _receiveData("userInfo").then((item) => {
            console.log(item)
            if (item != null) {
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        })
    }

    const _goToCart = async () => {
        await _receiveData("userInfo").then((item) => {
            console.log(item)
            if (item != null) {
                setIsAuth(true)
                navigation.navigate('Cart')
            } else {
                setIsAuth(false)
                navigation.navigate('Login')
            }
        })

    }

    useEffect(() => {
        const init = async () => {
            await getCategory();
            await getData(categoryList[0]._id)
            setSelectedIndex(0);
            checkRole();
        }
        if(isFocused==true){
            init()
        }
    }, [isFocused]);


    return (
        <SafeAreaView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {
                    isAuth == true ? <TouchableOpacity onPress={() => { navigation.navigate("Profile")}} style={{ flex: 1, marginTop: 30, alignItems: "center", justifyContent: "center" }}>
                        <Image source={images.avatar} style={styles.avatar} resizeMode="contain" />
                    </TouchableOpacity>
                        : null
                }
                <Input style={{ marginTop: 30, marginLeft:10 }} placeholder="Tìm kiếm sản phẩm" leftIcon={images.search} width={isAuth==true ? width-100:width - 60} />
                <TouchableOpacity onPress={() => { _goToCart() }} style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
                    <Image source={images.cart} style={{ marginTop: 20 }} />
                    {
                        isAuth == true ? <View style={styles.cartCountContainer}><Text style={{ color: 'red' }}>{cartItemCount}</Text></View> : null
                    }
                </TouchableOpacity>
            </View>
            <Image source={images.banner01} style={styles.banner} />

            <View style={{ backgroundColor: "#fff" }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                    {

                        categoryList.map((item, index) => <TouchableOpacity onPress={() => { setSelectedIndex(index), getData(item._id) }} style={[styles.categoryContainer, { backgroundColor: index == selectedIndex ? "#FCB100" : "#ECECEC" }]}>
                            <Text style={{ color: index == selectedIndex ? "#FFF" : "#000" }}>{item.name}</Text>
                        </TouchableOpacity>)
                    }
                </ScrollView>
                <FlatList
                    data={productList}
                    showsVerticalScrollIndicator={false}
                    style={{ height: height / 2 }}
                    renderItem={({ item, index }) => {
                        return <TouchableOpacity onPress={() => navigation.navigate("DetailProduct", { "id": item.id })} style={{
                            width: width / 2 - 80, margin: 10,
                            backgroundColor: "#fff", borderRadius: 15, shadowColor: "#333", shadowRadius: 15, shadowOffset: 10, elevation: 10, padding: 10
                        }}>
                            <Image style={{ width: width / 2 - 100, height: width / 2 - 100 }} resizeMode="contain" source={{ uri: `http://192.168.137.166:3000/public/uploads/${item.image}` }} />
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                        </TouchableOpacity>
                    }}
                />
            </View>
            {
                isAuth == true ? <TouchableOpacity style={styles.myBill} onPress={() => navigation.navigate("MyOrder")}>
                    <Image source={images.bill} style={styles.myBillImg} />
                </TouchableOpacity> : null
            }
        </SafeAreaView>
    );
}

export default index;