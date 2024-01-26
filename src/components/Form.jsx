import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  increaseCorrectCount,
  increaseWordIndex,
  increaseWrongCount,
  typingSelectors,
  updateWord,
  resetStates,
  changeTypingStatus,
} from "../redux/typing/typingSlice";
function Form({ nodeRef }) {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(20);
  const dispatch = useDispatch();

  const { wordIndex, typingStatus } = useSelector((state) => state.typing);
  const words = useSelector(typingSelectors.selectAll);
  const intervalIdRef = useRef(null);
  const firstWordRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      if (typingStatus === "starting" && timer > 0) {
        intervalIdRef.current = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        dispatch(changeTypingStatus("active"));
      }
    };

    const expirationTimer = () => {
      if (typingStatus === "active" && timer === 0) {
        clearInterval(intervalIdRef.current);
        dispatch(changeTypingStatus("idle"));
        setText("|");
      }
    };

    startTimer();
    expirationTimer();
  }, [timer, typingStatus, dispatch]);

  useEffect(() => {
    const wordId = words[wordIndex].id;
    dispatch(updateWord({ id: wordId, changes: { status: "ready" } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const wordId = words[wordIndex]?.id;
    const node = nodeRef.current.get(wordId);

    node?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });

    if (!words[wordIndex].word.startsWith(text)) {
      dispatch(
        updateWord({
          id: wordId,
          changes: {
            status: "ready-wrong",
          },
        })
      );
    } else {
      dispatch(
        updateWord({
          id: wordId,
          changes: {
            status: "ready",
          },
        })
      );
    }

    if (text && text.endsWith(" ")) {
      if (text === words[wordIndex].word + " ") {
        dispatch(updateWord({ id: wordId, changes: { status: "correct" } }));
        dispatch(increaseCorrectCount());
      } else {
        dispatch(updateWord({ id: wordId, changes: { status: "wrong" } }));
        dispatch(increaseWrongCount());
      }

      dispatch(increaseWordIndex());
      dispatch(
        updateWord({
          id: words[wordIndex + 1]?.id,
          changes: { status: "ready" },
        })
      );
      setText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, dispatch, nodeRef]);

  const resetTyping = () => {
    dispatch(resetStates());
    clearInterval(intervalIdRef.current);
    setText("");
    setTimer(20);

    firstWordRef.current = nodeRef.current.get(words[0]?.id);
    firstWordRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  };

  const handleInputChange = (e) => {
    if (typingStatus === "idle") return;

    if (typingStatus === "ready") {
      dispatch(changeTypingStatus("starting"));
    }

    setText(e.target.value);
  };

  return (
    <>
      <div className="flex h-12 space-x-2 bg-sky-300/70 p-1 rounded-sm w-full md:justify-center">
        <input
          value={text}
          onChange={handleInputChange}
          type="text"
          className="rounded-sm p-2 w-full md:w-96"
        />
        <button className=" bg-blue-900 text-white px-4 rounded-sm min-w-14 ">
          {timer}
        </button>
        <button
          onClick={resetTyping}
          className="bg-blue-600 text-white px-4 rounded-sm hover:bg-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
Form.propTypes = {
  nodeRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};
export default Form;
