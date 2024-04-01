import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();

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

  useEffect(() => {
    axios
      .get("https://651666ac09e3260018c9b81d.mockapi.io/users/" + id)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("https://651666ac09e3260018c9b81d.mockapi.io/users/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex w-100 vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow rounded px-5 pt-3 pb-5">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name" className="fw-bold mb-1 mt-1">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={values.name}
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
              value={values.username}
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
              value={values.email}
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
              value={values.website}
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
              value={values.phone}
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
              value={values.address.city}
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
              value={values.company.name}
              onChange={(e) => setValues({ ...values, company:{...values.company, name: e.target.value }})}
            />
          </div>

            <div className="btn mt-3">
                <button className="btn btn-success me-2"> Update </button>
              <Link to="/" className="btn btn-primary">
                Back
              </Link>
            </div>
        
        </form>
      </div>
    </div>
  );
};

export default Edit;