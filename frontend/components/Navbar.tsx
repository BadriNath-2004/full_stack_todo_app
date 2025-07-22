import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout(); // will automatically redirect to login
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-primary transition duration-300">
          {t("appTitle")}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {user ? (
          <>
            <Link href="/todos" className="text-gray-700 font-medium hover:text-primary transition duration-300">
              {t("todos")}
            </Link>
            <Link href="/profile" className="flex items-center gap-1 text-gray-700 hover:text-primary transition duration-300">
              <UserCircleIcon className="w-5 h-5" />
              {t("profile")}
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 font-medium hover:text-red-500 transition duration-300"
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 font-medium hover:text-primary transition duration-300">
              {t("login")}
            </Link>
            <Link href="/signup" className="text-gray-700 font-medium hover:text-primary transition duration-300">
              {t("register")}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
