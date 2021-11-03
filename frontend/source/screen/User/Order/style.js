import { StyleSheet } from "react-native";
import { width } from "../../../until/dimension";

export const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 30,
        borderRadius: 10,
        marginRight: 10
    },
    itemContainer: {
        width: width,
        flexDirection: "row",
        justifyContent:"space-around",
        margin: 10
    },
    name: {

        fontWeight: "bold",
        fontSize: 17,
        color: "#707070"
    },
    price: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#f00",
        textAlign: "right"
    },
    plusContainer: {
        paddingHorizontal: 25,
        borderRadius: 15,
        backgroundColor: '#FFC107'
    },
    plusText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 25
    },
    hr:{
        height:1,
        opacity:0.3,
        width:width,
        backgroundColor:"#999",
        marginBottom:10
    },
    totalPrice:{
        alignSelf:"flex-end",
        marginRight:15,
        color:"blue",
        fontWeight:"bold"
    },
    addressContainer:{
        marginTop:15
    }
})