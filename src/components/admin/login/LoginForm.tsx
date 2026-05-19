"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginForm = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-bgmain flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Jasaen Hotel"
            width={150}
            height={80}
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Admin Login
        </h1>

        <p className="text-textmuted text-center mb-8">
          Sign in to access the dashboard
        </p>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;