"use client";

import { useState } from "react";
import CodePreview from "@/components/ui/CodePreview";

// ─── Variant 1: Notification Card ───────────────────────────────────

function NotificationCardPreview() {
  const notifications = [
    {
      id: "1",
      app: "Messages",
      appIcon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      iconBg: "bg-green-500",
      title: "Sarah Wilson",
      body: "Hey! Are you coming to the party tonight? Let me know 🎉",
      time: "2m ago",
    },
    {
      id: "2",
      app: "Mail",
      appIcon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      iconBg: "bg-blue-500",
      title: "Weekly Report Ready",
      body: "Your team's weekly performance report is now available to review.",
      time: "15m ago",
    },
    {
      id: "3",
      app: "Reminders",
      appIcon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      iconBg: "bg-orange-500",
      title: "Team Standup",
      body: "Daily standup meeting starts in 10 minutes.",
      time: "28m ago",
    },
  ];

  return (
    <div className="w-[340px] space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl p-4 shadow-sm border border-neutral-200/60 dark:border-neutral-700/60"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div
              className={`w-8 h-8 rounded-lg ${n.iconBg} flex items-center justify-center shrink-0`}
            >
              {n.appIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">
                  {n.app}
                </p>
                <p className="text-[11px] text-neutral-400">{n.time}</p>
              </div>
              <p className="text-[15px] font-semibold text-neutral-900 dark:text-white leading-tight">
                {n.title}
              </p>
            </div>
          </div>
          <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-snug pl-[42px]">
            {n.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Variant 2: Profile / Contact Card ──────────────────────────────

function ProfileCardPreview() {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="w-[320px]">
      <div className="rounded-2xl bg-white dark:bg-neutral-800 overflow-hidden shadow-sm border border-neutral-200/60 dark:border-neutral-700/60">
        {/* Cover gradient */}
        <div className="h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
          <div className="absolute -bottom-10 left-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-white dark:border-neutral-800 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">JD</span>
            </div>
          </div>
        </div>

        <div className="pt-12 px-5 pb-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-[17px] font-bold text-neutral-900 dark:text-white">
                Jane Doe
              </h3>
              <p className="text-[14px] text-neutral-500">@janedoe</p>
            </div>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                isFollowing
                  ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-snug mb-4">
            Product designer crafting delightful interfaces. Coffee enthusiast and weekend hiker.
          </p>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-[16px] font-bold text-neutral-900 dark:text-white">
                2.4k
              </p>
              <p className="text-[12px] text-neutral-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-[16px] font-bold text-neutral-900 dark:text-white">
                891
              </p>
              <p className="text-[12px] text-neutral-500">Following</p>
            </div>
            <div className="text-center">
              <p className="text-[16px] font-bold text-neutral-900 dark:text-white">
                147
              </p>
              <p className="text-[12px] text-neutral-500">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Variant 3: Music / Now Playing Card ────────────────────────────

function NowPlayingCardPreview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress] = useState(65);

  return (
    <div className="w-[320px]">
      <div className="rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden shadow-lg border border-neutral-800">
        {/* Album art area */}
        <div className="p-5 pb-3">
          <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 flex items-center justify-center mb-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>

          {/* Song info */}
          <div className="mb-4">
            <h3 className="text-[17px] font-bold text-white leading-tight">
              Midnight Reverie
            </h3>
            <p className="text-[15px] text-neutral-400 mt-0.5">
              Lunar Echoes
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-2">
            <div className="w-full h-1 rounded-full bg-neutral-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/90 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-neutral-500">2:10</span>
              <span className="text-[11px] text-neutral-500">3:24</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8">
            <button className="text-neutral-400 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 20L9 12l10-8v16zM7 19H5V5h2v14z" />
              </svg>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              )}
            </button>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 4l10 8-10 8V4zM17 5h2v14h-2V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Swift Code Strings ─────────────────────────────────────────────

const notificationCardSwift = `import UIKit

// MARK: - Notification Card View
class NotificationCardView: UIView {

    struct NotificationData {
        let appName: String
        let appIcon: UIImage?
        let iconColor: UIColor
        let title: String
        let body: String
        let time: String
    }

    private let iconContainer: UIView = {
        let v = UIView()
        v.layer.cornerRadius = 8
        v.clipsToBounds = true
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()

    private let iconImageView: UIImageView = {
        let iv = UIImageView()
        iv.tintColor = .white
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let appLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 11, weight: .semibold)
        l.textColor = .tertiaryLabel
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let timeLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 11)
        l.textColor = .tertiaryLabel
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let titleLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 15, weight: .semibold)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let bodyLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14)
        l.textColor = .secondaryLabel
        l.numberOfLines = 2
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
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
        backgroundColor = .secondarySystemGroupedBackground
        layer.cornerRadius = 16
        clipsToBounds = true

        // Add blur effect
        let blur = UIVisualEffectView(effect: UIBlurEffect(style: .systemMaterial))
        blur.translatesAutoresizingMaskIntoConstraints = false
        addSubview(blur)

        [iconContainer, appLabel, timeLabel, titleLabel, bodyLabel].forEach { addSubview($0) }
        iconContainer.addSubview(iconImageView)

        NSLayoutConstraint.activate([
            blur.topAnchor.constraint(equalTo: topAnchor),
            blur.bottomAnchor.constraint(equalTo: bottomAnchor),
            blur.leadingAnchor.constraint(equalTo: leadingAnchor),
            blur.trailingAnchor.constraint(equalTo: trailingAnchor),

            iconContainer.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            iconContainer.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            iconContainer.widthAnchor.constraint(equalToConstant: 32),
            iconContainer.heightAnchor.constraint(equalToConstant: 32),

            iconImageView.centerXAnchor.constraint(equalTo: iconContainer.centerXAnchor),
            iconImageView.centerYAnchor.constraint(equalTo: iconContainer.centerYAnchor),
            iconImageView.widthAnchor.constraint(equalToConstant: 16),
            iconImageView.heightAnchor.constraint(equalToConstant: 16),

            appLabel.topAnchor.constraint(equalTo: iconContainer.topAnchor),
            appLabel.leadingAnchor.constraint(equalTo: iconContainer.trailingAnchor, constant: 10),

            timeLabel.centerYAnchor.constraint(equalTo: appLabel.centerYAnchor),
            timeLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),

            titleLabel.topAnchor.constraint(equalTo: appLabel.bottomAnchor, constant: 2),
            titleLabel.leadingAnchor.constraint(equalTo: appLabel.leadingAnchor),
            titleLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),

            bodyLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            bodyLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 58),
            bodyLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            bodyLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16),
        ])
    }

    func configure(with data: NotificationData) {
        iconContainer.backgroundColor = data.iconColor
        iconImageView.image = data.appIcon
        appLabel.text = data.appName.uppercased()
        timeLabel.text = data.time
        titleLabel.text = data.title
        bodyLabel.text = data.body
    }
}

// MARK: - Usage
// let card = NotificationCardView()
// card.configure(with: NotificationData(
//     appName: "Messages",
//     appIcon: UIImage(systemName: "message.fill"),
//     iconColor: .systemGreen,
//     title: "Sarah Wilson",
//     body: "Hey! Are you coming to the party tonight?",
//     time: "2m ago"
// ))`;

const profileCardSwift = `import UIKit

// MARK: - Profile Card View
class ProfileCardView: UIView {

    var onFollowToggle: ((Bool) -> Void)?

    private var isFollowing = false

    private let coverView: UIView = {
        let v = UIView()
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()

    private let avatarView: UIView = {
        let v = UIView()
        v.layer.cornerRadius = 40
        v.clipsToBounds = true
        v.layer.borderWidth = 4
        v.layer.borderColor = UIColor.systemBackground.cgColor
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()

    private let avatarLabel: UILabel = {
        let l = UILabel()
        l.font = .boldSystemFont(ofSize: 24)
        l.textColor = .white
        l.textAlignment = .center
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let nameLabel: UILabel = {
        let l = UILabel()
        l.font = .boldSystemFont(ofSize: 17)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let handleLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14)
        l.textColor = .secondaryLabel
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let bioLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 14)
        l.textColor = .secondaryLabel
        l.numberOfLines = 0
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let followButton: UIButton = {
        let b = UIButton(type: .system)
        b.titleLabel?.font = .systemFont(ofSize: 13, weight: .semibold)
        b.layer.cornerRadius = 16
        b.clipsToBounds = true
        b.translatesAutoresizingMaskIntoConstraints = false
        return b
    }()

    private let statsStack: UIStackView = {
        let s = UIStackView()
        s.axis = .horizontal
        s.spacing = 24
        s.translatesAutoresizingMaskIntoConstraints = false
        return s
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        updateFollowButton()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        updateFollowButton()
    }

    private func setupView() {
        backgroundColor = .secondarySystemGroupedBackground
        layer.cornerRadius = 16
        clipsToBounds = true

        addSubview(coverView)
        addSubview(avatarView)
        avatarView.addSubview(avatarLabel)
        addSubview(nameLabel)
        addSubview(handleLabel)
        addSubview(followButton)
        addSubview(bioLabel)
        addSubview(statsStack)

        // Add gradient to cover
        let gradient = CAGradientLayer()
        gradient.colors = [UIColor.systemBlue.cgColor, UIColor.systemPurple.cgColor, UIColor.systemPink.cgColor]
        gradient.startPoint = CGPoint(x: 0, y: 0)
        gradient.endPoint = CGPoint(x: 1, y: 1)
        coverView.layer.addSublayer(gradient)

        avatarView.backgroundColor = .systemPurple
        avatarLabel.text = "JD"

        followButton.addTarget(self, action: #selector(followTapped), for: .touchUpInside)

        // Stats
        for (value, label) in [("2.4k", "Followers"), ("891", "Following"), ("147", "Posts")] {
            let stat = createStatView(value: value, label: label)
            statsStack.addArrangedSubview(stat)
        }

        NSLayoutConstraint.activate([
            coverView.topAnchor.constraint(equalTo: topAnchor),
            coverView.leadingAnchor.constraint(equalTo: leadingAnchor),
            coverView.trailingAnchor.constraint(equalTo: trailingAnchor),
            coverView.heightAnchor.constraint(equalToConstant: 96),

            avatarView.topAnchor.constraint(equalTo: coverView.bottomAnchor, constant: -40),
            avatarView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            avatarView.widthAnchor.constraint(equalToConstant: 80),
            avatarView.heightAnchor.constraint(equalToConstant: 80),

            avatarLabel.centerXAnchor.constraint(equalTo: avatarView.centerXAnchor),
            avatarLabel.centerYAnchor.constraint(equalTo: avatarView.centerYAnchor),

            nameLabel.topAnchor.constraint(equalTo: avatarView.bottomAnchor, constant: 8),
            nameLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),

            handleLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 2),
            handleLabel.leadingAnchor.constraint(equalTo: nameLabel.leadingAnchor),

            followButton.centerYAnchor.constraint(equalTo: nameLabel.centerYAnchor),
            followButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),
            followButton.widthAnchor.constraint(equalToConstant: 90),
            followButton.heightAnchor.constraint(equalToConstant: 32),

            bioLabel.topAnchor.constraint(equalTo: handleLabel.bottomAnchor, constant: 12),
            bioLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            bioLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),

            statsStack.topAnchor.constraint(equalTo: bioLabel.bottomAnchor, constant: 16),
            statsStack.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            statsStack.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -20),
        ])
    }

    private func createStatView(value: String, label: String) -> UIView {
        let container = UIView()
        let valueLabel = UILabel()
        valueLabel.text = value
        valueLabel.font = .boldSystemFont(ofSize: 16)
        valueLabel.translatesAutoresizingMaskIntoConstraints = false

        let titleLabel = UILabel()
        titleLabel.text = label
        titleLabel.font = .systemFont(ofSize: 12)
        titleLabel.textColor = .secondaryLabel
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        container.addSubview(valueLabel)
        container.addSubview(titleLabel)

        NSLayoutConstraint.activate([
            valueLabel.topAnchor.constraint(equalTo: container.topAnchor),
            valueLabel.centerXAnchor.constraint(equalTo: container.centerXAnchor),
            titleLabel.topAnchor.constraint(equalTo: valueLabel.bottomAnchor, constant: 2),
            titleLabel.centerXAnchor.constraint(equalTo: container.centerXAnchor),
            titleLabel.bottomAnchor.constraint(equalTo: container.bottomAnchor),
        ])
        return container
    }

    @objc private func followTapped() {
        isFollowing.toggle()
        updateFollowButton()
        onFollowToggle?(isFollowing)
    }

    private func updateFollowButton() {
        if isFollowing {
            followButton.setTitle("Following", for: .normal)
            followButton.backgroundColor = .systemGray5
            followButton.setTitleColor(.label, for: .normal)
        } else {
            followButton.setTitle("Follow", for: .normal)
            followButton.backgroundColor = .systemBlue
            followButton.setTitleColor(.white, for: .normal)
        }
    }

    func configure(name: String, handle: String, bio: String, initials: String) {
        nameLabel.text = name
        handleLabel.text = handle
        bioLabel.text = bio
        avatarLabel.text = initials
    }
}

// MARK: - Usage
// let card = ProfileCardView()
// card.configure(name: "Jane Doe", handle: "@janedoe",
//     bio: "Product designer crafting delightful interfaces.",
//     initials: "JD")`;

const nowPlayingCardSwift = `import UIKit

// MARK: - Now Playing Card View
class NowPlayingCardView: UIView {

    var onPlayPause: ((Bool) -> Void)?
    var onNext: (() -> Void)?
    var onPrevious: (() -> Void)?

    private var isPlaying = true

    private let albumArt: UIView = {
        let v = UIView()
        v.layer.cornerRadius = 12
        v.clipsToBounds = true
        v.translatesAutoresizingMaskIntoConstraints = false
        return v
    }()

    private let musicIconView: UIImageView = {
        let iv = UIImageView(image: UIImage(systemName: "music.note"))
        iv.tintColor = UIColor.white.withAlphaComponent(0.6)
        iv.contentMode = .scaleAspectFit
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()

    private let titleLabel: UILabel = {
        let l = UILabel()
        l.font = .boldSystemFont(ofSize: 17)
        l.textColor = .white
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let artistLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 15)
        l.textColor = UIColor.white.withAlphaComponent(0.6)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let progressBar: UIProgressView = {
        let p = UIProgressView(progressViewStyle: .default)
        p.trackTintColor = UIColor.white.withAlphaComponent(0.2)
        p.progressTintColor = UIColor.white.withAlphaComponent(0.9)
        p.translatesAutoresizingMaskIntoConstraints = false
        return p
    }()

    private let currentTimeLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 11)
        l.textColor = UIColor.white.withAlphaComponent(0.5)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let durationLabel: UILabel = {
        let l = UILabel()
        l.font = .systemFont(ofSize: 11)
        l.textColor = UIColor.white.withAlphaComponent(0.5)
        l.translatesAutoresizingMaskIntoConstraints = false
        return l
    }()

    private let prevButton: UIButton = {
        let b = UIButton(type: .system)
        b.setImage(UIImage(systemName: "backward.end.fill", withConfiguration:
            UIImage.SymbolConfiguration(pointSize: 22)), for: .normal)
        b.tintColor = UIColor.white.withAlphaComponent(0.6)
        b.translatesAutoresizingMaskIntoConstraints = false
        return b
    }()

    private let playPauseButton: UIButton = {
        let b = UIButton(type: .system)
        b.backgroundColor = .white
        b.layer.cornerRadius = 28
        b.translatesAutoresizingMaskIntoConstraints = false
        return b
    }()

    private let nextButton: UIButton = {
        let b = UIButton(type: .system)
        b.setImage(UIImage(systemName: "forward.end.fill", withConfiguration:
            UIImage.SymbolConfiguration(pointSize: 22)), for: .normal)
        b.tintColor = UIColor.white.withAlphaComponent(0.6)
        b.translatesAutoresizingMaskIntoConstraints = false
        return b
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
        backgroundColor = UIColor(red: 0.08, green: 0.08, blue: 0.08, alpha: 1)
        layer.cornerRadius = 16
        clipsToBounds = true

        // Album art gradient
        let gradient = CAGradientLayer()
        gradient.colors = [
            UIColor.systemPink.cgColor,
            UIColor.systemPurple.cgColor,
            UIColor.systemIndigo.cgColor
        ]
        gradient.startPoint = CGPoint(x: 0, y: 0)
        gradient.endPoint = CGPoint(x: 1, y: 1)
        albumArt.layer.insertSublayer(gradient, at: 0)
        albumArt.addSubview(musicIconView)

        addSubview(albumArt)
        addSubview(titleLabel)
        addSubview(artistLabel)
        addSubview(progressBar)
        addSubview(currentTimeLabel)
        addSubview(durationLabel)
        addSubview(prevButton)
        addSubview(playPauseButton)
        addSubview(nextButton)

        prevButton.addTarget(self, action: #selector(prevTapped), for: .touchUpInside)
        playPauseButton.addTarget(self, action: #selector(playPauseTapped), for: .touchUpInside)
        nextButton.addTarget(self, action: #selector(nextTapped), for: .touchUpInside)

        updatePlayPauseIcon()

        NSLayoutConstraint.activate([
            albumArt.topAnchor.constraint(equalTo: topAnchor, constant: 20),
            albumArt.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            albumArt.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),
            albumArt.heightAnchor.constraint(equalTo: albumArt.widthAnchor),

            musicIconView.centerXAnchor.constraint(equalTo: albumArt.centerXAnchor),
            musicIconView.centerYAnchor.constraint(equalTo: albumArt.centerYAnchor),
            musicIconView.widthAnchor.constraint(equalToConstant: 64),
            musicIconView.heightAnchor.constraint(equalToConstant: 64),

            titleLabel.topAnchor.constraint(equalTo: albumArt.bottomAnchor, constant: 20),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),

            artistLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 2),
            artistLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor),

            progressBar.topAnchor.constraint(equalTo: artistLabel.bottomAnchor, constant: 16),
            progressBar.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            progressBar.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),

            currentTimeLabel.topAnchor.constraint(equalTo: progressBar.bottomAnchor, constant: 6),
            currentTimeLabel.leadingAnchor.constraint(equalTo: progressBar.leadingAnchor),

            durationLabel.topAnchor.constraint(equalTo: progressBar.bottomAnchor, constant: 6),
            durationLabel.trailingAnchor.constraint(equalTo: progressBar.trailingAnchor),

            playPauseButton.topAnchor.constraint(equalTo: currentTimeLabel.bottomAnchor, constant: 8),
            playPauseButton.centerXAnchor.constraint(equalTo: centerXAnchor),
            playPauseButton.widthAnchor.constraint(equalToConstant: 56),
            playPauseButton.heightAnchor.constraint(equalToConstant: 56),
            playPauseButton.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -20),

            prevButton.centerYAnchor.constraint(equalTo: playPauseButton.centerYAnchor),
            prevButton.trailingAnchor.constraint(equalTo: playPauseButton.leadingAnchor, constant: -32),

            nextButton.centerYAnchor.constraint(equalTo: playPauseButton.centerYAnchor),
            nextButton.leadingAnchor.constraint(equalTo: playPauseButton.trailingAnchor, constant: 32),
        ])
    }

    private func updatePlayPauseIcon() {
        let name = isPlaying ? "pause.fill" : "play.fill"
        let config = UIImage.SymbolConfiguration(pointSize: 22)
        playPauseButton.setImage(UIImage(systemName: name, withConfiguration: config), for: .normal)
        playPauseButton.tintColor = .black
    }

    func configure(title: String, artist: String, progress: Float,
                   currentTime: String, duration: String) {
        titleLabel.text = title
        artistLabel.text = artist
        progressBar.progress = progress
        currentTimeLabel.text = currentTime
        durationLabel.text = duration
    }

    @objc private func playPauseTapped() {
        isPlaying.toggle()
        updatePlayPauseIcon()
        onPlayPause?(isPlaying)
    }

    @objc private func prevTapped() { onPrevious?() }
    @objc private func nextTapped() { onNext?() }
}

// MARK: - Usage
// let card = NowPlayingCardView()
// card.configure(title: "Midnight Reverie", artist: "Lunar Echoes",
//     progress: 0.65, currentTime: "2:10", duration: "3:24")`;

// ─── Default Export ─────────────────────────────────────────────────

export default function Card() {
  const cardStyles = [
    {
      title: "Notification Card",
      description:
        "iOS-style notification cards with blur background, app icon, title, and preview text.",
      preview: <NotificationCardPreview />,
      swiftCode: notificationCardSwift,
    },
    {
      title: "Profile Card",
      description:
        "Social profile card with cover gradient, avatar, bio, follow button, and stats.",
      preview: <ProfileCardPreview />,
      swiftCode: profileCardSwift,
    },
    {
      title: "Now Playing Card",
      description:
        "Music player card with album art, progress bar, and playback controls.",
      preview: <NowPlayingCardPreview />,
      swiftCode: nowPlayingCardSwift,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Card</h2>
        <p className="text-neutral-500 mt-1">
          Content containers with depth, gradients, and interactive elements.
        </p>
      </div>
      <div className="space-y-4">
        {cardStyles.map((style) => (
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
