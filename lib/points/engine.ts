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
    const { data: rule } = await supabase
      .from("point_rules")
      .select("points")
      .eq("event_key", event)
      .eq("is_active", true)
      .single();
    pointsToAward = rule?.points ?? pointsToAward;
  }

  if (pointsToAward <= 0) return { success: false, error: "No points to award" };

  // Insert transaction
  const { error: txError } = await supabase.from("point_transactions").insert({
    resident_id: residentId,
    points: pointsToAward,
    type: "earn",
    reason: event,
    metadata,
  });

  if (txError) return { success: false, error: txError.message };

  // Update resident balance (use RPC for atomicity)
  const { error: balanceError } = await supabase.rpc("increment_points_balance", {
    p_resident_id: residentId,
    p_points: pointsToAward,
  });

  if (balanceError) return { success: false, error: balanceError.message };

  // Update tier based on new balance
  await supabase.rpc("update_resident_tier", { p_resident_id: residentId });

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
  const { data: resident } = await supabase
    .from("residents")
    .select("points_balance")
    .eq("id", residentId)
    .single();

  if ((resident?.points_balance ?? 0) < points) {
    return { success: false, error: "Insufficient points" };
  }

  const { error } = await supabase.from("point_transactions").insert({
    resident_id: residentId,
    points: -points,
    type: "redeem",
    reason: `reward:${rewardId}`,
  });

  if (error) return { success: false, error: error.message };

  await supabase.rpc("increment_points_balance", {
    p_resident_id: residentId,
    p_points: -points,
  });

  return { success: true };
}
