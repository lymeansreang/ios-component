"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

type Reaction = {
  id: "like" | "love" | "haha" | "wow" | "sad" | "angry";
  label: string;
  icon: string;
  color: string;
};

type BurstItem = {
  id: number;
  left: number;
  delay: number;
};

const reactions: Reaction[] = [
  { id: "like", label: "Like", icon: "👍", color: "text-sky-500" },
  { id: "love", label: "Love", icon: "❤️", color: "text-rose-500" },
  { id: "haha", label: "Haha", icon: "😆", color: "text-amber-500" },
  { id: "wow", label: "Wow", icon: "😮", color: "text-yellow-500" },
  { id: "sad", label: "Sad", icon: "😢", color: "text-indigo-500" },
  { id: "angry", label: "Angry", icon: "😡", color: "text-orange-500" },
];

const reactionButtonSwiftCode = `import SwiftUI

enum ReactionType: String, CaseIterable {
    case like = "👍"
    case love = "❤️"
    case haha = "😆"
    case wow = "😮"
    case sad = "😢"
    case angry = "😡"
}

struct FacebookReactionButton: View {
    @State private var selected: ReactionType? = nil
    @State private var showPicker = false

    var body: some View {
        VStack(spacing: 14) {
            if showPicker {
                HStack(spacing: 10) {
                    ForEach(ReactionType.allCases, id: \\.self) { reaction in
                        Text(reaction.rawValue)
                            .font(.system(size: 28))
                            .onTapGesture {
                                selected = reaction
                                showPicker = false
                            }
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(.ultraThinMaterial, in: Capsule())
            }

            Button {
                if selected == nil {
                    selected = .like
                } else {
                    showPicker.toggle()
                }
            } label: {
                Text(selected?.rawValue ?? "👍")
                    .font(.system(size: 24))
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)
                    .background(Color(.secondarySystemBackground), in: Capsule())
            }
        }
    }
}

// MARK: - Usage
struct ReactionButtonDemo: View {
    var body: some View {
        FacebookReactionButton()
            .padding(24)
    }
}
`;

const reactionButtonUIKitCode = `import UIKit

enum ReactionType: String, CaseIterable {
    case like = "👍"
    case love = "❤️"
    case haha = "😆"
    case wow = "😮"
    case sad = "😢"
    case angry = "😡"

}

final class FacebookReactionButton: UIView {
    private(set) var selectedReaction: ReactionType? = nil
    private let actionButton = UIButton(type: .system)
    private let pickerStack = UIStackView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        actionButton.setTitle("👍", for: .normal)
        actionButton.titleLabel?.font = .systemFont(ofSize: 24)
        actionButton.backgroundColor = .secondarySystemBackground
        actionButton.layer.cornerRadius = 20
        actionButton.contentEdgeInsets = UIEdgeInsets(top: 10, left: 14, bottom: 10, right: 14)
        actionButton.translatesAutoresizingMaskIntoConstraints = false
        actionButton.addTarget(self, action: #selector(toggleReaction), for: .touchUpInside)

        pickerStack.axis = .horizontal
        pickerStack.spacing = 10
        pickerStack.alignment = .center
        pickerStack.distribution = .fillEqually
        pickerStack.isHidden = true
        pickerStack.translatesAutoresizingMaskIntoConstraints = false

        ReactionType.allCases.forEach { reaction in
            let button = UIButton(type: .system)
            button.setTitle(reaction.rawValue, for: .normal)
            button.titleLabel?.font = .systemFont(ofSize: 28)
            button.addAction(UIAction { [weak self] _ in
                self?.selectedReaction = reaction
                self?.actionButton.setTitle(reaction.rawValue, for: .normal)
                self?.pickerStack.isHidden = true
            }, for: .touchUpInside)
            pickerStack.addArrangedSubview(button)
        }

        addSubview(pickerStack)
        addSubview(actionButton)

        NSLayoutConstraint.activate([
            pickerStack.topAnchor.constraint(equalTo: topAnchor),
            pickerStack.centerXAnchor.constraint(equalTo: centerXAnchor),

            actionButton.topAnchor.constraint(equalTo: pickerStack.bottomAnchor, constant: 12),
            actionButton.centerXAnchor.constraint(equalTo: centerXAnchor),
            actionButton.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    @objc private func toggleReaction() {
        if selectedReaction == nil {
            selectedReaction = .like
            actionButton.setTitle("👍", for: .normal)
        } else {
            pickerStack.isHidden.toggle()
        }
    }
}

// MARK: - Usage
// let reactionButton = FacebookReactionButton()
// view.addSubview(reactionButton)
`;

const doubleTapSwiftCode = `import SwiftUI

enum ReactionType: String, CaseIterable {
    case like = "👍"
    case love = "❤️"
    case haha = "😆"
    case wow = "😮"
    case sad = "😢"
    case angry = "😡"
}

struct DoubleTapReactionCard: View {
    @State private var selected: ReactionType = .love
    @State private var burst = false

    var body: some View {
        VStack(spacing: 12) {
            HStack(spacing: 8) {
                ForEach(ReactionType.allCases, id: \\.self) { reaction in
                    Text(reaction.rawValue)
                        .font(.system(size: 24))
                        .onTapGesture { selected = reaction }
                }
            }

            RoundedRectangle(cornerRadius: 20)
                .fill(Color(.secondarySystemBackground))
                .frame(height: 180)
                .overlay(
                    VStack(spacing: 10) {
                        Text(selected.rawValue).font(.system(size: 46))
                        Text("Double tap to react")
                            .font(.system(size: 13, weight: .medium))
                            .foregroundStyle(.secondary)
                    }
                )
                .scaleEffect(burst ? 1.03 : 1)
                .onTapGesture(count: 2) {
                    burst = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.22) {
                        burst = false
                    }
                }
        }
    }
}

// MARK: - Usage
struct DoubleTapReactionDemo: View {
    var body: some View {
        DoubleTapReactionCard()
            .padding(24)
    }
}
`;

