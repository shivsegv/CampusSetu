import React from "react";
import { Tooltip as ReTooltip, Legend as ReLegend } from "recharts";

// Minimal shadcn-style chart utilities for Recharts
// ChartContainer applies CSS vars for series colors and a consistent card style.
export function ChartContainer({ config = {}, className = "", children }) {
  const style = Object.entries(config).reduce((acc, [key, val]) => {
    const color = val?.color || val;
    if (typeof color === "string") {
      acc[`--color-${key}`] = color;
    }
    return acc;
  }, {});
  return (
    <div
      style={style}
      className={
        "rounded-3xl border border-white/70 bg-white/90 backdrop-blur p-4 shadow-soft " +
        className
      }
    >
      {children}
    </div>
  );
}

export function ChartTooltip({ content, ...props }) {
  return <ReTooltip content={content} {...props} />;
}

export function ChartTooltipContent({ active, payload, label, labelKey, nameKey }) {
  if (!active || !payload?.length) return null;
  const items = payload.map((p) => ({
    name: nameKey ? p.payload?.[nameKey] ?? p.name : p.name,
    value: p.value,
    color: p.color,
  }));
  const displayLabel = labelKey ? payload[0]?.payload?.[labelKey] ?? label : label;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow">
      {displayLabel && (
        <div className="text-xs font-medium text-slate-600 mb-2">{displayLabel}</div>
      )}
      <div className="space-y-1">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: it.color }}
              />
              <span className="text-slate-700">{it.name}</span>
            </div>
            <span className="font-semibold text-slate-900">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartLegend({ content, ...props }) {
  return <ReLegend content={content} {...props} />;
}

export function ChartLegendContent({ payload, nameKey }) {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {payload.map((entry, idx) => (
        <div key={idx} className="inline-flex items-center gap-2 px-2 py-1 rounded-full border border-slate-200 bg-white">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-700">
            {nameKey ? entry?.payload?.[nameKey] ?? entry.value : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
