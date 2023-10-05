import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userenmail, setUseremail] = useState(null);

  useEffect(() => {
    const fetchme = async () => {
      const res = await fetch("http://localhost:3000/admin/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setUseremail(data.username);
    };

    fetchme();
  }, []);

  if (userenmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" >Coursera</Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{marginRight:20 , marginTop:10}}>
            <Typography>{userenmail}</Typography>
          </div>

          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location="/"
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
