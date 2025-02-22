import { useEffect } from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../../utils/helpers";
import { addGenre, setGenres, toggleGenres } from "./buyMangaSlice";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./filters.css";

export default function GenresFilters(): JSX.Element {
  const { toggle, filters, chosenFilters } = useSelector(
    (state: RootState) => state.buyManga
  );
  const genres = filters.genres;
  const chosenGenres = chosenFilters.genres;
  const isGenresOpen = toggle.isGenresOpen;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGenres().then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      dispatch(setGenres(data));
    });
  }, [dispatch]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 text-2xl text-stone-50">
        <h3>Genre</h3>
        <button onClick={() => dispatch(toggleGenres())}>
          {isGenresOpen ? <FaAngleDown /> : <FaAngleUp />}
        </button>
      </div>
      <ul className={isGenresOpen ? "block" : "hidden"}>
        {genres.map((genre) => (
          <li
            key={genre.id}
            className="bankai__sidebar-filter_item flex items-center gap-2 text-stone-50"
          >
            <input
              type="checkbox"
              name={genre.Title}
              id={`checkbox-${genre.id}`}
              onChange={() => dispatch(addGenre(genre.id))}
              checked={chosenGenres.includes(genre.id)}
            />
            <label htmlFor={`checkbox-${genre.id}`}>
              <span>{genre.Title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
