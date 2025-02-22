import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { setMangaList } from "./buyMangaSlice";
import { useFetchManga } from "./useFetchManga";
import { BASE_URL } from "../../utils/helpers";
import { FaStar } from "react-icons/fa6";
import Page from "./Page";
import { Link } from "react-router";

export default function MangaList(): JSX.Element {
  const mangaList = useSelector((state: RootState) => state.buyManga.mangaList);
  const sortPar = useSelector((state: RootState) => state.buyManga.sortPar);
  const pages = useSelector((state: RootState) => state.buyManga.pages);
  const dispatch = useDispatch();

  const { fetchMangaByParams } = useFetchManga();

  useEffect(() => {
    fetchMangaByParams(1).then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      dispatch(setMangaList(data));
    });
  }, [dispatch, sortPar]);

  return (
    <section>
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-8">
        {mangaList.map((el) => (
          <Link to={`/manga/${el.documentId}`} key={el.id}>
            <li className="flex flex-col items-center text-stone-50">
              <img
                className="h-[225px] w-[150px] rounded-2xl lg:h-[300px] lg:w-[200px]"
                src={`${BASE_URL}${el.Cover.url}`}
                alt=""
              />
              <h4 className="max-w-[150px] truncate text-lg font-bold lg:max-w-[200px]">
                {el.Title}
              </h4>
              <div className="flex gap-2">
                {el.production.Title}
                <span className="flex items-center gap-1">
                  <FaStar />
                  {el.Rating}
                </span>
              </div>
              <span className="text-stone-50/75">{el.Price}$</span>
            </li>
          </Link>
        ))}
      </ul>
      <ul className="mt-8 flex items-center justify-center gap-4">
        {pages > 1 &&
          Array.from({ length: pages }, (_, i) => (
            <Page key={i} page={i + 1} />
          ))}
      </ul>
    </section>
  );
}
