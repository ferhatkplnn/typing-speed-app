import { useSelector } from "react-redux";

function ResultCard() {
  const { wordIndex, count } = useSelector((state) => state.typing);
  return (
    <>
      <div className="pt-10 w-60 flex flex-col ">
        <div className="bg-green-700 text-white px-4 font-bold">Result</div>
        <div className="text-4xl font-bold text-green-700 text-center p-4 odd:bg-white even:bg-slate-100">
          {wordIndex * 3} WPM
        </div>
        <div className="flex justify-between px-4 odd:bg-white even:bg-slate-100">
          <span className="text-sm">Accuracy</span>{" "}
          <span>{((count.correct * 100) / wordIndex).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between px-4 odd:bg-white even:bg-slate-100">
          <span className="text-sm">Correct words</span>
          <span className="text-green-500">{count.correct}</span>
        </div>
        <div className="flex justify-between px-4 odd:bg-white even:bg-slate-100">
          <span className="text-sm">Wrong words</span>
          <span className="text-red-500">{count.wrong}</span>
        </div>
      </div>
    </>
  );
}

export default ResultCard;
