import DemoShell from "@/components/demo/DemoShell";

export const metadata = {
  title: { default: "StayPoints Demo", template: "%s | StayPoints Demo" },
  description: "StayPoints interactive demo — gamified tenant retention platform.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
