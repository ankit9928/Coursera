import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userLoadingstate = selector({
  key: "userLoadingstate",
  get: ({get}) => {
    const state = get(userState);
    return state.isLoading;
  },
});
