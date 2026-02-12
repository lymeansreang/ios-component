"use client";

import { useRef, useState, useEffect, useCallback, type MouseEvent, type TouchEvent } from "react";
import CodePreview from "@/components/ui/CodePreview";

// ─── Shared drag hook ────────────────────────────────────────────────
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
    ref.current.style.scrollSnapType = "none";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const onMouseUp = () => {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.style.cursor = "grab";
    ref.current.style.scrollSnapType = "x mandatory";
  };

  return { onMouseDown, onMouseMove, onMouseUp, onMouseLeave: onMouseUp };
}

// ─── 1. Horizontal Card Carousel ────────────────────────────────────
function HorizontalCardPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useDragScroll(scrollRef);
  const cards = [
    { color: "bg-blue-500", title: "Explore", subtitle: "Discover new places" },
    { color: "bg-purple-500", title: "Music", subtitle: "Your top playlists" },
    { color: "bg-orange-500", title: "Photos", subtitle: "Recent memories" },
    { color: "bg-green-500", title: "Fitness", subtitle: "Weekly summary" },
  ];

  return (
    <div className="w-[320px] overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide cursor-grab select-none"
        {...drag}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${card.color} snap-center shrink-0 w-[200px] h-[130px] rounded-2xl p-4 flex flex-col justify-end`}
          >
            <p className="text-white/70 text-[13px]">{card.subtitle}</p>
            <p className="text-white text-[17px] font-semibold">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2. Full-Width Page Carousel ─────────────────────────────────────
function FullWidthPagePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const drag = useDragScroll(scrollRef);
  const pages = [
    { color: "bg-gradient-to-br from-blue-500 to-blue-600", title: "Welcome", desc: "Get started with our app" },
    { color: "bg-gradient-to-br from-purple-500 to-purple-600", title: "Discover", desc: "Find what matters to you" },
    { color: "bg-gradient-to-br from-pink-500 to-pink-600", title: "Connect", desc: "Share with your friends" },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const page = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
    setCurrentPage(page);
  };

  const goToPage = (index: number) => {
    scrollRef.current?.scrollTo({ left: index * 320, behavior: "smooth" });
    setCurrentPage(index);
  };

  return (
    <div className="w-[320px]">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide cursor-grab select-none"
          onScroll={handleScroll}
          {...drag}
        >
          {pages.map((page, i) => (
            <div
              key={i}
              className={`${page.color} snap-center shrink-0 w-[320px] h-[200px] flex flex-col items-center justify-center`}
            >
              <p className="text-white text-[22px] font-bold">{page.title}</p>
              <p className="text-white/70 text-[15px] mt-1">{page.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`rounded-full transition-all duration-300 ${
              currentPage === i
                ? "w-2 h-2 bg-blue-500"
                : "w-2 h-2 bg-neutral-300 dark:bg-neutral-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── 3. Peek Card Carousel ───────────────────────────────────────────
function PeekCardPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useDragScroll(scrollRef);
  const cards = [
    { gradient: "bg-gradient-to-br from-rose-400 to-rose-500", label: "Sunset Vibes" },
    { gradient: "bg-gradient-to-br from-sky-400 to-sky-500", label: "Ocean Breeze" },
    { gradient: "bg-gradient-to-br from-amber-400 to-amber-500", label: "Golden Hour" },
    { gradient: "bg-gradient-to-br from-emerald-400 to-emerald-500", label: "Forest Walk" },
  ];

  return (
    <div className="w-[320px] overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-3 scrollbar-hide cursor-grab select-none"
        {...drag}
      >
        {cards.map((card, i) => (
          <div key={i} className="snap-center shrink-0 w-[240px]">
            <div className={`${card.gradient} h-[160px] rounded-2xl`} />
            <p className="text-[15px] font-medium text-neutral-900 dark:text-white mt-2 px-1">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Auto-Scrolling Banner Carousel ───────────────────────────────
function AutoScrollBannerPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const banners = [
    { color: "bg-gradient-to-r from-indigo-500 to-blue-500", label: "Summer Sale — 50% Off", sub: "Limited time offer" },
    { color: "bg-gradient-to-r from-pink-500 to-rose-500", label: "New Arrivals", sub: "Fresh styles just dropped" },
    { color: "bg-gradient-to-r from-teal-500 to-emerald-500", label: "Free Shipping", sub: "On orders over $50" },
  ];

  const scrollToIndex = useCallback((index: number) => {
    scrollRef.current?.scrollTo({ left: index * 320, behavior: "smooth" });
    setCurrentPage(index);
  }, []);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (isPaused.current) return;
        setCurrentPage((prev) => {
          const next = (prev + 1) % banners.length;
          scrollRef.current?.scrollTo({ left: next * 320, behavior: "smooth" });
          return next;
        });
      }, 3000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const page = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
    setCurrentPage(page);
  };

  const onPointerDown = () => {
    isPaused.current = true;
  };

  const onPointerUp = () => {
    isPaused.current = false;
  };

  return (
    <div className="w-[320px]">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide cursor-grab select-none"
          onScroll={handleScroll}
          onMouseDown={onPointerDown}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchEnd={onPointerUp}
        >
          {banners.map((b, i) => (
            <div
              key={i}
              className={`${b.color} snap-center shrink-0 w-[320px] h-[140px] flex flex-col items-center justify-center`}
            >
              <p className="text-white text-[19px] font-bold">{b.label}</p>
              <p className="text-white/70 text-[14px] mt-0.5">{b.sub}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                currentPage === i
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 5. Snap Carousel with Scale Effect ──────────────────────────────
function ScaleCarouselPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { color: "bg-violet-500", label: "Featured" },
    { color: "bg-cyan-500", label: "Trending" },
    { color: "bg-rose-500", label: "Popular" },
    { color: "bg-amber-500", label: "New" },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
  };

  // Drag handling with scale awareness
  const isDragging = useRef(false);
  const startX = useRef(0);
  const sl = useRef(0);

  const onMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    sl.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.scrollSnapType = "none";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = sl.current - (x - startX.current);
  };

  const onMouseUp = () => {
    if (!scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    scrollRef.current.style.scrollSnapType = "x mandatory";
  };

  return (
    <div className="w-[320px] overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-3 items-center overflow-x-auto snap-x snap-mandatory px-[70px] py-4 scrollbar-hide cursor-grab select-none"
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${card.color} snap-center shrink-0 w-[180px] h-[120px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
              activeIndex === i
                ? "scale-100 opacity-100 shadow-lg"
                : "scale-[0.85] opacity-50"
            }`}
          >
            <p className="text-white text-[17px] font-semibold">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Style definitions (Swift code stays the same) ───────────────────
const carouselStyles = [
  {
    title: "Horizontal Card Carousel",
    description:
      "Scrollable horizontal cards with snap behavior. Supports dynamic content via a data source array.",
    preview: <HorizontalCardPreview />,
    swiftCode: `import UIKit

// MARK: - Data Model
struct CarouselItem {
    let title: String
    let subtitle: String
    let backgroundColor: UIColor
}

// MARK: - Carousel Cell
class HorizontalCarouselCell: UICollectionViewCell {

    static let reuseId = "HorizontalCarouselCell"

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .white
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let subtitleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 13)
        label.textColor = UIColor.white.withAlphaComponent(0.7)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.layer.cornerRadius = 16
        contentView.layer.masksToBounds = true
        contentView.addSubview(subtitleLabel)
        contentView.addSubview(titleLabel)

        NSLayoutConstraint.activate([
            titleLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            titleLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),
            titleLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -16),

            subtitleLabel.leadingAnchor.constraint(equalTo: titleLabel.leadingAnchor),
            subtitleLabel.trailingAnchor.constraint(equalTo: titleLabel.trailingAnchor),
            subtitleLabel.bottomAnchor.constraint(equalTo: titleLabel.topAnchor, constant: -2),
        ])
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    func configure(with item: CarouselItem) {
        titleLabel.text = item.title
        subtitleLabel.text = item.subtitle
        contentView.backgroundColor = item.backgroundColor
    }
}

// MARK: - Carousel View Controller
class HorizontalCarouselViewController: UIViewController {

    var items: [CarouselItem] = [
        CarouselItem(title: "Explore", subtitle: "Discover new places", backgroundColor: .systemBlue),
        CarouselItem(title: "Music", subtitle: "Your top playlists", backgroundColor: .systemPurple),
        CarouselItem(title: "Photos", subtitle: "Recent memories", backgroundColor: .systemOrange),
        CarouselItem(title: "Fitness", subtitle: "Weekly summary", backgroundColor: .systemGreen),
    ]

    private lazy var collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.itemSize = CGSize(width: 200, height: 130)
        layout.minimumLineSpacing = 12
        layout.sectionInset = UIEdgeInsets(top: 0, left: 20, bottom: 0, right: 20)

        let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)
        cv.showsHorizontalScrollIndicator = false
        cv.decelerationRate = .fast
        cv.backgroundColor = .clear
        cv.register(HorizontalCarouselCell.self, forCellWithReuseIdentifier: HorizontalCarouselCell.reuseId)
        cv.dataSource = self
        cv.translatesAutoresizingMaskIntoConstraints = false
        return cv
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(collectionView)

        NSLayoutConstraint.activate([
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            collectionView.heightAnchor.constraint(equalToConstant: 130),
        ])
    }

    func updateItems(_ newItems: [CarouselItem]) {
        items = newItems
        collectionView.reloadData()
    }
}

extension HorizontalCarouselViewController: UICollectionViewDataSource {
    func collectionView(_ cv: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        items.count
    }

    func collectionView(_ cv: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = cv.dequeueReusableCell(withReuseIdentifier: HorizontalCarouselCell.reuseId, for: indexPath) as! HorizontalCarouselCell
        cell.configure(with: items[indexPath.item])
        return cell
    }
}

// MARK: - Usage
// let carousel = HorizontalCarouselViewController()
// addChild(carousel)
// view.addSubview(carousel.view)
// carousel.didMove(toParent: self)
//
// carousel.updateItems([
//     CarouselItem(title: "My Card", subtitle: "Custom content", backgroundColor: .systemTeal),
// ])
`,
  },
  {
    title: "Full-Width Page Carousel",
    description:
      "Full-width paging carousel with page indicator dots. Ideal for onboarding or featured content.",
    preview: <FullWidthPagePreview />,
    swiftCode: `import UIKit

// MARK: - Data Model
struct PageItem {
    let title: String
    let description: String
    let backgroundColor: UIColor
}

// MARK: - Page Cell
class FullWidthPageCell: UICollectionViewCell {

    static let reuseId = "FullWidthPageCell"

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 22, weight: .bold)
        label.textColor = .white
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let descLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 15)
        label.textColor = UIColor.white.withAlphaComponent(0.7)
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.addSubview(titleLabel)
        contentView.addSubview(descLabel)

        NSLayoutConstraint.activate([
            titleLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor, constant: -12),
            titleLabel.leadingAnchor.constraint(greaterThanOrEqualTo: contentView.leadingAnchor, constant: 24),

            descLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 4),
            descLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            descLabel.leadingAnchor.constraint(greaterThanOrEqualTo: contentView.leadingAnchor, constant: 24),
        ])
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    func configure(with item: PageItem) {
        titleLabel.text = item.title
        descLabel.text = item.description
        contentView.backgroundColor = item.backgroundColor
    }
}

