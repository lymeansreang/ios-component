"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import CodePreview from "@/components/ui/CodePreview";

function ImagePickerCameraPreview() {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imageURL?.startsWith("blob:")) URL.revokeObjectURL(imageURL);
    };
  }, [imageURL]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextURL = URL.createObjectURL(file);
    setImageURL((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return nextURL;
    });
  };

  return (
    <div className="w-72 space-y-3">
      <div className="h-40 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600 bg-neutral-100 dark:bg-neutral-900">
        {imageURL ? (
          <Image
            src={imageURL}
            alt="Picked media"
            width={288}
            height={160}
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">
            No image selected
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <label className="cursor-pointer rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white">
          Pick Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        <label className="cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200">
          Open Camera
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
}

function PhotoViewerPreview() {
  const images = ["/globe.svg", "/next.svg", "/vercel.svg"];
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const previous = () => {
    setZoom(1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const next = () => {
    setZoom(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-72 space-y-3">
      <div
        className="relative h-44 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
          const delta = endX - touchStartX.current;
          touchStartX.current = null;
          if (delta > 40) previous();
          if (delta < -40) next();
        }}
      >
        <Image
          src={images[index]}
          alt={`Gallery item ${index + 1}`}
          width={288}
          height={176}
          unoptimized
          className="h-full w-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={previous}
          className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs"
        >
          Prev
        </button>
        <span className="text-xs text-neutral-500">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={next}
          className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs"
        >
          Next
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-neutral-500">Zoom</p>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

function VideoPlayerWrapperPreview() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600 bg-black">
      <video
        controls
        preload="metadata"
        className="h-44 w-full object-cover"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </div>
  );
}

function AudioPlayerMiniBarPreview() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
    }
  };

  return (
    <div className="w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-950 p-3 space-y-2">
      <audio
        ref={audioRef}
        preload="metadata"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
      />
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Now Playing</p>
        <button
          type="button"
          onClick={toggle}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <input
        type="range"
        min={0}
        max={duration || 1}
        step={0.1}
        value={Math.min(current, duration || 1)}
        onChange={(event) => {
          const next = Number(event.target.value);
          const audio = audioRef.current;
          if (!audio) return;
          audio.currentTime = next;
          setCurrent(next);
        }}
        className="w-full"
      />
    </div>
  );
}

