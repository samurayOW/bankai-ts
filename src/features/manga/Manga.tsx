// test id: pmodjahcgvpj9f06598hwa3v

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL, fetchMangaById } from "../../utils/helpers";
import { setManga } from "./mangaSlice";
import { RootState } from "../../store";
import { FaAngleDown, FaAngleUp, FaStar } from "react-icons/fa6";
import Details from "./Details";
import MangaButtons from "./MangaButtons";

export default function Manga(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const manga = useSelector((state: RootState) => state.manga.manga);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchMangaById(id)
      .then((data) => {
        if (data) {
          dispatch(setManga(data));
        } else {
          console.error("Manga not found");
        }
      })
      .catch((error) => console.error("Error fetching manga:", error));
  }, [id, dispatch]);

  if (!manga) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center bg-[var(--color-app-inner-bg)]">
      <div className="md:grid-rows-[auto, auto] md:grid-cols-[auto, auto] flex w-full max-w-[900px] flex-col items-center p-4 md:grid md:gap-x-8 md:p-8">
        <div className="flex flex-col items-center md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2">
          <img
            className="w-[250px] rounded-2xl"
            src={`${BASE_URL}${manga?.Cover.url}`}
            alt="cover"
          />
          <div className="mt-4 flex items-center justify-center gap-4">
            <h3 className="max-w-[250px] text-left text-2xl font-bold text-stone-50">
              {manga?.Title}
            </h3>
            <span className="flex items-center gap-1 text-xl text-amber-300">
              <FaStar />
              {manga?.Rating}
            </span>
          </div>
          <span className="text-xl font-bold text-stone-200">
            {manga?.Price}$
          </span>
          <MangaButtons manga={manga} />
        </div>
        <div className="mt-4 w-full md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 md:mt-0">
          <div className="flex gap-3 text-2xl text-stone-50">
            Description
            <button
              className="md:hidden"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              {isDescriptionOpen ? <FaAngleDown /> : <FaAngleUp />}
            </button>
          </div>
          <p
            className={`${
              isDescriptionOpen ? "block" : "hidden"
            } mt-2 text-stone-50/75 md:block`}
          >
            {manga?.Description}
          </p>
        </div>
        <div className="w-full md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3">
          <Details manga={manga} />
        </div>
      </div>
    </div>
  );
}
