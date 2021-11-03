import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    pImage:{
        width:"90%",
        alignSelf:"center",
        height:300
    },
    pName:{
        fontSize:25,
        left:20,
        color:"grey",
        fontWeight:"bold"
    },
    pPrice:{
        color:"#000",
        textAlign:"right",
        right:20,
        fontSize:20,
        fontWeight:"bold"
    },
    descriptionLabel:{
        fontSize:20,
        marginVertical:15,
        marginHorizontal:10
    },
    pDescription:{
        marginHorizontal:10,
        fontSize:17
    }
}) 