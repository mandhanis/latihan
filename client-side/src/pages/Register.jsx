import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Swal from "sweetalert2";
import  { jwtDecode } from "jwt-decode";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => { 
    event.preventDefault();
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
        fullname,
        email,
        address
      });
      
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Register Success!",
        text: "Register succesful, welcome"
      }).then(() => {
        window.location.href = "/login";
      });
  };

  return (
    <div className="d-flex p-0">
      <Container className=" mt-5 d-flex justify-content-center align-items-center ">
        <Card className="col-4 text-center">
          <Card.Header className="bg-white">
            <h3>Register</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mb-2">
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Fullname"
                value={fullname}
                required
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="submit" className="btn btn-dark btn-long">
                <p className="mb-0">Register</p>
              </button>
            </Form>
            <div className="d-flex gap-1">
            <p>Already have an account?</p>
            <a href="/login">Login here </a>

            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
