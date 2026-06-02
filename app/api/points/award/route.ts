import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { awardPoints } from "@/lib/points/engine";
import { createServerClient } from "@/lib/supabase/server";

const schema = z.object({
  event: z.enum([
    "rent_on_time", "rent_late", "lease_renewal", "referral_signed",
    "event_attendance", "survey_completed", "review_submitted",
    "maintenance_app", "custom",
  ]),
  points: z.number().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Get resident ID from Clerk user
  const supabase = await createServerClient();
  const residentResult = await supabase
    .from("residents")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();
  const resident = (residentResult.data as unknown) as { id: string } | null;

  if (!resident) return NextResponse.json({ error: "Resident not found" }, { status: 404 });

  const result = await awardPoints({
    residentId: resident.id,
    event: parsed.data.event,
    points: parsed.data.points,
    metadata: parsed.data.metadata,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ pointsAwarded: result.pointsAwarded });
}
