import Image from "next/image";
import HeroSection from "./hero";

export default function Home() {
  return (
    <div className=" flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-background via-foreground/100 to-foreground font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between dark:bg-black sm:items-start shadow-background shadow-2xl rounded-lg overflow-hidden">
        <div className="relative w-full h-screen ">
          <Image
            className="object-cover"
            src="/assets/hero.jpg"
            alt="Hero"
            fill
          />
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-gradient-to-b from-transparent via-transparent/30 to-foreground py-32 px-16 text-primary-foreground">
            <HeroSection
              socialMedia={[
                {
                  page: "instagram",
                  link: "instagram",
                  className:
                    "bg-gradient-to-bl from-purple-600 via-pink-500 to-yellow-400",
                },
                { page: "youtube", link: "youtube", className: "bg-white" },
                {
                  page: "github",
                  link: "github",
                  className: "bg-gray-800",
                },
                {
                  page: "x",
                  link: "x",
                  className: "bg-black",
                },
              ]}
            />
          </div>
        </div>
      </main>
      <div className="min-h-screen bg-background p-10 font-sans transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Paleta de Ibratt
            </h1>
            <p className="text-muted-foreground">
              Previsualización de variables Shadcn
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Bloque Fondo/Texto */}
            <div className="p-6 rounded-xl border border-border bg-background text-foreground shadow-sm">
              <p className="font-semibold mb-1">Background</p>
              <p className="text-sm opacity-70">Texto Principal</p>
            </div>

            {/* Bloque Tarjetas */}
            <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
              <p className="font-semibold mb-1">Card</p>
              <p className="text-sm opacity-70">Contenido Card</p>
            </div>

            {/* Bloque Botón Principal */}
            <div className="p-6 rounded-xl bg-primary text-primary-foreground shadow-sm flex items-center justify-center">
              <p className="font-semibold">Primary Button</p>
            </div>

            {/* Bloque Botón Secundario */}
            <div className="p-6 rounded-xl bg-secondary text-secondary-foreground shadow-sm flex items-center justify-center">
              <p className="font-semibold">Secondary</p>
            </div>

            {/* Bloque Muted */}
            <div className="p-6 rounded-xl bg-muted text-muted-foreground border border-border">
              <p className="font-semibold mb-1">Muted</p>
              <p className="text-sm">BPM, Fechas, Tags</p>
            </div>

            {/* Bloque Accent / Hover */}
            <div className="p-6 rounded-xl bg-accent text-accent-foreground">
              <p className="font-semibold mb-1">Accent</p>
              <p className="text-sm">Efecto Hover</p>
            </div>

            {/* Inputs de prueba */}
            <div className="col-span-2 flex items-center gap-4 p-4 border border-border rounded-xl bg-background">
              <input
                type="text"
                placeholder="Escribe un beat..."
                className="bg-input text-foreground border border-border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
