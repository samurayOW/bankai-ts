import { BASE_URL } from "./helpers";

type LoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    date: string;
  };
};

type LoginError = {
  status: number;
  name: string;
  message: string;
  details?: unknown;
};

export async function loginUser(
  identifier: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error: LoginError = data.error;
    throw new Error(error.message || "Login failed");
  }

  return data;
}

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDate = async (
  userId: number,
  date: string,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Unknown error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
