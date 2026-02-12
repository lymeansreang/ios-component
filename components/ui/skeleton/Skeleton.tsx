"use client";

import CodePreview from "@/components/ui/CodePreview";

function SkeletonLine({
  widthClass = "w-full",
  heightClass = "h-3",
  roundedClass = "rounded-md",
}: {
  widthClass?: string;
  heightClass?: string;
  roundedClass?: string;
}) {
  return (
    <span
      className={`block ${widthClass} ${heightClass} ${roundedClass} bg-neutral-200 dark:bg-neutral-800 animate-[skeleton-shimmer_1.2s_linear_infinite]`}
    />
  );
}

const textSwiftCode = `import SwiftUI

struct SkeletonTextLines: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            SkeletonBlock(width: 200, height: 12)
            SkeletonBlock(width: 280, height: 12)
            SkeletonBlock(width: 240, height: 12)
        }
    }
}

// MARK: - Usage
SkeletonTextLines()
    .padding(16)
`;

const textUIKitCode = `import UIKit

final class SkeletonTextLinesView: UIView {
    private let stack = UIStackView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        stack.axis = .vertical
        stack.spacing = 8
        stack.alignment = .leading
        stack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(stack)

        [200, 280, 240].forEach { width in
            let line = SkeletonView(cornerRadius: 6)
            line.translatesAutoresizingMaskIntoConstraints = false
            line.heightAnchor.constraint(equalToConstant: 12).isActive = true
            line.widthAnchor.constraint(equalToConstant: CGFloat(width)).isActive = true
            stack.addArrangedSubview(line)
        }

        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor),
            stack.leadingAnchor.constraint(equalTo: leadingAnchor),
            stack.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let skeleton = SkeletonTextLinesView()
// view.addSubview(skeleton)
`;

const profileSwiftCode = `import SwiftUI

struct SkeletonProfileRow: View {
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            SkeletonBlock(width: 48, height: 48, radius: 24)
            VStack(alignment: .leading, spacing: 8) {
                SkeletonBlock(width: 140, height: 12)
                SkeletonBlock(width: 220, height: 12)
                SkeletonBlock(width: 180, height: 12)
            }
        }
    }
}

// MARK: - Usage
SkeletonProfileRow()
    .padding(16)
`;

const profileUIKitCode = `import UIKit

final class SkeletonProfileRowView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        let avatar = SkeletonView(cornerRadius: 24)
        avatar.translatesAutoresizingMaskIntoConstraints = false
        avatar.widthAnchor.constraint(equalToConstant: 48).isActive = true
        avatar.heightAnchor.constraint(equalToConstant: 48).isActive = true

        let textStack = UIStackView()
        textStack.axis = .vertical
        textStack.spacing = 8
        textStack.alignment = .leading

        [140, 220, 180].forEach { width in
            let line = SkeletonView(cornerRadius: 6)
            line.translatesAutoresizingMaskIntoConstraints = false
            line.heightAnchor.constraint(equalToConstant: 12).isActive = true
            line.widthAnchor.constraint(equalToConstant: CGFloat(width)).isActive = true
            textStack.addArrangedSubview(line)
        }

        let row = UIStackView(arrangedSubviews: [avatar, textStack])
        row.axis = .horizontal
        row.spacing = 12
        row.alignment = .top
        row.translatesAutoresizingMaskIntoConstraints = false
        addSubview(row)

        NSLayoutConstraint.activate([
            row.topAnchor.constraint(equalTo: topAnchor),
            row.leadingAnchor.constraint(equalTo: leadingAnchor),
            row.trailingAnchor.constraint(equalTo: trailingAnchor),
            row.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let skeleton = SkeletonProfileRowView()
// contentView.addSubview(skeleton)
`;

const mediaSwiftCode = `import SwiftUI

struct SkeletonCardMedia: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            SkeletonBlock(width: 280, height: 112, radius: 12)
            SkeletonBlock(width: 180, height: 12)
            SkeletonBlock(width: 230, height: 12)
            SkeletonBlock(width: 150, height: 12)
        }
    }
}

// MARK: - Usage
SkeletonCardMedia()
    .padding(16)
`;

const mediaUIKitCode = `import UIKit

final class SkeletonMediaCardView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 12
        stack.alignment = .leading
        stack.translatesAutoresizingMaskIntoConstraints = false
        addSubview(stack)

        let media = SkeletonView(cornerRadius: 12)
        media.translatesAutoresizingMaskIntoConstraints = false
        media.heightAnchor.constraint(equalToConstant: 112).isActive = true
        media.widthAnchor.constraint(equalToConstant: 280).isActive = true
        stack.addArrangedSubview(media)

        [180, 230, 150].forEach { width in
            let line = SkeletonView(cornerRadius: 6)
            line.translatesAutoresizingMaskIntoConstraints = false
            line.heightAnchor.constraint(equalToConstant: 12).isActive = true
            line.widthAnchor.constraint(equalToConstant: CGFloat(width)).isActive = true
            stack.addArrangedSubview(line)
        }

        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor),
            stack.leadingAnchor.constraint(equalTo: leadingAnchor),
            stack.trailingAnchor.constraint(lessThanOrEqualTo: trailingAnchor),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let skeleton = SkeletonMediaCardView()
// view.addSubview(skeleton)
`;

