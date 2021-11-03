import React from 'react';
import { Image,View } from 'react-native';

function index(props) {
    return (
        <Image source={props.image} style={{...props.style,width:props.size,height:props.size,borderRadius:props.size/2}}/>
    );
}

export default index;