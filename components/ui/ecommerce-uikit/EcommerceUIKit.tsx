"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

const productCardSwiftCode = `import UIKit

class ProductCardView: UIView {

    private let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 2
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let priceLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 16, weight: .bold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let addButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Add to Cart", for: .normal)
        button.backgroundColor = .systemBlue
        button.tintColor = .white
        button.layer.cornerRadius = 10
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var onAddToCart: (() -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapAdd() {
        onAddToCart?()
    }

    private func setupView() {
        layer.cornerRadius = 14
        backgroundColor = .secondarySystemBackground
        clipsToBounds = true
        addSubview(imageView)
        addSubview(titleLabel)
        addSubview(priceLabel)
        addSubview(addButton)
        addButton.addTarget(self, action: #selector(didTapAdd), for: .touchUpInside)

        NSLayoutConstraint.activate([
            imageView.topAnchor.constraint(equalTo: topAnchor),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            imageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            imageView.heightAnchor.constraint(equalToConstant: 150),
            titleLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 10),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            priceLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            priceLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            addButton.topAnchor.constraint(equalTo: priceLabel.bottomAnchor, constant: 10),
            addButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            addButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            addButton.heightAnchor.constraint(equalToConstant: 38),
            addButton.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),
        ])
    }
}

// MARK: - Usage
// let card = ProductCardView()
`;

const quantitySwiftCode = `import UIKit

class QuantitySelectorView: UIView {

    private let minusButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("-", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let countLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let plusButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("+", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var count: Int = 1 { didSet { countLabel.text = "\\(count)" } }
    let minCount = 1

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapMinus() { count = max(minCount, count - 1) }
    @objc private func didTapPlus() { count += 1 }

    private func setupView() {
        layer.cornerRadius = 10
        backgroundColor = .secondarySystemBackground
        addSubview(minusButton)
        addSubview(countLabel)
        addSubview(plusButton)
        countLabel.text = "\\(count)"
        minusButton.addTarget(self, action: #selector(didTapMinus), for: .touchUpInside)
        plusButton.addTarget(self, action: #selector(didTapPlus), for: .touchUpInside)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 36),
            minusButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            minusButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            countLabel.leadingAnchor.constraint(equalTo: minusButton.trailingAnchor, constant: 8),
            countLabel.centerYAnchor.constraint(equalTo: centerYAnchor),
            countLabel.widthAnchor.constraint(equalToConstant: 24),
            plusButton.leadingAnchor.constraint(equalTo: countLabel.trailingAnchor, constant: 8),
            plusButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -8),
            plusButton.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])
    }
}
`;

const promoSwiftCode = `import UIKit

class PromoCodeFieldView: UIView {

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = "Promo code"
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let applyButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Apply", for: .normal)
        button.backgroundColor = .systemBlue
        button.tintColor = .white
        button.layer.cornerRadius = 10
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var onApply: ((String) -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapApply() {
        onApply?(textField.text ?? "")
    }

    private func setupView() {
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground
        addSubview(textField)
        addSubview(applyButton)
        applyButton.addTarget(self, action: #selector(didTapApply), for: .touchUpInside)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 46),
            textField.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            textField.centerYAnchor.constraint(equalTo: centerYAnchor),
            applyButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -6),
            applyButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            applyButton.widthAnchor.constraint(equalToConstant: 72),
            applyButton.heightAnchor.constraint(equalToConstant: 34),
            textField.trailingAnchor.constraint(equalTo: applyButton.leadingAnchor, constant: -8),
        ])
    }
}
`;

const summarySwiftCode = `import UIKit

class PriceSummaryView: UIView {

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 8
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    var rows: [(String, String)] = [("Subtotal", "$128.00"), ("Shipping", "$8.00"), ("Tax", "$9.52")]
    var total: String = "$145.52"

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
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground
        addSubview(stackView)

        for row in rows + [("Total", total)] {
            let line = UIStackView()
            line.axis = .horizontal
            line.distribution = .equalSpacing
            let l = UILabel()
            l.text = row.0
            let r = UILabel()
            r.text = row.1
            r.font = .systemFont(ofSize: 14, weight: row.0 == "Total" ? .bold : .regular)
            line.addArrangedSubview(l)
            line.addArrangedSubview(r)
            stackView.addArrangedSubview(line)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),
        ])
    }
}
`;