// MARK: - Full-Width Page Carousel
class FullWidthPageCarouselViewController: UIViewController {

    var pages: [PageItem] = [
        PageItem(title: "Welcome", description: "Get started with our app", backgroundColor: .systemBlue),
        PageItem(title: "Discover", description: "Find what matters to you", backgroundColor: .systemPurple),
        PageItem(title: "Connect", description: "Share with your friends", backgroundColor: .systemPink),
    ]

    private lazy var collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.minimumLineSpacing = 0

        let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)
        cv.isPagingEnabled = true
        cv.showsHorizontalScrollIndicator = false
        cv.backgroundColor = .clear
        cv.layer.cornerRadius = 16
        cv.layer.masksToBounds = true
        cv.register(FullWidthPageCell.self, forCellWithReuseIdentifier: FullWidthPageCell.reuseId)
        cv.dataSource = self
        cv.delegate = self
        cv.translatesAutoresizingMaskIntoConstraints = false
        return cv
    }()

    private let pageControl: UIPageControl = {
        let pc = UIPageControl()
        pc.currentPageIndicatorTintColor = .systemBlue
        pc.pageIndicatorTintColor = .tertiaryLabel
        pc.translatesAutoresizingMaskIntoConstraints = false
        return pc
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(collectionView)
        view.addSubview(pageControl)
        pageControl.numberOfPages = pages.count
        pageControl.addTarget(self, action: #selector(pageChanged), for: .valueChanged)

        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: view.topAnchor),
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.heightAnchor.constraint(equalToConstant: 200),

            pageControl.topAnchor.constraint(equalTo: collectionView.bottomAnchor, constant: 8),
            pageControl.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        ])
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        if let layout = collectionView.collectionViewLayout as? UICollectionViewFlowLayout {
            layout.itemSize = collectionView.bounds.size
        }
    }

    @objc private func pageChanged() {
        let index = IndexPath(item: pageControl.currentPage, section: 0)
        collectionView.scrollToItem(at: index, at: .centeredHorizontally, animated: true)
    }

    func updatePages(_ newPages: [PageItem]) {
        pages = newPages
        pageControl.numberOfPages = newPages.count
        collectionView.reloadData()
    }
}

