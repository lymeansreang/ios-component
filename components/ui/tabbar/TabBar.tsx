"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

type TabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onSelect?: () => void;
  activeColor?: string;
  inactiveColor?: string;
};

const simpleTabs: TabItem[] = [
  {
    id: "home",
    label: "Home",
    activeColor: "text-white",
    inactiveColor: "text-neutral-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    activeColor: "text-white",
    inactiveColor: "text-neutral-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "create",
    label: "Create",
    activeColor: "text-white",
    inactiveColor: "text-neutral-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
  },
  {
    id: "inbox",
    label: "Inbox",
    activeColor: "text-white",
    inactiveColor: "text-neutral-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v12H4z" />
        <path d="M4 16l4 4h8l4-4" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    activeColor: "text-white",
    inactiveColor: "text-neutral-500",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      </svg>
    ),
  },
];

const floatingTabs: TabItem[] = [
  {
    id: "home",
    label: "Home",
    activeColor: "text-neutral-900",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    activeColor: "text-neutral-900",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "offers",
    label: "Offers",
    activeColor: "text-neutral-900",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
        <path d="M4 20l16-16" />
      </svg>
    ),
  },
  {
    id: "cart",
    label: "Cart",
    activeColor: "text-neutral-900",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1.5" />
        <circle cx="19" cy="21" r="1.5" />
        <path d="M5 6h16l-1.5 9H7.5L6 4H3" />
      </svg>
    ),
  },
  // {
  //   id: "profile",
  //   label: "Profile",
  //   activeColor: "text-neutral-900",
  //   inactiveColor: "text-neutral-400",
  //   icon: (
  //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //       <circle cx="12" cy="7" r="4" />
  //       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  //     </svg>
  //   ),
  // },
];

const curveTabs: TabItem[] = [
  {
    id: "home",
    label: "Home",
    activeColor: "text-sky-500",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    activeColor: "text-sky-500",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "cart",
    label: "Cart",
    activeColor: "text-sky-500",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1.5" />
        <circle cx="19" cy="21" r="1.5" />
        <path d="M5 6h16l-1.5 9H7.5L6 4H3" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    activeColor: "text-sky-500",
    inactiveColor: "text-neutral-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      </svg>
    ),
  },
];

const tabBarSwiftCode = `import UIKit

struct TabItem {
    let id: String
    let title: String
    let systemImage: String
    let activeColor: UIColor
    let inactiveColor: UIColor
    let onSelect: (() -> Void)?
}

class SimpleTabBarView: UIView {

    private let containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .secondarySystemBackground
        view.layer.cornerRadius = 18
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.distribution = .fillEqually
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    private let selectionView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBlue
        view.layer.cornerRadius = 14
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private var selectionLeading: NSLayoutConstraint?
    private var selectedIndex: Int = 0

    var items: [TabItem] = [

        TabItem(
        id: "home", 
        title: "Home", 
        systemImage: "house.fill", 
        activeColor: .white, 
        inactiveColor: .secondaryLabel, 
        onSelect: nil),

        TabItem(
        id: "search", 
        title: "Search", 
        systemImage: "magnifyingglass", 
        activeColor: .white, 
        inactiveColor: .secondaryLabel, 
        onSelect: nil),

        TabItem(
        id: "create", 
        title: "Create", 
        systemImage: "plus.circle.fill", 
        activeColor: .white, 
        inactiveColor: .secondaryLabel, 
        onSelect: nil),

        TabItem(
        id: "inbox", 
        title: "Inbox", 
        systemImage: "tray.fill", 
        activeColor: .white, 
        inactiveColor: .secondaryLabel, 
        onSelect: nil),
        
        TabItem(
        id: "profile", 
        title: "Profile", 
        systemImage: "person.crop.circle.fill", 
        activeColor: .white, 
        inactiveColor: .secondaryLabel, 
        onSelect: nil),
    ] {
        didSet { rebuild() }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        rebuild()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        rebuild()
    }

    private func setupView() {
        addSubview(containerView)
        containerView.addSubview(stackView)
        containerView.insertSubview(selectionView, belowSubview: stackView)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 56),

            stackView.topAnchor.constraint(equalTo: containerView.topAnchor),
            stackView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            stackView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
        ])
    }

    private func rebuild() {
        stackView.arrangedSubviews.forEach { $0.removeFromSuperview() }

        selectionLeading?.isActive = false
        selectionLeading = selectionView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 8)

        for (index, item) in items.prefix(5).enumerated() {
            let button = UIButton(type: .system)
            var config = UIButton.Configuration.plain()
            config.title = item.title
            config.image = UIImage(systemName: item.systemImage)
            config.imagePlacement = .top
            config.imagePadding = 4
            config.baseForegroundColor = item.inactiveColor
            config.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { incoming in
                var outgoing = incoming
                outgoing.font = .systemFont(ofSize: 11, weight: .medium)
                return outgoing
            }
            button.configuration = config
            button.titleLabel?.font = .systemFont(ofSize: 11, weight: .medium)
            button.tag = index
            button.addTarget(self, action: #selector(didTap(_:)), for: .touchUpInside)
            stackView.addArrangedSubview(button)
        }

        if let selectionLeading {
            selectionLeading.isActive = true
        }

        NSLayoutConstraint.activate([
            selectionView.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 8),
            selectionView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor, constant: -8),
            selectionView.widthAnchor.constraint(equalTo: containerView.widthAnchor, multiplier: 1.0 / CGFloat(max(1, min(items.count, 5)))),
        ])

        updateSelection(animated: false)
    }

    @objc private func didTap(_ sender: UIButton) {
        selectedIndex = min(sender.tag, 4)
        updateSelection(animated: true)
        items[selectedIndex].onSelect?()
    }

    private func updateSelection(animated: Bool) {
        let count = max(1, min(items.count, 5))
        let offset = CGFloat(selectedIndex) * (containerView.bounds.width / CGFloat(count))
        selectionLeading?.constant = offset

        let updates = {
            self.containerView.layoutIfNeeded()
            for (index, button) in self.stackView.arrangedSubviews.enumerated() {
                guard let button = button as? UIButton else { continue }
                var config = button.configuration ?? UIButton.Configuration.plain()
                let item = self.items[index]
                config.baseForegroundColor = (index == self.selectedIndex) ? item.activeColor : item.inactiveColor
                button.configuration = config
            }
        }

        if animated {
            UIView.animate(withDuration: 0.2, delay: 0, options: [.curveEaseOut], animations: updates)
        } else {
            updates()
        }
    }
}

// MARK: - Usage
// let tabBar = SimpleTabBarView()
// tabBar.items = [
//     TabItem(id: "home", title: "Home", systemImage: "house.fill", activeColor: .white, inactiveColor: .secondaryLabel) {
//         print("Go Home")
//     },
//     TabItem(id: "search", title: "Search", systemImage: "magnifyingglass", activeColor: .white, inactiveColor: .secondaryLabel) {
//         print("Go Search")
//     },
//     TabItem(id: "create", title: "Create", systemImage: "plus.circle.fill", activeColor: .white, inactiveColor: .secondaryLabel) {
//         print("Open Create")
//     },
//     TabItem(id: "inbox", title: "Inbox", systemImage: "tray.fill", activeColor: .white, inactiveColor: .secondaryLabel) {
//         print("Go Inbox")
//     },
//     TabItem(id: "profile", title: "Profile", systemImage: "person.crop.circle.fill", activeColor: .white, inactiveColor: .secondaryLabel) {
//         print("Go Profile")
//     },
// ]
// view.addSubview(tabBar)
// tabBar.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     tabBar.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
//     tabBar.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
//     tabBar.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -12),
// ])
`;

