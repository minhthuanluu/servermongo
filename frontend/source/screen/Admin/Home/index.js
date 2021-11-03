import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, TextInput, View, FlatList, Text, ScrollView, Alert } from 'react-native';
import { deleteProduct, getAllProduct } from '../../../api';
import { images } from '../../../until/images';
import { styles } from './style';
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";
import { AdminHomeHeaderItem, AdminHomeItem, Button } from '../../../comps';
import { width } from '../../../until/dimension';

const index = (props) => {
    const [dataList, setDataList] = useState([])
    const [tempList, setTempList] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigation = useNavigation();
    const isFocus = useIsFocused();

    const getData = async () => {
        await getAllProduct().then((data) => {
            if (data.status == "success") {
                setDataList(data.data.data);
                setTempList(data.data.data)
            }
            if (data.status == "failed") {
                setMessage(data.message)
            }
        })
    }
    const filterData = (text = '') => {
        tempList.concat(tempList);
        const newList = tempList.filter(item => {
            const itemList = `${item.name.toUpperCase()}`;
            return itemList.indexOf(text.toUpperCase()) > -1;
        })
        if (text.length > 0) {
            setTempList(newList)
        } else {
            setTempList(dataList)
        }
    }

    // useFocusEffect(() => {
    //     const init = async () => {
    //         await getData()
    //     }
    //     init()
    // })

    useEffect(() => {
        const init = async () => {
            await getData()
        }
        init()
    }, [isFocus])

    const _deleteProduct = async(item) => {
        Alert.alert("Thông báo","Bạn có chắc muốn xóa sản phẩm này không?",
            [
                {
                    text:"Hủy",
                    onPress:()=>console.log('Cancle'),
                    style:"cancle"
                },
                {
                    text:"OK",
                    onPress:async()=>{
                        await deleteProduct(item.id).then(async(data)=>{
                            if(data.status=="success"){
                                alert("Xóa sản phẩm thành công");
                                await getData();
                            }
                            if(data.status=="failed"){
                                alert(data.message)
                            }
                        })
                    },
                    style:"default"
                }
            ])
        
    }

    const updateProduct=(item)=>{
        navigation.navigate("Update",{"item":item})
    }

    const headerList = ["", "Brand", "Name", "Categories", "Price", ""]
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={images.search} style={styles.leftIcon} />
                <TextInput placeholder="Tìm kiếm sản phẩm" style={styles.searchInput} onChangeText={(text) => filterData(text)} />
            </View>
            <ScrollView horizontal>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={tempList}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <View style={styles.headerList}>
                                {headerList.map((item, index) => <AdminHomeHeaderItem item={item} index={index} widthArray={[width / 5, width / 6, width / 4, width / 4, width / 6, width / 8]} />)}
                            </View>}
                        renderItem={({ item, index }) => {
                            return <AdminHomeItem
                                onDelete={() => _deleteProduct(item)}
                                onUpdate={()=>updateProduct(item)}
                                item={item} index={index} widthArray={[width / 5, width / 6, width / 4, width / 4, width / 6, width / 8]} />
                        }}
                    />
                </View>
            </ScrollView>

            <Button
                width={width / 3.2}
                style={styles.addButton}
                icon={images.plus}
                label="Add product"
                onPress={() => navigation.navigate("AddProduct")} />
        </SafeAreaView>
    );
}

export default index;