function AvatarStatusPreview() {
  const [status, setStatus] = useState<"online" | "busy" | "offline">("online");
  const [avatarURL, setAvatarURL] = useState("/globe.svg");

  const statusColor =
    status === "online"
      ? "bg-emerald-500"
      : status === "busy"
      ? "bg-amber-500"
      : "bg-neutral-400";

  return (
    <div className="w-72 space-y-3">
      <div className="relative w-fit">
        <Image
          src={avatarURL}
          alt="Profile"
          width={80}
          height={80}
          unoptimized
          className="h-20 w-20 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
        />
        <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${statusColor}`} />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setStatus("online")}
          className="rounded-md border px-2 py-1 text-xs"
        >
          Online
        </button>
        <button
          type="button"
          onClick={() => setStatus("busy")}
          className="rounded-md border px-2 py-1 text-xs"
        >
          Busy
        </button>
        <button
          type="button"
          onClick={() => setStatus("offline")}
          className="rounded-md border px-2 py-1 text-xs"
        >
          Offline
        </button>
      </div>
      <label className="inline-block cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs">
        Change Avatar
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const nextURL = URL.createObjectURL(file);
            setAvatarURL(nextURL);
          }}
        />
      </label>
    </div>
  );
}

const mediaStyles = [
  {
    title: "Image Picker + Camera",
    description: "Select image from library or open camera capture flow.",
    preview: <ImagePickerCameraPreview />,
    swiftCode: `import UIKit

class MediaPickerView: UIView, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    private let previewImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 12
        imageView.backgroundColor = .secondarySystemBackground
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()

    private let pickButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Pick Photo", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let cameraButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Open Camera", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    weak var hostViewController: UIViewController?
    var placeholderImage: UIImage? = nil {
        didSet { previewImageView.image = placeholderImage }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapPick() {
        presentPicker(source: .photoLibrary)
    }

    @objc private func didTapCamera() {
        guard UIImagePickerController.isSourceTypeAvailable(.camera) else { return }
        presentPicker(source: .camera)
    }

    private func presentPicker(source: UIImagePickerController.SourceType) {
        guard let host = hostViewController else { return }
        let picker = UIImagePickerController()
        picker.sourceType = source
        picker.delegate = self
        host.present(picker, animated: true)
    }

    private func setupView() {
        addSubview(previewImageView)
        addSubview(pickButton)
        addSubview(cameraButton)

        pickButton.addTarget(self, action: #selector(didTapPick), for: .touchUpInside)
        cameraButton.addTarget(self, action: #selector(didTapCamera), for: .touchUpInside)

        NSLayoutConstraint.activate([
            previewImageView.topAnchor.constraint(equalTo: topAnchor),
            previewImageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            previewImageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            previewImageView.heightAnchor.constraint(equalToConstant: 180),

            pickButton.topAnchor.constraint(equalTo: previewImageView.bottomAnchor, constant: 10),
            pickButton.leadingAnchor.constraint(equalTo: leadingAnchor),

            cameraButton.topAnchor.constraint(equalTo: previewImageView.bottomAnchor, constant: 10),
            cameraButton.leadingAnchor.constraint(equalTo: pickButton.trailingAnchor, constant: 12),
            cameraButton.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let mediaPicker = MediaPickerView()
// mediaPicker.hostViewController = self
// view.addSubview(mediaPicker)
// mediaPicker.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     mediaPicker.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     mediaPicker.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     mediaPicker.widthAnchor.constraint(equalToConstant: 280),
// ])
`,
  },
  {
    title: "Photo Viewer (Zoom + Swipe Gallery)",
    description: "Swipe between photos and pinch to zoom with UIScrollView.",
    preview: <PhotoViewerPreview />,
    swiftCode: `import UIKit

class PhotoViewerGalleryView: UIView, UIScrollViewDelegate {

    private let scrollView: UIScrollView = {
        let scroll = UIScrollView()
        scroll.minimumZoomScale = 1
        scroll.maximumZoomScale = 3
        scroll.translatesAutoresizingMaskIntoConstraints = false
        return scroll
    }()

    private let imageView: UIImageView = {
        let view = UIImageView()
        view.contentMode = .scaleAspectFit
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let pageControl: UIPageControl = {
        let control = UIPageControl()
        control.translatesAutoresizingMaskIntoConstraints = false
        return control
    }()

    var images: [UIImage] = [] {
        didSet {
            pageControl.numberOfPages = images.count
            currentIndex = 0
            updateImage()
        }
    }

    var currentIndex = 0
    let swipeLeft = UISwipeGestureRecognizer()
    let swipeRight = UISwipeGestureRecognizer()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didSwipeLeft() {
        guard !images.isEmpty else { return }
        currentIndex = (currentIndex + 1) % images.count
        updateImage()
    }

    @objc private func didSwipeRight() {
        guard !images.isEmpty else { return }
        currentIndex = (currentIndex - 1 + images.count) % images.count
        updateImage()
    }

    private func updateImage() {
        imageView.image = images.isEmpty ? nil : images[currentIndex]
        pageControl.currentPage = currentIndex
        scrollView.setZoomScale(1, animated: false)
    }

    private func setupView() {
        addSubview(scrollView)
        addSubview(pageControl)
        scrollView.addSubview(imageView)
        scrollView.delegate = self

        swipeLeft.direction = .left
        swipeLeft.addTarget(self, action: #selector(didSwipeLeft))
        addGestureRecognizer(swipeLeft)

        swipeRight.direction = .right
        swipeRight.addTarget(self, action: #selector(didSwipeRight))
        addGestureRecognizer(swipeRight)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: trailingAnchor),
            scrollView.heightAnchor.constraint(equalToConstant: 220),

            imageView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            imageView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            imageView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            imageView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            imageView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),
            imageView.heightAnchor.constraint(equalTo: scrollView.heightAnchor),

            pageControl.topAnchor.constraint(equalTo: scrollView.bottomAnchor, constant: 8),
            pageControl.centerXAnchor.constraint(equalTo: centerXAnchor),
            pageControl.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        imageView
    }
}

// MARK: - Usage
// let viewer = PhotoViewerGalleryView()
// viewer.images = [UIImage(named: "photo1"), UIImage(named: "photo2")].compactMap { $0 }
// view.addSubview(viewer)
// viewer.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     viewer.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     viewer.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     viewer.widthAnchor.constraint(equalToConstant: 320),
// ])
`,
  },
  {
    title: "Video Player Wrapper (AVPlayer)",
    description: "Reusable AVPlayer container with play/pause controls.",
    preview: <VideoPlayerWrapperPreview />,
    swiftCode: `import UIKit
import AVFoundation

class VideoPlayerWrapperView: UIView {

    private let playerContainerView: UIView = {
        let view = UIView()
        view.backgroundColor = .black
        view.layer.cornerRadius = 12
        view.clipsToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let playPauseButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Play", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let player = AVPlayer()
    private let playerLayer = AVPlayerLayer()
    var videoURL: URL? {
        didSet {
            guard let videoURL else { return }
            player.replaceCurrentItem(with: AVPlayerItem(url: videoURL))
        }
    }

    var isPlaying = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        playerLayer.frame = playerContainerView.bounds
    }

    @objc private func didTapPlayPause() {
        if isPlaying {
            player.pause()
            playPauseButton.setTitle("Play", for: .normal)
        } else {
            player.play()
            playPauseButton.setTitle("Pause", for: .normal)
        }
        isPlaying.toggle()
    }

    private func setupView() {
        addSubview(playerContainerView)
        addSubview(playPauseButton)

        playerLayer.player = player
        playerLayer.videoGravity = .resizeAspectFill
        playerContainerView.layer.addSublayer(playerLayer)
        playPauseButton.addTarget(self, action: #selector(didTapPlayPause), for: .touchUpInside)

        NSLayoutConstraint.activate([
            playerContainerView.topAnchor.constraint(equalTo: topAnchor),
            playerContainerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            playerContainerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            playerContainerView.heightAnchor.constraint(equalToConstant: 200),

            playPauseButton.topAnchor.constraint(equalTo: playerContainerView.bottomAnchor, constant: 10),
            playPauseButton.centerXAnchor.constraint(equalTo: centerXAnchor),
            playPauseButton.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let videoView = VideoPlayerWrapperView()
// videoView.videoURL = URL(string: "https://example.com/video.mp4")
// view.addSubview(videoView)
// videoView.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     videoView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     videoView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     videoView.widthAnchor.constraint(equalToConstant: 320),
// ])
`,
  },
  {
    title: "Audio Player Mini Bar",
    description: "Compact mini player using AVPlayer for audio playback.",
    preview: <AudioPlayerMiniBarPreview />,
    swiftCode: `import UIKit
import AVFoundation

class AudioMiniBarView: UIView {

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Now Playing"
        label.font = .systemFont(ofSize: 14, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let playPauseButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Play", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let progressView: UIProgressView = {
        let view = UIProgressView(progressViewStyle: .default)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let player = AVPlayer()
    private var timeObserverToken: Any?
    var audioURL: URL? {
        didSet {
            guard let audioURL else { return }
            player.replaceCurrentItem(with: AVPlayerItem(url: audioURL))
        }
    }

    var isPlaying = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapPlayPause() {
        if isPlaying {
            player.pause()
            playPauseButton.setTitle("Play", for: .normal)
        } else {
            player.play()
            playPauseButton.setTitle("Pause", for: .normal)
        }
        isPlaying.toggle()
    }

    private func setupView() {
        layer.cornerRadius = 12
        backgroundColor = .secondarySystemBackground

        addSubview(titleLabel)
        addSubview(playPauseButton)
        addSubview(progressView)

        playPauseButton.addTarget(self, action: #selector(didTapPlayPause), for: .touchUpInside)

        timeObserverToken = player.addPeriodicTimeObserver(
            forInterval: CMTime(seconds: 0.3, preferredTimescale: CMTimeScale(NSEC_PER_SEC)),
            queue: .main
        ) { [weak self] time in
            guard
                let self,
                let duration = self.player.currentItem?.duration.seconds,
                duration > 0
            else { return }
            self.progressView.progress = Float(time.seconds / duration)
        }

        NSLayoutConstraint.activate([
            heightAnchor.constraint(equalToConstant: 72),

            titleLabel.topAnchor.constraint(equalTo: topAnchor, constant: 12),
            titleLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),

            playPauseButton.centerYAnchor.constraint(equalTo: titleLabel.centerYAnchor),
            playPauseButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),

            progressView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 12),
            progressView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -12),
            progressView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -14),
        ])
    }
}

// MARK: - Usage
// let audioBar = AudioMiniBarView()
// audioBar.audioURL = URL(string: "https://example.com/audio.mp3")
// view.addSubview(audioBar)
// audioBar.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     audioBar.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     audioBar.centerYAnchor.constraint(equalTo: view.centerYAnchor),
//     audioBar.widthAnchor.constraint(equalToConstant: 320),
// ])
`,
  },
  {
    title: "Avatar / Profile Image + Status Badge",
    description: "Profile avatar with configurable online/offline status indicator.",
    preview: <AvatarStatusPreview />,
    swiftCode: `import UIKit

class AvatarStatusView: UIView {

    private let imageView: UIImageView = {
        let view = UIImageView()
        view.contentMode = .scaleAspectFill
        view.clipsToBounds = true
        view.layer.cornerRadius = 28
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let statusBadgeView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 7
        view.layer.borderWidth = 2
        view.layer.borderColor = UIColor.white.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    var avatarImage: UIImage? {
        didSet { imageView.image = avatarImage }
    }

    var statusColor: UIColor = .systemGreen {
        didSet { statusBadgeView.backgroundColor = statusColor }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    @objc private func didTapAvatar() {
        print("Avatar tapped")
    }

    private func setupView() {
        addSubview(imageView)
        addSubview(statusBadgeView)

        let tap = UITapGestureRecognizer(target: self, action: #selector(didTapAvatar))
        addGestureRecognizer(tap)
        isUserInteractionEnabled = true
        statusBadgeView.backgroundColor = statusColor

        NSLayoutConstraint.activate([
            imageView.topAnchor.constraint(equalTo: topAnchor),
            imageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 56),
            imageView.heightAnchor.constraint(equalToConstant: 56),
            imageView.bottomAnchor.constraint(equalTo: bottomAnchor),

            statusBadgeView.widthAnchor.constraint(equalToConstant: 14),
            statusBadgeView.heightAnchor.constraint(equalToConstant: 14),
            statusBadgeView.trailingAnchor.constraint(equalTo: imageView.trailingAnchor),
            statusBadgeView.bottomAnchor.constraint(equalTo: imageView.bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let avatarView = AvatarStatusView()
// avatarView.avatarImage = UIImage(named: "profile")
// avatarView.statusColor = .systemGreen
// view.addSubview(avatarView)
// avatarView.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     avatarView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     avatarView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
];

export default function Media() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Media</h2>
        <p className="text-neutral-500 mt-1">
          Media inputs and players for iOS-style interfaces.
        </p>
      </div>
      <div className="space-y-4">
        {mediaStyles.map((style) => (
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
