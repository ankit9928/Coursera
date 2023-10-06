/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";
// import coursestate from "../../Store/recoil";
// import { useSetRecoilState } from "recoil";
import axios from "axios";

function Course() {
  const [courses, setCourses] = useState([]); // we did state managment like this before now we use the recoil for SM in react

  // const setcourses = useSetRecoilState(coursestate);

  const { courseId } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:3000/admin/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data;
      setCourses(data.courses);
    };
    fetchdata();
  });

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id == courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Loading.........</div>;
  }

  return (
    <div style={{ display: "flex", marginTop: 100 }}>
      <div style={{ marginLeft: 200 }}>
        <CourseCard courseId={courseId} course={course} />
      </div>

      <div style={{ paddingLeft: 200 }}>
        {" "}
        <UpdateCard course={course} />
      </div>
    </div>
  );
}

export default Course;
