import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-navy px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-gold-primary/30">
          ⭐
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Stay<span className="text-gold-bright">Points</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Your home. Your rewards.
        </p>
      </div>

      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#C9993A",
            colorBackground: "#112240",
            colorText: "#F1F5F9",
            colorInputBackground: "#0A1628",
            colorInputText: "#F1F5F9",
            borderRadius: "0.75rem",
          },
        }}
      />
    </main>
  );
}
