import { atom } from "recoil";

export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: {
      title: "",
      _id: "",
      description: "",
      price: 0,
      imageLink: "",
    },
  },
});
