import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function UploadPhoto() {
  const [title, setTitle] = useState("");
  const [capt, setCapt] = useState("");
  const [img, setImg] = useState(null);
  const [userId, setUserId] = useState(null);
  const { albumId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    setUserId(decode.userId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = axios.post(
      `http://localhost:5000/post/photo`,
      {
        title: title,
        caption: capt,
        file_location: img,
        album_id: albumId,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);

    Swal.fire({
      icon: "success",
      title: "Success Upload",
    }).then(() => {
      window.location.href = `/album/${albumId}`;
    });
  };

  return (
    <Container className="col-7 mt-5">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Control
              type="file"
              placeholder="Upload Image"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="caption"
              value={capt}
              onChange={(e) => setCapt(e.target.value)}
            />
            <button className="btn btn-dark" type="submit">
              post
            </button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
