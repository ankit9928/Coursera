/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";
// import coursestate from "../../Store/recoil";
// import { useSetRecoilState } from "recoil";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { courseState } from "../store/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isCourseLoading, courseTitle } from "../store/selectors/course";

function Course() {
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        `http://localhost:3000/admin/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data;

      if (data.course) {
        setCourse({
          isLoading: false,
          course: data.course,
        });
      } else {
        setCourse({
          isLoading: false,
          course: null,
        });
      }
    };
    fetchdata();
  });

  if (courseLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div style={{ marginTop: 20 }}>

      <Topper/>;
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          {" "}
          <UpdateCard/>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );

  function Topper() {

    const title = useRecoilValue(courseTitle);

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
