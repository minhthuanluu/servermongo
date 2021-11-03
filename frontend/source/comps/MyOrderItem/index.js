import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../until/colors'
import { images } from '../../until/images'
import moment from "moment"

export default function index({ item, mainItem }) {
    return (
        <View style={{ flexDirection: "row" }}>
            <Image style={{ width: "30%", height: 130, margin: 5 }} source={item.image != null ? { uri: 'http://192.168.137.166:3000/public/uploads/' + item.image } : images.noimg} />
            <View>
                <Text style={{ color: colors.orange, fontWeight: "bold", fontSize: 17, marginBottom: 5 }}>{item.name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: colors.blue,flex:1 }}>Giá: {item.totalPrice}</Text>
                    <Text style={{ color: colors.blue }}>Số lượng: {item.quantity}</Text>
                </View>
                <Text style={{ color: colors.black }}>Tổng tiền: {item.quantity * item.totalPrice}</Text>
                <Text style={{ color: colors.black }}>Trạng thái đơn hàng: {mainItem.status}</Text>
                <Text style={{ color: colors.black }}>Ngày đặt hàng: {moment(mainItem.dateOrdered).format("DD/MM/YYYY")}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
