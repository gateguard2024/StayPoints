import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // TODO: check manager role via Clerk org/metadata
  return (
    <ClerkProvider>
      <AppShell mode="manager">{children}</AppShell>
    </ClerkProvider>
  );
}
