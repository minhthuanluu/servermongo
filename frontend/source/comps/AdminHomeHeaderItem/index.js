import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { width } from '../../until/dimension';

function index({ item, index, widthArray }) {
    return (
        <View style={styles.headerItem, { paddingLeft: index >= 1 ? 10 : 0, width: index == 0 ? 110 : widthArray[index] }}>
            <Text style={styles.text} key={index}>{item}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerItem: {
        padding: 1,
        paddingVertical: 10
    },
    text: {
        fontWeight: "bold"
    }
})
export default index;