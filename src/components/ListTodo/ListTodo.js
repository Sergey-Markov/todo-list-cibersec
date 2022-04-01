import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import s from "./ListTodo.module.css";
import { useState, useEffect, useMemo } from "react";
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
    onSubmit: (values) => {
      if (!values.filter && values.isCompleted && !values.isActive) {
        const filteredTodos = allTodos.filter(
          (todo) => todo.completed === values.isCompleted
        );
        setTodos(filteredTodos);
        return;
      }
      if (!values.filter && values.isActive && values.isCompleted) {
        // const result = allTodos.filter(
        //   (todo) => todo.completed === !values.isActive
        // );
        setTodos(allTodos);
        return;
      }
      if (!values.filter && values.isActive) {
        const result = allTodos.filter(
          (todo) => todo.completed === !values.isActive
        );
        setTodos(result);
        return;
      }

      if (!values.filter) {
        setTodos(allTodos);
        return;
      }

      const normalizeFilter = values.filter.toLowerCase().trim();
      const filteredTodos = allTodos.filter((todo) => {
        return (
          (todo.title.toLowerCase().trim().includes(normalizeFilter) &&
            todo.completed === values.isCompleted) ||
          (todo.title.toLowerCase().trim().includes(normalizeFilter) &&
            todo.completed !== values.isActive)
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
              // value={formik.values.isCompleted}
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
