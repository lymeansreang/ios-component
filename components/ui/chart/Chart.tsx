"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import CodePreview from "@/components/ui/CodePreview";

// ─── Types ──────────────────────────────────────────────────────────

interface ChartSlice {
  label: string;
  value: number;
  color: string;
}

interface LinePoint {
  label: string;
  value: number;
}

// ─── Utilities ──────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

// ─── Demo Data ──────────────────────────────────────────────────────

const pieData: ChartSlice[] = [
  { label: "Social", value: 35, color: "#3B82F6" },
  { label: "Music", value: 25, color: "#8B5CF6" },
  { label: "Games", value: 20, color: "#F59E0B" },
  { label: "Photos", value: 12, color: "#10B981" },
  { label: "Other", value: 8, color: "#6B7280" },
];

const donutData: ChartSlice[] = [
  { label: "Move", value: 72, color: "#EF4444" },
  { label: "Exercise", value: 58, color: "#22C55E" },
  { label: "Stand", value: 90, color: "#06B6D4" },
];

const lineData: LinePoint[] = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 65 },
  { label: "Sat", value: 82 },
  { label: "Sun", value: 76 },
];

// ─── Variant 1: Pie Chart ───────────────────────────────────────────

function AnimatedSlice({
  cx,
  cy,
  r,
  startAngle,
  endAngle,
  color,
  delay,
}: {
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
  color: string;
  delay: number;
}) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;

  return (
    <motion.path
      d={d}
      fill={color}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

function PieChartPreview() {
  const [selected, setSelected] = useState<number | null>(null);
  const total = pieData.reduce((sum, d) => sum + d.value, 0);
  const cx = 100;
  const cy = 100;
  const r = 85;

  let currentAngle = 0;
  const slices = pieData.map((slice) => {
    const angle = (slice.value / total) * 360;
    const start = currentAngle;
    const end = currentAngle + angle;
    currentAngle = end;
    return { ...slice, startAngle: start, endAngle: end };
  });

  return (
    <div className="w-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-5">
      <p className="text-[15px] font-semibold text-neutral-900 dark:text-white mb-1">
        Screen Time
      </p>
      <p className="text-[13px] text-neutral-500 mb-4">Weekly breakdown by category</p>

      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {slices.map((slice, i) => (
            <motion.g
              key={slice.label}
              onHoverStart={() => setSelected(i)}
              onHoverEnd={() => setSelected(null)}
              animate={{
                scale: selected === i ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              className="cursor-pointer"
            >
              <AnimatedSlice
                cx={cx}
                cy={cy}
                r={r}
                startAngle={slice.startAngle}
                endAngle={slice.endAngle}
                color={slice.color}
                delay={i * 0.1}
              />
            </motion.g>
          ))}
          <circle cx={cx} cy={cy} r={6} fill="white" className="dark:fill-neutral-900" />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {pieData.map((slice, i) => (
          <motion.div
            key={slice.label}
            className="flex items-center gap-2 px-2 py-1 rounded-lg"
            animate={{
              backgroundColor: selected === i ? "rgba(128,128,128,0.1)" : "rgba(0,0,0,0)",
            }}
            onHoverStart={() => setSelected(i)}
            onHoverEnd={() => setSelected(null)}
          >
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-[12px] text-neutral-600 dark:text-neutral-400">
              {slice.label}
            </span>
            <span className="text-[12px] font-medium text-neutral-900 dark:text-white ml-auto">
              {slice.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Variant 2: Line Graph ──────────────────────────────────────────

function LineGraphPreview() {
  const width = 280;
  const height = 160;
  const paddingX = 30;
  const paddingY = 20;
  const graphW = width - paddingX * 2;
  const graphH = height - paddingY * 2;

  const maxVal = Math.max(...lineData.map((d) => d.value));
  const minVal = 0;

  const points = lineData.map((d, i) => ({
    x: paddingX + (i / (lineData.length - 1)) * graphW,
    y: paddingY + graphH - ((d.value - minVal) / (maxVal - minVal)) * graphH,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingY + graphH} L ${points[0].x} ${paddingY + graphH} Z`;

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-5">
      <p className="text-[15px] font-semibold text-neutral-900 dark:text-white mb-1">
        Activity
      </p>
      <p className="text-[13px] text-neutral-500 mb-4">Minutes active this week</p>

      <div className="bg-white dark:bg-neutral-800 rounded-xl p-3">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = paddingY + graphH * (1 - pct);
            return (
              <g key={pct}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={paddingX + graphW}
                  y2={y}
                  className="stroke-neutral-200 dark:stroke-neutral-700"
                  strokeWidth={0.5}
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-neutral-400 text-[9px]"
                >
                  {Math.round(minVal + pct * (maxVal - minVal))}
                </text>
              </g>
            );
          })}

          {/* Gradient fill */}
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#lineGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />

          {/* Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === i ? 5 : 3}
                fill="#3B82F6"
                stroke="white"
                strokeWidth={2}
                className="dark:stroke-neutral-800 cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * i + 0.5 }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
              />
              {hoveredIdx === i && (
                <g>
                  <rect
                    x={p.x - 18}
                    y={p.y - 24}
                    width={36}
                    height={18}
                    rx={4}
                    className="fill-neutral-800 dark:fill-neutral-200"
                  />
                  <text
                    x={p.x}
                    y={p.y - 12}
                    textAnchor="middle"
                    className="fill-white dark:fill-neutral-900 text-[10px] font-medium"
                  >
                    {lineData[i].value}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* X-axis labels */}
          {lineData.map((d, i) => (
            <text
              key={d.label}
              x={points[i].x}
              y={height - 2}
              textAnchor="middle"
              className="fill-neutral-400 text-[9px]"
            >
              {d.label}
            </text>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <div>
          <p className="text-[20px] font-bold text-neutral-900 dark:text-white">
            {lineData.reduce((s, d) => s + d.value, 0)}
          </p>
          <p className="text-[11px] text-neutral-500">Total minutes</p>
        </div>
        <div className="text-right">
          <p className="text-[20px] font-bold text-blue-500">
            {Math.round(lineData.reduce((s, d) => s + d.value, 0) / lineData.length)}
          </p>
          <p className="text-[11px] text-neutral-500">Daily average</p>
        </div>
      </div>
    </div>
  );
}

// ─── Variant 3: Donut Chart (Activity Rings) ────────────────────────

function AnimatedRing({
  cx,
  cy,
  r,
  percentage,
  color,
  strokeWidth,
  delay,
}: {
  cx: number;
  cy: number;
  r: number;
  percentage: number;
  color: string;
  strokeWidth: number;
  delay: number;
}) {
  const circumference = 2 * Math.PI * r;
  const progress = useMotionValue(0);
  const dashOffset = useTransform(
    progress,
    (p) => circumference - (p / 100) * circumference
  );

  useEffect(() => {
    const controls = animate(progress, percentage, {
      delay,
      duration: 1.2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [progress, percentage, delay]);

  return (
    <g>
      {/* Background track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        className="text-neutral-200 dark:text-neutral-700"
        strokeWidth={strokeWidth}
        opacity={0.3}
      />
      {/* Foreground arc */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset: dashOffset }}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </g>
  );
}

function DonutChartPreview() {
  const cx = 90;
  const cy = 90;
  const rings = [
    { ...donutData[0], r: 72, strokeWidth: 16 },
    { ...donutData[1], r: 52, strokeWidth: 16 },
    { ...donutData[2], r: 32, strokeWidth: 16 },
  ];

  return (
    <div className="w-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-5">
      <p className="text-[15px] font-semibold text-neutral-900 dark:text-white mb-1">
        Activity Rings
      </p>
      <p className="text-[13px] text-neutral-500 mb-4">Daily progress overview</p>

      <div className="flex items-center gap-5">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {rings.map((ring, i) => (
            <AnimatedRing
              key={ring.label}
              cx={cx}
              cy={cy}
              r={ring.r}
              percentage={ring.value}
              color={ring.color}
              strokeWidth={ring.strokeWidth}
              delay={i * 0.2}
            />
          ))}
        </svg>

        <div className="flex flex-col gap-3">
          {donutData.map((item) => (
            <div key={item.label}>
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[13px] font-medium text-neutral-900 dark:text-white">
                  {item.label}
                </span>
              </div>
              <p className="text-[20px] font-bold ml-[18px]" style={{ color: item.color }}>
                {item.value}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Swift Code Strings ─────────────────────────────────────────────

const pieChartSwift = `import SwiftUI
import Charts

// MARK: - Data Model
struct ScreenTimeCategory: Identifiable {
    let id = UUID()
    let label: String
    let value: Double
    let color: Color
}

// MARK: - Pie Chart View
struct PieChartView: View {
    let data: [ScreenTimeCategory] = [
        ScreenTimeCategory(label: "Social", value: 35, color: .blue),
        ScreenTimeCategory(label: "Music", value: 25, color: .purple),
        ScreenTimeCategory(label: "Games", value: 20, color: .yellow),
        ScreenTimeCategory(label: "Photos", value: 12, color: .green),
        ScreenTimeCategory(label: "Other", value: 8, color: .gray),
    ]

    @State private var selectedSlice: ScreenTimeCategory?

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Screen Time")
                .font(.headline)
            Text("Weekly breakdown by category")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Chart(data) { item in
                SectorMark(
                    angle: .value("Value", item.value),
                    innerRadius: .ratio(0.05),
                    angularInset: 1.5
                )
                .foregroundStyle(item.color)
                .cornerRadius(4)
                .opacity(selectedSlice?.id == item.id ? 1.0 : 0.85)
            }
            .chartAngleSelection(value: $selectedSlice)
            .frame(height: 200)

            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 8) {
                ForEach(data) { item in
                    HStack(spacing: 6) {
                        Circle()
                            .fill(item.color)
                            .frame(width: 8, height: 8)
                        Text(item.label)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        Spacer()
                        Text("\\(Int(item.value))%")
                            .font(.caption)
                            .fontWeight(.medium)
                    }
                }
            }
        }
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}

// MARK: - Usage
// PieChartView()`;

const lineGraphSwift = `import SwiftUI
import Charts

// MARK: - Data Model
struct ActivityPoint: Identifiable {
    let id = UUID()
    let day: String
    let minutes: Int
}

// MARK: - Line Graph View
struct LineGraphView: View {
    let data: [ActivityPoint] = [
        ActivityPoint(day: "Mon", minutes: 45),
        ActivityPoint(day: "Tue", minutes: 72),
        ActivityPoint(day: "Wed", minutes: 58),
        ActivityPoint(day: "Thu", minutes: 90),
        ActivityPoint(day: "Fri", minutes: 65),
        ActivityPoint(day: "Sat", minutes: 82),
        ActivityPoint(day: "Sun", minutes: 76),
    ]

    var totalMinutes: Int { data.reduce(0) { $0 + $1.minutes } }
    var dailyAverage: Int { totalMinutes / data.count }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Activity")
                .font(.headline)
            Text("Minutes active this week")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Chart(data) { point in
                LineMark(
                    x: .value("Day", point.day),
                    y: .value("Minutes", point.minutes)
                )
                .interpolationMethod(.catmullRom)
                .foregroundStyle(.blue)
                .lineStyle(StrokeStyle(lineWidth: 2))

                AreaMark(
                    x: .value("Day", point.day),
                    y: .value("Minutes", point.minutes)
                )
                .interpolationMethod(.catmullRom)
                .foregroundStyle(
                    .linearGradient(
                        colors: [.blue.opacity(0.3), .blue.opacity(0)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )

                PointMark(
                    x: .value("Day", point.day),
                    y: .value("Minutes", point.minutes)
                )
                .foregroundStyle(.blue)
                .symbolSize(30)
            }
            .frame(height: 160)
            .chartYScale(domain: 0...100)

            HStack {
                VStack(alignment: .leading) {
                    Text("\\(totalMinutes)")
                        .font(.title2).bold()
                    Text("Total minutes")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                VStack(alignment: .trailing) {
                    Text("\\(dailyAverage)")
                        .font(.title2).bold()
                        .foregroundStyle(.blue)
                    Text("Daily average")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}

// MARK: - Usage
// LineGraphView()`;

const donutChartSwift = `import SwiftUI

// MARK: - Data Model
struct ActivityRing: Identifiable {
    let id = UUID()
    let label: String
    let percentage: Double
    let color: Color
}

// MARK: - Single Ring View
struct RingView: View {
    let percentage: Double
    let color: Color
    let lineWidth: CGFloat

    @State private var animatedPercentage: Double = 0

    var body: some View {
        ZStack {
            // Background track
            Circle()
                .stroke(color.opacity(0.2), lineWidth: lineWidth)

            // Foreground arc
            Circle()
                .trim(from: 0, to: animatedPercentage / 100)
                .stroke(
                    color,
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
        }
        .onAppear {
            withAnimation(.easeOut(duration: 1.2)) {
                animatedPercentage = percentage
            }
        }
    }
}

// MARK: - Activity Rings View (Donut Chart)
struct ActivityRingsView: View {
    let rings: [ActivityRing] = [
        ActivityRing(label: "Move", percentage: 72, color: .red),
        ActivityRing(label: "Exercise", percentage: 58, color: .green),
        ActivityRing(label: "Stand", percentage: 90, color: .cyan),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Activity Rings")
                .font(.headline)
            Text("Daily progress overview")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            HStack(spacing: 20) {
                ZStack {
                    ForEach(Array(rings.enumerated()), id: \\.element.id) { index, ring in
                        let size = 144.0 - Double(index) * 40
                        RingView(
                            percentage: ring.percentage,
                            color: ring.color,
                            lineWidth: 16
                        )
                        .frame(width: size, height: size)
                    }
                }
                .frame(width: 160, height: 160)

                VStack(alignment: .leading, spacing: 12) {
                    ForEach(rings) { ring in
                        VStack(alignment: .leading, spacing: 2) {
                            HStack(spacing: 6) {
                                Circle()
                                    .fill(ring.color)
                                    .frame(width: 8, height: 8)
                                Text(ring.label)
                                    .font(.subheadline)
                                    .fontWeight(.medium)
                            }
                            Text("\\(Int(ring.percentage))%")
                                .font(.title2).bold()
                                .foregroundStyle(ring.color)
                                .padding(.leading, 14)
                        }
                    }
                }
            }
        }
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}

// MARK: - Usage
// ActivityRingsView()`;

// ─── UIKit Code Strings ─────────────────────────────────────────────

const pieChartUIKit = `import UIKit

// MARK: - Data Model
struct PieSlice {
    let label: String
    let value: CGFloat
    let color: UIColor
}

// MARK: - Pie Chart View
class PieChartView: UIView {

    private let data: [PieSlice] = [
        PieSlice(label: "Social", value: 35, color: .systemBlue),
        PieSlice(label: "Music", value: 25, color: .systemPurple),
        PieSlice(label: "Games", value: 20, color: .systemYellow),
        PieSlice(label: "Photos", value: 12, color: .systemGreen),
        PieSlice(label: "Other", value: 8, color: .systemGray),
    ]

    private var sliceLayers: [CAShapeLayer] = []
    private let legendStack = UIStackView()
    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupViews() {
        backgroundColor = .secondarySystemGroupedBackground
        layer.cornerRadius = 16
        clipsToBounds = true

        titleLabel.text = "Screen Time"
        titleLabel.font = .boldSystemFont(ofSize: 15)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(titleLabel)

        subtitleLabel.text = "Weekly breakdown by category"
        subtitleLabel.font = .systemFont(ofSize: 13)
        subtitleLabel.textColor = .secondaryLabel
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(subtitleLabel)

        legendStack.axis = .vertical
        legendStack.spacing = 6
        legendStack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(legendStack)

        for slice in data {
            let row = UIStackView()
            row.axis = .horizontal
            row.spacing = 6
            row.alignment = .center

            let dot = UIView()
            dot.backgroundColor = slice.color
            dot.layer.cornerRadius = 4
            dot.translatesAutoresizingMaskIntoConstraints = false
            dot.widthAnchor.constraint(equalToConstant: 8).isActive = true
            dot.heightAnchor.constraint(equalToConstant: 8).isActive = true

            let label = UILabel()
            label.text = slice.label
            label.font = .systemFont(ofSize: 12)
            label.textColor = .secondaryLabel

            let value = UILabel()
            value.text = "\\(Int(slice.value))%"
            value.font = .systemFont(ofSize: 12, weight: .medium)
            value.textAlignment = .right

            row.addArrangedSubview(dot)
            row.addArrangedSubview(label)
            row.addArrangedSubview(value)
            legendStack.addArrangedSubview(row)
        }

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            subtitleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            legendStack.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            legendStack.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            legendStack.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16),
        ])
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        drawPie()
    }

    private func drawPie() {
        sliceLayers.forEach { $0.removeFromSuperlayer() }
        sliceLayers.removeAll()

        let total = data.reduce(0) { $0 + $1.value }
        let center = CGPoint(x: bounds.midX, y: bounds.midY - 20)
        let radius: CGFloat = 80
        var startAngle: CGFloat = -.pi / 2

        for slice in data {
            let endAngle = startAngle + (slice.value / total) * 2 * .pi
            let path = UIBezierPath()
            path.move(to: center)
            path.addArc(withCenter: center, radius: radius,
                        startAngle: startAngle, endAngle: endAngle, clockwise: true)
            path.close()

            let layer = CAShapeLayer()
            layer.path = path.cgPath
            layer.fillColor = slice.color.cgColor
            self.layer.addSublayer(layer)
            sliceLayers.append(layer)

            startAngle = endAngle
        }
    }

    func animateAppearance() {
        for (i, layer) in sliceLayers.enumerated() {
            layer.opacity = 0
            layer.transform = CATransform3DMakeScale(0.8, 0.8, 1)
            let anim = CABasicAnimation(keyPath: "opacity")
            anim.fromValue = 0
            anim.toValue = 1
            anim.duration = 0.4
            anim.beginTime = CACurrentMediaTime() + Double(i) * 0.1
            anim.fillMode = .forwards
            anim.isRemovedOnCompletion = false
            layer.add(anim, forKey: "fadeIn")

            let scale = CABasicAnimation(keyPath: "transform.scale")
            scale.fromValue = 0.8
            scale.toValue = 1.0
            scale.duration = 0.5
            scale.beginTime = anim.beginTime
            scale.timingFunction = CAMediaTimingFunction(name: .easeOut)
            scale.fillMode = .forwards
            scale.isRemovedOnCompletion = false
            layer.add(scale, forKey: "scaleIn")
        }
    }
}

// MARK: - Usage
// let pieChart = PieChartView(frame: CGRect(x: 0, y: 0, width: 320, height: 400))
// view.addSubview(pieChart)
// pieChart.animateAppearance()`;

const lineGraphUIKit = `import UIKit

// MARK: - Data Model
struct ActivityPoint {
    let day: String
    let minutes: Int
}

// MARK: - Line Graph View
class LineGraphView: UIView {

    private let data: [ActivityPoint] = [
        ActivityPoint(day: "Mon", minutes: 45),
        ActivityPoint(day: "Tue", minutes: 72),
        ActivityPoint(day: "Wed", minutes: 58),
        ActivityPoint(day: "Thu", minutes: 90),
        ActivityPoint(day: "Fri", minutes: 65),
        ActivityPoint(day: "Sat", minutes: 82),
        ActivityPoint(day: "Sun", minutes: 76),
    ]

    private let lineLayer = CAShapeLayer()
    private let gradientLayer = CAGradientLayer()
    private let gradientMask = CAShapeLayer()
    private var dotLayers: [CAShapeLayer] = []

    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()
    private let totalLabel = UILabel()
    private let totalCaption = UILabel()
    private let avgLabel = UILabel()
    private let avgCaption = UILabel()
    private let graphContainer = UIView()

    private let paddingX: CGFloat = 30
    private let paddingY: CGFloat = 20

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupViews() {
        backgroundColor = .secondarySystemGroupedBackground
        layer.cornerRadius = 16
        clipsToBounds = true

        titleLabel.text = "Activity"
        titleLabel.font = .boldSystemFont(ofSize: 15)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        subtitleLabel.text = "Minutes active this week"
        subtitleLabel.font = .systemFont(ofSize: 13)
        subtitleLabel.textColor = .secondaryLabel
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false

        graphContainer.backgroundColor = .systemBackground
        graphContainer.layer.cornerRadius = 12
        graphContainer.translatesAutoresizingMaskIntoConstraints = false

        let total = data.reduce(0) { $0 + $1.minutes }
        let avg = total / data.count

        totalLabel.text = "\\(total)"
        totalLabel.font = .boldSystemFont(ofSize: 20)
        totalLabel.translatesAutoresizingMaskIntoConstraints = false

        totalCaption.text = "Total minutes"
        totalCaption.font = .systemFont(ofSize: 11)
        totalCaption.textColor = .secondaryLabel
        totalCaption.translatesAutoresizingMaskIntoConstraints = false

        avgLabel.text = "\\(avg)"
        avgLabel.font = .boldSystemFont(ofSize: 20)
        avgLabel.textColor = .systemBlue
        avgLabel.textAlignment = .right
        avgLabel.translatesAutoresizingMaskIntoConstraints = false

        avgCaption.text = "Daily average"
        avgCaption.font = .systemFont(ofSize: 11)
        avgCaption.textColor = .secondaryLabel
        avgCaption.textAlignment = .right
        avgCaption.translatesAutoresizingMaskIntoConstraints = false

        [titleLabel, subtitleLabel, graphContainer,
         totalLabel, totalCaption, avgLabel, avgCaption].forEach { addSubview($0) }

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            subtitleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            graphContainer.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 12),
            graphContainer.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            graphContainer.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            graphContainer.heightAnchor.constraint(equalToConstant: 160),

            totalLabel.topAnchor.constraint(equalTo: graphContainer.bottomAnchor, constant: 12),
            totalLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            totalCaption.topAnchor.constraint(equalTo: totalLabel.bottomAnchor, constant: 2),
            totalCaption.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            avgLabel.topAnchor.constraint(equalTo: graphContainer.bottomAnchor, constant: 12),
            avgLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            avgCaption.topAnchor.constraint(equalTo: avgLabel.bottomAnchor, constant: 2),
            avgCaption.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            avgCaption.bottomAnchor.constraint(lessThanOrEqualTo: bottomAnchor, constant: -16),
        ])
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        drawGraph()
    }

    private func drawGraph() {
        lineLayer.removeFromSuperlayer()
        gradientLayer.removeFromSuperlayer()
        dotLayers.forEach { $0.removeFromSuperlayer() }
        dotLayers.removeAll()

        let bounds = graphContainer.bounds
        let graphW = bounds.width - paddingX * 2
        let graphH = bounds.height - paddingY * 2
        let maxVal = CGFloat(data.map(\\.minutes).max() ?? 1)

        let points: [CGPoint] = data.enumerated().map { i, d in
            CGPoint(
                x: paddingX + CGFloat(i) / CGFloat(data.count - 1) * graphW,
                y: paddingY + graphH - (CGFloat(d.minutes) / maxVal) * graphH
            )
        }

        // Line path
        let linePath = UIBezierPath()
        linePath.move(to: points[0])
        for p in points.dropFirst() { linePath.addLine(to: p) }

        lineLayer.path = linePath.cgPath
        lineLayer.fillColor = UIColor.clear.cgColor
        lineLayer.strokeColor = UIColor.systemBlue.cgColor
        lineLayer.lineWidth = 2
        lineLayer.lineCap = .round
        lineLayer.lineJoin = .round
        graphContainer.layer.addSublayer(lineLayer)

        // Gradient area
        let areaPath = UIBezierPath(cgPath: linePath.cgPath)
        areaPath.addLine(to: CGPoint(x: points.last!.x, y: paddingY + graphH))
        areaPath.addLine(to: CGPoint(x: points.first!.x, y: paddingY + graphH))
        areaPath.close()

        gradientMask.path = areaPath.cgPath
        gradientLayer.colors = [
            UIColor.systemBlue.withAlphaComponent(0.3).cgColor,
            UIColor.systemBlue.withAlphaComponent(0).cgColor
        ]
        gradientLayer.frame = bounds
        gradientLayer.mask = gradientMask
        graphContainer.layer.insertSublayer(gradientLayer, below: lineLayer)

        // Dots
        for p in points {
            let dot = CAShapeLayer()
            dot.path = UIBezierPath(ovalIn: CGRect(x: p.x - 3, y: p.y - 3, width: 6, height: 6)).cgPath
            dot.fillColor = UIColor.systemBlue.cgColor
            dot.strokeColor = UIColor.systemBackground.cgColor
            dot.lineWidth = 2
            graphContainer.layer.addSublayer(dot)
            dotLayers.append(dot)
        }

        // X-axis labels
        for (i, d) in data.enumerated() {
            let label = UILabel()
            label.text = d.day
            label.font = .systemFont(ofSize: 9)
            label.textColor = .tertiaryLabel
            label.sizeToFit()
            label.center = CGPoint(x: points[i].x, y: bounds.height - 4)
            graphContainer.addSubview(label)
        }
    }

    func animateLine() {
        let anim = CABasicAnimation(keyPath: "strokeEnd")
        anim.fromValue = 0
        anim.toValue = 1
        anim.duration = 1.0
        anim.timingFunction = CAMediaTimingFunction(name: .easeOut)
        lineLayer.add(anim, forKey: "drawLine")
    }
}

// MARK: - Usage
// let graph = LineGraphView(frame: CGRect(x: 0, y: 0, width: 320, height: 280))
// view.addSubview(graph)
// graph.animateLine()`;

const donutChartUIKit = `import UIKit

// MARK: - Data Model
struct RingData {
    let label: String
    let percentage: CGFloat
    let color: UIColor
}

// MARK: - Single Ring Layer
class RingLayer: CAShapeLayer {

    private let trackLayer = CAShapeLayer()
    private let progressLayer = CAShapeLayer()
    private let ringColor: UIColor
    private let ringWidth: CGFloat
    private let percentage: CGFloat

    init(center: CGPoint, radius: CGFloat, lineWidth: CGFloat, color: UIColor, percentage: CGFloat) {
        self.ringColor = color
        self.ringWidth = lineWidth
        self.percentage = percentage
        super.init()

        let circularPath = UIBezierPath(
            arcCenter: center,
            radius: radius,
            startAngle: -.pi / 2,
            endAngle: 1.5 * .pi,
            clockwise: true
        )

        // Background track
        trackLayer.path = circularPath.cgPath
        trackLayer.fillColor = UIColor.clear.cgColor
        trackLayer.strokeColor = color.withAlphaComponent(0.2).cgColor
        trackLayer.lineWidth = lineWidth
        trackLayer.lineCap = .round
        addSublayer(trackLayer)

        // Foreground progress
        progressLayer.path = circularPath.cgPath
        progressLayer.fillColor = UIColor.clear.cgColor
        progressLayer.strokeColor = color.cgColor
        progressLayer.lineWidth = lineWidth
        progressLayer.lineCap = .round
        progressLayer.strokeEnd = 0
        addSublayer(progressLayer)
    }

    required init?(coder: NSCoder) { fatalError() }

    func animateProgress(delay: CFTimeInterval = 0) {
        let anim = CABasicAnimation(keyPath: "strokeEnd")
        anim.fromValue = 0
        anim.toValue = percentage / 100
        anim.duration = 1.2
        anim.beginTime = CACurrentMediaTime() + delay
        anim.timingFunction = CAMediaTimingFunction(name: .easeOut)
        anim.fillMode = .forwards
        anim.isRemovedOnCompletion = false
        progressLayer.add(anim, forKey: "progress")
    }
}

// MARK: - Activity Rings View
class ActivityRingsView: UIView {

    private let rings: [RingData] = [
        RingData(label: "Move", percentage: 72, color: .systemRed),
        RingData(label: "Exercise", percentage: 58, color: .systemGreen),
        RingData(label: "Stand", percentage: 90, color: .systemCyan),
    ]

    private var ringLayers: [RingLayer] = []
    private let legendStack = UIStackView()
    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }

    required init?(coder: NSCoder) { fatalError() }

    private func setupViews() {
        backgroundColor = .secondarySystemGroupedBackground
        layer.cornerRadius = 16
        clipsToBounds = true

        titleLabel.text = "Activity Rings"
        titleLabel.font = .boldSystemFont(ofSize: 15)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(titleLabel)

        subtitleLabel.text = "Daily progress overview"
        subtitleLabel.font = .systemFont(ofSize: 13)
        subtitleLabel.textColor = .secondaryLabel
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(subtitleLabel)

        legendStack.axis = .vertical
        legendStack.spacing = 12
        legendStack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(legendStack)

        for ring in rings {
            let container = UIStackView()
            container.axis = .vertical
            container.spacing = 2

            let row = UIStackView()
            row.axis = .horizontal
            row.spacing = 6
            row.alignment = .center

            let dot = UIView()
            dot.backgroundColor = ring.color
            dot.layer.cornerRadius = 4
            dot.translatesAutoresizingMaskIntoConstraints = false
            dot.widthAnchor.constraint(equalToConstant: 8).isActive = true
            dot.heightAnchor.constraint(equalToConstant: 8).isActive = true

            let label = UILabel()
            label.text = ring.label
            label.font = .systemFont(ofSize: 13, weight: .medium)

            row.addArrangedSubview(dot)
            row.addArrangedSubview(label)

            let value = UILabel()
            value.text = "\\(Int(ring.percentage))%"
            value.font = .boldSystemFont(ofSize: 20)
            value.textColor = ring.color

            container.addArrangedSubview(row)
            container.addArrangedSubview(value)
            legendStack.addArrangedSubview(container)
        }

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            subtitleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),

            legendStack.centerYAnchor.constraint(equalTo: centerYAnchor, constant: 20),
            legendStack.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),
        ])
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        drawRings()
    }

    private func drawRings() {
        ringLayers.forEach { $0.removeFromSuperlayer() }
        ringLayers.removeAll()

        let center = CGPoint(x: 100, y: bounds.midY + 10)
        let radii: [CGFloat] = [72, 52, 32]
        let lineWidth: CGFloat = 16

        for (i, ring) in rings.enumerated() {
            let ringLayer = RingLayer(
                center: center,
                radius: radii[i],
                lineWidth: lineWidth,
                color: ring.color,
                percentage: ring.percentage
            )
            layer.addSublayer(ringLayer)
            ringLayers.append(ringLayer)
        }
    }

    func animateRings() {
        for (i, ringLayer) in ringLayers.enumerated() {
            ringLayer.animateProgress(delay: Double(i) * 0.2)
        }
    }
}

// MARK: - Usage
// let ringsView = ActivityRingsView(frame: CGRect(x: 0, y: 0, width: 320, height: 280))
// view.addSubview(ringsView)
// ringsView.animateRings()`;

// ─── Default Export ─────────────────────────────────────────────────

export default function Chart() {
  const chartStyles = [
    {
      title: "Pie Chart",
      description:
        "iOS-style pie chart with animated slices, hover interaction, and a color-coded legend.",
      preview: <PieChartPreview />,
      swiftCode: pieChartSwift,
      uikitCode: pieChartUIKit,
    },
    {
      title: "Line Graph",
      description:
        "Animated line graph with gradient fill, interactive data points, and summary statistics.",
      preview: <LineGraphPreview />,
      swiftCode: lineGraphSwift,
      uikitCode: lineGraphUIKit,
    },
    {
      title: "Donut Chart — Activity Rings",
      description:
        "Apple Watch-style activity rings with animated progress and color-coded labels.",
      preview: <DonutChartPreview />,
      swiftCode: donutChartSwift,
      uikitCode: donutChartUIKit,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Charts</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style charts with pie chart, line graph, and activity ring visualizations.
        </p>
      </div>
      <div className="space-y-4">
        {chartStyles.map((style) => (
          <CodePreview
            key={style.title}
            title={style.title}
            description={style.description}
            preview={style.preview}
            swiftCode={style.swiftCode}
            uikitCode={style.uikitCode}
          />
        ))}
      </div>
    </div>
  );
}
