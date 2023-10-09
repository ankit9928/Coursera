import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface course {
  _id : string,
  title: string,
  description: string,
  imageLink: string,
  price: number,

}


function Courses() {
  const [courses, setCourses] = useState<course[]>([]);

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
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course:course ) => {
        return <Course key={course._id} course={course} />;
      })}
    </div>
  );
}

function Course(props:{course: course}) {
  const navigate = useNavigate();

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
      <img
        src={props.course.imageLink}
        style={{ width: 300, height: 300 }}
      ></img>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {" "}
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            navigate(`/courses/${props.course._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
