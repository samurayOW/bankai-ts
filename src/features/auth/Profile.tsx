import { useDispatch, useSelector } from "react-redux";
import Heading from "../../ui/Heading";
import { RootState } from "../../store";
import { CiLogout } from "react-icons/ci";
import { logOut } from "./authSlice";
import { clearCart } from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { fetchOrdersByCustomer, Order } from "../../utils/order";
import OrderItem from "./OrderItem";
import LinkBtn from "../../ui/LinkBtn";

export default function Profile() {
  const { email, name, date, id, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logOut());
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders = await fetchOrdersByCustomer(id, token);
        setOrderHistory(orders);
      } catch (err) {
        console.log(err);
      }
    };

    loadOrders();
  }, [token, id]);

  return (
    <>
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
      <section className="section-padding bg-[var(--color-app-inner-bg)]">
        <Heading title="Your Orders" description="" />
        {orderHistory.length > 0 ? (
          <ul className="mt-8 flex flex-col items-center gap-4 lg:mt-16">
            {orderHistory.map((order) => (
              <OrderItem order={order} key={order.id} />
            ))}
          </ul>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-rose-200 p-8">
            <p className="text-center text-3xl">
              You haven't ordered anything yet...
            </p>
            <LinkBtn name="Buy Manga" to="/buy-manga" color="dark" />
          </div>
        )}
      </section>
    </>
  );
}
