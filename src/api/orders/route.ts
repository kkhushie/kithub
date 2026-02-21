import { supabaseServer } from "@/lib/supabaseServer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const body = await req.json()

  const {
    userId,
    productId,
    paymentId,
    amount
  } = body

  const { error } = await supabaseServer
    .from("orders")
    .insert({
      user_id: userId,
      product_id: productId,
      razorpay_payment_id: paymentId,
      amount,
      status: "paid"
    })

  if (error)
    return NextResponse.json({ error })

  return NextResponse.json({ success: true })
}