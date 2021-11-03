import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { getProductById } from '../../../api';
import { Button } from '../../../comps';
import { width } from '../../../until/dimension';
import { images } from '../../../until/images';
import { _receiveData, _removeData, _storeData } from '../../../until/storage';
import { styles } from './style';

function index(props) {
    const route = useRoute()
    const navigation = useNavigation();
    const id = route.params?.id;
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const getData = async (id) => {
        setLoading(true)
        await getProductById(id).then((data) => {
            if (data.status == "success") {
                setData(data.data.data)
                setLoading(false)
            }
        })
    }
    useEffect(() => {
        getData(id)
    }, [navigation]);

    const addProductToCart = async (item) => {
        let newArr = []
        await _receiveData("savedCart").then(async (data) => {
            if (data == null) {
                newArr.push(item)
                await _storeData('savedCart', newArr)
            } else {
                data.push(item)
                await _removeData('savedCart');
                await _storeData('savedCart', data);
            }
            ToastAndroid.showWithGravity("Đã thêm sản phẩm vào giỏ hàng!",2000,ToastAndroid.BOTTOM);
        })
    }

    const checkAuth = async () => {
        await _receiveData("userInfo").then((data) => {
            if (data.token != null) {
                navigation.navigate('Cart')
            } else {
                navigation.navigate('Login')
            }
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => checkAuth()}>
                    <Image source={images.cart} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            {loading == true || data == undefined ? <ActivityIndicator size="small" color="blue" style={{ marginTop: 20 }} /> :
                <View>
                    <Image source={data != undefined ? { uri: data.image && `http://192.168.137.166:3000/public/uploads/${data.image}` } : null} resizeMode="contain" style={styles.pImage} />
                    <Text style={styles.pName}>{data != undefined ? data.name : ''}</Text>
                    <Text style={styles.pPrice}>{data.price==null ? "" :data.price&&data.price.toString()}</Text>
                    <Text style={styles.descriptionLabel}>Mô tả</Text>
                    <Text style={styles.pDescription}>{data != undefined ? data.description : ''}</Text>
                    <Button onPress={() => addProductToCart(data)} label="Thêm vào giỏ hàng" width={width - 100} style={{ alignSelf: "center", marginTop: 20 }} />
                </View>
            }
        </SafeAreaView>
    );
}

export default index;