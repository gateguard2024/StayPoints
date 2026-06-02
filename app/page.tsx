import { redirect } from "next/navigation";

/**
 * Root route — send everyone to /demo for the public demo.
 * Authenticated routing is handled inside /dashboard layout.
 */
export default function RootPage() {
  redirect("/demo");
}
