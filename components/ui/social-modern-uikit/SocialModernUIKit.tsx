"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

const avatarSwiftCode = `import UIKit

class AvatarStatusView: UIView {

    private let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 28
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()

    private let statusBadge: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 7
        view.layer.borderWidth = 2
        view.layer.borderColor = UIColor.systemBackground.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    var avatarImage: UIImage? {
        didSet { imageView.image = avatarImage }
    }

    var statusColor: UIColor = .systemGreen {
        didSet { statusBadge.backgroundColor = statusColor }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapAvatar() {}

    private func setupView() {
        addSubview(imageView)
        addSubview(statusBadge)
        statusBadge.backgroundColor = statusColor

        NSLayoutConstraint.activate([
            imageView.topAnchor.constraint(equalTo: topAnchor),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 56),
            imageView.heightAnchor.constraint(equalToConstant: 56),
            imageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            statusBadge.widthAnchor.constraint(equalToConstant: 14),
            statusBadge.heightAnchor.constraint(equalToConstant: 14),
            statusBadge.trailingAnchor.constraint(equalTo: imageView.trailingAnchor),
            statusBadge.bottomAnchor.constraint(equalTo: imageView.bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let avatar = AvatarStatusView()
// avatar.avatarImage = UIImage(named: "profile")
// avatar.statusColor = .systemGreen
`;

const storySwiftCode = `import UIKit

class StoryCircleView: UIView {

    private let ringView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 34
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 30
        imageView.layer.borderWidth = 2
        imageView.layer.borderColor = UIColor.systemBackground.cgColor
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()

    private let nameLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 11, weight: .medium)
        label.textAlignment = .center
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var image: UIImage? { didSet { imageView.image = image } }
    var username: String = "username" { didSet { nameLabel.text = username } }
    var isSeen: Bool = false { didSet { updateRing() } }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapStory() {}

    private func setupView() {
        addSubview(ringView)
        ringView.addSubview(imageView)
        addSubview(nameLabel)
        nameLabel.text = username
        updateRing()

        NSLayoutConstraint.activate([
            ringView.topAnchor.constraint(equalTo: topAnchor),
            ringView.centerXAnchor.constraint(equalTo: centerXAnchor),
            ringView.widthAnchor.constraint(equalToConstant: 68),
            ringView.heightAnchor.constraint(equalToConstant: 68),
            imageView.centerXAnchor.constraint(equalTo: ringView.centerXAnchor),
            imageView.centerYAnchor.constraint(equalTo: ringView.centerYAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 60),
            imageView.heightAnchor.constraint(equalToConstant: 60),
            nameLabel.topAnchor.constraint(equalTo: ringView.bottomAnchor, constant: 6),
            nameLabel.leadingAnchor.constraint(equalTo: leadingAnchor),
            nameLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            nameLabel.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    private func updateRing() {
        ringView.backgroundColor = isSeen ? .systemGray4 : .systemPink
    }
}

// MARK: - Usage
// let story = StoryCircleView()
// story.username = "alex"
// story.isSeen = false
`;

const reactionSwiftCode = `import UIKit

class ReactionPickerView: UIView {

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.spacing = 6
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    var reactions: [String] = ["👍", "❤️", "😂", "😮", "🔥"]
    var onSelect: ((String) -> Void)?
    let selectedBackgroundColor = UIColor.systemGray5

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func reactionTapped(_ sender: UIButton) {
        guard let title = sender.title(for: .normal) else { return }
        onSelect?(title)
    }

    private func setupView() {
        layer.cornerRadius = 18
        backgroundColor = .secondarySystemBackground
        addSubview(stackView)

        for reaction in reactions {
            let button = UIButton(type: .system)
            button.setTitle(reaction, for: .normal)
            button.titleLabel?.font = .systemFont(ofSize: 20)
            button.backgroundColor = .clear
            button.layer.cornerRadius = 14
            button.contentEdgeInsets = UIEdgeInsets(top: 4, left: 8, bottom: 4, right: 8)
            button.addTarget(self, action: #selector(reactionTapped(_:)), for: .touchUpInside)
            stackView.addArrangedSubview(button)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor, constant: 6),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -8),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -6),
        ])
    }
}

// MARK: - Usage
// let picker = ReactionPickerView()
// picker.onSelect = { emoji in print(emoji) }
`;

