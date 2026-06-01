import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

export default async function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <AppShell mode="resident">{children}</AppShell>;
}
