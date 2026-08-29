import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bgmain flex items-center justify-center">
          <p className="text-textmuted">Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}