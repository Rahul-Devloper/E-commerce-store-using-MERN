import React from "react";
import { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("false");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h3>Password Update</h3>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
