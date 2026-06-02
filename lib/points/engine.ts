import { createAdminClient } from "@/lib/supabase/server";

export type PointEvent =
  | "rent_on_time"
  | "rent_late"
  | "lease_renewal"
  | "referral_signed"
  | "event_attendance"
  | "survey_completed"
  | "review_submitted"
  | "maintenance_app"
  | "custom";

interface AwardPointsParams {
  residentId: string;
  event: PointEvent;
  points?: number;   // override default for "custom" events
  metadata?: Record<string, unknown>;
}

/**
 * Award points to a resident and update their balance + streak.
 * Always runs server-side with the admin client (bypasses RLS).
 */
export async function awardPoints({
  residentId,
  event,
  points,
  metadata,
}: AwardPointsParams) {
  const supabase = createAdminClient();

  // Look up point rule if not custom
  let pointsToAward = points ?? 0;
  if (event !== "custom") {
    const ruleResult = await supabase
      .from("point_rules")
      .select("points")
      .eq("event_key", event)
      .eq("is_active", true)
      .single();
    const rule = (ruleResult.data as unknown) as { points: number } | null;
    pointsToAward = rule?.points ?? pointsToAward;
  }

  if (pointsToAward <= 0) return { success: false, error: "No points to award" };

  // Insert transaction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: txError } = await (supabase.from("point_transactions") as any).insert({
    resident_id: residentId,
    points: pointsToAward,
    type: "earn",
    reason: event,
    metadata,
  });

  if (txError) return { success: false, error: txError.message };

  // Update resident balance (use RPC for atomicity)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: balanceError } = await (supabase as any).rpc("increment_points_balance", {
    p_resident_id: residentId,
    p_points: pointsToAward,
  });

  if (balanceError) return { success: false, error: balanceError.message };

  // Update tier based on new balance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).rpc("update_resident_tier", { p_resident_id: residentId });

  return { success: true, pointsAwarded: pointsToAward };
}

/**
 * Redeem points from a resident's balance.
 */
export async function redeemPoints({
  residentId,
  rewardId,
  points,
}: {
  residentId: string;
  rewardId: string;
  points: number;
}) {
  const supabase = createAdminClient();

  // Check balance
  const balanceResult = await supabase
    .from("residents")
    .select("points_balance")
    .eq("id", residentId)
    .single();
  const resident = (balanceResult.data as unknown) as { points_balance: number } | null;

  if ((resident?.points_balance ?? 0) < points) {
    return { success: false, error: "Insufficient points" };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("point_transactions") as any).insert({
    resident_id: residentId,
    points: -points,
    type: "redeem",
    reason: `reward:${rewardId}`,
  });

  if (error) return { success: false, error: error.message };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).rpc("increment_points_balance", {
    p_resident_id: residentId,
    p_points: -points,
  });

  return { success: true };
}
