import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: { json: () => Promise<any> }) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error();

    const body = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SK_KEY || "", {
      apiVersion: "2023-08-16",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(body.amount),
      currency: "gbp",
    });

    await stripe.paymentIntents.update(paymentIntent.id, {
      payment_method: body.paymentMethodId,
    });

    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