extension FullWidthPageCarouselViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ cv: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        pages.count
    }

    func collectionView(_ cv: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = cv.dequeueReusableCell(withReuseIdentifier: FullWidthPageCell.reuseId, for: indexPath) as! FullWidthPageCell
        cell.configure(with: pages[indexPath.item])
        return cell
    }

    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let page = Int(scrollView.contentOffset.x / scrollView.bounds.width)
        pageControl.currentPage = page
    }
}

// MARK: - Usage
// let pageCarousel = FullWidthPageCarouselViewController()
// addChild(pageCarousel)
// view.addSubview(pageCarousel.view)
// pageCarousel.didMove(toParent: self)
//
// pageCarousel.updatePages([
//     PageItem(title: "Step 1", description: "Create account", backgroundColor: .systemIndigo),
// ])
`,
  },
  {
    title: "Peek Card Carousel",
    description:
      "Cards with visible edges of adjacent items for a peek effect. Great for featured content browsing.",
    preview: <PeekCardPreview />,
    swiftCode: `import UIKit

// MARK: - Data Model
struct PeekCardItem {
    let title: String
    let backgroundColor: UIColor
}

// MARK: - Peek Card Cell
class PeekCardCell: UICollectionViewCell {

    static let reuseId = "PeekCardCell"

