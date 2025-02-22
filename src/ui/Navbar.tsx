import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose, IoMdPerson } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Link {
  name: string;
  href: string;
}

const links: Link[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Buy Manga", href: "/buy-manga" },
];

function NavbarLinks(): JSX.Element {
  return (
    <ul className="flex min-w-full flex-col gap-[30px] px-4 py-8 font-[var(--font-family)] text-stone-50 sm:mr-16 sm:flex-row md:mr-[200px] lg:mr-[400px]">
      {links.map((link) => (
        <NavLink to={link.href} key={link.name}>
          <li className="ml-4 text-lg sm:text-xl md:text-2xl">{link.name}</li>
        </NavLink>
      ))}
    </ul>
  );
}

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const buttonStyle = "bg-transparent border-none text-stone-50 text-2xl";
  const orderList = useSelector((state: RootState) => state.cart.orderList);

  return (
    <nav className="z-999 sticky top-0 flex items-center justify-between bg-[var(--color-app-navbar)] px-4 py-2 md:px-8">
      <img
        src={logo}
        alt="logo"
        className="h-[50px] rounded-[2rem] sm:h-[70px]"
      />
      <div className="flex">
        <div className="hidden sm:flex">
          <NavbarLinks />
        </div>
        <div className="flex gap-4 sm:gap-8">
          <button className={`${buttonStyle} relative`}>
            <Link to="/cart">
              <FaCartShopping />
              <span
                className={`absolute -right-1 top-3 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-rose-200 text-xs text-stone-950 sm:top-11 ${
                  orderList.length === 0 ? "hidden" : ""
                }`}
              >
                {orderList.length}
              </span>
            </Link>
          </button>
          <button className={buttonStyle}>
            <IoMdPerson />
          </button>
          <button
            className={`${buttonStyle} sm:hidden`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoMdClose /> : <HiMenuAlt3 />}
          </button>
          {isMenuOpen ? (
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-999 absolute right-[20px] top-[70px] w-[200px] rounded-[1rem] bg-[var(--color-bg)] sm:hidden"
            >
              <NavbarLinks />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}
