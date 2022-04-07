import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import shortid from "shortid";

import s from "./Menu.module.css";

const Menu = () => {
  const menu = {
    title: "Menu",
    items: [
      {
        href: "/",
        title: "Home",
      },
      {
        href: "/list",
        title: "List",
      },
    ],
  };
  return (
    <NavDropdown
      title={menu.title}
      id="basic-nav-dropdown"
      menuVariant="dark"
      className={s.navDropdown_field}
    >
      <ul>
        {menu.items.map((item) => {
          return (
            <li key={shortid.generate()} className={s.dropDownItem}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive ? s.active_link : s.link
                }
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </NavDropdown>
  );
};
export default Menu;
