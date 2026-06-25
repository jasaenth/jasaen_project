"use client";

import React from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

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

  const handleGoogleLogin = async (credential: string) => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Logged in with Google");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgmain py-20">
      <div className="min-h-[calc(50vh-70px)] grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative hidden lg:block">
          <Image
            src="/images/hero/hero1.jpg"
            alt="Jasaen Hotel"
            fill
            className="object-cover"
            priority
          />

          {/* Luxury Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-maroon/90 via-maroon/80 to-black/60" />

          <div className="relative z-10 h-full flex flex-col justify-center px-16 text-white">
            <span className="gold-divider text-gold mb-8">
              MEMBER PRIVILEGES
            </span>

            <h2 className="font-display text-6xl leading-tight max-w-xl">
              {isSignup ? (
                <>
                  Create your
                  <br />
                  <span className="text-gold">luxury account.</span>
                </>
              ) : (
                <>
                  Sign in to unlock
                  <br />
                  <span className="text-gold">exclusive rates.</span>
                </>
              )}
            </h2>

            <div className="mt-10 space-y-4 text-lg text-white/80">
              <p>• Up to 15% off direct bookings</p>
              <p>• Complimentary welcome experience</p>
              <p>• Faster reservations & check-in</p>
              <p>• Priority access to room offers</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-xl">
            <span className="gold-divider mb-5">
              {isSignup ? "CREATE ACCOUNT" : "SIGN IN"}
            </span>

            <h1 className="font-display text-5xl text-maroon">
              {isSignup ? "Join Jasaen" : "Welcome back"}
            </h1>

            <p className="mt-3 text-textmuted text-lg">
              {isSignup
                ? "Create your account and start booking."
                : "Continue your Jasaen journey."}
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {/* NAME */}
              {isSignup && (
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-maroon mb-3">
                    Full Name
                  </label>

                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    type="text"
                    placeholder="John Doe"
                    className="
                    w-full
                    rounded-full
                    border
                    border-borderlight
                    px-6
                    py-4
                    outline-none
                    focus:border-gold
                  "
                  />
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-maroon mb-3">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  type="email"
                  placeholder="you@email.com"
                  className="
                  w-full
                  rounded-full
                  border
                  border-borderlight
                  px-6
                  py-4
                  outline-none
                  focus:border-gold
                "
                />
              </div>

              {/* MOBILE */}
              {isSignup && (
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-maroon mb-3">
                    Mobile
                  </label>

                  <input
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setError("");
                    }}
                    type="tel"
                    placeholder="Phone Number"
                    className="
                    w-full
                    rounded-full
                    border
                    border-borderlight
                    px-6
                    py-4
                    outline-none
                    focus:border-gold
                  "
                  />
                </div>
              )}

              {/* PASSWORD */}
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-maroon mb-3">
                  Password
                </label>

                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="
                    w-full
                    rounded-full
                    border
                    border-borderlight
                    px-6
                    py-4
                    pr-14
                    outline-none
                    focus:border-gold
                  "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                  "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              {isSignup && (
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-maroon mb-3">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="
                      w-full
                      rounded-full
                      border
                      border-borderlight
                      px-6
                      py-4
                      pr-14
                      outline-none
                      focus:border-gold
                    "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                    "
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-maroon
                hover:bg-maroon/90
                text-white
                py-4
                rounded-full
                font-medium
                transition
              "
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? "Create Account"
                    : "Sign In"}
              </button>

              {/* GOOGLE */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (!credentialResponse.credential) return;

                    handleGoogleLogin(credentialResponse.credential);
                  }}
                  onError={() => {
                    toast.error("Google Login Failed");
                  }}
                  theme="outline"
                  size="large"
                  shape="pill"
                  width="380"
                />
              </div>

              {/* TOGGLE */}
              <div className="text-center pt-2">
                {isSignup ? (
                  <p className="text-textmuted">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(false)}
                      className="text-maroon font-medium"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p className="text-textmuted">
                    New to Jasaen?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignup(true)}
                      className="text-maroon font-medium"
                    >
                      Create an account
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
