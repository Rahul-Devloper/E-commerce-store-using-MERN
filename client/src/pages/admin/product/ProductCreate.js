import React from "react";
import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

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
  const { user } = useSelector((state) => ({ ...state }));

  //Destructuring
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Shipping</label>
                <select
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please Select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Color</label>
                <select
                  name="color"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please Select</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Brand</label>
                <select
                  name="brand"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please Select</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-outline-info my-2">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
