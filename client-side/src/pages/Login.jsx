import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Swal from "sweetalert2";
import  { jwtDecode } from "jwt-decode";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      
      console.log(response.data);
      const decode = jwtDecode(response.data.token);
      localStorage.setItem('token', response.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Success!",
        text: "Login succesful welcome"
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error.response.data);
      setError("Username or password is incorrect");
    }
  };

  return (
    <div className="d-flex mt-5 p-0">
      <Container className=" mt-5 d-flex justify-content-center align-items-center ">
        <Card className="col-4 text-center">
          <Card.Header className="bg-white">
            <h3>Login</h3>
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
              <p className="text-danger d-flex align-left mb-0">
                {error}
              </p>
              <button type="submit" className="btn btn-dark btn-long">
                <p className="mb-0">login</p>
              </button>
            </Form>
            <div className="d-flex gap-1">
            <p>Don't have an account?</p>
            <a href="/register">Register here </a>

            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