    private let cardView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 16
        view.layer.masksToBounds = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 15, weight: .medium)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.addSubview(cardView)
        contentView.addSubview(titleLabel)

        NSLayoutConstraint.activate([
            cardView.topAnchor.constraint(equalTo: contentView.topAnchor),
            cardView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            cardView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            cardView.heightAnchor.constraint(equalToConstant: 160),

            titleLabel.topAnchor.constraint(equalTo: cardView.bottomAnchor, constant: 8),
            titleLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 4),
            titleLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -4),
        ])
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    func configure(with item: PeekCardItem) {
        titleLabel.text = item.title
        cardView.backgroundColor = item.backgroundColor
    }
}

// MARK: - Peek Card Carousel
class PeekCardCarouselViewController: UIViewController {

    var items: [PeekCardItem] = [
        PeekCardItem(title: "Sunset Vibes", backgroundColor: .systemPink),
        PeekCardItem(title: "Ocean Breeze", backgroundColor: .systemCyan),
        PeekCardItem(title: "Golden Hour", backgroundColor: .systemOrange),
        PeekCardItem(title: "Forest Walk", backgroundColor: .systemGreen),
    ]

    private let cellWidth: CGFloat = 240
    private let cellSpacing: CGFloat = 12
    private let peekInset: CGFloat = 24

