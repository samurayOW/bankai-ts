import mission from "../../assets/mission.jpg";
import Heading from "../../ui/Heading";

export default function OurMission() {
  return (
    <section className="section-padding">
      <Heading title="Our Mission" description="" />
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:mt-8 sm:gap-16 lg:flex-row">
        <p className="max-w-[600px] text-stone-50/75 md:text-xl">
          At our store, we believe that manga is more than just stories—it’s a
          gateway to new worlds, emotions, and unforgettable adventures. Our
          mission is to make manga accessible to everyone, offering a carefully
          curated selection of classics, the latest releases, and rare editions
          at fair prices. Whether you're a longtime fan or just starting your
          journey, we're here to help you find the perfect volumes to complete
          your collection. Dive into the world of manga with us!
        </p>
        <img className="w-[300px] sm:w-[400px]" src={mission} alt="" />
      </div>
    </section>
  );
}