const likeSwiftCode = `import UIKit

class LikeButtonView: UIView {

    private let heartButton: UIButton = {
        let button = UIButton(type: .system)
        button.tintColor = .systemGray
        button.setImage(UIImage(systemName: "heart"), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let countLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var isLiked = false { didSet { updateUI() } }
    var count = 120 { didSet { countLabel.text = "\\(count)" } }
    let likedColor = UIColor.systemRed

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapLike() {
        isLiked.toggle()
        count += isLiked ? 1 : -1
        animateHeart()
    }

    private func setupView() {
        addSubview(heartButton)
        addSubview(countLabel)
        countLabel.text = "\\(count)"
        heartButton.addTarget(self, action: #selector(didTapLike), for: .touchUpInside)
        updateUI()

        NSLayoutConstraint.activate([
            heartButton.topAnchor.constraint(equalTo: topAnchor),
            heartButton.leadingAnchor.constraint(equalTo: leadingAnchor),
            heartButton.widthAnchor.constraint(equalToConstant: 24),
            heartButton.heightAnchor.constraint(equalToConstant: 24),
            countLabel.leadingAnchor.constraint(equalTo: heartButton.trailingAnchor, constant: 6),
            countLabel.centerYAnchor.constraint(equalTo: heartButton.centerYAnchor),
            countLabel.trailingAnchor.constraint(equalTo: trailingAnchor),
            countLabel.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    private func updateUI() {
        heartButton.tintColor = isLiked ? likedColor : .systemGray
        heartButton.setImage(UIImage(systemName: isLiked ? "heart.fill" : "heart"), for: .normal)
    }

    private func animateHeart() {
        UIView.animate(withDuration: 0.12, animations: {
            self.heartButton.transform = CGAffineTransform(scaleX: 1.2, y: 1.2)
        }, completion: { _ in
            UIView.animate(withDuration: 0.12) {
                self.heartButton.transform = .identity
            }
        })
    }
}

// MARK: - Usage
// let likeView = LikeButtonView()
`;

const readMoreSwiftCode = `import UIKit

class ExpandableTextView: UIView {

    private let label: UILabel = {
        let label = UILabel()
        label.numberOfLines = 3
        label.font = .systemFont(ofSize: 14, weight: .regular)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let readMoreButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Read more", for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 13, weight: .semibold)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var text: String = "" { didSet { label.text = text } }
    var isExpanded = false
    let collapsedLines = 3

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func toggleExpanded() {
        isExpanded.toggle()
        label.numberOfLines = isExpanded ? 0 : collapsedLines
        readMoreButton.setTitle(isExpanded ? "Show less" : "Read more", for: .normal)
    }

    private func setupView() {
        addSubview(label)
        addSubview(readMoreButton)
        readMoreButton.addTarget(self, action: #selector(toggleExpanded), for: .touchUpInside)

        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: topAnchor),
            label.leadingAnchor.constraint(equalTo: leadingAnchor),
            label.trailingAnchor.constraint(equalTo: trailingAnchor),
            readMoreButton.topAnchor.constraint(equalTo: label.bottomAnchor, constant: 4),
            readMoreButton.leadingAnchor.constraint(equalTo: leadingAnchor),
            readMoreButton.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let expandable = ExpandableTextView()
// expandable.text = "Long post content..."
`;

