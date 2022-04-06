import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { ListTodo } from "./components/ListTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/list" exact element={<ListTodo />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
