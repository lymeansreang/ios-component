"use client";

import CodePreview from "@/components/ui/CodePreview";

const buttonStyles = [
  {
    title: "Dynamic Filled Button",
    description: "Primary action button with solid background.",
    preview: (
      <button className="px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all">
        Default
      </button>
    ),
    swiftCode: `import UIKit

class FilledButtonView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let filledButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Default", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 15, weight: .semibold)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 12
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    public var title: String = "Default" {
        didSet { filledButton.setTitle(title, for: .normal) }
    }
    
    public var titleColor: UIColor = .white {
        didSet { filledButton.setTitleColor(titleColor, for: .normal) }
    }
    
    public var buttonBackgroundColor: UIColor = .systemBlue {
        didSet { filledButton.backgroundColor = buttonBackgroundColor }
    }

    var isClick = true

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        applyPublicProperties()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        applyPublicProperties()
    }

    public func addTarget(_ target: Any?, action: Selector) {
        filledButton.addTarget(target, action: action, for: .touchUpInside)
    }

    @objc func isButtonClicked(_ sender: UIButton) {
        isClick.toggle()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(filledButton)

        filledButton.addTarget(self, action: #selector(isButtonClicked(_:)), for: .touchUpInside)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            filledButton.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 16),
            filledButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
            filledButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -16),
            filledButton.heightAnchor.constraint(equalToConstant: 44),
            filledButton.widthAnchor.constraint(greaterThanOrEqualToConstant: 80),
        ])
    }

    private func applyPublicProperties() {
        filledButton.setTitle(title, for: .normal)
        filledButton.setTitleColor(titleColor, for: .normal)
        filledButton.backgroundColor = buttonBackgroundColor
    }
}

// MARK: - Usage example (outside this file)
/*
 private let myFilledButton: FilledButtonView = {
     let v = FilledButtonView()
     v.translatesAutoresizingMaskIntoConstraints = false
     v.title = "Continue"
     v.titleColor = .white
     v.buttonBackgroundColor = .systemBlue
     return v
 }()

 override func viewDidLoad() {
     super.viewDidLoad()
     myFilledButton.addTarget(self, action: #selector(didTapContinue))
 }

 @objc private func didTapContinue() {
     navigationController?.pushViewController(NextVC(), animated: true)
 }
*/
`,
  },
  {
    title: "Icon Button",
    description: "Button with SF Symbol icon and label.",
    preview: (
      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-95 transition-all">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Item
      </button>
    ),
    swiftCode: `import UIKit

class IconButtonView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let iconButton: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.filled()
        config.title = "Add Item"
        config.image = UIImage(systemName: "plus")
        config.imagePadding = 8
        config.cornerStyle = .large
        config.baseBackgroundColor = .systemBlue
        config.baseForegroundColor = .white
        button.configuration = config
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var isClick = true

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc func isButtonClicked(_ sender: UIButton) {
        isClick.toggle()
    }

    // Method to change the title
    func updateTitle(to newTitle: String) {
        var config = iconButton.configuration ?? UIButton.Configuration.filled()
        config.title = newTitle
        iconButton.configuration = config
    }

    // Method to change the icon
    func updateIcon(to newIcon: UIImage?) {
        var config = iconButton.configuration ?? UIButton.Configuration.filled()
        config.image = newIcon
        iconButton.configuration = config
    }

    // Method to change the background color
    func updateBackgroundColor(to newColor: UIColor) {
        var config = iconButton.configuration ?? UIButton.Configuration.filled()
        config.baseBackgroundColor = newColor
        iconButton.configuration = config
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(iconButton)

        iconButton.addTarget(self, action: #selector(isButtonClicked(_:)), for: .touchUpInside)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            iconButton.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 16),
            iconButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
            iconButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -16),
            iconButton.heightAnchor.constraint(equalToConstant: 44),
        ])
    }
}

// MARK: - Usage
// let iconButton = IconButtonView()
// view.addSubview(iconButton)
// iconButton.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     iconButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     iconButton.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])

// Example of usage:
iconButton.updateTitle(to: "New Item")
iconButton.updateIcon(to: UIImage(systemName: "checkmark"))
iconButton.updateBackgroundColor(to: .systemGreen)
`,
  },
  {
    title: "Glass Button",
    description: "iOS 26+ glass-style button with blur and highlight.",
    preview: (
      <button className="relative overflow-hidden px-5 py-2.5 rounded-xl text-neutral-900 dark:text-white text-sm font-semibold bg-white/15 border border-white/30 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-150 active:scale-[0.98]">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
        <span className="relative">Glass</span>
      </button>
    ),
    swiftCode: `import UIKit

@available(iOS 26.0, *)
class GlassButtonView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 14
        view.layer.masksToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let blurView: UIVisualEffectView = {
        let blur = UIBlurEffect(style: .systemUltraThinMaterial)
        let view = UIVisualEffectView(effect: blur)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let highlightView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.white.withAlphaComponent(0.25)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let glassButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Glass", for: .normal)
        button.setTitleColor(.label, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 15, weight: .semibold)
        button.backgroundColor = .clear
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
        containerView.addSubview(blurView)
        containerView.addSubview(highlightView)
        containerView.addSubview(glassButton)

        let highlightHeight = highlightView.heightAnchor.constraint(equalTo: containerView.heightAnchor, multiplier: 0.5)
        highlightHeight.priority = .defaultHigh

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            blurView.topAnchor.constraint(equalTo: containerView.topAnchor),
            blurView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            blurView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            blurView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),

            highlightView.topAnchor.constraint(equalTo: containerView.topAnchor),
            highlightView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            highlightView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            highlightHeight,

            glassButton.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 10),
            glassButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -10),
            glassButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 18),
            glassButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -18),
            glassButton.heightAnchor.constraint(equalToConstant: 44),
        ])
    }
}

// MARK: - Usage
// if #available(iOS 26.0, *) {
//     let glassButton = GlassButtonView()
//     view.addSubview(glassButton)
// }
`,
  },
{
    title: "3D Button",
    description: "Button with 3D effect.",
    preview: (
      <div className="relative inline-block group">
           <span className="absolute inset-0 rounded-lg bg-blue-500/70 transition-opacity duration-100 group-active:opacity-0" style={{ transform: 'translateX(-0.1rem) translateY(0.2rem)' }}/>
           <button className="relative px-5 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold transition-transform duration-100 active:scale-[0.99] group-active:translate-y-1">
              Default
            </button>
          </div>
    ),
    swiftCode: `import UIKit

class ThreeDButtonView: UIView {
    
    private let trackView: UIView = {
        let view = UIView()
        view.backgroundColor = .clear
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 10
        view.backgroundColor = .systemBlue
        view.isUserInteractionEnabled = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private let backContainerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 10
        view.backgroundColor = .systemBlue.withAlphaComponent(0.7)
        view.isUserInteractionEnabled = false
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private lazy var myButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Default", for: .normal)
        button.setTitleColor(.white, for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 15, weight: .semibold)
        button.backgroundColor = .clear
        button.layer.cornerRadius = 12
        button.isEnabled = true
        // Action callback
        button.addTarget(self, action: #selector(isButtonClicked(_:)), for: .touchUpInside)
        button.addTarget(self, action: #selector(pressDown), for: .touchDown)
        button.addTarget(self, action: #selector(pressUp), for: .touchUpInside)
        button.addTarget(self, action: #selector(pressUp), for: .touchCancel)
        button.addTarget(self, action: #selector(pressUp), for: .touchDragExit)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    var isClick = true

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    @objc func isButtonClicked(_ sender: UIButton) {
        isClick.toggle()
        // Callback hook if needed.
    }
    
    @objc private func pressDown() {
        UIView.animate(withDuration: 0.08, delay: 0, options: [.beginFromCurrentState, .curveEaseIn], animations: {
            self.backContainerView.alpha = 0.0
            self.containerView.transform = CGAffineTransform(translationX: 0, y: 3)
        }, completion: nil)
    }
    
    @objc private func pressUp() {
        UIView.animate(withDuration: 0.12, delay: 0, options: [.beginFromCurrentState, .curveEaseOut], animations: {
            self.backContainerView.alpha = 1.0
            self.containerView.transform = .identity
        }, completion: nil)
    }
    
    private func setupView() {
        translatesAutoresizingMaskIntoConstraints = false
        
        addSubview(trackView)
        trackView.addSubview(backContainerView)
        trackView.addSubview(containerView)
        containerView.addSubview(myButton)
        
        NSLayoutConstraint.activate([
            trackView.topAnchor.constraint(equalTo: topAnchor),
            trackView.bottomAnchor.constraint(equalTo: bottomAnchor),
            trackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            trackView.trailingAnchor.constraint(equalTo: trailingAnchor),
            
            backContainerView.topAnchor.constraint(equalTo: trackView.topAnchor, constant: 5),
            backContainerView.bottomAnchor.constraint(equalTo: trackView.bottomAnchor),
            backContainerView.leadingAnchor.constraint(equalTo: trackView.leadingAnchor),
            backContainerView.trailingAnchor.constraint(equalTo: trackView.trailingAnchor, constant: -2),
            
            containerView.topAnchor.constraint(equalTo: trackView.topAnchor, constant: 2),
            containerView.bottomAnchor.constraint(equalTo: trackView.bottomAnchor, constant: -4),
            containerView.leadingAnchor.constraint(equalTo: trackView.leadingAnchor, constant: 2),
            containerView.trailingAnchor.constraint(equalTo: trackView.trailingAnchor, constant: -2),
            
            myButton.topAnchor.constraint(equalTo: containerView.topAnchor),
            myButton.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
            myButton.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            myButton.trailingAnchor.constraint(equalTo: containerView.trailingAnchor)
        ])
    }

// MARK: - Usage
// let threeDButton = ThreeDButtonView()
// view.addSubview(threeDButton)
// threeDButton.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     threeDButton.topAnchor.constraint(equalTo: stackView.bottomAnchor, constant: 24),
//     threeDButton.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
//     threeDButton.heightAnchor.constraint(equalToConstant: 50),
//     threeDButton.widthAnchor.constraint(equalToConstant: 150),
// ])`,
  },
];

export default function Button() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Button</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style tap targets with various styles, sizes, and states.
        </p>
      </div>
      <div className="space-y-4">
        {buttonStyles.map((style) => (
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
