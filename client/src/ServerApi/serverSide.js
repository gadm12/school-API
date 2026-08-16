import axios from "axios";

const booksApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getBooks = async () => {
  const response = await booksApi.get("/book");
  return response.data;
};

export const getBook = async (id) => {
  const response = await booksApi.get(`/book/${id}`);
  return response.data;
};
