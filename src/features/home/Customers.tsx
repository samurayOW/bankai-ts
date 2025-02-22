import { Carousel } from "nuka-carousel";
import FeedbackCard from "./Feedback";
import { useEffect } from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setFeedbacksList } from "./homeSlice";
import { fetchFeedbacks } from "../../utils/helpers";

export default function Customers(): JSX.Element {
  const feedbacksList = useSelector(
    (state: RootState) => state.home.feedbacksList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFeedbacks().then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      dispatch(setFeedbacksList(sortedData));
    });
  }, [dispatch]);

  return (
    <section className="section-padding flex flex-col items-start bg-[var(--color-app-inner-bg)]">
      <h2 className="self-start text-3xl font-bold text-stone-50 lg:text-5xl">
        What customers say about <br />{" "}
        <span className="font-heading">BANKAI?</span>
      </h2>
      <div className="mx-auto mt-8 max-w-[310px] sm:max-w-[620px] lg:max-w-[940px]">
        <Carousel
          autoplay={true}
          autoplayInterval={3000}
          showDots={true}
          scrollDistance={314}
          wrapMode="wrap"
          // showArrows={true}
        >
          <div className="flex gap-4">
            {feedbacksList.map((card) => (
              <FeedbackCard key={card.Name} {...card} />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
