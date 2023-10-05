import { TextField, Card, Typography, Button } from "@mui/material";
import { useState } from "react";

function Signup() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImagelink] = useState("");

  async function handleaddcourse() {
    const res = await fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    console.log(data);
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

export default Signup;
