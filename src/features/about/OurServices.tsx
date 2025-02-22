import { FaNewspaper } from "react-icons/fa6";
import Heading from "../../ui/Heading";
import { FaVideo } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

interface Service {
  title: string;
  icon: JSX.Element;
  description: string;
}

const services: Service[] = [
  {
    title: "Video Reviews",
    icon: <FaVideo />,
    description:
      "Get an inside look at new releases, hidden gems, and must-read series with our expert reviews",
  },
  {
    title: "Latest News",
    icon: <FaNewspaper />,
    description:
      "Stay updated with industry news, upcoming releases, and exclusive announcements",
  },
  {
    title: "Community",
    icon: <HiUserGroup />,
    description:
      "Join discussions, share recommendations, and connect with fellow manga lovers!",
  },
];

export default function OurMission() {
  return (
    <section className="section-padding">
      <Heading
        title="Our Services"
        description="We’re more than just a manga store—we’re a hub for fans! "
      />
      <ul className="mt-8 flex flex-wrap justify-center gap-8 sm:gap-16">
        {services.map((el) => (
          <li
            key={el.title}
            className="max-w-60 rounded-4xl flex flex-col items-center gap-2 bg-rose-200 px-8 py-2"
          >
            <h3 className="text-xl">{el.title}</h3>
            <span className="text-2xl">{el.icon}</span>
            <p className="text-center">{el.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
