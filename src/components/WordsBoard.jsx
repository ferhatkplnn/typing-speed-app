import React from "react";
import PropTypes from "prop-types";
import { typingSelectors } from "../redux/typing/typingSlice";
import { useSelector } from "react-redux";
import Word from "./Word";

const WordsBoard = React.memo(({ nodeRef }) => {
  const wordsIds = useSelector(typingSelectors.selectIds);

  return (
    <>
      <div className="h-24 overflow-hidden px-2 bg-white rounded-sm select-none text-justify">
        {wordsIds.map((id) => (
          <Word key={id} id={id} nodeRef={nodeRef} />
        ))}
      </div>
    </>
  );
});

WordsBoard.propTypes = {
  nodeRef: PropTypes.object.isRequired,
};
WordsBoard.displayName = "wordsBoard";

export default WordsBoard;
