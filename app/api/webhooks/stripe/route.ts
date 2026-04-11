import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClerkSupabaseClient } from "@/lib/clerk-supabase"

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClerkSupabaseClient()

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any
      const userId = session.metadata?.userId

      if (userId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        ) as any

        await supabase.from("user_subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          plan: session.metadata?.plan || "pro",
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        } as any)
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as any
      const customerId = subscription.customer

      const { data: user } = await supabase
        .from("user_subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .single() as any

      if (user) {
        await supabase.from("user_subscriptions").upsert({
          user_id: user.user_id,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        } as any)
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as any
      const customerId = subscription.customer

      const { data: user } = await supabase
        .from("user_subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", customerId)
        .single() as any

      if (user) {
        await supabase.from("user_subscriptions").delete().eq("user_id", user.user_id)
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}