"use client";

import { useState, type ReactNode } from "react";
import CodePreview from "@/components/ui/CodePreview";

type ButtonStyle = "filled" | "outlined" | "tinted" | "plain" | "glass";

const styleOptions: { label: string; value: ButtonStyle }[] = [
  { label: "Filled", value: "filled" },
  { label: "Outlined", value: "outlined" },
  { label: "Tinted", value: "tinted" },
  { label: "Plain", value: "plain" },
  { label: "Glass", value: "glass" },
];

// ---------------------------------------------------------------------------
// SF Symbol → SVG mapping (covers the most common icons)
// ---------------------------------------------------------------------------
const sfSymbolMap: Record<string, ReactNode> = {
  "chevron.left": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
  ),
  "chevron.right": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
  ),
  "chevron.up": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
  ),
  "chevron.down": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
  ),
  "arrow.left": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
  ),
  "arrow.right": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
  ),
  "arrow.up": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
  ),
  "arrow.down": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
  ),
  minus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
  ),
  xmark: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
  ),
  checkmark: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  ),
  heart: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  ),
  "heart.fill": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  "star.fill": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  "square.and.arrow.up": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
  ),
  "square.and.arrow.down": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
  ),
  "magnifyingglass": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  gear: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  "person": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  "trash": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
  ),
  "pencil": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
  ),
  "bell": (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
  ),
};

function SFSymbolIcon({ name, className }: { name: string; className?: string }) {
  const icon = sfSymbolMap[name];
  if (icon) return <span className={className}>{icon}</span>;
  // Fallback: show the SF Symbol name as text
  return <span className={`text-[10px] font-medium ${className ?? ""}`}>{name}</span>;
}

