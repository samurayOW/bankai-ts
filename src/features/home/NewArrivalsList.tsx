import { Manga } from "../../utils/interfaces";
import { BASE_URL } from "../../utils/helpers";
import { Link } from "react-router";

export default function NewArrivalsList({
  newArrivalsList,
}: {
  newArrivalsList: Manga[];
}): JSX.Element {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
      {newArrivalsList.map((el) => (
        <Link to={`/manga/${el.documentId}`} key={el.id}>
          <li className="flex flex-col items-center justify-center">
            <img
              className="h-[225px] w-[150px] rounded-2xl lg:h-[300px] lg:w-[200px]"
              src={`${BASE_URL}${el.Cover.url}`}
              alt=""
            />
            <p className="mt-4 max-w-[180px] truncate text-lg text-stone-50">
              {el.Title}
            </p>
            <span className="text-stone-50/85 text-lg">{el.Price}$</span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
