'use client';
// app/page.tsx  (or src/app/page.tsx if you used --src-dir)
import React from "react";
import StyleKit from "./components/StyleKit";
import ViscosityCalculator from "./components/ViscosityCalculator";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StyleKit />

  <header className="bg-white border-b">
    <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-3">
      <Image
        src="/Logo Fluitec Color ICON 2020.png"   
        alt="Fluitec logo"
        width={40}                // tweak sizes
        height={40}
        className="h-10 w-auto"
        priority
      />
      <span className="font-semibold tracking-tight">Fluitec Calculator</span>
    </div>
  </header>

      <ViscosityCalculator />

      <footer className="border-t mt-10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-muted">
          © Fluitec — In-Service Viscosity Calculator
        </div>
      </footer>
    </main>
  );
}
