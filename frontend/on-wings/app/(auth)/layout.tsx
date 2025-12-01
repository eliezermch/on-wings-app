import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex flex-col px-8 items-center justify-center min-h-screen bg-background">
      {children}
    </div>
  );
}
