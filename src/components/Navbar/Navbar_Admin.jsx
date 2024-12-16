import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "../AppearanceModes/mode-toggle";
import axios from "axios";

function Navbar() {
  // Get Data from database
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get current path
  const location = useLocation();

  // Determine label based on URL
  const getLabel = () => {
    if (location.pathname === "/web") {
      return "Dashboard";
    } else if (location.pathname === "/web/management") {
      return "Satuan Ukuran";
    } else if (location.pathname === "/web/transaksi") {
      return "Transaksi";
    } else {
      return "";
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 py-4 z-50">
      <div className="flex items-center px-4 w-full">
        {/* Logo on the Left */}
        <div className="flex items-center">
          <img src="/images/resikel.png" alt="logo" className="w-auto" />
        </div>

        {/* Dynamic Label with search bar */}
        <div className="flex items-center ml-16 gap-6">
          {/* Dynamic Text */}
          <span className="font-bold text-gray-900 dark:text-white">
            {getLabel()}
          </span>

          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search..."
              className="text-gray-700 dark:text-white text-base placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-l-md w-64"
            />
            <button className="hover:bg-gray-200 px-4 py-2 text-white font-medium rounded-r-md flex items-center justify-center">
              <i className="uil uil-search text-gray-600"></i>
            </button>
          </div>
        </div>

        {/* Profile Button and Mode Toggle on the Right */}
        <div className="flex items-center gap-4 ml-auto relative">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 text-white hover:bg-gray-600">
            <i className="uil uil-user"></i>
          </button>

          {/* Nama Pengguna */}
          <span className="text-gray-700 dark:text-white">Admin</span>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
              <ul className="text-gray-900 dark:text-white">
                <li>
                  <Link
                    to="/user-settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    User Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
