import { configureStore } from "@reduxjs/toolkit";
import typingSlice from "./typing/typingSlice";

export const store = configureStore({
  reducer: {
    typing: typingSlice,
  },
});
