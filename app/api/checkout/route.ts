import { NextResponse } from "next/server"
import { stripe, PRICE_IDS } from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { plan, billing } = body

  const priceIds: Record<string, string> = {
    pro_monthly: PRICE_IDS.pro_monthly,
    pro_yearly: PRICE_IDS.pro_yearly,
    team_monthly: PRICE_IDS.team_monthly,
    team_yearly: PRICE_IDS.team_yearly,
  }

  const priceId = priceIds[`${plan}_${billing}`]
  
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      subscription_data: {
        metadata: {
          userId,
          plan,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
  }
}