import { Button } from "react-bootstrap";
import { useFormik, Formik, Field, Form } from "formik";
import s from "./ListTodo.module.css";
import { useState } from "react";

const todosData = [
  { id: 1, title: "what we need to do", completed: false },
  { id: 2, title: "what we need to do 2 ", completed: false },
  { id: 3, title: "what we need to do 3", completed: true },
  { id: 4, title: "what we need to do 4 ", completed: false },
  { id: 5, title: "what we need to do 5", completed: true },
  { id: 6, title: "what we need to do 6", completed: false },
];

export default function ListTodo({ setShow }) {
  const [todos, setTodos] = useState(todosData);

  const handleShow = () => setShow(true);
  const formik = useFormik({
    initialValues: {
      filter: "",
      isCompleted: false,
    },
    onSubmit: (values) => {
      console.log(values);
      console.log(todos);
    },
    onChange: (values) => {
      const completedTodo = todos.filter(
        (todo) => todo.completed === values.isCompleted
      );
      setTodos(completedTodo);
    },
  });

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
          <Button type="submit" className={s.filter_btn} variant="primary">
            Enter
          </Button>

          <label>
            Archived
            <input
              type="checkbox"
              name="isCompleted"
              onChange={formik.handleChange}
              value={formik.values.isCompleted}
            />
          </label>
        </form>

        <Button
          className={s.newNote_btn}
          variant="primary"
          onClick={handleShow}
        >
          Add your Note
        </Button>
      </div>
      <div className={s.field_list}>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{ color: todo.completed ? "red" : "black" }}
            >
              {todo.title}
            </li>
          );
        })}
      </div>
    </div>
  );
}
