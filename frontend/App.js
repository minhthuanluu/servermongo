import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./source/screen/Auth/Login"
import Home from './source/screen/Admin/Home'
import Category from './source/screen/Admin/Category'
import Order from './source/screen/User/Order'
import AddProduct from './source/screen/Admin/AddProduct'
import UpdateProduct from './source/screen/Admin/UpdateProduct'
import UserHome from './source/screen/User/Home'
import DetailProduct from './source/screen/User/DetailProduct'
import AdminHome from './source/screen/Admin/Home'
import Cart from './source/screen/User/Cart'
import Profile from './source/screen/User/Profile';
import MyOrder from './source/screen/User/MyOrder'

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const AuthStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const LoginScreen = () => {
  return <Login />
}

const RegisterScreen = () => {
  return <Register />
}

const UserHomeScreen = () => {
  return <UserHome />
}

const CartScreen = () => {
  return <Cart />
}

const CategoryScreen = () => {
  return <Category />
}

const OrderScreen = () => {
  return <Order />
}

const AddProductScreen = () => {
  return <AddProduct />
}

const UpdateProductScreen = () => {
  return <UpdateProduct />
}

const DetailProductSccreen=()=>{
  return <DetailProduct />
}

const AdminHomeScreen = () => {
  return <AdminHome />
}

const ProfileScreen = () => {
  return <Profile />
}

const MyOrderScreen = () => {
  return <MyOrder/>
}

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="AdminHome" screenOptions={{headerShown:false}}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AdminStack.Screen name="AdminHome" component={AdminHomeScreen} />
        <AdminStack.Screen name="UserHome" component={UserHome} />
        <AdminStack.Screen name="Update" component={UpdateProduct} />
        <AdminStack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen  name="Profile" component={ProfileScreen}/>
        <Stack.Screen  name="MyOrder" component={MyOrderScreen}/>
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
