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
      { itemName: "Services", path: "/admin/services" },
      { itemName: "Products", path: "/admin/products" },
      { itemName: "Orders", path: "/admin/orders" }
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
        {SideBarItems.map((value, index) => (
          <li key={index} className={value.className}>
            {/* Use NavLink instead of Link */}
            <NavLink
              to={value.path}
              className="Sidebar-Link"
              activeClassName="active-link" // This adds 'active-link' class when the link is active
              exact
              onClick={value.subItems ? () => toggleDropdown(index) : undefined}
            >
              <span>
                <FontAwesomeIcon icon={value.itemIcon} />
              </span>
              {value.itemName}
              {value.subItems && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`dropdown-arrow ${
                    activeDropdown === index ? "rotate" : ""
                  }`}
                />
              )}
            </NavLink>

            {/* Render subitems if dropdown is active */}
            {value.subItems && activeDropdown === index && (
              <ul className="dropdown sidebar-dropdown">
                {value.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink
                      to={subItem.path}
                      className="Sidebar-Link"
                      activeClassName="active-link"
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
