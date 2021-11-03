import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { Header, MyOrderItem } from '../../../comps';
import { styles } from './style';

function index(props) {
    const [data,setData] = useState([
        {
            "orderItems": [
                {
                    "image": null,
                    "name": "Samsung Galaxy Tab A7 Lite",
                    "price": 9900000,
                    "quantity": 3,
                    "product": "612faae28e48543950ac037e",
                    "totalPrice": 29700000
                },
                {
                    "image": "aceraspire7a715.png",
                    "name": "Laptop Acer Aspire 7 Gaming A715",
                    "price": 7900000,
                    "quantity": 1,
                    "product": "612f55182fdde61b40e3d9b3",
                    "totalPrice": 7900000
                }
            ],
            "status": "shipping",
            "_id": "617cb7217b93dc20b8791daf",
            "shippingAddress1": "47/4/5 Trường Chinh, P.12, Tân Bình, TP.HCM",
            "shippingAddress2": "470 Lạc Long Quân, P.12, Tân Bình",
            "city": "Hồ Chí Minh",
            "zip": "30000",
            "country": "Việt Nam",
            "phone": "+84383838003",
            "totalPrice": 37600000,
            "user": null,
            "dateOrdered": "2021-10-30T03:08:17.604Z",
            "__v": 0,
            "id": "617cb7217b93dc20b8791daf"
        },
        {
            "orderItems": [
                {
                    "image": null,
                    "name": "Samsung Galaxy Tab A7 Lite",
                    "price": 9900000,
                    "quantity": 3,
                    "product": "612faae28e48543950ac037e",
                    "totalPrice": 29700000
                },
                {
                    "image": "aceraspire7a715.png",
                    "name": "Laptop Acer Aspire 7 Gaming A715",
                    "price": 7900000,
                    "quantity": 1,
                    "product": "612f55182fdde61b40e3d9b3",
                    "totalPrice": 7900000
                }
            ],
            "status": "shipping",
            "_id": "617cb593f85bad0a501ca386",
            "shippingAddress1": "47/4/5 Trường Chinh, P.12, Tân Bình, TP.HCM",
            "shippingAddress2": "470 Lạc Long Quân, P.12, Tân Bình",
            "city": "Hồ Chí Minh",
            "zip": "30000",
            "country": "Việt Nam",
            "phone": "+84383838003",
            "totalPrice": 37600000,
            "user": null,
            "dateOrdered": "2021-10-30T03:01:39.555Z",
            "__v": 0,
            "id": "617cb593f85bad0a501ca386"
        },
        {
            "orderItems": [
                {
                    "image": null,
                    "name": "Samsung Galaxy Tab A7 Lite",
                    "price": 9900000,
                    "quantity": 3,
                    "product": "612faae28e48543950ac037e",
                    "totalPrice": 29700000
                },
                {
                    "image": "aceraspire7a715.png",
                    "name": "Laptop Acer Aspire 7 Gaming A715",
                    "price": 7900000,
                    "quantity": 1,
                    "product": "612f55182fdde61b40e3d9b3",
                    "totalPrice": 7900000
                }
            ],
            "status": "Shipped",
            "_id": "617c1f5fb90e4d1ad4885a30",
            "shippingAddress1": "47/4/5 Trường Chinh, P.12, Tân Bình, TP.HCM",
            "shippingAddress2": "470 Lạc Long Quân, P.12, Tân Bình",
            "city": "Hồ Chí Minh",
            "zip": "30000",
            "country": "Việt Nam",
            "phone": "+84383838003",
            "totalPrice": 37600000,
            "user": null,
            "dateOrdered": "2021-10-29T16:20:47.082Z",
            "__v": 0,
            "id": "617c1f5fb90e4d1ad4885a30"
        }
    ])
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Đơn hàng của tôi"} normal />
            <View style={{ flex: 1, marginTop:100 }}>
                <View style={styles.orderCode}>
                    <Text>Mã đơn hàng</Text>
                    <Text style={styles.code}>009</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item,index})=>{
                        return <MyOrderItem item={item.orderItems[0]} mainItem={item}/>
                    }}
                />

            </View>
        </SafeAreaView>
    );
}

export default index;