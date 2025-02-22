import { useEffect } from "react";
import Heading from "../../ui/Heading";
import { fetchGenres } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setGenresList } from "./homeSlice";
import GenresList from "./GenresList";
import LinkBtn from "../../ui/LinkBtn";

export default function Genres(): JSX.Element {
  const genresList = useSelector((state: RootState) => state.home.genresList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGenres().then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      dispatch(setGenresList(data.slice(0, 3)));
    });
  }, [dispatch]);

  return (
    <section className="bg-[var(--color-app-inner-bg)] pt-8 lg:pt-16">
      <Heading title="Categories" description="Find what you are looking for" />
      <div className="mt-4 bg-rose-200 px-8 pb-8 lg:mt-8 lg:px-16 lg:pb-16">
        <GenresList genresList={genresList} up={true} />
        <div className="mt-8 flex flex-col items-center justify-center">
          <p className="mb-4 text-center">
            Discover your next favorite story: browse our genres
          </p>
          <LinkBtn to="/genres" name="Explore" color="dark" />
        </div>
      </div>
    </section>
  );
}