const stepperSwiftCode = `import UIKit

class CheckoutStepperView: UIView {

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.distribution = .fillEqually
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    var steps: [String] = ["Cart", "Address", "Payment", "Review"]
    var currentStep = 1
    let activeColor = UIColor.systemBlue

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapStep() {}

    private func setupView() {
        addSubview(stackView)
        for (index, _) in steps.enumerated() {
            let dot = UIView()
            dot.layer.cornerRadius = 12
            dot.backgroundColor = index <= currentStep ? activeColor : .systemGray5
            stackView.addArrangedSubview(dot)
            dot.heightAnchor.constraint(equalToConstant: 24).isActive = true
        }
        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}
`;

const timelineSwiftCode = `import UIKit

class OrderStatusTimelineView: UIView {

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 10
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    var steps: [String] = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"]
    var progress: Int = 3
    let doneColor = UIColor.systemGreen

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
            row.spacing = 8
            let dot = UILabel()
            dot.text = index < progress ? "✓" : "\\(index + 1)"
            dot.textAlignment = .center
            dot.backgroundColor = index < progress ? doneColor : .systemGray5
            dot.layer.cornerRadius = 10
            dot.clipsToBounds = true
            dot.widthAnchor.constraint(equalToConstant: 20).isActive = true
            dot.heightAnchor.constraint(equalToConstant: 20).isActive = true
            let text = UILabel()
            text.text = step
            row.addArrangedSubview(dot)
            row.addArrangedSubview(text)
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
`;

const cartCellSwiftCode = `import UIKit

class CartItemCellView: UIView {

    private let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 10
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let priceLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .bold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let quantityLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12)
        label.text = "x1"
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

    @objc private func didTapCell() {}

    private func setupView() {
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground
        addSubview(imageView)
        addSubview(titleLabel)
        addSubview(priceLabel)
        addSubview(quantityLabel)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 90),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 10),
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 68),
            imageView.heightAnchor.constraint(equalToConstant: 68),
            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 18),
            titleLabel.leadingAnchor.constraint(equalTo: imageView.trailingAnchor, constant: 10),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -10),
            priceLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            priceLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor),
            quantityLabel.centerYAnchor.constraint(equalTo: priceLabel.centerYAnchor),
            quantityLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -10),
        ])
    }
}
`;

const reviewSwiftCode = `import UIKit

class RatingReviewCardView: UIView {

    private let nameLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let starsLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 13, weight: .medium)
        label.textColor = .systemYellow
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let reviewLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.font = .systemFont(ofSize: 13)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var rating: Int = 4 { didSet { starsLabel.text = String(repeating: "★", count: rating) } }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapReview() {}

    private func setupView() {
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground
        addSubview(nameLabel)
        addSubview(starsLabel)
        addSubview(reviewLabel)
        nameLabel.text = "Ayla Rivera"
        starsLabel.text = String(repeating: "★", count: rating)
        reviewLabel.text = "Great quality and super fast delivery. Worth the price."

        NSLayoutConstraint.activate([
            nameLabel.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            nameLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            starsLabel.centerYAnchor.constraint(equalTo: nameLabel.centerYAnchor),
            starsLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            reviewLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 8),
            reviewLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            reviewLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            reviewLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -12),
        ])
    }
}
`;

function QuantityPreview() {
  const [qty, setQty] = useState(1);
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border px-3 py-2">
      <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-7 w-7 rounded bg-neutral-100 dark:bg-neutral-800">-</button>
      <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
      <button type="button" onClick={() => setQty((q) => q + 1)} className="h-7 w-7 rounded bg-neutral-100 dark:bg-neutral-800">+</button>
    </div>
  );
}

function PromoPreview() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex gap-2 rounded-xl border p-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none" />
        <button
          type="button"
          onClick={() => setApplied(code.trim() || null)}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
        >
          Apply
        </button>
      </div>
      {applied && <p className="text-xs text-emerald-600 dark:text-emerald-400">Applied: {applied}</p>}
    </div>
  );
}

