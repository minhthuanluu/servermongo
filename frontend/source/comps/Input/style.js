import {StyleSheet} from "react-native";
import { colors } from "../../until/colors";

export const styles= StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        padding:10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        borderRadius:25,
        alignSelf:"center",
        flexDirection:"row"
    },
    label:{
        
    },
    input:{
        marginLeft:15
    }
})