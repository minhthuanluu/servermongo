import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../until/colors';
import { statusBarHeight } from '../../until/dimension';
import { images } from '../../until/images';
import { styles } from './style';

const index = (props) => {
    return (
        props.normal ?
            <View style={{...styles.normal, backgroundColor:colors.white,flexDirection: "row", position: "absolute", zIndex: 20, paddingVertical: 15, marginTop: statusBarHeight }}>
                <TouchableOpacity onPress={props.onBack} style={{ paddingHorizontal: 10 }}><Image source={images.back} style={{ tintColor: colors.black }} /></TouchableOpacity>
                <Text style={{...styles.title,color:colors.black}}>{props.title}</Text>
                <TouchableOpacity onPress={props.onUpdate} style={{ paddingHorizontal: 10 }}><Image source={images.updatewhite} /></TouchableOpacity>
            </View>
            :
            <View>
                <View style={{ flexDirection: "row", position: "absolute", zIndex: 20, paddingVertical: 15, marginTop: statusBarHeight }}>
                    <TouchableOpacity onPress={props.onBack} style={{ paddingHorizontal: 10 }}><Image source={images.back} style={{ tintColor: colors.white }} /></TouchableOpacity>
                    <Text style={styles.title}>{props.title}</Text>
                    <TouchableOpacity onPress={props.onUpdate} style={{ paddingHorizontal: 10 }}><Image source={images.updatewhite} /></TouchableOpacity>
                </View>
                <Image source={images.header} style={{ width: "100%", height: 200 }} />
            </View>
    );
}

export default index;