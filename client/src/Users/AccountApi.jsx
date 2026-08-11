import axios from "axios";

export const account = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/accounts/",
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
  return typeof data === "string" ? data : JSON.stringify(data);
};

// Do not make login and register one function as below

export const userAuth = async (email, password, register) => {
  try {
    const response = await account.post(register ? "register/" : "login/", {
      email: email,
      password: password,
    });
    const { email: userEmail, token: token } = response.data;
    localStorage.setItem("token", token);
    return userEmail;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
};