const floatingButtonTabBarSwiftCode = `import UIKit

protocol CustomTabBarDelegate: AnyObject {
    func customTabBar(_ tabBar: CustomTabBar, didSelect item: TabItem)
}

enum TabItem: Int, CaseIterable {
    case home = 0
    case search
    case offers
    case cart
    case profile

    var title: String {
        switch self {
        case .home:    return "Home"
        case .search:  return "Search"
        case .offers:  return "Offers"
        case .cart:    return "Cart"
        case .profile: return "Profile"
        }
    }

    var icon: String {
        switch self {
        case .home:    return "house"
        case .search:  return "magnifyingglass"
        case .offers:  return "percent"
        case .cart:    return "basket"
        case .profile: return "person.circle"
        }
    }
}

final class CustomTabBar: UIView {

    private enum Layout {
        static let height: CGFloat        = 72
        static let horizontalPadding: CGFloat = 16
        static let verticalPadding: CGFloat   = 10
        static let pillSpacing: CGFloat   = 4
        static let pillCornerRadius: CGFloat  = 36
        static let iconSize: CGFloat      = 22
        static let activeIconSize: CGFloat    = 24
        static let fontSize: CGFloat      = 15
        static let fontWeight: UIFont.Weight  = .semibold
    }

    weak var delegate: CustomTabBarDelegate?
    private let barBackground = UIView()
    private var itemButtons: [TabItem: UIButton] = [:]
    private let activePill = UIView()
    private var activePillLeading: NSLayoutConstraint?
    private var activePillWidth: NSLayoutConstraint?
    private var stackView: UIStackView!

    private(set) var selectedItem: TabItem = .home {
        didSet {
            guard oldValue != selectedItem else { return }
            animateSelection(from: oldValue, to: selectedItem)
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
    
    @objc private func tabButtonTapped(_ sender: UIButton) {
        guard let item = TabItem(rawValue: sender.tag) else { return }
        selectedItem = item
        delegate?.customTabBar(self, didSelect: item)
    }
    
    func setSelected(_ item: TabItem, animated: Bool = true) {
        guard item != selectedItem else { return }
        if animated {
            selectedItem = item
        } else {
            UIView.performWithoutAnimation {
                selectedItem = item
            }
        }
    }

    private func setupView() {
        backgroundColor = .clear

        barBackground.backgroundColor  = UIColor(white: 0.1, alpha: 1.0)
        barBackground.layer.cornerRadius = Layout.height / 2
        barBackground.layer.masksToBounds = true
        barBackground.translatesAutoresizingMaskIntoConstraints = false
        addSubview(barBackground)

        NSLayoutConstraint.activate([
            barBackground.leadingAnchor.constraint(equalTo: leadingAnchor),
            barBackground.trailingAnchor.constraint(equalTo: trailingAnchor),
            barBackground.topAnchor.constraint(equalTo: topAnchor),
            barBackground.bottomAnchor.constraint(equalTo: bottomAnchor),
            barBackground.heightAnchor.constraint(equalToConstant: Layout.height)
        ])

        activePill.backgroundColor = .white
        activePill.layer.cornerRadius = (Layout.height - Layout.verticalPadding * 2) / 2
        activePill.layer.masksToBounds = true
        activePill.translatesAutoresizingMaskIntoConstraints = false
        barBackground.addSubview(activePill)
        activePillLeading = activePill.leadingAnchor.constraint(equalTo: barBackground.leadingAnchor, constant: 1)
        activePillWidth   = activePill.widthAnchor.constraint(equalToConstant: 0)

        NSLayoutConstraint.activate([
            activePill.topAnchor.constraint(equalTo: barBackground.topAnchor, constant: Layout.verticalPadding),
            activePill.bottomAnchor.constraint(equalTo: barBackground.bottomAnchor, constant: -Layout.verticalPadding),
            activePillLeading!,
            activePillWidth!
        ])

        let buttons: [UIView] = TabItem.allCases.map { item in
            let btn = buildButton(for: item)
            itemButtons[item] = btn
            return btn
        }

        stackView = UIStackView(arrangedSubviews: buttons)
        stackView.axis         = .horizontal
        stackView.distribution = .equalSpacing
        stackView.alignment    = .center
        stackView.spacing      = 0
        stackView.translatesAutoresizingMaskIntoConstraints = false
        barBackground.addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.leadingAnchor.constraint(equalTo: barBackground.leadingAnchor, constant: Layout.horizontalPadding),
            stackView.trailingAnchor.constraint(equalTo: barBackground.trailingAnchor, constant: -Layout.horizontalPadding),
            stackView.topAnchor.constraint(equalTo: barBackground.topAnchor),
            stackView.bottomAnchor.constraint(equalTo: barBackground.bottomAnchor)
        ])

        setNeedsLayout()
        layoutIfNeeded()
        positionPill(for: .home, animated: false)
        updateButtonAppearances(selected: .home)
    }

    private func buildButton(for item: TabItem) -> UIButton {
        let btn = UIButton(type: .custom)
        btn.tag = item.rawValue
        btn.addTarget(self, action: #selector(tabButtonTapped(_:)), for: .touchUpInside)
        btn.translatesAutoresizingMaskIntoConstraints = false

        // Icon
        let config = UIImage.SymbolConfiguration(pointSize: Layout.iconSize, weight: .regular)
        let image = UIImage(systemName: item.icon, withConfiguration: config)
        btn.setImage(image, for: .normal)
        btn.tintColor = UIColor(white: 0.5, alpha: 1)

        // Title (hidden by default — shown only when active)
        btn.setTitle(item.title, for: .normal)
        btn.setTitleColor(.white, for: .normal)
        btn.titleLabel?.font = UIFont.systemFont(ofSize: Layout.fontSize, weight: Layout.fontWeight)

        // Layout: icon left, text right
        btn.contentHorizontalAlignment = .center
        btn.imageEdgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)

        return btn
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        // Re-position pill on every layout pass (handles device rotation, etc.)
        positionPill(for: selectedItem, animated: false)
    }

    private func positionPill(for item: TabItem, animated: Bool) {
        guard let btn = itemButtons[item],
              let leading = activePillLeading,
              let width = activePillWidth else { return }

        barBackground.layoutIfNeeded()
        stackView.layoutIfNeeded()
        btn.layoutIfNeeded()

        let sideInset: CGFloat = Layout.horizontalPadding

        // If active, pill should wrap the actual visible content (image + title).
        // If inactive, just wrap the icon.
        let isActive = (item == selectedItem)

        // Get frames of image/title in button coords
        let imgFrame = btn.imageView?.frame ?? .zero
        let titleFrame = btn.titleLabel?.frame ?? .zero

        // Build a tight content rect
        var contentRect = imgFrame

        if isActive, !titleFrame.equalTo(.zero), !(btn.titleLabel?.text ?? "").isEmpty {
            contentRect = contentRect.union(titleFrame)
        }

        // Add padding around content
        let horizontalContentPadding: CGFloat = 16
        let pillWidth = contentRect.width + horizontalContentPadding * 2

        // Convert contentRect's midX into barBackground space
        let contentMidXInBtn = contentRect.midX
        let midPointInStack = btn.convert(CGPoint(x: contentMidXInBtn, y: btn.bounds.midY), to: stackView)
        let midPointInBar = barBackground.convert(midPointInStack, from: stackView)

        let pillX = midPointInBar.x - pillWidth / 2

        // Clamp inside bar, respecting side padding
        let minX = sideInset
        let maxX = barBackground.bounds.width - sideInset - pillWidth

        let clampedX: CGFloat
        if maxX < minX {
            clampedX = (barBackground.bounds.width - pillWidth) / 2
        } else {
            clampedX = min(max(pillX, minX), maxX)
        }

        leading.constant = clampedX
        width.constant = pillWidth

        if animated {
            UIView.animate(
                withDuration: 0.38,
                delay: 0,
                usingSpringWithDamping: 0.78,
                initialSpringVelocity: 0.4,
                options: [.curveEaseInOut],
                animations: { self.barBackground.layoutIfNeeded() }
            )
        } else {
            barBackground.layoutIfNeeded()
        }
    }

    private func animateSelection(from old: TabItem, to new: TabItem) {
        // Immediately update appearances
        updateButtonAppearances(selected: new)

        // Animate pill
        positionPill(for: new, animated: true)

        // Scale bounce on the newly selected button
        if let btn = itemButtons[new] {
            btn.transform = CGAffineTransform(scaleX: 0.85, y: 0.85)
            UIView.animate(
                withDuration: 0.45,
                delay: 0,
                usingSpringWithDamping: 0.6,
                initialSpringVelocity: 0.5,
                options: [],
                animations: { btn.transform = .identity }
            )
        }
    }

    private func updateButtonAppearances(selected: TabItem) {
        for item in TabItem.allCases {
            guard let btn = itemButtons[item] else { continue }
            let isActive = item == selected

            // Icon configuration
            let ptSize: CGFloat = isActive ? Layout.activeIconSize : Layout.iconSize
            let weight: UIImage.SymbolWeight = isActive ? .bold : .regular
            let config = UIImage.SymbolConfiguration(pointSize: ptSize, weight: weight)
            let image = UIImage(systemName: item.icon, withConfiguration: config)
            btn.setImage(image, for: .normal)

            if isActive {
                btn.tintColor = .black
                btn.setTitle(item.title, for: .normal)
                btn.setTitleColor(.black, for: .normal)

                // Keep icon+title centered consistently
                btn.semanticContentAttribute = .forceLeftToRight
                btn.contentHorizontalAlignment = .center

                let spacing: CGFloat = 8
                btn.imageEdgeInsets = .zero
                btn.titleEdgeInsets = .zero

                // This is the key: symmetric padding so it won't drift right on edge tabs
                btn.contentEdgeInsets = UIEdgeInsets(top: 0, left: 14, bottom: 0, right: 14)

                // Optional fade-in
                btn.titleLabel?.alpha = 0
                UIView.animate(withDuration: 0.2, delay: 0.1) {
                    btn.titleLabel?.alpha = 1
                }
            } else {
                btn.tintColor = UIColor(white: 0.55, alpha: 1)
                btn.setTitle("", for: .normal)
                btn.contentEdgeInsets = .zero
                btn.imageEdgeInsets = .zero
                btn.titleEdgeInsets = .zero
            }
        }
    }
}

final class CustomTabBarController: UIViewController {

    var viewControllers: [UIViewController] = [] {
        didSet { loadTabViewControllers() }
    }

    private(set) var selectedIndex: Int = 0 {
        didSet {
            guard oldValue != selectedIndex,
                  selectedIndex < viewControllers.count else { return }
            showViewController(at: selectedIndex)
        }
    }

    // MARK: - Private

    private let tabBar = CustomTabBar()
    private let contentView = UIView()
    private var currentChild: UIViewController?

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        setupLayout()
        tabBar.delegate = self
    }

    // MARK: - Setup

    private func setupLayout() {
        view.backgroundColor = UIColor(red: 0.58, green: 0.38, blue: 1.0, alpha: 1.0) // purple bg

        contentView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(contentView)

        tabBar.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tabBar)

        NSLayoutConstraint.activate([
            contentView.topAnchor.constraint(equalTo: view.topAnchor),
            contentView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: tabBar.topAnchor),

            tabBar.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            tabBar.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            tabBar.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -12),
            tabBar.heightAnchor.constraint(equalToConstant: 72)
        ])
    }

    private func loadTabViewControllers() {
        guard !viewControllers.isEmpty else { return }
        showViewController(at: selectedIndex)
    }

    private func showViewController(at index: Int) {
        guard index < viewControllers.count else { return }

        currentChild?.willMove(toParent: nil)
        currentChild?.view.removeFromSuperview()
        currentChild?.removeFromParent()

        let vc = viewControllers[index]
        addChild(vc)
        vc.view.frame = contentView.bounds
        vc.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        contentView.addSubview(vc.view)
        vc.didMove(toParent: self)
        currentChild = vc
    }
}

extension CustomTabBarController: CustomTabBarDelegate {
    func customTabBar(_ tabBar: CustomTabBar, didSelect item: TabItem) {
        selectedIndex = item.rawValue
    }
}

// MARK: - Preview / Usage Example

/*

 Usage in SceneDelegate or AppDelegate:

 let homeVC    = HomeViewController()
 let searchVC  = SearchViewController()
 let offersVC  = OffersViewController()
 let cartVC    = CartViewController()
 let profileVC = ProfileViewController()

 let tabController = CustomTabBarController()
 tabController.viewControllers = [homeVC, searchVC, offersVC, cartVC, profileVC]

 window?.rootViewController = tabController
 window?.makeKeyAndVisible()

 */
`;

