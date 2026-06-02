import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { redeemPoints } from "@/lib/points/engine";
import { createServerClient } from "@/lib/supabase/server";

const schema = z.object({
  rewardId: z.string().uuid(),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createServerClient();

  const [residentResult, rewardResult] = await Promise.all([
    supabase.from("residents").select("id, points_balance").eq("clerk_user_id", userId).single(),
    supabase.from("rewards").select("id, points_cost, name").eq("id", parsed.data.rewardId).eq("is_active", true).single(),
  ]);
  const resident = (residentResult.data as unknown) as { id: string; points_balance: number } | null;
  const reward = (rewardResult.data as unknown) as { id: string; points_cost: number; name: string } | null;

  if (!resident) return NextResponse.json({ error: "Resident not found" }, { status: 404 });
  if (!reward) return NextResponse.json({ error: "Reward not found or unavailable" }, { status: 404 });

  const result = await redeemPoints({
    residentId: resident.id,
    rewardId: reward.id,
    points: reward.points_cost,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, reward: reward.name });
}
