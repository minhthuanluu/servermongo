import {StyleSheet} from "react-native";
import { colors } from "../../until/colors";

export const styles= StyleSheet.create({
    container:{
        backgroundColor:"orange",
        padding:10,
        height:43,
        borderRadius:10
    },
    label:{
        fontSize:15,
        fontWeight:"bold",
        color:colors.white,
        textAlign:"center"
    }
})