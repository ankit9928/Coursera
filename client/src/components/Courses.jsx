/* eslint-disable react/prop-types */
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

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

  return (
    <div style={{ display: "flex" }}>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
}

function Course(props) {
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {props.course.description}
      </Typography>
      <img src={props.course.imageLink} style={{ width: 300 , height:300 }}></img>
    </Card>
  );
}

export default Courses;
