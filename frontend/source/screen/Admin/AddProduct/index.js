import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../until/images';
import { styles } from './style';
import * as ImagePicker from 'expo-image-picker';
import { addProduct, getAllCategory } from '../../../api';
import { Button, Input, SelectData } from '../../../comps';
import { width } from '../../../until/dimension';

const index = (props) => {
    const [path, setPath] = useState(null)
    const [categoryList, setCategoryList] = useState([]);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [image,setImage] = useState({});
    const [localUri,setLocalUri]  = useState('');
    const [type,setType]  = useState('');
    const [fileName,setFileName] = useState('');
    const [countInStock,setCountInStock] = useState(0);
    const [rating,setRating] = useState(0);
    const [numReviews,setNumReviews] = useState(0);
    const [isFeatured,setIsFeatured] = useState(false);

    const featuredList=[
        {
            _id:true,
            name:"Đặc sắc"
        },
        {
            _id:false,
            name:"Thông thường"
        }
    ]

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
            let type = match ? `image/${match[1]}` : 'image';

            let fData = new FormData();
            fData.append("image",{
                uri:localUri,
                type:type,
                name:fileName
            })
            setImage(fData);
            setPath(result);
            setLocalUri(localUri);
            setType(type);
            setFileName(fileName);
        }
    }
    const getCategory = async () => {
        await getAllCategory().then((data) => {
            if (data.status == "success") {
                console.log(data.data)
                setCategoryList(data.data)
            }
        })
    }
    const _addProduct = async(name = '', brand = '', price = 0, description = '', category = '',countInStock='',rating='',numReviews='',image) => {
       if (name.length == 0) {
            setMessage("Vui lòng nhập tên sản phẩm")
        } else if (brand.length == 0) {
            setMessage("Vui lòng nhập thương hiệu sản phẩm")
        } else if (price <= 0) {
            setMessage("Vui lòng nhập giá sản phẩm")
        } else if (description.length == 0) {
            setMessage("Vui lòng nhập mô tả sản phẩm")
        }else if (countInStock.length == 0) {
            setMessage("Vui lòng nhập số lượng sản phẩm trong kho")
        }else if (rating.length == 0) {
            setMessage("Vui lòng nhập xếp hạng sản phẩm")
        }else if (numReviews.length == 0) {
            setMessage("Vui lòng nhập số lượt đánh giá sản phẩm")
        }else if(category.length==0){
            setMessage("Vui lòng chọn loại sản phẩm")
        }else if(Object.values(image).length==0){
            setMessage("Vui lòng chọn hình ảnh cho sản phẩm")
        }
        else{
            setMessage("");
            let fData = new FormData();
            fData.append("image",{
                uri:localUri,
                type:type,
                name:fileName
            });
            fData.append("name",name);
            fData.append("description",description);
            fData.append("brand",brand);
            fData.append("price",price);
            fData.append("category",category);
            fData.append("countInStock",countInStock);
            fData.append("rating",rating);
            fData.append("numReviews",numReviews);
            fData.append("isFeatured",isFeatured);
            
            await addProduct(fData).then((data)=>{
                if(data.status=="success"){
                    alert(data.data.message)
                }
            })
        }
    }
    useEffect(() => {
        (async () => {
            await getCategory();
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => pickImage()}>
                <Image source={path ? { uri: path.uri } : images.avatar} style={styles.avatar} />
            </TouchableOpacity>
            <Input placeholder="Name" width={width - 50} style={{ marginTop: 15 }} onChangeText={(text) => setName(text)} />
            <Input placeholder="Brand" width={width - 50} style={{ marginTop: 15 }} onChangeText={(text) => setBrand(text)} />
            <Input placeholder="Price" number width={width - 50} style={{ marginTop: 15 }} onChangeText={(text) => setPrice(text)} />
            <Input placeholder="Description" multiline width={width - 50} style={{ marginTop: 15 }} onChangeText={(text) => setDescription(text)} />
            <Input placeholder="Count in stock" number width={width - 50} style={{ marginTop: 15 }} onChangeText={(text) => setPrice(text)} />
            <View style={{flexDirection:"row",marginLeft:25}}>
            <Input placeholder="Rating" number width={width/2 - 30} style={{ marginTop: 15 }} onChangeText={(text) => setRating(text)} />
            <Input placeholder="numReviews" number width={width/2 - 30} style={{ marginLeft:10,marginTop: 15 }} onChangeText={(text) => setNumReviews(text)} />
            
            </View>
            <View style={{flexDirection:"row",marginLeft:25}}>
            <SelectData style={{ marginTop: 15 }} placeholder='Chọn thể loại' data={categoryList} width={width/2 - 30} onPress={(item) => setCategory(item._id)} />
            <SelectData style={{ marginLeft:10,marginTop: 15 }} placeholder='Sản phẩm thuộc top' data={featuredList} width={width/2 - 30} onPress={(item) => setIsFeatured(item._id)} />
            </View>
            <Button label="Thêm mới" onPress={() => _addProduct(name, brand, price, description, category,countInStock,rating,numReviews,image,isFeatured)} width={width - 50} style={{ alignSelf: "center", marginTop: 30 }} />
            <Text style={styles.message}>{message}</Text>
        </SafeAreaView>
    );
}

export default index;