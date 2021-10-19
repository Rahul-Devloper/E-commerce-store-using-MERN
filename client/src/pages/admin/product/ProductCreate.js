import React from "react";
import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
//fetching categories from backend
import { getCategories, getCategorySubs } from "../../../functions/category";
const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"], //The Admin can pick colors only from this array
  brands: ["Apple", "Mi", "Microsoft", "Lenovo", "HP"], //The Admin can pick brands only from this array
  color: "", //the selected color will be stored in this object.
  brand: "", //the selected brand will be stored in this object.
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((category) => {
      setValues({ ...values, categories: category.data });
      console.log("category=>", category.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log("response=>", res);
        //the page reloads only after the alert message given by the browser.
        //Hence, window.alert is used instead of toast.success
        window.alert(`Product "${res.data.title}" is sucessfully created`);
        window.location.reload(); //Page reloads to clear out the form fields
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("clicked Category=>", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("subs belonging to parent id=>", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <h4>Product Create</h4>
            <hr />
            {JSON.stringify(values.subs)}
            <ProductCreateForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showSub={showSub}
              setValues={setValues}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
