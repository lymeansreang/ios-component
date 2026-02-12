"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

const defaultToggleSwift = `import UIKit

class DefaultToggleView: UIView {

    // Exposed callback for value changes
    var onToggleChanged: ((Bool) -> Void)?

    // Public state
    var isOn: Bool {
        get { toggleSwitch.isOn }
        set { toggleSwitch.isOn = newValue }
    }

    private let toggleSwitch: UISwitch = {
        let toggle = UISwitch()
        toggle.onTintColor = .systemBlue
        toggle.isOn = true
        toggle.translatesAutoresizingMaskIntoConstraints = false
        return toggle
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    func setOn(_ on: Bool, animated: Bool) {
        toggleSwitch.setOn(on, animated: animated)
    }

    // Allow external target-action if desired
    func addTarget(_ target: Any?, action: Selector, for controlEvents: UIControl.Event = .valueChanged) {
        toggleSwitch.addTarget(target, action: action, for: controlEvents)
    }

    private func setupView() {
        addSubview(toggleSwitch)

        toggleSwitch.addTarget(self, action: #selector(valueChanged(_:)), for: .valueChanged)

        NSLayoutConstraint.activate([
            toggleSwitch.centerXAnchor.constraint(equalTo: centerXAnchor),
            toggleSwitch.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])
    }

    @objc private func valueChanged(_ sender: UISwitch) {
        onToggleChanged?(sender.isOn)
    }
}

// MARK: - Usage
// let defaultToggle = DefaultToggleView()
// view.addSubview(defaultToggle)
// defaultToggle.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     defaultToggle.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     defaultToggle.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     defaultToggle.widthAnchor.constraint(equalToConstant: 80),
//     defaultToggle.heightAnchor.constraint(equalToConstant: 44)
// ])
// defaultToggle.addTarget(self, action: #selector(toggleChanged(_:)), for: .valueChanged)
// @objc private func toggleChanged(_ sender: UISwitch) {
//         print("Switch is now \(sender.isOn ? "ON" : "OFF")")
//     }
`;

