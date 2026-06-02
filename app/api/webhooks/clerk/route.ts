import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getInitials } from "@/lib/utils";

type ClerkUserCreatedEvent = {
  type: "user.created";
  data: {
    id: string;
    email_addresses: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
  };
};

/**
 * Clerk webhook — creates a resident record in Supabase when a user signs up.
 * Configure in Clerk Dashboard → Webhooks → user.created
 */
export async function POST(req: Request) {
  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let event: ClerkUserCreatedEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserCreatedEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses[0]?.email_address ?? "";
    const displayName = [first_name, last_name].filter(Boolean).join(" ") || email;

    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("residents") as any).insert({
      clerk_user_id: id,
      email,
      display_name: displayName,
      initials: getInitials(displayName),
      // property_id must be set after onboarding flow
      property_id: "00000000-0000-0000-0000-000000000000",
      unit_number: "TBD",
      tier: "bronze",
      points_balance: 0,
      lifetime_points: 0,
      current_streak: 0,
      longest_streak: 0,
      lease_start_date: new Date().toISOString().split("T")[0],
      lease_end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      is_at_risk: false,
    });
  }

  return NextResponse.json({ received: true });
}
