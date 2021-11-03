import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../until/colors';
import { images } from '../../until/images';
import { styles } from './style';

const index = (props) => {
    const { data } = props;
    const [item, setItem] = useState('')
    const [visible, setVisible] = useState(false)
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={() => setVisible(!visible)} style={[styles.select, { width: props.width && props.width, alignSelf: "center" }]}>
                <Text style={styles.selectText}>{item || props.placeholder}</Text>
                <Image source={images.dropdown} style={styles.dropdown}/>
            </TouchableOpacity>
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={visible}>
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>setVisible(!visible)}>

                </TouchableOpacity>
                <View style={{ flex: 1, backgroundColor: colors.white,borderTopRightRadius:20,borderTopLeftRadius:20 }}>
                    <Text style={styles.modalTitle}>Chọn thể loại</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item,index)=>index.toString()}
                        renderItem={({item,index})=>{
                            return <TouchableOpacity onPress={()=>{setItem(item.name);setVisible(!visible);props.onPress(item)}} style={[styles.item,{backgroundColor:index%2?"white":"lightgrey"}]}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
}

export default index;