const commentSwiftCode = `import UIKit

class CommentInputBarView: UIView {

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = "Write a comment..."
        field.font = .systemFont(ofSize: 14)
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let sendButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Send", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var onSend: ((String) -> Void)?
    let horizontalPadding: CGFloat = 10

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapSend() {
        guard let text = textField.text, !text.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        onSend?(text)
        textField.text = ""
    }

    private func setupView() {
        layer.cornerRadius = 14
        backgroundColor = .secondarySystemBackground
        addSubview(textField)
        addSubview(sendButton)
        sendButton.addTarget(self, action: #selector(didTapSend), for: .touchUpInside)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 44),
            textField.leadingAnchor.constraint(equalTo: leadingAnchor, constant: horizontalPadding),
            textField.centerYAnchor.constraint(equalTo: centerYAnchor),
            sendButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -horizontalPadding),
            sendButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            textField.trailingAnchor.constraint(equalTo: sendButton.leadingAnchor, constant: -8),
        ])
    }
}

// MARK: - Usage
// let commentBar = CommentInputBarView()
`;

const carouselSwiftCode = `import UIKit

class SocialCarouselView: UIView, UIScrollViewDelegate {

    private let scrollView: UIScrollView = {
        let scroll = UIScrollView()
        scroll.isPagingEnabled = true
        scroll.showsHorizontalScrollIndicator = false
        scroll.translatesAutoresizingMaskIntoConstraints = false
        return scroll
    }()

    private let pageControl: UIPageControl = {
        let control = UIPageControl()
        control.translatesAutoresizingMaskIntoConstraints = false
        return control
    }()

    var imageViews: [UIImageView] = []
    var images: [UIImage] = [] { didSet { reloadImages() } }
    var timer: Timer?
    let autoPlayInterval: TimeInterval = 3

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func autoScroll() {
        guard pageControl.numberOfPages > 0 else { return }
        let next = (pageControl.currentPage + 1) % pageControl.numberOfPages
        let offset = CGFloat(next) * scrollView.bounds.width
        scrollView.setContentOffset(CGPoint(x: offset, y: 0), animated: true)
    }

    private func setupView() {
        addSubview(scrollView)
        addSubview(pageControl)
        scrollView.delegate = self

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: trailingAnchor),
            scrollView.heightAnchor.constraint(equalToConstant: 180),
            pageControl.topAnchor.constraint(equalTo: scrollView.bottomAnchor, constant: 8),
            pageControl.centerXAnchor.constraint(equalTo: centerXAnchor),
            pageControl.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    private func reloadImages() {}
}

// MARK: - Usage
// let carousel = SocialCarouselView()
`;

const gallerySwiftCode = `import UIKit

class PhotoGalleryGridView: UIView, UICollectionViewDataSource {

    private let collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.minimumLineSpacing = 6
        layout.minimumInteritemSpacing = 6
        let collection = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collection.translatesAutoresizingMaskIntoConstraints = false
        return collection
    }()

    var images: [UIImage] = []
    let itemSpacing: CGFloat = 6
    let reuseID = "photo"

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didSelectPhoto() {}

    private func setupView() {
        addSubview(collectionView)
        collectionView.dataSource = self
        collectionView.register(UICollectionViewCell.self, forCellWithReuseIdentifier: reuseID)

        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: topAnchor),
            collectionView.leadingAnchor.constraint(equalTo: leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: trailingAnchor),
            collectionView.bottomAnchor.constraint(equalTo: bottomAnchor),
            collectionView.heightAnchor.constraint(equalToConstant: 220),
        ])
    }

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        images.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        collectionView.dequeueReusableCell(withReuseIdentifier: reuseID, for: indexPath)
    }
}

// MARK: - Usage
// let gallery = PhotoGalleryGridView()
`;

