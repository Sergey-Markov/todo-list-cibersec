import { Button } from "react-bootstrap";
import { useFormik, Formik, Field, Form } from "formik";
import s from "./ListTodo.module.css";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

const todosData = [
  { id: 1, title: "what we need to do", completed: false },
  { id: 2, title: "what we need to do 2 ", completed: false },
  { id: 3, title: "what we need to do 3", completed: true },
  { id: 4, title: "what we need to do 4 ", completed: false },
  { id: 5, title: "what we need to do 5", completed: true },
  { id: 6, title: "what we need to do 6", completed: false },
];

export default function ListTodo({ setShow }) {
  const [todos, setTodos] = useState([]);
  const activeTodos = todos.filter((todo) => todo.completed === false);

  useEffect(async () => {
    const fuck = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setTodos(fuck.data);
    console.log(todos);
  }, []);

  const handleShow = () => setShow(true);
  const formik = useFormik({
    initialValues: {
      filter: "",
      isCompleted: false,
    },
    onSubmit: (values) => {
      if (!values.filter) return;
      const normalizeFilter = values.filter.toLowerCase().trim();
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().trim().includes(normalizeFilter)
      );
      setTodos(filteredTodos);
      formik.values.filter = "";
      document.getElementById("filter").value = "";
    },
  });

  const handleCheck = (e) => {
    formik.handleChange(e);
    console.log(typeof e.target.checked);
    if (e.target.checked) {
      const completedTodo = todosData.filter(
        (todo) => todo.completed === e.target.checked
      );
      setTodos(completedTodo);
    } else {
      setTodos(activeTodos);
    }
  };
  const handleClickResetBtn = () => {
    setTodos(activeTodos);
    document.getElementById("checkbox").checked = false;
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
          <label className={s.checkBoxArchive}>
            Archived
            <input
              id="checkbox"
              type="checkbox"
              name="isCompleted"
              onChange={handleCheck}
              value={formik.values.isCompleted}
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
