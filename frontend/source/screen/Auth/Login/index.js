import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native'
import { styles } from './style';
import { Button, Input } from "../../../comps"
import { width } from "../../../until/dimension"
import { login } from '../../../api';
import { _storeData } from "../../../until/storage";
import { useNavigation } from "@react-navigation/native";

const index = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    const checkNull = (value) => {
        if (!value.trim()) {
            return false;
        }else{
            return true
        }
    }

    const _signIn = async (email,password)=>{
        if(checkNull(email)==false){
            setMessage("Vui lòng nhập email")
        }else if(checkNull(password)==false){
            setMessage("Vui lòng nhập mật khẩu")
        }else{
            await login(email,password).then(async(data)=>{
                console.log(JSON.stringify(data))
                if(data.status=="success"){

                    await _storeData('userInfo',data.data);
                    if(data.data.user.isAdmin==true){
                        navigation.navigate('AdminHome')
                    }else{
                        navigation.navigate("UserHome")
                    }
                }else if(data.status=="failed"){
                    setMessage(data.message)
                }
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>ĐĂNG NHẬP</Text>
            <Text style={styles.message}>{message}</Text>
            <Input
                placeholder="Email"
                width={width - 100}
                style={styles.passInput}
                value={email}
                onChangeText={(value) => setEmail(value)} />
            <Input
                placeholder="Mật khẩu"
                password
                width={width - 100}
                style={styles.passInput}
                value={password}
                onChangeText={(value) => setPassword(value)} />
            <Button
                label="Đăng nhập"
                width={150}
                style={styles.button}
                onPress={() => _signIn(email, password)}
            />
        </SafeAreaView>
    );
}

export default index;