const chatSwiftCode = `import UIKit

class ChatInputToolbarView: UIView {

    private let plusButton: UIButton = {
        let button = UIButton(type: .system)
        button.setImage(UIImage(systemName: "plus.circle"), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let textField: UITextField = {
        let field = UITextField()
        field.placeholder = "Message"
        field.font = .systemFont(ofSize: 14)
        field.translatesAutoresizingMaskIntoConstraints = false
        return field
    }()

    private let sendButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Send", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    var onSend: ((String) -> Void)?
    let toolbarHeight: CGFloat = 50

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapSend() {
        guard let text = textField.text, !text.isEmpty else { return }
        onSend?(text)
        textField.text = ""
    }

    private func setupView() {
        layer.cornerRadius = 14
        backgroundColor = .secondarySystemBackground
        addSubview(plusButton)
        addSubview(textField)
        addSubview(sendButton)
        sendButton.addTarget(self, action: #selector(didTapSend), for: .touchUpInside)

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: toolbarHeight),
            plusButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 10),
            plusButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            plusButton.widthAnchor.constraint(equalToConstant: 24),
            plusButton.heightAnchor.constraint(equalToConstant: 24),
            sendButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -10),
            sendButton.centerYAnchor.constraint(equalTo: centerYAnchor),
            textField.leadingAnchor.constraint(equalTo: plusButton.trailingAnchor, constant: 8),
            textField.trailingAnchor.constraint(equalTo: sendButton.leadingAnchor, constant: -8),
            textField.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])
    }
}

// MARK: - Usage
// let toolbar = ChatInputToolbarView()
`;

const typingSwiftCode = `import UIKit

class TypingIndicatorView: UIView {

    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .horizontal
        stack.spacing = 4
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()

    private let label: UILabel = {
        let label = UILabel()
        label.text = "Typing..."
        label.font = .systemFont(ofSize: 12, weight: .regular)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    var dots: [UIView] = []
    let dotSize: CGFloat = 6

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func startAnimating() {
        for (index, dot) in dots.enumerated() {
            let delay = Double(index) * 0.15
            UIView.animate(
                withDuration: 0.35,
                delay: delay,
                options: [.repeat, .autoreverse],
                animations: {
                    dot.alpha = 0.3
                    dot.transform = CGAffineTransform(translationX: 0, y: -2)
                }
            )
        }
    }

    private func setupView() {
        addSubview(stackView)
        addSubview(label)

        for _ in 0..<3 {
            let dot = UIView()
            dot.backgroundColor = .systemGray
            dot.layer.cornerRadius = dotSize / 2
            dot.translatesAutoresizingMaskIntoConstraints = false
            dot.widthAnchor.constraint(equalToConstant: dotSize).isActive = true
            dot.heightAnchor.constraint(equalToConstant: dotSize).isActive = true
            dots.append(dot)
            stackView.addArrangedSubview(dot)
        }

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor),
            label.leadingAnchor.constraint(equalTo: stackView.trailingAnchor, constant: 8),
            label.centerYAnchor.constraint(equalTo: stackView.centerYAnchor),
            label.trailingAnchor.constraint(equalTo: trailingAnchor),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
        startAnimating()
    }
}

// MARK: - Usage
// let typing = TypingIndicatorView()
`;

function AvatarPreview() {
  return (
    <div className="relative h-20 w-20">
      <img src="/globe.svg" alt="avatar" className="h-full w-full rounded-full object-cover border border-neutral-300 dark:border-neutral-700" />
      <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-neutral-950 bg-emerald-500" />
    </div>
  );
}

function StoryPreview() {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="rounded-full bg-gradient-to-tr from-fuchsia-500 via-orange-500 to-yellow-400 p-[2px]">
        <img src="/globe.svg" alt="story" className="h-16 w-16 rounded-full border-2 border-white dark:border-neutral-950 object-cover" />
      </div>
      <span className="text-[11px] text-neutral-500">alex</span>
    </div>
  );
}

