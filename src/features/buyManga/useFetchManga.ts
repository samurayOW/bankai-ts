/*
import { setCurrentPage, setMangaList, setPages } from "./buyMangaSlice";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BASE_URL } from "../../utils/helpers";

export function useFetchManga() {
  const dispatch = useDispatch();
  const { chosenFilters } = useSelector((state: RootState) => state.buyManga);
  const sortPar = useSelector((state: RootState) => state.buyManga.sortPar);
  const [isMangaLoading, setIsMangaLoading] = useState(false);
  const pages = useSelector((state: RootState) => state.buyManga.pages);
  const currentPage = useSelector(
    (state: RootState) => state.buyManga.currentPage
  );

  async function fetchMangaByParams(page: number) {
    setIsMangaLoading(true);

    let query = "";
    chosenFilters.genres.forEach(
      (id) => (query += `filters[Genres][id][$in]=${id}&`)
    );
    chosenFilters.production.forEach(
      (id) => (query += `filters[production][id][$in]=${id}&`)
    );

    query += `filters[Price][$gte]=${chosenFilters.priceRange[0]}&`;
    query += `filters[Price][$lte]=${chosenFilters.priceRange[1]}&`;

    const res = await fetch(
      `${BASE_URL}/api/mangas?${query}populate=*&sort=${sortPar}&pagination[page]=${page}&pagination[pageSize]=12`
    );

    const data = await res.json();

    dispatch(setMangaList(data.data));
    dispatch(setPages(data.meta.pagination.pageCount));
    dispatch(setCurrentPage(page));
    setIsMangaLoading(false);

    return data.data;
  }

  return {
    fetchMangaByParams,
    isMangaLoading,
    pages,
    currentPage,
    setCurrentPage,
  };
}
*/
import { setCurrentPage, setMangaList, setPages } from "./buyMangaSlice";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { BASE_URL } from "../../utils/helpers";

export function useFetchManga() {
  const dispatch = useDispatch();
  const { chosenFilters, sortPar, pages, currentPage } = useSelector(
    (state: RootState) => state.buyManga
  );

  const [isMangaLoading, setIsMangaLoading] = useState(false);

  const fetchMangaByParams = useCallback(
    async (page: number) => {
      setIsMangaLoading(true);

      try {
        const queryParams = new URLSearchParams();

        chosenFilters.genres.forEach((id) =>
          queryParams.append("filters[Genres][id][$in]", id.toString())
        );
        chosenFilters.production.forEach((id) =>
          queryParams.append("filters[production][id][$in]", id.toString())
        );

        queryParams.append(
          "filters[Price][$gte]",
          chosenFilters.priceRange[0].toString()
        );
        queryParams.append(
          "filters[Price][$lte]",
          chosenFilters.priceRange[1].toString()
        );
        queryParams.append("populate", "*");
        queryParams.append("sort", sortPar);
        queryParams.append("pagination[page]", page.toString());
        queryParams.append("pagination[pageSize]", "12");

        const res = await fetch(
          `${BASE_URL}/api/mangas?${queryParams.toString()}`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        dispatch(setMangaList(data.data));
        dispatch(setPages(data.meta.pagination.pageCount));
        dispatch(setCurrentPage(page));
        return data.data;
      } catch (error) {
        console.error("Failed to fetch manga:", error);
        return [];
      } finally {
        setIsMangaLoading(false);
      }
    },
    [chosenFilters, sortPar, dispatch]
  );

  return {
    fetchMangaByParams,
    isMangaLoading,
    pages,
    currentPage,
    setCurrentPage,
  };
}
