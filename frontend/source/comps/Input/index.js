import React from 'react';
import { View,Text, TextInput, Image } from 'react-native';
import {styles} from "./style";

const index=(props)=> {
    return (
        <View style={[styles.container,props.style,{width:props.width}]}>
            <Image source={props.leftIcon}/>
            <TextInput style={styles.input} defaultValue={props.defaultValue} keyboardType={props.number ? "number-pad" : "default"} multiline={props.multiline?true:false} secureTextEntry={props.password?true:false} placeholder={props.placeholder} onChangeText={props.onChangeText} value={props.value}/>
        </View>
    );
}

export default index;