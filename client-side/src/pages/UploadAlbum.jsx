import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default function UploadAlbum() {
  const [album_name, setAlbumName] = useState("");
  const [desc, setDesc] = useState("");
  const [userId, setUserId] = useState(null);

useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setUserId(decode.userId);
}, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    const response = axios.post(`http://localhost:5000/post/album`, {
      album_name: album_name,
      desc: desc,
      user_id: userId,
    });

    console.log(response);

    Swal.fire({
      icon: "success",
      title: "Success Upload",
    }).then(() => {
      window.location.href = "/profile";
    });
  };

  return (
    <Container className="col-7 mt-5">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Control
              type="text"
              placeholder="Album Name"
              value={album_name}
              onChange={(e) => setAlbumName(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="btn btn-dark" type="submit">post</button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