const tableSwiftCode = `import SwiftUI

struct SkeletonTable: View {
    var body: some View {
        VStack(spacing: 8) {
            ForEach(0..<4) { _ in
                HStack(spacing: 8) {
                    ForEach(0..<4) { _ in
                        SkeletonBlock(width: 64, height: 10, radius: 5)
                    }
                }
            }
        }
    }
}

// MARK: - Usage
SkeletonTable()
    .padding(16)
`;

const tableUIKitCode = `import UIKit

final class SkeletonTableView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        let root = UIStackView()
        root.axis = .vertical
        root.spacing = 8
        root.translatesAutoresizingMaskIntoConstraints = false
        addSubview(root)

        for _ in 0..<4 {
            let row = UIStackView()
            row.axis = .horizontal
            row.spacing = 8
            row.distribution = .fillEqually
            for _ in 0..<4 {
                let cell = SkeletonView(cornerRadius: 5)
                cell.translatesAutoresizingMaskIntoConstraints = false
                cell.heightAnchor.constraint(equalToConstant: 10).isActive = true
                row.addArrangedSubview(cell)
            }
            root.addArrangedSubview(row)
        }

        NSLayoutConstraint.activate([
            root.topAnchor.constraint(equalTo: topAnchor),
            root.leadingAnchor.constraint(equalTo: leadingAnchor),
            root.trailingAnchor.constraint(equalTo: trailingAnchor),
            root.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let skeleton = SkeletonTableView()
// view.addSubview(skeleton)
`;

const gridSwiftCode = `import SwiftUI

struct SkeletonGrid: View {
    let columns = [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]

    var body: some View {
        LazyVGrid(columns: columns, spacing: 8) {
            ForEach(0..<6) { _ in
                SkeletonBlock(width: 88, height: 64, radius: 10)
            }
        }
    }
}

// MARK: - Usage
SkeletonGrid()
    .padding(16)
`;

const gridUIKitCode = `import UIKit

final class SkeletonGridView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        let root = UIStackView()
        root.axis = .vertical
        root.spacing = 8
        root.translatesAutoresizingMaskIntoConstraints = false
        addSubview(root)

        for _ in 0..<2 {
            let row = UIStackView()
            row.axis = .horizontal
            row.spacing = 8
            row.distribution = .fillEqually

            for _ in 0..<3 {
                let tile = SkeletonView(cornerRadius: 10)
                tile.translatesAutoresizingMaskIntoConstraints = false
                tile.heightAnchor.constraint(equalToConstant: 64).isActive = true
                row.addArrangedSubview(tile)
            }
            root.addArrangedSubview(row)
        }

        NSLayoutConstraint.activate([
            root.topAnchor.constraint(equalTo: topAnchor),
            root.leadingAnchor.constraint(equalTo: leadingAnchor),
            root.trailingAnchor.constraint(equalTo: trailingAnchor),
            root.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }
}

// MARK: - Usage
// let skeleton = SkeletonGridView()
// view.addSubview(skeleton)
`;

const cardClassName =
  "rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4";

export default function Skeleton() {
  return (
    <div className="space-y-6">
      <CodePreview
        title="Skeleton Text"
        description="Multi-line text placeholder."
        swiftCode={textSwiftCode}
        uikitCode={textUIKitCode}
        preview={
          <div className={`${cardClassName} w-full max-w-xl`}>
            <div className="space-y-2.5">
              <SkeletonLine widthClass="w-2/3" />
              <SkeletonLine widthClass="w-full" />
              <SkeletonLine widthClass="w-5/6" />
            </div>
          </div>
        }
      />

      <CodePreview
        title="Skeleton Profile"
        description="Avatar with profile text placeholder."
        swiftCode={profileSwiftCode}
        uikitCode={profileUIKitCode}
        preview={
          <div className={`${cardClassName} w-full max-w-xl`}>
            <div className="flex items-start gap-3">
              <SkeletonLine widthClass="w-12" heightClass="h-12" roundedClass="rounded-full" />
              <div className="flex-1 space-y-2.5 pt-1">
                <SkeletonLine widthClass="w-1/2" />
                <SkeletonLine widthClass="w-4/5" />
                <SkeletonLine widthClass="w-2/3" />
              </div>
            </div>
          </div>
        }
      />

      <CodePreview
        title="Skeleton Media Card"
        description="Media block with metadata lines."
        swiftCode={mediaSwiftCode}
        uikitCode={mediaUIKitCode}
        preview={
          <div className={`${cardClassName} w-full max-w-xl`}>
            <div className="space-y-3">
              <SkeletonLine widthClass="w-full" heightClass="h-28" roundedClass="rounded-xl" />
              <SkeletonLine widthClass="w-3/5" />
              <SkeletonLine widthClass="w-4/5" />
              <SkeletonLine widthClass="w-1/2" />
            </div>
          </div>
        }
      />

      <CodePreview
        title="Skeleton Table"
        description="Tabular loading placeholder."
        swiftCode={tableSwiftCode}
        uikitCode={tableUIKitCode}
        preview={
          <div className={`${cardClassName} w-full max-w-xl`}>
            <div className="space-y-2">
              {[0, 1, 2, 3].map((r) => (
                <div key={r} className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((c) => (
                    <SkeletonLine key={c} widthClass="w-full" heightClass="h-2.5" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <CodePreview
        title="Skeleton Grid"
        description="Tile-based gallery placeholder."
        swiftCode={gridSwiftCode}
        uikitCode={gridUIKitCode}
        preview={
          <div className={`${cardClassName} w-full max-w-xl`}>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <SkeletonLine
                  key={item}
                  widthClass="w-full"
                  heightClass="h-16"
                  roundedClass="rounded-lg"
                />
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
}
