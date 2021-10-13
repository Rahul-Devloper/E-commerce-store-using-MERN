import axios from "axios";

//All these are functions. They can be used in any component by just calling them.
//get all SubCategories
export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subCategories`);
};

//Selecting a single category
export const getSubCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/subCategory/${slug}`);
};

//Removing a single category
export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/subCategory/${slug}`,
    {
      headers: { authtoken },
    }
  );
};

//Updating a single category
export const updateSubCategory = async (slug, authtoken, subCategory) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/subCategory/${slug}`,
    subCategory,
    {
      headers: { authtoken },
    }
  );
};

//Creating a single category
export const createSubCategory = async (authtoken, subCategory) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/subCategory`,
    subCategory,
    {
      headers: { authtoken },
    }
  );
};
