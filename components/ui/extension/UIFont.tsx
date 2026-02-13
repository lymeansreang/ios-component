import CodePreview from "@/components/ui/CodePreview";

const swiftCode = `import UIKit

extension String {
    static let baseHeaderFont = "AvenirNext-Bold"
    static let baseBodyFont = "AvenirNext-Regular"
    static let baseCaptionFont = "AvenirNext-Medium"
}

extension UIFont {

    // MARK: - 1) Design System Font
    static func appFont(size: CGFloat, weight: UIFont.Weight = .regular) -> UIFont {
        UIFont.systemFont(ofSize: size, weight: weight)
    }

    // MARK: - 2) Custom Font Loader
    static func custom(_ name: String, size: CGFloat, fallbackWeight: UIFont.Weight = .regular) -> UIFont {
        UIFont(name: name, size: size) ?? UIFont.systemFont(ofSize: size, weight: fallbackWeight)
    }

    // MARK: - 3) Dynamic Type Scaling Helper
    static func scaled(_ font: UIFont, textStyle: UIFont.TextStyle) -> UIFont {
        UIFontMetrics(forTextStyle: textStyle).scaledFont(for: font)
    }

    // MARK: - 4) Trait Helper (Bold / Italic)
    func withTraits(_ traits: UIFontDescriptor.SymbolicTraits) -> UIFont {
        guard
            let descriptor = fontDescriptor.withSymbolicTraits(traits)
        else { return self }
        return UIFont(descriptor: descriptor, size: pointSize)
    }
}

// MARK: - Usage
let heading = UIFont.appFont(size: 24, weight: .bold)
let subtitle = UIFont.custom("AvenirNext-Regular", size: 16)

// Token-based font names
label.font = UIFont(name: .baseHeaderFont, size: 24)
bodyLabel.font = UIFont(name: .baseBodyFont, size: 16)
captionLabel.font = UIFont(name: .baseCaptionFont, size: 12)

// Safe fallback if custom font is missing
let safeBody = UIFont(name: .baseBodyFont, size: 16) ?? UIFont.appFont(size: 16, weight: .regular)

let bodyBase = UIFont.appFont(size: 17, weight: .regular)
let bodyScaled = UIFont.scaled(bodyBase, textStyle: .body)

let boldBody = bodyBase.withTraits(.traitBold)
let italicBody = bodyBase.withTraits(.traitItalic)

label.adjustsFontForContentSizeCategory = true
label.font = bodyScaled
`;

export default function UIFontExtension() {
  return (
    <CodePreview
      title="UIFont Extensions"
      description="Scalable font helpers for design systems and Dynamic Type."
      swiftCode={swiftCode}
      preview={
        <div className="w-full max-w-md space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              UIFont Toolkit
            </p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Type system helpers
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              appFont, custom loading, Dynamic Type scaling, and font traits.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-4 space-y-2">
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              Heading / Bold
            </p>
            <p className="text-base text-neutral-700 dark:text-neutral-300">
              Body / Regular
            </p>
            <p className="text-base italic text-neutral-600 dark:text-neutral-400">
              Body / Italic trait
            </p>
            <p className="text-sm text-neutral-500">
              Dynamic Type ready
            </p>
          </div>
        </div>
      }
    />
  );
}
