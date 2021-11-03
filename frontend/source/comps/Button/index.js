import React from 'react';
import { View,Text, TouchableOpacity,Image } from 'react-native';
import {styles} from "./style";

const index=(props)=> {
    return (
        <TouchableOpacity style={[{flexDirection:props.icon&&"row"},styles.container,{width:props.width},props.style]} onPress={props.onPress}>
            {
                props.icon ? <Image source={props.icon} style={styles.plus}/>:null
            }
            <Text style={styles.label}>{props.label}</Text>
        </TouchableOpacity>
    );
}

export default index;