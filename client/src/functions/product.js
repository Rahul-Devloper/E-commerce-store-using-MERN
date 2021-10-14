import axios from "axios";

//Creating a product
export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: { authtoken },
  });
};
