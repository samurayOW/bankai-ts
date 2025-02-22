import Heading from "../../ui/Heading";
import partners from "./partners";

export default function OurMission() {
  return (
    <section className="section-padding">
      <Heading
        title="Our Partners"
        description="We collaborate with leading publishers, distributors, and manga communities to bring you the best selection of authentic and high-quality manga."
      />
      <ul className="mt-8 flex flex-wrap justify-center gap-8 sm:gap-16">
        {partners.map((el) => (
          <img src={el} key={el} className="h-16 cursor-pointer" />
        ))}
      </ul>
    </section>
  );
}
