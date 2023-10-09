import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import axios from "axios";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";

import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddCourse from "./components/AddCourses";
import Courses from "./components/Courses";
import Course from "./components/Course";
import Landing from "./components/Landing";
// import {userEmailState} from "./store/selectors/userEmail"
import { userState } from "./store/atoms/user";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >
      <RecoilRoot>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/" element={<Landing/>} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;

const InitUser = () => {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data;

      if (data.username) {
        setUser({
          userEmail: data.username,
          isLoading: false,
        });
      } else {
        setUser({
          userEmail: "",
          isLoading: false,
        });
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: "",
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
};
