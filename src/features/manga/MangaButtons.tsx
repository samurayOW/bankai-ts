import { FaMinus, FaPlus } from "react-icons/fa6";
import LinkBtn from "../../ui/LinkBtn";
import { Manga } from "../../utils/interfaces";
import { addOrder } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../store";
import { useNavigate } from "react-router";

export default function MangaButtons({ manga }: { manga: Manga }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const orderList = useSelector((state: RootState) => state.cart.orderList);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  if (!manga) {
    return null;
  }

  const handleDec = () => {
    if (amount > 1) setAmount(amount - 1);
  };

  const handleInc = () => {
    setAmount(amount + 1);
  };

  const isMangaInOrder = orderList.some(
    (order) => order.manga?.documentId === manga.documentId
  );

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addOrder({ order: manga, amount: amount }));
    } else {
      navigate("/my-profile");
    }
  };

  return (
    <>
      {!isMangaInOrder ? (
        <div className="mt-4 flex items-center justify-center gap-8">
          <div className="rounded-4xl flex items-center justify-center gap-6 bg-rose-200 px-4 py-2 text-2xl">
            <button onClick={handleDec}>
              <FaMinus />
            </button>
            <div className="text-3xl">{amount}</div>
            <button onClick={handleInc}>
              <FaPlus />
            </button>
          </div>
          <button
            className="rounded-3xl bg-stone-950 px-6 py-3 text-2xl text-stone-50"
            onClick={handleAddToCart}
            // onClick={() => dispatch(addOrder({ order: manga, amount: amount }))}
          >
            Add To Cart
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <LinkBtn name="Go to cart" to="/cart" color="dark" />
        </div>
      )}
    </>
  );
}
