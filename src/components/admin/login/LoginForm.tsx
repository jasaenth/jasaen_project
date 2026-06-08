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
  <div className="min-h-screen bg-bgmain flex">
    {/* Left Image */}
    <div className="hidden lg:block relative w-1/2">
      <Image
        src="/images/hero/hero1.jpg"
        alt="Jasaen Hotel"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-transparent" />

      <div className="absolute inset-0 flex items-center px-16">
        <div className="text-ivory max-w-xl">
          <div className="gold-divider mb-8">
            Admin Portal
          </div>

          <h1 className="font-display text-6xl leading-tight">
            Manage
            <br />
            Jasaen Hotel
          </h1>

          <p className="mt-6 text-lg text-ivory/80">
            Access reservations, rooms, guests and
            hotel operations from one secure dashboard.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div
        className="
          w-full
          max-w-md
          bg-ivory
          rounded-[2rem]
          shadow-luxe
          border
          border-borderlight
          p-10
        "
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Jasaen Hotel"
            width={150}
            height={70}
          />
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <span className="gold-divider justify-center mb-4">
            Admin Access
          </span>

          <h2 className="font-display text-4xl text-maroon">
            Welcome Back
          </h2>

          <p className="mt-3 text-textmuted">
            Sign in to access the dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-10"
        >
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-maroon mb-2">
              Email Address
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              type="email"
              placeholder="admin@jasaen.com"
              className="
                w-full
                rounded-2xl
                border
                border-borderlight
                px-5
                py-4
                bg-white
                outline-none
                focus:border-gold
                transition
              "
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-maroon mb-2">
              Password
            </label>

            <input
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              type="password"
              placeholder="••••••••"
              className="
                w-full
                rounded-2xl
                border
                border-borderlight
                px-5
                py-4
                bg-white
                outline-none
                focus:border-gold
                transition
              "
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-full
              bg-maroon
              hover:bg-maroon/90
              text-ivory
              py-4
              font-medium
              transition
              shadow-soft
            "
          >
            {loading
              ? "Signing In..."
              : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-textmuted">
          Jasaen Boutique Hotel Administration Portal
        </div>
      </div>
    </div>
  </div>
);
};

export default LoginForm;
