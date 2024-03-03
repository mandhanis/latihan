import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Ratio from "react-bootstrap/Ratio";
import { FaHeart, FaRegHeart, FaRegComment, FaEdit, FaTrash } from "react-icons/fa";
import Img from "../assets/images/img.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default function Photo() {
  const [photoData, setPhotoData] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loginId, setLoginId] = useState(null);
  const [isOwner, setOwner] = useState(false)
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { photoId } = useParams();
  const Count = comments.length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setLoginId(decode.userId);
    }else{
      window.location.href = "/login"
    }

  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/photo/${photoId}`)
      .then((response) => {
        setPhotoData(response.data);
        setOwner(response.data.user_id === loginId);

      })
      .catch((error) => {
        console.log("error", error);
      });

  }, [photoId, loginId, isOwner]);

  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/comment/${photoId}`)
      .then((response) => {
        setComments(response.data);

      });
  }, [photoId, loginId]);

  const handleComment = (event) => {
    event.preventDefault();
    const response = axios
      .post(`http://localhost:5000/post/comment`, {
        photo_id: photoId,
        user_id: loginId,
        comment: commentText,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleDelete = () => {
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
        axios.delete(`http://localhost:5000/del/photo/${photoId}`)
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        ).then((res) => {
          window.history.back();
        })
      }
    });
  }

  const handleCommentDelete = (commentId) => {
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
        axios.delete(`http://localhost:5000/del/comment/${commentId}`)
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        ).then((res) => {
          window.location.reload();
        })
      }
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/like/${photoId}`)
      .then((response) => {
        setLikeCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching like count:", error);
      });

    if (loginId) {
      axios
        .get(`http://localhost:5000/check/like/${photoId}/${loginId}`)
        .then((response) => {
          setIsLiked(response.data.liked);
        })
        .catch((error) => {
          console.error("Error checking if liked:", error);
        });
    }
  }, [photoId, loginId]);

  const handleLike = () => {
    if (!loginId) {
      console.log("Please login to like photos");
      return;
    }

    if (isLiked) {
      axios
      .delete(`http://localhost:5000/del/like/${photoId}/${loginId}`)
        .then(() => {
          setLikeCount((prevCount) => prevCount - 1);
          setIsLiked(false);
        })
        .catch((error) => {
          console.error("Error unliking photo:", error);
        });
    } else {
      axios
        .post(`http://localhost:5000/post/like/${photoId}`, {
          user_id: loginId,
        })
        .then(() => {
          setLikeCount((prevCount) => prevCount + 1);
          setIsLiked(true);
        })
        .catch((error) => {
          console.error("Error liking photo:", error);
        });
    }
  };


  return (
    <Container className="d-flex flex-column mt-3 col-5 gap-3">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">@{photoData.username}</h6>
          {isOwner && (
          <div className="d-flex gap-3 align-items-center">
            <Link to={`/photo/edit/${photoId}`}>
            <button className="btn border-0 p-0">
            <FaEdit />
            </button>
            </Link>
            <button className="btn border-0 p-0" onClick={handleDelete}>
            <FaTrash />
            </button>
          </div>
          )}
        </Card.Header>
          <Link to={`http://localhost:5000/images/${photoData.file_location?.replace(
                /^.*[\\\/]/,
                ""
              )}`} target="_blank">
        <Ratio aspectRatio="1x1">
            <Card.Img
              src={`http://localhost:5000/images/${photoData.file_location?.replace(
                /^.*[\\\/]/,
                ""
              )}`}
              className="img-fluid object-fit-cover"
            />
        </Ratio>
          </Link>
        <Card.Body>
          <Card.Text className="fw-bold">{photoData.title}</Card.Text>
          <Card.Text>{photoData.caption}</Card.Text>
        </Card.Body>
        <Card.Body className="d-flex gap-3">
          <div className="d-flex gap-2 align-items-center">
          {isLiked ? (
              <FaHeart
                color="red"
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              />
            )}
            <p className="mb-1">{likeCount} Likes</p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <button className="btn border-0 p-0">
              <FaRegComment />
            </button>

            <p className="mb-0">{Count} Comment</p>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <form onSubmit={handleComment}>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn btn-dark">
                post
              </button>
            </div>
          </form>
        </Card.Body>
        {comments.map((comment) => (
          <Card.Body
            className="d-flex gap-2 my-0 py-0 justify-content-between"
            key={comment.id}
          >
            <div className="d-flex gap-2">
              <Card.Text className="fw-bold">@{comment.username}</Card.Text>
              <Card.Text>{comment.comment}</Card.Text>
            </div>
            <div className="d-flex gap-3 align-items-center">
              {(isOwner || comment.user_id === loginId) && (
                <button className="btn border-0 p-0" onClick={() => handleCommentDelete(comment.id)}>
                  <FaTrash />
                </button>
              )}
            </div>
          </Card.Body>
        ))}
      </Card>
    </Container>
  );
}
