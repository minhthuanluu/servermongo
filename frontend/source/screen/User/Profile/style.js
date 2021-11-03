import { StyleSheet } from "react-native";
import { colors } from "../../../until/colors";

export const styles = StyleSheet.create({
    name:{
        textAlign:"center",
        marginVertical:10,
        fontSize:17
    },
    hr:{
        height:1,
        alignSelf:"center",
        width:"80%",
        marginVertical:15,
        backgroundColor:colors.grey
    },
    itemContainer:{
        flexDirection:"row",
        marginLeft:"20%",
        marginVertical:10,
        marginRight:"10%"
    },
    icon:{
        width:20,
        height:20,
        marginTop:5
    },
    title:{
        fontSize:16,
        color:colors.grey,
        marginLeft:"3%"
    }
})