function ReactionPreview() {
  const [selected, setSelected] = useState<string | null>(null);
  const reactions = ["👍", "❤️", "😂", "😮", "🔥"];
  return (
    <div className="inline-flex rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1.5">
      {reactions.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => setSelected(emoji)}
          className={`rounded-full px-2 py-1 text-lg ${selected === emoji ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

function LikePreview() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(120);
  return (
    <button
      type="button"
      onClick={() => {
        setLiked((prev) => {
          setCount((c) => (prev ? c - 1 : c + 1));
          return !prev;
        });
      }}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
    >
      <span className={`transition-transform ${liked ? "scale-110 text-red-500" : "text-neutral-500"}`}>❤</span>
      <span>{count}</span>
    </button>
  );
}

function ExpandablePreview() {
  const [expanded, setExpanded] = useState(false);
  const text =
    "This is a long post preview that can expand. It keeps feed compact by default and reveals more context only when the user taps read more.";
  return (
    <p className="max-w-sm text-sm">
      {expanded ? text : `${text.slice(0, 80)}...`}{" "}
      <button type="button" onClick={() => setExpanded((p) => !p)} className="font-semibold text-blue-600">
        {expanded ? "Show less" : "Read more"}
      </button>
    </p>
  );
}

function CommentInputPreview() {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none" />
      <button type="button" className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white">Send</button>
    </div>
  );
}

function CarouselPreview() {
  const images = ["/globe.svg", "/next.svg", "/vercel.svg"];
  const [index, setIndex] = useState(0);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <img src={images[index]} alt="slide" className="h-40 w-full object-cover" />
      </div>
      <div className="flex justify-center gap-2">
        {images.map((_, i) => (
          <button key={i} type="button" onClick={() => setIndex(i)} className={`h-2.5 rounded-full ${i === index ? "w-6 bg-blue-500" : "w-2.5 bg-neutral-300 dark:bg-neutral-700"}`} />
        ))}
      </div>
    </div>
  );
}

function GalleryPreview() {
  return (
    <div className="grid w-full max-w-sm grid-cols-3 gap-1.5">
      {["/globe.svg", "/next.svg", "/vercel.svg", "/file.svg", "/window.svg", "/next.svg"].map((src, i) => (
        <img key={i} src={src} alt={`item-${i}`} className="aspect-square rounded object-cover bg-neutral-200 dark:bg-neutral-800" />
      ))}
    </div>
  );
}

function ChatToolbarPreview() {
  const [message, setMessage] = useState("");
  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2">
      <button type="button" className="px-2 text-lg text-neutral-500">＋</button>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm outline-none" />
      <button type="button" className="rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white">Send</button>
    </div>
  );
}

function TypingPreview() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-xs">
      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:120ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:240ms]" />
      Typing...
    </div>
  );
}

const socialStyles = [
  { title: "Avatar View (Status Badge)", swiftCode: avatarSwiftCode, preview: <AvatarPreview /> },
  { title: "Story Circle (Instagram Style)", swiftCode: storySwiftCode, preview: <StoryPreview /> },
  { title: "Reaction Picker", swiftCode: reactionSwiftCode, preview: <ReactionPreview /> },
  { title: "Like Button Animated", swiftCode: likeSwiftCode, preview: <LikePreview /> },
  { title: "Expandable Text (Read More)", swiftCode: readMoreSwiftCode, preview: <ExpandablePreview /> },
  { title: "Comment Input Bar", swiftCode: commentSwiftCode, preview: <CommentInputPreview /> },
  { title: "Image Carousel (Improved)", swiftCode: carouselSwiftCode, preview: <CarouselPreview /> },
  { title: "Photo Gallery Grid", swiftCode: gallerySwiftCode, preview: <GalleryPreview /> },
  { title: "Chat Input Toolbar", swiftCode: chatSwiftCode, preview: <ChatToolbarPreview /> },
  { title: "Typing Indicator", swiftCode: typingSwiftCode, preview: <TypingPreview /> },
];

export default function SocialModernUIKit() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Social Modern UIKit</h2>
        <p className="text-neutral-500 mt-1">
          High-demand social app components with UIKit implementations.
        </p>
      </div>
      <div className="space-y-4">
        {socialStyles.map((style) => (
          <CodePreview
            key={style.title}
            title={style.title}
            description="UIKit implementation + usage."
            preview={style.preview}
            swiftCode={style.swiftCode}
          />
        ))}
      </div>
    </div>
  );
}
