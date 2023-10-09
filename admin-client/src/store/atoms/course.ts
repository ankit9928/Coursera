import { atom } from "recoil";

export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: null
    // title: "",
    // description: "",
    // price: 0,
    // imageLink: "",
  },
});
