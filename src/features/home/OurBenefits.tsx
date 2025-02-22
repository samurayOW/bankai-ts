import Heading from "../../ui/Heading";
import { FaBook, FaBox } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";

interface BenefitsProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const benefitsList: BenefitsProps[] = [
  {
    icon: <FaBook />,
    title: "Large Assortiment",
    description: "Fresh new releases and hard-to-find titles always in stock",
  },
  {
    icon: <FaBox />,
    title: "Fast & Free Shipping",
    description: "Free shipping and an expedited delivery option",
  },
  {
    icon: <MdAddCall />,
    title: "24/7 Support",
    description:
      "Answers to any business related inquiry 24/7 and in real-time",
  },
];

function BenefitsList(): JSX.Element {
  return (
    <ul className="flex flex-wrap items-center  justify-center gap-8 lg:gap-16">
      {benefitsList.map((el, index) => (
        <li
          key={index}
          className="flex w-[200px] flex-col items-center justify-center gap-4"
        >
          <div className="rounded-full bg-rose-200 p-[20px] text-3xl">
            {el.icon}
          </div>
          <h3 className="text-lg text-stone-50">{el.title}</h3>
          <p className="text-center text-sm text-stone-50/75">
            {el.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function OurBenefits(): JSX.Element {
  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <div className="flex flex-col items-center justify-center gap-8">
        <Heading
          title="Our Benefits"
          description="Order now and appreciate the magic of asian culture"
        />
        <BenefitsList />
      </div>
    </section>
  );
}
