"use client";

import { ResponsiveContainer, AreaChart, Area, YAxis, ReferenceDot } from "recharts";
import type { PricePoint } from "@/lib/types";

interface SparklineChartProps {
  data: PricePoint[];
  color: string;
  isPositive: boolean;
  highlightLast?: boolean;
}

export function SparklineChart({ data, color, isPositive, highlightLast }: SparklineChartProps) {
  if (data.length < 2) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-px w-full bg-zinc-800" />
      </div>
    );
  }

  const chartColor = isPositive ? "#22c55e" : "#ef4444";
  const lastPoint = data[data.length - 1];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 6, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <Area
          type="monotone"
          dataKey="price"
          stroke={chartColor}
          strokeWidth={1.5}
          fill={`url(#grad-${color})`}
          dot={false}
          isAnimationActive={false}
        />
        {highlightLast && lastPoint && (
          <ReferenceDot
            x={lastPoint.time}
            y={lastPoint.price}
            r={3}
            fill={chartColor}
            stroke="#0a0a0c"
            strokeWidth={1.5}
            isFront
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
