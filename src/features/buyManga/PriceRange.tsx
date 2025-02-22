import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./filters.css";
import { setPriceRange, togglePriceRange } from "./buyMangaSlice";

function RangeSlider({
  range,
  setRange,
}: {
  range: number[];
  setRange: (newRange: number[]) => void;
}): JSX.Element {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRange(newValue);
    }
  };

  const valuetext = (value: number) => {
    return `${value}°C`;
  };

  return (
    <Slider
      getAriaLabel={(index: number) =>
        `Slider handle ${index === 0 ? "minimum" : "maximum"} value`
      }
      value={range}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      disableSwap
      sx={{
        color: "#fff",
        "& .MuiSlider-thumb": {
          backgroundColor: "#fff",
          border: "2px solid #fff",
          width: "1rem",
          height: "1rem",
        },
        "& .MuiSlider-track": {
          backgroundColor: "#fff",
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#fff",
        },
      }}
    />
  );
}

export default function PriceRange(): JSX.Element {
  const priceRange = useSelector(
    (state: RootState) => state.buyManga.chosenFilters.priceRange
  );
  const isPriceRangeOpen = useSelector(
    (state: RootState) => state.buyManga.toggle.isPriceRangeOpen
  );
  const dispatch = useDispatch();

  const handleRangeChange = (newRange: number[]) => {
    dispatch(setPriceRange(newRange));
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 text-2xl text-stone-50">
        <h3>Price</h3>
        <button onClick={() => dispatch(togglePriceRange())}>
          {isPriceRangeOpen ? <FaAngleDown /> : <FaAngleUp />}
        </button>
      </div>
      <div className={isPriceRangeOpen ? "block" : "hidden"}>
        <RangeSlider range={priceRange} setRange={handleRangeChange} />
        <div className="text-center text-stone-50">{`${priceRange[0]} - ${priceRange[1]}`}</div>
      </div>
    </div>
  );
}
