import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function EditAlbum() {
  const [album, setAlbum] = useState({});
  const [editedData, setEditedData] = useState({});
  const { albumId } = useParams();
  console.log(album);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    // setUserId(decode.userId);
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/get/album/${albumId}`).then((response) => {
        setAlbum(response.data);
      setEditedData(response.data);
    });
  }, [albumId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .put(`http://localhost:5000/put/album/${albumId}`, editedData)
        .then((response) => {
          console.log("User data updated successfully:", response.data);
          Swal.fire("Upload!", "Your data has been update.", "success").then(
            () => {
              window.location.href = `/profile`;
            }
          );
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          // Show SweetAlert error message
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "An error occurred while updating your profile.",
          });
        });
    }
  };

  return (
    <Container className="col-7 mt-5">
      <h3>Edit Album</h3>
      <Card>
        <Card.Body>
          <Form className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Album Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="album_name"
                value={editedData.album_name || ""}
                onChange={handleInputChange}    
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
              type="text"
              placeholder="Description"
              name="desc"
              value={editedData.desc || ""}
              onChange={handleInputChange}
            />
            </Form.Group>

            
            <button
              className="btn btn-dark"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
