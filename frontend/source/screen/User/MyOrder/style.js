import { StyleSheet } from "react-native";
import { colors } from "../../../until/colors";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    orderCode:{
        flexDirection:"row",
        alignSelf:"center"
    },
    code:{
        color:"#D19C00",
        marginLeft:10,
        fontSize:15,
        fontWeight:"bold"
    }
})