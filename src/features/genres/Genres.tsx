import { useEffect } from "react";
import Heading from "../../ui/Heading";
import { fetchGenres } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setGenresList } from "../home/homeSlice";
import GenresList from "../home/GenresList";

export default function Genres(): JSX.Element {
  const genresList = useSelector((state: RootState) => state.home.genresList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGenres().then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      dispatch(setGenresList(data));
    });
  }, [dispatch]);

  return (
    <section className="bg-[var(--color-app-inner-bg)] pt-8 lg:pt-16">
      <Heading
        title="All categories"
        description="Find what you are looking for"
      />
      <div className="mt-4 bg-rose-200 px-8 pb-8 lg:mt-8 lg:px-16 lg:pb-16">
        <GenresList genresList={genresList} up={false} />
      </div>
    </section>
  );
}
