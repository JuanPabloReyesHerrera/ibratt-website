import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function HeaderBack() {
  const router = useRouter();

  return (
    <header className="border-b border-zinc-900 px-6 py-4 animate-in slide-in-from-top duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        {/* Logo / brand */}
        <span className="text-zinc-600 text-sm tracking-widest uppercase font-medium">
          Ibratt
        </span>

        {/* Spacer para centrar el logo */}
        <div className="w-16" />
      </div>
    </header>
  );
}
