import { StyleSheet } from "react-native";
import { colors } from "../../../until/colors";

export const styles = StyleSheet.create({
    avatar:{
        alignSelf:"center",
        marginTop:15,
        width:100,
        height:100,
        borderRadius:50
    },
    message:{
        color:colors.orange,
        textAlign:"center",
        marginTop:15
    }
})