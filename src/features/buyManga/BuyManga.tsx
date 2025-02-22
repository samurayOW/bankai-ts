import { FaFilter } from "react-icons/fa6";
import Filters from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setMangaList,
  setSortPar,
  toggleFilter,
} from "./buyMangaSlice";
import MangaList from "./MangaList";
import { useFetchManga } from "./useFetchManga";
import { useEffect } from "react";
import { RootState } from "../../store";
import { GiCancel } from "react-icons/gi";

export default function BuyManga(): JSX.Element {
  const dispatch = useDispatch();
  const { fetchMangaByParams } = useFetchManga();
  const chosenFilters = useSelector(
    (state: RootState) => state.buyManga.chosenFilters
  );

  function clearHandler() {
    dispatch(clearFilters());
  }

  useEffect(() => {
    fetchMangaByParams(1).then((data) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }
      dispatch(setMangaList(data));
    });
  }, [chosenFilters]);

  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-stone-50 lg:text-5xl">
          All manga
        </h1>
        <div className="mt-4 flex items-center justify-center">
          <label htmlFor="sort" className="mr-3 text-xl text-stone-50">
            Sort by:{" "}
          </label>
          <select
            name="sort"
            id="sort"
            className="rounded-xl bg-rose-200 p-2"
            onChange={(e) => dispatch(setSortPar(e.target.value))}
          >
            <option value="createdAt:desc">Newest arrivals</option>
            <option value="Price:asc">Price: Low to High</option>
            <option value="Price:desc">Price: High to Low</option>
          </select>
          <div className="flex gap-4">
            <button
              className="ml-4 flex items-center gap-1 rounded-xl bg-rose-200 p-2"
              onClick={() => dispatch(toggleFilter())}
            >
              <FaFilter /> Filter
            </button>
            <button
              className="rounded-xl border-2 border-solid border-stone-50 p-2 text-2xl text-stone-50 disabled:hidden"
              onClick={clearHandler}
              disabled={
                chosenFilters.genres.length === 0 &&
                chosenFilters.production.length === 0 &&
                chosenFilters.priceRange.every((v, i) => v === [0, 100][i])
              }
            >
              <GiCancel />
            </button>
          </div>
        </div>
      </div>
      <Filters />
      <MangaList />
    </section>
  );
}
