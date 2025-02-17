//Step 4 - Create API. js in front end to define front end routes and manage front end routes whenever accessing data from backend
import axios from "axios";

const URL = "http://localhost:5050";

//Book Posts
export async function getBooks() {
  const response = await axios.get(`${URL}/api/books/all`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getBook(id) {
  const response = await axios.get(`${URL}/api/books/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createBook(book) {
  try {
    const response = await axios.post(`${URL}/api/books/create`, book, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
}

export async function updateBook(id, book) {
  const response = await axios.put(`${URL}/api/books/update/${id}`, book);

  return response;
}

export async function deleteBook(id) {
  const response = await axios.delete(`${URL}/api/books/delete/${id}`);

  return response;
}

//step 12
//Users
export async function getUser(id) {
  const response = await axios.get(`${URL}/api/users/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createUser(user) {
  const response = await axios.post(`${URL}/api/users/create`, user);

  return response;
}

export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/api/users/update/${id}`, user);

  return response;
}

//step 14
export async function verifyUser(user) {
  const response = await axios.post(`${URL}/api/users/login`, user);
  console.log(response);
  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}
