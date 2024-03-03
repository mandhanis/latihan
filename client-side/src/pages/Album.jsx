import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
// import Img from "../assets/images/img.jpg";
import Ratio from "react-bootstrap/esm/Ratio";
import axios from "axios";

export default function Album() {
  const [albumName, setAlbumName] = useState("");
  const [photos, setPhotos] = useState([]);
  const { albumId } = useParams();
  console.log(photos);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/album/${albumId}`)
      .then((response) => {
        setAlbumName(response.data.album_name);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .get(`http://localhost:5000/get/photo/album/${albumId}`)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [albumId]);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Link to={"/profile"} className="text-dark">
            <FaArrowLeft />
          </Link>
          <h3>{albumName}</h3>
        </div>

        <Link to={`/post/photo/${albumId}`} className="text-dark">
          <button className="btn btn-dark">+ Add Photo</button>
        </Link>
      </div>

      <Container className="d-flex gap-3">
        {photos.map((photo) => (
          <Card className="col-3" key={photo.id}>
            <Link to={`/photo/${photo.id}`}>
              <Ratio aspectRatio={"1x1"}>
                <Card.Img src={`http://localhost:5000/images/${photo.file_location.replace(/^.*[\\\/]/, "")}`} className="img-fluid object-fit-cover" />
              </Ratio>
            </Link>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