    private lazy var collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.itemSize = CGSize(width: cellWidth, height: 190)
        layout.minimumLineSpacing = cellSpacing
        layout.sectionInset = UIEdgeInsets(top: 0, left: peekInset, bottom: 0, right: peekInset)

        let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)
        cv.showsHorizontalScrollIndicator = false
        cv.decelerationRate = .fast
        cv.backgroundColor = .clear
        cv.register(PeekCardCell.self, forCellWithReuseIdentifier: PeekCardCell.reuseId)
        cv.dataSource = self
        cv.translatesAutoresizingMaskIntoConstraints = false
        return cv
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(collectionView)

        NSLayoutConstraint.activate([
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            collectionView.heightAnchor.constraint(equalToConstant: 190),
        ])
    }

    func updateItems(_ newItems: [PeekCardItem]) {
        items = newItems
        collectionView.reloadData()
    }
}

extension PeekCardCarouselViewController: UICollectionViewDataSource {
    func collectionView(_ cv: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        items.count
    }

    func collectionView(_ cv: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = cv.dequeueReusableCell(withReuseIdentifier: PeekCardCell.reuseId, for: indexPath) as! PeekCardCell
        cell.configure(with: items[indexPath.item])
        return cell
    }
}

// MARK: - Usage
// let peek = PeekCardCarouselViewController()
// addChild(peek)
// view.addSubview(peek.view)
// peek.didMove(toParent: self)
//
// peek.updateItems([
//     PeekCardItem(title: "My Photo", backgroundColor: .systemIndigo),
// ])
`,
  },
  {
    title: "Auto-Scrolling Banner Carousel",
    description:
      "Automatically scrolling banner with timer and page dots. Touch pauses auto-scroll, release resumes.",
    preview: <AutoScrollBannerPreview />,
    swiftCode: `import UIKit

// MARK: - Data Model
struct BannerItem {
    let title: String
    let subtitle: String
    let backgroundColor: UIColor
}

// MARK: - Banner Cell
class BannerCell: UICollectionViewCell {

    static let reuseId = "BannerCell"

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 19, weight: .bold)
        label.textColor = .white
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    private let subtitleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 14)
        label.textColor = UIColor.white.withAlphaComponent(0.7)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.addSubview(titleLabel)
        contentView.addSubview(subtitleLabel)

        NSLayoutConstraint.activate([
            titleLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor, constant: -10),
            titleLabel.leadingAnchor.constraint(greaterThanOrEqualTo: contentView.leadingAnchor, constant: 16),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 2),
            subtitleLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
        ])
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    func configure(with item: BannerItem) {
        titleLabel.text = item.title
        subtitleLabel.text = item.subtitle
        contentView.backgroundColor = item.backgroundColor
    }
}

// MARK: - Auto-Scrolling Banner Carousel
class AutoScrollBannerViewController: UIViewController {

    var banners: [BannerItem] = [
        BannerItem(title: "Summer Sale — 50% Off", subtitle: "Limited time offer", backgroundColor: .systemIndigo),
        BannerItem(title: "New Arrivals", subtitle: "Fresh styles just dropped", backgroundColor: .systemPink),
        BannerItem(title: "Free Shipping", subtitle: "On orders over $50", backgroundColor: .systemTeal),
    ]

    var autoScrollInterval: TimeInterval = 3.0
    private var currentIndex = 0
    private var timer: Timer?

    private lazy var collectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.minimumLineSpacing = 0

