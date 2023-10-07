import { atom } from "recoil";

export const courseState = atom({
  key: "courseState",
  default: {
    title: "",
    description: "",
    price: 0,
    imageLink: "",
  },
});
