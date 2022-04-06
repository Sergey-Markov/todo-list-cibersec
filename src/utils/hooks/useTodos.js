import { useEffect, useState } from "react";
import axios from "axios";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    setAllTodos(result.data);
    setTodos(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { todos, allTodos, setTodos };
};
