import { useSelector } from "react-redux";
import { useRef } from "react";
import Form from "./components/Form";
import ResultCard from "./components/ResultCard";
import WordsBoard from "./components/WordsBoard";

function App() {
  const nodeRef = useRef(new Map());
  const { typingStatus } = useSelector((state) => state.typing);

  return (
    <>
      <header>
        <h1 className="font-bold text-4xl text-center p-16 text-slate-600">
          Typing Test
        </h1>
      </header>
      <div className="flex flex-col mx-auto items-center w-11/12 md:w-1/2  space-y-2">
        <WordsBoard nodeRef={nodeRef} />
        <Form nodeRef={nodeRef} />
        {typingStatus === "idle" && <ResultCard />}
      </div>
    </>
  );
}

export default App;
