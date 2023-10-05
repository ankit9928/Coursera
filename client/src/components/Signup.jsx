import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("ankit ");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log("ankitmeena");
    localStorage.setItem("token", data.token);
    window.location = "/";
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ marginTop: 200 }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Typography textAlign={"center"}> Welcome to Coursera</Typography>
          <Typography style={{ fontWeight: 600, paddingLeft: 2 }}>
            Sign up
          </Typography>
          <br />
          <br />
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Email or Phone"
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
          </div>
          <br />
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </div>
          <br />
          <div>
            <Button variant="contained" onClick={handleSignup}>
              Signup
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
