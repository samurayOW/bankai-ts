import { FaSearch } from "react-icons/fa";
import header from "../../assets/header.png";

function Header(): JSX.Element {
  return (
    <header className="bg-[var(--color-app-inner-bg)] p-8 lg:p-16">
      <div className="flex flex-col items-center justify-center rounded-3xl bg-rose-200 p-4 md:flex-row lg:gap-[50px]">
        <div>
          <div className="text-center">
            <p className="text-sm lg:text-xl">online manga store</p>
            <h1 className="font-heading text-5xl lg:text-6xl">BANKAI</h1>
          </div>
          <div className="mt-6 flex items-center justify-center gap-10 text-center">
            <div>
              <p className="text-2xl">200+</p>
              <span>unique titles</span>
            </div>
            <div className="w-0.75 h-[50px] bg-stone-950"></div>
            <div>
              <p className="text-2xl">5k+</p>
              <span>satisfied customers</span>
            </div>
          </div>
          <div className="my-4 ml-7 flex justify-center">
            <input
              type="text"
              name=""
              id=""
              className="h-10 w-[280px] rounded-lg bg-stone-50 p-2 text-xs font-normal italic focus:outline-none"
              placeholder="Search something. Example: BANKAI!"
            />
            <button className="-left-9.5 relative top-1 h-8 rounded-lg bg-[var(--color-app-bg)] p-2 text-stone-50">
              <FaSearch />
            </button>
          </div>
        </div>
        <img className="w-[375px] lg:w-[500px]" src={header} alt="" />
      </div>
    </header>
  );
}

export default Header;
