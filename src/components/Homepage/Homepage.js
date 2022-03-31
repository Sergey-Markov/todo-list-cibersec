import { Button } from "react-bootstrap";
import s from "./Homepage.module.css";

export default function Homepage({ setShow }) {
  return (
    <div className={s.field}>
      <h1>Hello in your Todo List</h1>
      <p>do you want to connect to your app?</p>
      <Button variant="primary" onClick="">
        yes
      </Button>
      <button>no</button>
    </div>
  );
}
