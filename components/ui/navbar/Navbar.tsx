"use client";

import CodePreview from "@/components/ui/CodePreview";
import { BrandLogo } from "@/components/ui/BrandLogo";

export type TopNavbarAction = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  icon?: React.ReactNode;
  ariaLabel?: string;
};

export type TopNavbarProps = {
  logo?: React.ReactNode;
  title?: string;
  actions?: TopNavbarAction[];
  rightContent?: React.ReactNode;
};

export function TopNavbar({
  logo,
  title = "iOS Components",
  actions = [],
  rightContent,
}: TopNavbarProps) {
  return (
    <header className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
        <div className="flex items-center gap-2">
          {logo ?? (
            <span className="h-7 w-7 rounded-xl bg-neutral-900 text-white grid place-items-center">
              <BrandLogo size={18} className="text-white" />
            </span>
          )}
          <span className="text-sm sm:text-base font-semibold tracking-tight">
            {title}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {actions.map((action) => {
            const base =
              "px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors";
            const iconBase =
              "h-9 w-9 grid place-items-center rounded-full transition-colors";
            const styles =
              action.variant === "primary"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800";

            if (action.icon) {
              if (action.href) {
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    aria-label={action.ariaLabel ?? action.label}
                    className={`${iconBase} ${styles}`}
                  >
                    {action.icon}
                  </a>
                );
              }

              return (
                <button
                  key={action.id}
                  type="button"
                  aria-label={action.ariaLabel ?? action.label}
                  onClick={action.onClick}
                  className={`${iconBase} ${styles}`}
                >
                  {action.icon}
                </button>
              );
            }

            if (action.href) {
              return (
                <a
                  key={action.id}
                  href={action.href}
                  className={`${base} ${styles}`}
                >
                  {action.label}
                </a>
              );
            }

            return (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className={`${base} ${styles}`}
              >
                {action.label}
              </button>
            );
          })}
          {rightContent}
        </div>
      </div>
    </header>
  );
}

const navbarSwiftCode = `import UIKit

class TopNavbarView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .secondarySystemBackground.withAlphaComponent(0.9)
        view.layer.cornerRadius = 16
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let logoView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBlue
        view.layer.cornerRadius = 10
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let logoLabel: UILabel = {
        let label = UILabel()
        label.text = "iOS"
        label.textColor = .white
        label.font = .systemFont(ofSize: 10, weight: .bold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "iOS Components"
        label.font = .systemFont(ofSize: 16, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let actionsStack: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.spacing = 8
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    private var actionButtons: [UIButton] = []

    var actions: [String] = ["Docs", "Pricing", "Get App"] {
        didSet { rebuildActions() }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        rebuildActions()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        rebuildActions()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(logoView)
        logoView.addSubview(logoLabel)
        containerView.addSubview(titleLabel)
        containerView.addSubview(actionsStack)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 56),

            logoView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
            logoView.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
            logoView.heightAnchor.constraint(equalToConstant: 28),
            logoView.widthAnchor.constraint(equalToConstant: 28),

            logoLabel.centerXAnchor.constraint(equalTo: logoView.centerXAnchor),
            logoLabel.centerYAnchor.constraint(equalTo: logoView.centerYAnchor),

            titleLabel.leadingAnchor.constraint(equalTo: logoView.trailingAnchor, constant: 10),
            titleLabel.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),

            actionsStack.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -12),
            actionsStack.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
        ])
    }

    private func rebuildActions() {
        actionButtons.forEach { $0.removeFromSuperview() }
        actionButtons.removeAll()

        for (index, title) in actions.enumerated() {
            let button = UIButton(type: .system)
            button.setTitle(title, for: .normal)
            button.titleLabel?.font = .systemFont(ofSize: 13, weight: .medium)
            button.contentEdgeInsets = UIEdgeInsets(top: 6, left: 10, bottom: 6, right: 10)
            button.layer.cornerRadius = 8
            button.backgroundColor = index == actions.count - 1 ? .systemBlue : .clear
            button.setTitleColor(index == actions.count - 1 ? .white : .secondaryLabel, for: .normal)
            button.translatesAutoresizingMaskIntoConstraints = false
            actionsStack.addArrangedSubview(button)
            actionButtons.append(button)
        }
    }
}

// MARK: - Usage
// let navbar = TopNavbarView()
// navbar.actions = ["Docs", "Pricing", "Get App"]
// view.addSubview(navbar)
// navbar.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     navbar.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 12),
//     navbar.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
//     navbar.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
// ])
`;

export default function Navbar() {
  const demoActions: TopNavbarAction[] = [
    { id: "docs", label: "Docs", variant: "ghost" },
    { id: "pricing", label: "Pricing", variant: "ghost" },
    { id: "get", label: "Get App", variant: "primary" },
  ];

  const iconActions: TopNavbarAction[] = [
    {
      id: "search",
      label: "Search",
      variant: "ghost",
      icon: (
        <svg
          width="18"
          height="18"
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
      ),
    },
    {
      id: "bell",
      label: "Notifications",
      variant: "ghost",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      id: "user",
      label: "Profile",
      variant: "primary",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Navigation Bar</h2>
        <p className="text-neutral-500 mt-1">
          Customizable top bar with logo, title, and actions.
        </p>
      </div>
      <div className="space-y-4">
        <CodePreview
          title="Top Navbar"
          description="Logo on the left, title in the middle, three actions on the right."
          preview={
            <TopNavbar title="iOS Components" actions={demoActions} />
          }
          swiftCode={navbarSwiftCode}
        />
        <CodePreview
          title="Icon Actions"
          description="Right actions as image-only buttons."
          preview={<TopNavbar title="iOS Components" actions={iconActions} />}
          swiftCode={navbarSwiftCode}
        />
      </div>
    </div>
  );
}
