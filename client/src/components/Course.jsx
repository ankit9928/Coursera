/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";

function Course() {
  const [courses, setCourses] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("http://localhost:3000/admin/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setCourses(data.courses);
    };
    fetchdata();
  }, []);

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
        <CourseCard course={course} />
      </div>

      <div style={{ paddingLeft: 200 }}>
        {" "}
        <UpdateCard course={course} />
      </div>
    </div>
  );
}

export default Course;
