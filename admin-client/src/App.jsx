import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddCourse from "./components/AddCourses";
import Courses from "./components/Courses";
import Course from "./components/Course";

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
          <Routes>
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/addcourse" element={<AddCourse />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
