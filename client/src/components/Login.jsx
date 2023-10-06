import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const  handleLogin = async () => {

    const res = await axios.post("http://localhost:3000/admin/login",null, {
      headers: {
        username: email,
        password: Password,
      },
    });

    const data = res.data;
    console.log("assssss")
    localStorage.setItem("token", data.token);
    window.location = "/";
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ marginTop: 200 }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Typography textAlign={"center"}>Welocme back to Coursera</Typography>
          <Typography style={{ fontWeight: 600, paddingLeft: 2 }}>
            Login
          </Typography>
          <br />
          <br />
          <div>
            <TextField
              fullWidth
              variant="outlined"
              label="Email or Phone"
              onChange={(e) => setEmail(e.target.value)}
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
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
