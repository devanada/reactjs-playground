import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useTheme } from "@/utils/contexts/theme";
import { useToken } from "@/utils/contexts/token";
import { toast } from "react-toastify";

export default function Navbar() {
  const { theme, changeTheme } = useTheme();
  const { token, changeToken } = useToken();

  function handleLogout() {
    changeToken();
    toast.success("Successfully logout");
  }

  return (
    <header
      className="w-full sticky top-0 bg-white dark:bg-neutral-800"
      aria-label="navbar"
    >
      <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:text-sm [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900 [&>*]:dark:text-white">
        <Link to="/">Home</Link>
        <div className="flex gap-4 items-center justify-end">
          {token === "" ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/products">Products</Link>
              <p className="cursor-pointer" onClick={() => handleLogout()}>
                Logout
              </p>
            </>
          )}
          {theme === "light" ? (
            <FaMoon
              aria-label="btn-theme-dark"
              size={25}
              onClick={() => changeTheme()}
            />
          ) : (
            <FaSun
              aria-label="btn-theme-light"
              size={25}
              onClick={() => changeTheme()}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
