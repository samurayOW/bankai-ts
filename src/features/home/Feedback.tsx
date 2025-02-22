import { FaStar } from "react-icons/fa6";
import { Feedback } from "../../utils/interfaces";
import { BASE_URL } from "../../utils/helpers";

export default function FeedbackCard({
  Text,
  Name,
  CustomerStatus,
  Photo,
  Mark,
}: Feedback): JSX.Element {
  return (
    <div className="border-3 flex min-w-[300px] flex-col items-center justify-between rounded-lg border-solid border-rose-200 bg-rose-200/25 p-6 shadow-md">
      <p className="text-center italic text-stone-50">"{Text}"</p>
      <div className="mt-4 flex items-center">
        <img
          src={`${BASE_URL}${Photo.url}`}
          alt={Name}
          className="mr-3 h-12 w-12 rounded-full border-2 border-solid border-rose-200"
        />
        <div>
          <h3 className="text-lg font-bold text-pink-300">{Name}</h3>
          <p className="text-sm text-stone-50">{CustomerStatus}</p>
        </div>
        <span className="ml-3 flex items-center justify-center gap-2 text-xl font-bold text-pink-300">
          {Mark} <FaStar />
        </span>
      </div>
    </div>
  );
}
