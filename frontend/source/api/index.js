import axios from "axios";
import { _receiveData } from "../until/storage";
export const baseUrl = "http://192.168.1.6:3000/api/v1/";

export const register = async (
  name,
  email,
  password,
  phone,
  apartment,
  zip,
  city,
  country
) => {
  let result = {
    data: null,
    error: null,
    status: "",
    message: "",
  };
  const data = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    isAdmin: false,
    apartment: apartment,
    zip: zip,
    city: city,
    country: country,
  };
  await axios({
    method: "POST",
    url: `${baseUrl}users/register`,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data: data,
  })
    .then((res) => {
      if (res.status == 200) {
        result = {
          data: res.data,
          status: "success",
        };
      } else {
        result = {
          data: res.data,
          status: "failed",
        };
      }
    })
    .catch((error) => {
      result = {
        data: null,
        error: error,
        status: "failed",
      };
    });

  return result;
};

export const login = async (email, password) => {
  let result = {
    data: null,
    error: null,
    status: "",
    message: "",
  };
  const data = {
    email: email,
    password: password,
  };

  await axios({
    method: "POST",
    url: `${baseUrl}users/login`,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data: data,
  })
    .then((res) => {
      if (res.status == 200) {
        result = {
          data: res.data,
          status: "success",
        };
      } else {
        result = {
          data: res.data,
          status: "failed",
        };
      }
    })
    .catch((error) => {
      result = {
        data: null,
        error: error,
        status: "failed",
      };
    });
  return result;
};

export const getAllProduct = async () => {
  let result = {
    data: null,
    error: null,
    status: "",
    message: "",
  };

  await axios
    .get(`${baseUrl}products/`)
    .then((res) => {
      if (res.status == 200) {
        result = {
          data: res.data,
          status: "success",
        };
      } else {
        result = {
          data: res.data,
          status: "failed",
        };
      }
    })
    .catch((error) => {
      if (error) {
      }
    });

  return result;
};

export const getAllCategory = async () => {
  let data = {
    data: null,
    error: null,
    status: "",
    message: "",
  };

  await axios({
    method: "GET",
    url: `${baseUrl}categories`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          status: "success",
          length: res.data.length,
        };
      }
    })
    .catch((error) => {
      data = {
        data: null,
        error: error,
        status: "failed",
      };
    });
  return data;
};

export const getProductListByCategoryId = async (catId) => {
  let data = {
    data: null,
    error: null,
    status: "",
    message: "",
  };

  await axios({
    method: "GET",
    url: `${baseUrl}products/categoryId/${catId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          status: "success",
        };
      }
    })
    .catch((error) => {
      data = {
        data: null,
        error: error,
        status: "failed",
      };
    });

  return data;
};

export const addProduct = async (formData) => {
  let data = {
    data: null,
    error: null,
    status: "",
    message: "",
  };
  await axios({
    method: "POST",
    url: `${baseUrl}products/`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: formData,
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          status: "success",
        };
      }
    })
    .catch((error) => {
      data = {
        data: null,
        error: error,
        status: "failed",
      };
    });

  return data;
};

export const deleteProduct = async (id) => {
  let data = {
    data: null,
    error: null,
    status: "",
    message: "",
  };
  await axios({
    method: "DELETE",
    url: `${baseUrl}products/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          status: "success",
        };
      }
    })
    .catch((error) => {
      data = {
        error: error,
        status: "failed",
      };
    });
  return data;
};

export const updateProduct = async (formData, id) => {
  let data = {
    message: "",
    status: "",
    res: null,
    loading: true,
    error: null,
  };
  await axios({
    method: "PUT",
    url: `${baseUrl}products/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: formData,
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          message: "Cập nhật sản phẩm thành công",
          data: res.data,
          loading: false,
          status: "success",
        };
      }
    })
    .catch((error) => {
      alert(error);
      if (error) {
        data = {
          error: error.response,
          loading: false,
          status: "failed",
        };
      }
    });

  return data;
};

export const getProductById = async (id) => {
  let data = {
    message: "",
    data: null,
    status: false,
    loading: true,
    error: null,
  };

  await axios({
    method: "GET",
    url: `${baseUrl}products/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status == 200) {
      data = {
        data: res.data,
        loading: false,
        status: "success",
      };
    }
  });

  return data;
};

export const orderProduct = async (orderData) => {
  let user = {};
  await _receiveData("userInfo").then((item) => (user = item));
  const TOKEN = await user.token;

  let data = {
    message: "",
    data: null,
    status: false,
    loading: true,
    error: null,
  };

  await axios({
    method: "GET",
    url: `${baseUrl}orders`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: orderData,
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          data: res.data,
          loading: false,
          status: "success",
        };
      }
    })
    .catch((error) => {
      data = {
        error: error.response.data,
      };
    });

  return data;
};

export const getUserById = async () => {
  let user = await _receiveData("userInfo");
  let uid = user.user.id;
  console.log(user.user.id);
  let token = user.token;
  let data = {
    data: null,
    status: false,
    error: null,
    message: null,
    loading: true,
  };
  await axios({
    method: "GET",
    url: `${baseUrl}users/61838ecd11bb870aa8051a6c`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        data = {
          data: res.data,
          status: "success",
          loading: false,
        };
      }
    })
    .catch((error) => {
      data = {
        data: error.response.data,
        message: error.response.message,
        loading: false,
        status: "failed",
      };
    });
  return data;
};
