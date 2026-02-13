"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import CodePreview from "@/components/ui/CodePreview";

type Segment = {
  id: string;
  label: string;
};

const defaultSegments: Segment[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

const mediaSegments: Segment[] = [
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "albums", label: "Albums" },
  { id: "favorites", label: "Favorites" },
];

const settingsSegments: Segment[] = [
  { id: "general", label: "General" },
  { id: "privacy", label: "Privacy" },
  { id: "notifications", label: "Notifications" },
];

// ---------------------------------------------------------------------------
// Shared animated indicator hook
// ---------------------------------------------------------------------------

function useIndicator(
  activeId: string,
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [style, setStyle] = useState({ left: 0, width: 0 });

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLButtonElement>(
      `[data-segment-id="${activeId}"]`
    );
    if (!btn) return;
    setStyle({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
    });
  }, [activeId, containerRef]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return style;
}

// ---------------------------------------------------------------------------
// Default Segment Control
// ---------------------------------------------------------------------------

function DefaultSegmentControl({
  segments,
  activeId,
  onChange,
}: {
  segments: Segment[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indicator = useIndicator(activeId, ref);

  return (
    <div
      ref={ref}
      className="relative flex w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1"
    >
      <span
        className="absolute top-1 bottom-1 rounded-[10px] bg-white dark:bg-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
        style={{
          left: indicator.left,
          width: indicator.width,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {segments.map((seg) => {
        const isActive = activeId === seg.id;
        return (
          <button
            key={seg.id}
            data-segment-id={seg.id}
            onClick={() => onChange(seg.id)}
            className={`relative z-10 min-w-0 flex-1 truncate px-3 py-2 text-center text-sm font-medium rounded-[10px] transition-colors duration-200 ${
              isActive
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            }`}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Glass Segment Control
// ---------------------------------------------------------------------------

function GlassSegmentControl({
  segments,
  activeId,
  onChange,
}: {
  segments: Segment[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indicator = useIndicator(activeId, ref);

  return (
    <div
      ref={ref}
      className="relative flex w-full rounded-2xl border border-white/25 dark:border-white/10 bg-white/15 dark:bg-white/5 backdrop-blur-xl p-1 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <span
        className="absolute top-1 bottom-1 rounded-xl bg-white/70 dark:bg-white/15 border border-white/50 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        style={{
          left: indicator.left,
          width: indicator.width,
          transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {segments.map((seg) => {
        const isActive = activeId === seg.id;
        return (
          <button
            key={seg.id}
            data-segment-id={seg.id}
            onClick={() => onChange(seg.id)}
            className={`relative z-10 min-w-0 flex-1 truncate px-3 py-2 text-center text-sm font-medium rounded-xl transition-colors duration-200 ${
              isActive
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-white"
            }`}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pill Segment Control (iOS style)
// ---------------------------------------------------------------------------

function PillSegmentControl({
  segments,
  activeId,
  onChange,
}: {
  segments: Segment[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indicator = useIndicator(activeId, ref);

  return (
    <div
      ref={ref}
      className="relative flex w-full rounded-full bg-neutral-100 dark:bg-neutral-800 p-1"
    >
      <span
        className="absolute top-1 bottom-1 rounded-full bg-neutral-900 dark:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        style={{
          left: indicator.left,
          width: indicator.width,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {segments.map((seg) => {
        const isActive = activeId === seg.id;
        return (
          <button
            key={seg.id}
            data-segment-id={seg.id}
            onClick={() => onChange(seg.id)}
            className={`relative z-10 min-w-0 flex-1 truncate px-3 py-2 text-center text-sm font-semibold rounded-full transition-colors duration-200 ${
              isActive
                ? "text-white dark:text-neutral-900"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            }`}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Content containers — smooth transitions without reloading
// ---------------------------------------------------------------------------

const defaultContent: Record<string, { title: string; body: string }> = {
  all: { title: "All Tasks", body: "Showing all 24 tasks across every status." },
  active: { title: "Active Tasks", body: "12 tasks currently in progress." },
  completed: { title: "Completed", body: "12 tasks finished this sprint." },
};

const mediaContent: Record<string, { title: string; body: string }> = {
  photos: { title: "Photos", body: "1,284 photos in your library." },
  videos: { title: "Videos", body: "36 videos saved to your device." },
  albums: { title: "Albums", body: "8 albums organized by date." },
  favorites: { title: "Favorites", body: "142 items marked as favorites." },
};

const settingsContent: Record<string, { title: string; body: string }> = {
  general: { title: "General", body: "Language, region, and appearance." },
  privacy: { title: "Privacy", body: "Data, permissions, and tracking." },
  notifications: { title: "Notifications", body: "Alerts, sounds, and badges." },
};

function ContentPanel({
  content,
  activeId,
  glass,
}: {
  content: Record<string, { title: string; body: string }>;
  activeId: string;
  glass?: boolean;
}) {
  const entry = content[activeId];
  if (!entry) return null;

  return (
    <div
      className={`mt-3 overflow-hidden rounded-2xl ${
        glass
          ? "bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10"
          : "bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800"
      }`}
    >
      <div
        key={activeId}
        className="px-4 py-3.5 animate-[segmentFadeIn_0.3s_ease-out]"
      >
        <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
          {entry.title}
        </p>
        <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-0.5">
          {entry.body}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// iPhone Frame
// ---------------------------------------------------------------------------

function PhoneFrame({
  children,
  bgClass,
}: {
  children: React.ReactNode;
  bgClass?: string;
}) {
  return (
    <div
      className={`w-full rounded-2xl p-1 ${
        bgClass ?? "bg-white dark:bg-neutral-950"
      }`}
    >
      <div className="px-2 pt-2 pb-1">
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Swift code
// ---------------------------------------------------------------------------

const segmentControlSwiftCode = `import UIKit

final class SegmentedControl: UIView {

    struct Segment {
        let id: String
        let title: String
    }

    enum Style { case \`default\`, glass, pill }

    // MARK: - Subviews

    private let containerView: UIView = {
        let view = UIView()
        view.clipsToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let indicatorView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.distribution = .fillEqually
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    // MARK: - Properties

    var segments: [Segment] = [] {
        didSet { rebuild() }
    }

    var selectedIndex: Int = 0 {
        didSet { moveIndicator(animated: true) }
    }

    var onChange: ((Int) -> Void)?

    var style: Style = .default {
        didSet { applyStyle() }
    }

    private var indicatorLeading: NSLayoutConstraint?
    private var indicatorWidth: NSLayoutConstraint?

    // MARK: - Init

    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }

    // MARK: - Actions

    @objc private func segmentTapped(_ sender: UIButton) {
        selectedIndex = sender.tag
        onChange?(selectedIndex)
    }

    // MARK: - Setup

    private func setup() {
        addSubview(containerView)
        containerView.addSubview(indicatorView)
        containerView.addSubview(stackView)

        indicatorLeading = indicatorView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 4)
        indicatorWidth = indicatorView.widthAnchor.constraint(equalToConstant: 0)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 44),

            stackView.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 4),
            stackView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 4),
            stackView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -4),
            stackView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -4),

            indicatorView.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 4),
            indicatorView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -4),
            indicatorLeading!,
            indicatorWidth!,
        ])

        applyStyle()
    }

    // MARK: - Private

    private func rebuild() {
        stackView.arrangedSubviews.forEach { $0.removeFromSuperview() }

        for (index, segment) in segments.enumerated() {
            let btn = UIButton(type: .system)
            btn.setTitle(segment.title, for: .normal)
            btn.titleLabel?.font = .systemFont(ofSize: 14, weight: .medium)
            btn.tag = index
            btn.addTarget(self, action: #selector(segmentTapped(_:)), for: .touchUpInside)
            stackView.addArrangedSubview(btn)
        }

        setNeedsLayout()
        layoutIfNeeded()
        moveIndicator(animated: false)
    }

    private func applyStyle() {
        switch style {
        case .default:
            containerView.backgroundColor = .secondarySystemBackground
            containerView.layer.cornerRadius = 12
            indicatorView.backgroundColor = .white
            indicatorView.layer.cornerRadius = 10
            indicatorView.layer.shadowColor = UIColor.black.cgColor
            indicatorView.layer.shadowOpacity = 0.08
            indicatorView.layer.shadowRadius = 2
            indicatorView.layer.shadowOffset = CGSize(width: 0, height: 1)

        case .glass:
            containerView.backgroundColor = UIColor.white.withAlphaComponent(0.15)
            containerView.layer.cornerRadius = 16
            indicatorView.backgroundColor = UIColor.white.withAlphaComponent(0.7)
            indicatorView.layer.cornerRadius = 12
            indicatorView.layer.borderWidth = 0.5
            indicatorView.layer.borderColor = UIColor.white.withAlphaComponent(0.5).cgColor

        case .pill:
            containerView.backgroundColor = .secondarySystemBackground
            containerView.layer.cornerRadius = 22
            indicatorView.backgroundColor = .label
            indicatorView.layer.cornerRadius = 18
        }
    }

    private func moveIndicator(animated: Bool) {
        guard !segments.isEmpty else { return }
        let count = CGFloat(segments.count)
        let usable = containerView.bounds.width - 8
        let segW = usable / count

        indicatorLeading?.constant = 4 + segW * CGFloat(selectedIndex)
        indicatorWidth?.constant = segW

        let updates = {
            self.layoutIfNeeded()
            for (idx, view) in self.stackView.arrangedSubviews.enumerated() {
                guard let btn = view as? UIButton else { continue }
                let active = idx == self.selectedIndex
                switch self.style {
                case .pill:
                    btn.tintColor = active ? .systemBackground : .secondaryLabel
                default:
                    btn.tintColor = active ? .label : .secondaryLabel
                }
            }
        }

        if animated {
            UIView.animate(
                withDuration: 0.3,
                delay: 0,
                usingSpringWithDamping: 0.85,
                initialSpringVelocity: 0.3,
                options: [.curveEaseInOut],
                animations: updates
            )
        } else {
            updates()
        }
    }
}

// MARK: - Usage
// let control = SegmentedControl()
// control.segments = [
//     .init(id: "all", title: "All"),
//     .init(id: "active", title: "Active"),
//     .init(id: "completed", title: "Completed"),
// ]
// control.style = .default  // or .glass, .pill
// control.onChange = { index in
//     print("Selected segment: \\(index)")
// }
// view.addSubview(control)
`;

export default function SegmentControl() {
  const [defaultActive, setDefaultActive] = useState("all");
  const [glassActive, setGlassActive] = useState("photos");
  const [pillActive, setPillActive] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Segment Control</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style segmented controls with a smooth sliding indicator.
        </p>
      </div>
      <div className="space-y-4">
        <CodePreview
          title="Default"
          description="Standard segmented control with a smooth sliding background."
          preview={
            <PhoneFrame>
              <p className="text-[15px] font-bold text-neutral-900 dark:text-white mb-3">Tasks</p>
              <DefaultSegmentControl
                segments={defaultSegments}
                activeId={defaultActive}
                onChange={setDefaultActive}
              />
              <ContentPanel content={defaultContent} activeId={defaultActive} />
              <div className="mt-3 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
                ))}
              </div>
            </PhoneFrame>
          }
          swiftCode={segmentControlSwiftCode}
        />
        <CodePreview
          title="Glass"
          description="Frosted glass variant with translucent indicator."
          preview={
            <PhoneFrame bgClass="bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 dark:from-sky-950 dark:via-indigo-950 dark:to-purple-950">
              <p className="text-[15px] font-bold text-neutral-900 dark:text-white mb-3">Media</p>
              <GlassSegmentControl
                segments={mediaSegments}
                activeId={glassActive}
                onChange={setGlassActive}
              />
              <ContentPanel content={mediaContent} activeId={glassActive} glass />
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-white/30 dark:bg-white/5" />
                ))}
              </div>
            </PhoneFrame>
          }
          swiftCode={segmentControlSwiftCode}
        />
        <CodePreview
          title="Pill"
          description="Rounded pill style with an inverted active indicator."
          preview={
            <PhoneFrame>
              <p className="text-[15px] font-bold text-neutral-900 dark:text-white mb-3">Settings</p>
              <PillSegmentControl
                segments={settingsSegments}
                activeId={pillActive}
                onChange={setPillActive}
              />
              <ContentPanel content={settingsContent} activeId={pillActive} />
              <div className="mt-3 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-3">
                    <div className="h-5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    <div className="h-3 w-20 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  </div>
                ))}
              </div>
            </PhoneFrame>
          }
          swiftCode={segmentControlSwiftCode}
        />
      </div>
    </div>
  );
}
