import { useEffect } from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduction } from "../../utils/helpers";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./filters.css";
import {
  addProduction,
  setProduction,
  toggleProduction,
} from "./buyMangaSlice";

export default function ProductionFilters(): JSX.Element {
  const { toggle, filters, chosenFilters } = useSelector(
    (state: RootState) => state.buyManga
  );
  const productionList = filters.production;
  const chosenProduction = chosenFilters.production;
  const isProductionOpen = toggle.isProductionOpen;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduction().then((data: { createdAt: string }[]) => {
      if (!Array.isArray(data)) {
        console.error("💥💥💥", data);
        return;
      }

      dispatch(setProduction(data));
    });
  }, [dispatch]);

  return (
    <div className="max-h-[200px]">
      <div className="mb-4 flex items-center gap-4 text-2xl text-stone-50">
        <h3>Production</h3>
        <button onClick={() => dispatch(toggleProduction())}>
          {isProductionOpen ? <FaAngleDown /> : <FaAngleUp />}
        </button>
      </div>
      <ul className={isProductionOpen ? "block" : "hidden"}>
        {productionList.map((production) => (
          <li
            key={production.id}
            className="bankai__sidebar-filter_item flex items-center gap-2 text-stone-50"
          >
            <input
              type="checkbox"
              name={production.Title}
              id={`checkbox-${production.id}`}
              onChange={() => dispatch(addProduction(production.id))}
              checked={chosenProduction.includes(production.id)}
            />
            <label htmlFor={`checkbox-${production.id}`}>
              <span>{production.Title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
