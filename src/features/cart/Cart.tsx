import Heading from "../../ui/Heading";
import OrderList from "./OrderList";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import LinkBtn from "../../ui/LinkBtn";
import { useNavigate } from "react-router";
import { setSum } from "./cartSlice";

export default function Cart() {
  const orderList = useSelector((state: RootState) => state.cart.orderList);
  const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalItemsCost = orderList.reduce(
    (total, el) => total + el.amount * el.manga.Price,
    0
  );
  const totalCost = totalItemsCost + deliveryFee;
  dispatch(setSum(totalCost));

  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <Heading title="Your Cart" description="" align="left" />
      {orderList.length > 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <div className="mt-8 max-h-[600px] w-full max-w-[400px] overflow-scroll rounded-2xl bg-stone-950 p-4">
            <OrderList />
          </div>
          <div className="mt-8 h-full w-full max-w-[400px] rounded-2xl bg-rose-200 p-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <ul className="mt-4">
              {orderList.map((el) => (
                <li
                  className="mb-2 flex items-center justify-between border-b-2 border-dashed border-stone-500"
                  key={el.manga.documentId}
                >
                  <div>
                    <p>{el.manga.Title}</p> <span>x{el.amount}</span>
                  </div>
                  <div className="text-xl">
                    {(el.amount * el.manga.Price).toFixed(2)}$
                  </div>
                </li>
              ))}
              <li className="mb-2 flex items-center justify-between border-b-2 border-dashed border-stone-500">
                <div>
                  <p>Delivery fee</p>
                </div>
                <div className="text-xl">{deliveryFee}$</div>
              </li>
            </ul>
            <div className="mt-4 flex justify-between text-xl font-bold">
              <p>Total Sum</p>
              <span>{totalCost.toFixed(2)}$</span>
            </div>
            <button
              onClick={() => navigate("/order")}
              className="mt-4 rounded-2xl bg-stone-950 p-4 text-stone-50"
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-rose-200 p-8">
          <p className="text-center text-3xl">Your cart is empty...</p>
          <LinkBtn name="Buy Manga" to="/buy-manga" color="dark" />
        </div>
      )}
    </section>
  );
}
