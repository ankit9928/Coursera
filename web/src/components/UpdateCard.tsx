import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { courseState } from "../store/atoms/course";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";



function UpdateCard() {
  const navigate = useNavigate();

  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course.title);

  const [description, setDescription] = useState(
    courseDetails.course.description
  );

  const [price, setPrice] = useState(courseDetails.course.price);
  const [imageLink, setImagelink] = useState(courseDetails.course.imageLink);

  async function handleUpdatecourse() {
    // eslint-disable-next-line no-unused-vars

    await axios.put(
      "http://localhost:3000/admin/courses/" + courseDetails.course._id,
      {
        title,
        description,
        price,
        imageLink,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const  updatedcourse = {
      _id: courseDetails.course._id,
      title,
      description,
      price,
      imageLink,
    };

    setCourse({
      course: updatedcourse,
      isLoading: false,
    });
  }

  async function handleDeleteCourse() {
    await axios.delete(
      "http://localhost:3000/admin/course/" + courseDetails.course._id,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate("/courses");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{ padding: 20, marginTop: 200, width: 500 }}
      >
        <Typography style={{ textAlign: "center", fontWeight: "600" }}>
          Update Course
        </Typography>
        <br />

        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          ></TextField>
        </div>
        <br />
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          ></TextField>
        </div>
        <br />
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Price"
            onChange={(e) => {
              setPrice(parseFloat(e.target.value));
            }}
            value={price}
          ></TextField>
        </div>
        <br />
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Image Link"
            onChange={(e) => setImagelink(e.target.value)}
            value={imageLink}
          ></TextField>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={handleUpdatecourse}>
            Update Course
          </Button>
          <Button onClick={handleDeleteCourse}>Delete</Button>
        </div>
      </Card>
    </div>
  );
}

export default UpdateCard;
