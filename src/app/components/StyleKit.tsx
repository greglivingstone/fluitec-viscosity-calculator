import React from "react";

export default function StyleKit() {
  return (
    <style>{`
      :root {
        --brand-primary: #0e6b74;
        --brand-primary-600: #0c5e66;
        --brand-accent: #f29900;
        --brand-accent-600: #cc8100;
        --brand-dark: #0f1c24;
        --brand-muted: #6a7d86;
        --brand-bg: #ffffff;
        --brand-surface: #f5f8f9;
        --radius-xl: 1.25rem;
        --shadow-soft: 0 8px 24px rgba(15,28,36,0.06);
      }
      body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
      .bg-background { background: var(--brand-bg); }
      .bg-surface { background: var(--brand-surface); }
      .bg-brand { background: var(--brand-primary); }
      .text-foreground { color: var(--brand-dark); }
      .text-muted { color: var(--brand-muted); }
      .shadow-soft { box-shadow: var(--shadow-soft); }
      .rounded-xl { border-radius: var(--radius-xl); }
      .card { background:#fff; border:1px solid rgba(15,28,36,0.08); }
      .input, .select {
        border:1px solid rgba(15,28,36,0.14);
        border-radius: var(--radius-xl);
        padding:10px 12px;
      }
      .input:focus, .select:focus {
        outline: 3px solid rgba(242,153,0,0.2);
      }
    `}</style>
  );
}