const curveButtonTabBarSwiftCode = `import UIKit

// MARK: - Tab Item Model
enum TabItem2: Int, CaseIterable {
    case home = 0
    case search
    case cart
    case profile

    var icon: String {
        switch self {
        case .home:    return "house.fill"
        case .search:  return "magnifyingglass"
        case .cart:    return "cart"
        case .profile: return "person.fill"
        }
    }

    var title: String {
        switch self {
        case .home:    return "Home"
        case .search:  return "Search"
        case .cart:    return "Cart"
        case .profile: return "Profile"
        }
    }
}

// MARK: - CustomTabBar2Delegate
protocol CustomTabBar2Delegate: AnyObject {
    func tabBar(_ tabBar: CustomTabBar2, didSelect tab: TabItem2)
}

// MARK: - CustomTabBar2
final class CustomTabBar2: UIView {

    enum Layout {
        static let barHeight: CGFloat = 70
        static let activeCircleSize: CGFloat = 60
        static let iconSize: CGFloat = 24
        static let cornerRadius: CGFloat = 28
        static let notchRadius: CGFloat = 34
        static let horizontalPadding: CGFloat = 20
        static let shadowOpacity: Float = 0.12
        static let shadowRadius: CGFloat = 16
        static let shadowOffset = CGSize(width: 0, height: 4)
        static let labelHeight: CGFloat = 16
        static let labelWidth: CGFloat = 90
        static let labelTopGap: CGFloat = 6
        static let inactiveButtonYOffset: CGFloat = -25
        static let buttonSize: CGFloat = 44
    }

    enum Colors {
        static let activeBlue   = UIColor(red: 0.22, green: 0.75, blue: 0.88, alpha: 1.0)
        static let activeTint   = UIColor(red: 0.22, green: 0.75, blue: 0.88, alpha: 1.0)
        static let inactiveTint = UIColor(red: 0.67, green: 0.70, blue: 0.73, alpha: 1.0)
        static let barBg        = UIColor.white
        static let shadow       = UIColor(white: 0, alpha: 1)
        static let bg           = UIColor(red: 0.94, green: 0.96, blue: 0.97, alpha: 1)
    }

    // MARK: - Properties
    weak var delegate: CustomTabBar2Delegate?
    private(set) var selectedTab: TabItem2 = .home

    private var tabButtons: [TabItem2: UIButton] = [:]

    private let containerView  = UIView()
    private let activeCircle   = UIView()
    private let activeIcon     = UIImageView()
    private let activeLabel    = UILabel()

    // Mask and display link to animate notch smoothly with circle
    private let notchMaskLayer = CAShapeLayer()
    private var displayLink: CADisplayLink?

    // Cached centers for each tab
    private var tabCenters: [TabItem2: CGFloat] = [:]

    // MARK: - Init
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }

    deinit {
        stopDisplayLink()
    }

    // MARK: - Setup
    private func setup() {
        backgroundColor = .clear
        setupContainer()
        setupActiveCircle()
        setupAllTabs()
        selectedTab = .home
        setNeedsLayout()
        layoutIfNeeded()
        updateAll(animated: false)
    }

    private func setupContainer() {
        containerView.backgroundColor = Colors.barBg
        containerView.layer.cornerRadius = Layout.cornerRadius
        containerView.layer.shadowColor   = Colors.shadow.cgColor
        containerView.layer.shadowOpacity = Layout.shadowOpacity
        containerView.layer.shadowRadius  = Layout.shadowRadius
        containerView.layer.shadowOffset  = Layout.shadowOffset
        containerView.layer.masksToBounds = false
        addSubview(containerView)

        // Mask layer for notch
        containerView.layer.mask = notchMaskLayer
    }

    private func setupActiveCircle() {
        activeCircle.backgroundColor = Colors.activeBlue
        activeCircle.layer.cornerRadius = Layout.activeCircleSize / 2
        activeCircle.layer.shadowColor   = Colors.activeBlue.cgColor
        activeCircle.layer.shadowOpacity = 0.45
        activeCircle.layer.shadowRadius  = 10
        activeCircle.layer.shadowOffset  = CGSize(width: 0, height: 6)
        addSubview(activeCircle)

        activeIcon.contentMode = .scaleAspectFit
        activeIcon.tintColor   = .white
        activeCircle.addSubview(activeIcon)

        activeLabel.font      = UIFont.systemFont(ofSize: 12, weight: .semibold)
        activeLabel.textColor = Colors.activeTint
        activeLabel.textAlignment = .center
        addSubview(activeLabel)
    }

    private func setupAllTabs() {
        for tab in TabItem2.allCases {
            let button = UIButton(type: .system)
            button.tag = tab.rawValue
            button.tintColor = Colors.inactiveTint
            let config = UIImage.SymbolConfiguration(pointSize: Layout.iconSize, weight: .regular)
            button.setImage(UIImage(systemName: tab.icon, withConfiguration: config), for: .normal)
            button.addTarget(self, action: #selector(tabTapped(_:)), for: .touchUpInside)
            containerView.addSubview(button)
            tabButtons[tab] = button
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()

        let totalWidth = bounds.width
        let barHeight  = Layout.barHeight
        let circleSize = Layout.activeCircleSize

        // Container sits at bottom with extra top space for the floating circle
        let extraTop: CGFloat = circleSize / 2
        containerView.frame = CGRect(
            x: 0,
            y: extraTop,
            width: totalWidth,
            height: barHeight
        )

        // Compute tab centers evenly inside container with side padding
        computeTabCenters()

        // Place active circle at selected tab center
        let centerX = tabCenters[selectedTab] ?? Layout.horizontalPadding + circleSize / 2
        activeCircle.frame = CGRect(
            x: centerX - circleSize / 2,
            y: containerView.frame.minY - circleSize / 2,
            width: circleSize,
            height: circleSize
        )

        // Icon inside circle
        let iconPad: CGFloat = 14
        activeIcon.frame = activeCircle.bounds.insetBy(dx: iconPad, dy: iconPad)

        // Label under the circle, centered
        let labelY = containerView.frame.minY + circleSize / 2 + Layout.labelTopGap
        activeLabel.frame = CGRect(
            x: centerX - Layout.labelWidth / 2,
            y: labelY,
            width: Layout.labelWidth,
            height: Layout.labelHeight
        )

        // Layout all tab buttons at their centers
        layoutButtons()

        // Apply notch mask following current circle X
        updateNotchMask()
    }

    private func computeTabCenters() {
        var centers: [TabItem2: CGFloat] = [:]
        let insetLeft  = Layout.horizontalPadding
        let insetRight = Layout.horizontalPadding
        let usableWidth = containerView.bounds.width - insetLeft - insetRight
        let count = CGFloat(TabItem2.allCases.count)

        // Divide into equal segments; center of each segment is a tab center
        for (index, tab) in TabItem2.allCases.enumerated() {
            let i = CGFloat(index)
            let segmentWidth = usableWidth / count
            let centerX = insetLeft + segmentWidth * (i + 0.5)
            centers[tab] = centerX
        }
        tabCenters = centers
    }

    private func layoutButtons() {
        let buttonSize = Layout.buttonSize

        // Base Y to vertically center the button
        let baseY = containerView.frame.minY + (containerView.frame.height - buttonSize) / 2

        for (tab, btn) in tabButtons {
            let centerX = tabCenters[tab] ?? 0

            // Raise only inactive buttons
            let yOffset: CGFloat = (tab == selectedTab) ? 0 : Layout.inactiveButtonYOffset

            btn.frame = CGRect(
                x: centerX - buttonSize / 2,
                y: baseY + yOffset,
                width: buttonSize,
                height: buttonSize
            )

            // Hide the selected tab's bottom icon (since it's shown inside the circle)
            btn.imageView?.alpha = (tab == selectedTab) ? 0.0 : 1.0

            btn.alpha = 1
            btn.tintColor = (tab == selectedTab) ? Colors.activeBlue : Colors.inactiveTint
        }
    }

    // MARK: - Notch Mask
    private func updateNotchMask() {
        let width  = containerView.bounds.width
        let height = containerView.bounds.height
        let r      = Layout.notchRadius

        // Convert active circle center to containerView coords
        let circleCenterInSelf = CGPoint(x: activeCircle.frame.midX, y: activeCircle.frame.midY)
        let circleCenter = convert(circleCenterInSelf, to: containerView)
        let cx = max(Layout.cornerRadius + r + 4, min(width - Layout.cornerRadius - r - 4, circleCenter.x))

        let path = UIBezierPath()

        // Start at left vertical edge
        path.move(to: CGPoint(x: 0, y: Layout.cornerRadius))

        // Top-left corner arc
        path.addArc(withCenter: CGPoint(x: Layout.cornerRadius, y: Layout.cornerRadius),
                    radius: Layout.cornerRadius,
                    startAngle: .pi,
                    endAngle: .pi * 1.5,
                    clockwise: true)

        // Notch
        let notchLeft  = cx - r
        let notchRight = cx + r

        path.addLine(to: CGPoint(x: notchLeft - r * 0.45, y: 0))
        // Left notch curve
        path.addCurve(
            to: CGPoint(x: cx, y: r * 0.55),
            controlPoint1: CGPoint(x: notchLeft, y: 0),
            controlPoint2: CGPoint(x: cx - r * 0.6, y: r * 0.55)
        )
        // Right notch curve
        path.addCurve(
            to: CGPoint(x: notchRight + r * 0.45, y: 0),
            controlPoint1: CGPoint(x: cx + r * 0.6, y: r * 0.55),
            controlPoint2: CGPoint(x: notchRight, y: 0)
        )

        // Top-right corner arc
        path.addLine(to: CGPoint(x: width - Layout.cornerRadius, y: 0))
        path.addArc(withCenter: CGPoint(x: width - Layout.cornerRadius, y: Layout.cornerRadius),
                    radius: Layout.cornerRadius,
                    startAngle: .pi * 1.5,
                    endAngle: 0,
                    clockwise: true)

        // Bottom-right corner arc
        path.addLine(to: CGPoint(x: width, y: height - Layout.cornerRadius))
        path.addArc(withCenter: CGPoint(x: width - Layout.cornerRadius, y: height - Layout.cornerRadius),
                    radius: Layout.cornerRadius,
                    startAngle: 0,
                    endAngle: .pi * 0.5,
                    clockwise: true)

        // Bottom-left corner arc
        path.addLine(to: CGPoint(x: Layout.cornerRadius, y: height))
        path.addArc(withCenter: CGPoint(x: Layout.cornerRadius, y: height - Layout.cornerRadius),
                    radius: Layout.cornerRadius,
                    startAngle: .pi * 0.5,
                    endAngle: .pi,
                    clockwise: true)

        path.close()

        notchMaskLayer.path = path.cgPath
    }

    private func startDisplayLinkIfNeeded() {
        guard displayLink == nil else { return }
        let link = CADisplayLink(target: self, selector: #selector(displayLinkTick))
        link.add(to: .main, forMode: .common)
        displayLink = link
    }

    private func stopDisplayLink() {
        displayLink?.invalidate()
        displayLink = nil
    }

    @objc private func displayLinkTick() {
        // As circle animates, recompute mask to keep notch glued to it
        updateNotchMask()
    }

    // MARK: - Tab Selection
    @objc private func tabTapped(_ sender: UIButton) {
        guard let tab = TabItem2(rawValue: sender.tag) else { return }
        selectTab(tab, animated: true)
        delegate?.tabBar(self, didSelect: tab)
    }

    func selectTab(_ tab: TabItem2, animated: Bool) {
        guard selectedTab != tab else { return }
        selectedTab = tab
        updateAll(animated: animated)
    }

    private func updateAll(animated: Bool) {
        let circleSize = Layout.activeCircleSize
        let config = UIImage.SymbolConfiguration(pointSize: 22, weight: .semibold)

        let targetX = tabCenters[selectedTab] ?? (Layout.horizontalPadding + circleSize / 2)
        activeIcon.image = UIImage(systemName: selectedTab.icon, withConfiguration: config)
        activeLabel.text = selectedTab.title

        let circleTargetFrame = CGRect(
            x: targetX - circleSize / 2,
            y: containerView.frame.minY - circleSize / 2,
            width: circleSize,
            height: circleSize
        )
        let labelY = containerView.frame.minY + circleSize / 2 + Layout.labelTopGap
        let labelTargetFrame = CGRect(
            x: targetX - Layout.labelWidth / 2,
            y: labelY,
            width: Layout.labelWidth,
            height: Layout.labelHeight
        )

        let applyFrames = {
            self.activeCircle.frame = circleTargetFrame
            let iconPad: CGFloat = 14
            self.activeIcon.frame = self.activeCircle.bounds.insetBy(dx: iconPad, dy: iconPad)
            self.activeLabel.frame = labelTargetFrame
            self.layoutButtons() // re-applies raised Y and hides selected icon
            self.updateNotchMask()
        }

        if animated {
            // Keep notch synced during animation
            startDisplayLinkIfNeeded()

            UIView.animate(withDuration: 0.42,
                           delay: 0,
                           usingSpringWithDamping: 0.78,
                           initialSpringVelocity: 0.5,
                           options: [.curveEaseInOut, .allowUserInteraction],
                           animations: applyFrames,
                           completion: { _ in
                               self.stopDisplayLink()
                               self.updateNotchMask()
                           })

            // Subtle scale bounce on the active circle
            self.activeCircle.transform = CGAffineTransform(scaleX: 0.9, y: 0.9)
            UIView.animate(withDuration: 0.42,
                           delay: 0,
                           usingSpringWithDamping: 0.6,
                           initialSpringVelocity: 0.6,
                           options: [.curveEaseInOut],
                           animations: {
                               self.activeCircle.transform = .identity
                           })

        } else {
            applyFrames()
        }
    }

    // MARK: - Intrinsic Size
    override var intrinsicContentSize: CGSize {
        return CGSize(width: UIView.noIntrinsicMetric,
                      height: Layout.barHeight + Layout.activeCircleSize / 2)
    }
}

// MARK: - CustomTabBar2Controller
final class CustomTabBar2Controller: UIViewController {

    private let tabBar = CustomTabBar2()

    // View controllers mapped to each tab
    private var viewControllers: [TabItem2: UIViewController] = [:]
    private var currentVC: UIViewController?

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = CustomTabBar2.Colors.bg
        if viewControllers.isEmpty {
            setupDefaultPlaceholders()
        }
        setupTabBar()
        showTab(.home)
    }

    // Public configuration API
    func configureTabs(_ map: [TabItem2: UIViewController]) {
        viewControllers = map
        if isViewLoaded {
            showTab(.home)
        }
    }

    func configureTabs(home: UIViewController, search: UIViewController, cart: UIViewController, profile: UIViewController) {
        configureTabs([
            .home: home,
            .search: search,
            .cart: cart,
            .profile: profile
        ])
    }

    private func setupDefaultPlaceholders() {
        for tab in TabItem2.allCases {
            let vc = PlaceholderViewController(tab: tab)
            viewControllers[tab] = vc
        }
    }

    private func setupTabBar() {
        tabBar.delegate = self
        tabBar.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tabBar)

        NSLayoutConstraint.activate([
            tabBar.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            tabBar.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
            tabBar.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16),
            tabBar.heightAnchor.constraint(equalToConstant: 100)
        ])
    }

    private func showTab(_ tab: TabItem2) {
        guard let newVC = viewControllers[tab] else { return }

        currentVC?.willMove(toParent: nil)
        currentVC?.view.removeFromSuperview()
        currentVC?.removeFromParent()

        addChild(newVC)
        newVC.view.frame = view.bounds
        newVC.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.insertSubview(newVC.view, belowSubview: tabBar)
        newVC.didMove(toParent: self)
        currentVC = newVC
    }
}

extension CustomTabBar2Controller: CustomTabBar2Delegate {
    func tabBar(_ tabBar: CustomTabBar2, didSelect tab: TabItem2) {
        showTab(tab)
    }
}

// MARK: - Placeholder VC (for demo)
final class PlaceholderViewController: UIViewController {
    private let tabItem: TabItem2

    init(tab: TabItem2) {
        self.tabItem = tab
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) { fatalError() }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .clear

        let label = UILabel()
        label.text = tabItem.title
        label.font = UIFont.systemFont(ofSize: 28, weight: .bold)
        label.textColor = UIColor(red: 0.22, green: 0.75, blue: 0.88, alpha: 1)
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}

// MARK: - Usage
// let homeVC = HomeViewController()
// let searchVC = SearchViewController()
// let cartVC = CartViewController()
// let profileVC = ProfileViewController()
//
// let tabController = CustomTabBar2Controller()
// tabController.configureTabs(home: homeVC, search: searchVC, cart: cartVC, profile: profileVC)
// window?.rootViewController = tabController
// window?.makeKeyAndVisible()
`;

