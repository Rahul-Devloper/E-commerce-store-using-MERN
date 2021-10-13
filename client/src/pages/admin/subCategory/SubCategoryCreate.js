import React from "react";
import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  createSubCategory,
  removeSubCategory,
  getSubCategory,
  getSubCategories,
} from "../../../functions/subCategory";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); //this state gets all categories from the backend
  const [category, setCategory] = useState(""); //this state gets the value of the selected options and send it to backend for creating a sub category
  const [subCategories, setSubCategories] = useState([]); //this statessetSubCategory] = useState("");
  //Creating State for Searching Feature
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const loadSubCategories = () => {
    getSubCategories()
      .then((res) => {
        console.log(res.data);
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  //Handlers start
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSubCategory(user.token, { name: name, parent: category })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created successfully`);
        loadSubCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to Delete this item?")) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success(`${res.data.name} is Deleted`);
          loadSubCategories();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  //Handlers End

  const searched = (keyword) => (category) =>
    category.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Sub Category</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {/* adding the "searched" function in the mapping feature */}
          {subCategories.filter(searched(keyword)).map((subCategory) => (
            <div className="alert alert-dark" key={subCategory._id}>
              {subCategory.name}{" "}
              <span
                onClick={() => {
                  handleRemove(subCategory.slug);
                }}
                className="btn btn-sm"
                style={{ float: "right" }}
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subCategory/${subCategory.slug}`}>
                <span className="btn btn-sm" style={{ float: "right" }}>
                  <EditOutlined className="text-primary" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
