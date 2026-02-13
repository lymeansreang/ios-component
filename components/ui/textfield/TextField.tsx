"use client";

import { useMemo, useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

function MultilineTextViewPreview() {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950 p-3">
      {value.length === 0 && (
        <span className="pointer-events-none absolute left-6 top-5 text-sm text-neutral-500">
          Write your notes...
        </span>
      )}
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-28 w-full resize-none bg-transparent text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none"
      />
    </div>
  );
}

function SecurePasswordPreview() {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-72">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-transparent pl-4 pr-12 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 transition-colors"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Toggle password visibility"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {showPassword ? (
            <>
              <path d="m3 3 18 18" />
              <path d="M10.58 10.58A2 2 0 0 0 13.42 13.42" />
              <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3.03 3.89" />
              <path d="M6.61 6.61A17.16 17.16 0 0 0 2 12s3.5 7 10 7a10.6 10.6 0 0 0 5.39-1.61" />
            </>
          ) : (
            <>
              <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

function OTPPreview() {
  const [digits, setDigits] = useState<string[]>(Array.from({ length: 6 }, () => ""));
  const indexes = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

  const onDigitChange = (index: number, next: string) => {
    const value = next.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const cloned = [...prev];
      cloned[index] = value;
      return cloned;
    });
  };

  return (
    <div className="flex w-72 justify-between">
      {indexes.map((index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index]}
          onChange={(event) => onDigitChange(index, event.target.value)}
          className="h-11 w-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950 text-center text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      ))}
    </div>
  );
}

function DatePickerPreview() {
  const [date, setDate] = useState("2026-02-13");

  return (
    <div className="w-72 space-y-3">
      <div className="space-y-1">
        <p className="text-xs text-neutral-500">Inline style (web date input)</p>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-neutral-500">Wheel style (browser-dependent)</p>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100"
        />
      </div>
    </div>
  );
}

function TimePickerPreview() {
  const [time, setTime] = useState("09:30");

  return (
    <input
      type="time"
      value={time}
      onChange={(event) => setTime(event.target.value)}
      className="w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100"
    />
  );
}

function SelectPickerPreview() {
  const [value, setValue] = useState("Choose country");

  return (
    <select
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className="w-72 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-transparent px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
    >
      <option>Choose country</option>
      <option>United States</option>
      <option>Canada</option>
      <option>Japan</option>
    </select>
  );
}

