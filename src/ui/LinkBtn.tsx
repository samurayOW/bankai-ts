import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

interface LinkBtnProps {
  to: string;
  name: string;
  color: string;
}

export default function LinkBtn({
  to,
  name,
  color,
}: LinkBtnProps): JSX.Element {
  let style: string;

  switch (color) {
    case "pink":
      style = "bg-rose-200 text-stone-950";
      break;
    case "dark":
      style = "bg-stone-950 text-stone-50";
      break;
  }

  return (
    <Link to={to}>
      <div
        className={`${style} flex w-[130px] items-center justify-center gap-6 rounded-xl p-4`}
      >
        <p>{name}</p> <FaLongArrowAltRight />
      </div>
    </Link>
  );
}
