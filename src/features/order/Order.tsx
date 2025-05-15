import { useDispatch, useSelector } from "react-redux";
import Heading from "../../ui/Heading";
import { RootState } from "../../store";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import {
  createMangaAmounts,
  createOrder,
  generateOrderID,
} from "../../utils/order";
import { clearCart } from "../cart/cartSlice";
import { useNavigate } from "react-router";

export default function Order() {
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      setError("Please fill out the address field");
      return;
    }

    const ids = await createMangaAmounts(cart.orderList, auth.token);
    console.log(ids);
    const order = {
      customerId: auth.id,
      orderID: generateOrderID(),
      deliveryLocation: address,
      sum: cart.sum,
      orderStatusId: 1,
      mangaAmountIds: ids,
    };
    await createOrder(order, auth.token);
    dispatch(clearCart());
    navigate("/buy-manga");
  };

  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <Heading
        title="Order"
        description="Fill out the form below to complete your order"
      />
      <div className="mx-auto mt-8 flex max-w-[600px] flex-col rounded-3xl bg-rose-200 p-8 text-center">
        <form action="">
          <label htmlFor="name" className="mb-1 block text-left font-semibold">
            Name
          </label>
          <input
            className="mb-4 w-full rounded-xl bg-stone-50 p-2 pl-4 focus:outline-none"
            type="text"
            id="name"
            value={auth.name}
          />

          <label htmlFor="email" className="mb-1 block text-left font-semibold">
            Email
          </label>
          <input
            className="mb-4 w-full rounded-xl bg-stone-50 p-2 pl-4 focus:outline-none"
            type="text"
            id="email"
            value={auth.email}
          />

          <label
            htmlFor="address"
            className="mb-1 block text-left font-semibold"
          >
            Delivery address
          </label>
          <input
            className="mb-4 w-full rounded-xl bg-stone-50 p-2 pl-4 focus:outline-none"
            type="text"
            name="address"
            id="address"
            onChange={(e) => setAddress(e.currentTarget.value)}
          />

          <label htmlFor="sum" className="mb-1 block text-left font-semibold">
            Order Sum
          </label>
          <p className="text-left text-3xl font-medium">
            {cart.sum.toFixed(2)}$
          </p>
          <div
            className={`border-3 mt-8 flex items-center rounded-lg border-solid border-indigo-950 bg-indigo-950/75 p-2 text-yellow-500 shadow-md ${
              error ? "" : "hidden"
            }`}
          >
            <IoIosWarning color="orange" />
            <p className="ml-3">{error}</p>
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 w-full rounded-2xl bg-[var(--color-app-navbar)] p-4 text-2xl text-stone-50"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </section>
  );
}
