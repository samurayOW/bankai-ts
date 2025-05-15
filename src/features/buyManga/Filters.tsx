import { useSelector } from "react-redux";
import GenresFilters from "./GenresFilters";
import PriceRange from "./PriceRange";
import ProductionFilters from "./ProductionFilters";
import { IoClose } from "react-icons/io5";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setMangaList, toggleFilter } from "./buyMangaSlice";
import { useFetchManga } from "./useFetchManga";

export default function Filters(): JSX.Element {
  const isOpen = useSelector((state: RootState) => state.buyManga.isOpen);
  const dispatch = useDispatch();
  const { fetchMangaByParams } = useFetchManga();

  function findHandler() {
    fetchMangaByParams(1).then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      dispatch(setMangaList(data));
      dispatch(toggleFilter());
    });
  }

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 z-999 flex items-center justify-center bg-black/50 p-4`}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-wrap justify-center gap-16 overflow-y-auto rounded-xl bg-[var(--color-app-inner-bg)] p-10 shadow-lg sm:overflow-x-hidden">
        <button
          className="absolute left-3 top-3 text-4xl text-stone-50"
          onClick={() => dispatch(toggleFilter())}
        >
          <IoClose />
        </button>
        <div className="mt-12 flex gap-16">
          <GenresFilters />
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-baseline sm:gap-16">
            <ProductionFilters />
            <PriceRange />
          </div>
        </div>

        <button
          className="rounded-xl bg-rose-200 px-8 py-2 text-xl"
          onClick={findHandler}
        >
          Find
        </button>
      </div>
    </div>
  );
}
