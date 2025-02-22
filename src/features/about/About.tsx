import Heading from "../../ui/Heading";
import OurMission from "./OurMission";
import OurPartners from "./OurPartners";
import OurServices from "./OurServices";

export default function About() {
  return (
    <div className="section-padding bg-[var(--color-app-inner-bg)]">
      <Heading
        title="About Us"
        description="Dive into the world of manga with us!"
        align="left"
      />
      <OurMission />
      <OurPartners />
      <OurServices />
    </div>
  );
}
