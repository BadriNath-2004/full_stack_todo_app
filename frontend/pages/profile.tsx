import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { User, Mail, CalendarCheck } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
}

export default function Profile() {
  const { t } = useTranslation();
  const { token, logout, user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Profile error:", err);
        logout();
      }
    };

    fetchProfile();
  }, [token, logout, user]);

  if (!profile)
    return (
      <Layout>
        <div className="p-8 text-center text-gray-500">{t("loading_profile")}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-100 to-white px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {t("profile")}
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <User className="text-indigo-500 w-5 h-5" />
              <p className="text-md">
                <span className="font-medium">{t("name")}:</span> {profile.name}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500 w-5 h-5" />
              <p className="text-md">
                <span className="font-medium">{t("email")}:</span> {profile.email}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CalendarCheck className="text-indigo-500 w-5 h-5" />
              <p className="text-md">
                <span className="font-medium">{t("joined")}:</span>{" "}
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={logout}
              className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-all duration-200"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
