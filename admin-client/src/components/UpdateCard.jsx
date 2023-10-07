/* eslint-disable react/prop-types */
import { Card, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function UpdateCard(props) {
   
  const course = props.course;

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [imageLink, setImagelink] = useState(course.imageLink);

  async function handleUpdatecourse() {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.put(
      "http://localhost:3000/admin/courses/" + course._id,
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
                setPrice(e.target.value);
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
          <Button variant="contained" onClick={handleUpdatecourse}>
            Update Course
          </Button>
        </Card>
      
    </div>
  );
}

export default UpdateCard;
