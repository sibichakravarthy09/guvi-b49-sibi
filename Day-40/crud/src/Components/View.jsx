import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://651666ac09e3260018c9b81d.mockapi.io/users/" + id)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex w-100 vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow rounded px-5 pt-3 pb-5">
        <h4>User Details</h4>
        <div className="mb-2">
          <p><strong>Name: </strong>{data.name}</p>
        </div>
        <div className="mb-2">
          <p><strong>Username: </strong>{data.username}</p>
        </div>
        <div className="mb-2">
          <p><strong>Email: </strong>{data.email}</p>
        </div>
        <div className="mb-2">
          <p><strong>Phone: </strong>{data.phone}</p>
        </div>
        <div className="mb-2">
          <p><strong>Website: </strong>{data.website}</p>
        </div>


        <Link to={`/edit/${id}`} className="btn btn-success me-2">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default View;