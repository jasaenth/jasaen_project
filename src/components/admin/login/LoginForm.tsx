"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/redux";
import { useState } from "react";
import { setUser } from "@/store/slices/authSlice";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      dispatch(setUser(data.user));

setTimeout(() => {
  router.replace("/admin/dashboard");
}, 100);
    } catch (error) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgmain flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Jasaen Hotel" width={150} height={80} />
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Admin Login
        </h1>

        <p className="text-textmuted text-center mb-8">
          Sign in to access the dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
