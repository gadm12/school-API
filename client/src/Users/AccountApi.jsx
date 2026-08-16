import axios from "axios";
import { redirect } from "react-router-dom";

export const account = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

account.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

const errorMessage = (error) => {
  const data = error.response?.data;
  if (!data) return "could not reach the server.";
  return typeof data === "string"
    ? data
    : JSON.stringify(data);
};

// Do not make login and register in one function as below

export const userAuth = async (
  email,
  password,
  register,
) => {
  try {
    const response = await account.post(
      register ? "accounts/register/" : "accounts/login/",
      {
        email,
        password,
      },
    );

    const { user, token } = response.data;

    if (!register) {
      localStorage.setItem("token", token);
    }

    return {
      user,
      error: null,
    };
  } catch (error) {
    console.error(errorMessage(error));

    return {
      user: null,
      error: errorMessage(error),
    };
  }
};

export const userConfirmation = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const response = await account.get("accounts/");
    return response.data.email;
  } catch (error) {
    localStorage.removeItem("token");
    console.error(errorMessage(error));
    return null;
  }
};

export const userLogOut = async () => {
  try {
    await account.post("accounts/logout/");
  } catch (error) {
    console.error(
      "logout request failed",
      errorMessage(error),
    );
  }
  localStorage.removeItem("token");
  return null;
};

export const requireLogin = async () => {
  if (!localStorage.getItem("token")) {
    throw redirect("/");
  }
  return null;
};

export const redirectIfLoggedIn = async () => {
  return localStorage.getItem("token")
    ? redirect("home/")
    : null;
};
