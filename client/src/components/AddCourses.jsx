import { TextField, Card, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImagelink] = useState("");

  async function handleaddcourse() {
    await axios.post(
      "http://localhost:3000/admin/courses",
      {
        title,
        description,
        price,
        imageLink,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Card
          variant="outlined"
          style={{ padding: 20, marginTop: 50, width: 400 }}
        >
          <Typography style={{ textAlign: "center", fontWeight: "600" }}>
            Add Courses{" "}
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
            ></TextField>
          </div>
          <br />
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Image Link"
              onChange={(e) => setImagelink(e.target.value)}
            ></TextField>
          </div>
          <br />
          <Button variant="contained" onClick={handleaddcourse}>
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
