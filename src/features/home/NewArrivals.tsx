import LinkBtn from "../../ui/LinkBtn";
import { useDispatch, useSelector } from "react-redux";
import { setNewArrivalsList } from "./homeSlice";
import { useEffect } from "react";
import type { RootState } from "../../store";
import { fetchManga } from "../../utils/helpers";
import NewArrivalsList from "./NewArrivalsList";
import Heading from "../../ui/Heading";

export default function NewArrivals(): JSX.Element {
  const newArrivalsList = useSelector(
    (state: RootState) => state.home.newArrivalsList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchManga().then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      const sortedData = data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3);

      dispatch(setNewArrivalsList(sortedData));
    });
  }, [dispatch]);

  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row-reverse lg:gap-10 xl:gap-20">
        <NewArrivalsList newArrivalsList={newArrivalsList} />
        <div className="flex max-w-[200px] flex-col gap-2">
          <Heading
            title="New Arrivals"
            description="Discover new manga every week, exclusively at our store"
            align="left"
          />
          <LinkBtn to="/buy-manga" name="See More" color="pink" />
        </div>
      </div>
    </section>
  );
}
