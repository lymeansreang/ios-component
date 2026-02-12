"use client";

import CodePreview from "@/components/ui/CodePreview";

const bottomSheetStyles = [
  {
    title: "Text Only",
    description: "Simple bottom sheet with text content only.",
    preview: (
      <div className="relative w-[320px] h-[280px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-neutral-800 rounded-t-[20px] shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-6">
          <div className="w-9 h-[5px] bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-5" />
          <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-white">
            Terms & Conditions
          </h3>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
            By using this app, you agree to our terms of service and privacy
            policy. Please review the full document before continuing.
          </p>
        </div>
      </div>
    ),
    swiftCode: `import UIKit

class TextOnlyBottomSheetViewController: UIViewController {

    private let dimmingView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let sheetView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 20
        view.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.1
        view.layer.shadowRadius = 15
        view.layer.shadowOffset = CGSize(width: 0, height: -4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let grabber: UIView = {
        let view = UIView()
        view.backgroundColor = .tertiaryLabel
        view.layer.cornerRadius = 2.5
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Terms & Conditions"
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let bodyLabel: UILabel = {
        let label = UILabel()
        label.text = "By using this app, you agree to our terms of service and privacy policy. Please review the full document before continuing."
        label.font = .systemFont(ofSize: 15)
        label.textColor = .secondaryLabel
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private var sheetBottomConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        animateIn()
    }

    private func setupView() {
        view.addSubview(dimmingView)
        view.addSubview(sheetView)
        sheetView.addSubview(grabber)
        sheetView.addSubview(titleLabel)
        sheetView.addSubview(bodyLabel)

        sheetBottomConstraint = sheetView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 300)

        NSLayoutConstraint.activate([
            dimmingView.topAnchor.constraint(equalTo: view.topAnchor),
            dimmingView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            dimmingView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            dimmingView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            sheetView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            sheetView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            sheetBottomConstraint,

            grabber.topAnchor.constraint(equalTo: sheetView.topAnchor, constant: 12),
            grabber.centerXAnchor.constraint(equalTo: sheetView.centerXAnchor),
            grabber.widthAnchor.constraint(equalToConstant: 36),
            grabber.heightAnchor.constraint(equalToConstant: 5),

            titleLabel.topAnchor.constraint(equalTo: grabber.bottomAnchor, constant: 20),
            titleLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            bodyLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            bodyLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            bodyLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),
            bodyLabel.bottomAnchor.constraint(equalTo: sheetView.bottomAnchor, constant: -34),
        ])

        let tap = UITapGestureRecognizer(target: self, action: #selector(dismissSheet))
        dimmingView.addGestureRecognizer(tap)
        dimmingView.alpha = 0
    }

    private func animateIn() {
        sheetBottomConstraint.constant = 0
        UIView.animate(withDuration: 0.35, delay: 0, usingSpringWithDamping: 0.85, initialSpringVelocity: 0.5) {
            self.dimmingView.alpha = 1
            self.view.layoutIfNeeded()
        }
    }

    @objc private func dismissSheet() {
        sheetBottomConstraint.constant = 300
        UIView.animate(withDuration: 0.25, animations: {
            self.dimmingView.alpha = 0
            self.view.layoutIfNeeded()
        }) { _ in
            self.dismiss(animated: false)
        }
    }
}

// MARK: - Usage
// let vc = TextOnlyBottomSheetViewController()
// vc.modalPresentationStyle = .overFullScreen
// vc.modalTransitionStyle = .crossDissolve
// present(vc, animated: false)
`,
  },
  {
    title: "Text with Single Button",
    description: "Bottom sheet with descriptive text and a primary action button.",
    preview: (
      <div className="relative w-[320px] h-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-neutral-800 rounded-t-[20px] shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-6">
          <div className="w-9 h-[5px] bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-5" />
          <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-white">
            Enable Notifications
          </h3>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
            Stay up to date with important alerts and updates. You can change
            this anytime in Settings.
          </p>
          <button className="w-full mt-5 py-3.5 rounded-2xl bg-blue-500 text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
            Allow Notifications
          </button>
        </div>
      </div>
    ),
    swiftCode: `import UIKit

class SingleButtonBottomSheetViewController: UIViewController {

    private let dimmingView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let sheetView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 20
        view.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.1
        view.layer.shadowRadius = 15
        view.layer.shadowOffset = CGSize(width: 0, height: -4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let grabber: UIView = {
        let view = UIView()
        view.backgroundColor = .tertiaryLabel
        view.layer.cornerRadius = 2.5
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Enable Notifications"
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let bodyLabel: UILabel = {
        let label = UILabel()
        label.text = "Stay up to date with important alerts and updates. You can change this anytime in Settings."
        label.font = .systemFont(ofSize: 15)
        label.textColor = .secondaryLabel
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let primaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Allow Notifications", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private var sheetBottomConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        animateIn()
    }

    private func setupView() {
        view.addSubview(dimmingView)
        view.addSubview(sheetView)
        sheetView.addSubview(grabber)
        sheetView.addSubview(titleLabel)
        sheetView.addSubview(bodyLabel)
        sheetView.addSubview(primaryButton)

        sheetBottomConstraint = sheetView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 350)

        NSLayoutConstraint.activate([
            dimmingView.topAnchor.constraint(equalTo: view.topAnchor),
            dimmingView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            dimmingView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            dimmingView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            sheetView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            sheetView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            sheetBottomConstraint,

            grabber.topAnchor.constraint(equalTo: sheetView.topAnchor, constant: 12),
            grabber.centerXAnchor.constraint(equalTo: sheetView.centerXAnchor),
            grabber.widthAnchor.constraint(equalToConstant: 36),
            grabber.heightAnchor.constraint(equalToConstant: 5),

            titleLabel.topAnchor.constraint(equalTo: grabber.bottomAnchor, constant: 20),
            titleLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            bodyLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            bodyLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            bodyLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            primaryButton.topAnchor.constraint(equalTo: bodyLabel.bottomAnchor, constant: 20),
            primaryButton.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            primaryButton.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),
            primaryButton.heightAnchor.constraint(equalToConstant: 52),
            primaryButton.bottomAnchor.constraint(equalTo: sheetView.bottomAnchor, constant: -34),
        ])

        primaryButton.addTarget(self, action: #selector(primaryTapped), for: .touchUpInside)

        let tap = UITapGestureRecognizer(target: self, action: #selector(dismissSheet))
        dimmingView.addGestureRecognizer(tap)
        dimmingView.alpha = 0
    }

    private func animateIn() {
        sheetBottomConstraint.constant = 0
        UIView.animate(withDuration: 0.35, delay: 0, usingSpringWithDamping: 0.85, initialSpringVelocity: 0.5) {
            self.dimmingView.alpha = 1
            self.view.layoutIfNeeded()
        }
    }

    @objc private func primaryTapped() {
        // Handle primary action
        dismissSheet()
    }

    @objc private func dismissSheet() {
        sheetBottomConstraint.constant = 350
        UIView.animate(withDuration: 0.25, animations: {
            self.dimmingView.alpha = 0
            self.view.layoutIfNeeded()
        }) { _ in
            self.dismiss(animated: false)
        }
    }
}

// MARK: - Usage
// let vc = SingleButtonBottomSheetViewController()
// vc.modalPresentationStyle = .overFullScreen
// vc.modalTransitionStyle = .crossDissolve
// present(vc, animated: false)
`,
  },
  {
    title: "Text with Two Buttons",
    description: "Bottom sheet with text and primary/secondary action buttons.",
    preview: (
      <div className="relative w-[320px] h-[340px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-neutral-800 rounded-t-[20px] shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-6">
          <div className="w-9 h-[5px] bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-5" />
          <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-white">
            Delete Account
          </h3>
          <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
            This action is permanent and cannot be undone. All your data will be
            removed from our servers.
          </p>
          <div className="flex flex-row gap-2.5 mt-5">
            <button className="flex-1 py-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
              Cancel
            </button>
            <button className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
              Delete
            </button>
          </div>
        </div>
      </div>
    ),
    swiftCode: `import UIKit

class TwoButtonBottomSheetViewController: UIViewController {

    private let dimmingView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let sheetView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 20
        view.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.1
        view.layer.shadowRadius = 15
        view.layer.shadowOffset = CGSize(width: 0, height: -4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let grabber: UIView = {
        let view = UIView()
        view.backgroundColor = .tertiaryLabel
        view.layer.cornerRadius = 2.5
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Delete Account"
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let bodyLabel: UILabel = {
        let label = UILabel()
        label.text = "This action is permanent and cannot be undone. All your data will be removed from our servers."
        label.font = .systemFont(ofSize: 15)
        label.textColor = .secondaryLabel
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let primaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Delete", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .systemRed
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let secondaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Cancel", for: .normal)
        button.setTitleColor(.label, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .secondarySystemBackground
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private lazy var buttonStack: UIStackView = {
        let stack = UIStackView(arrangedSubviews: [secondaryButton, primaryButton])
        stack.axis = .horizontal
        stack.spacing = 10
        stack.distribution = .fillEqually
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    private var sheetBottomConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        animateIn()
    }

    private func setupView() {
        view.addSubview(dimmingView)
        view.addSubview(sheetView)
        sheetView.addSubview(grabber)
        sheetView.addSubview(titleLabel)
        sheetView.addSubview(bodyLabel)
        sheetView.addSubview(buttonStack)

        sheetBottomConstraint = sheetView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 400)

        NSLayoutConstraint.activate([
            dimmingView.topAnchor.constraint(equalTo: view.topAnchor),
            dimmingView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            dimmingView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            dimmingView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            sheetView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            sheetView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            sheetBottomConstraint,

            grabber.topAnchor.constraint(equalTo: sheetView.topAnchor, constant: 12),
            grabber.centerXAnchor.constraint(equalTo: sheetView.centerXAnchor),
            grabber.widthAnchor.constraint(equalToConstant: 36),
            grabber.heightAnchor.constraint(equalToConstant: 5),

            titleLabel.topAnchor.constraint(equalTo: grabber.bottomAnchor, constant: 20),
            titleLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            bodyLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            bodyLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            bodyLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            buttonStack.topAnchor.constraint(equalTo: bodyLabel.bottomAnchor, constant: 20),
            buttonStack.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            buttonStack.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),
            buttonStack.heightAnchor.constraint(equalToConstant: 52),
            buttonStack.bottomAnchor.constraint(equalTo: sheetView.bottomAnchor, constant: -34),
        ])

        primaryButton.addTarget(self, action: #selector(primaryTapped), for: .touchUpInside)
        secondaryButton.addTarget(self, action: #selector(dismissSheet), for: .touchUpInside)

        let tap = UITapGestureRecognizer(target: self, action: #selector(dismissSheet))
        dimmingView.addGestureRecognizer(tap)
        dimmingView.alpha = 0
    }

    private func animateIn() {
        sheetBottomConstraint.constant = 0
        UIView.animate(withDuration: 0.35, delay: 0, usingSpringWithDamping: 0.85, initialSpringVelocity: 0.5) {
            self.dimmingView.alpha = 1
            self.view.layoutIfNeeded()
        }
    }

    @objc private func primaryTapped() {
        // Handle destructive action
        dismissSheet()
    }

    @objc private func dismissSheet() {
        sheetBottomConstraint.constant = 400
        UIView.animate(withDuration: 0.25, animations: {
            self.dimmingView.alpha = 0
            self.view.layoutIfNeeded()
        }) { _ in
            self.dismiss(animated: false)
        }
    }
}

// MARK: - Usage
// let vc = TwoButtonBottomSheetViewController()
// vc.modalPresentationStyle = .overFullScreen
// vc.modalTransitionStyle = .crossDissolve
// present(vc, animated: false)
`,
  },
  {
    title: "Logo with Title, Subtitle & Two Buttons",
    description: "Bottom sheet with centered logo, title, subtitle, and dual action buttons.",
    preview: (
      <div className="relative w-[320px] h-[400px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-neutral-800 rounded-t-[20px] shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-6">
          <div className="w-9 h-[5px] bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-5" />
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-white">
              Security Update
            </h3>
            <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              A new security patch is available. We recommend updating now to
              keep your account safe.
            </p>
          </div>
          <div className="flex flex-row gap-2.5 mt-5">
            <button className="flex-1 py-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
              Later
            </button>
            <button className="flex-1 py-3.5 rounded-2xl bg-blue-500 text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
              Update Now
            </button>
          </div>
        </div>
      </div>
    ),
    swiftCode: `import UIKit

class LogoBottomSheetViewController: UIViewController {

    private let dimmingView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let sheetView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 20
        view.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.1
        view.layer.shadowRadius = 15
        view.layer.shadowOffset = CGSize(width: 0, height: -4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let grabber: UIView = {
        let view = UIView()
        view.backgroundColor = .tertiaryLabel
        view.layer.cornerRadius = 2.5
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let logoContainer: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBlue
        view.layer.cornerRadius = 16
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let logoImageView: UIImageView = {
        let iv = UIImageView()
        iv.image = UIImage(systemName: "shield.fill")
        iv.tintColor = .white
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Security Update"
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .label
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let subtitleLabel: UILabel = {
        let label = UILabel()
        label.text = "A new security patch is available. We recommend updating now to keep your account safe."
        label.font = .systemFont(ofSize: 15)
        label.textColor = .secondaryLabel
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let primaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Update Now", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let secondaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Later", for: .normal)
        button.setTitleColor(.label, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .secondarySystemBackground
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private lazy var buttonStack: UIStackView = {
        let stack = UIStackView(arrangedSubviews: [secondaryButton, primaryButton])
        stack.axis = .horizontal
        stack.spacing = 10
        stack.distribution = .fillEqually
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    private var sheetBottomConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        animateIn()
    }

    private func setupView() {
        view.addSubview(dimmingView)
        view.addSubview(sheetView)
        sheetView.addSubview(grabber)
        sheetView.addSubview(logoContainer)
        logoContainer.addSubview(logoImageView)
        sheetView.addSubview(titleLabel)
        sheetView.addSubview(subtitleLabel)
        sheetView.addSubview(buttonStack)

        sheetBottomConstraint = sheetView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 450)

        NSLayoutConstraint.activate([
            dimmingView.topAnchor.constraint(equalTo: view.topAnchor),
            dimmingView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            dimmingView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            dimmingView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            sheetView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            sheetView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            sheetBottomConstraint,

            grabber.topAnchor.constraint(equalTo: sheetView.topAnchor, constant: 12),
            grabber.centerXAnchor.constraint(equalTo: sheetView.centerXAnchor),
            grabber.widthAnchor.constraint(equalToConstant: 36),
            grabber.heightAnchor.constraint(equalToConstant: 5),

            logoContainer.topAnchor.constraint(equalTo: grabber.bottomAnchor, constant: 20),
            logoContainer.centerXAnchor.constraint(equalTo: sheetView.centerXAnchor),
            logoContainer.widthAnchor.constraint(equalToConstant: 64),
            logoContainer.heightAnchor.constraint(equalToConstant: 64),

            logoImageView.centerXAnchor.constraint(equalTo: logoContainer.centerXAnchor),
            logoImageView.centerYAnchor.constraint(equalTo: logoContainer.centerYAnchor),
            logoImageView.widthAnchor.constraint(equalToConstant: 32),
            logoImageView.heightAnchor.constraint(equalToConstant: 32),

            titleLabel.topAnchor.constraint(equalTo: logoContainer.bottomAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 6),
            subtitleLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            subtitleLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            buttonStack.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 20),
            buttonStack.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            buttonStack.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),
            buttonStack.heightAnchor.constraint(equalToConstant: 52),
            buttonStack.bottomAnchor.constraint(equalTo: sheetView.bottomAnchor, constant: -34),
        ])

        primaryButton.addTarget(self, action: #selector(primaryTapped), for: .touchUpInside)
        secondaryButton.addTarget(self, action: #selector(dismissSheet), for: .touchUpInside)

        let tap = UITapGestureRecognizer(target: self, action: #selector(dismissSheet))
        dimmingView.addGestureRecognizer(tap)
        dimmingView.alpha = 0
    }

    private func animateIn() {
        sheetBottomConstraint.constant = 0
        UIView.animate(withDuration: 0.35, delay: 0, usingSpringWithDamping: 0.85, initialSpringVelocity: 0.5) {
            self.dimmingView.alpha = 1
            self.view.layoutIfNeeded()
        }
    }

    @objc private func primaryTapped() {
        // Handle update action
        dismissSheet()
    }

    @objc private func dismissSheet() {
        sheetBottomConstraint.constant = 450
        UIView.animate(withDuration: 0.25, animations: {
            self.dimmingView.alpha = 0
            self.view.layoutIfNeeded()
        }) { _ in
            self.dismiss(animated: false)
        }
    }
}

// MARK: - Usage
// let vc = LogoBottomSheetViewController()
// vc.modalPresentationStyle = .overFullScreen
// vc.modalTransitionStyle = .crossDissolve
// present(vc, animated: false)
`,
  },
  {
    title: "WebView with Two Buttons",
    description: "Bottom sheet with embedded WKWebView and dual action buttons.",
    preview: (
      <div className="relative w-[320px] h-[460px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 bg-white dark:bg-neutral-800 rounded-t-[20px] shadow-[0_-4px_30px_rgba(0,0,0,0.1)] p-6">
          <div className="w-9 h-[5px] bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-4" />
          <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-white mb-3">
            Privacy Policy
          </h3>
          <div className="w-full h-[200px] rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="p-3">
              <div className="h-2.5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
              <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded mb-1.5" />
              <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded mb-1.5" />
              <div className="h-2 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded mb-3" />
              <div className="h-2.5 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
              <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded mb-1.5" />
              <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded mb-1.5" />
              <div className="h-2 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
          </div>
          <div className="flex flex-row gap-2.5 mt-4">
            <button className="flex-1 py-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
              Decline
            </button>
            <button className="flex-1 py-3.5 rounded-2xl bg-blue-500 text-white text-[17px] font-semibold active:scale-[0.98] transition-transform">
              Accept
            </button>
          </div>
        </div>
      </div>
    ),
    swiftCode: `import UIKit
import WebKit

class WebViewBottomSheetViewController: UIViewController {

    private let dimmingView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black.withAlphaComponent(0.4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let sheetView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 20
        view.layer.maskedCorners = [.layerMinXMinYCorner, .layerMaxXMinYCorner]
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.1
        view.layer.shadowRadius = 15
        view.layer.shadowOffset = CGSize(width: 0, height: -4)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let grabber: UIView = {
        let view = UIView()
        view.backgroundColor = .tertiaryLabel
        view.layer.cornerRadius = 2.5
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Privacy Policy"
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let webView: WKWebView = {
        let config = WKWebViewConfiguration()
        let wv = WKWebView(frame: .zero, configuration: config)
        wv.layer.cornerRadius = 12
        wv.layer.masksToBounds = true
        wv.translatesAutoresizingMaskIntoConstraints = false
        return wv
    }()

    private let primaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Accept", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let secondaryButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Decline", for: .normal)
        button.setTitleColor(.label, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 17, weight: .semibold)
        button.backgroundColor = .secondarySystemBackground
        button.layer.cornerRadius = 16
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private lazy var buttonStack: UIStackView = {
        let stack = UIStackView(arrangedSubviews: [secondaryButton, primaryButton])
        stack.axis = .horizontal
        stack.spacing = 10
        stack.distribution = .fillEqually
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    var urlString: String = "https://example.com/privacy"

    private var sheetBottomConstraint: NSLayoutConstraint!

    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
        loadWebContent()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        animateIn()
    }

    private func setupView() {
        view.addSubview(dimmingView)
        view.addSubview(sheetView)
        sheetView.addSubview(grabber)
        sheetView.addSubview(titleLabel)
        sheetView.addSubview(webView)
        sheetView.addSubview(buttonStack)

        sheetBottomConstraint = sheetView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: 550)

        NSLayoutConstraint.activate([
            dimmingView.topAnchor.constraint(equalTo: view.topAnchor),
            dimmingView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            dimmingView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            dimmingView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            sheetView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            sheetView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            sheetBottomConstraint,

            grabber.topAnchor.constraint(equalTo: sheetView.topAnchor, constant: 12),
            grabber.centerXAnchor.constraint(equalTo: sheetView.centerXAnchor),
            grabber.widthAnchor.constraint(equalToConstant: 36),
            grabber.heightAnchor.constraint(equalToConstant: 5),

            titleLabel.topAnchor.constraint(equalTo: grabber.bottomAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),

            webView.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 12),
            webView.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            webView.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),
            webView.heightAnchor.constraint(equalToConstant: 250),

            buttonStack.topAnchor.constraint(equalTo: webView.bottomAnchor, constant: 16),
            buttonStack.leadingAnchor.constraint(equalTo: sheetView.leadingAnchor, constant: 24),
            buttonStack.trailingAnchor.constraint(equalTo: sheetView.trailingAnchor, constant: -24),
            buttonStack.heightAnchor.constraint(equalToConstant: 52),
            buttonStack.bottomAnchor.constraint(equalTo: sheetView.bottomAnchor, constant: -34),
        ])

        primaryButton.addTarget(self, action: #selector(primaryTapped), for: .touchUpInside)
        secondaryButton.addTarget(self, action: #selector(dismissSheet), for: .touchUpInside)

        let tap = UITapGestureRecognizer(target: self, action: #selector(dismissSheet))
        dimmingView.addGestureRecognizer(tap)
        dimmingView.alpha = 0
    }

    private func loadWebContent() {
        if let url = URL(string: urlString) {
            webView.load(URLRequest(url: url))
        }
    }

    private func animateIn() {
        sheetBottomConstraint.constant = 0
        UIView.animate(withDuration: 0.35, delay: 0, usingSpringWithDamping: 0.85, initialSpringVelocity: 0.5) {
            self.dimmingView.alpha = 1
            self.view.layoutIfNeeded()
        }
    }

    @objc private func primaryTapped() {
        // Handle accept action
        dismissSheet()
    }

    @objc private func dismissSheet() {
        sheetBottomConstraint.constant = 550
        UIView.animate(withDuration: 0.25, animations: {
            self.dimmingView.alpha = 0
            self.view.layoutIfNeeded()
        }) { _ in
            self.dismiss(animated: false)
        }
    }
}

// MARK: - Usage
// let vc = WebViewBottomSheetViewController()
// vc.urlString = "https://example.com/privacy-policy"
// vc.modalPresentationStyle = .overFullScreen
// vc.modalTransitionStyle = .crossDissolve
// present(vc, animated: false)
`,
  },
];

export default function BottomSheet() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bottom Sheet</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style modal sheets that slide up from the bottom with various content layouts.
        </p>
      </div>
      <div className="space-y-4">
        {bottomSheetStyles.map((style) => (
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