function ProductCardPreview() {
  const [added, setAdded] = useState(false);
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900">
      <div className="h-40 w-full bg-gradient-to-br from-sky-200 via-cyan-100 to-blue-200 dark:from-sky-950 dark:via-cyan-900 dark:to-blue-950" />
      <div className="space-y-2 p-4">
        <p className="text-sm font-semibold">Premium Wireless Headphones</p>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">$129.00</span>
          <span className="text-xs line-through text-neutral-400">$179.00</span>
        </div>
        <button
          type="button"
          onClick={() => setAdded((p) => !p)}
          className={`w-full rounded-xl px-4 py-2 text-sm font-medium text-white ${added ? "bg-emerald-500" : "bg-blue-500"}`}
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function SummaryPreview() {
  const subtotal = 128;
  const shipping = 8;
  const tax = 9.52;
  const total = subtotal + shipping + tax;
  return (
    <div className="w-full max-w-sm rounded-2xl border p-4 text-sm">
      <p className="mb-2 font-semibold">Price Summary</p>
      <div className="space-y-1.5">
        <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>$128.00</span></div>
        <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>$8.00</span></div>
        <div className="flex justify-between"><span className="text-neutral-500">Tax</span><span>$9.52</span></div>
      </div>
      <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex justify-between font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
    </div>
  );
}

function StepperPreview() {
  const steps = ["Cart", "Address", "Payment", "Review"];
  const [active, setActive] = useState(1);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <button key={step} type="button" onClick={() => setActive(i)} className={`h-7 w-7 rounded-full text-xs font-semibold ${i <= active ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800"}`}>
            {i + 1}
          </button>
        ))}
      </div>
      <p className="text-xs text-neutral-500">Current: {steps[active]}</p>
    </div>
  );
}

function TimelinePreview() {
  const steps = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"];
  const [progress, setProgress] = useState(3);
  return (
    <div className="w-full max-w-sm space-y-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2 text-sm">
          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${i < progress ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800"}`}>
            {i < progress ? "✓" : i + 1}
          </span>
          <span className={i < progress ? "font-medium" : "text-neutral-500"}>{step}</span>
        </div>
      ))}
      <input type="range" min={1} max={steps.length} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full" />
    </div>
  );
}

function CartItemPreview() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border p-3 text-sm">
      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-cyan-900 dark:to-blue-900" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">Premium Wireless Headphones</p>
        <p className="text-xs text-neutral-500">Black / Standard</p>
        <p className="font-bold">$129.00</p>
      </div>
      <QuantityPreview />
    </div>
  );
}

function ReviewCardPreview() {
  const [rating, setRating] = useState(4);
  return (
    <div className="w-full max-w-sm rounded-xl border p-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Ayla Rivera</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className={star <= rating ? "text-yellow-500" : "text-neutral-300 dark:text-neutral-700"}>★</button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">Great quality and super fast delivery. Worth the price.</p>
    </div>
  );
}

const styles = [
  { title: "Product Card", swiftCode: productCardSwiftCode, preview: <ProductCardPreview /> },
  { title: "Quantity Selector", swiftCode: quantitySwiftCode, preview: <QuantityPreview /> },
  { title: "Price Summary View", swiftCode: summarySwiftCode, preview: <SummaryPreview /> },
  { title: "Promo Code Field", swiftCode: promoSwiftCode, preview: <PromoPreview /> },
  { title: "Checkout Progress Stepper", swiftCode: stepperSwiftCode, preview: <StepperPreview /> },
  { title: "Order Status Timeline", swiftCode: timelineSwiftCode, preview: <TimelinePreview /> },
  { title: "Cart Item Cell", swiftCode: cartCellSwiftCode, preview: <CartItemPreview /> },
  { title: "Rating & Review Card", swiftCode: reviewSwiftCode, preview: <ReviewCardPreview /> },
];

export default function EcommerceUIKit() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ecommerce UIKit</h2>
        <p className="text-neutral-500 mt-1">
          Shopping app building blocks with UIKit code and HTML previews.
        </p>
      </div>
      <div className="space-y-4">
        {styles.map((item) => (
          <CodePreview
            key={item.title}
            title={item.title}
            description="UIKit implementation + usage style."
            preview={item.preview}
            swiftCode={item.swiftCode}
          />
        ))}
      </div>
    </div>
  );
}