// ---------------------------------------------------------------------------
// Icon badge with background + corner radius
// ---------------------------------------------------------------------------
function IconBadge({
  name,
  cornerRadius,
  style,
}: {
  name: string;
  cornerRadius: number;
  style: ButtonStyle;
}) {
  const bgClasses: Record<ButtonStyle, string> = {
    filled: "bg-blue-400/30 text-white",
    outlined: "bg-blue-500/10 text-blue-500",
    tinted: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    plain: "bg-blue-500/10 text-blue-500",
    glass: "bg-white/20 text-current",
  };

  return (
    <span
      className={`inline-flex items-center justify-center h-7 w-7 shrink-0 ${bgClasses[style]}`}
      style={{ borderRadius: `${Math.min(cornerRadius, 14)}px` }}
    >
      <SFSymbolIcon name={name} />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Preview
// ---------------------------------------------------------------------------
function ButtonPreview({
  title,
  buttonLeft,
  buttonRight,
  cornerRadius,
  style,
}: {
  title: string;
  buttonLeft: string;
  buttonRight: string;
  cornerRadius: number;
  style: ButtonStyle;
}) {
  const base = "inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold transition-all active:scale-95";

  const styleClasses: Record<ButtonStyle, string> = {
    filled: "bg-blue-500 text-white hover:bg-blue-600",
    outlined: "border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950",
    tinted: "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25",
    plain: "text-blue-500 hover:text-blue-600 bg-transparent",
    glass: "",
  };

  if (style === "glass") {
    return (
      <button
        className={`${base} relative overflow-hidden text-neutral-900 dark:text-white border border-white/30 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl`}
        style={{
          borderRadius: `${cornerRadius}px`,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <span
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none"
          style={{ borderRadius: `${cornerRadius}px ${cornerRadius}px 0 0` }}
        />
        <span className="relative inline-flex items-center gap-2.5">
          {buttonLeft && <IconBadge name={buttonLeft} cornerRadius={cornerRadius} style={style} />}
          {title || "Button"}
          {buttonRight && <IconBadge name={buttonRight} cornerRadius={cornerRadius} style={style} />}
        </span>
      </button>
    );
  }

  return (
    <button
      className={`${base} ${styleClasses[style]}`}
      style={{ borderRadius: `${cornerRadius}px` }}
    >
      {buttonLeft && <IconBadge name={buttonLeft} cornerRadius={cornerRadius} style={style} />}
      {title || "Button"}
      {buttonRight && <IconBadge name={buttonRight} cornerRadius={cornerRadius} style={style} />}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Swift code generation
// ---------------------------------------------------------------------------
function generateSwiftCode({
  title,
  buttonLeft,
  buttonRight,
  cornerRadius,
  style,
}: {
  title: string;
  buttonLeft: string;
  buttonRight: string;
  cornerRadius: number;
  style: ButtonStyle;
}) {
  const buttonTitle = title || "Button";
  const iconRadius = Math.min(cornerRadius, 14);

  if (style === "glass") {
    const leftIconBlock = buttonLeft
      ? `
    private let leftIconContainer: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.white.withAlphaComponent(0.2)
        view.layer.cornerRadius = ${iconRadius}
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let leftIconView: UIImageView = {
        let iv = UIImageView(image: UIImage(systemName: "${buttonLeft}"))
        iv.tintColor = .label
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()
`
      : "";

    const rightIconBlock = buttonRight
      ? `
    private let rightIconContainer: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.white.withAlphaComponent(0.2)
        view.layer.cornerRadius = ${iconRadius}
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let rightIconView: UIImageView = {
        let iv = UIImageView(image: UIImage(systemName: "${buttonRight}"))
        iv.tintColor = .label
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()
`
      : "";

    const leftSetup = buttonLeft
      ? `
        leftIconContainer.addSubview(leftIconView)
        NSLayoutConstraint.activate([
            leftIconContainer.widthAnchor.constraint(equalToConstant: 28),
            leftIconContainer.heightAnchor.constraint(equalToConstant: 28),
            leftIconView.centerXAnchor.constraint(equalTo: leftIconContainer.centerXAnchor),
            leftIconView.centerYAnchor.constraint(equalTo: leftIconContainer.centerYAnchor),
            leftIconView.widthAnchor.constraint(equalToConstant: 14),
            leftIconView.heightAnchor.constraint(equalToConstant: 14),
        ])`
      : "";

    const rightSetup = buttonRight
      ? `
        rightIconContainer.addSubview(rightIconView)
        NSLayoutConstraint.activate([
            rightIconContainer.widthAnchor.constraint(equalToConstant: 28),
            rightIconContainer.heightAnchor.constraint(equalToConstant: 28),
            rightIconView.centerXAnchor.constraint(equalTo: rightIconContainer.centerXAnchor),
            rightIconView.centerYAnchor.constraint(equalTo: rightIconContainer.centerYAnchor),
            rightIconView.widthAnchor.constraint(equalToConstant: 14),
            rightIconView.heightAnchor.constraint(equalToConstant: 14),
        ])`
      : "";

    const stackArranged = [
      buttonLeft ? "leftIconContainer" : null,
      "titleLabel",
      buttonRight ? "rightIconContainer" : null,
    ]
      .filter(Boolean)
      .join(", ");

    return `import UIKit

class GlassButtonView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = ${cornerRadius}
        view.layer.masksToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let blurView: UIVisualEffectView = {
        let blur = UIBlurEffect(style: .systemUltraThinMaterial)
        let view = UIVisualEffectView(effect: blur)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let highlightView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.white.withAlphaComponent(0.25)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let borderLayer: CALayer = {
        let layer = CALayer()
        layer.borderColor = UIColor.white.withAlphaComponent(0.3).cgColor
        layer.borderWidth = 1
        layer.cornerRadius = ${cornerRadius}
        return layer
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "${buttonTitle}"
        label.font = .systemFont(ofSize: 15, weight: .semibold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
${leftIconBlock}${rightIconBlock}
    private lazy var stackView: UIStackView = {
        let stack = UIStackView(arrangedSubviews: [${stackArranged}])
        stack.axis = .horizontal
        stack.spacing = 10
        stack.alignment = .center
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    public var title: String = "${buttonTitle}" {
        didSet { titleLabel.text = title }
    }

    public var cornerRadius: CGFloat = ${cornerRadius} {
        didSet {
            containerView.layer.cornerRadius = cornerRadius
            borderLayer.cornerRadius = cornerRadius
        }
    }

    var onTap: (() -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        borderLayer.frame = containerView.bounds
    }

    @objc private func didTap() {
        UIView.animate(withDuration: 0.08, animations: {
            self.containerView.transform = CGAffineTransform(scaleX: 0.96, y: 0.96)
        }) { _ in
            UIView.animate(withDuration: 0.1) {
                self.containerView.transform = .identity
            }
        }
        onTap?()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(blurView)
        containerView.addSubview(highlightView)
        containerView.addSubview(stackView)
        containerView.layer.addSublayer(borderLayer)
${leftSetup}${rightSetup}

        let tap = UITapGestureRecognizer(target: self, action: #selector(didTap))
        containerView.addGestureRecognizer(tap)

        let highlightHeight = highlightView.heightAnchor.constraint(
            equalTo: containerView.heightAnchor, multiplier: 0.5
        )
        highlightHeight.priority = .defaultHigh

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            blurView.topAnchor.constraint(equalTo: containerView.topAnchor),
            blurView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            blurView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            blurView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),

            highlightView.topAnchor.constraint(equalTo: containerView.topAnchor),
            highlightView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            highlightView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            highlightHeight,

            stackView.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
            stackView.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
            stackView.leadingAnchor.constraint(greaterThanOrEqualTo: containerView.leadingAnchor, constant: 14),
            stackView.trailingAnchor.constraint(lessThanOrEqualTo: containerView.trailingAnchor, constant: -14),
        ])
    }
}

// MARK: - Usage
/*
 let btn = GlassButtonView()
 btn.translatesAutoresizingMaskIntoConstraints = false
 btn.title = "${buttonTitle}"
 btn.cornerRadius = ${cornerRadius}
 btn.onTap = { print("tapped") }
 view.addSubview(btn)

 NSLayoutConstraint.activate([
     btn.centerXAnchor.constraint(equalTo: view.centerXAnchor),
     btn.centerYAnchor.constraint(equalTo: view.centerYAnchor),
     btn.heightAnchor.constraint(equalToConstant: 50),
     btn.widthAnchor.constraint(greaterThanOrEqualToConstant: 120),
 ])
*/`;
  }

  // ---- Non-glass styles ----

  const configStyle: Record<string, string> = {
    filled: `var config = UIButton.Configuration.filled()
        config.baseBackgroundColor = .systemBlue
        config.baseForegroundColor = .white`,
    outlined: `var config = UIButton.Configuration.plain()
        config.baseForegroundColor = .systemBlue
        config.background.strokeColor = .systemBlue
        config.background.strokeWidth = 2`,
    tinted: `var config = UIButton.Configuration.tinted()
        config.baseBackgroundColor = .systemBlue
        config.baseForegroundColor = .systemBlue`,
    plain: `var config = UIButton.Configuration.plain()
        config.baseForegroundColor = .systemBlue`,
  };

  // When both left and right are set, UIButton.Configuration only supports one
  // image. We use the left as leading and build right as a separate icon container.
  const hasLeft = !!buttonLeft;
  const hasRight = !!buttonRight;

  // For single-icon configs we use the built-in image support
  const singleIconOnLeft = hasLeft && !hasRight;
  const singleIconOnRight = !hasLeft && hasRight;

  let imageConfigLines = "";
  if (singleIconOnLeft) {
    imageConfigLines = `
        config.image = UIImage(systemName: "${buttonLeft}")
        config.imagePlacement = .leading
        config.imagePadding = 8`;
  } else if (singleIconOnRight) {
    imageConfigLines = `
        config.image = UIImage(systemName: "${buttonRight}")
        config.imagePlacement = .trailing
        config.imagePadding = 8`;
  }

  // When both icons exist we build with a stack
  if (hasLeft && hasRight) {
    const tintColor = style === "filled" ? ".white" : ".systemBlue";
    const bgAlpha = style === "filled" ? "0.3" : "0.1";

    return `import UIKit

class CustomButtonView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let leftIconContainer: UIView = {
        let view = UIView()
        view.backgroundColor = ${style === "filled" ? "UIColor.white.withAlphaComponent(0.3)" : "UIColor.systemBlue.withAlphaComponent(" + bgAlpha + ")"}
        view.layer.cornerRadius = ${iconRadius}
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let leftIconView: UIImageView = {
        let iv = UIImageView(image: UIImage(systemName: "${buttonLeft}"))
        iv.tintColor = ${tintColor}
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let rightIconContainer: UIView = {
        let view = UIView()
        view.backgroundColor = ${style === "filled" ? "UIColor.white.withAlphaComponent(0.3)" : "UIColor.systemBlue.withAlphaComponent(" + bgAlpha + ")"}
        view.layer.cornerRadius = ${iconRadius}
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let rightIconView: UIImageView = {
        let iv = UIImageView(image: UIImage(systemName: "${buttonRight}"))
        iv.tintColor = ${tintColor}
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "${buttonTitle}"
        label.font = .systemFont(ofSize: 15, weight: .semibold)
        label.textColor = ${tintColor}
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private lazy var buttonContainer: UIView = {
        let view = UIView()
        view.backgroundColor = ${style === "filled" ? ".systemBlue" : style === "tinted" ? "UIColor.systemBlue.withAlphaComponent(0.15)" : ".clear"}
        view.layer.cornerRadius = ${cornerRadius}${style === "outlined" ? `
        view.layer.borderWidth = 2
        view.layer.borderColor = UIColor.systemBlue.cgColor` : ""}
        view.clipsToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private lazy var stackView: UIStackView = {
        let stack = UIStackView(arrangedSubviews: [leftIconContainer, titleLabel, rightIconContainer])
        stack.axis = .horizontal
        stack.spacing = 10
        stack.alignment = .center
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    public var title: String = "${buttonTitle}" {
        didSet { titleLabel.text = title }
    }

    var onTap: (() -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTap() {
        UIView.animate(withDuration: 0.08, animations: {
            self.buttonContainer.transform = CGAffineTransform(scaleX: 0.96, y: 0.96)
        }) { _ in
            UIView.animate(withDuration: 0.1) {
                self.buttonContainer.transform = .identity
            }
        }
        onTap?()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(buttonContainer)
        buttonContainer.addSubview(stackView)

        leftIconContainer.addSubview(leftIconView)
        rightIconContainer.addSubview(rightIconView)

        let tap = UITapGestureRecognizer(target: self, action: #selector(didTap))
        buttonContainer.addGestureRecognizer(tap)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            buttonContainer.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 16),
            buttonContainer.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
            buttonContainer.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -16),
            buttonContainer.heightAnchor.constraint(equalToConstant: 44),

            stackView.centerYAnchor.constraint(equalTo: buttonContainer.centerYAnchor),
            stackView.leadingAnchor.constraint(equalTo: buttonContainer.leadingAnchor, constant: 10),
            stackView.trailingAnchor.constraint(equalTo: buttonContainer.trailingAnchor, constant: -10),

            leftIconContainer.widthAnchor.constraint(equalToConstant: 28),
            leftIconContainer.heightAnchor.constraint(equalToConstant: 28),
            leftIconView.centerXAnchor.constraint(equalTo: leftIconContainer.centerXAnchor),
            leftIconView.centerYAnchor.constraint(equalTo: leftIconContainer.centerYAnchor),
            leftIconView.widthAnchor.constraint(equalToConstant: 14),
            leftIconView.heightAnchor.constraint(equalToConstant: 14),

            rightIconContainer.widthAnchor.constraint(equalToConstant: 28),
            rightIconContainer.heightAnchor.constraint(equalToConstant: 28),
            rightIconView.centerXAnchor.constraint(equalTo: rightIconContainer.centerXAnchor),
            rightIconView.centerYAnchor.constraint(equalTo: rightIconContainer.centerYAnchor),
            rightIconView.widthAnchor.constraint(equalToConstant: 14),
            rightIconView.heightAnchor.constraint(equalToConstant: 14),
        ])
    }
}

// MARK: - Usage
/*
 let btn = CustomButtonView()
 btn.translatesAutoresizingMaskIntoConstraints = false
 btn.title = "${buttonTitle}"
 btn.onTap = { print("tapped") }
 view.addSubview(btn)
*/`;
  }

  // Single icon or no icons — use UIButton.Configuration
  return `import UIKit

class CustomButtonView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let customButton: UIButton = {
        let button = UIButton(type: .system)
        ${configStyle[style]}
        config.title = "${buttonTitle}"
        config.cornerStyle = .fixed${imageConfigLines}
        button.configuration = config
        button.layer.cornerRadius = ${cornerRadius}
        button.clipsToBounds = true
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    public var title: String = "${buttonTitle}" {
        didSet {
            var config = customButton.configuration
            config?.title = title
            customButton.configuration = config
        }
    }

    public var cornerRadius: CGFloat = ${cornerRadius} {
        didSet {
            customButton.layer.cornerRadius = cornerRadius
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    public func addTarget(_ target: Any?, action: Selector) {
        customButton.addTarget(target, action: action, for: .touchUpInside)
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(customButton)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            customButton.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 16),
            customButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
            customButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -16),
            customButton.heightAnchor.constraint(equalToConstant: 44),
            customButton.widthAnchor.constraint(greaterThanOrEqualToConstant: 80),
        ])
    }
}

// MARK: - Usage
/*
 let btn = CustomButtonView()
 btn.translatesAutoresizingMaskIntoConstraints = false
 btn.title = "${buttonTitle}"
 btn.cornerRadius = ${cornerRadius}
 view.addSubview(btn)
 btn.addTarget(self, action: #selector(didTapCustom))
*/`;
}

export default function CustomButton() {
  const [title, setTitle] = useState("Continue");
  const [buttonLeft, setButtonLeft] = useState("");
  const [buttonRight, setButtonRight] = useState("chevron.right");
  const [cornerRadius, setCornerRadius] = useState(12);
  const [style, setStyle] = useState<ButtonStyle>("filled");

  const swiftCode = generateSwiftCode({ title, buttonLeft, buttonRight, cornerRadius, style });

  const inputClass =
    "w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Custom Button</h2>
        <p className="text-neutral-500 mt-1">
          Build your own iOS-style button by customizing properties below.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
          Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-500">Button Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className={inputClass}
            />
          </div>

          {/* Corner Radius */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-500">
              Corner Radius: {cornerRadius}px
            </label>
            <input
              type="range"
              min={0}
              max={24}
              value={cornerRadius}
              onChange={(e) => setCornerRadius(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Left Button */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-500">
              Button Left <span className="text-neutral-400">(SF Symbol name)</span>
            </label>
            <input
              type="text"
              value={buttonLeft}
              onChange={(e) => setButtonLeft(e.target.value)}
              placeholder="e.g. chevron.left, arrow.left, heart..."
              className={inputClass}
            />
            {buttonLeft && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-neutral-400">Preview:</span>
                <IconBadge name={buttonLeft} cornerRadius={cornerRadius} style={style} />
              </div>
            )}
          </div>

          {/* Right Button */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-500">
              Button Right <span className="text-neutral-400">(SF Symbol name)</span>
            </label>
            <input
              type="text"
              value={buttonRight}
              onChange={(e) => setButtonRight(e.target.value)}
              placeholder="e.g. chevron.right, arrow.right, star..."
              className={inputClass}
            />
            {buttonRight && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-neutral-400">Preview:</span>
                <IconBadge name={buttonRight} cornerRadius={cornerRadius} style={style} />
              </div>
            )}
          </div>
        </div>

        {/* Button Style */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">Button Style</label>
          <div className="flex flex-wrap gap-2">
            {styleOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStyle(opt.value)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  style === opt.value
                    ? opt.value === "glass"
                      ? "bg-white/20 text-neutral-900 dark:text-white border border-white/40 shadow-md backdrop-blur-sm"
                      : "bg-blue-500 text-white shadow-md"
                    : "border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-blue-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {style === "glass" && (
            <p className="text-xs text-neutral-400 mt-1">
              Uses UIVisualEffectView with blur material — works on iOS 13+, no iOS 26 required.
            </p>
          )}
        </div>
      </div>

      <CodePreview
        title="Custom Button Preview"
        description={`Style: ${style} · Radius: ${cornerRadius}px${buttonLeft ? ` · Left: ${buttonLeft}` : ""}${buttonRight ? ` · Right: ${buttonRight}` : ""}`}
        preview={
          <ButtonPreview
            title={title}
            buttonLeft={buttonLeft}
            buttonRight={buttonRight}
            cornerRadius={cornerRadius}
            style={style}
          />
        }
        swiftCode={swiftCode}
      />
    </div>
  );
}
