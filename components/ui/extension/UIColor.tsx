import CodePreview from "@/components/ui/CodePreview";

const swiftCode = `import UIKit

extension UIColor {
    static func hex(_ hex: String, alpha: CGFloat = 1.0) -> UIColor {
        let cleaned = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: cleaned).scanHexInt64(&int)
        let r, g, b: UInt64

        switch cleaned.count {
        case 3: // RGB (12-bit)
            r = (int >> 8) * 17
            g = (int >> 4) & 0xF * 17
            b = int & 0xF * 17
        case 6: // RGB (24-bit)
            r = int >> 16
            g = (int >> 8) & 0xFF
            b = int & 0xFF
        default:
            return .clear
        }

        return UIColor(
            red: CGFloat(r) / 255,
            green: CGFloat(g) / 255,
            blue: CGFloat(b) / 255,
            alpha: alpha
        )
    }
}

// Usage
view.backgroundColor = .hex("#FFFFFF")
view.tintColor = .hex("#0EA5E9", alpha: 0.85)
`;

export default function UIColor() {
  return (
    <CodePreview
      title="UIColor Hex Extension"
      description="Create custom colors quickly with a hex helper."
      swiftCode={swiftCode}
      preview={
        <div className="w-full max-w-md space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              UIColor.hex
            </p>
            <p className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">
              Custom color tokens
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Create semantic colors using hex values for cleaner theming.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Surface", hex: "#F5F5F5" },
              { name: "Accent", hex: "#0EA5E9" },
              { name: "Warm", hex: "#FB923C" },
              { name: "Emerald", hex: "#10B981" },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/70 p-3"
              >
                <div
                  className="h-12 w-full rounded-xl border border-neutral-200/70"
                  style={{ backgroundColor: item.hex }}
                />
                <p className="mt-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                  {item.name}
                </p>
                <p className="text-[11px] text-neutral-500">{item.hex}</p>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
