
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("mailflow-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode
      ? "dark"
      : "light";

    localStorage.setItem(
      "mailflow-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Routes>
        <Route
          path="/"
          element={
            <Inbox
              darkMode={darkMode}
              onThemeToggle={toggleTheme}
            />
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}
