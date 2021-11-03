import { StyleSheet } from "react-native";
import { colors } from "../../../until/colors";
import { statusBarHeight, width } from "../../../until/dimension";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    searchContainer: {
        flexDirection:"row",
        width:width-50,
        backgroundColor:"#fff",
        borderRadius:10,
        marginTop:statusBarHeight*2,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems:"center",
        elevation: 5,
        alignSelf:"center",
        marginVertical:10
    },
    searchInput: {
        paddingHorizontal: 10
    },
    leftIcon:{
        padding:5
    },
    headerList:{
        flexDirection:"row"
    },
    addButton:{
        position:"absolute",
        right:10,
        bottom:10
    }
})