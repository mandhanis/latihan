import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Ratio from "react-bootstrap/Ratio";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  console.log(photos);
  // const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/get/photos/new`)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  return (  
    <Container className="col-12  d-flex justify-content-center">
      <Container className="mt-3 row d-flex gap-3 mx-5">
        {photos.map((photo) => (
          <Card key={photo.id} className="m-0 px-0 col-3"  >
            <Link to={`/photo/${photo.id}`} className="text-black text-decoration-none">
            <Card.Header>@{photo.username}</Card.Header>
            <Ratio aspectRatio="1x1">
              <Card.Img src={`http://localhost:5000/images/${photo.file_location.replace(/^.*[\\\/]/, "")}`} className="img-fluid object-fit-cover" />
            </Ratio>
            <Card.Body>
              <Card.Text >{photo.title}</Card.Text>
            </Card.Body>
            </Link>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
