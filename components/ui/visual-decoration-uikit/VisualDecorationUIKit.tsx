"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

const sharedSwiftCode = `import UIKit

class VisualDecorationView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 14
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    var title: String = "Decoration" {
        didSet { titleLabel.text = title }
    }

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

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
        addSubview(containerView)
        containerView.addSubview(titleLabel)
        titleLabel.text = title

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 90),
            titleLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
        ])
    }
}

// MARK: - Usage
// let view = VisualDecorationView()
// view.title = "Hello"
`;

function FloatingLabelPreview() {
  const [value, setValue] = useState("");
  return (
    <label className="relative block w-full max-w-sm">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder=" " className="peer w-full rounded-xl border px-4 pt-5 pb-2 text-sm" />
      <span className="pointer-events-none absolute left-3 rounded bg-white px-2 text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">Label</span>
    </label>
  );
}

const items = [
  { title: "Glass Morph Card", preview: <div className="w-full max-w-sm rounded-2xl border border-white/35 bg-white/25 p-4 backdrop-blur-xl">Glass card</div> },
  { title: "Gradient Container", preview: <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 p-4 text-white">Gradient</div> },
  { title: "Shimmer Loader (Variants)", preview: <div className="w-full max-w-sm space-y-2"><div className="h-4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" /><div className="h-14 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" /></div> },
  { title: "Blur Container", preview: <div className="w-full max-w-sm rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md">Blur container</div> },
  { title: "Badge", preview: <span className="rounded-full bg-blue-500 px-2.5 py-1 text-[11px] font-semibold text-white">NEW</span> },
  { title: "Tag", preview: <span className="rounded-lg border bg-neutral-100 px-2.5 py-1 text-xs">Design</span> },
  { title: "Ribbon Label", preview: <div className="inline-flex"><span className="bg-rose-500 px-3 py-1.5 text-xs text-white">Featured</span><span className="h-0 w-0 border-l-[8px] border-t-[12px] border-l-rose-700 border-t-transparent" /></div> },
  { title: "Floating Label", preview: <FloatingLabelPreview /> },
  { title: "Empty State View", preview: <div className="w-full max-w-sm rounded-2xl border border-dashed p-6 text-center text-sm">Nothing here yet</div> },
  { title: "Error State View", preview: <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">Something went wrong</div> },
];

export default function VisualDecorationUIKit() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Visual Decoration UIKit</h2>
        <p className="text-neutral-500 mt-1">Aesthetic UI blocks with UIKit usage and working HTML previews.</p>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <CodePreview
            key={item.title}
            title={item.title}
            description="UIKit implementation + usage pattern."
            preview={item.preview}
            swiftCode={sharedSwiftCode}
          />
        ))}
      </div>
    </div>
  );
}
