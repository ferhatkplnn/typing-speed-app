import PropTypes from "prop-types";
import { typingSelectors } from "../redux/typing/typingSlice";
import { useSelector } from "react-redux";

function Word({ id, nodeRef }) {
  const { word, status } = useSelector((state) =>
    typingSelectors.selectById(state, id)
  );

  let wordClass = "";

  switch (status) {
    case "correct":
      wordClass = "correct";
      break;

    case "wrong":
      wordClass = "wrong";
      break;

    case "ready":
      wordClass = "ready";
      break;
    case "ready-wrong":
      wordClass = "ready-wrong";
      break;

    default:
      break;
  }

  return (
    <>
      <span
        className="h-12 inline-block "
        ref={(node) => {
          nodeRef.current.set(id, node);
        }}
      >
        <span
          className={`text-xl font-medium tracking-wide leading-loose ${wordClass}`}
          key={id}
        >
          {word}
        </span>
      </span>{" "}
    </>
  );
}

Word.propTypes = {
  id: PropTypes.string.isRequired,
  // word: PropTypes.string.isRequired,
  // status: PropTypes.oneOf(["correct", "wrong", "ready", "ready-wrong", "idle"])
  // .isRequired,
  nodeRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
};
export default Word;