const textFieldStyles = [
  {
    title: "Default Text Field",
    description: "iOS-style text field with subtle background and focus ring.",
    preview: (
      <input
        type="text"
        placeholder="Email"
        className="w-72 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-transparent px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 transition-colors"
      />
    ),
    swiftCode: `import UIKit

class DefaultTextFieldView: UIView {

    private let placeholder: String
    private let keyboardType: UIKeyboardType
    private let textField = UITextField()

    init(
        placeholder: String = "Email",
        keyboardType: UIKeyboardType = .emailAddress
    ) {
        self.placeholder = placeholder
        self.keyboardType = keyboardType
        super.init(frame: .zero)
        setupView()
    }

    override init(frame: CGRect) {
        self.placeholder = "Email"
        self.keyboardType = .emailAddress
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.placeholder = "Email"
        self.keyboardType = .emailAddress
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        textField.placeholder = placeholder
        textField.font = .systemFont(ofSize: 15, weight: .regular)
        textField.textColor = .label
        textField.backgroundColor = .secondarySystemBackground
        textField.layer.cornerRadius = 12
        textField.layer.borderWidth = 1
        textField.layer.borderColor = UIColor.clear.cgColor
        textField.clearButtonMode = .whileEditing
        textField.autocapitalizationType = .none
        textField.keyboardType = keyboardType
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.setLeftPadding(14)
        textField.setRightPadding(14)

        addSubview(textField)
        NSLayoutConstraint.activate([
            textField.topAnchor.constraint(equalTo: topAnchor),
            textField.leadingAnchor.constraint(equalTo: leadingAnchor),
            textField.trailingAnchor.constraint(equalTo: trailingAnchor),
            textField.bottomAnchor.constraint(equalTo: bottomAnchor),
            textField.heightAnchor.constraint(equalToConstant: 44),
            textField.widthAnchor.constraint(greaterThanOrEqualToConstant: 200),
        ])
    }
}

private extension UITextField {
    func setLeftPadding(_ value: CGFloat) {
        let padding = UIView(frame: CGRect(x: 0, y: 0, width: value, height: 1))
        leftView = padding
        leftViewMode = .always
    }

    func setRightPadding(_ value: CGFloat) {
        let padding = UIView(frame: CGRect(x: 0, y: 0, width: value, height: 1))
        rightView = padding
        rightViewMode = .always
    }
}

// MARK: - Usage
// let defaultField = DefaultTextFieldView(
//     placeholder: "Username",
//     keyboardType: .default
// )
// view.addSubview(defaultField)
// defaultField.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     defaultField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     defaultField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Icon Text Field",
    description: "Text field with leading icon and search style.",
    preview: (
      <div className="relative w-72">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-transparent pl-10 pr-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/50 transition-colors"
        />
      </div>
    ),
    swiftCode: `import UIKit

class IconTextFieldView: UIView {

    private let placeholder: String
    private let iconImage: UIImage?
    private let iconTint: UIColor
    private let textField = UITextField()

    init(
        placeholder: String = "Search",
        iconImage: UIImage? = UIImage(systemName: "magnifyingglass"),
        iconTint: UIColor = .secondaryLabel
    ) {
        self.placeholder = placeholder
        self.iconImage = iconImage
        self.iconTint = iconTint
        super.init(frame: .zero)
        setupView()
    }

    override init(frame: CGRect) {
        self.placeholder = "Search"
        self.iconImage = UIImage(systemName: "magnifyingglass")
        self.iconTint = .secondaryLabel
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.placeholder = "Search"
        self.iconImage = UIImage(systemName: "magnifyingglass")
        self.iconTint = .secondaryLabel
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        textField.placeholder = placeholder
        textField.font = .systemFont(ofSize: 15, weight: .regular)
        textField.textColor = .label
        textField.backgroundColor = .secondarySystemBackground
        textField.layer.cornerRadius = 12
        textField.clearButtonMode = .whileEditing
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.setLeftIcon(iconImage, tintColor: iconTint, padding: 10)
        textField.setRightPadding(12)

        addSubview(textField)
        NSLayoutConstraint.activate([
            textField.topAnchor.constraint(equalTo: topAnchor),
            textField.leadingAnchor.constraint(equalTo: leadingAnchor),
            textField.trailingAnchor.constraint(equalTo: trailingAnchor),
            textField.bottomAnchor.constraint(equalTo: bottomAnchor),
            textField.heightAnchor.constraint(equalToConstant: 44),
            textField.widthAnchor.constraint(greaterThanOrEqualToConstant: 200),
        ])
    }
}

private extension UITextField {
    func setLeftIcon(_ image: UIImage?, tintColor: UIColor, padding: CGFloat) {
        let icon = UIImageView(image: image)
        icon.tintColor = tintColor
        icon.contentMode = .scaleAspectFit

        let container = UIView(frame: CGRect(x: 0, y: 0, width: 34 + padding, height: 44))
        icon.frame = CGRect(x: padding, y: 13, width: 18, height: 18)
        container.addSubview(icon)

        leftView = container
        leftViewMode = .always
    }

    func setRightPadding(_ value: CGFloat) {
        let padding = UIView(frame: CGRect(x: 0, y: 0, width: value, height: 1))
        rightView = padding
        rightViewMode = .always
    }
}

// MARK: - Usage
// let iconField = IconTextFieldView(
//     placeholder: "Search products",
//     iconImage: UIImage(systemName: "line.3.horizontal.decrease.circle"),
//     iconTint: .systemBlue
// )
// view.addSubview(iconField)
// iconField.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     iconField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     iconField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Floating Label Text Field",
    description: "Placeholder floats to the top border when filled or focused.",
    preview: (
      <label className="relative w-72">
        <input
          type="text"
          placeholder=" "
          className="peer w-full rounded-xl bg-white dark:bg-neutral-950 border-gray-300 dark:border-gray-600 border px-4 pt-5 pb-2 text-sm text-neutral-900 dark:text-neutral-100  transition-colors"
        />

        <span className="pointer-events-none absolute left-3 px-2 rounded-md bg-white dark:bg-neutral-950 text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
          Full Name
        </span>
      </label>
    ),
    swiftCode: `import UIKit

class FloatingLabelTextFieldView: UIView {

    private let placeholder: String

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.backgroundColor = .systemBackground
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.gray.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = " "
        field.font = .systemFont(ofSize: 15, weight: .regular)
        field.textColor = .label
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let labelContainer: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 6
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let floatingLabel: UILabel = {
        let label = UILabel()
        label.text = " "
        label.font = .systemFont(ofSize: 15, weight: .regular)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private var labelTopConstraint: NSLayoutConstraint!
    private let inactiveBorderColor: CGColor = UIColor.gray.cgColor

    init(placeholder: String = "Full Name") {
        self.placeholder = placeholder
        super.init(frame: .zero)
        setupView()
        updateLabel(animated: false)
    }

    override init(frame: CGRect) {
        self.placeholder = "Full Name"
        super.init(frame: frame)
        setupView()
        updateLabel(animated: false)
    }

    required init?(coder: NSCoder) {
        self.placeholder = "Full Name"
        super.init(coder: coder)
        setupView()
        updateLabel(animated: false)
    }

    private func setupView() {
        addSubview(containerView)
        addSubview(labelContainer)
        labelContainer.addSubview(floatingLabel)
        containerView.addSubview(textField)
        containerView.layer.borderColor = inactiveBorderColor
        floatingLabel.text = placeholder

        textField.addTarget(self, action: #selector(editingChanged), for: .editingChanged)
        textField.addTarget(self, action: #selector(editingChanged), for: .editingDidBegin)
        textField.addTarget(self, action: #selector(editingChanged), for: .editingDidEnd)

        labelTopConstraint = labelContainer.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 14)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 48),
            containerView.widthAnchor.constraint(greaterThanOrEqualToConstant: 200),

            labelTopConstraint,
            labelContainer.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 10),

            floatingLabel.leadingAnchor.constraint(equalTo: labelContainer.leadingAnchor, constant: 6),
            floatingLabel.trailingAnchor.constraint(equalTo: labelContainer.trailingAnchor, constant: -6),
            floatingLabel.topAnchor.constraint(equalTo: labelContainer.topAnchor, constant: 2),
            floatingLabel.bottomAnchor.constraint(equalTo: labelContainer.bottomAnchor, constant: -2),

            textField.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 14),
            textField.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -14),
            textField.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -8),
            textField.topAnchor.constraint(greaterThanOrEqualTo: containerView.topAnchor, constant: 10),
        ])
    }

    @objc private func editingChanged() {
        updateLabel(animated: true)
    }

    private func updateLabel(animated: Bool) {
        let isActive = (textField.isFirstResponder || !(textField.text ?? "").isEmpty)
        let updates = {
            self.labelTopConstraint.constant = isActive ? -6 : 14
            self.floatingLabel.font = .systemFont(ofSize: isActive ? 11 : 15, weight: .regular)
            self.floatingLabel.textColor = isActive ? .systemBlue : .secondaryLabel
            self.containerView.layer.borderColor = isActive
                ? UIColor.systemBlue.withAlphaComponent(0.4).cgColor
                : self.inactiveBorderColor
            self.layoutIfNeeded()
        }
        if animated {
            UIView.animate(withDuration: 0.15, delay: 0, options: [.curveEaseOut], animations: updates)
        } else {
            updates()
        }
    }
}

// MARK: - Usage
// let floatingField = FloatingLabelTextFieldView(placeholder: "Phone Number")
// view.addSubview(floatingField)
// floatingField.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     floatingField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     floatingField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// Provide a width so the internal container has a known size
//floatingField.widthAnchor.constraint(greaterThanOrEqualToConstant: 240)
// ])
`,
  },
  {
    title: "Floating Label + Right Button",
    description: "Floating label text field with a trailing action button.",
    preview: (
      <label className="relative block w-72">
        <input
          type="text"
          placeholder=" "
          className="peer w-full rounded-xl bg-white dark:bg-neutral-950 border-gray-300 dark:border-gray-600 border pl-4 pr-20 pt-5 pb-2 text-sm text-neutral-900 dark:text-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
        <span className="pointer-events-none absolute left-3 px-2 rounded-md bg-white dark:bg-neutral-950 text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
          Email
        </span>
        <button
          type="button"
          aria-label="Verify email"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m20 6-11 11-5-5" />
          </svg>
        </button>
      </label>
    ),
    swiftCode: `import UIKit

class FloatingLabelButtonTextFieldView: UIView {

    private let placeholder: String
    private let buttonImage: UIImage?
    private let buttonTint: UIColor

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.backgroundColor = .systemBackground
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.gray.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = " "
        field.font = .systemFont(ofSize: 15, weight: .regular)
        field.textColor = .label
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let actionButton: UIButton = {
        let button = UIButton(type: .system)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 8
        button.widthAnchor.constraint(equalToConstant: 32).isActive = true
        button.heightAnchor.constraint(equalToConstant: 32).isActive = true
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let labelContainer: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 6
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let floatingLabel: UILabel = {
        let label = UILabel()
        label.text = " "
        label.font = .systemFont(ofSize: 15, weight: .regular)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private var labelTopConstraint: NSLayoutConstraint!
    private let inactiveBorderColor: CGColor = UIColor.gray.cgColor

    init(
        placeholder: String = "Email",
        buttonImage: UIImage? = UIImage(systemName: "checkmark"),
        buttonTint: UIColor = .white
    ) {
        self.placeholder = placeholder
        self.buttonImage = buttonImage
        self.buttonTint = buttonTint
        super.init(frame: .zero)
        setupView()
        updateLabel(animated: false)
    }

    override init(frame: CGRect) {
        self.placeholder = "Email"
        self.buttonImage = UIImage(systemName: "checkmark")
        self.buttonTint = .white
        super.init(frame: frame)
        setupView()
        updateLabel(animated: false)
    }

    required init?(coder: NSCoder) {
        self.placeholder = "Email"
        self.buttonImage = UIImage(systemName: "checkmark")
        self.buttonTint = .white
        super.init(coder: coder)
        setupView()
        updateLabel(animated: false)
    }

    private func setupView() {
        addSubview(containerView)
        addSubview(labelContainer)
        labelContainer.addSubview(floatingLabel)
        containerView.addSubview(textField)
        containerView.addSubview(actionButton)
        containerView.layer.borderColor = inactiveBorderColor
        floatingLabel.text = placeholder
        actionButton.tintColor = buttonTint
        let imageConfig = UIImage.SymbolConfiguration(pointSize: 13, weight: .semibold)
        actionButton.setImage(buttonImage?.withConfiguration(imageConfig), for: .normal)

        textField.addTarget(self, action: #selector(editingChanged), for: .editingChanged)
        textField.addTarget(self, action: #selector(editingChanged), for: .editingDidBegin)
        textField.addTarget(self, action: #selector(editingChanged), for: .editingDidEnd)

        labelTopConstraint = labelContainer.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 14)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 48),
            containerView.widthAnchor.constraint(greaterThanOrEqualToConstant: 240),

            labelTopConstraint,
            labelContainer.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 10),

            floatingLabel.leadingAnchor.constraint(equalTo: labelContainer.leadingAnchor, constant: 6),
            floatingLabel.trailingAnchor.constraint(equalTo: labelContainer.trailingAnchor, constant: -6),
            floatingLabel.topAnchor.constraint(equalTo: labelContainer.topAnchor, constant: 2),
            floatingLabel.bottomAnchor.constraint(equalTo: labelContainer.bottomAnchor, constant: -2),

            actionButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -8),
            actionButton.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),

            textField.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 14),
            textField.trailingAnchor.constraint(equalTo: actionButton.leadingAnchor, constant: -8),
            textField.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -8),
            textField.topAnchor.constraint(greaterThanOrEqualTo: containerView.topAnchor, constant: 10),
        ])
    }

    @objc private func editingChanged() {
        updateLabel(animated: true)
    }

    private func updateLabel(animated: Bool) {
        let isActive = (textField.isFirstResponder || !(textField.text ?? "").isEmpty)
        let updates = {
            self.labelTopConstraint.constant = isActive ? -6 : 14
            self.floatingLabel.font = .systemFont(ofSize: isActive ? 11 : 15, weight: .regular)
            self.floatingLabel.textColor = isActive ? .systemBlue : .secondaryLabel
            self.containerView.layer.borderColor = isActive
                ? UIColor.systemBlue.withAlphaComponent(0.4).cgColor
                : self.inactiveBorderColor
            self.layoutIfNeeded()
        }
        if animated {
            UIView.animate(withDuration: 0.15, delay: 0, options: [.curveEaseOut], animations: updates)
        } else {
            updates()
        }
    }
}

// MARK: - Usage
// let floatingButtonField = FloatingLabelButtonTextFieldView(
//     placeholder: "Verification Code",
//     buttonImage: UIImage(systemName: "arrow.right"),
//     buttonTint: .white
// )
// view.addSubview(floatingButtonField)
// floatingButtonField.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     floatingButtonField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     floatingButtonField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     floatingButtonField.widthAnchor.constraint(greaterThanOrEqualToConstant: 260)
// ])
`,
  },
  {
    title: "Text View (Multiline Input)",
    description: "Multiline UITextView with placeholder behavior.",
    preview: <MultilineTextViewPreview />,
    swiftCode: `import UIKit

class MultilineTextViewInput: UIView, UITextViewDelegate {

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.systemGray4.cgColor
        view.backgroundColor = .secondarySystemBackground
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let textView: UITextView = {
        let view = UITextView()
        view.font = .systemFont(ofSize: 15, weight: .regular)
        view.textColor = .label
        view.backgroundColor = .clear
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let placeholderLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 15, weight: .regular)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var placeholder: String {
        didSet { placeholderLabel.text = placeholder }
    }

    var text: String {
        get { textView.text ?? "" }
        set {
            textView.text = newValue
            placeholderLabel.isHidden = !newValue.isEmpty
        }
    }

    init(placeholder: String = "Write your notes...") {
        self.placeholder = placeholder
        super.init(frame: .zero)
        setupView()
    }

    override init(frame: CGRect) {
        self.placeholder = "Write your notes..."
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.placeholder = "Write your notes..."
        super.init(coder: coder)
        setupView()
    }

    @objc private func textDidChange() {
        placeholderLabel.isHidden = !(textView.text ?? "").isEmpty
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(textView)
        containerView.addSubview(placeholderLabel)
        placeholderLabel.text = placeholder
        textView.delegate = self
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(textDidChange),
            name: UITextView.textDidChangeNotification,
            object: textView
        )

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 120),
            containerView.widthAnchor.constraint(greaterThanOrEqualToConstant: 240),

            textView.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 10),
            textView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 10),
            textView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -10),
            textView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -10),

            placeholderLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 18),
            placeholderLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
        ])
    }
}

// MARK: - Usage
// let notesInput = MultilineTextViewInput(placeholder: "Type your message...")
// view.addSubview(notesInput)
// notesInput.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     notesInput.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     notesInput.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     notesInput.widthAnchor.constraint(equalToConstant: 280),
// ])
`,
  },
  {
    title: "Secure Field + Show/Hide Password",
    description: "Password field with trailing eye button to toggle visibility.",
    preview: <SecurePasswordPreview />,
    swiftCode: `import UIKit

class SecurePasswordFieldView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.backgroundColor = .secondarySystemBackground
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let textField: UITextField = {
        let field = UITextField()
        field.isSecureTextEntry = true
        field.font = .systemFont(ofSize: 15, weight: .regular)
        field.textColor = .label
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let toggleButton: UIButton = {
        let button = UIButton(type: .system)
        button.tintColor = .secondaryLabel
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var placeholder: String {
        didSet { textField.placeholder = placeholder }
    }

    let showImage: UIImage?
    let hideImage: UIImage?
    var isPasswordVisible = false

    init(
        placeholder: String = "Password",
        showImage: UIImage? = UIImage(systemName: "eye"),
        hideImage: UIImage? = UIImage(systemName: "eye.slash")
    ) {
        self.placeholder = placeholder
        self.showImage = showImage
        self.hideImage = hideImage
        super.init(frame: .zero)
        setupView()
    }

    override init(frame: CGRect) {
        self.placeholder = "Password"
        self.showImage = UIImage(systemName: "eye")
        self.hideImage = UIImage(systemName: "eye.slash")
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.placeholder = "Password"
        self.showImage = UIImage(systemName: "eye")
        self.hideImage = UIImage(systemName: "eye.slash")
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapToggle() {
        isPasswordVisible.toggle()
        textField.isSecureTextEntry = !isPasswordVisible
        toggleButton.setImage(isPasswordVisible ? hideImage : showImage, for: .normal)
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(textField)
        containerView.addSubview(toggleButton)
        textField.placeholder = placeholder
        toggleButton.setImage(showImage, for: .normal)
        toggleButton.addTarget(self, action: #selector(didTapToggle), for: .touchUpInside)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 44),
            containerView.widthAnchor.constraint(greaterThanOrEqualToConstant: 240),

            toggleButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -10),
            toggleButton.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
            toggleButton.widthAnchor.constraint(equalToConstant: 24),
            toggleButton.heightAnchor.constraint(equalToConstant: 24),

            textField.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 14),
            textField.trailingAnchor.constraint(equalTo: toggleButton.leadingAnchor, constant: -10),
            textField.topAnchor.constraint(equalTo: containerView.topAnchor),
            textField.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let passwordField = SecurePasswordFieldView(
//     placeholder: "Enter password",
//     showImage: UIImage(systemName: "eye"),
//     hideImage: UIImage(systemName: "eye.slash.fill")
// )
// view.addSubview(passwordField)
// passwordField.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     passwordField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     passwordField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "OTP / Verification Code Input",
    description: "6-digit verification code input with one digit per box.",
    preview: <OTPPreview />,
    swiftCode: `import UIKit

class OTPCodeInputView: UIView, UITextFieldDelegate {

    private let stackView: UIStackView = {
        let view = UIStackView()
        view.axis = .horizontal
        view.distribution = .fillEqually
        view.spacing = 8
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private var fields: [UITextField] = []
    var codeLength: Int

    var code: String {
        fields.compactMap { $0.text }.joined()
    }

    init(codeLength: Int = 6) {
        self.codeLength = max(codeLength, 4)
        super.init(frame: .zero)
        setupView()
    }

    override init(frame: CGRect) {
        self.codeLength = 6
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.codeLength = 6
        super.init(coder: coder)
        setupView()
    }

    @objc private func editingChanged(_ sender: UITextField) {
        guard let text = sender.text else { return }
        if text.count > 1 {
            sender.text = String(text.prefix(1))
        }
        if !(sender.text ?? "").isEmpty {
            moveToNextField(after: sender)
        }
    }

    private func moveToNextField(after field: UITextField) {
        guard let index = fields.firstIndex(of: field) else { return }
        let nextIndex = index + 1
        if nextIndex < fields.count {
            fields[nextIndex].becomeFirstResponder()
        } else {
            field.resignFirstResponder()
        }
    }

    private func setupView() {
        addSubview(stackView)

        for _ in 0..<codeLength {
            let field = UITextField()
            field.keyboardType = .numberPad
            field.textAlignment = .center
            field.font = .monospacedDigitSystemFont(ofSize: 18, weight: .medium)
            field.layer.cornerRadius = 10
            field.layer.borderWidth = 1
            field.layer.borderColor = UIColor.systemGray4.cgColor
            field.backgroundColor = .secondarySystemBackground
            field.delegate = self
            field.addTarget(self, action: #selector(editingChanged(_:)), for: .editingChanged)
            field.translatesAutoresizingMaskIntoConstraints = false
            field.heightAnchor.constraint(equalToConstant: 46).isActive = true
            fields.append(field)
            stackView.addArrangedSubview(field)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
            stackView.widthAnchor.constraint(greaterThanOrEqualToConstant: 260),
        ])
    }
}

// MARK: - Usage
// let otpInput = OTPCodeInputView(codeLength: 6)
// view.addSubview(otpInput)
// otpInput.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     otpInput.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     otpInput.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Date Picker (Inline + Wheel)",
    description: "Both inline calendar and wheel date picker styles in one view.",
    preview: <DatePickerPreview />,
    swiftCode: `import UIKit

class DatePickerStylesView: UIView {

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Select Date"
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let inlinePicker: UIDatePicker = {
        let picker = UIDatePicker()
        picker.datePickerMode = .date
        picker.translatesAutoresizingMaskIntoConstraints = false
        return picker
    }()

    private let wheelPicker: UIDatePicker = {
        let picker = UIDatePicker()
        picker.datePickerMode = .date
        picker.preferredDatePickerStyle = .wheels
        picker.translatesAutoresizingMaskIntoConstraints = false
        return picker
    }()

    var minimumDate: Date? {
        didSet {
            inlinePicker.minimumDate = minimumDate
            wheelPicker.minimumDate = minimumDate
        }
    }

    var maximumDate: Date? {
        didSet {
            inlinePicker.maximumDate = maximumDate
            wheelPicker.maximumDate = maximumDate
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

    @objc private func dateChanged(_ sender: UIDatePicker) {
        let selectedDate = sender.date
        if sender == inlinePicker {
            wheelPicker.setDate(selectedDate, animated: true)
        } else {
            inlinePicker.setDate(selectedDate, animated: true)
        }
    }

    private func setupView() {
        addSubview(titleLabel)
        addSubview(inlinePicker)
        addSubview(wheelPicker)

        if #available(iOS 14.0, *) {
            inlinePicker.preferredDatePickerStyle = .inline
        }

        inlinePicker.addTarget(self, action: #selector(dateChanged(_:)), for: .valueChanged)
        wheelPicker.addTarget(self, action: #selector(dateChanged(_:)), for: .valueChanged)

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor),

            inlinePicker.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            inlinePicker.leadingAnchor.constraint(equalTo: leadingAnchor),
            inlinePicker.trailingAnchor.constraint(equalTo: trailingAnchor),

            wheelPicker.topAnchor.constraint(equalTo: inlinePicker.bottomAnchor, constant: 8),
            wheelPicker.leadingAnchor.constraint(equalTo: leadingAnchor),
            wheelPicker.trailingAnchor.constraint(equalTo: trailingAnchor),
            wheelPicker.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let datePickers = DatePickerStylesView()
// datePickers.minimumDate = Date()
// view.addSubview(datePickers)
// datePickers.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     datePickers.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     datePickers.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     datePickers.widthAnchor.constraint(equalToConstant: 320),
// ])
`,
  },
  {
    title: "Time Picker",
    description: "UIKit time selector using UIDatePicker in time mode.",
    preview: <TimePickerPreview />,
    swiftCode: `import UIKit

class TimePickerFieldView: UIView {

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Select Time"
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let timePicker: UIDatePicker = {
        let picker = UIDatePicker()
        picker.datePickerMode = .time
        picker.preferredDatePickerStyle = .wheels
        picker.translatesAutoresizingMaskIntoConstraints = false
        return picker
    }()

    private let valueLabel: UILabel = {
        let label = UILabel()
        label.font = .monospacedDigitSystemFont(ofSize: 15, weight: .medium)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var minuteInterval: Int = 5 {
        didSet { timePicker.minuteInterval = max(1, minuteInterval) }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func timeChanged() {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        valueLabel.text = formatter.string(from: timePicker.date)
    }

    private func setupView() {
        addSubview(titleLabel)
        addSubview(valueLabel)
        addSubview(timePicker)
        timePicker.addTarget(self, action: #selector(timeChanged), for: .valueChanged)
        timeChanged()

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: topAnchor),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor),

            valueLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 6),
            valueLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            valueLabel.trailingAnchor.constraint(equalTo: trailingAnchor),

            timePicker.topAnchor.constraint(equalTo: valueLabel.bottomAnchor, constant: 6),
            timePicker.leadingAnchor.constraint(equalTo: leadingAnchor),
            timePicker.trailingAnchor.constraint(equalTo: trailingAnchor),
            timePicker.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let timeField = TimePickerFieldView()
// timeField.minuteInterval = 10
// view.addSubview(timeField)
// timeField.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     timeField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     timeField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Picker / Select (Dropdown-like)",
    description: "UITextField + UIPickerView combo for select-style input.",
    preview: <SelectPickerPreview />,
    swiftCode: `import UIKit

class SelectPickerFieldView: UIView, UIPickerViewDataSource, UIPickerViewDelegate {

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.backgroundColor = .secondarySystemBackground
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let textField: UITextField = {
        let field = UITextField()
        field.font = .systemFont(ofSize: 15, weight: .regular)
        field.textColor = .label
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let pickerView: UIPickerView = {
        let picker = UIPickerView()
        return picker
    }()

    private let toolbar: UIToolbar = {
        let bar = UIToolbar()
        bar.sizeToFit()
        return bar
    }()

    var items: [String] {
        didSet {
            pickerView.reloadAllComponents()
            textField.text = items.first
        }
    }

    var placeholder: String {
        didSet { textField.placeholder = placeholder }
    }

    init(items: [String] = ["United States", "Canada", "Japan"], placeholder: String = "Choose country") {
        self.items = items
        self.placeholder = placeholder
        super.init(frame: .zero)
        setupView()
    }

    override init(frame: CGRect) {
        self.items = ["United States", "Canada", "Japan"]
        self.placeholder = "Choose country"
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.items = ["United States", "Canada", "Japan"]
        self.placeholder = "Choose country"
        super.init(coder: coder)
        setupView()
    }

    @objc private func doneTapped() {
        let row = pickerView.selectedRow(inComponent: 0)
        if items.indices.contains(row) {
            textField.text = items[row]
        }
        textField.resignFirstResponder()
    }

    @objc private func cancelTapped() {
        textField.resignFirstResponder()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(textField)

        pickerView.dataSource = self
        pickerView.delegate = self
        textField.inputView = pickerView
        textField.placeholder = placeholder

        let cancel = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(cancelTapped))
        let spacer = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        let done = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(doneTapped))
        toolbar.setItems([cancel, spacer, done], animated: false)
        textField.inputAccessoryView = toolbar

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 44),
            containerView.widthAnchor.constraint(greaterThanOrEqualToConstant: 240),

            textField.topAnchor.constraint(equalTo: containerView.topAnchor),
            textField.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 14),
            textField.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -14),
            textField.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
        ])
    }

    func numberOfComponents(in pickerView: UIPickerView) -> Int { 1 }

    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        items.count
    }

    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        items[row]
    }
}

// MARK: - Usage
// let countryPicker = SelectPickerFieldView(
//     items: ["United States", "Canada", "Japan", "Germany"],
//     placeholder: "Select country"
// )
// view.addSubview(countryPicker)
// countryPicker.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     countryPicker.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     countryPicker.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
];

export default function TextField() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Text Field</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style text inputs with clean focus states.
        </p>
      </div>
      <div className="space-y-4">
        {textFieldStyles.map((style) => (
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