const iconToggleSwift = `import UIKit

class IconToggleView: UIControl {
    
    private let trackView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 14
        view.backgroundColor = .systemGray5
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isUserInteractionEnabled = false
        return view
    }()

    private let thumbView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.backgroundColor = .white
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.15
        view.layer.shadowRadius = 4
        view.layer.shadowOffset = CGSize(width: 0, height: 2)
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isUserInteractionEnabled = false
        return view
    }()

    private let iconView: UIImageView = {
        let view = UIImageView()
        view.contentMode = .scaleAspectFit
        if #available(iOS 13.0, *) {
            let config = UIImage.SymbolConfiguration(pointSize: 13, weight: .semibold)
            view.preferredSymbolConfiguration = config
        }
        view.translatesAutoresizingMaskIntoConstraints = false
        view.isUserInteractionEnabled = false
        return view
    }()

    private var thumbLeading: NSLayoutConstraint!
    private var thumbTrailing: NSLayoutConstraint!
    
    // Track colors (configurable)
    public var onColor: UIColor = .systemBlue { didSet { updateUI(animated: false) } }
    public var offColor: UIColor = .systemGray5 { didSet { updateUI(animated: false) } }
    
    // Icon tints (configurable)
    public var onIconTint: UIColor = .systemIndigo { didSet { updateUI(animated: false) } }
    public var offIconTint: UIColor = .systemOrange { didSet { updateUI(animated: false) } }
    
    // Icon symbol names (configurable; must be valid SF Symbol names or nil to use defaults)
    public var onIconName: String? { didSet { updateUI(animated: false) } }
    public var offIconName: String? { didSet { updateUI(animated: false) } }
    
    // Current state (read-only from outside)
    private(set) var isOn: Bool = false

    override var intrinsicContentSize: CGSize {
        CGSize(width: 48, height: 28)
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        updateUI(animated: false)

        addTarget(self, action: #selector(didTap), for: .touchUpInside)

        let tap = UITapGestureRecognizer(target: self, action: #selector(didTap))
        addGestureRecognizer(tap)

        isAccessibilityElement = true
        accessibilityTraits = [.button]
        accessibilityLabel = "Icon Toggle"
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        updateUI(animated: false)

        addTarget(self, action: #selector(didTap), for: .touchUpInside)
        let tap = UITapGestureRecognizer(target: self, action: #selector(didTap))
        addGestureRecognizer(tap)

        isAccessibilityElement = true
        accessibilityTraits = [.button]
        accessibilityLabel = "Icon Toggle"
    }
    
    @objc private func didTap() {
        isOn.toggle()
        updateUI(animated: true)
        sendActions(for: .valueChanged)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        updateUI(animated: false)
    }
    
    public func setOn(_ on: Bool, animated: Bool) {
        guard on != isOn else { return }
        isOn = on
        updateUI(animated: animated)
        sendActions(for: .valueChanged)
    }
    
    private func updateUI(animated: Bool) {
        // Colors
        let trackOnColor = onColor
        let trackOffColor = offColor
        
        // Icon names (with fallback to defaults)
        let defaultMoon = UIImage(systemName: "moon.leading.half.filled") != nil ? "moon.leading.half.filled" : "moon.fill"
        let chosenOnIcon = onIconName ?? defaultMoon
        let chosenOffIcon = offIconName ?? "sun.max.fill"
        let iconName = isOn ? chosenOnIcon : chosenOffIcon
        
        // Icon tints
        let tint = isOn ? onIconTint : offIconTint

        iconView.image = UIImage(systemName: iconName)
        iconView.tintColor = tint

        let totalWidth = trackView.bounds.width
        let offLeading: CGFloat = 2
        let onLeading: CGFloat = max(2, totalWidth - 2 - 24)

        let applyChanges = {
            self.trackView.backgroundColor = self.isOn ? trackOnColor : trackOffColor
            let fallbackOnLeading: CGFloat = 22 // 48 - 2 - 24
            self.thumbLeading.constant = self.isOn
                ? (totalWidth > 0 ? onLeading : fallbackOnLeading)
                : offLeading
            self.layoutIfNeeded()
        }

        if animated {
            UIView.animate(withDuration: 0.18, delay: 0, options: [.curveEaseOut], animations: applyChanges)
        } else {
            applyChanges()
        }
    }

    private func setupView() {
        isUserInteractionEnabled = true

        addSubview(trackView)
        trackView.addSubview(thumbView)
        thumbView.addSubview(iconView)

        thumbLeading = thumbView.leadingAnchor.constraint(equalTo: trackView.leadingAnchor, constant: 2)
        thumbTrailing = thumbView.trailingAnchor.constraint(lessThanOrEqualTo: trackView.trailingAnchor, constant: -2)

        NSLayoutConstraint.activate([
            trackView.topAnchor.constraint(equalTo: topAnchor),
            trackView.bottomAnchor.constraint(equalTo: bottomAnchor),
            trackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            trackView.trailingAnchor.constraint(equalTo: trailingAnchor),

            thumbLeading,
            thumbTrailing,
            thumbView.centerYAnchor.constraint(equalTo: trackView.centerYAnchor),
            thumbView.heightAnchor.constraint(equalToConstant: 24),
            thumbView.widthAnchor.constraint(equalToConstant: 24),

            iconView.centerXAnchor.constraint(equalTo: thumbView.centerXAnchor),
            iconView.centerYAnchor.constraint(equalTo: thumbView.centerYAnchor),
            iconView.heightAnchor.constraint(equalToConstant: 16),
            iconView.widthAnchor.constraint(equalToConstant: 16),
        ])
    }
}

// MARK: - Usage
// let iconToggle = IconToggleView()
//     override func viewDidLoad() {
//         super.viewDidLoad()
//         view.backgroundColor = .systemBackground
//         view.addSubview(iconToggle)
//         iconToggle.translatesAutoresizingMaskIntoConstraints = false
//         NSLayoutConstraint.activate([
//             iconToggle.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//             iconToggle.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//             iconToggle.widthAnchor.constraint(equalToConstant: 48),
//             iconToggle.heightAnchor.constraint(equalToConstant: 28),
//         ])
//         iconToggle.addTarget(self, action: #selector(valueChanged(_:)), for: .valueChanged)
//         iconToggle.setOn(true, animated: false)
//     }
//     @objc func valueChanged(_ sender: IconToggleView) { print(sender.isOn) }
`;

export default function Toggle() {
  const [isDefaultOn, setIsDefaultOn] = useState(true);
  const [isIconOn, setIsIconOn] = useState(true);

  const toggleStyles = [
    {
      title: "Default Toggle",
      description: "Classic iOS-style switch with a smooth thumb.",
      preview: (
        <button
          type="button"
          role="switch"
          aria-checked={isDefaultOn}
          onClick={() => setIsDefaultOn((prev) => !prev)}
          className={`relative inline-flex w-12 h-7 items-center rounded-full transition-colors ${
            isDefaultOn ? "bg-blue-500" : "bg-neutral-200 dark:bg-neutral-700"
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
              isDefaultOn ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      ),
      swiftCode: defaultToggleSwift,
    },
    {
      title: "Icon Toggle",
      description: "Sun when off, half-moon when on, inside the thumb.",
      preview: (
        <button
          type="button"
          aria-pressed={isIconOn}
          onClick={() => setIsIconOn((prev) => !prev)}
          role="switch"
          aria-checked={isIconOn}
          className={`relative inline-flex w-12 h-7 items-center rounded-full transition-colors ${
            isIconOn ? "bg-blue-500" : "bg-neutral-200 dark:bg-neutral-700"
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
              isIconOn ? "translate-x-5" : "translate-x-0.5"
            }`}
          >
            <span className="absolute inset-0 flex items-center justify-center">
              {isIconOn ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-indigo-500"
                >
                  <path d="M12 3a7.5 7.5 0 1 0 9 9 9 9 0 1 1-9-9z" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M6.34 17.66l-1.41 1.41" />
                  <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
              )}
            </span>
          </span>
        </button>
      ),
      swiftCode: iconToggleSwift,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Toggle</h2>
        <p className="text-neutral-500 mt-1">iOS-style switch controls.</p>
      </div>
      <div className="space-y-4">
        {toggleStyles.map((style) => (
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
