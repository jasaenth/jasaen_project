"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

function PaymentSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createBooking = async () => {
      try {
        const res = await fetch(
          "/api/bookings",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              roomId:
                params.get("roomId"),
              checkIn:
                params.get("checkIn"),
              checkOut:
                params.get("checkOut"),
              guests: Number(
                params.get("guests")
              ),
              totalAmount: Number(
                params.get("amount")
              ),
              paymentId:
                params.get(
                  "session_id"
                ),
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          toast.error(
            data.message ||
              "Booking failed"
          );
          return;
        }

        toast.success(
          "Booking confirmed!"
        );

        setTimeout(() => {
          router.replace(
            "/my-bookings"
          );
        }, 2000);
      } catch (error) {
        console.error(error);

        toast.error(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    createBooking();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgmain px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
        <CheckCircle
          className="mx-auto text-green-600 mb-4"
          size={70}
        />

        <h1 className="text-3xl font-bold text-primary mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-600">
          {loading
            ? "Confirming your booking..."
            : "Booking confirmed. Redirecting to My Bookings..."}
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}