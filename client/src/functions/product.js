import axios from "axios";

//Creating a product
export const createProduct = (product, authtoken) => {
  return axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: { authtoken },
  });
};
