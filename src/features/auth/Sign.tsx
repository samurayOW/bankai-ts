import React, { useState } from "react";
import Heading from "../../ui/Heading";
import {
  loginUser,
  registerUser,
  updateUserDate,
} from "../../utils/authentication";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice";
import { IoIosWarning } from "react-icons/io";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

enum SignPar {
  In = "In",
  Up = "Up",
}

interface FormEntries {
  email: string;
  password: string;
  name: string;
  date: string;
}

type MyDatePickerProps = {
  setValue: (value: Dayjs | null) => void;
};

const MyDatePicker: React.FC<MyDatePickerProps> = ({ setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select date"
        className="border-none bg-stone-50"
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

// In - Zayti, Up - Register

export default function Sign() {
  const [signPar, setSignPar] = useState<SignPar>(SignPar.In);
  const [formEntries, setFormEntries] = useState<FormEntries>({
    email: "",
    password: "",
    name: "",
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const handleSign = () => {
    setSignPar((prev) => (prev === SignPar.In ? SignPar.Up : SignPar.In));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name, date } = formEntries;

    if (signPar === SignPar.In) {
      if (!email && !password) {
        setError("Please fill in all fields");
        return;
      }

      try {
        const data = await loginUser(email, password);
        dispatch(
          setUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.username,
            token: data.jwt,
            date: data.user.date,
          })
        );
      } catch (error) {
        setError((error as Error).message);
      }
    } else if (signPar === SignPar.Up) {
      if (!email && !password && !name && !date) {
        setError("Please fill in all fields");
        return;
      }

      try {
        const data = await registerUser(name, email, password);
        updateUserDate(data.user.id, date, data.jwt);
        dispatch(
          setUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.username,
            date: date,
            token: data.jwt,
          })
        );
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  return (
    <section className="section-padding bg-[var(--color-app-inner-bg)]">
      <Heading
        title={`Sign ${signPar}`}
        description={
          signPar === SignPar.In
            ? "Enter your email and password to sign in"
            : "Create an account by entering your details below"
        }
        align="center"
      />

      <div className="mx-auto mt-8 max-w-[600px] rounded-3xl bg-rose-200 p-8">
        <form action="">
          <label htmlFor="email">Identifier (Email Address)</label>
          <br />
          <input
            className="mb-4 mt-2 w-full rounded-xl bg-stone-50 p-2 pl-4 focus:outline-none"
            type="email"
            name="email"
            id="email"
            required
            onInput={(e) =>
              setFormEntries({ ...formEntries, email: e.currentTarget.value })
            }
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="mb-4 mt-2 w-full rounded-xl bg-stone-50 p-2 pl-4 focus:outline-none"
            type="password"
            name="password"
            id="password"
            onInput={(e) =>
              setFormEntries({
                ...formEntries,
                password: e.currentTarget.value,
              })
            }
          />
          <br />
          <div className={signPar === SignPar.In ? "hidden" : ""}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="mb-4 mt-2 w-full rounded-xl bg-stone-50 p-2 pl-4 focus:outline-none"
              type="text"
              name="name"
              id="name"
              onInput={(e) =>
                setFormEntries({
                  ...formEntries,
                  name: e.currentTarget.value,
                })
              }
            />
            <br />
            <label htmlFor="date">Date of birth</label>
            <br />
            <div className="mt-2" id="date">
              <MyDatePicker
                setValue={(date) =>
                  setFormEntries({
                    ...formEntries,
                    date: date ? date.format("YYYY-MM-DD") : "",
                  })
                }
              />
            </div>
          </div>
          <div
            className={`border-3 flex items-center rounded-lg border-solid border-indigo-950 bg-indigo-950/75 p-2 text-yellow-500 shadow-md ${
              error ? "" : "hidden"
            }`}
          >
            <IoIosWarning color="orange" />
            <p className="ml-3">{error}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full rounded-2xl bg-[var(--color-app-navbar)] p-4 text-2xl text-stone-50"
          >
            Sign {signPar}
          </button>
          <p className="mt-4 text-center text-stone-600">
            {signPar === SignPar.In
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={handleSign}
              className="cursor-pointer text-[var(--color-app-navbar)] underline"
            >
              Sign {signPar === SignPar.In ? "Up" : "In"}
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
