import { StyleSheet } from "react-native";
import { colors } from "../../../until/colors";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:25,
        color:colors.blue
    },
    message:{
        color:colors.blue,
        marginVertical:20
    },
    passInput:{
        marginVertical:10
    },
    button:{
        marginTop:15
    }
})