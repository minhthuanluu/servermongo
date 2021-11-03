import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { orderProduct } from '../../../api';
import { Button, Input } from '../../../comps';
import { width } from '../../../until/dimension';
import { _receiveData, _removeData } from '../../../until/storage';
import { styles } from './style';

const index = (props) => {
    const route = useRoute();
    const data = route.params?.data;
    const totalPrice = route.params?.totalPrice;
    const [address,setAddress] = useState('');
    const [zip,setZip] = useState('');
    const [city,setCity] = useState('');
    const [phone,setPhone] = useState('');
    const navigation = useNavigation();
    
    const orders = async( data,address, city, zip,phone) => {
        let user = {}
        await _receiveData("userInfo").then((item)=> user = item.user)
        let tempData = []
        for (let i = 0; i < data.length; i++) {
            const element = data[i]._id;
            tempData.push({"product":element,quantity:1})
        }
       let orderData = {
           "orderItems":tempData,
           "shippingAddress1":address,
           "city":city,
            "zip":zip,
            "country":"Việt Nam",
            "phone":phone || user.phone,
            "user":user._id
        }

        await orderProduct(orderData).then(async(data)=>{
            if(data.status=="success"){
                await _removeData("savedCart").then(()=>{
                    ToastAndroid.showWithGravity("Đặt hàng thành công!",2000,ToastAndroid.BOTTOM);
                    navigation.navigate("UserHome")
                })
            }
        })
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <View style={styles.itemContainer} key={index.toString()}>
                                <Image style={styles.image} source={{ uri: `http://192.168.137.166:3000/public/uploads/${item.image}` }} />
                                <View>
                                    <Text key={index.toString()} style={styles.name}>{item.name}</Text>
                                    <Text style={styles.price}>{item.price}</Text>
                                </View>
                            </View>
                        }}
                    />
                </View>
                <View style={styles.hr} />
                <View style={{ flexDirection: "row", marginBottom: 15, justifyContent: "space-around" }}>
                    <Text style={{ ...styles.totalPrice, flex: 1, left: 10 }}>Tổng giá trị</Text>
                    <Text style={styles.totalPrice}>{totalPrice}</Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.addressContainer}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, marginBottom: 15 }}>Thông tin giao hàng</Text>
                    <Input onChangeText={(text)=>setAddress(text)} placeholder="Địa chỉ giao hàng" width={width - 50} />
                    <Input onChangeText={(text)=>setCity(text)} placeholder="Thành phố" width={width - 50} style={{ marginTop: 10 }} />
                    <Input onChangeText={(text)=>setZip(text)} placeholder="Mã zip" width={width - 50} style={{ marginTop: 10 }} />
                    <Input onChangeText={(text)=>setPhone(text)}placeholder="Số điện thoại" width={width - 50} style={{ marginTop: 10 }} />
                    <Button 
                        onPress={()=>orders(
                            data,
                            address, city, zip,phone
                        )}
                        label="Đặt hàng" 
                        width={width - 50} 
                        style={{ alignSelf: "center", marginTop: 10 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default index;