import { BASE_URL } from "./helpers";
import { Manga } from "./interfaces";

interface Order {
  manga: Manga;
  amount: number;
}

export async function createMangaAmounts(
  items: Order[],
  token?: string
): Promise<number[]> {
  const responses = await Promise.all(
    items.map((item) =>
      fetch(`${BASE_URL}/api/manga-amounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          data: {
            manga: item.manga.documentId,
            amount: item.amount,
          },
        }),
      }).then((res) => res.json())
    )
  );

  const ids = responses.map((res) => res.data?.id - 1).filter(Boolean);
  return ids;
}

type CreateOrderInput = {
  customerId: number;
  orderID: string;
  deliveryLocation: string;
  sum: number;
  orderStatusId: number;
  mangaAmountIds: number[];
};

export async function createOrder(
  input: CreateOrderInput,
  token?: string
): Promise<number | null> {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      data: {
        customer: input.customerId,
        orderID: input.orderID,
        deliveryLocation: input.deliveryLocation,
        sum: input.sum,
        orderStatus: input.orderStatusId,
        mangaAmounts: input.mangaAmountIds,
      },
    }),
  });

  const json = await res.json();
  return json.data?.id ?? null;
}

export function generateOrderID(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}
