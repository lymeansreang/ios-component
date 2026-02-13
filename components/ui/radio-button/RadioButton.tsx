"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

/* ------------------------------------------------------------------ */
/*  Preview helpers                                                    */
/* ------------------------------------------------------------------ */

function DefaultRadioPreview() {
  const [selected, setSelected] = useState("option1");
  const options = [
    { id: "option1", label: "Default Option" },
    { id: "option2", label: "Second Option" },
    { id: "option3", label: "Third Option" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className="flex items-center gap-3 group"
        >
          <span
            className={`relative w-5 h-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
              selected === opt.id
                ? "border-blue-500 bg-blue-500"
                : "border-neutral-300 dark:border-neutral-600 group-hover:border-neutral-400 dark:group-hover:border-neutral-500"
            }`}
          >
            {selected === opt.id && (
              <span className="w-2 h-2 rounded-full bg-white" />
            )}
          </span>
          <span className="text-sm text-neutral-900 dark:text-white">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function CardRadioPreview() {
  const [selected, setSelected] = useState("standard");
  const plans = [
    { id: "standard", label: "Standard", desc: "Basic features for individuals", price: "Free" },
    { id: "pro", label: "Pro", desc: "Advanced tools for professionals", price: "$9/mo" },
    { id: "team", label: "Team", desc: "Collaboration for teams", price: "$29/mo" },
  ];

  return (
    <div className="flex flex-col gap-2.5 w-72">
      {plans.map((plan) => (
        <button
          key={plan.id}
          onClick={() => setSelected(plan.id)}
          className={`relative w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 ${
            selected === plan.id
              ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <p className={`text-sm font-semibold ${
                selected === plan.id ? "text-blue-600 dark:text-blue-400" : "text-neutral-900 dark:text-white"
              }`}>
                {plan.label}
              </p>
              <p className="text-xs text-neutral-500">{plan.desc}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{plan.price}</span>
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0 ${
                  selected === plan.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {selected === plan.id && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function DescriptionRadioPreview() {
  const [selected, setSelected] = useState("wifi");
  const options = [
    {
      id: "wifi",
      label: "Wi-Fi",
      desc: "Connect using wireless network",
      icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0",
    },
    {
      id: "bluetooth",
      label: "Bluetooth",
      desc: "Connect using Bluetooth",
      icon: "M6.5 12l5-5 2.5 2.5L9.5 14l4.5 4.5L11.5 21l-5-5m0-8l5 5",
    },
    {
      id: "cellular",
      label: "Cellular",
      desc: "Connect using mobile data",
      icon: "M3 21h1m4 0h1m4 0h1m4 0h1M5 17v4M9 12v9M13 8v13M17 4v17",
    },
  ];

  return (
    <div className="flex flex-col gap-2.5 w-72">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
            selected === opt.id
              ? "border-blue-500 bg-blue-50/80 dark:bg-blue-500/10"
              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              selected === opt.id
                ? "bg-blue-500 text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
            }`}>
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={opt.icon} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                selected === opt.id ? "text-blue-600 dark:text-blue-400" : "text-neutral-900 dark:text-white"
              }`}>
                {opt.label}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">{opt.desc}</p>
            </div>
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0 ${
                selected === opt.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-neutral-300 dark:border-neutral-600"
              }`}
            >
              {selected === opt.id && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function ColorRadioPreview() {
  const [selected, setSelected] = useState("blue");
  const colors = [
    { id: "blue", color: "bg-blue-500", ring: "ring-blue-500/30" },
    { id: "purple", color: "bg-purple-500", ring: "ring-purple-500/30" },
    { id: "pink", color: "bg-pink-500", ring: "ring-pink-500/30" },
    { id: "orange", color: "bg-orange-500", ring: "ring-orange-500/30" },
    { id: "green", color: "bg-green-500", ring: "ring-green-500/30" },
    { id: "red", color: "bg-red-500", ring: "ring-red-500/30" },
  ];

  return (
    <div className="flex items-center gap-3">
      {colors.map((c) => (
        <button
          key={c.id}
          onClick={() => setSelected(c.id)}
          className={`relative w-8 h-8 rounded-full ${c.color} transition-all duration-200 ${
            selected === c.id
              ? `ring-2 ${c.ring} ring-offset-2 ring-offset-white dark:ring-offset-neutral-950 scale-110`
              : "hover:scale-105"
          }`}
        >
          {selected === c.id && (
            <svg className="absolute inset-0 m-auto w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}

function HorizontalChipRadioPreview() {
  const [selected, setSelected] = useState("daily");
  const options = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="flex items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === opt.id
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Style definitions                                                  */
/* ------------------------------------------------------------------ */

const radioStyles = [
  {
    title: "Default Radio Button",
    description: "Classic iOS-style radio selection with filled indicator.",
    preview: <DefaultRadioPreview />,
    swiftCode: `import UIKit

class RadioButtonView: UIView {

    struct Option {
        let id: String
        let label: String
    }

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .vertical
        sv.spacing = 12
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let options: [Option] = [
        Option(id: "option1", label: "Default Option"),
        Option(id: "option2", label: "Second Option"),
        Option(id: "option3", label: "Third Option"),
    ]

    private var selectedId: String = "option1"
    private var radioViews: [(outer: UIView, inner: UIView)] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        for (index, option) in options.enumerated() {
            let row = UIView()
            row.translatesAutoresizingMaskIntoConstraints = false
            row.tag = index

            let tap = UITapGestureRecognizer(target: self, action: #selector(didTapOption(_:)))
            row.addGestureRecognizer(tap)

            let outer = UIView()
            outer.translatesAutoresizingMaskIntoConstraints = false
            outer.layer.cornerRadius = 10
            outer.layer.borderWidth = 2
            outer.isUserInteractionEnabled = false

            let inner = UIView()
            inner.translatesAutoresizingMaskIntoConstraints = false
            inner.layer.cornerRadius = 4
            inner.backgroundColor = .white
            inner.isUserInteractionEnabled = false

            let label = UILabel()
            label.translatesAutoresizingMaskIntoConstraints = false
            label.text = option.label
            label.font = .systemFont(ofSize: 15)
            label.textColor = .label

            row.addSubview(outer)
            outer.addSubview(inner)
            row.addSubview(label)

            NSLayoutConstraint.activate([
                outer.leadingAnchor.constraint(equalTo: row.leadingAnchor),
                outer.centerYAnchor.constraint(equalTo: row.centerYAnchor),
                outer.widthAnchor.constraint(equalToConstant: 20),
                outer.heightAnchor.constraint(equalToConstant: 20),

                inner.centerXAnchor.constraint(equalTo: outer.centerXAnchor),
                inner.centerYAnchor.constraint(equalTo: outer.centerYAnchor),
                inner.widthAnchor.constraint(equalToConstant: 8),
                inner.heightAnchor.constraint(equalToConstant: 8),

                label.leadingAnchor.constraint(equalTo: outer.trailingAnchor, constant: 12),
                label.centerYAnchor.constraint(equalTo: row.centerYAnchor),
                label.trailingAnchor.constraint(equalTo: row.trailingAnchor),

                row.heightAnchor.constraint(equalToConstant: 28),
            ])

            radioViews.append((outer: outer, inner: inner))
            stackView.addArrangedSubview(row)
        }

        updateSelection()
    }

    @objc private func didTapOption(_ gesture: UITapGestureRecognizer) {
        guard let tag = gesture.view?.tag else { return }
        selectedId = options[tag].id
        UIView.animate(withDuration: 0.2) { self.updateSelection() }
    }

    private func updateSelection() {
        for (i, option) in options.enumerated() {
            let isSelected = option.id == selectedId
            let views = radioViews[i]
            views.outer.layer.borderColor = isSelected ? UIColor.systemBlue.cgColor : UIColor.separator.cgColor
            views.outer.backgroundColor = isSelected ? .systemBlue : .clear
            views.inner.alpha = isSelected ? 1 : 0
        }
    }
}

// MARK: - Usage
// let radio = RadioButtonView()
// view.addSubview(radio)
// radio.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     radio.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
//     radio.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
// ])
`,
  },
  {
    title: "Card Radio Button",
    description: "Selectable cards with plan/pricing information.",
    preview: <CardRadioPreview />,
    swiftCode: `import UIKit

class CardRadioView: UIView {

    struct Plan {
        let id: String
        let label: String
        let desc: String
        let price: String
    }

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .vertical
        sv.spacing = 10
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let plans: [Plan] = [
        Plan(id: "standard", label: "Standard", desc: "Basic features for individuals", price: "Free"),
        Plan(id: "pro", label: "Pro", desc: "Advanced tools for professionals", price: "$9/mo"),
        Plan(id: "team", label: "Team", desc: "Collaboration for teams", price: "$29/mo"),
    ]

    private var selectedId = "standard"
    private var cardViews: [UIView] = []
    private var radioOuters: [UIView] = []
    private var radioInners: [UIView] = []
    private var titleLabels: [UILabel] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
            stackView.widthAnchor.constraint(equalToConstant: 290),
        ])

        for (index, plan) in plans.enumerated() {
            let card = UIView()
            card.translatesAutoresizingMaskIntoConstraints = false
            card.layer.cornerRadius = 12
            card.layer.borderWidth = 2
            card.tag = index

            let tap = UITapGestureRecognizer(target: self, action: #selector(didTapCard(_:)))
            card.addGestureRecognizer(tap)

            let titleLabel = UILabel()
            titleLabel.translatesAutoresizingMaskIntoConstraints = false
            titleLabel.text = plan.label
            titleLabel.font = .systemFont(ofSize: 15, weight: .semibold)

            let descLabel = UILabel()
            descLabel.translatesAutoresizingMaskIntoConstraints = false
            descLabel.text = plan.desc
            descLabel.font = .systemFont(ofSize: 12)
            descLabel.textColor = .secondaryLabel

            let priceLabel = UILabel()
            priceLabel.translatesAutoresizingMaskIntoConstraints = false
            priceLabel.text = plan.price
            priceLabel.font = .systemFont(ofSize: 12, weight: .semibold)
            priceLabel.textColor = .secondaryLabel

            let outer = UIView()
            outer.translatesAutoresizingMaskIntoConstraints = false
            outer.layer.cornerRadius = 10
            outer.layer.borderWidth = 2
            outer.isUserInteractionEnabled = false

            let inner = UIView()
            inner.translatesAutoresizingMaskIntoConstraints = false
            inner.layer.cornerRadius = 4
            inner.backgroundColor = .white
            inner.isUserInteractionEnabled = false

            card.addSubview(titleLabel)
            card.addSubview(descLabel)
            card.addSubview(priceLabel)
            card.addSubview(outer)
            outer.addSubview(inner)

            NSLayoutConstraint.activate([
                card.heightAnchor.constraint(equalToConstant: 64),

                titleLabel.topAnchor.constraint(equalTo: card.topAnchor, constant: 14),
                titleLabel.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 16),

                descLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 2),
                descLabel.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: 16),

                priceLabel.centerYAnchor.constraint(equalTo: card.centerYAnchor),
                priceLabel.trailingAnchor.constraint(equalTo: outer.leadingAnchor, constant: -10),

                outer.centerYAnchor.constraint(equalTo: card.centerYAnchor),
                outer.trailingAnchor.constraint(equalTo: card.trailingAnchor, constant: -16),
                outer.widthAnchor.constraint(equalToConstant: 20),
                outer.heightAnchor.constraint(equalToConstant: 20),

                inner.centerXAnchor.constraint(equalTo: outer.centerXAnchor),
                inner.centerYAnchor.constraint(equalTo: outer.centerYAnchor),
                inner.widthAnchor.constraint(equalToConstant: 8),
                inner.heightAnchor.constraint(equalToConstant: 8),
            ])

            cardViews.append(card)
            radioOuters.append(outer)
            radioInners.append(inner)
            titleLabels.append(titleLabel)
            stackView.addArrangedSubview(card)
        }

        updateSelection()
    }

    @objc private func didTapCard(_ gesture: UITapGestureRecognizer) {
        guard let tag = gesture.view?.tag else { return }
        selectedId = plans[tag].id
        UIView.animate(withDuration: 0.2) { self.updateSelection() }
    }

    private func updateSelection() {
        for (i, plan) in plans.enumerated() {
            let isSelected = plan.id == selectedId
            cardViews[i].layer.borderColor = isSelected ? UIColor.systemBlue.cgColor : UIColor.separator.cgColor
            cardViews[i].backgroundColor = isSelected ? UIColor.systemBlue.withAlphaComponent(0.05) : .systemBackground
            radioOuters[i].layer.borderColor = isSelected ? UIColor.systemBlue.cgColor : UIColor.separator.cgColor
            radioOuters[i].backgroundColor = isSelected ? .systemBlue : .clear
            radioInners[i].alpha = isSelected ? 1 : 0
            titleLabels[i].textColor = isSelected ? .systemBlue : .label
        }
    }
}

// MARK: - Usage
// let cardRadio = CardRadioView()
// view.addSubview(cardRadio)
// cardRadio.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     cardRadio.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     cardRadio.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
// ])
`,
  },
  {
    title: "Icon Description Radio",
    description: "Radio options with icon and description text.",
    preview: <DescriptionRadioPreview />,
    swiftCode: `import UIKit

class IconDescriptionRadioView: UIView {

    struct Option {
        let id: String
        let label: String
        let desc: String
        let iconName: String  // SF Symbol name
    }

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .vertical
        sv.spacing = 10
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let options: [Option] = [
        Option(id: "wifi", label: "Wi-Fi", desc: "Connect using wireless network", iconName: "wifi"),
        Option(id: "bluetooth", label: "Bluetooth", desc: "Connect using Bluetooth", iconName: "dot.radiowaves.left.and.right"),
        Option(id: "cellular", label: "Cellular", desc: "Connect using mobile data", iconName: "antenna.radiowaves.left.and.right"),
    ]

    private var selectedId = "wifi"
    private var rowViews: [UIView] = []
    private var iconContainers: [UIView] = []
    private var iconViews: [UIImageView] = []
    private var radioOuters: [UIView] = []
    private var radioInners: [UIView] = []
    private var titleLabels: [UILabel] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
            stackView.widthAnchor.constraint(equalToConstant: 290),
        ])

        for (index, option) in options.enumerated() {
            let row = UIView()
            row.translatesAutoresizingMaskIntoConstraints = false
            row.layer.cornerRadius = 12
            row.layer.borderWidth = 1
            row.tag = index

            let tap = UITapGestureRecognizer(target: self, action: #selector(didTapRow(_:)))
            row.addGestureRecognizer(tap)

            let iconContainer = UIView()
            iconContainer.translatesAutoresizingMaskIntoConstraints = false
            iconContainer.layer.cornerRadius = 8

            let iconView = UIImageView(image: UIImage(systemName: option.iconName))
            iconView.translatesAutoresizingMaskIntoConstraints = false
            iconView.contentMode = .scaleAspectFit
            iconView.preferredSymbolConfiguration = UIImage.SymbolConfiguration(pointSize: 16)

            let titleLabel = UILabel()
            titleLabel.translatesAutoresizingMaskIntoConstraints = false
            titleLabel.text = option.label
            titleLabel.font = .systemFont(ofSize: 15, weight: .medium)

            let descLabel = UILabel()
            descLabel.translatesAutoresizingMaskIntoConstraints = false
            descLabel.text = option.desc
            descLabel.font = .systemFont(ofSize: 12)
            descLabel.textColor = .secondaryLabel

            let outer = UIView()
            outer.translatesAutoresizingMaskIntoConstraints = false
            outer.layer.cornerRadius = 10
            outer.layer.borderWidth = 2
            outer.isUserInteractionEnabled = false

            let inner = UIView()
            inner.translatesAutoresizingMaskIntoConstraints = false
            inner.layer.cornerRadius = 4
            inner.backgroundColor = .white

            row.addSubview(iconContainer)
            iconContainer.addSubview(iconView)
            row.addSubview(titleLabel)
            row.addSubview(descLabel)
            row.addSubview(outer)
            outer.addSubview(inner)

            NSLayoutConstraint.activate([
                row.heightAnchor.constraint(equalToConstant: 60),

                iconContainer.leadingAnchor.constraint(equalTo: row.leadingAnchor, constant: 16),
                iconContainer.centerYAnchor.constraint(equalTo: row.centerYAnchor),
                iconContainer.widthAnchor.constraint(equalToConstant: 36),
                iconContainer.heightAnchor.constraint(equalToConstant: 36),

                iconView.centerXAnchor.constraint(equalTo: iconContainer.centerXAnchor),
                iconView.centerYAnchor.constraint(equalTo: iconContainer.centerYAnchor),

                titleLabel.topAnchor.constraint(equalTo: row.topAnchor, constant: 12),
                titleLabel.leadingAnchor.constraint(equalTo: iconContainer.trailingAnchor, constant: 12),

                descLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 2),
                descLabel.leadingAnchor.constraint(equalTo: iconContainer.trailingAnchor, constant: 12),

                outer.centerYAnchor.constraint(equalTo: row.centerYAnchor),
                outer.trailingAnchor.constraint(equalTo: row.trailingAnchor, constant: -16),
                outer.widthAnchor.constraint(equalToConstant: 20),
                outer.heightAnchor.constraint(equalToConstant: 20),

                inner.centerXAnchor.constraint(equalTo: outer.centerXAnchor),
                inner.centerYAnchor.constraint(equalTo: outer.centerYAnchor),
                inner.widthAnchor.constraint(equalToConstant: 8),
                inner.heightAnchor.constraint(equalToConstant: 8),
            ])

            rowViews.append(row)
            iconContainers.append(iconContainer)
            iconViews.append(iconView)
            radioOuters.append(outer)
            radioInners.append(inner)
            titleLabels.append(titleLabel)
            stackView.addArrangedSubview(row)
        }

        updateSelection()
    }

    @objc private func didTapRow(_ gesture: UITapGestureRecognizer) {
        guard let tag = gesture.view?.tag else { return }
        selectedId = options[tag].id
        UIView.animate(withDuration: 0.2) { self.updateSelection() }
    }

    private func updateSelection() {
        for (i, option) in options.enumerated() {
            let isSelected = option.id == selectedId
            rowViews[i].layer.borderColor = isSelected ? UIColor.systemBlue.cgColor : UIColor.separator.cgColor
            rowViews[i].backgroundColor = isSelected ? UIColor.systemBlue.withAlphaComponent(0.05) : .systemBackground
            iconContainers[i].backgroundColor = isSelected ? .systemBlue : .secondarySystemBackground
            iconViews[i].tintColor = isSelected ? .white : .secondaryLabel
            radioOuters[i].layer.borderColor = isSelected ? UIColor.systemBlue.cgColor : UIColor.separator.cgColor
            radioOuters[i].backgroundColor = isSelected ? .systemBlue : .clear
            radioInners[i].alpha = isSelected ? 1 : 0
            titleLabels[i].textColor = isSelected ? .systemBlue : .label
        }
    }
}

// MARK: - Usage
// let iconRadio = IconDescriptionRadioView()
// view.addSubview(iconRadio)
// iconRadio.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     iconRadio.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     iconRadio.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
// ])
`,
  },
  {
    title: "Color Picker Radio",
    description: "Circular color swatch selection with checkmark.",
    preview: <ColorRadioPreview />,
    swiftCode: `import UIKit

class ColorPickerRadioView: UIView {

    struct ColorOption {
        let id: String
        let color: UIColor
    }

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 12
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let colors: [ColorOption] = [
        ColorOption(id: "blue", color: .systemBlue),
        ColorOption(id: "purple", color: .systemPurple),
        ColorOption(id: "pink", color: .systemPink),
        ColorOption(id: "orange", color: .systemOrange),
        ColorOption(id: "green", color: .systemGreen),
        ColorOption(id: "red", color: .systemRed),
    ]

    private var selectedId = "blue"
    private var swatchViews: [UIView] = []
    private var checkmarks: [UIImageView] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        for (index, option) in colors.enumerated() {
            let swatch = UIView()
            swatch.translatesAutoresizingMaskIntoConstraints = false
            swatch.backgroundColor = option.color
            swatch.layer.cornerRadius = 16
            swatch.tag = index

            let tap = UITapGestureRecognizer(target: self, action: #selector(didTapColor(_:)))
            swatch.addGestureRecognizer(tap)

            let checkmark = UIImageView(image: UIImage(
                systemName: "checkmark",
                withConfiguration: UIImage.SymbolConfiguration(pointSize: 14, weight: .bold)
            ))
            checkmark.translatesAutoresizingMaskIntoConstraints = false
            checkmark.tintColor = .white
            checkmark.isHidden = true

            swatch.addSubview(checkmark)

            NSLayoutConstraint.activate([
                swatch.widthAnchor.constraint(equalToConstant: 32),
                swatch.heightAnchor.constraint(equalToConstant: 32),
                checkmark.centerXAnchor.constraint(equalTo: swatch.centerXAnchor),
                checkmark.centerYAnchor.constraint(equalTo: swatch.centerYAnchor),
            ])

            swatchViews.append(swatch)
            checkmarks.append(checkmark)
            stackView.addArrangedSubview(swatch)
        }

        updateSelection()
    }

    @objc private func didTapColor(_ gesture: UITapGestureRecognizer) {
        guard let tag = gesture.view?.tag else { return }
        selectedId = colors[tag].id
        UIView.animate(withDuration: 0.2) { self.updateSelection() }
    }

    private func updateSelection() {
        for (i, option) in colors.enumerated() {
            let isSelected = option.id == selectedId
            checkmarks[i].isHidden = !isSelected
            swatchViews[i].transform = isSelected
                ? CGAffineTransform(scaleX: 1.1, y: 1.1)
                : .identity
            swatchViews[i].layer.borderWidth = isSelected ? 3 : 0
            swatchViews[i].layer.borderColor = option.color.withAlphaComponent(0.3).cgColor
        }
    }
}

// MARK: - Usage
// let colorPicker = ColorPickerRadioView()
// view.addSubview(colorPicker)
// colorPicker.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     colorPicker.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     colorPicker.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Chip Radio Button",
    description: "Horizontal pill-shaped segmented selection.",
    preview: <HorizontalChipRadioPreview />,
    swiftCode: `import UIKit

class ChipRadioView: UIView {

    struct ChipOption {
        let id: String
        let label: String
    }

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 8
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let options: [ChipOption] = [
        ChipOption(id: "daily", label: "Daily"),
        ChipOption(id: "weekly", label: "Weekly"),
        ChipOption(id: "monthly", label: "Monthly"),
        ChipOption(id: "yearly", label: "Yearly"),
    ]

    private var selectedId = "daily"
    private var chipButtons: [UIButton] = []

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        for (index, option) in options.enumerated() {
            let button = UIButton(type: .system)
            button.setTitle(option.label, for: .normal)
            button.titleLabel?.font = .systemFont(ofSize: 14, weight: .medium)
            button.layer.cornerRadius = 18
            button.contentEdgeInsets = UIEdgeInsets(top: 8, left: 16, bottom: 8, right: 16)
            button.tag = index
            button.translatesAutoresizingMaskIntoConstraints = false
            button.addTarget(self, action: #selector(didTapChip(_:)), for: .touchUpInside)

            button.heightAnchor.constraint(equalToConstant: 36).isActive = true

            chipButtons.append(button)
            stackView.addArrangedSubview(button)
        }

        updateSelection()
    }

    @objc private func didTapChip(_ sender: UIButton) {
        selectedId = options[sender.tag].id
        UIView.animate(withDuration: 0.2) { self.updateSelection() }
    }

    private func updateSelection() {
        for (i, option) in options.enumerated() {
            let isSelected = option.id == selectedId
            let btn = chipButtons[i]
            btn.backgroundColor = isSelected ? .systemBlue : .secondarySystemBackground
            btn.setTitleColor(isSelected ? .white : .secondaryLabel, for: .normal)

            if isSelected {
                btn.layer.shadowColor = UIColor.systemBlue.cgColor
                btn.layer.shadowOpacity = 0.25
                btn.layer.shadowOffset = CGSize(width: 0, height: 4)
                btn.layer.shadowRadius = 8
            } else {
                btn.layer.shadowOpacity = 0
            }
        }
    }
}

// MARK: - Usage
// let chipRadio = ChipRadioView()
// view.addSubview(chipRadio)
// chipRadio.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     chipRadio.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     chipRadio.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default function RadioButton() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Radio Button</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style single-selection controls with various visual treatments.
        </p>
      </div>
      <div className="space-y-4">
        {radioStyles.map((style) => (
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
