import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getWords } from "../../utils/utils";

export const typingAdapter = createEntityAdapter();
const initialData = typingAdapter.getInitialState({
  wordIndex: 0,
  count: {
    wrong: 0,
    correct: 0,
  },
  typingStatus: "ready",
  timer: 20,
});

const initialState = typingAdapter.upsertMany(initialData, getWords());

export const typingSlice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    increaseWordIndex: (state) => {
      state.wordIndex += 1;
    },
    updateWord: typingAdapter.updateOne,
    startToggle: (state) => {
      state.isStart = !state.isStart;
    },
    increaseWrongCount: (state) => {
      state.count.wrong += 1;
    },
    increaseCorrectCount: (state) => {
      state.count.correct += 1;
    },
    resetStates: () => {
      return initialState;
    },
    changeTypingStatus: (state, aciton) => {
      state.typingStatus = aciton.payload;
    },
    decreaseTimer: (state) => {
      state.timer -= 1;
    },
  },
});

export const typingSelectors = typingAdapter.getSelectors(
  (state) => state.typing
);

export const {
  increaseWordIndex,
  updateWord,
  increaseWrongCount,
  increaseCorrectCount,
  resetStates,
  changeTypingStatus,
  decreaseTimer,
} = typingSlice.actions;
export default typingSlice.reducer;
