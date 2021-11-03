import { StyleSheet } from "react-native";
import { width } from "../../../until/dimension";

export const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 150,
        borderRadius: 10,
        marginRight: 10
    },
    itemContainer: {
        width: width,
        flexDirection: "row",
        margin: 10
    },
    name: {

        fontWeight: "bold",
        fontSize: 20,
        color: "#707070"
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#000",
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
    }
})