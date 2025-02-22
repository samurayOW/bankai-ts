import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { BASE_URL } from "../../utils/helpers";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { decreaseAmount, increaseAmount, removeOrder } from "./cartSlice";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";

export default function OrderList() {
  const orderList = useSelector((state: RootState) => state.cart.orderList);
  const dispatch = useDispatch();

  return (
    <ul className="flex flex-col gap-4">
      {orderList.map((el) => (
        <li
          className="flex gap-4 rounded-2xl bg-rose-200 p-3 text-xl"
          key={el.manga.documentId}
        >
          <Link to={`/manga/${el.manga.documentId}`}>
            <img
              src={`${BASE_URL}${el.manga.Cover.url}`}
              className="w-30 rounded-2xl"
              alt=""
            />
          </Link>
          <div className="relative flex w-full flex-col items-center justify-center gap-2">
            <button
              onClick={() => dispatch(removeOrder(el.manga.documentId))}
              className="absolute right-[-10px] top-2 text-2xl"
            >
              <MdDelete />
            </button>
            <h3 className="max-w-[170px] truncate text-base">
              {el.manga.Title}
            </h3>
            <p className="text-base">{el.manga.production.Title}</p>
            <span>{el.manga.Price}$</span>
            <div className="flex gap-2 rounded-2xl bg-stone-950 px-4 py-2 text-stone-50">
              <button
                onClick={() => dispatch(decreaseAmount(el.manga.documentId))}
              >
                <FaMinus />
              </button>
              <p>{el.amount}</p>
              <button
                onClick={() => dispatch(increaseAmount(el.manga.documentId))}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
