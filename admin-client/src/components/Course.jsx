/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";
// import coursestate from "../../Store/recoil";
// import { useSetRecoilState } from "recoil";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

function Course() {
  const [courses, setCourses] = useState([]);

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
    <div style={{marginTop:20}}>
      <Topper title={course.title} />;
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          {" "}
          <UpdateCard course={course} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard courseId={courseId} course={course} />
        </Grid>
      </Grid>
    </div>
  );

  function Topper({ title }) {
    return (
      <div
        style={{
          height: 250,
          background: "#212121",
          top: 0,
          width: "100vw",
          zIndex: 0,
          marginBottom: -250,
        }}
      >
        <div
          style={{
            height: 250,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <Typography
              style={{ color: "white", fontWeight: 600 }}
              variant="h3"
              textAlign={"center"}
            >
              {title}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
