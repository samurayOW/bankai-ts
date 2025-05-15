import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../features/auth/authSlice";

export default function AppLayout() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const date = localStorage.getItem("date");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (email && name && date && token)
      dispatch(
        setUser({ id: id, email: email, name: name, date: date, token: token })
      );
  });

  return (
    <>
      <div className="mx-auto max-w-[1600px]">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
