import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

export default function Profile() {
  const [userProfile, setUserProfile] = useState("");
  const [albums, setAlbums] = useState([]);
  // console.log(userProfile);
  // const [userId, setUserId] = useState()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      // console.log(decode);
      const userId = decode.userId;

      axios
        .get(`http://localhost:5000/get/user/${userId}`)
        .then((response) => {
          setUserProfile(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      axios
        .get(`http://localhost:5000/get/album/user/${userProfile.user_id}`)
        .then((response) => {
          setAlbums(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [userProfile]);

  const handleDelete = (albumId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:5000/del/album/${albumId}`)
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        ).then((res) => {
          window.location.reload();
        })
      }
    });
    axios
      .delete(``)
      .then((response) => {
        console.log("deleted", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Container>
      <Container className="mt-5 d-flex justify-content-between border-bottom pb-4 mb-5">
        <div className="d-flex flex-column ">
          <h3>@{userProfile.username}</h3>
          <h5>{userProfile.fullname}</h5>
          <h6>{userProfile.email} </h6>
          <p>{userProfile.address}</p>
        </div>
        <div className="d-flex end-0 ">
          <button
            className="btn btn-outline-danger align-self-end"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </Container>
      <Container>
        <a href="/post/album">
          <button className="btn btn-dark mb-3">+ Create Album</button>
        </a>
        <div className="row gap-3">
          {albums.map((album) => (
            <Card className="col-3" key={album.album_id}>
              <Card.Header className="d-flex gap-3 justify-content-end bg-white">
                <Link to={`/album/edit/${album.album_id}`}>
                <button className="btn p-0 border-none">
                  <FaEdit />
                </button>
                </Link>
                <button className="btn p-0 border-none m-0">
                  <FaTrash className="cursor-pointer" onClick={() => handleDelete(album.album_id)} />
                </button>
              </Card.Header>
              <Link
                to={`/album/${album.album_id}`}
                className="text-dark text-decoration-none"
              >
                <Card.Body>
                  <Card.Title>{album.album_name}</Card.Title>
                  <Card.Text>{album.desc}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Container>
  );
}
