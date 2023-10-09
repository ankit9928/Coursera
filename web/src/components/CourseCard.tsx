import { Card, Typography } from "@mui/material";
import {
  courseImage,
  courseTitle,
  coursePrice,
} from "../store/selectors/course";
import { useRecoilValue } from "recoil";

function CourseCard() {
  const title = useRecoilValue(courseTitle);

  const imageLink = useRecoilValue(courseImage);

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <img src={imageLink} style={{ width: 300 }}></img>
      <div style={{ marginLeft: 10 }}>
        <Typography variant="h5"> {title} </Typography>
        <Price />
      </div>
    </Card>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);

  return (
    <div style={{ display: "flex" }}>
      <Typography variant="subtitle2" style={{ color: "gray", marginTop: 5 }}>
        Price
      </Typography>
      <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
        {" "}
        <b>${price}</b>
      </Typography>
    </div>
  );
}

export default CourseCard;
