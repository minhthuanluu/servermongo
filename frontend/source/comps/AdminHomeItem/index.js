import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { baseUrlUpload } from '../../until';
import { width } from '../../until/dimension';
import { images } from '../../until/images';

function index({ item, index, widthArray, onUpdate,onDelete }) {
    return (
        <View style={[styles.headerItem, { backgroundColor: index % 2 == 0 ? "lightgrey" : "white" }]}>
            <Image source={{ uri: `${baseUrlUpload}${item.image}` }} style={styles.image} resizeMode="contain"/>
            <Text style={{ marginHorizontal:2,width: widthArray[1], textAlignVertical: "center",marginLeft:10 }}>{item.brand}</Text>
            <Text style={{ width: widthArray[2], textAlignVertical: "center" }}>{item.name}</Text>
            <Text style={{ marginHorizontal:2,width: widthArray[3], textAlignVertical: "center" }}>{item.categoryName}</Text>
            <Text style={{ width: widthArray[4], textAlignVertical: "center" }}>{item.price}</Text>
            <View style={styles.toolContainer}>
                <TouchableOpacity onPress={onUpdate}>
                    <Image source={images.update} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Image source={images.del} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerItem: {
        padding: 10,
        flexDirection: "row"
    },
    image: {
        width: 100,
        height: 40,
        paddingRight:10
    },
    toolContainer:{
        justifyContent:"space-between",
        marginLeft:15
    }
})
export default index;