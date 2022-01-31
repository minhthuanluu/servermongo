import axios from "axios";
import { baseUrl } from "../until";
import { _receiveData } from "../until/storage";

export const getAllBrand = async () => {
  return axios({
    method: "GET",
    url: `${baseUrl}brand`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const getPriceList = async () => {
  let result = {
    data: null,
    loading: true,
    status: "",
    error: null,
    message: "",
  };

  await axios({
    method: "GET",
    url: `${baseUrl}brand/priceList`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      result = {
        data: res.data,
        status: "success",
      };
    })
    .catch((error) => {
      result = {
        error: error,
        status: "failed",
      };
    });

  return result;
};

export const getFilterCondition = async (categoryId, brandId, from, to) => {
  let data = {
    data: null,
    loading: true,
    error: null,
    status: null,
  };
  await axios
    .get(`${baseUrl}products/multicondition`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        categoryId: categoryId,
        brandId: brandId,
        from: from,
        to: to,
      },
    })
    .then((res) => {
      console.log(res.data);
      data = {
        data: res.data,
        loading: false,
        status: "success",
      };
    })
    .catch((error) => {
      if (error) {
        data = {
          error: error.response.data,
          status: "failed",
        };
      }
    });

  return data;
};

export const getAllProduct = async () => {
  return await axios.get(`${baseUrl}products`);
};
