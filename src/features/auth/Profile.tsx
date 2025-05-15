import { useDispatch, useSelector } from "react-redux";
import Heading from "../../ui/Heading";
import { RootState } from "../../store";
import { CiLogout } from "react-icons/ci";
import { logOut } from "./authSlice";
import { clearCart } from "../cart/cartSlice";

export default function Profile() {
  const { email, name, date } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logOut());
  };

  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <Heading title={name} description="" />
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 text-xl text-stone-300">
        <p>Email: {email}</p>
        <p>Date of birth: {date}</p>
        <button
          onClick={handleLogout}
          className="mt-8 flex w-[150px] items-center justify-center gap-2 rounded-2xl bg-rose-600 px-8 py-4 text-stone-50"
        >
          <CiLogout />
          Log Out
        </button>
      </div>
    </section>
  );
}
