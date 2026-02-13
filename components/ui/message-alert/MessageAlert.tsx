"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

/* ------------------------------------------------------------------ */
/*  Preview helpers                                                    */
/* ------------------------------------------------------------------ */

function DefaultAlertPreview() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 active:scale-95 transition-all"
      >
        Show Alert
      </button>
    );
  }

  return (
    <div className="w-80 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden">
      <div className="p-5 text-center">
        <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Update Available</h3>
        <p className="text-sm text-neutral-500 mt-1">A new version of the app is ready to install.</p>
      </div>
      <div className="flex border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setVisible(false)}
          className="flex-1 py-3 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors border-r border-neutral-200 dark:border-neutral-700"
        >
          Later
        </button>
        <button
          onClick={() => setVisible(false)}
          className="flex-1 py-3 text-sm font-semibold text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
}

function SuccessAlertPreview() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 active:scale-95 transition-all"
      >
        Show Alert
      </button>
    );
  }

  return (
    <div className="w-80 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden">
      <div className="p-5 text-center">
        <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Payment Successful</h3>
        <p className="text-sm text-neutral-500 mt-1">Your transaction has been processed successfully.</p>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setVisible(false)}
          className="w-full py-3 text-sm font-semibold text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function DestructiveAlertPreview() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition-all"
      >
        Show Alert
      </button>
    );
  }

  return (
    <div className="w-80 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden">
      <div className="p-5 text-center">
        <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Delete Account?</h3>
        <p className="text-sm text-neutral-500 mt-1">This action cannot be undone. All your data will be permanently removed.</p>
      </div>
      <div className="flex border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setVisible(false)}
          className="flex-1 py-3 text-sm font-medium text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors border-r border-neutral-200 dark:border-neutral-700"
        >
          Cancel
        </button>
        <button
          onClick={() => setVisible(false)}
          className="flex-1 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ToastAlertPreview() {
  const [toasts, setToasts] = useState<{ id: number; type: string; msg: string }[]>([]);

  const show = (type: string, msg: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const config: Record<string, { bg: string; icon: string; color: string }> = {
    success: {
      bg: "bg-green-500",
      color: "text-white",
      icon: "M5 13l4 4L19 7",
    },
    error: {
      bg: "bg-red-500",
      color: "text-white",
      icon: "M6 18L18 6M6 6l12 12",
    },
    warning: {
      bg: "bg-amber-500",
      color: "text-white",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => show("success", "Saved successfully")} className="px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-medium active:scale-95 transition-transform">Success</button>
        <button onClick={() => show("error", "Something went wrong")} className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-medium active:scale-95 transition-transform">Error</button>
        <button onClick={() => show("warning", "Check your connection")} className="px-3 py-2 rounded-lg bg-amber-500 text-white text-xs font-medium active:scale-95 transition-transform">Warning</button>
      </div>
      <div className="flex flex-col gap-2 w-72 min-h-[48px]">
        {toasts.map((t) => {
          const c = config[t.type];
          return (
            <div
              key={t.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${c.bg} ${c.color} shadow-lg animate-in fade-in slide-in-from-top-2 duration-200`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
              </svg>
              <span className="text-sm font-medium">{t.msg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BannerAlertPreview() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 active:scale-95 transition-all"
      >
        Show Banner
      </button>
    );
  }

  return (
    <div className="w-80 space-y-2.5">
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30">
        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Info</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">Your trial ends in 3 days.</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Warning</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Storage is almost full.</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">Error</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">Failed to sync your data.</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Style definitions                                                  */
/* ------------------------------------------------------------------ */

const alertStyles = [
  {
    title: "Default Alert Dialog",
    description: "Classic iOS-style modal alert with two actions.",
    preview: <DefaultAlertPreview />,
    swiftCode: `import UIKit

class DefaultAlertHelper {

    static func show(on viewController: UIViewController) {
        let alert = UIAlertController(
            title: "Update Available",
            message: "A new version of the app is ready to install.",
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(title: "Later", style: .cancel))
        alert.addAction(UIAlertAction(title: "Update", style: .default) { _ in
            // Handle update
        })

        viewController.present(alert, animated: true)
    }
}

// MARK: - Usage
// DefaultAlertHelper.show(on: self)
`,
  },
  {
    title: "Success Alert",
    description: "Confirmation dialog with success icon and single action.",
    preview: <SuccessAlertPreview />,
    swiftCode: `import UIKit

class SuccessAlertView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 16
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.12
        view.layer.shadowOffset = CGSize(width: 0, height: 8)
        view.layer.shadowRadius = 24
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let iconContainer: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.systemGreen.withAlphaComponent(0.12)
        view.layer.cornerRadius = 22
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let iconView: UIImageView = {
        let config = UIImage.SymbolConfiguration(pointSize: 20, weight: .bold)
        let iv = UIImageView(image: UIImage(systemName: "checkmark", withConfiguration: config))
        iv.tintColor = .systemGreen
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Payment Successful"
        label.font = .systemFont(ofSize: 16, weight: .semibold)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let messageLabel: UILabel = {
        let label = UILabel()
        label.text = "Your transaction has been processed successfully."
        label.font = .systemFont(ofSize: 14)
        label.textColor = .secondaryLabel
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let separator: UIView = {
        let view = UIView()
        view.backgroundColor = .separator
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let doneButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Done", for: .normal)
        button.setTitleColor(.systemGreen, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 15, weight: .semibold)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
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
        addSubview(containerView)
        containerView.addSubview(iconContainer)
        iconContainer.addSubview(iconView)
        containerView.addSubview(titleLabel)
        containerView.addSubview(messageLabel)
        containerView.addSubview(separator)
        containerView.addSubview(doneButton)

        doneButton.addTarget(self, action: #selector(dismiss), for: .touchUpInside)

        NSLayoutConstraint.activate([
            containerView.centerXAnchor.constraint(equalTo: centerXAnchor),
            containerView.centerYAnchor.constraint(equalTo: centerYAnchor),
            containerView.widthAnchor.constraint(equalToConstant: 320),

            iconContainer.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 20),
            iconContainer.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
            iconContainer.widthAnchor.constraint(equalToConstant: 44),
            iconContainer.heightAnchor.constraint(equalToConstant: 44),

            iconView.centerXAnchor.constraint(equalTo: iconContainer.centerXAnchor),
            iconView.centerYAnchor.constraint(equalTo: iconContainer.centerYAnchor),

            titleLabel.topAnchor.constraint(equalTo: iconContainer.bottomAnchor, constant: 12),
            titleLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 20),
            titleLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -20),

            messageLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            messageLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 20),
            messageLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -20),

            separator.topAnchor.constraint(equalTo: messageLabel.bottomAnchor, constant: 20),
            separator.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            separator.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            separator.heightAnchor.constraint(equalToConstant: 0.5),

            doneButton.topAnchor.constraint(equalTo: separator.bottomAnchor),
            doneButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            doneButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            doneButton.heightAnchor.constraint(equalToConstant: 48),
            doneButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
        ])
    }

    @objc private func dismiss() {
        removeFromSuperview()
    }
}

// MARK: - Usage
// let alert = SuccessAlertView()
// alert.frame = view.bounds
// view.addSubview(alert)
`,
  },
  {
    title: "Destructive Alert",
    description: "Dangerous action confirmation with red-styled delete button.",
    preview: <DestructiveAlertPreview />,
    swiftCode: `import UIKit

class DestructiveAlertHelper {

    static func show(on viewController: UIViewController, onDelete: @escaping () -> Void) {
        let alert = UIAlertController(
            title: "Delete Account?",
            message: "This action cannot be undone. All your data will be permanently removed.",
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        alert.addAction(UIAlertAction(title: "Delete", style: .destructive) { _ in
            onDelete()
        })

        viewController.present(alert, animated: true)
    }
}

// MARK: - Usage
// DestructiveAlertHelper.show(on: self) {
//     print("Account deleted")
// }
`,
  },
  {
    title: "Toast Notification",
    description: "Auto-dismissing toast messages with status variants.",
    preview: <ToastAlertPreview />,
    swiftCode: `import UIKit

class ToastView: UIView {

    enum ToastType {
        case success, error, warning

        var color: UIColor {
            switch self {
            case .success: return .systemGreen
            case .error:   return .systemRed
            case .warning: return .systemOrange
            }
        }

        var icon: String {
            switch self {
            case .success: return "checkmark"
            case .error:   return "xmark"
            case .warning: return "exclamationmark.triangle"
            }
        }
    }

    private let type: ToastType
    private let message: String

    private let iconView: UIImageView = {
        let iv = UIImageView()
        iv.tintColor = .white
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let label: UILabel = {
        let l = UILabel()
        l.textColor = .white
        l.font = .systemFont(ofSize: 14, weight: .medium)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    init(type: ToastType, message: String) {
        self.type = type
        self.message = message
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupView() {
        backgroundColor = type.color
        layer.cornerRadius = 12
        layer.shadowColor = UIColor.black.cgColor
        layer.shadowOpacity = 0.15
        layer.shadowOffset = CGSize(width: 0, height: 4)
        layer.shadowRadius = 12
        translatesAutoresizingMaskIntoConstraints = false

        let config = UIImage.SymbolConfiguration(pointSize: 14, weight: .bold)
        iconView.image = UIImage(systemName: type.icon, withConfiguration: config)
        label.text = message

        addSubview(iconView)
        addSubview(label)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 48),

            iconView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            iconView.centerYAnchor.constraint(equalTo: centerYAnchor),

            label.leadingAnchor.constraint(equalTo: iconView.trailingAnchor, constant: 12),
            label.centerYAnchor.constraint(equalTo: centerYAnchor),
            label.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
        ])
    }

    static func show(on view: UIView, type: ToastType, message: String) {
        let toast = ToastView(type: type, message: message)
        view.addSubview(toast)

        NSLayoutConstraint.activate([
            toast.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 12),
            toast.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            toast.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
        ])

        toast.alpha = 0
        toast.transform = CGAffineTransform(translationX: 0, y: -20)

        UIView.animate(withDuration: 0.3, delay: 0, usingSpringWithDamping: 0.8, initialSpringVelocity: 0.5) {
            toast.alpha = 1
            toast.transform = .identity
        }

        UIView.animate(withDuration: 0.25, delay: 2.5, options: .curveEaseIn) {
            toast.alpha = 0
            toast.transform = CGAffineTransform(translationX: 0, y: -20)
        } completion: { _ in
            toast.removeFromSuperview()
        }
    }
}

// MARK: - Usage
// ToastView.show(on: view, type: .success, message: "Saved successfully")
// ToastView.show(on: view, type: .error, message: "Something went wrong")
// ToastView.show(on: view, type: .warning, message: "Check your connection")
`,
  },
  {
    title: "Banner Alert",
    description: "Inline notification banners with info, warning, and error states.",
    preview: <BannerAlertPreview />,
    swiftCode: `import UIKit

class BannerAlertView: UIView {

    enum BannerType {
        case info, warning, error

        var color: UIColor {
            switch self {
            case .info:    return .systemBlue
            case .warning: return .systemOrange
            case .error:   return .systemRed
            }
        }

        var icon: String {
            switch self {
            case .info:    return "info.circle"
            case .warning: return "exclamationmark.triangle"
            case .error:   return "exclamationmark.circle"
            }
        }
    }

    private let type: BannerType

    private let iconView: UIImageView = {
        let iv = UIImageView()
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let titleLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14, weight: .medium)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let messageLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 12)
        l.numberOfLines = 0
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let closeButton: UIButton = {
        let button = UIButton(type: .system)
        let config = UIImage.SymbolConfiguration(pointSize: 12, weight: .medium)
        button.setImage(UIImage(systemName: "xmark", withConfiguration: config), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    init(type: BannerType, title: String, message: String) {
        self.type = type
        super.init(frame: .zero)
        titleLabel.text = title
        messageLabel.text = message
        setupView()
    }

    required init?(coder: NSCoder) {
        self.type = .info
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        layer.cornerRadius = 12
        layer.borderWidth = 1
        layer.borderColor = type.color.withAlphaComponent(0.3).cgColor
        backgroundColor = type.color.withAlphaComponent(0.08)
        translatesAutoresizingMaskIntoConstraints = false

        let config = UIImage.SymbolConfiguration(pointSize: 18, weight: .medium)
        iconView.image = UIImage(systemName: type.icon, withConfiguration: config)
        iconView.tintColor = type.color
        titleLabel.textColor = type.color
        messageLabel.textColor = type.color.withAlphaComponent(0.8)
        closeButton.tintColor = type.color.withAlphaComponent(0.5)

        addSubview(iconView)
        addSubview(titleLabel)
        addSubview(messageLabel)
        addSubview(closeButton)

        closeButton.addTarget(self, action: #selector(dismiss), for: .touchUpInside)

        NSLayoutConstraint.activate([
            iconView.topAnchor.constraint(equalTo: topAnchor, constant: 14),
            iconView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            iconView.widthAnchor.constraint(equalToConstant: 20),
            iconView.heightAnchor.constraint(equalToConstant: 20),

            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 14),
            titleLabel.leadingAnchor.constraint(equalTo: iconView.trailingAnchor, constant: 12),

            messageLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 2),
            messageLabel.leadingAnchor.constraint(equalTo: iconView.trailingAnchor, constant: 12),
            messageLabel.trailingAnchor.constraint(equalTo: closeButton.leadingAnchor, constant: -8),
            messageLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -14),

            closeButton.topAnchor.constraint(equalTo: topAnchor, constant: 14),
            closeButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            closeButton.widthAnchor.constraint(equalToConstant: 16),
            closeButton.heightAnchor.constraint(equalToConstant: 16),
        ])
    }

    @objc private func dismiss() {
        UIView.animate(withDuration: 0.2) {
            self.alpha = 0
        } completion: { _ in
            self.removeFromSuperview()
        }
    }
}

// MARK: - Usage
// let infoBanner = BannerAlertView(type: .info, title: "Info", message: "Your trial ends in 3 days.")
// let warningBanner = BannerAlertView(type: .warning, title: "Warning", message: "Storage is almost full.")
// let errorBanner = BannerAlertView(type: .error, title: "Error", message: "Failed to sync your data.")
// stackView.addArrangedSubview(infoBanner)
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default function MessageAlert() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Message Alert</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style alerts, toasts, and banners for user notifications and confirmations.
        </p>
      </div>
      <div className="space-y-4">
        {alertStyles.map((style) => (
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
