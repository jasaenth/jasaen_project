// src/app/api/payment/create-session/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const {
      roomId,
      roomName,
      amount,
      checkIn,
      checkOut,
      guests,
      currency,
    } = await req.json();

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: [
          {
            price_data: {
              currency: currency || "thb",

              product_data: {
                name: roomName,
              },

              unit_amount:
                amount * 100,
            },

            quantity: 1,
          },
        ],

        mode: "payment",

        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&amount=${amount}`,

        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/rooms/${roomId}`,
      });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}