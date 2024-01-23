import PropTypes from "prop-types";
import { typingSelectors } from "../redux/typing/typingSlice";
import { useSelector } from "react-redux";
import Word from "./Word";
function WordsBoard({ nodeRef }) {
  const words = useSelector(typingSelectors.selectAll);

  return (
    <>
      <div className=" h-24  overflow-hidden px-2  bg-white rounded-sm select-none text-justify">
        {words.map(({ id, word, status }) => (
          <Word
            key={id}
            id={id}
            word={word}
            status={status}
            nodeRef={nodeRef}
          />
        ))}
      </div>
    </>
  );
}
WordsBoard.propTypes = {
  nodeRef: PropTypes.object.isRequired,
};

export default WordsBoard;
