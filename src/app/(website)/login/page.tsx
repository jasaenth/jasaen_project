"use client";

import React from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const page = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false);
  const [mobile, setMobile] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const validateForm = () => {
    if (!name.trim() && isSignup) {
      setError("Name is required");
      return false;
    }

    if (isSignup && (name.length < 3 || name.length > 15)) {
      setError("Name must be between 3 and 15 characters");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }

    if (isSignup) {
      if (!mobile.trim()) {
        setError("Mobile number is required");
        return false;
      }

      const mobileRegex = /^[0-9]{10}$/;

      if (!mobileRegex.test(mobile)) {
        setError("Mobile number must be 10 digits");
        return false;
      }
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (isSignup) {
      if (!confirmPassword) {
        setError("Confirm password is required");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Password and Confirm Password must match");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (isSignup) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            password,
            confirmPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        toast.success(data.message);

        setIsSignup(false);

        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");
        
      } else {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

        toast.success("Login successful");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgmain flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Jasaen Hotel" width={150} height={80} />
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <p className="text-textmuted text-center mb-8">
          {isSignup
            ? "Create your account to book rooms"
            : "Sign in to continue"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              type="text"
              placeholder="Full Name"
              className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
            />
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            type="email"
            placeholder="Email Address"
            className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
          />

          {isSignup && (
            <input
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setError("");
              }}
              type="tel"
              placeholder="Mobile Number"
              className="w-full border border-borderlight rounded-xl px-4 py-4 focus:outline-none"
            />
          )}

          <div className="relative">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-borderlight rounded-xl px-4 py-4 pr-12 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {isSignup && (
            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-borderlight rounded-xl px-4 py-4 pr-12 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}
          {isSignup && confirmPassword && password === confirmPassword && (
            <p className="text-green-600 text-sm">Passwords match</p>
          )}
          {isSignup && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold transition"
          >
            {loading
              ? isSignup
                ? "Creating Account..."
                : "Logging in..."
              : isSignup
                ? "Create Account"
                : "Login"}
          </button>

          {/* Toggle Login / Signup */}
          <div className="text-center pt-2">
            {isSignup ? (
              <p className="text-sm text-textmuted">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-sm text-textmuted">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="text-primary font-semibold hover:underline"
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderlight" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-textmuted">OR</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full border border-borderlight rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition duration-300 font-medium"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