const doubleTapUIKitCode = `import UIKit

enum ReactionType: String, CaseIterable {
    case like = "👍"
    case love = "❤️"
    case haha = "😆"
    case wow = "😮"
    case sad = "😢"
    case angry = "😡"
}

final class DoubleTapReactionView: UIView {
    var reactionIcon: String = "❤️" {
        didSet { iconLabel.text = reactionIcon }
    }

    private let iconLabel = UILabel()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        backgroundColor = .secondarySystemBackground
        layer.cornerRadius = 20

        iconLabel.text = reactionIcon
        iconLabel.font = .systemFont(ofSize: 48)
        iconLabel.translatesAutoresizingMaskIntoConstraints = false
        addSubview(iconLabel)

        NSLayoutConstraint.activate([
            iconLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            iconLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])

        let doubleTap = UITapGestureRecognizer(target: self, action: #selector(handleDoubleTap))
        doubleTap.numberOfTapsRequired = 2
        addGestureRecognizer(doubleTap)
    }

    @objc private func handleDoubleTap() {
        let pulse = CASpringAnimation(keyPath: "transform.scale")
        pulse.fromValue = 1
        pulse.toValue = 1.08
        pulse.initialVelocity = 0.5
        pulse.damping = 8
        pulse.mass = 0.8
        pulse.stiffness = 120
        pulse.duration = pulse.settlingDuration
        layer.add(pulse, forKey: "pulse")
    }
}

// MARK: - Usage
// let card = DoubleTapReactionView()
// card.reactionIcon = "❤️"
// view.addSubview(card)
`;

function ReactionButtonPreview() {
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const activeReaction = selectedReaction ?? reactions[0];

  return (
    <div className="w-full max-w-xl rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
      <div className="relative inline-flex">
        <div
          className={`absolute -top-14 left-1/2 -translate-x-1/2 rounded-full border border-neutral-200/80 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 px-2 py-1 shadow-lg transition-all duration-200 ${
            showPicker
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-1"
          }`}
        >
          <div className="flex items-center gap-1">
            {reactions.map((reaction) => (
              <button
                key={reaction.id}
                onClick={() => {
                  setSelectedReaction(reaction);
                  setShowPicker(false);
                }}
                className="h-9 w-9 rounded-full text-xl transition-transform hover:-translate-y-1"
                aria-label={`React with ${reaction.label}`}
              >
                {reaction.icon}
              </button>
            ))}
          </div>
        </div>

        <button
          onMouseEnter={() => setShowPicker(true)}
          onMouseLeave={() => setShowPicker(false)}
          onClick={() => {
            if (!selectedReaction) {
              setSelectedReaction(reactions[0]);
            } else {
              setShowPicker((value) => !value);
            }
          }}
          className="inline-flex items-center justify-center rounded-full border border-neutral-300/90 dark:border-neutral-700 bg-neutral-100/80 dark:bg-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200 shadow-sm"
        >
          <span className={`text-2xl ${activeReaction.color}`}>{activeReaction.icon}</span>
        </button>
      </div>
    </div>
  );
}

function DoubleTapReactionPreview() {
  const [selectedReaction, setSelectedReaction] = useState<Reaction>(reactions[1]);
  const [burstItems, setBurstItems] = useState<BurstItem[]>([]);
  const [lastTap, setLastTap] = useState(0);

  const triggerBurst = () => {
    const next = Array.from({ length: 7 }, (_, index) => ({
      id: Date.now() + index,
      left: 18 + Math.random() * 64,
      delay: Math.random() * 0.16,
    }));
    setBurstItems(next);
    window.setTimeout(() => setBurstItems([]), 950);
  };

  const handleDoubleReact = () => {
    triggerBurst();
  };

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTap < 280) {
      handleDoubleReact();
    }
    setLastTap(now);
  };

  return (
    <div className="w-full max-w-xl space-y-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {reactions.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => setSelectedReaction(reaction)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-xl transition-transform hover:-translate-y-1 ${
              selectedReaction.id === reaction.id
                ? "ring-2 ring-sky-400/70 bg-sky-50 dark:bg-sky-950/40"
                : "bg-neutral-100 dark:bg-neutral-900"
            }`}
            aria-label={`Set double tap icon to ${reaction.label}`}
          >
            {reaction.icon}
          </button>
        ))}
      </div>

      <div
        onDoubleClick={handleDoubleReact}
        onTouchEnd={handleTouchEnd}
        className="relative mx-auto flex h-48 w-full max-w-md select-none items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950"
      >
        {burstItems.map((item) => (
          <span
            key={item.id}
            className="pointer-events-none absolute top-[58%] text-2xl animate-[reaction-float_0.9s_ease-out_forwards]"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {selectedReaction.icon}
          </span>
        ))}

        <div className="text-center">
          <div className={`text-5xl ${selectedReaction.color}`}>{selectedReaction.icon}</div>
          <p className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Double tap to react with {selectedReaction.label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Reaction() {
  return (
    <div className="space-y-6">
      <CodePreview
        title="Facebook Reaction Button"
        description="Standalone reaction button with picker."
        swiftCode={reactionButtonSwiftCode}
        uikitCode={reactionButtonUIKitCode}
        preview={<ReactionButtonPreview />}
      />

      <CodePreview
        title="Double Tap Reaction"
        description="Standalone double tap area with dynamic reaction icon."
        swiftCode={doubleTapSwiftCode}
        uikitCode={doubleTapUIKitCode}
        preview={<DoubleTapReactionPreview />}
      />
    </div>
  );
}
