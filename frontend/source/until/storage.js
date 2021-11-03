import AsyncStorage from "@react-native-async-storage/async-storage";

export const _storeData = async (key, value = {}) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        )
    } catch (error) {
        console.log(error)
    }
}

export const _receiveData = async (key) => {
    try {
        var value = await AsyncStorage.getItem(key);
        if (value != null) {
            return JSON.parse(value)
        } else {
            return null
        }
    } catch (error) {
        console.log(error)

    }
}

export const _removeData = async (key) => {
    try {
        var value = await AsyncStorage.removeItem(key)
        return value;
    } catch (error) {
        console.log(error)
    }
}