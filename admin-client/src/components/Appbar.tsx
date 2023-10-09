import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userState } from "../store/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userLoadingstate } from "../store/selectors/isuserLoaing";
import { userEmailState } from "../store/selectors/userEmail";

function Appbar() {
  const navigate = useNavigate();

  const setUser = useSetRecoilState(userState);
  const isLoading = useRecoilValue(userLoadingstate);
  const useremail = useRecoilValue(userEmailState);

  if (isLoading) {
    return <div>Loading........</div>;
  }

  if (useremail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginLeft: 10, marginTop: 5 }}>
          <Typography variant="h5">Coursera</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 10,
          }}
        >
          <div style={{ marginRight: 10, marginTop: 10 }}>
            <Button
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              Add course
            </Button>
          </div>

          <div style={{ marginRight: 10, marginTop: 10 }}>
            <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </div>

          <div style={{ marginRight: 10, marginTop: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.removeItem("token");
                setUser({
                  userEmail: null,
                  isLoading: false,
                });
                navigate("/");
              }}
            >
              Log Out
            </Button>
          </div>
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
      <div style={{ marginLeft: 10, marginTop: 5 }}>
        <Typography variant="h5">Coursera</Typography>
      </div>

      <div style={{ display: "flex", marginRight: 20 }}>
        <div style={{ marginRight: 10, marginTop: 10 }}>
          <Button
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </div>
        <div style={{ marginTop: 10 }}>
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
    </div>
  );
}

export default Appbar;
