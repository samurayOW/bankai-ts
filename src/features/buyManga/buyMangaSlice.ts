import { createSlice } from "@reduxjs/toolkit";
import { Genre, Manga, Production } from "../../utils/interfaces";

interface State {
  isOpen: boolean;
  toggle: {
    isGenresOpen: boolean;
    isProductionOpen: boolean;
    isPriceRangeOpen: boolean;
  };
  filters: {
    genres: Genre[];
    production: Production[];
  };
  chosenFilters: {
    genres: string[];
    production: string[];
    priceRange: number[];
  };
  mangaList: Manga[];
  sortPar: string;
  currentPage: number;
  pages: number;
}

const initialState: State = {
  isOpen: false,
  toggle: {
    isGenresOpen: true,
    isProductionOpen: true,
    isPriceRangeOpen: true,
  },
  filters: {
    genres: [],
    production: [],
  },
  chosenFilters: {
    genres: [],
    production: [],
    priceRange: [0, 100],
  },
  mangaList: [],
  sortPar: "createdAt:desc",
  currentPage: 1,
  pages: 1,
};

export const buyMangaSlice = createSlice({
  name: "buyManga",
  initialState,
  reducers: {
    toggleFilter(state) {
      state.isOpen = !state.isOpen;
    },
    toggleGenres(state) {
      state.toggle.isGenresOpen = !state.toggle.isGenresOpen;
    },
    toggleProduction(state) {
      state.toggle.isProductionOpen = !state.toggle.isProductionOpen;
    },
    togglePriceRange(state) {
      state.toggle.isPriceRangeOpen = !state.toggle.isPriceRangeOpen;
    },
    setGenres(state, action) {
      state.filters.genres = action.payload;
    },
    setProduction(state, action) {
      state.filters.production = action.payload;
    },
    setPriceRange(state, action) {
      state.chosenFilters.priceRange = action.payload;
    },
    addGenre: (state, action) => {
      const genreExists = state.chosenFilters.genres.includes(action.payload);
      state.chosenFilters.genres = genreExists
        ? state.chosenFilters.genres.filter((genre) => genre !== action.payload)
        : [...state.chosenFilters.genres, action.payload];
    },
    addProduction: (state, action) => {
      const productionExists = state.chosenFilters.production.includes(
        action.payload
      );
      state.chosenFilters.production = productionExists
        ? state.chosenFilters.production.filter(
            (production) => production !== action.payload
          )
        : [...state.chosenFilters.production, action.payload];
    },
    setMangaList(state, action) {
      state.mangaList = action.payload;
    },
    setSortPar(state, action) {
      state.sortPar = action.payload;
    },
    clearFilters(state) {
      state.chosenFilters.genres = [];
      state.chosenFilters.production = [];
      state.chosenFilters.priceRange = [0, 100];
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPages(state, action) {
      state.pages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleFilter,
  toggleGenres,
  toggleProduction,
  togglePriceRange,
  setGenres,
  setProduction,
  setPriceRange,
  addGenre,
  addProduction,
  setMangaList,
  setSortPar,
  clearFilters,
  setCurrentPage,
  setPages,
} = buyMangaSlice.actions;

export default buyMangaSlice.reducer;
