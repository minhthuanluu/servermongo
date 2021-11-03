import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../comps';
import { _receiveData } from '../../../until/storage';
import { styles } from './style';

const index = (props) => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [item, setItem] = useState({
        id: "",
        count: 0,

    });
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0)
    const navigation = useNavigation();


    const getData = async () => {
        await _receiveData("savedCart").then((item) => {
            let totalPrice = 0
            if (item != null) {
                setData(item);
                for (let i = 0; i < item.length; i++) {
                    totalPrice += item[i].price;
                }
                setTotalPrice(totalPrice)
            } else {

            }
        })
    }
    useEffect(() => {
        getData();
    }, [navigation]);

    const order=()=>{
        navigation.navigate("Order",{"data":data,"totalPrice":totalPrice})
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 8 }}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return <View style={styles.itemContainer}>
                            <Image style={styles.image} source={{ uri: `http://192.168.137.166:3000/public/uploads/${item.image}` }} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <TouchableOpacity style={styles.plusContainer} onPress={() => setCount(1)}>
                                        <Text style={styles.plusText}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: "center", marginHorizontal: 20 }}>
                                        <Text>{count}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.plusContainer} onPress={() => setCount(1)}>
                                        <Text style={styles.plusText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 5, justifyContent: "space-around", flexDirection: "row", position: "absolute", bottom: 50 }}>
                    <Text style={{ flex:1,top:-40,fontSize: 19 }}>Tạm tính</Text>
                    <Text style={{ fontSize: 19,top:-40, color: 'red' }}>{totalPrice}</Text>
                </View>
                <View style={{ width: Dimensions.get("screen").width, height: 1, backgroundColor: "black" }} />
                
                <View style={{ flex: 1, marginHorizontal: 5, justifyContent: "space-around", flexDirection: "row", position: "absolute", bottom: 40 }}>
                    <Text style={{ flex: 1, fontSize: 19 }}>Tổng tiền</Text>
                    <Text style={{ fontSize: 19, color: 'red' }}>{totalPrice}</Text>
                </View>
            </View>
            <Button label="Đặt hàng" style={{marginHorizontal:10,marginBottom:15}}  onPress={()=>order()}/>
        </SafeAreaView>
    );
}

export default index;