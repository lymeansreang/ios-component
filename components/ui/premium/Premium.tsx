"use client";

import { useMemo, useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

function CardVariantsPreview() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
      <div className="rounded-2xl bg-white p-4 shadow-[0_22px_50px_-28px_rgba(15,23,42,0.45)]">
        <p className="text-xs text-neutral-500">Elevated</p>
        <p className="mt-1 text-sm font-semibold">Premium plan details</p>
      </div>
      <div className="rounded-2xl border border-neutral-300 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
        <p className="text-xs text-neutral-500">Outlined</p>
        <p className="mt-1 text-sm font-semibold">Billing summary</p>
      </div>
      <div className="rounded-2xl border border-white/30 bg-white/35 p-4 backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/35">
        <p className="text-xs text-neutral-500 dark:text-neutral-300">Blurred</p>
        <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">Rewards wallet</p>
      </div>
      <div className="rounded-2xl border border-white/25 bg-gradient-to-br from-white/45 to-white/15 p-4 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:border-white/10">
        <p className="text-xs text-neutral-600 dark:text-neutral-300">Glass</p>
        <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">Order insurance</p>
      </div>
    </div>
  );
}

function BadgesPreview() {
  return (
    <div className="flex w-72 items-center justify-between">
      <div className="relative rounded-xl bg-neutral-100 px-3 py-2 text-sm dark:bg-neutral-800">Inbox
        <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">12</span>
      </div>
      <div className="relative rounded-xl bg-neutral-100 px-3 py-2 text-sm dark:bg-neutral-800">Activity
        <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </div>
      <div className="rounded-full bg-blue-500 px-2.5 py-1 text-[11px] font-semibold text-white">NEW</div>
    </div>
  );
}

function PillsChipsPreview() {
  const initial = useMemo(
    () => [
      { id: "ui", label: "UI", selected: true },
      { id: "uikit", label: "UIKit", selected: false },
      { id: "swift", label: "Swift", selected: true },
      { id: "ios", label: "iOS", selected: false },
    ],
    []
  );
  const [chips, setChips] = useState(initial);

  const toggle = (id: string) =>
    setChips((prev) => prev.map((chip) => (chip.id === id ? { ...chip, selected: !chip.selected } : chip)));
  const remove = (id: string) => setChips((prev) => prev.filter((chip) => chip.id !== id));

  return (
    <div className="flex w-72 flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => toggle(chip.id)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
            chip.selected
              ? "border-blue-400 bg-blue-500/15 text-blue-700 dark:text-blue-300"
              : "border-neutral-300 bg-white text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
          }`}
        >
          <span>{chip.label}</span>
          <span
            onClick={(event) => {
              event.stopPropagation();
              remove(chip.id);
            }}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[10px] dark:bg-neutral-700"
          >
            x
          </span>
        </button>
      ))}
    </div>
  );
}

function UserCellsPreview() {
  const users = [
    { id: 1, name: "Ayla Rivera", subtitle: "Design Lead", badge: "Pro" },
    { id: 2, name: "Chris Nolan", subtitle: "iOS Engineer", badge: "Admin" },
    { id: 3, name: "Noah Kim", subtitle: "QA Specialist", badge: "Owner" },
  ];

  return (
    <div className="w-80 space-y-2">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-xs font-semibold text-white">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-neutral-500">{user.subtitle}</p>
          </div>
          <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] dark:bg-neutral-800">{user.badge}</span>
        </div>
      ))}
    </div>
  );
}

function SettingsRowPreview() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/15 text-blue-500">i</span>
          <span className="text-sm">Account Details</span>
        </div>
        <span className="text-neutral-400">›</span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-500">n</span>
          <span className="text-sm">Push Notifications</span>
        </div>
        <button
          type="button"
          onClick={() => setEnabled((prev) => !prev)}
          className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>
    </div>
  );
}

function PriceSummaryPreview() {
  const rows = [
    { label: "Items", value: "$128.00" },
    { label: "Shipping", value: "$8.00" },
    { label: "Tax", value: "$9.52" },
  ];
  return (
    <div className="w-80 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm font-semibold">Order Summary</p>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
      <div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>Total</span>
        <span>$145.52</span>
      </div>
    </div>
  );
}

function TimelinePreview() {
  const steps = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"];
  const [progress, setProgress] = useState(3);
  return (
    <div className="w-80 space-y-3">
      {steps.map((step, index) => {
        const done = index < progress;
        return (
          <div key={step} className="flex items-start gap-3">
            <div className="relative mt-0.5">
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${done ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800"}`}>
                {done ? "✓" : index + 1}
              </span>
              {index < steps.length - 1 && <span className="absolute left-1/2 top-5 h-6 w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-700" />}
            </div>
            <p className={`text-sm ${done ? "font-medium text-neutral-900 dark:text-white" : "text-neutral-500"}`}>{step}</p>
          </div>
        );
      })}
      <input
        type="range"
        min={1}
        max={steps.length}
        value={progress}
        onChange={(event) => setProgress(Number(event.target.value))}
        className="w-full"
      />
    </div>
  );
}

