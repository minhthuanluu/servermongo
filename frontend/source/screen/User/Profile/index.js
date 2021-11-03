import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, ToastAndroid, View } from 'react-native';
import { getUserById } from '../../../api';
import { Circle, Header } from '../../../comps';
import { images } from '../../../until/images';
import { styles } from './style';

const index = (props) => {
    const [user,setUser] = useState();
    const navigation = useNavigation();
    const getData = async() => {
        await getUserById().then((data)=>{
            if(data.status=="success"){
                setUser(data.data)
            }else{
                ToastAndroid.showWithGravity(data.message);
            }
        })
    }

    useEffect(()=>{
        getData();
    },[navigation])
    return (
        <SafeAreaView>
            <Header onBack={() => navigation.goBack()} title="Thông tin cá nhân" />
            <Circle image={images.avatar} size={100} style={{marginTop:-80,alignSelf:"center"}}/>
            <Text style={styles.name}>{user&&user.name}</Text>
            <View style={styles.hr}/>
            <InfoItem icon={images.email} title={user&&user.email} />
            <InfoItem icon={images.phone} title={user&&user.phone}/>
            <InfoItem icon={images.address} title={user&&user.apartment+', '+user.street+', '+user.city+', '+user.country} />
        </SafeAreaView>
    );
}

const InfoItem = ({icon,title}) => {    
    return <View style={styles.itemContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain"/>
        <Text style={styles.title}>{title}</Text>
    </View>
}

export default index;