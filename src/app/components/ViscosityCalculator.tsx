'use client';
import React from "react";

type Product = "Decon HD" | "Decon (APAC)" | "Decon A" | "Decon";
type Iso = 32 | 46 | 68 | 220 | 320;

interface Range { min: number; max: number }
interface Model { label: string; fn: (t: number, v0: number) => number; range: Range }

const PRODUCT_OPTIONS: Product[] = ["Decon HD", "Decon (APAC)", "Decon A", "Decon"];
const ISO_OPTIONS_BY_PRODUCT: Record<Product, Iso[]> = {
  "Decon HD": [220, 320],
  "Decon (APAC)": [32, 46, 68],
  "Decon A": [32, 46, 68],
  "Decon": [32, 46, 68],
};
const ISO_RANGES: Record<string, Range> = {
  "Decon HD|220": { min: 198, max: 242 },
  "Decon HD|320": { min: 288, max: 352 },
  "*|32": { min: 28.8, max: 35.2 },
  "*|46": { min: 41.4, max: 50.6 },
  "*|68": { min: 61.2, max: 74.8 },
};

function getRange(product: Product, iso: Iso): Range {
  if (product === "Decon HD" && (iso === 220 || iso === 320)) {
    return ISO_RANGES[`${product}|${iso}`];
  }
  if (iso === 32 || iso === 46 || iso === 68) {
    return ISO_RANGES[`*|${iso}`];
  }
  return { min: 0, max: Number.POSITIVE_INFINITY };
}

function getModel(product: Product, iso: Iso): Model | null {
  const range = getRange(product, iso);
  switch (product) {
    case "Decon HD":
      if (iso === 220) return { label: "Decon HD · ISO 220", fn: (t,v0) => 0.0512*(t**2)-0.9478*t+v0, range };
      if (iso === 320) return { label: "Decon HD · ISO 320", fn: (t,v0) => 0.0597*(t**3)-0.9097*(t**2)+1.5115*t+v0, range };
      return null;
    case "Decon (APAC)":
      if (iso === 32) return { label: "Decon (APAC) · ISO 32", fn: (t,v0) => 0.0002*(t**3)+0.0006*(t**2)-0.2641*t+v0, range };
      if (iso === 46) return { label: "Decon (APAC) · ISO 46", fn: (t,v0) => -0.0018*(t**3)+0.0628*(t**2)-0.9119*t+v0, range };
      if (iso === 68) return { label: "Decon (APAC) · ISO 68", fn: (t,v0) => 0.0011*(t**3)+0.0103*(t**2)-1.1412*t+v0, range };
      return null;
    case "Decon A":
      if (iso === 32) return { label: "Decon A · ISO 32", fn: (t,v0) => 0.0029*(t**2)-0.3212*t+v0, range };
      if (iso === 46) return { label: "Decon A · ISO 46", fn: (t,v0) => -0.0894*(t**3)+1.2375*(t**2)-3.6959*t+v0, range };
      if (iso === 68) return { label: "Decon A · ISO 68", fn: (t,v0) => -0.0015*(t**3)+0.0893*(t**2)-2.1146*t+v0, range };
      return null;
    case "Decon":
      if (iso === 32) return { label: "Decon · ISO 32", fn: (t,v0) => 0.0029*(t**2)-0.1258*t+v0, range };
      if (iso === 46) return { label: "Decon · ISO 46", fn: (t,v0) => -0.0044*(t**2)-0.3809*t+v0, range };
      if (iso === 68) return { label: "Decon · ISO 68", fn: (t,v0) => 0.0001*(t**3)-0.0112*(t**2)-0.1359*t+v0, range };
      return null;
  }
}

export default function ViscosityCalculator() {
  const [product, setProduct] = React.useState<Product>("Decon HD");
  const [iso, setIso] = React.useState<Iso>(220);
  const [initialVis, setInitialVis] = React.useState("");
  const [treatRate, setTreatRate] = React.useState("");

  React.useEffect(() => {
    const opts = ISO_OPTIONS_BY_PRODUCT[product];
    if (!opts.includes(iso)) setIso(opts[0]);
  }, [product]);

  const t = Number(treatRate);
  const v0 = Number(initialVis);
  const errors: string[] = [];

  if (treatRate !== "" && !(t >= 0 && t <= 100)) errors.push("Treat rate must be 0–100%.");
  if (initialVis !== "" && !(v0 > 0)) errors.push("Initial viscosity must be > 0 cSt.");

  const model = getModel(product, iso);
  let actual: number | null = null;
  if (!errors.length && model && Number.isFinite(t) && Number.isFinite(v0)) {
    actual = model.fn(t, v0);
  }

  const withinRange = actual != null && model ? (actual >= model.range.min && actual <= model.range.max) : null;
  const fmt = (n: number) => n.toFixed(1);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 grid gap-8 lg:grid-cols-2 text-foreground bg-background">
      {/* Input card */}
      <div className="card rounded-xl p-6 space-y-6 shadow-soft">
        <h1 className="text-2xl font-bold">In-Service Viscosity Calculator</h1>
        <p className="text-muted">Calculate viscosity at 40 °C (cSt) based on product, ISO grade, and treat rate.</p>

        <div className="grid gap-5">
          <div>
            <label className="text-sm">Product</label>
            <select className="select" value={product} onChange={e => setProduct(e.target.value as Product)}>
              {PRODUCT_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm">ISO VG</label>
            <select className="select" value={iso} onChange={e => setIso(Number(e.target.value) as Iso)}>
              {ISO_OPTIONS_BY_PRODUCT[product].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm">Initial viscosity (cSt)</label>
            <input className="input" value={initialVis} onChange={e => setInitialVis(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Treat rate (%)</label>
            <input className="input" value={treatRate} onChange={e => setTreatRate(e.target.value)} />
          </div>
          {errors.length > 0 && <div className="text-red-600 text-sm">{errors.map((e,i)=><div key={i}>{e}</div>)}</div>}
        </div>
      </div>

      {/* Output card */}
      <div className="card rounded-xl p-6 shadow-soft space-y-4">
        <h2 className="text-xl font-bold">Resulting Viscosity at 40 °C</h2>
        <div className="bg-surface rounded-xl shadow-soft p-8 text-center">
          {actual != null ? (
            <div className="text-4xl font-extrabold">{fmt(actual)} <span className="text-lg">cSt</span></div>
          ) : <div className="text-muted">Enter values to calculate</div>}
        </div>
        {withinRange !== null && (
          <div className="text-sm">{withinRange ? "✅ Within grade range" : "⚠️ Outside nominal range"}</div>
        )}
        {model && (
          <div className="text-sm text-muted">Model: {model.label} (range {model.range.min}–{model.range.max} cSt)</div>
        )}
      </div>
    </div>
  );
}