function RatingReviewsPreview() {
  const [rating, setRating] = useState(4);
  const reviews = [
    { id: 1, name: "Mia", comment: "Very clean components and smooth interactions.", stars: 5 },
    { id: 2, name: "Liam", comment: "Great base, easy to customize.", stars: 4 },
    { id: 3, name: "Emma", comment: "Helpful for rapid prototyping.", stars: 4 },
  ];
  return (
    <div className="w-80 space-y-3">
      <div className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold">Rate this component</p>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)} className="text-yellow-400">
              <svg className={`h-6 w-6 ${star <= rating ? "opacity-100" : "opacity-25"}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{review.name}</p>
              <p className="text-xs text-yellow-500">{"★".repeat(review.stars)}</p>
            </div>
            <p className="mt-1 text-xs text-neutral-500">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const premiumStyles = [
  {
    title: "Cards (Elevated / Outlined / Blurred / Glass)",
    description: "Common premium card surfaces for dashboard and checkout UI.",
    preview: <CardVariantsPreview />,
    swiftCode: `import UIKit

class PremiumCardVariantsView: UIView {

    private let elevatedCard: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 16
        view.backgroundColor = .systemBackground
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.12
        view.layer.shadowRadius = 14
        view.layer.shadowOffset = CGSize(width: 0, height: 8)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let outlinedCard: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 16
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.systemGray4.cgColor
        view.backgroundColor = .systemBackground
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let blurredCard: UIVisualEffectView = {
        let view = UIVisualEffectView(effect: UIBlurEffect(style: .systemThinMaterial))
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let glassCard: UIVisualEffectView = {
        let view = UIVisualEffectView(effect: UIBlurEffect(style: .systemUltraThinMaterial))
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapCard() {}

    private func setupView() {
        blurredCard.layer.cornerRadius = 16
        blurredCard.clipsToBounds = true
        glassCard.layer.cornerRadius = 16
        glassCard.clipsToBounds = true

        addSubview(elevatedCard)
        addSubview(outlinedCard)
        addSubview(blurredCard)
        addSubview(glassCard)

        NSLayoutConstraint.activate([
            elevatedCard.topAnchor.constraint(equalTo: topAnchor),
            elevatedCard.leadingAnchor.constraint(equalTo: leadingAnchor),
            elevatedCard.widthAnchor.constraint(equalToConstant: 150),
            elevatedCard.heightAnchor.constraint(equalToConstant: 96),

            outlinedCard.topAnchor.constraint(equalTo: topAnchor),
            outlinedCard.trailingAnchor.constraint(equalTo: trailingAnchor),
            outlinedCard.widthAnchor.constraint(equalToConstant: 150),
            outlinedCard.heightAnchor.constraint(equalToConstant: 96),

            blurredCard.topAnchor.constraint(equalTo: elevatedCard.bottomAnchor, constant: 12),
            blurredCard.leadingAnchor.constraint(equalTo: leadingAnchor),
            blurredCard.widthAnchor.constraint(equalToConstant: 150),
            blurredCard.heightAnchor.constraint(equalToConstant: 96),

            glassCard.topAnchor.constraint(equalTo: outlinedCard.bottomAnchor, constant: 12),
            glassCard.trailingAnchor.constraint(equalTo: trailingAnchor),
            glassCard.widthAnchor.constraint(equalToConstant: 150),
            glassCard.heightAnchor.constraint(equalToConstant: 96),
            glassCard.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let cards = PremiumCardVariantsView()
// view.addSubview(cards)
// cards.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     cards.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     cards.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     cards.widthAnchor.constraint(equalToConstant: 320),
// ])
`,
  },
  {
    title: "Badges (Count / Dot / NEW)",
    description: "Compact status badges for notifications and highlights.",
    preview: <BadgesPreview />,
    swiftCode: `import UIKit

class BadgeExamplesView: UIView {

    private let countBadge: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let dotBadge: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let newBadge: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var countText: String = "12" {
        didSet { countBadge.text = countText }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapBadge() {}

    private func setupView() {
        countBadge.text = countText
        countBadge.textColor = .white
        countBadge.backgroundColor = .systemRed
        countBadge.font = .systemFont(ofSize: 11, weight: .bold)
        countBadge.textAlignment = .center
        countBadge.layer.cornerRadius = 10
        countBadge.clipsToBounds = true
        dotBadge.backgroundColor = .systemGreen
        dotBadge.layer.cornerRadius = 5

        newBadge.text = "NEW"
        newBadge.textColor = .white
        newBadge.backgroundColor = .systemBlue
        newBadge.font = .systemFont(ofSize: 11, weight: .bold)
        newBadge.textAlignment = .center
        newBadge.layer.cornerRadius = 10
        newBadge.clipsToBounds = true

        addSubview(countBadge)
        addSubview(dotBadge)
        addSubview(newBadge)

        NSLayoutConstraint.activate([
            countBadge.leadingAnchor.constraint(equalTo: leadingAnchor),
            countBadge.centerYAnchor.constraint(equalTo: centerYAnchor),
            countBadge.widthAnchor.constraint(greaterThanOrEqualToConstant: 24),
            countBadge.heightAnchor.constraint(equalToConstant: 20),

            dotBadge.leadingAnchor.constraint(equalTo: countBadge.trailingAnchor, constant: 20),
            dotBadge.centerYAnchor.constraint(equalTo: centerYAnchor),
            dotBadge.widthAnchor.constraint(equalToConstant: 10),
            dotBadge.heightAnchor.constraint(equalToConstant: 10),

            newBadge.leadingAnchor.constraint(equalTo: dotBadge.trailingAnchor, constant: 20),
            newBadge.centerYAnchor.constraint(equalTo: centerYAnchor),
            newBadge.widthAnchor.constraint(equalToConstant: 42),
            newBadge.heightAnchor.constraint(equalToConstant: 20),
            newBadge.trailingAnchor.constraint(equalTo: trailingAnchor),
        ])
    }
}

// MARK: - Usage
// let badges = BadgeExamplesView()
// badges.countText = "27"
// view.addSubview(badges)
`,
  },
  {
    title: "Pills / Chips (Selectable + Removable)",
    description: "Tag-like controls for filtering and selection.",
    preview: <PillsChipsPreview />,
    swiftCode: `import UIKit

class SelectableChipsView: UIView {

    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.spacing = 8
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    var items: [String] = ["UI", "UIKit", "Swift", "iOS"]
    var selectedItems: Set<String> = ["UI", "Swift"]

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapChip(_ sender: UIButton) {}

    private func setupView() {
        addSubview(stackView)

        for item in items {
            let button = UIButton(type: .system)
            button.setTitle(item, for: .normal)
            button.layer.cornerRadius = 14
            button.contentEdgeInsets = UIEdgeInsets(top: 6, left: 10, bottom: 6, right: 10)
            button.backgroundColor = selectedItems.contains(item) ? UIColor.systemBlue.withAlphaComponent(0.15) : UIColor.secondarySystemBackground
            button.addTarget(self, action: #selector(didTapChip(_:)), for: .touchUpInside)
            stackView.addArrangedSubview(button)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let chips = SelectableChipsView()
// chips.items = ["New", "Popular", "Nearby"]
// view.addSubview(chips)
`,
  },
  {
    title: "User Cells (Avatar + Titles + Trailing)",
    description: "Reusable list cell style for team or contacts screens.",
    preview: <UserCellsPreview />,
    swiftCode: `import UIKit

class UserCellView: UIView {

    private let avatarView: UIImageView = {
        let view = UIImageView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        return label
    }()

    private let subtitleLabel: UILabel = {
        let label = UILabel()
        return label
    }()

    private let trailingLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var titleText: String = "Ayla Rivera" { didSet { titleLabel.text = titleText } }
    var subtitleText: String = "Design Lead" { didSet { subtitleLabel.text = subtitleText } }
    var trailingText: String = "Pro" { didSet { trailingLabel.text = trailingText } }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapCell() {}

    private func setupView() {
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground
        avatarView.layer.cornerRadius = 20
        avatarView.clipsToBounds = true
        avatarView.backgroundColor = .systemBlue
        titleLabel.font = .systemFont(ofSize: 15, weight: .semibold)
        subtitleLabel.font = .systemFont(ofSize: 12, weight: .regular)
        subtitleLabel.textColor = .secondaryLabel
        trailingLabel.font = .systemFont(ofSize: 11, weight: .semibold)
        trailingLabel.textColor = .secondaryLabel

        let textStack = UIStackView(arrangedSubviews: [titleLabel, subtitleLabel])
        textStack.axis = .vertical
        textStack.spacing = 2
        textStack.translatesAutoresizingMaskIntoConstraints = false

        addSubview(avatarView)
        addSubview(textStack)
        addSubview(trailingLabel)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 56),
            avatarView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 10),
            avatarView.centerYAnchor.constraint(equalTo: centerYAnchor),
            avatarView.widthAnchor.constraint(equalToConstant: 40),
            avatarView.heightAnchor.constraint(equalToConstant: 40),
            textStack.leadingAnchor.constraint(equalTo: avatarView.trailingAnchor, constant: 10),
            textStack.centerYAnchor.constraint(equalTo: centerYAnchor),
            trailingLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -10),
            trailingLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            textStack.trailingAnchor.constraint(lessThanOrEqualTo: trailingLabel.leadingAnchor, constant: -8),
        ])
    }
}

// MARK: - Usage
// let userCell = UserCellView()
// userCell.titleText = "Chris Nolan"
// userCell.subtitleText = "iOS Engineer"
// userCell.trailingText = "Admin"
`,
  },
  {
    title: "Settings Row (Chevron / Switch)",
    description: "Common preferences row patterns with icon and action.",
    preview: <SettingsRowPreview />,
    swiftCode: `import UIKit

class SettingsRowView: UIView {

    private let iconView: UIImageView = {
        let view = UIImageView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let chevronView: UIImageView = {
        let view = UIImageView(image: UIImage(systemName: "chevron.right"))
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let toggleSwitch: UISwitch = {
        let control = UISwitch()
        control.translatesAutoresizingMaskIntoConstraints = false
        return control
    }()

    var showsSwitch: Bool = false {
        didSet {
            toggleSwitch.isHidden = !showsSwitch
            chevronView.isHidden = showsSwitch
        }
    }

    var titleText: String = "Account Details" { didSet { titleLabel.text = titleText } }
    var iconImage: UIImage? = UIImage(systemName: "person.circle") { didSet { iconView.image = iconImage } }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func switchChanged() {}

    private func setupView() {
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground

        iconView.tintColor = .systemBlue
        titleLabel.font = .systemFont(ofSize: 15, weight: .regular)
        chevronView.tintColor = .tertiaryLabel
        toggleSwitch.isHidden = true
        toggleSwitch.addTarget(self, action: #selector(switchChanged), for: .valueChanged)

        addSubview(iconView)
        addSubview(titleLabel)
        addSubview(chevronView)
        addSubview(toggleSwitch)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 50),
            iconView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            iconView.centerYAnchor.constraint(equalTo: centerYAnchor),
            iconView.widthAnchor.constraint(equalToConstant: 20),
            iconView.heightAnchor.constraint(equalToConstant: 20),
            titleLabel.leadingAnchor.constraint(equalTo: iconView.trailingAnchor, constant: 10),
            titleLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            chevronView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            chevronView.centerYAnchor.constraint(equalTo: centerYAnchor),
            toggleSwitch.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            toggleSwitch.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])
    }
}

// MARK: - Usage
// let settingsRow = SettingsRowView()
// settingsRow.titleText = "Push Notifications"
// settingsRow.showsSwitch = true
`,
  },
  {
    title: "Price Row / Summary Row",
    description: "Checkout subtotal/tax/total presentation row pattern.",
    preview: <PriceSummaryPreview />,
    swiftCode: `import UIKit

class PriceSummaryView: UIView {

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 8
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let totalLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var rows: [(String, String)] = [("Items", "$128.00"), ("Shipping", "$8.00"), ("Tax", "$9.52")]
    var totalText: String = "$145.52" {
        didSet { totalLabel.text = "Total  " + totalText }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapCheckout() {}

    private func setupView() {
        layer.cornerRadius = 14
        backgroundColor = .secondarySystemBackground

        titleLabel.text = "Order Summary"
        titleLabel.font = .systemFont(ofSize: 15, weight: .semibold)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        for row in rows {
            let rowView = UIStackView()
            rowView.axis = .horizontal
            rowView.distribution = .equalSpacing
            let left = UILabel()
            left.text = row.0
            left.textColor = .secondaryLabel
            left.font = .systemFont(ofSize: 14)
            let right = UILabel()
            right.text = row.1
            right.font = .systemFont(ofSize: 14, weight: .medium)
            rowView.addArrangedSubview(left)
            rowView.addArrangedSubview(right)
            stackView.addArrangedSubview(rowView)
        }

        totalLabel.font = .systemFont(ofSize: 16, weight: .bold)
        totalLabel.text = "Total  " + totalText

        addSubview(titleLabel)
        addSubview(stackView)
        addSubview(totalLabel)

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 14),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            stackView.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 10),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            totalLabel.topAnchor.constraint(equalTo: stackView.bottomAnchor, constant: 12),
            totalLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 14),
            totalLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -14),
            totalLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -14),
        ])
    }
}

// MARK: - Usage
// let summary = PriceSummaryView()
// summary.totalText = "$245.10"
// view.addSubview(summary)
`,
  },
  {
    title: "Timeline / Stepper Progress",
    description: "Order tracking vertical timeline with active step state.",
    preview: <TimelinePreview />,
    swiftCode: `import UIKit

class TimelineStepperView: UIView {

    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 10
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    var steps: [String] = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"]
    var progress: Int = 3
    let lineColor: UIColor = .systemGray4

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didUpdateProgress() {}

    private func setupView() {
        addSubview(stackView)

        for (index, step) in steps.enumerated() {
            let row = UIStackView()
            row.axis = .horizontal
            row.spacing = 10
            let dot = UILabel()
            dot.text = index < progress ? "✓" : "\(index + 1)"
            dot.textAlignment = .center
            dot.font = .systemFont(ofSize: 11, weight: .bold)
            dot.textColor = index < progress ? .white : .secondaryLabel
            dot.backgroundColor = index < progress ? .systemGreen : .systemGray5
            dot.layer.cornerRadius = 10
            dot.clipsToBounds = true
            dot.widthAnchor.constraint(equalToConstant: 20).isActive = true
            dot.heightAnchor.constraint(equalToConstant: 20).isActive = true
            let title = UILabel()
            title.text = step
            title.font = .systemFont(ofSize: 14, weight: index < progress ? .semibold : .regular)
            row.addArrangedSubview(dot)
            row.addArrangedSubview(title)
            stackView.addArrangedSubview(row)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let timeline = TimelineStepperView()
// timeline.progress = 4
// view.addSubview(timeline)
`,
  },
  {
    title: "Rating + Reviews List",
    description: "Combine quick rating input and recent reviews feed.",
    preview: <RatingReviewsPreview />,
    swiftCode: `import UIKit

class RatingReviewsView: UIView {

    private let starsStack: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.spacing = 4
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let reviewsStack: UIStackView = {
        let view = UIStackView()
        view.axis = .vertical
        view.spacing = 8
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private var starButtons: [UIButton] = []
    var currentRating: Int = 4 { didSet { updateStars() } }
    var reviews: [(name: String, stars: Int, comment: String)] = [
        ("Mia", 5, "Very clean components and smooth interactions."),
        ("Liam", 4, "Great base, easy to customize."),
        ("Emma", 4, "Helpful for rapid prototyping.")
    ]

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapStar(_ sender: UIButton) {
        currentRating = sender.tag
    }

    private func updateStars() {
        for button in starButtons {
            button.alpha = button.tag <= currentRating ? 1 : 0.25
        }
    }

    private func setupView() {
        for index in 1...5 {
            let button = UIButton(type: .system)
            button.tag = index
            button.setTitle("★", for: .normal)
            button.titleLabel?.font = .systemFont(ofSize: 24)
            button.setTitleColor(.systemYellow, for: .normal)
            button.addTarget(self, action: #selector(didTapStar(_:)), for: .touchUpInside)
            starButtons.append(button)
            starsStack.addArrangedSubview(button)
        }
        updateStars()

        for review in reviews {
            let card = UIView()
            card.layer.cornerRadius = 10
            card.backgroundColor = .secondarySystemBackground
            let label = UILabel()
            label.numberOfLines = 0
            label.font = .systemFont(ofSize: 12)
            label.text = "\(review.name)  " + String(repeating: "★", count: review.stars) + "\\n" + review.comment
            label.translatesAutoresizingMaskIntoConstraints = false
            card.addSubview(label)
            NSLayoutConstraint.activate([
                label.topAnchor.constraint(equalTo: card.topAnchor, constant: 8),
                label.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 8),
                label.trailingAnchor.constraint(equalTo: card.trailingAnchor, constant: -8),
                label.bottomAnchor.constraint(equalTo: card.bottomAnchor, constant: -8),
            ])
            reviewsStack.addArrangedSubview(card)
        }

        addSubview(starsStack)
        addSubview(reviewsStack)
        NSLayoutConstraint.activate([
            starsStack.topAnchor.constraint(equalTo: topAnchor),
            starsStack.leadingAnchor.constraint(equalTo: leadingAnchor),
            starsStack.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor),
            reviewsStack.topAnchor.constraint(equalTo: starsStack.bottomAnchor, constant: 12),
            reviewsStack.leadingAnchor.constraint(equalTo: leadingAnchor),
            reviewsStack.trailingAnchor.constraint(equalTo: trailingAnchor),
            reviewsStack.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let ratingReviews = RatingReviewsView()
// view.addSubview(ratingReviews)
// ratingReviews.translatesAutoresizingMaskIntoConstraints = false
`,
  },
];

export default function Premium() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Premium</h2>
        <p className="text-neutral-500 mt-1">
          High-value commerce and account UI building blocks.
        </p>
      </div>
      <div className="space-y-4">
        {premiumStyles.map((style) => (
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
