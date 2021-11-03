import { StyleSheet } from "react-native";
import { colors } from "../../until/colors";

export const styles = StyleSheet.create({
    container:{

    },
    title:{
        flex:1,
        textAlign:"center",
        color:colors.white,
        fontWeight:"bold",
        fontSize:17
    },
    normal:{
        shadowColor:"#ccc",
        shadowOffset:{
            width:5,
            height:1
        },
        shadowOpacity:0.5,
        shadowRadius:10,
        elevation:5
    }
})