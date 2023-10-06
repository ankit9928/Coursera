import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Appbar() {
  const navigate = useNavigate();
  const [useremail, setUseremail] = useState(null);

  useEffect(() => {
    const fetchme = async () => {
      const res = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data;
      setUseremail(data.username);
    };

    fetchme();
  }, []);

  if (useremail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" style={{ marginLeft: 10 }}>
          Coursera
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginRight: 20, marginTop: 10 }}>
            <Typography>{useremail}</Typography>
          </div>

          <Button
            variant="contained"
            style={{ marginRight: 20, marginBottom: 10 }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/";
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">Coursera</Typography>
      <div>
        <Button
          variant="contained"
          style={{ marginRight: 20 }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Signin
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
