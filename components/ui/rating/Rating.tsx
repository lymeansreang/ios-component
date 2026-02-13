"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

/* ------------------------------------------------------------------ */
/*  Preview helpers                                                    */
/* ------------------------------------------------------------------ */

function StarRatingPreview() {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform duration-150 hover:scale-110 active:scale-95"
          >
            <svg
              className={`w-8 h-8 transition-colors duration-150 ${
                star <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-neutral-200 dark:text-neutral-700"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-sm text-neutral-500">{rating} out of 5</p>
    </div>
  );
}

function HeartRatingPreview() {
  const [rating, setRating] = useState(2);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((heart) => (
          <button
            key={heart}
            onClick={() => setRating(heart)}
            className="transition-transform duration-150 hover:scale-110 active:scale-90"
          >
            <svg
              className={`w-7 h-7 transition-colors duration-200 ${
                heart <= rating
                  ? "text-red-500"
                  : "text-neutral-200 dark:text-neutral-700"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-sm text-neutral-500">{rating} of 5</p>
    </div>
  );
}

function EmojiRatingPreview() {
  const [selected, setSelected] = useState(3);
  const emojis = [
    { id: 1, emoji: "😡", label: "Terrible" },
    { id: 2, emoji: "😕", label: "Bad" },
    { id: 3, emoji: "😐", label: "Okay" },
    { id: 4, emoji: "😊", label: "Good" },
    { id: 5, emoji: "🤩", label: "Amazing" },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {emojis.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
              selected === item.id
                ? "bg-blue-50 dark:bg-blue-500/10 scale-110"
                : "hover:bg-neutral-50 dark:hover:bg-neutral-800 opacity-50 hover:opacity-80"
            }`}
          >
            <span className="text-2xl">{item.emoji}</span>
          </button>
        ))}
      </div>
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {emojis.find((e) => e.id === selected)?.label}
      </p>
    </div>
  );
}

function SliderRatingPreview() {
  const [value, setValue] = useState(7);

  const getColor = (v: number) => {
    if (v <= 3) return { bar: "bg-red-500", text: "text-red-500" };
    if (v <= 6) return { bar: "bg-amber-500", text: "text-amber-500" };
    return { bar: "bg-green-500", text: "text-green-500" };
  };
  const colors = getColor(value);

  return (
    <div className="w-72 flex flex-col items-center gap-4">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-400">0</span>
          <span className={`text-2xl font-bold ${colors.text}`}>{value}</span>
          <span className="text-xs text-neutral-400">10</span>
        </div>
        <div className="relative w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-200 ${colors.bar}`}
            style={{ width: `${value * 10}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full mt-1 accent-blue-500 cursor-pointer"
        />
      </div>
      <p className="text-sm text-neutral-500">
        {value <= 3 ? "Needs Improvement" : value <= 6 ? "Average" : "Excellent"}
      </p>
    </div>
  );
}

function ReviewCardPreview() {
  const [rating, setRating] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="w-72 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-center">
        <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-neutral-900 dark:text-white">Thank you!</p>
        <p className="text-xs text-neutral-500 mt-1">Your feedback has been submitted.</p>
        <button
          onClick={() => { setSubmitted(false); setRating(4); }}
          className="mt-3 text-xs text-blue-500 font-medium"
        >
          Rate again
        </button>
      </div>
    );
  }

  return (
    <div className="w-72 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
      <p className="text-sm font-semibold text-neutral-900 dark:text-white text-center">How was your experience?</p>
      <p className="text-xs text-neutral-500 text-center mt-1">We&apos;d love your feedback</p>
      <div className="flex justify-center gap-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform duration-150 hover:scale-110 active:scale-95"
          >
            <svg
              className={`w-8 h-8 transition-colors duration-150 ${
                star <= rating ? "text-yellow-400" : "text-neutral-200 dark:text-neutral-700"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      <button
        onClick={() => setSubmitted(true)}
        className="w-full mt-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-[0.98] transition-all"
      >
        Submit Review
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Style definitions                                                  */
/* ------------------------------------------------------------------ */

const ratingStyles = [
  {
    title: "Star Rating",
    description: "Classic five-star rating with hover preview.",
    preview: <StarRatingPreview />,
    swiftCode: `import UIKit

class StarRatingView: UIView {

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 4
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let label: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14)
        l.textColor = .secondaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private var starButtons: [UIButton] = []
    private(set) var rating: Int = 3 {
        didSet { updateStars() }
    }

    var onRatingChanged: ((Int) -> Void)?

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
        addSubview(label)

        for i in 1...5 {
            let button = UIButton(type: .system)
            let config = UIImage.SymbolConfiguration(pointSize: 28)
            button.setImage(UIImage(systemName: "star.fill", withConfiguration: config), for: .normal)
            button.tag = i
            button.addTarget(self, action: #selector(didTapStar(_:)), for: .touchUpInside)
            button.translatesAutoresizingMaskIntoConstraints = false
            starButtons.append(button)
            stackView.addArrangedSubview(button)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.centerXAnchor.constraint(equalTo: centerXAnchor),

            label.topAnchor.constraint(equalTo: stackView.bottomAnchor, constant: 8),
            label.centerXAnchor.constraint(equalTo: centerXAnchor),
            label.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        updateStars()
    }

    @objc private func didTapStar(_ sender: UIButton) {
        rating = sender.tag
        onRatingChanged?(rating)
    }

    private func updateStars() {
        for button in starButtons {
            button.tintColor = button.tag <= rating ? .systemYellow : .separator
        }
        label.text = "\\(rating) out of 5"
    }
}

// MARK: - Usage
// let starRating = StarRatingView()
// view.addSubview(starRating)
// starRating.translatesAutoresizingMaskIntoConstraints = false
// starRating.onRatingChanged = { rating in print("Rating: \\(rating)") }
// NSLayoutConstraint.activate([
//     starRating.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     starRating.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Heart Rating",
    description: "Heart-shaped rating for likes and favorites.",
    preview: <HeartRatingPreview />,
    swiftCode: `import UIKit

class HeartRatingView: UIView {

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 6
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let label: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14)
        l.textColor = .secondaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private var heartButtons: [UIButton] = []
    private(set) var rating: Int = 2 {
        didSet { updateHearts() }
    }

    var onRatingChanged: ((Int) -> Void)?

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
        addSubview(label)

        for i in 1...5 {
            let button = UIButton(type: .system)
            let config = UIImage.SymbolConfiguration(pointSize: 24)
            button.setImage(UIImage(systemName: "heart.fill", withConfiguration: config), for: .normal)
            button.tag = i
            button.addTarget(self, action: #selector(didTapHeart(_:)), for: .touchUpInside)
            button.translatesAutoresizingMaskIntoConstraints = false
            heartButtons.append(button)
            stackView.addArrangedSubview(button)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.centerXAnchor.constraint(equalTo: centerXAnchor),

            label.topAnchor.constraint(equalTo: stackView.bottomAnchor, constant: 8),
            label.centerXAnchor.constraint(equalTo: centerXAnchor),
            label.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        updateHearts()
    }

    @objc private func didTapHeart(_ sender: UIButton) {
        rating = sender.tag
        onRatingChanged?(rating)

        UIView.animate(withDuration: 0.15, animations: {
            sender.transform = CGAffineTransform(scaleX: 1.3, y: 1.3)
        }) { _ in
            UIView.animate(withDuration: 0.1) {
                sender.transform = .identity
            }
        }
    }

    private func updateHearts() {
        for button in heartButtons {
            button.tintColor = button.tag <= rating ? .systemRed : .separator
        }
        label.text = "\\(rating) of 5"
    }
}

// MARK: - Usage
// let heartRating = HeartRatingView()
// view.addSubview(heartRating)
// heartRating.translatesAutoresizingMaskIntoConstraints = false
// heartRating.onRatingChanged = { rating in print("Hearts: \\(rating)") }
`,
  },
  {
    title: "Emoji Rating",
    description: "Expressive emoji-based feedback selector.",
    preview: <EmojiRatingPreview />,
    swiftCode: `import UIKit

class EmojiRatingView: UIView {

    struct EmojiOption {
        let id: Int
        let emoji: String
        let label: String
    }

    private let stackView: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 8
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let feedbackLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14, weight: .medium)
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let emojis: [EmojiOption] = [
        EmojiOption(id: 1, emoji: "😡", label: "Terrible"),
        EmojiOption(id: 2, emoji: "😕", label: "Bad"),
        EmojiOption(id: 3, emoji: "😐", label: "Okay"),
        EmojiOption(id: 4, emoji: "😊", label: "Good"),
        EmojiOption(id: 5, emoji: "🤩", label: "Amazing"),
    ]

    private var emojiButtons: [UIButton] = []
    private var selectedId = 3

    var onSelected: ((Int, String) -> Void)?

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
        addSubview(feedbackLabel)

        for (index, option) in emojis.enumerated() {
            let button = UIButton(type: .system)
            button.setTitle(option.emoji, for: .normal)
            button.titleLabel?.font = .systemFont(ofSize: 28)
            button.tag = index
            button.layer.cornerRadius = 12
            button.translatesAutoresizingMaskIntoConstraints = false
            button.addTarget(self, action: #selector(didTapEmoji(_:)), for: .touchUpInside)

            NSLayoutConstraint.activate([
                button.widthAnchor.constraint(equalToConstant: 48),
                button.heightAnchor.constraint(equalToConstant: 48),
            ])

            emojiButtons.append(button)
            stackView.addArrangedSubview(button)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.centerXAnchor.constraint(equalTo: centerXAnchor),

            feedbackLabel.topAnchor.constraint(equalTo: stackView.bottomAnchor, constant: 12),
            feedbackLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            feedbackLabel.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        updateSelection()
    }

    @objc private func didTapEmoji(_ sender: UIButton) {
        selectedId = emojis[sender.tag].id
        onSelected?(selectedId, emojis[sender.tag].label)

        UIView.animate(withDuration: 0.2) { self.updateSelection() }

        UIView.animate(withDuration: 0.15, animations: {
            sender.transform = CGAffineTransform(scaleX: 1.2, y: 1.2)
        }) { _ in
            UIView.animate(withDuration: 0.1) { sender.transform = .identity }
        }
    }

    private func updateSelection() {
        for (i, option) in emojis.enumerated() {
            let isSelected = option.id == selectedId
            emojiButtons[i].alpha = isSelected ? 1.0 : 0.4
            emojiButtons[i].backgroundColor = isSelected
                ? UIColor.systemBlue.withAlphaComponent(0.08)
                : .clear
        }
        feedbackLabel.text = emojis.first { $0.id == selectedId }?.label
    }
}

// MARK: - Usage
// let emojiRating = EmojiRatingView()
// view.addSubview(emojiRating)
// emojiRating.translatesAutoresizingMaskIntoConstraints = false
// emojiRating.onSelected = { id, label in print("\\(label)") }
`,
  },
  {
    title: "Slider Rating",
    description: "Numeric slider with dynamic color-coded feedback.",
    preview: <SliderRatingPreview />,
    swiftCode: `import UIKit

class SliderRatingView: UIView {

    private let minLabel: UILabel = {
        let l = UILabel()
        l.text = "0"
        l.font = .systemFont(ofSize: 12)
        l.textColor = .tertiaryLabel
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let maxLabel: UILabel = {
        let l = UILabel()
        l.text = "10"
        l.font = .systemFont(ofSize: 12)
        l.textColor = .tertiaryLabel
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let valueLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 32, weight: .bold)
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let slider: UISlider = {
        let s = UISlider()
        s.minimumValue = 0
        s.maximumValue = 10
        s.value = 7
        s.translatesAutoresizingMaskIntoConstraints = false
        return s
    }()

    private let feedbackLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14)
        l.textColor = .secondaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        updateValue()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        updateValue()
    }

    private func setupView() {
        addSubview(minLabel)
        addSubview(maxLabel)
        addSubview(valueLabel)
        addSubview(slider)
        addSubview(feedbackLabel)

        slider.addTarget(self, action: #selector(sliderChanged), for: .valueChanged)

        NSLayoutConstraint.activate([
            minLabel.topAnchor.constraint(equalTo: topAnchor),
            minLabel.leadingAnchor.constraint(equalTo: leadingAnchor),

            valueLabel.topAnchor.constraint(equalTo: topAnchor),
            valueLabel.centerXAnchor.constraint(equalTo: centerXAnchor),

            maxLabel.topAnchor.constraint(equalTo: topAnchor),
            maxLabel.trailingAnchor.constraint(equalTo: trailingAnchor),

            slider.topAnchor.constraint(equalTo: valueLabel.bottomAnchor, constant: 12),
            slider.leadingAnchor.constraint(equalTo: leadingAnchor),
            slider.trailingAnchor.constraint(equalTo: trailingAnchor),
            slider.widthAnchor.constraint(equalToConstant: 280),

            feedbackLabel.topAnchor.constraint(equalTo: slider.bottomAnchor, constant: 12),
            feedbackLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
            feedbackLabel.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    @objc private func sliderChanged() {
        updateValue()
    }

    private func updateValue() {
        let val = Int(slider.value.rounded())
        valueLabel.text = "\\(val)"

        let color: UIColor
        let feedback: String
        if val <= 3 {
            color = .systemRed
            feedback = "Needs Improvement"
        } else if val <= 6 {
            color = .systemOrange
            feedback = "Average"
        } else {
            color = .systemGreen
            feedback = "Excellent"
        }

        valueLabel.textColor = color
        slider.tintColor = color
        feedbackLabel.text = feedback
    }
}

// MARK: - Usage
// let sliderRating = SliderRatingView()
// view.addSubview(sliderRating)
// sliderRating.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     sliderRating.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     sliderRating.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Review Card",
    description: "Complete feedback card with star rating and submit action.",
    preview: <ReviewCardPreview />,
    swiftCode: `import UIKit

class ReviewCardView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 16
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.separator.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let l = UILabel()
        l.text = "How was your experience?"
        l.font = .systemFont(ofSize: 15, weight: .semibold)
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let subtitleLabel: UILabel = {
        let l = UILabel()
        l.text = "We'd love your feedback"
        l.font = .systemFont(ofSize: 12)
        l.textColor = .secondaryLabel
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let starStack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 4
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private let submitButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Submit Review", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 15, weight: .semibold)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 12
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private var starButtons: [UIButton] = []
    private var rating = 4

    var onSubmit: ((Int) -> Void)?

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(titleLabel)
        containerView.addSubview(subtitleLabel)
        containerView.addSubview(starStack)
        containerView.addSubview(submitButton)

        for i in 1...5 {
            let button = UIButton(type: .system)
            let config = UIImage.SymbolConfiguration(pointSize: 28)
            button.setImage(UIImage(systemName: "star.fill", withConfiguration: config), for: .normal)
            button.tag = i
            button.addTarget(self, action: #selector(didTapStar(_:)), for: .touchUpInside)
            starButtons.append(button)
            starStack.addArrangedSubview(button)
        }

        submitButton.addTarget(self, action: #selector(didTapSubmit), for: .touchUpInside)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.widthAnchor.constraint(equalToConstant: 290),

            titleLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 20),
            titleLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            subtitleLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),

            starStack.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 16),
            starStack.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),

            submitButton.topAnchor.constraint(equalTo: starStack.bottomAnchor, constant: 16),
            submitButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 20),
            submitButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -20),
            submitButton.heightAnchor.constraint(equalToConstant: 44),
            submitButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -20),
        ])

        updateStars()
    }

    @objc private func didTapStar(_ sender: UIButton) {
        rating = sender.tag
        updateStars()
    }

    @objc private func didTapSubmit() {
        onSubmit?(rating)
    }

    private func updateStars() {
        for button in starButtons {
            button.tintColor = button.tag <= rating ? .systemYellow : .separator
        }
    }
}

// MARK: - Usage
// let reviewCard = ReviewCardView()
// view.addSubview(reviewCard)
// reviewCard.translatesAutoresizingMaskIntoConstraints = false
// reviewCard.onSubmit = { rating in print("Submitted: \\(rating) stars") }
// NSLayoutConstraint.activate([
//     reviewCard.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     reviewCard.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default function Rating() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Rating</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style rating controls with stars, hearts, emojis, and interactive feedback.
        </p>
      </div>
      <div className="space-y-4">
        {ratingStyles.map((style) => (
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
