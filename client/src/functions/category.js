import axios from "axios";

//All these are functions. They can be used in any component by just calling them.
//get all categories
export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

//Selecting a single category
export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

//Removing a single category
export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: { authtoken },
  });
};

//Updating a single category
export const updateCategory = async (slug, authtoken, category) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    {
      headers: { authtoken },
    }
  );
};

//Creating a single category
export const createCategory = (authtoken, category) => {
  return axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: { authtoken },
  });
};

//geting subcategories based on Particular Parent Id
export const getCategorySubs = async (_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/category/subCategories/${_id}`
  );
};
