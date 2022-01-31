import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { baseUrlUpload } from "../../until";

const index = ({ index, item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      key={index}
      style={{ backgroundColor: "white", margin: 10, flexDirection: "row" }}
    >
      <Image
        source={{ uri: `${baseUrlUpload}/${item.image}` }}
        style={{ width: 50, height: 80 }}
      />
      <View>
        <Text style={{ color: "brown", fontWeight: "600", marginLeft: 10 }}>
          {item.name}
        </Text>
        <Text style={{ color: "grey", marginLeft: 10 }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default index;
