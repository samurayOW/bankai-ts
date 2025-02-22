import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import logo from "../assets/logo.png";

interface SocialLink {
  icon: JSX.Element;
  href: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaFacebookF />,
    href: "https://www.facebook.com",
    color: "hover:bg-blue-600",
  },
  {
    icon: <RiInstagramFill />,
    href: "https://www.instagram.com",
    color: "hover:bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  },
  {
    icon: <FaXTwitter />,
    href: "https://x.com/home",
    color: "hover:bg-gray-600",
  },
];

function SocialLinks(): JSX.Element {
  return (
    <ul className="flex gap-[30px]">
      {socialLinks.map((link) => (
        <li
          className={`rounded-full border-2 border-stone-50 p-2 outline-2 duration-300 ${link.color}`}
          key={link.href}
        >
          <a
            className="text-3xl text-stone-50"
            href={link.href}
            target="_blank"
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinksContainer {
  title: string;
  links: FooterLink[];
}

const informationLinks: FooterLinksContainer = {
  title: "Information",
  links: [
    { name: "About", href: "/about" },
    { name: "Product", href: "/product" },
    { name: "Blog", href: "/blog" },
  ],
};

const companyLinks: FooterLinksContainer = {
  title: "Company",
  links: [
    { name: "Community", href: "/community" },
    { name: "Career", href: "/career" },
    { name: "Our story", href: "/our-story" },
  ],
};

const contactsLinks: FooterLinksContainer = {
  title: "Contacts",
  links: [
    { name: "Getting Started", href: "/getting-started" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources" },
  ],
};

function FooterLinks({
  container,
}: {
  container: FooterLinksContainer;
}): JSX.Element {
  return (
    <ul className="mt-8 md:mt-0">
      <li className="mb-3 text-xl text-stone-50 md:text-2xl">
        {container.title}
      </li>
      {container.links.map((link) => (
        <li
          className="text-stone-50/75 hover:text-stone-50 md:text-lg"
          key={link.href}
        >
          <a href={link.href}>{link.name}</a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-app-navbar)] px-[4rem] py-[2rem] ">
      <div className="flex flex-col items-center justify-center md:flex-row md:gap-[200px]">
        <div className="flex flex-col items-center justify-center">
          <img src={logo} className="h-[80px] rounded-[2rem]" />
          <p className="my-4 text-center text-stone-50">
            We help you find your dream manga
          </p>
          <SocialLinks />
        </div>
        <div className="flex flex-wrap gap-[30px] lg:gap-[80px]">
          <FooterLinks container={informationLinks} />
          <FooterLinks container={companyLinks} />
          <FooterLinks container={contactsLinks} />
        </div>
      </div>
      <p className="mt-8 text-center text-stone-50">
        © {year} Bankai. All rights reserved. Made by Eduard Mykhailov
      </p>
    </footer>
  );
}