        let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)
        cv.isPagingEnabled = true
        cv.showsHorizontalScrollIndicator = false
        cv.backgroundColor = .clear
        cv.layer.cornerRadius = 16
        cv.layer.masksToBounds = true
        cv.register(BannerCell.self, forCellWithReuseIdentifier: BannerCell.reuseId)
        cv.dataSource = self
        cv.delegate = self
        cv.translatesAutoresizingMaskIntoConstraints = false
        return cv
    }()

    private let pageControl: UIPageControl = {
        let pc = UIPageControl()
        pc.currentPageIndicatorTintColor = .white
        pc.pageIndicatorTintColor = UIColor.white.withAlphaComponent(0.4)
        pc.translatesAutoresizingMaskIntoConstraints = false
        return pc
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(collectionView)
        view.addSubview(pageControl)
        pageControl.numberOfPages = banners.count

        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: view.topAnchor),
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.heightAnchor.constraint(equalToConstant: 140),

            pageControl.bottomAnchor.constraint(equalTo: collectionView.bottomAnchor, constant: -8),
            pageControl.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        ])
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        if let layout = collectionView.collectionViewLayout as? UICollectionViewFlowLayout {
            layout.itemSize = collectionView.bounds.size
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        startAutoScroll()
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        stopAutoScroll()
    }

    func startAutoScroll() {
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: autoScrollInterval, repeats: true) { [weak self] _ in
            self?.scrollToNext()
        }
    }

    func stopAutoScroll() {
        timer?.invalidate()
        timer = nil
    }

    private func scrollToNext() {
        guard banners.count > 1 else { return }
        currentIndex = (currentIndex + 1) % banners.count
        let indexPath = IndexPath(item: currentIndex, section: 0)
        collectionView.scrollToItem(at: indexPath, at: .centeredHorizontally, animated: true)
        pageControl.currentPage = currentIndex
    }

    func updateBanners(_ newBanners: [BannerItem]) {
        banners = newBanners
        pageControl.numberOfPages = newBanners.count
        currentIndex = 0
        collectionView.reloadData()
        startAutoScroll()
    }
}

extension AutoScrollBannerViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ cv: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        banners.count
    }

    func collectionView(_ cv: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = cv.dequeueReusableCell(withReuseIdentifier: BannerCell.reuseId, for: indexPath) as! BannerCell
        cell.configure(with: banners[indexPath.item])
        return cell
    }

    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) { stopAutoScroll() }
    func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate: Bool) { startAutoScroll() }

    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let page = Int(scrollView.contentOffset.x / scrollView.bounds.width)
        currentIndex = page
        pageControl.currentPage = page
    }
}

// MARK: - Usage
// let banner = AutoScrollBannerViewController()
// banner.autoScrollInterval = 4.0
// addChild(banner)
// view.addSubview(banner.view)
// banner.didMove(toParent: self)
//
// banner.updateBanners([
//     BannerItem(title: "Promo", subtitle: "Details", backgroundColor: .systemRed),
// ])
`,
  },
  {
    title: "Snap Carousel with Scale Effect",
    description:
      "Center-focused carousel where the active card scales up. Adjacent cards appear smaller for emphasis.",
    preview: <ScaleCarouselPreview />,
    swiftCode: `import UIKit

// MARK: - Data Model
struct ScaleCardItem {
    let title: String
    let backgroundColor: UIColor
}

// MARK: - Scale Cell
class ScaleCarouselCell: UICollectionViewCell {

    static let reuseId = "ScaleCarouselCell"

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 17, weight: .semibold)
        label.textColor = .white
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        contentView.layer.cornerRadius = 16
        contentView.layer.masksToBounds = true
        contentView.addSubview(titleLabel)

        NSLayoutConstraint.activate([
            titleLabel.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
        ])
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    func configure(with item: ScaleCardItem) {
        titleLabel.text = item.title
        contentView.backgroundColor = item.backgroundColor
    }
}

// MARK: - Scaled Flow Layout
class ScaledFlowLayout: UICollectionViewFlowLayout {

    private let scaleFactor: CGFloat = 0.85
    private let alphaFactor: CGFloat = 0.6

    override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
        guard let collectionView = collectionView,
              let attributes = super.layoutAttributesForElements(in: rect)?.map({ $0.copy() as! UICollectionViewLayoutAttributes })
        else { return nil }

        let centerX = collectionView.contentOffset.x + collectionView.bounds.width / 2

