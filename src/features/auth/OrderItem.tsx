import { IoMdTime } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { Order } from "../../utils/order";
import {
  FaAngleDown,
  FaAngleUp,
  FaCarSide,
  FaMapLocationDot,
} from "react-icons/fa6";
import { MdFileDownloadDone } from "react-icons/md";
import { Link } from "react-router";
import dayjs from "dayjs";
import { useState } from "react";

const statusesIcons = {
  Processing: <IoMdTime />,
  Packed: <FiPackage />,
  Sent: <FaCarSide />,
  Delivered: <MdFileDownloadDone />,
};

const statusesColors = {
  Processing: "text-red-600",
  Packed: "text-orange-500",
  Sent: "text-yellow-300",
  Delivered: "text-green-500",
};

export default function OrderItem({ order }: { order: Order }) {
  const status = order.orderStatus.Title as keyof typeof statusesIcons;
  const orderItems = order.mangaAmounts;
  const date = dayjs(order.createdAt).format("DD.MM.YYYY");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="border-3 w-full max-w-[800px] rounded-lg border-solid border-rose-200 bg-rose-200/25 p-3 shadow-md sm:text-xl">
      <div className="flex items-center justify-between text-stone-50">
        <div className={`text-3xl ${statusesColors[status]}`}>
          {statusesIcons[status]}
        </div>
        <p>{order.orderID}</p>
        <span>{date}</span>
        <span>{order.sum.toFixed(2)}$</span>
        <button className="text-3xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      <div className={isOpen ? "block" : "hidden"}>
        <div className="mt-4 h-[2px] w-full bg-stone-50"></div>
        <ul className="mt-4">
          {orderItems.map((item) => (
            <li
              key={item.manga.id}
              className="mt-2 flex items-center justify-between text-stone-50"
            >
              <Link to={`/manga/${item.manga.documentId}`}>
                {item.manga.Title}
              </Link>
              <span>x{item.amount}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 h-[2px] w-full bg-stone-50"></div>
        <div className="mt-3 flex items-center text-stone-50">
          <FaMapLocationDot />
          <p className="ml-4">{order.deliveryLocation}</p>
        </div>
      </div>
    </li>
  );
}
