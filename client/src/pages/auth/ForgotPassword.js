import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("true");

    const config = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      // This must be true.
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading("false");
        toast.success("Check your EMail for password reset link");
      })
      .catch((error) => {
        setLoading("false");
        toast.error(error.message);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter Email"
        />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
