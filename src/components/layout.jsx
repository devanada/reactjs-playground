import { ToastContainer } from "react-toastify";

import Navbar from "./navbar";
import { useTheme } from "@/utils/contexts/theme";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className="w-full h-screen bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white overflow-auto"
      data-theme={theme}
    >
      <Navbar />
      <div className="container mx-auto grow py-4 px-8">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick
          draggable={false}
          pauseOnHover
          theme={theme == "light" ? "light" : "dark"}
        />
      </div>
    </div>
  );
}
