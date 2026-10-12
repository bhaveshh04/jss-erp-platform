"use client";

import { useEffect, useRef, useState } from "react";


export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div>
      <div
        className="tabular font-heading text-4xl font-semibold text-navy sm:text-5xl"
        aria-label={`${value}${suffix} ${label}`}
      >
        <span>{value}</span>
        <span className="text-brand">{suffix}</span>
      </div>

      <div className="mt-2 text-sm text-slate">{label}</div>
    </div>
  );
}
