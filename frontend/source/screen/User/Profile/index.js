import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../api";
import { Circle, Header } from "../../../comps";
import { getUserProfile } from "../../../redux/actions/profileAction";
import { images } from "../../../until/images";
import { styles } from "./style";

const index = (props) => {
  //   const [user, setUser] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //   const [loading, setLoading] = useState(true);
  const { user, loading, error } = useSelector((state) => state.profileReducer);
  const getData = async () => {
    dispatch(getUserProfile());
    if (user) {
    }
    if (loading) {
      setLoading(loading);
    }
    if (error) {
      ToastAndroid.showWithGravity(error);
    }
  };

  useEffect(() => {
    getData();
  }, [navigation]);
  return (
    <SafeAreaView>
      <Header onBack={() => navigation.goBack()} title="Thông tin cá nhân" />
      <Circle
        image={images.avatar}
        size={100}
        style={{ marginTop: -80, alignSelf: "center" }}
      />
      <Text style={styles.name}>{user && user.name}</Text>
      <View style={styles.hr} />
      {loading == true ? (
        <ActivityIndicator color="orange" size="small" />
      ) : null}
      <InfoItem icon={images.email} title={user && user.email} />
      <InfoItem icon={images.phone} title={user && user.phone} />
      <InfoItem
        icon={images.address}
        title={
          user &&
          user.apartment +
            ", " +
            user.street +
            ", " +
            user.city +
            ", " +
            user.country
        }
      />
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, title }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default index;
