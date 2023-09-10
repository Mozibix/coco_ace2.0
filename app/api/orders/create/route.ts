import prisma from "@/app/libs/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RequestBody {
  stripe_id: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  total: string;
  products: { id: string }[];
}

export async function POST(req: { json: () => Promise<RequestBody> }) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error();

    const body = await req.json();

    const order = await prisma.orders.create({
      data: {
        user_id: user?.id,
        stripe_id: body.stripe_id,
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country,
        total: Number(body.total),
      },
    });

    for (const prod of body.products) {
      await prisma.orderItem.create({
        data: {
          order_id: order.id,
          product_id: Number(prod.id),
        },
      });
    }

    await prisma.$disconnect();
    return NextResponse.json("Order Complete", { status: 200 });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
