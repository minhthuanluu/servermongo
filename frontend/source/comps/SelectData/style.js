import { StyleSheet } from "react-native";
import { colors } from "../../until/colors";

export const styles = StyleSheet.create({
    select:{
        backgroundColor:colors.white,
        padding:7,
        flexDirection:"row",
        borderRadius:25,
        height:40,
        shadowColor: colors.black,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    selectText:{
        flex:1,
        paddingLeft:10,
        textAlignVertical:"center"
    },
    item:{
        padding:10
    },
    modalTitle:{
        padding:20,
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    dropdown:{
        resizeMode:"contain",
        width:25,
        right:10,
        top:-85
    }
})