import {
  faBars,
  faDashboard,
  faTags,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./Dashboard.css";

const SideBarItems = [
  {
    itemName: "NAVIGATION",
    itemIcon: faBars,
    path: "#",
    className: "sidebar-nav"
  },
  {
    itemName: "Dashboard",
    path: "/admin/dashboard",
    itemIcon: faDashboard,
    className: ""
  },
  {
    itemName: "Catalog",
    path: "",
    itemIcon: faTags,
    className: "has-dropdown",
    subItems: [
      { itemName: "Category", path: "/admin/catalog/category" },
      { itemName: "Products", path: "/admin/catalog/products" }
    ]
  }
];

function SideBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="Nav-sec">
      <ul className="List-Dashboard">
        {SideBarItems.map((item, index) => (
          <li key={index} className={item.className}>
            <div
              className={`Sidebar-Link ${item.subItems ? "has-subitems" : ""}`}
              onClick={item.subItems ? () => toggleDropdown(index) : undefined}
            >
              <span>
                <FontAwesomeIcon icon={item.itemIcon} />
              </span>
              {item.subItems ? (
                <>
                  {item.itemName}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`dropdown-arrow ${
                      activeDropdown === index ? "rotate" : ""
                    }`}
                  />
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "Sidebar-Link"
                  }
                >
                  {item.itemName}
                </NavLink>
              )}
            </div>

            {/* Render subitems if dropdown is active */}
            {item.subItems && activeDropdown === index && (
              <ul className="dropdown sidebar-dropdown">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) =>
                        isActive ? "active-link" : "Sidebar-Link"
                      }
                    >
                      {subItem.itemName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