        for attr in attributes {
            let distance = abs(attr.center.x - centerX)
            let maxDistance = collectionView.bounds.width / 2 + attr.size.width / 2
            let ratio = min(distance / maxDistance, 1.0)

            attr.transform = CGAffineTransform(scaleX: 1.0 - (1.0 - scaleFactor) * ratio,
                                                y: 1.0 - (1.0 - scaleFactor) * ratio)
            attr.alpha = 1.0 - (1.0 - alphaFactor) * ratio
        }

        return attributes
    }

    override func shouldInvalidateLayout(forBoundsChange newBounds: CGRect) -> Bool { true }

    override func targetContentOffset(forProposedContentOffset proposed: CGPoint, withScrollingVelocity velocity: CGPoint) -> CGPoint {
        guard let collectionView = collectionView else { return proposed }

        let targetRect = CGRect(origin: proposed, size: collectionView.bounds.size)
        guard let attributes = super.layoutAttributesForElements(in: targetRect) else { return proposed }

        let centerX = proposed.x + collectionView.bounds.width / 2
        let closest = attributes.min(by: { abs($0.center.x - centerX) < abs($1.center.x - centerX) })
        guard let best = closest else { return proposed }

        return CGPoint(x: best.center.x - collectionView.bounds.width / 2, y: proposed.y)
    }
}

// MARK: - Scale Carousel View Controller
class ScaleCarouselViewController: UIViewController {

    var items: [ScaleCardItem] = [
        ScaleCardItem(title: "Featured", backgroundColor: .systemPurple),
        ScaleCardItem(title: "Trending", backgroundColor: .systemCyan),
        ScaleCardItem(title: "Popular", backgroundColor: .systemPink),
        ScaleCardItem(title: "New", backgroundColor: .systemOrange),
    ]

    private let cardWidth: CGFloat = 180
    private let cardHeight: CGFloat = 120

    private lazy var collectionView: UICollectionView = {
        let layout = ScaledFlowLayout()
        layout.scrollDirection = .horizontal
        layout.itemSize = CGSize(width: cardWidth, height: cardHeight)
        layout.minimumLineSpacing = 12

        let cv = UICollectionView(frame: .zero, collectionViewLayout: layout)
        cv.showsHorizontalScrollIndicator = false
        cv.decelerationRate = .fast
        cv.backgroundColor = .clear
        cv.clipsToBounds = false
        cv.register(ScaleCarouselCell.self, forCellWithReuseIdentifier: ScaleCarouselCell.reuseId)
        cv.dataSource = self
        cv.translatesAutoresizingMaskIntoConstraints = false
        return cv
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(collectionView)

        NSLayoutConstraint.activate([
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            collectionView.heightAnchor.constraint(equalToConstant: cardHeight + 32),
        ])
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        let inset = (collectionView.bounds.width - cardWidth) / 2
        collectionView.contentInset = UIEdgeInsets(top: 0, left: inset, bottom: 0, right: inset)
    }

    func updateItems(_ newItems: [ScaleCardItem]) {
        items = newItems
        collectionView.reloadData()
    }
}

extension ScaleCarouselViewController: UICollectionViewDataSource {
    func collectionView(_ cv: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        items.count
    }

    func collectionView(_ cv: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = cv.dequeueReusableCell(withReuseIdentifier: ScaleCarouselCell.reuseId, for: indexPath) as! ScaleCarouselCell
        cell.configure(with: items[indexPath.item])
        return cell
    }
}

// MARK: - Usage
// let scaleCarousel = ScaleCarouselViewController()
// addChild(scaleCarousel)
// view.addSubview(scaleCarousel.view)
// scaleCarousel.didMove(toParent: self)
//
// scaleCarousel.updateItems([
//     ScaleCardItem(title: "Card A", backgroundColor: .systemRed),
// ])
`,
  },
];

export default function Carousel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Carousel</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style scrollable carousels with dynamic content support. All
          variants accept custom data arrays for flexible content.
        </p>
      </div>
      <div className="space-y-4">
        {carouselStyles.map((style) => (
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
