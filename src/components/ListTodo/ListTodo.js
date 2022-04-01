import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import s from "./ListTodo.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListTodo({ setShow }) {
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setAllTodos(result.data);
      setTodos(result.data);
    };
    fetchData();
  }, []);

  const handleShow = () => setShow(true);
  const formik = useFormik({
    initialValues: {
      filter: "",
      isActive: false,
      isCompleted: false,
    },
    onSubmit: ({ filter, isCompleted, isActive }) => {
      if (!filter && isCompleted && !isActive) {
        const filteredTodos = allTodos.filter(
          ({ completed }) => completed === isCompleted
        );
        setTodos(filteredTodos);
        return;
      }
      if (!filter && isActive && isCompleted) {
        setTodos(allTodos);
        return;
      }
      if (!filter && isActive) {
        const result = allTodos.filter(
          ({ completed }) => completed === !isActive
        );
        setTodos(result);
        return;
      }

      if (!filter) {
        setTodos(allTodos);
        return;
      }

      const normalizeFilter = filter.toLowerCase().trim();
      const filteredTodos = allTodos.filter(({ title, completed }) => {
        return (
          (title.toLowerCase().trim().includes(normalizeFilter) &&
            completed === isCompleted) ||
          (title.toLowerCase().trim().includes(normalizeFilter) &&
            completed === !isActive)
        );
      });
      setTodos(filteredTodos);
    },
  });

  const handleClickResetBtn = () => {
    setTodos(allTodos);
    formik.setValues({
      isActive: false,
      isCompleted: false,
      filter: "",
    });
  };

  return (
    <div className={s.field}>
      <div className={s.field_title}>
        <p className={s.title_field}>Your List</p>
        <form className={s.form_field} onSubmit={formik.handleSubmit}>
          <label htmlFor="filter" className={s.filter_title}>
            Filter:
          </label>
          <input
            className={s.filter_input}
            id="filter"
            name="filter"
            type="filter"
            onChange={formik.handleChange}
            value={formik.values.filter}
          />
          <label className={s.checkBoxActive}>
            Active
            <input
              id="checkbox-active"
              type="checkbox"
              name="isActive"
              onChange={formik.handleChange}
              checked={formik.values.isActive}
              value={formik.values.isActive}
            />
          </label>
          <label className={s.checkBoxArchive}>
            Completed
            <input
              id="checkbox"
              type="checkbox"
              name="isCompleted"
              onChange={formik.handleChange}
              checked={formik.values.isCompleted}
            />
          </label>
          <Button
            type="button"
            className={s.resetBtn}
            variant="primary"
            onClick={handleClickResetBtn}
          >
            Reset
          </Button>
          <Button type="submit" className={s.filter_btn} variant="primary">
            Enter
          </Button>
        </form>

        <Button
          className={s.newNote_btn}
          variant="primary"
          onClick={handleShow}
        >
          Add your Note
        </Button>
      </div>
      <ol className={s.field_list}>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{ color: todo.completed ? "red" : "black" }}
            >
              <p>{todo.title}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
