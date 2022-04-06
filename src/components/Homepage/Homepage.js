import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import s from "./Homepage.module.css";

export default function Homepage() {
  // Change to const HomePage = () => { ...}
  return (
    <section>
      <div className={s.field}>
        <h1>Hello in your Todo List</h1>
        <p>do you want to connect to your app?</p>
        <Link to="/list">
          <Button className={s.yesBtn}>OK</Button>
        </Link>
        <Link to="/list">
          <Button className={s.noBtn} text="NO" hover-text="OK"></Button>
        </Link>
      </div>
    </section>
  );
}
