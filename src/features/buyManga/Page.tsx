import { useDispatch, useSelector } from "react-redux";
import { useFetchManga } from "./useFetchManga";
import { setCurrentPage, setMangaList } from "./buyMangaSlice";
import { RootState } from "../../store";

export default function Page({ page }: { page: number }) {
  const dispatch = useDispatch();
  const { fetchMangaByParams } = useFetchManga();
  const currentPage = useSelector(
    (state: RootState) => state.buyManga.currentPage
  );

  async function handler() {
    try {
      const data = await fetchMangaByParams(page);
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }
      dispatch(setMangaList(data));
      dispatch(setCurrentPage(page));
    } catch (error) {
      console.error("Ошибка загрузки манги:", error);
    }
  }

  return (
    <li>
      <button
        className={`rounded-xl border-2 border-solid border-stone-50 px-3 py-1 font-bold ${
          currentPage === page ? "bg-stone-50" : "text-stone-50"
        }`}
        onClick={handler}
      >
        {page}
      </button>
    </li>
  );
}
