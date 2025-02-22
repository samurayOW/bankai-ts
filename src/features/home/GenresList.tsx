import { Genre } from "../../utils/interfaces";
import { BASE_URL } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addGenre, clearFilters } from "../buyManga/buyMangaSlice";
import { Link } from "react-router";

export default function GenresList({
  genresList,
  up,
}: {
  genresList: Genre[];
  up: boolean;
}): JSX.Element {
  const dispatch = useDispatch();

  const handler = (id: string) => {
    dispatch(clearFilters());
    dispatch(addGenre(id));
  };

  return (
    <ul className="flex flex-wrap items-center justify-center gap-4 py-4 sm:gap-8">
      {genresList.map((el, index) => {
        const style: string = index !== 1 && up ? "lg:relative lg:-top-16" : "";

        return (
          <Link key={el.id} to="/buy-manga">
            <li
              onClick={() => handler(el.id)}
              className={`mt-4 flex flex-col items-center justify-center ${style}`}
            >
              <img
                className="h-[350px] w-[250px] rounded-3xl"
                src={`${BASE_URL}${el.Cover.url}`}
                alt=""
              />
              <h3 className="mt-4 text-2xl font-bold">{el.Title}</h3>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
