import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { Button, Input } from "../../../comps";
import { width } from "../../../until/dimension";
import { register } from "../../../api";
import { styles } from "./style";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const index = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.signupReducer);
  const { user, loading, error } = userSelector;

  const checkNull = (value) => {
    if (!value.trim()) {
      return false;
    } else {
      return true;
    }
  };

  const _signUp = async (
    name,
    email,
    password,
    confirmPassword,
    phone,
    apartment,
    zip,
    city,
    country
  ) => {
    if (checkNull(name) == false) {
      setMessage("Họ tên không được rỗng");
    } else if (checkNull(email) == false) {
      setMessage("Email không được rỗng");
    } else if (checkNull(password) == false) {
      setMessage("Password không được rỗng");
    } else if (checkNull(confirmPassword) == false) {
      setMessage("Vui lòng nhập lại mật khẩu");
    } else if (password != confirmPassword) {
      setMessage("Mật khẩu xác nhận chưa trùng khớp");
      // }
      // else if (checkNull(apartment) == false) {
      //   setMessage("Vui lòng nhập địa chỉ");
      // } else if (password.lenght < 6 || confirmPassword.lenght < 6) {
      //   setMessage("Độ dài mật khẩu phải tù 6 ký tự trở lên");
      // } else if (checkNull(zip) == false) {
      //   setMessage("Vui lòng nhập Zip code");
      // } else if (checkNull(city) == false) {
      //   setMessage("Vui lòng nhập thành phố bạn sinh sống");
      // } else if (checkNull(country) == false) {
      //   setMessage("Vui lòng nhập quốc gia");
    } else {
      // await register(
      //   name,
      //   email,
      //   password,
      //   phone,
      //   apartment,
      //   zip,
      //   city,
      //   country
      // ).then((data) => {
      //   if (data.status == "success") {
      //     setMessage("Đăng ký thành công!");
      //   } else if (data.status == "failed") {
      //     setMessage(data.message);
      //   }
      // });
      dispatch(register(name, email, phone, apartment, zip));
      if (user) {
        alert("Đăng ký thành công!!!");
      }
      if (error) {
        alert(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ĐĂNG KÝ</Text>
      <Text style={styles.message}>{message}</Text>
      <Input
        placeholder="Họ tên"
        width={width - 100}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <Input
        placeholder="Email"
        style={styles.passInput}
        width={width - 100}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <Input
        placeholder="Mật khẩu"
        style={styles.passInput}
        width={width - 100}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <Input
        placeholder="Xác nhận mật khẩu"
        style={styles.passInput}
        width={width - 100}
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />
      {/* <Input
        placeholder="Địa chỉ"
        style={styles.passInput}
        width={width - 100}
        value={apartment}
        onChangeText={(value) => setApartment(value)}
      /> */}
      <Input
        placeholder="Số điện thoại"
        style={styles.passInput}
        width={width - 100}
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />
      {/* <Input
        placeholder="Zip"
        style={styles.passInput}
        width={width - 100}
        value={zip}
        onChangeText={(value) => setZip(value)}
      />
      <Input
        placeholder="Thành phố"
        style={styles.passInput}
        width={width - 100}
        value={city}
        onChangeText={(value) => setCity(value)}
      />
      <Input
        placeholder="Quốc gia"
        style={styles.passInput}
        width={width - 100}
        value={country}
        onChangeText={(value) => setCountry(value)}
      /> */}
      <Button
        label="Đăng ký"
        width={150}
        style={styles.button}
        onPress={() => _signUp(name, email, password, confirmPassword, phone)}
      />
    </SafeAreaView>
  );
};

export default index;
