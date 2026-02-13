"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

type ToastItem = { id: number; text: string; tone: "neutral" | "success" | "error" | "warning" };

function toneClass(tone: ToastItem["tone"]) {
  if (tone === "success") return "bg-emerald-500 text-white";
  if (tone === "error") return "bg-red-500 text-white";
  if (tone === "warning") return "bg-amber-500 text-white";
  return "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900";
}

function BasicToastPreview() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-72 space-y-3">
      <button
        type="button"
        onClick={() => {
          setVisible(true);
          setTimeout(() => setVisible(false), 2000);
        }}
        className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white"
      >
        Show Toast
      </button>
      <div className="min-h-[44px]">
        {visible && (
          <div className="rounded-xl bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-white dark:text-neutral-900">
            Saved successfully
          </div>
        )}
      </div>
    </div>
  );
}

function StatusToastPreview() {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = (tone: ToastItem["tone"], text: string) => {
    const id = Date.now();
    setItems((prev) => [...prev, { id, tone, text }]);
    setTimeout(() => setItems((prev) => prev.filter((it) => it.id !== id)), 2500);
  };

  return (
    <div className="w-72 space-y-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => push("success", "Profile updated")} className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white">Success</button>
        <button type="button" onClick={() => push("error", "Upload failed")} className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white">Error</button>
        <button type="button" onClick={() => push("warning", "Weak network")} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white">Warning</button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`rounded-xl px-4 py-3 text-sm shadow-lg ${toneClass(item.tone)}`}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionToastPreview() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-72 space-y-3">
      <button type="button" onClick={() => setVisible(true)} className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white">
        Delete Item
      </button>
      <div className="min-h-[56px]">
        {visible && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-white dark:text-neutral-900">
            <span>Item deleted</span>
            <button type="button" onClick={() => setVisible(false)} className="rounded-md bg-white/20 px-2 py-1 text-xs font-semibold dark:bg-neutral-900/20">
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BannerToastPreview() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-72 space-y-3">
      <button
        type="button"
        onClick={() => {
          setVisible(true);
          setTimeout(() => setVisible(false), 2600);
        }}
        className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white"
      >
        Show Top Banner
      </button>
      <div className="relative h-14 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {visible && (
          <div className="absolute inset-x-2 top-2 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white">
            New message received
          </div>
        )}
      </div>
    </div>
  );
}

function StackedToastPreview() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const add = () => {
    const id = Date.now();
    const next: ToastItem = {
      id,
      text: `Queued item #${items.length + 1}`,
      tone: (["neutral", "success", "warning"] as const)[items.length % 3],
    };
    setItems((prev) => [...prev, next].slice(-3));
    setTimeout(() => setItems((prev) => prev.filter((it) => it.id !== id)), 3000);
  };

  return (
    <div className="w-72 space-y-3">
      <button type="button" onClick={add} className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900">
        Add Toast
      </button>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`rounded-xl px-4 py-3 text-sm shadow-lg ${toneClass(item.tone)}`}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

const toastSwiftCode = `import UIKit

class ToastView: UIView {

    enum Tone {
        case neutral
        case success
        case error
        case warning
    }

    private let label: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .medium)
        label.textColor = .white
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var message: String = "" {
        didSet { label.text = message }
    }

    var tone: Tone = .neutral {
        didSet { applyTone() }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapAction() {}

    private func setupView() {
        layer.cornerRadius = 12
        addSubview(label)
        applyTone()

        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            label.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            label.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            label.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),
        ])
    }

    private func applyTone() {
        switch tone {
        case .neutral: backgroundColor = .label
        case .success: backgroundColor = .systemGreen
        case .error: backgroundColor = .systemRed
        case .warning: backgroundColor = .systemOrange
        }
    }

    static func show(
        on view: UIView,
        message: String,
        tone: Tone = .neutral,
        duration: TimeInterval = 2.0
    ) {
        let toast = ToastView()
        toast.translatesAutoresizingMaskIntoConstraints = false
        toast.message = message
        toast.tone = tone
        view.addSubview(toast)

        NSLayoutConstraint.activate([
            toast.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            toast.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            toast.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16),
        ])

        toast.alpha = 0
        toast.transform = CGAffineTransform(translationX: 0, y: 10)
        UIView.animate(withDuration: 0.25) {
            toast.alpha = 1
            toast.transform = .identity
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + duration) {
            UIView.animate(withDuration: 0.2, animations: {
                toast.alpha = 0
                toast.transform = CGAffineTransform(translationX: 0, y: 10)
            }, completion: { _ in
                toast.removeFromSuperview()
            })
        }
    }
}

// MARK: - Usage
// ToastView.show(on: view, message: "Saved successfully")
// ToastView.show(on: view, message: "Profile updated", tone: .success)
// ToastView.show(on: view, message: "Upload failed", tone: .error)
// ToastView.show(on: view, message: "Weak network", tone: .warning)
`;

const toastStyles = [
  {
    title: "Basic Toast",
    description: "Minimal bottom toast for quick status feedback.",
    preview: <BasicToastPreview />,
    swiftCode: toastSwiftCode,
  },
  {
    title: "Status Toasts",
    description: "Success, error, and warning tones.",
    preview: <StatusToastPreview />,
    swiftCode: toastSwiftCode,
  },
  {
    title: "Action Toast",
    description: "Toast with inline action, e.g. Undo.",
    preview: <ActionToastPreview />,
    swiftCode: toastSwiftCode,
  },
  {
    title: "Top Banner Toast",
    description: "Top-positioned temporary message style.",
    preview: <BannerToastPreview />,
    swiftCode: toastSwiftCode,
  },
  {
    title: "Stacked Toast Queue",
    description: "Multiple toast messages queued in order.",
    preview: <StackedToastPreview />,
    swiftCode: toastSwiftCode,
  },
];

export default function Toast() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Toast</h2>
        <p className="text-neutral-500 mt-1">
          Lightweight transient notifications with multiple styles.
        </p>
      </div>
      <div className="space-y-4">
        {toastStyles.map((style) => (
          <CodePreview
            key={style.title}
            title={style.title}
            description={style.description}
            preview={style.preview}
            swiftCode={style.swiftCode}
          />
        ))}
      </div>
    </div>
  );
}
