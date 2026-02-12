"use client";

import CodePreview from "@/components/ui/CodePreview";

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

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = "Email"
        field.font = .systemFont(ofSize: 15, weight: .regular)
        field.textColor = .label
        field.backgroundColor = .secondarySystemBackground
        field.layer.cornerRadius = 12
        field.layer.borderWidth = 1
        field.layer.borderColor = UIColor.clear.cgColor
        field.clearButtonMode = .whileEditing
        field.autocapitalizationType = .none
        field.keyboardType = .emailAddress
        field.translatesAutoresizingMaskIntoConstraints = false
        field.setLeftPadding(14)
        field.setRightPadding(14)
        return field
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
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
// let defaultField = DefaultTextFieldView()
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

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = "Search"
        field.font = .systemFont(ofSize: 15, weight: .regular)
        field.textColor = .label
        field.backgroundColor = .secondarySystemBackground
        field.layer.cornerRadius = 12
        field.clearButtonMode = .whileEditing
        field.translatesAutoresizingMaskIntoConstraints = false
        field.setLeftIcon(UIImage(systemName: "magnifyingglass"), padding: 10)
        field.setRightPadding(12)
        return field
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
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
    func setLeftIcon(_ image: UIImage?, padding: CGFloat) {
        let icon = UIImageView(image: image)
        icon.tintColor = .secondaryLabel
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
// let iconField = IconTextFieldView()
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
        label.text = "Full Name"
        label.font = .systemFont(ofSize: 15, weight: .regular)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private var labelTopConstraint: NSLayoutConstraint!
    private let inactiveBorderColor: CGColor = UIColor.gray.cgColor

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        updateLabel(animated: false)
    }

    required init?(coder: NSCoder) {
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
// let floatingField = FloatingLabelTextFieldView()
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