export default function TabBar() {
  const [activeSimple, setActiveSimple] = useState("home");
  const [activeGlass, setActiveGlass] = useState("home");
  const [activeFloating, setActiveFloating] = useState("home");
  const [activeCurve, setActiveCurve] = useState("home");

  const itemsWithRoutes: TabItem[] = [
    {
      id: "home",
      label: "Home",
      href: "#",
      activeColor: "text-white",
      inactiveColor: "text-neutral-500",
      icon: simpleTabs[0].icon,
    },
    {
      id: "search",
      label: "Search",
      href: "#",
      activeColor: "text-white",
      inactiveColor: "text-neutral-500",
      icon: simpleTabs[1].icon,
    },
    {
      id: "create",
      label: "Create",
      onSelect: () => {},
      activeColor: "text-white",
      inactiveColor: "text-neutral-500",
      icon: simpleTabs[2].icon,
    },
    {
      id: "inbox",
      label: "Inbox",
      href: "#",
      activeColor: "text-white",
      inactiveColor: "text-neutral-500",
      icon: simpleTabs[3].icon,
    },
    {
      id: "profile",
      label: "Profile",
      href: "#",
      activeColor: "text-white",
      inactiveColor: "text-neutral-500",
      icon: simpleTabs[4].icon,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tab Bar</h2>
        <p className="text-neutral-500 mt-1">
          Simple bottom tab bars with up to five actions.
        </p>
      </div>
      <div className="space-y-4">
        <CodePreview
          title="Simple Tab Bar"
          description="Standard tab bar with five items."
          preview={
            <div className="w-full max-w-xl">
              <div className="relative grid grid-cols-5 gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2">
                <span
                  className="absolute left-2 top-2 bottom-2 w-[calc((100%-1rem-0.5rem*4)/5)] rounded-xl bg-neutral-900 dark:bg-neutral-100 transition-transform duration-200"
                  style={{
                    transform: `translateX(calc(${simpleTabs.findIndex((t) => t.id === activeSimple)} * (100% + 0.5rem)))`,
                  }}
                />
                {simpleTabs.map((tab) => {
                  const isActive = activeSimple === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSimple(tab.id)}
                      className={`relative z-10 flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs font-medium transition-transform duration-150 ${
                        isActive
                          ? "text-white dark:text-neutral-900 scale-[1.03]"
                          : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:scale-[1.02]"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          }
          swiftCode={tabBarSwiftCode}
        />
        <CodePreview
          title="Floating Button Tab Bar"
          description="Compact floating bar with a dynamic pill for the active tab."
          preview={
            <div className="w-full max-w-xl">
              <div className="rounded-3xl bg-gradient-to-b from-neutral-100 to-neutral-200 p-6">
                <div className="flex items-center justify-between gap-2 rounded-full bg-neutral-900 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
                  {floatingTabs.map((tab) => {
                    const isActive = activeFloating === tab.id;
                    const activeText = tab.activeColor ?? "text-neutral-900";
                    const inactiveText = tab.inactiveColor ?? "text-neutral-400";

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveFloating(tab.id)}
                        className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                          isActive ? `${activeText} bg-white shadow-sm` : `${inactiveText} hover:text-neutral-200`
                        }`}
                      >
                        {tab.icon}
                        {isActive && <span>{tab.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          }
          swiftCode={floatingButtonTabBarSwiftCode}
        />
        <CodePreview
          title="Curve Button Tab Bar"
          description="Curved notch with a floating active circle."
          preview={
            <div className="w-full max-w-xl">
              <div className="rounded-3xl bg-gradient-to-b from-slate-50 to-slate-200 p-6">
                {(() => {
                  const activeIndex = curveTabs.findIndex((tab) => tab.id === activeCurve);
                  const items = curveTabs.length;
                  const activeTab = curveTabs[activeIndex] ?? curveTabs[0];
                  const activeColor = "rgb(45, 212, 191)";
                  const maskRadius = 42;
                  return (
                    <div className="relative mx-auto h-28 w-full max-w-md">
                      <div
                        className="absolute bottom-0 left-0 right-0 h-16 rounded-[28px] bg-white shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
                        style={{
                          WebkitMask: `radial-gradient(circle ${maskRadius}px at calc((100% / ${items}) * ${activeIndex} + (100% / ${items}) / 2) 0px, transparent 98%, #000 100%), linear-gradient(#000 0 0)`,
                          mask: `radial-gradient(circle ${maskRadius}px at calc((100% / ${items}) * ${activeIndex} + (100% / ${items}) / 2) 0px, transparent 98%, #000 100%), linear-gradient(#000 0 0)`,
                        }}
                      />
                      <div
                        className="absolute top-0 h-14 w-14 rounded-full shadow-[0_10px_20px_rgba(45,212,191,0.45)] transition-[left] duration-300"
                        style={{
                          left: `calc((100% / ${items}) * ${activeIndex} + (100% / ${items}) / 2)`,
                          transform: "translateX(-50%)",
                          backgroundColor: activeColor,
                        }}
                      >
                        <div className="grid h-full w-full place-items-center text-white">
                          {activeTab.icon}
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-16 flex items-center">
                        {curveTabs.map((tab, index) => {
                          const isActive = activeCurve === tab.id;
                          const inactiveText = tab.inactiveColor ?? "text-neutral-400";
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveCurve(tab.id)}
                              className={`flex-1 transition-all duration-200 flex flex-col items-center justify-center ${
                                isActive ? "-translate-y-6 text-teal-500" : `${inactiveText} hover:text-slate-500`
                              }`}
                            >
                              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full">
                                <span className={`${isActive ? "opacity-0" : "opacity-100"} transition-opacity duration-150`}>
                                  {tab.icon}
                                </span>
                              </div>
                              <span
                                className={`mt-1 block text-xs font-semibold transition-opacity duration-200 ${
                                  isActive ? "opacity-100" : "opacity-0"
                                }`}
                                style={{ color: activeColor }}
                              >
                                {tab.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          }
          swiftCode={curveButtonTabBarSwiftCode}
        />
        <CodePreview
          title="Glass Tab Bar"
          description="Frosted glass style with soft highlights."
          preview={
            <div className="w-full max-w-xl">
              <div className="relative grid grid-cols-5 gap-2 rounded-2xl border border-white/30 bg-white/20 dark:bg-white/5 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.18)] p-2">
                <span
                  className="absolute left-2 top-2 bottom-2 w-[calc((100%-1rem-0.5rem*4)/5)] rounded-xl bg-white/70 transition-transform duration-200"
                  style={{
                    transform: `translateX(calc(${simpleTabs.findIndex((t) => t.id === activeGlass)} * (100% + 0.5rem)))`,
                  }}
                />
                {simpleTabs.map((tab) => {
                  const isActive = activeGlass === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveGlass(tab.id)}
                      className={`relative z-10 flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs font-medium transition-transform duration-150 ${
                        isActive
                          ? "text-neutral-900 scale-[1.03]"
                          : "text-neutral-700 dark:text-neutral-200 hover:scale-[1.02]"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          }
          swiftCode={tabBarSwiftCode}
        />
        {/* <CodePreview
          title="Tabbed Routes"
          description="Each tab can route, customize icon, text, and colors."
          preview={
            <div className="w-full max-w-xl">
              <div className="relative grid grid-cols-5 gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2">
                <span
                  className="absolute top-2 bottom-2 w-[calc((100%-0.5rem*4)/5)] rounded-xl bg-blue-500 transition-transform duration-200"
                  style={{
                    transform: `translateX(calc(${itemsWithRoutes.findIndex((t) => t.id === activeSimple)} * (100% + 0.5rem)))`,
                  }}
                />
                {itemsWithRoutes.map((tab) => {
                  const isActive = activeSimple === tab.id;
                  const activeText = tab.activeColor ?? "text-white";
                  const inactiveText =
                    tab.inactiveColor ??
                    "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300";

                  const sharedClass = `relative z-10 flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs font-medium transition-transform duration-150 ${
                    isActive ? `${activeText} scale-[1.03]` : `${inactiveText} hover:scale-[1.02]`
                  }`;

                  if (tab.href) {
                    return (
                      <a
                        key={tab.id}
                        href={tab.href}
                        onClick={() => setActiveSimple(tab.id)}
                        className={sharedClass}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </a>
                    );
                  }

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveSimple(tab.id);
                        tab.onSelect?.();
                      }}
                      className={sharedClass}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          }
          swiftCode={tabBarSwiftCode}
        /> */}
      </div>
    </div>
  );
}
