export const BASE_URL: string = "http://localhost:1337";

export async function fetchManga() {
  try {
    const res = await fetch(`${BASE_URL}/api/mangas?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("💥💥💥", error);
    return [];
  }
}

export async function fetchGenres() {
  try {
    const res = await fetch(`${BASE_URL}/api/genres?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("💥💥💥", error);
    return [];
  }
}

export async function fetchFeedbacks() {
  try {
    const res = await fetch(`${BASE_URL}/api/feedbacks?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("💥💥💥", error);
    return [];
  }
}

export async function fetchProduction() {
  try {
    const res = await fetch(`${BASE_URL}/api/productions`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("💥💥💥", error);
    return [];
  }
}

export async function fetchMangaById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/mangas/${id}?populate=*`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("💥💥💥", error);
    return null;
  }
}
