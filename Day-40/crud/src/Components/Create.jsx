import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    address:{
      city:""
    },
    phone: "",
    website: "",
    company:{
      name:""
    }
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://651666ac09e3260018c9b81d.mockapi.io/users", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex w-100 vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow rounded px-5 pt-3 pb-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="fw-bold mb-1 mt-1">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="fw-bold mb-1 mt-1">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="fw-bold mb-1 mt-1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="websitey" className="fw-bold mb-1 mt-1">Website</label>
            <input
              type="text"
              className="form-control"
              id="website"
              placeholder="Enter website"
              onChange={(e) =>
                setValues({ ...values, website: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="fw-bold mb-1 mt-1">Phone number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter phone number"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city" className="fw-bold mb-1 mt-1">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter city"
              onChange={(e) => setValues({ ...values, address:{...values.address, city: e.target.value }})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company" className="fw-bold mb-1 mt-1">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              placeholder="Enter company name"
              onChange={(e) => setValues({ ...values, company:{...values.company, name: e.target.value }})}
            />
          </div>
          
          <div className="buttons pt-2">
            <button className="btn btn-success me-2">Submit</button>
            <Link to="/" className="btn btn-primary">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;