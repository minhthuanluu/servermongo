import {StyleSheet} from "react-native";
import { colors } from "../../../until/colors";

export const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    passInput:{
        marginVertical:10
    },
    button:{
        marginTop:15
    },
    title:{
        fontSize:25,
        color:colors.blue
    },
    message:{
        color:colors.black,
        marginVertical:20
    }

});